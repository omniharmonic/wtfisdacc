"use client";

import { QUADRANT_COLORS, QUADRANT_LABELS, TIER_COLORS } from "@/lib/types";
import type { Quadrant } from "@/lib/types";

// Unified shape that all data sources normalize into
export interface UnifiedProject {
  name: string;
  description?: string;
  oneLiner?: string;
  quadrant: Quadrant;
  category?: string;
  tier: string;
  totalScore: number;
  scores?: {
    defensive: number;
    decentralization: number;
    democratic: number;
    acceleration: number;
  };
  stage?: string;
  differentiator?: string;
  hasToken?: boolean;
  tokenSymbol?: string;
  websiteUrl?: string;
  imageUrl?: string;
  redFlags?: string[];
  greenFlags?: string[];
  waysIsDacc?: string[];
  waysNotDacc?: string[];
  waysMoreDacc?: string[];
  source?: string;
}

interface ProjectCardContentProps {
  project: UnifiedProject;
  onClose: () => void;
}

function getTierColor(tier: string): string {
  const tierMap: Record<string, string> = {
    tier_1: TIER_COLORS.tier_1,
    tier_2: TIER_COLORS.tier_2,
    tier_3: TIER_COLORS.tier_3,
    not_aligned: TIER_COLORS.not_aligned,
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

export default function ProjectCardContent({ project, onClose }: ProjectCardContentProps) {
  const quadrantColor = QUADRANT_COLORS[project.quadrant] || "#00FF88";
  const tierColor = getTierColor(project.tier);

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-dacc-green/10 bg-dacc-surface/30">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 flex-1">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt=""
                className="w-10 h-10 rounded-full border-2 shrink-0"
                style={{ borderColor: `${quadrantColor}40` }}
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-lg shrink-0"
                style={{ borderColor: `${quadrantColor}40`, color: quadrantColor, backgroundColor: `${quadrantColor}10` }}
              >
                {project.name.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-xs font-bold border"
                  style={{ color: tierColor, borderColor: `${tierColor}60`, backgroundColor: `${tierColor}10` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tierColor }} />
                  {getTierLabel(project.tier)}
                </span>
                {project.hasToken && project.tokenSymbol && (
                  <span className="font-mono text-[10px] text-dacc-cyan">${project.tokenSymbol}</span>
                )}
              </div>
              <h3 className="font-mono text-sm sm:text-base font-bold text-dacc-text truncate">{project.name}</h3>
            </div>
          </div>
          <button onClick={onClose} className="font-mono text-xs text-dacc-muted hover:text-dacc-text shrink-0">
            [x]
          </button>
        </div>
        {project.oneLiner && (
          <p className="font-sans text-xs text-dacc-muted mt-2 italic">
            &quot;{project.oneLiner}&quot;
          </p>
        )}
        {!project.oneLiner && project.description && (
          <p className="font-sans text-xs text-dacc-muted mt-2">{project.description}</p>
        )}
      </div>

      {/* Score section */}
      <div className="p-4 border-b border-dacc-green/10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] text-dacc-muted">d/acc SCORE</span>
          <span className="font-mono text-2xl font-bold text-dacc-green">
            {project.totalScore}<span className="text-sm text-dacc-muted">/100</span>
          </span>
        </div>

        {/* Dimension breakdown (if available) */}
        {project.scores ? (
          <div className="space-y-1.5">
            {[
              { label: "Defensive", value: project.scores.defensive },
              { label: "Decentral.", value: project.scores.decentralization },
              { label: "Democratic", value: project.scores.democratic },
              { label: "Accel.", value: project.scores.acceleration },
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
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-dacc-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-dacc-green rounded-full"
                style={{ width: `${project.totalScore}%` }}
              />
            </div>
            <span className="font-mono text-xs text-dacc-text w-10 text-right">{project.totalScore}/100</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-mono text-[10px] px-1.5 py-0.5 border"
            style={{ color: quadrantColor, borderColor: `${quadrantColor}40` }}
          >
            {QUADRANT_LABELS[project.quadrant]}
          </span>
          {project.category && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 border border-dacc-surface text-dacc-muted">
              {project.category}
            </span>
          )}
          {project.stage && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 border border-dacc-surface text-dacc-muted">
              {project.stage}
            </span>
          )}
        </div>

        {/* Differentiator (static projects) */}
        {project.differentiator && (
          <div>
            <span className="font-mono text-[10px] text-dacc-muted block mb-1">DIFFERENTIATOR</span>
            <p className="font-sans text-xs text-dacc-text">{project.differentiator}</p>
          </div>
        )}

        {/* Description (if we showed a one-liner above, show full description here) */}
        {project.oneLiner && project.description && (
          <div>
            <span className="font-mono text-[10px] text-dacc-muted block mb-1">ABOUT</span>
            <p className="font-sans text-xs text-dacc-muted">{project.description}</p>
          </div>
        )}

        {/* Flags (analyzer projects) */}
        {((project.greenFlags && project.greenFlags.length > 0) ||
          (project.redFlags && project.redFlags.length > 0)) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.greenFlags && project.greenFlags.length > 0 && (
              <div className="p-2 border border-dacc-green/20 bg-dacc-surface/20">
                <div className="font-mono text-[10px] text-dacc-green mb-1">GREEN FLAGS</div>
                <ul className="space-y-0.5">
                  {project.greenFlags.map((f, i) => (
                    <li key={i} className="font-sans text-[11px] text-dacc-muted flex gap-1">
                      <span className="text-dacc-green shrink-0">+</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.redFlags && project.redFlags.length > 0 && (
              <div className="p-2 border border-dacc-red/20 bg-dacc-surface/20">
                <div className="font-mono text-[10px] text-dacc-red mb-1">RED FLAGS</div>
                <ul className="space-y-0.5">
                  {project.redFlags.map((f, i) => (
                    <li key={i} className="font-sans text-[11px] text-dacc-muted flex gap-1">
                      <span className="text-dacc-red shrink-0">-</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Ways sections (analyzer projects) */}
        {project.waysIsDacc && project.waysIsDacc.length > 0 && (
          <div>
            <div className="font-mono text-[10px] text-dacc-green mb-1">WAYS IT IS d/acc</div>
            <ul className="space-y-0.5">
              {project.waysIsDacc.map((w, i) => (
                <li key={i} className="font-sans text-[11px] text-dacc-muted flex gap-1">
                  <span className="text-dacc-green shrink-0">→</span> {w}
                </li>
              ))}
            </ul>
          </div>
        )}
        {project.waysNotDacc && project.waysNotDacc.length > 0 && (
          <div>
            <div className="font-mono text-[10px] text-dacc-yellow mb-1">WAYS IT IS NOT d/acc</div>
            <ul className="space-y-0.5">
              {project.waysNotDacc.map((w, i) => (
                <li key={i} className="font-sans text-[11px] text-dacc-muted flex gap-1">
                  <span className="text-dacc-yellow shrink-0">→</span> {w}
                </li>
              ))}
            </ul>
          </div>
        )}
        {project.waysMoreDacc && project.waysMoreDacc.length > 0 && (
          <div>
            <div className="font-mono text-[10px] text-dacc-cyan mb-1">HOW TO BE MORE d/acc</div>
            <ul className="space-y-0.5">
              {project.waysMoreDacc.map((w, i) => (
                <li key={i} className="font-sans text-[11px] text-dacc-muted flex gap-1">
                  <span className="text-dacc-cyan shrink-0">→</span> {w}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Link */}
        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-xs text-dacc-cyan hover:underline truncate"
          >
            {project.websiteUrl}
          </a>
        )}

        {/* Source */}
        {project.source === "analyzer" && (
          <div className="font-mono text-[10px] text-dacc-muted/50">
            Analyzed by d/acc diagnostic
          </div>
        )}
      </div>
    </>
  );
}
