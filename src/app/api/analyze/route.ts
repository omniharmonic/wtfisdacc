import { streamText, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { scrapeUrl } from "@/lib/scraper";
import { buildSystemPrompt } from "@/lib/prompt";
import { scoreProjectTool } from "@/lib/tools";
import { hashUrl, normalizeUrl } from "@/lib/utils";
import { checkCache, checkRateLimit, saveAnalysis } from "@/lib/supabase";
import CryptoJS from "crypto-js";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, textInput } = body;

    if (!url && !textInput) {
      return new Response(
        JSON.stringify({ error: "URL or text input required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    const ipHash = CryptoJS.SHA256(ip).toString();

    const rateLimit = await checkRateLimit(ipHash);
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({
          error: `[RATE LIMIT] 10/10 scans used. Resets in ${Math.ceil(rateLimit.resetIn / 60)}m.`,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(rateLimit.resetIn),
          },
        }
      );
    }

    // Cache check
    if (url) {
      const urlHash = hashUrl(url);
      const cached = await checkCache(urlHash);
      if (cached) {
        return new Response(JSON.stringify({ cached: true, analysis: cached }), {
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Get content to analyze
    let content: string;
    if (textInput) {
      content = `User-provided description:\n\n${textInput.slice(0, 16000)}`;
    } else {
      try {
        content = await scrapeUrl(url);
      } catch {
        return new Response(
          JSON.stringify({
            error:
              "[ERROR] Target unreachable. Please paste a text description instead.",
            needsTextInput: true,
          }),
          { status: 422, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (content.length < 50) {
      return new Response(
        JSON.stringify({
          error:
            "[WARN] Insufficient data extracted. Please describe the project manually.",
          needsTextInput: true,
        }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream Claude analysis
    const result = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: buildSystemPrompt(),
      prompt: `Analyze this project/entity for d/acc alignment:\n\nSource URL: ${url || "User-provided text"}\n\n--- BEGIN CONTENT ---\n${content}\n--- END CONTENT ---`,
      tools: { score_project: scoreProjectTool },
      stopWhen: stepCountIs(2),
      onFinish: async ({ text, toolCalls }) => {
        // Save to cache
        if (url && toolCalls && toolCalls.length > 0) {
          const toolCall = toolCalls[0];
          if (toolCall && toolCall.toolName === "score_project") {
            const args = (toolCall as unknown as { input: Record<string, unknown> }).input;
            const scoresObj = args.scores as Record<string, number>;
            try {
              await saveAnalysis({
                url: normalizeUrl(url),
                url_hash: hashUrl(url),
                entity_name: (args.entityName as string) || "Unknown",
                entity_type: (args.entityType as string) || "other",
                quadrant: (args.quadrant as string) || "digital_defense",
                score_defensive: scoresObj?.defensive || 0,
                score_decentralization: scoresObj?.decentralization || 0,
                score_democratic: scoresObj?.democratic || 0,
                score_acceleration: scoresObj?.acceleration || 0,
                tier: (args.tier as string) || "not_aligned",
                red_flags: args.redFlags || [],
                green_flags: args.greenFlags || [],
                analysis_markdown: text,
                ways_is_dacc: args.waysIsDacc || [],
                ways_not_dacc: args.waysNotDacc || [],
                ways_more_dacc: args.waysMoreDacc || [],
                one_liner: (args.oneLiner as string) || "",
                model_used: "claude-sonnet-4-20250514",
              });
            } catch (e) {
              console.error("Failed to save analysis:", e);
            }
          }
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({
        error: "[SYSTEM ERROR] Diagnostic engine encountered an error. Try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
