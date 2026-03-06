"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getAnonClient } from "@/lib/supabase";
import { useMapContext } from "@/lib/map-context";
import { QUADRANT_COLORS, QUADRANT_LABELS } from "@/lib/types";
import type { Quadrant } from "@/lib/types";
import MapPinMarker, { type MapPin } from "@/components/map/MapPinMarker";
import MapPinDetail from "@/components/map/MapPinDetail";
import MapPinForm from "@/components/map/MapPinForm";

// Map dimensions — based on SVG viewBox
const MAP_W = 3508;
const MAP_H = 2480;

// Quadrant regions for pin distribution
const QUADRANT_REGIONS: Record<Quadrant, { xMin: number; xMax: number; yMin: number; yMax: number }> = {
  physical_defense: { xMin: 200, xMax: 1600, yMin: 200, yMax: 1100 },
  physical_coordination: { xMin: 1900, xMax: 3300, yMin: 200, yMax: 1100 },
  digital_defense: { xMin: 200, xMax: 1600, yMin: 1350, yMax: 2250 },
  digital_coordination: { xMin: 1900, xMax: 3300, yMin: 1350, yMax: 2250 },
};

function randomInRegion(quadrant: Quadrant): { x: number; y: number } {
  const r = QUADRANT_REGIONS[quadrant];
  return {
    x: r.xMin + Math.random() * (r.xMax - r.xMin),
    y: r.yMin + Math.random() * (r.yMax - r.yMin),
  };
}

