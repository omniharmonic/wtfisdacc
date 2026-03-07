"use client";

import { QUADRANT_COLORS, QUADRANT_LABELS } from "@/lib/types";
import type { Quadrant } from "@/lib/types";
import type { MapPin } from "./MapPinMarker";
import ProjectCardContent from "@/components/ui/ProjectCardContent";

interface AnalysisData {
  one_liner?: string;
  entity_type?: string;
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
}

export default function MapPinDetail({ pin, onClose, analysisData }: MapPinDetailProps) {
  const color = QUADRANT_COLORS[pin.quadrant] || "#00FF88";

  // If we have analysis data with scores, show the rich unified card
  if (analysisData && typeof analysisData.score_defensive === "number") {
    const total = (analysisData.score_defensive || 0) + (analysisData.score_decentralization || 0) +
                  (analysisData.score_democratic || 0) + (analysisData.score_acceleration || 0);

    return (
      <div
        className="w-80 sm:w-96 border bg-dacc-bg/95 backdrop-blur-sm max-h-[85vh] overflow-y-auto"
        style={{ borderColor: `${color}40` }}
      >
        <ProjectCardContent
          project={{
            name: pin.name,
            oneLiner: analysisData.one_liner || pin.one_liner,
            quadrant: pin.quadrant,
            category: analysisData.entity_type || pin.sector || undefined,
            tier: analysisData.tier || pin.tier || "not_aligned",
            totalScore: total,
            scores: {
              defensive: analysisData.score_defensive || 0,
              decentralization: analysisData.score_decentralization || 0,
              democratic: analysisData.score_democratic || 0,
              acceleration: analysisData.score_acceleration || 0,
            },
            websiteUrl: pin.website_url,
            imageUrl: pin.image_url,
            source: pin.source,
            redFlags: analysisData.red_flags,
            greenFlags: analysisData.green_flags,
            waysIsDacc: analysisData.ways_is_dacc,
            waysNotDacc: analysisData.ways_not_dacc,
            waysMoreDacc: analysisData.ways_more_dacc,
          }}
          onClose={onClose}
        />
      </div>
    );
  }

  // Simple card for manual pins without analysis data
  return (
    <div
      className="w-80 sm:w-96 border bg-dacc-bg/95 backdrop-blur-sm"
      style={{ borderColor: `${color}40` }}
    >
      <div className="p-4 border-b border-dacc-green/10 bg-dacc-surface/30">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            {pin.image_url ? (
              <img
                src={pin.image_url}
                alt=""
                className="w-10 h-10 rounded-full border-2"
                style={{ borderColor: `${color}40` }}
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-lg"
                style={{ borderColor: `${color}40`, color, backgroundColor: `${color}10` }}
              >
                {pin.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-mono text-sm font-bold text-dacc-text">{pin.name}</div>
              {pin.organization && (
                <div className="font-mono text-[10px] text-dacc-muted">{pin.organization}</div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-dacc-muted hover:text-dacc-text shrink-0"
          >
            [x]
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {pin.one_liner && (
          <p className="font-sans text-xs text-dacc-muted italic">
            &quot;{pin.one_liner}&quot;
          </p>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-mono text-[10px] px-1.5 py-0.5 border"
            style={{ color, borderColor: `${color}40` }}
          >
            {QUADRANT_LABELS[pin.quadrant as Quadrant]}
          </span>
          {pin.sector && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 border border-dacc-surface text-dacc-muted">
              {pin.sector}
            </span>
          )}
          {pin.tier && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 border border-dacc-surface text-dacc-muted">
              {pin.tier}
            </span>
          )}
        </div>

        {pin.website_url && (
          <a
            href={pin.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-xs text-dacc-cyan hover:underline truncate"
          >
            {pin.website_url}
          </a>
        )}
      </div>
    </div>
  );
}
