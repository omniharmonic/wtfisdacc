"use client";

import { QUADRANT_COLORS, QUADRANT_LABELS, TIER_COLORS } from "@/lib/types";
import type { ResearchPrimitive, ResearchSector } from "@/lib/research-data";
import ProjectCardContent, { type UnifiedProject } from "./ProjectCardContent";

export type DetailItem =
  | { type: "project"; data: UnifiedProject }
  | { type: "primitive"; data: ResearchPrimitive }
  | { type: "sector"; data: ResearchSector };

interface ProjectDetailModalProps {
  item: DetailItem;
  onClose: () => void;
}

export default function ProjectDetailModal({ item, onClose }: ProjectDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative z-10 w-full max-w-md max-h-[85vh] overflow-y-auto border bg-dacc-bg/95 backdrop-blur-sm"
        style={{ borderColor: getBorderColor(item) }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "project" && (
          <ProjectCardContent project={item.data} onClose={onClose} />
        )}
        {item.type === "primitive" && <PrimitiveDetail data={item.data} onClose={onClose} />}
        {item.type === "sector" && <SectorDetail data={item.data} onClose={onClose} />}
      </div>
    </div>
  );
}

function getBorderColor(item: DetailItem): string {
  if (item.type === "project") return `${QUADRANT_COLORS[item.data.quadrant]}40`;
  if (item.type === "sector") return `${QUADRANT_COLORS[item.data.quadrant]}40`;
  const tierKey = item.data.tier.toLowerCase().replace(" ", "_") as keyof typeof TIER_COLORS;
  return `${TIER_COLORS[tierKey] || "#9999AA"}40`;
}

function PrimitiveDetail({ data, onClose }: { data: ResearchPrimitive; onClose: () => void }) {
  const tierKey = data.tier.toLowerCase().replace(" ", "_") as keyof typeof TIER_COLORS;
  const tierColor = TIER_COLORS[tierKey] || "#9999AA";
  return (
    <>
      <div className="p-4 border-b border-dacc-green/10 bg-dacc-surface/30">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-xs font-bold border"
                style={{ color: tierColor, borderColor: `${tierColor}60`, backgroundColor: `${tierColor}10` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tierColor }} />
                {data.tier}
              </span>
              <span className="font-mono text-[10px] text-dacc-muted">{data.category}</span>
            </div>
            <h3 className="font-mono text-lg font-bold text-dacc-text">{data.name}</h3>
          </div>
          <button onClick={onClose} className="font-mono text-xs text-dacc-muted hover:text-dacc-text shrink-0">
            [x]
          </button>
        </div>
        <p className="font-sans text-sm text-dacc-muted mt-2">{data.description}</p>
      </div>

      <div className="p-4 space-y-3">
        <DetailRow label="Stage" value={data.stage} />
        <div>
          <span className="font-mono text-[10px] text-dacc-muted block mb-1">WHY d/acc</span>
          <p className="font-sans text-sm text-dacc-text">{data.whyDacc}</p>
        </div>
        <div>
          <span className="font-mono text-[10px] text-dacc-muted block mb-1">KEY PLAYERS</span>
          <p className="font-sans text-sm text-dacc-muted">{data.keyPlayers}</p>
        </div>
      </div>
    </>
  );
}

function SectorDetail({ data, onClose }: { data: ResearchSector; onClose: () => void }) {
  const quadrantColor = QUADRANT_COLORS[data.quadrant];
  return (
    <>
      <div className="p-4 border-b border-dacc-green/10 bg-dacc-surface/30">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-mono text-lg font-bold" style={{ color: quadrantColor }}>{data.name}</h3>
          <button onClick={onClose} className="font-mono text-xs text-dacc-muted hover:text-dacc-text shrink-0">
            [x]
          </button>
        </div>
        <p className="font-sans text-sm text-dacc-muted mt-2">{data.description}</p>
      </div>

      <div className="p-4 space-y-3">
        <DetailRow label="Quadrant" value={QUADRANT_LABELS[data.quadrant]} color={quadrantColor} />
        <DetailRow label="Market Size" value={data.marketSize} />
        <DetailRow label="Projection" value={data.projection} />
        <DetailRow label="Primitives" value={String(data.primitiveCount)} />
        <DetailRow label="Projects" value={String(data.projectCount)} />
      </div>
    </>
  );
}

function DetailRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-[10px] text-dacc-muted">{label}</span>
      <span className="font-mono text-xs" style={{ color: color || "#E0E0E0" }}>{value}</span>
    </div>
  );
}
