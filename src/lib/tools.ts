import { z } from "zod";

const scoreProjectSchema = z.object({
  entityName: z.string().describe("The name of the project or entity being evaluated"),
  entityType: z.enum(["protocol", "dapp", "hardware", "person", "dao", "other"]).describe("The type of entity"),
  quadrant: z.enum([
    "physical_defense",
    "physical_coordination",
    "digital_defense",
    "digital_coordination",
  ]).describe("The primary quadrant this entity falls into"),
  scores: z.object({
    defensive: z.number().min(0).max(25).describe("Defensive Orientation score (0-25)"),
    decentralization: z.number().min(0).max(25).describe("Decentralization score (0-25)"),
    democratic: z.number().min(0).max(25).describe("Democratic/Pluralistic score (0-25)"),
    acceleration: z.number().min(0).max(25).describe("Acceleration Potential score (0-25)"),
  }),
  tier: z.enum(["tier_1", "tier_2", "tier_3", "not_aligned"]).describe("The overall tier classification"),
  redFlags: z.array(z.string()).describe("Detected red flags"),
  greenFlags: z.array(z.string()).describe("Detected green flags"),
  waysIsDacc: z.array(z.string()).describe("Ways this entity aligns with d/acc"),
  waysNotDacc: z.array(z.string()).describe("Ways this entity does NOT align with d/acc"),
  waysMoreDacc: z.array(z.string()).describe("Ways this entity could become more d/acc aligned"),
  oneLiner: z.string().describe("One-sentence summary of the d/acc evaluation"),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const scoreProjectTool: any = {
  description: "Score a project against the d/acc evaluation rubric. Call this after completing your analysis.",
  parameters: scoreProjectSchema,
};
