"use client";

import { QUADRANT_COLORS, QUADRANT_LABELS } from "@/lib/types";
import type { MapPin } from "./MapPinMarker";

interface MapPinDetailProps {
  pin: MapPin;
  onClose: () => void;
}

export default function MapPinDetail({ pin, onClose }: MapPinDetailProps) {
  const color = QUADRANT_COLORS[pin.quadrant] || "#00FF88";

  return (
    <div
      className="w-72 sm:w-80 border bg-dacc-bg/95 backdrop-blur-sm p-4"
      style={{ borderColor: `${color}40` }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {pin.image_url && (
            <img
              src={pin.image_url}
              alt=""
              className="w-8 h-8 rounded-full border"
              style={{ borderColor: `${color}40` }}
            />
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
          className="font-mono text-xs text-dacc-muted hover:text-dacc-text"
        >
          [x]
        </button>
      </div>

      {pin.one_liner && (
        <p className="font-sans text-xs text-dacc-muted mb-2 italic">
          &quot;{pin.one_liner}&quot;
        </p>
      )}

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
          className="block mt-2 font-mono text-xs text-dacc-cyan hover:underline"
        >
          {pin.website_url}
        </a>
      )}
    </div>
  );
}
