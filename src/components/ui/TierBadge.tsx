"use client";

import { TIER_COLORS, TIER_LABELS, type Tier } from "@/lib/types";

interface TierBadgeProps {
  tier: Tier;
  className?: string;
}

export default function TierBadge({ tier, className = "" }: TierBadgeProps) {
  const color = TIER_COLORS[tier];
  const label = TIER_LABELS[tier];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 font-mono text-sm font-bold border ${className}`}
      style={{
        color,
        borderColor: color,
        backgroundColor: `${color}10`,
        boxShadow: `0 0 10px ${color}20`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
