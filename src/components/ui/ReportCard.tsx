"use client";

import dynamic from "next/dynamic";
import TierBadge from "@/components/ui/TierBadge";
import { useMapContext } from "@/lib/map-context";
import type { AnalysisScores, Tier, Quadrant, EntityType } from "@/lib/types";
import { QUADRANT_LABELS } from "@/lib/types";

const RadarChart = dynamic(() => import("@/components/ui/RadarChart"), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-dacc-surface/30 animate-pulse" />,
});

interface ReportCardProps {
  result: {
    entityName: string;
    entityType: EntityType;
    quadrant: Quadrant;
    scores: AnalysisScores;
    tier: Tier;
    redFlags: string[];
    greenFlags: string[];
    waysIsDacc: string[];
    waysNotDacc: string[];
    waysMoreDacc: string[];
    oneLiner: string;
  };
  analysisId?: string;
}

export default function ReportCard({ result, analysisId }: ReportCardProps) {
  const { setPendingMapProject } = useMapContext();

  const isAligned = result.tier === "tier_1" || result.tier === "tier_2" || result.tier === "tier_3";

  const handleAddToMap = () => {
    setPendingMapProject({
      name: result.entityName,
      oneLiner: result.oneLiner,
      quadrant: result.quadrant,
      sector: "",
      scores: result.scores,
    });
    const mapSection = document.getElementById("map");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const total =
    result.scores.defensive +
    result.scores.decentralization +
    result.scores.democratic +
    result.scores.acceleration;

  return (
    <div className="border border-dacc-green/20 bg-dacc-bg">
      {/* Header */}
      <div className="p-6 border-b border-dacc-green/10 bg-dacc-surface/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-mono text-xl font-bold text-dacc-text">
              {result.entityName}
            </h3>
            <p className="font-mono text-xs text-dacc-muted mt-1">
              {result.entityType} · {QUADRANT_LABELS[result.quadrant]}
            </p>
          </div>
          <TierBadge tier={result.tier} />
        </div>
        <p className="font-sans text-sm text-dacc-muted mt-3 italic">
          &quot;{result.oneLiner}&quot;
        </p>
      </div>

      {/* Score + Radar */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className="font-mono text-5xl font-bold text-dacc-green text-glow-green">
            {total}
          </div>
          <div className="font-mono text-sm text-dacc-muted">/100</div>
          <div className="mt-4 w-full space-y-2">
            {[
              { label: "Defensive", value: result.scores.defensive },
              { label: "Decentral.", value: result.scores.decentralization },
              { label: "Democratic", value: result.scores.democratic },
              { label: "Acceleration", value: result.scores.acceleration },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-mono text-xs text-dacc-muted w-24 shrink-0">
                  {s.label}
                </span>
                <div className="flex-1 h-2 bg-dacc-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-dacc-green rounded-full transition-all duration-500"
                    style={{ width: `${(s.value / 25) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-dacc-text w-8 text-right">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <RadarChart scores={result.scores} />
      </div>

      {/* Flags */}
      {(result.greenFlags.length > 0 || result.redFlags.length > 0) && (
        <div className="px-6 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.greenFlags.length > 0 && (
            <div className="p-3 border border-dacc-green/20 bg-dacc-surface/20">
              <div className="font-mono text-xs text-dacc-green mb-2">
                GREEN FLAGS
              </div>
              <ul className="space-y-1">
                {result.greenFlags.map((f, i) => (
                  <li key={i} className="font-sans text-xs text-dacc-muted flex gap-2">
                    <span className="text-dacc-green">+</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.redFlags.length > 0 && (
            <div className="p-3 border border-dacc-red/20 bg-dacc-surface/20">
              <div className="font-mono text-xs text-dacc-red mb-2">
                RED FLAGS
              </div>
              <ul className="space-y-1">
                {result.redFlags.map((f, i) => (
                  <li key={i} className="font-sans text-xs text-dacc-muted flex gap-2">
                    <span className="text-dacc-red">-</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Ways sections */}
      <div className="px-6 pb-6 space-y-4">
        {result.waysIsDacc.length > 0 && (
          <div>
            <div className="font-mono text-xs text-dacc-green mb-2">
              WAYS IT IS d/acc
            </div>
            <ul className="space-y-1">
              {result.waysIsDacc.map((w, i) => (
                <li key={i} className="font-sans text-sm text-dacc-muted flex gap-2">
                  <span className="text-dacc-green shrink-0">→</span> {w}
                </li>
              ))}
            </ul>
          </div>
        )}
        {result.waysNotDacc.length > 0 && (
          <div>
            <div className="font-mono text-xs text-dacc-yellow mb-2">
              WAYS IT IS NOT d/acc
            </div>
            <ul className="space-y-1">
              {result.waysNotDacc.map((w, i) => (
                <li key={i} className="font-sans text-sm text-dacc-muted flex gap-2">
                  <span className="text-dacc-yellow shrink-0">→</span> {w}
                </li>
              ))}
            </ul>
          </div>
        )}
        {result.waysMoreDacc.length > 0 && (
          <div>
            <div className="font-mono text-xs text-dacc-cyan mb-2">
              HOW TO BE MORE d/acc
            </div>
            <ul className="space-y-1">
              {result.waysMoreDacc.map((w, i) => (
                <li key={i} className="font-sans text-sm text-dacc-muted flex gap-2">
                  <span className="text-dacc-cyan shrink-0">→</span> {w}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Add to map CTA */}
      {isAligned && (
        <div className="px-6 pb-4">
          <button
            onClick={handleAddToMap}
            className="btn-primary w-full"
          >
            ADD TO d/acc MAP
          </button>
        </div>
      )}

      {/* Share bar */}
      {analysisId && (
        <div className="px-6 py-3 border-t border-dacc-green/10 bg-dacc-surface/20 flex items-center justify-between">
          <span className="font-mono text-xs text-dacc-muted">
            Report ID: {analysisId.slice(0, 8)}...
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/report/${analysisId}`
              );
            }}
            className="font-mono text-xs text-dacc-cyan hover:text-dacc-cyan/80 transition-colors"
          >
            [COPY LINK]
          </button>
        </div>
      )}
    </div>
  );
}
