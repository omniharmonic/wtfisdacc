import { jsonSchema } from "ai";

const scoreSchema = jsonSchema({
  type: "object" as const,
  properties: {
    entityName: { type: "string", description: "The name of the project or entity being evaluated" },
    entityType: {
      type: "string",
      enum: ["protocol", "dapp", "hardware", "person", "dao", "other"],
      description: "The type of entity",
    },
    quadrant: {
      type: "string",
      enum: ["physical_defense", "physical_coordination", "digital_defense", "digital_coordination"],
      description: "The primary quadrant this entity falls into",
    },
    scores: {
      type: "object",
      properties: {
        defensive: { type: "number", minimum: 0, maximum: 25, description: "Defensive Orientation score (0-25)" },
        decentralization: { type: "number", minimum: 0, maximum: 25, description: "Decentralization score (0-25)" },
        democratic: { type: "number", minimum: 0, maximum: 25, description: "Democratic/Pluralistic score (0-25)" },
        acceleration: { type: "number", minimum: 0, maximum: 25, description: "Acceleration Potential score (0-25)" },
      },
      required: ["defensive", "decentralization", "democratic", "acceleration"],
    },
    tier: {
      type: "string",
      enum: ["tier_1", "tier_2", "tier_3", "not_aligned"],
      description: "The overall tier classification",
    },
    redFlags: { type: "array", items: { type: "string" }, description: "Detected red flags" },
    greenFlags: { type: "array", items: { type: "string" }, description: "Detected green flags" },
    waysIsDacc: { type: "array", items: { type: "string" }, description: "Ways this entity aligns with d/acc" },
    waysNotDacc: { type: "array", items: { type: "string" }, description: "Ways this entity does NOT align with d/acc" },
    waysMoreDacc: { type: "array", items: { type: "string" }, description: "Ways this entity could become more d/acc aligned" },
    oneLiner: { type: "string", description: "One-sentence summary of the d/acc evaluation" },
  },
  required: [
    "entityName", "entityType", "quadrant", "scores", "tier",
    "redFlags", "greenFlags", "waysIsDacc", "waysNotDacc", "waysMoreDacc", "oneLiner",
  ],
});

export const scoreProjectTool = {
  description: "Score a project against the d/acc evaluation rubric. Call this after completing your analysis.",
  inputSchema: scoreSchema,
};
