"use client";

import { QUADRANT_COLORS } from "@/lib/types";
import type { Quadrant } from "@/lib/types";

export interface MapPin {
  id: string;
  name: string;
  organization?: string;
  one_liner?: string;
  quadrant: Quadrant;
  sector: string;
  image_url?: string;
  website_url?: string;
  tier?: string;
  scores?: {
    defensive?: number;
    decentralization?: number;
    democratic?: number;
    acceleration?: number;
  };
  x: number;
  y: number;
  source?: string;
}

interface MapPinMarkerProps {
  pin: MapPin;
  onClick: (pin: MapPin) => void;
  isSelected: boolean;
}

export default function MapPinMarker({ pin, onClick, isSelected }: MapPinMarkerProps) {
  const color = QUADRANT_COLORS[pin.quadrant] || "#00FF88";
  const size = isSelected ? 28 : 20;

  return (
    <g
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onClick(pin);
      }}
    >
      {/* Glow ring */}
      <circle
        cx={pin.x}
        cy={pin.y}
        r={size + 4}
        fill="none"
        stroke={color}
        strokeWidth={1}
        opacity={isSelected ? 0.6 : 0.2}
      />
      {/* Pin circle */}
      <circle
        cx={pin.x}
        cy={pin.y}
        r={size}
        fill={`${color}30`}
        stroke={color}
        strokeWidth={2}
      />
      {/* Avatar or initial */}
      {pin.image_url ? (
        <>
          <defs>
            <clipPath id={`clip-${pin.id}`}>
              <circle cx={pin.x} cy={pin.y} r={size - 2} />
            </clipPath>
          </defs>
          <image
            href={pin.image_url}
            x={pin.x - size + 2}
            y={pin.y - size + 2}
            width={(size - 2) * 2}
            height={(size - 2) * 2}
            clipPath={`url(#clip-${pin.id})`}
          />
        </>
      ) : (
        <text
          x={pin.x}
          y={pin.y + size * 0.3}
          textAnchor="middle"
          fill={color}
          fontSize={size * 0.9}
          fontFamily="JetBrains Mono, monospace"
          fontWeight="bold"
        >
          {pin.name.charAt(0)}
        </text>
      )}
      {/* Label */}
      <text
        x={pin.x}
        y={pin.y + size + 22}
        textAnchor="middle"
        fill="#E0E0E0"
        fontSize={16}
        fontFamily="JetBrains Mono, monospace"
        opacity={isSelected ? 1 : 0.7}
      >
        {pin.name.length > 18 ? pin.name.slice(0, 17) + "…" : pin.name}
      </text>
    </g>
  );
}
