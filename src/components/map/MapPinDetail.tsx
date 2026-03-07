"use client";

import { QUADRANT_COLORS } from "@/lib/types";
import type { MapPin } from "./MapPinMarker";
import type { ResearchProject } from "@/lib/research-data";
import ProjectCardContent from "@/components/ui/ProjectCardContent";

interface AnalysisData {
  one_liner?: string;
  entity_type?: string;
  sector?: string;
  tier?: string;
  score_defensive?: number;
  score_decentralization?: number;
  score_democratic?: number;
  score_acceleration?: number;
  red_flags?: string[];
  green_flags?: string[];
  ways_is_dacc?: string[];
  ways_not_dacc?: string[];
  ways_more_dacc?: string[];
}

interface MapPinDetailProps {
  pin: MapPin;
  onClose: () => void;
  analysisData?: AnalysisData | null;
  staticData?: ResearchProject;
}

export default function MapPinDetail({ pin, onClose, analysisData, staticData }: MapPinDetailProps) {
  const color = QUADRANT_COLORS[pin.quadrant] || "#00FF88";

  // Build scores from pin data (primary) or analysisData (fallback)
  const pinScores = pin.scores;
  const hasScoresOnPin = pinScores && typeof pinScores.defensive === "number";
  const hasScoresInAnalysis = analysisData && typeof analysisData.score_defensive === "number";

  // Build dimension scores if available from any source
  const scores = hasScoresOnPin
    ? {
        defensive: pinScores!.defensive || 0,
        decentralization: pinScores!.decentralization || 0,
        democratic: pinScores!.democratic || 0,
        acceleration: pinScores!.acceleration || 0,
      }
    : hasScoresInAnalysis
    ? {
        defensive: analysisData!.score_defensive || 0,
        decentralization: analysisData!.score_decentralization || 0,
        democratic: analysisData!.score_democratic || 0,
        acceleration: analysisData!.score_acceleration || 0,
      }
    : undefined;

  // Compute total score from best available source
  const totalScore = scores
    ? scores.defensive + scores.decentralization + scores.democratic + scores.acceleration
    : staticData?.daccScore || 0;

  return (
    <div
      className="w-80 sm:w-96 border bg-dacc-bg/95 backdrop-blur-sm max-h-[85vh] overflow-y-auto"
      style={{ borderColor: `${color}40` }}
    >
      <ProjectCardContent
        project={{
          name: pin.name,
          oneLiner: analysisData?.one_liner || pin.one_liner,
          description: staticData?.description,
          quadrant: pin.quadrant,
          category: analysisData?.sector || analysisData?.entity_type || pin.sector || staticData?.category || undefined,
          tier: analysisData?.tier || pin.tier || staticData?.tier || "not_aligned",
          totalScore,
          scores,
          websiteUrl: pin.website_url,
          imageUrl: pin.image_url,
          source: pin.source,
          differentiator: staticData?.differentiator,
          stage: staticData?.stage,
          hasToken: staticData?.hasToken,
          tokenSymbol: staticData?.tokenSymbol,
          redFlags: analysisData?.red_flags,
          greenFlags: analysisData?.green_flags,
          waysIsDacc: analysisData?.ways_is_dacc,
          waysNotDacc: analysisData?.ways_not_dacc,
          waysMoreDacc: analysisData?.ways_more_dacc,
        }}
        onClose={onClose}
      />
    </div>
  );
}
