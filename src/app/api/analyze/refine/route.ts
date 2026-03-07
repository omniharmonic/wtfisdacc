import { streamText, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { buildRefinePrompt } from "@/lib/prompt";
import { scoreProjectTool } from "@/lib/tools";
import { updateAnalysis, updateMapPin } from "@/lib/supabase";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, urlHash, previousAnalysis, previousScores, feedback } = body;

    if (!feedback?.trim()) {
      return new Response(
        JSON.stringify({ error: "Feedback is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: buildRefinePrompt(),
      prompt: `## Previous Analysis
${previousAnalysis}

## Previous Scores
${JSON.stringify(previousScores, null, 2)}

## User Corrections / Additional Context
${feedback}

Re-evaluate this project incorporating the user's feedback. Call the score_project tool with your updated scores.`,
      tools: { score_project: scoreProjectTool },
      stopWhen: stepCountIs(2),
      onFinish: async ({ text, toolCalls }) => {
        if (!toolCalls || toolCalls.length === 0) return;
        const toolCall = toolCalls[0];
        if (!toolCall || toolCall.toolName !== "score_project") return;

        const args = (toolCall as unknown as { input: Record<string, unknown> }).input;
        const scoresObj = args.scores as Record<string, number>;
        const quadrant = (args.quadrant as string) || "digital_defense";
        const sector = (args.sector as string) || "";
        const entityName = (args.entityName as string) || "Unknown";
        const tier = (args.tier as string) || "not_aligned";
        const oneLiner = (args.oneLiner as string) || "";

        // Update existing analysis row
        if (urlHash) {
          try {
            await updateAnalysis(urlHash, {
              entity_name: entityName,
              entity_type: (args.entityType as string) || "other",
              quadrant,
              sector,
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
            });
          } catch (e) {
            console.error("Failed to update analysis:", e);
          }
        }

        // Update existing map pin
        if (tier !== "not_aligned") {
          try {
            await updateMapPin(entityName, {
              one_liner: oneLiner,
              quadrant,
              sector,
              website_url: url || null,
              tier,
              scores: scoresObj || {},
            });
          } catch (e) {
            console.error("Failed to update map pin:", e);
          }
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Refine error:", error);
    return new Response(
      JSON.stringify({ error: "[SYSTEM ERROR] Refinement failed. Try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
