import { streamText, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { scrapeUrl } from "@/lib/scraper";
import { buildSystemPrompt } from "@/lib/prompt";
import { scoreProjectTool } from "@/lib/tools";
import { hashUrl, normalizeUrl } from "@/lib/utils";
import { checkCache, checkRateLimit, saveAnalysis, saveMapPin } from "@/lib/supabase";
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
          error: `[RATE LIMIT] Whoa, you're accelerating too fast! 10/10 scans used. Grab a coffee and come back in ${Math.ceil(rateLimit.resetIn / 60)}m.`,
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
              "[BLOCKED] That site's defenses are too strong for our scanner. Looks like they're already pretty d/acc! Paste a description instead.",
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
            "[INSUFFICIENT DATA] We scraped the site but found barely a whisper. Give us something to work with — describe the project below.",
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
        if (!toolCalls || toolCalls.length === 0) return;
        const toolCall = toolCalls[0];
        if (!toolCall || toolCall.toolName !== "score_project") return;

        const args = (toolCall as unknown as { input: Record<string, unknown> }).input;
        const scoresObj = args.scores as Record<string, number>;
        const quadrant = (args.quadrant as string) || "digital_defense";
        const entityName = (args.entityName as string) || "Unknown";
        const tier = (args.tier as string) || "not_aligned";
        const oneLiner = (args.oneLiner as string) || "";

        // Save analysis to cache
        if (url) {
          try {
            await saveAnalysis({
              url: normalizeUrl(url),
              url_hash: hashUrl(url),
              entity_name: entityName,
              entity_type: (args.entityType as string) || "other",
              quadrant,
              score_defensive: scoresObj?.defensive || 0,
              score_decentralization: scoresObj?.decentralization || 0,
              score_democratic: scoresObj?.democratic || 0,
              score_acceleration: scoresObj?.acceleration || 0,
              tier,
              red_flags: args.redFlags || [],
              green_flags: args.greenFlags || [],
              analysis_markdown: text,
              ways_is_dacc: args.waysIsDacc || [],
              ways_not_dacc: args.waysNotDacc || [],
              ways_more_dacc: args.waysMoreDacc || [],
              one_liner: oneLiner,
              model_used: "claude-sonnet-4-20250514",
            });
          } catch (e) {
            console.error("Failed to save analysis:", e);
          }
        }

        // Auto-add to map if the project is d/acc aligned
        if (tier !== "not_aligned") {
          try {
            // Random position within the appropriate quadrant
            const regions: Record<string, { xMin: number; xMax: number; yMin: number; yMax: number }> = {
              physical_defense: { xMin: 200, xMax: 1600, yMin: 200, yMax: 1100 },
              physical_coordination: { xMin: 1900, xMax: 3300, yMin: 200, yMax: 1100 },
              digital_defense: { xMin: 200, xMax: 1600, yMin: 1350, yMax: 2250 },
              digital_coordination: { xMin: 1900, xMax: 3300, yMin: 1350, yMax: 2250 },
            };
            const region = regions[quadrant] || regions.digital_defense;

            await saveMapPin({
              name: entityName,
              one_liner: oneLiner,
              quadrant,
              sector: "",
              website_url: url || null,
              tier,
              scores: scoresObj || {},
              x: region.xMin + Math.random() * (region.xMax - region.xMin),
              y: region.yMin + Math.random() * (region.yMax - region.yMin),
              source: "analyzer",
            });
          } catch (e) {
            console.error("Failed to save map pin:", e);
          }
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({
        error: "[SYSTEM ERROR] Looks like we're accelerating a bit too fast. Our diagnostic engine needs a moment — try again shortly.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
