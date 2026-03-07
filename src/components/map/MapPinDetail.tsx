"use client";

import { QUADRANT_COLORS, QUADRANT_LABELS, TIER_COLORS } from "@/lib/types";
import type { MapPin } from "./MapPinMarker";

interface MapPinDetailProps {
  pin: MapPin;
  onClose: () => void;
}

function getTierColor(tier: string): string {
  const tierMap: Record<string, string> = {
    tier_1: TIER_COLORS.tier_1,
    tier_2: TIER_COLORS.tier_2,
    tier_3: TIER_COLORS.tier_3,
    "Tier 1": TIER_COLORS.tier_1,
    "Tier 2": TIER_COLORS.tier_2,
    "Tier 3": TIER_COLORS.tier_3,
  };
  return tierMap[tier] || "#9999AA";
}

function getTierLabel(tier: string): string {
  const labelMap: Record<string, string> = {
    tier_1: "Tier 1",
    tier_2: "Tier 2",
    tier_3: "Tier 3",
    not_aligned: "Not Aligned",
  };
  return labelMap[tier] || tier;
}

interface Scores {
  defensive?: number;
  decentralization?: number;
  democratic?: number;
  acceleration?: number;
}

export default function MapPinDetail({ pin, onClose }: MapPinDetailProps) {
  const color = QUADRANT_COLORS[pin.quadrant] || "#00FF88";
  const scores = (pin as unknown as { scores?: Scores }).scores;
  const hasScores = scores && typeof scores === "object" && Object.keys(scores).length > 0;
  const total = hasScores
    ? (scores.defensive || 0) + (scores.decentralization || 0) + (scores.democratic || 0) + (scores.acceleration || 0)
    : null;

  return (
    <div
      className="w-80 sm:w-96 border bg-dacc-bg/95 backdrop-blur-sm"
      style={{ borderColor: `${color}40` }}
    >
      {/* Header */}
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
              <div className="font-mono text-sm font-bold text-dacc-text">
                {pin.name}
              </div>
              {pin.organization && (
                <div className="font-mono text-[10px] text-dacc-muted">
                  {pin.organization}
                </div>
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

      {/* Body */}
      <div className="p-4 space-y-3">
        {pin.one_liner && (
          <p className="font-sans text-xs text-dacc-muted italic">
            &quot;{pin.one_liner}&quot;
          </p>
        )}

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-mono text-[10px] px-1.5 py-0.5 border"
            style={{ color, borderColor: `${color}40` }}
          >
            {QUADRANT_LABELS[pin.quadrant]}
          </span>
          {pin.sector && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 border border-dacc-surface text-dacc-muted">
              {pin.sector}
            </span>
          )}
          {pin.tier && (
            <span
              className="font-mono text-[10px] px-1.5 py-0.5 border font-bold"
              style={{ color: getTierColor(pin.tier), borderColor: `${getTierColor(pin.tier)}40` }}
            >
              {getTierLabel(pin.tier)}
            </span>
          )}
        </div>

        {/* Scores (if available from analyzer) */}
        {hasScores && total !== null && (
          <div className="border border-dacc-green/10 p-3 bg-dacc-surface/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-dacc-muted">d/acc SCORE</span>
              <span className="font-mono text-lg font-bold text-dacc-green">
                {total}<span className="text-[10px] text-dacc-muted">/100</span>
              </span>
            </div>
            <div className="space-y-1.5">
              {[
                { label: "Defensive", value: scores.defensive || 0 },
                { label: "Decentral.", value: scores.decentralization || 0 },
                { label: "Democratic", value: scores.democratic || 0 },
                { label: "Accel.", value: scores.acceleration || 0 },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-dacc-muted w-16 shrink-0">{s.label}</span>
                  <div className="flex-1 h-1.5 bg-dacc-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-dacc-green rounded-full"
                      style={{ width: `${(s.value / 25) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-dacc-text w-6 text-right">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Link */}
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

        {/* Source indicator */}
        {pin.source === "analyzer" && (
          <div className="font-mono text-[10px] text-dacc-muted/50">
            Added via d/acc analyzer
          </div>
        )}
      </div>
    </div>
  );
}
