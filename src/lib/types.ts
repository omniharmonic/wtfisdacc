export interface AnalysisScores {
  defensive: number;
  decentralization: number;
  democratic: number;
  acceleration: number;
}

export interface AnalysisResult {
  id: string;
  url: string;
  entityName: string;
  entityType: EntityType;
  quadrant: Quadrant;
  scores: AnalysisScores;
  scoreTotal: number;
  tier: Tier;
  redFlags: string[];
  greenFlags: string[];
  waysIsDacc: string[];
  waysNotDacc: string[];
  waysMoreDacc: string[];
  oneLiner: string;
  analysisMarkdown: string;
  modelUsed: string;
  createdAt: string;
}

export type EntityType =
  | "protocol"
  | "dapp"
  | "hardware"
  | "person"
  | "dao"
  | "other";

export type Quadrant =
  | "physical_defense"
  | "physical_coordination"
  | "digital_defense"
  | "digital_coordination";

export type Tier = "tier_1" | "tier_2" | "tier_3" | "not_aligned";

export const TIER_LABELS: Record<Tier, string> = {
  tier_1: "Tier 1 — Core d/acc",
  tier_2: "Tier 2 — Growth",
  tier_3: "Tier 3 — Speculative",
  not_aligned: "Not d/acc Aligned",
};

export const TIER_COLORS: Record<Tier, string> = {
  tier_1: "#00FF88",
  tier_2: "#00D4FF",
  tier_3: "#FFD93D",
  not_aligned: "#FF4444",
};

export const QUADRANT_LABELS: Record<Quadrant, string> = {
  physical_defense: "Physical Defense",
  physical_coordination: "Physical Coordination",
  digital_defense: "Digital Defense",
  digital_coordination: "Digital Coordination",
};

export const QUADRANT_COLORS: Record<Quadrant, string> = {
  physical_defense: "#00FF88",
  physical_coordination: "#FFD93D",
  digital_defense: "#00D4FF",
  digital_coordination: "#00CED1",
};