export default function InteractiveMap() {
  const [pins, setPins] = useState<MapPin[]>([]);
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: MAP_W, h: MAP_H });
  const svgRef = useRef<SVGSVGElement>(null);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const { pendingMapProject, clearPendingMapProject } = useMapContext();

  // Load pins from Supabase
  useEffect(() => {
    const client = getAnonClient();
    if (!client) return;

    client
      .from("map_pins")
      .select("*")
      .then(({ data }) => {
        if (data) {
          setPins(data as MapPin[]);
        }
      });

    // Subscribe to realtime updates
    const channel = client
      .channel("map_pins_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "map_pins" },
        (payload) => {
          setPins((prev) => [...prev, payload.new as MapPin]);
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, []);

  // Handle pending project from analyzer
  useEffect(() => {
    if (pendingMapProject) {
      setShowForm(true);
    }
  }, [pendingMapProject]);

  // Zoom with scroll wheel — use native listener to avoid passive event issues
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 1.1 : 0.9;
      setViewBox((vb) => {
        const newW = Math.min(MAP_W, Math.max(400, vb.w * factor));
        const newH = Math.min(MAP_H, Math.max(280, vb.h * factor));
        const cx = vb.x + vb.w / 2;
        const cy = vb.y + vb.h / 2;
        return {
          x: Math.max(0, Math.min(MAP_W - newW, cx - newW / 2)),
          y: Math.max(0, Math.min(MAP_H - newH, cy - newH / 2)),
          w: newW,
          h: newH,
        };
      });
    };

    svg.addEventListener("wheel", handleWheel, { passive: false });
    return () => svg.removeEventListener("wheel", handleWheel);
  }, []);

  // Pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning.current || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const dx = ((e.clientX - panStart.current.x) / rect.width) * viewBox.w;
      const dy = ((e.clientY - panStart.current.y) / rect.height) * viewBox.h;
      panStart.current = { x: e.clientX, y: e.clientY };
      setViewBox((vb) => ({
        ...vb,
        x: Math.max(0, Math.min(MAP_W - vb.w, vb.x - dx)),
        y: Math.max(0, Math.min(MAP_H - vb.h, vb.y - dy)),
      }));
    },
    [viewBox.w, viewBox.h]
  );

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  // Submit new pin
  const handleSubmitPin = async (data: {
    name: string;
    one_liner: string;
    quadrant: Quadrant;
    sector: string;
    website_url: string;
    image_url: string;
  }) => {
    const client = getAnonClient();
    const pos = randomInRegion(data.quadrant);

    const pinData = {
      name: data.name,
      one_liner: data.one_liner,
      quadrant: data.quadrant,
      sector: data.sector,
      website_url: data.website_url || null,
      image_url: data.image_url || null,
      x: pos.x,
      y: pos.y,
      source: pendingMapProject ? "analyzer" : "manual",
    };

    if (client) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (client.from("map_pins") as any).insert(pinData);
    }

    // Optimistic: add locally even if Supabase isn't configured
    const localPin: MapPin = {
      id: crypto.randomUUID(),
      ...pinData,
      image_url: pinData.image_url || undefined,
      website_url: pinData.website_url || undefined,
    };
    setPins((prev) => [...prev, localPin]);

    setShowForm(false);
    clearPendingMapProject();
  };

  const resetZoom = () => setViewBox({ x: 0, y: 0, w: MAP_W, h: MAP_H });

  return (
    <section id="map" className="py-16 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-dacc-green tracking-widest uppercase">
            // The Map
          </span>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-dacc-text mt-4">
            The d/acc{" "}
            <span className="text-dacc-green text-glow-green">ecosystem</span>.
          </h2>
          <p className="font-sans text-dacc-muted mt-2 max-w-lg mx-auto">
            Click anywhere to add a pin. Scroll to zoom, drag to pan.
          </p>
        </div>

        {/* Quadrant legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {(Object.entries(QUADRANT_LABELS) as [Quadrant, string][]).map(
            ([key, label]) => (
              <span
                key={key}
                className="font-mono text-xs flex items-center gap-1"
                style={{ color: QUADRANT_COLORS[key] }}
              >
                <span
                  className="w-2 h-2 inline-block"
                  style={{ backgroundColor: QUADRANT_COLORS[key] }}
                />
                {label}
              </span>
            )
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(true)}
              className="font-mono text-xs text-dacc-green border border-dacc-green/30 px-3 py-1 hover:bg-dacc-green/10 transition-colors"
            >
              + ADD PIN
            </button>
            <button
              onClick={resetZoom}
              className="font-mono text-xs text-dacc-muted border border-dacc-surface px-3 py-1 hover:text-dacc-text transition-colors"
            >
              RESET ZOOM
            </button>
          </div>
          <span className="font-mono text-xs text-dacc-muted">
            {pins.length} pin{pins.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="relative">
          {/* SVG Map */}
          <div className="border border-dacc-green/20 bg-dacc-surface/30 overflow-hidden">
            <svg
              ref={svgRef}
              viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
              className="w-full"
              style={{ aspectRatio: `${MAP_W}/${MAP_H}`, cursor: isPanning.current ? "grabbing" : "grab" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Background — quadrant grid */}
              <rect width={MAP_W} height={MAP_H} fill="#0F0F23" />

              {/* Quadrant backgrounds */}
              <rect x={0} y={0} width={MAP_W / 2} height={MAP_H / 2} fill={`${QUADRANT_COLORS.physical_defense}06`} />
              <rect x={MAP_W / 2} y={0} width={MAP_W / 2} height={MAP_H / 2} fill={`${QUADRANT_COLORS.physical_coordination}06`} />
              <rect x={0} y={MAP_H / 2} width={MAP_W / 2} height={MAP_H / 2} fill={`${QUADRANT_COLORS.digital_defense}06`} />
              <rect x={MAP_W / 2} y={MAP_H / 2} width={MAP_W / 2} height={MAP_H / 2} fill={`${QUADRANT_COLORS.digital_coordination}06`} />

              {/* Center lines */}
              <line x1={MAP_W / 2} y1={0} x2={MAP_W / 2} y2={MAP_H} stroke="#9999AA" strokeWidth={1} opacity={0.2} />
              <line x1={0} y1={MAP_H / 2} x2={MAP_W} y2={MAP_H / 2} stroke="#9999AA" strokeWidth={1} opacity={0.2} />

              {/* Axis labels */}
              <text x={MAP_W / 4} y={60} textAnchor="middle" fill={QUADRANT_COLORS.physical_defense} fontSize={28} fontFamily="JetBrains Mono, monospace" fontWeight="bold" opacity={0.5}>
                Physical Defense
              </text>
              <text x={MAP_W * 3 / 4} y={60} textAnchor="middle" fill={QUADRANT_COLORS.physical_coordination} fontSize={28} fontFamily="JetBrains Mono, monospace" fontWeight="bold" opacity={0.5}>
                Physical Coordination
              </text>
              <text x={MAP_W / 4} y={MAP_H - 30} textAnchor="middle" fill={QUADRANT_COLORS.digital_defense} fontSize={28} fontFamily="JetBrains Mono, monospace" fontWeight="bold" opacity={0.5}>
                Digital Defense
              </text>
              <text x={MAP_W * 3 / 4} y={MAP_H - 30} textAnchor="middle" fill={QUADRANT_COLORS.digital_coordination} fontSize={28} fontFamily="JetBrains Mono, monospace" fontWeight="bold" opacity={0.5}>
                Digital Coordination
              </text>

              {/* Y axis label */}
              <text x={40} y={MAP_H / 2} textAnchor="middle" fill="#9999AA" fontSize={18} fontFamily="JetBrains Mono, monospace" opacity={0.4} transform={`rotate(-90, 40, ${MAP_H / 2})`}>
                ATOMS ← → BITS
              </text>

              {/* X axis label */}
              <text x={MAP_W / 2} y={MAP_H / 2 - 15} textAnchor="middle" fill="#9999AA" fontSize={18} fontFamily="JetBrains Mono, monospace" opacity={0.4}>
                DEFENSE ← → COORDINATION
              </text>

              {/* Pins */}
              {pins.map((pin) => (
                <MapPinMarker
                  key={pin.id}
                  pin={pin}
                  onClick={(p) => setSelectedPin(selectedPin?.id === p.id ? null : p)}
                  isSelected={selectedPin?.id === pin.id}
                />
              ))}
            </svg>
          </div>

          {/* Pin detail popup */}
          {selectedPin && (
            <div className="absolute top-4 right-4">
              <MapPinDetail
                pin={selectedPin}
                onClose={() => setSelectedPin(null)}
              />
            </div>
          )}

          {/* Add pin form */}
          {showForm && (
            <div className="absolute top-4 left-4 w-80 z-30">
              <MapPinForm
                prefill={pendingMapProject}
                onSubmit={handleSubmitPin}
                onCancel={() => {
                  setShowForm(false);
                  clearPendingMapProject();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
