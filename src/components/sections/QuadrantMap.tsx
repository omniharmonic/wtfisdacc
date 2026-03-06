"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUADRANTS, type QuadrantData, type Sector } from "@/lib/quadrant-data";

export default function QuadrantMap() {
  const [expandedQuadrant, setExpandedQuadrant] = useState<string | null>(null);
  const [expandedSector, setExpandedSector] = useState<string | null>(null);

  const toggleQuadrant = (id: string) => {
    if (expandedQuadrant === id) {
      setExpandedQuadrant(null);
      setExpandedSector(null);
    } else {
      setExpandedQuadrant(id);
      setExpandedSector(null);
    }
  };

  return (
    <section id="quadrant" className="py-16 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-dacc-green tracking-widest uppercase">
            // The Quadrant Map
          </span>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-dacc-text mt-4">
            The <span className="text-dacc-green text-glow-green">d/acc</span>{" "}
            landscape
          </h2>
          <p className="font-sans text-dacc-muted mt-2 max-w-lg mx-auto">
            Click any quadrant to explore its sectors, primitives, and example
            projects.
          </p>
        </div>

        {/* Axis labels */}
        <div className="relative">
          <div className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-mono text-xs text-dacc-muted whitespace-nowrap">
            ATOMS ← → BITS
          </div>
          <div className="text-center font-mono text-xs text-dacc-muted mb-2">
            DEFENSE ← → COORDINATION
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-6 sm:ml-8">
            {QUADRANTS.map((q) => (
              <QuadrantCard
                key={q.id}
                quadrant={q}
                isExpanded={expandedQuadrant === q.id}
                expandedSector={expandedSector}
                onToggle={() => toggleQuadrant(q.id)}
                onSectorToggle={(s) =>
                  setExpandedSector(expandedSector === s ? null : s)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuadrantCard({
  quadrant,
  isExpanded,
  expandedSector,
  onToggle,
  onSectorToggle,
}: {
  quadrant: QuadrantData;
  isExpanded: boolean;
  expandedSector: string | null;
  onToggle: () => void;
  onSectorToggle: (sector: string) => void;
}) {
  return (
    <motion.div
      layout
      className={`border bg-dacc-surface/30 cursor-pointer transition-all ${
        isExpanded ? "sm:col-span-2" : ""
      }`}
      style={{
        borderColor: isExpanded ? `${quadrant.color}50` : `${quadrant.color}20`,
        boxShadow: isExpanded ? `0 0 30px ${quadrant.color}10` : "none",
      }}
      onClick={() => !isExpanded && onToggle()}
    >
      <div
        className="p-4 sm:p-6 flex items-center justify-between"
        onClick={() => isExpanded && onToggle()}
      >
        <div>
          <div
            className="font-mono text-sm font-bold"
            style={{ color: quadrant.color }}
          >
            {quadrant.label}
          </div>
          <div className="font-sans text-xs text-dacc-muted mt-1">
            {quadrant.description}
          </div>
        </div>
        <span
          className="font-mono text-lg transition-transform"
          style={{
            color: quadrant.color,
            transform: isExpanded ? "rotate(45deg)" : "rotate(0)",
          }}
        >
          +
        </span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quadrant.sectors.map((sector) => (
                <SectorCard
                  key={sector.name}
                  sector={sector}
                  color={quadrant.color}
                  isExpanded={expandedSector === sector.name}
                  onToggle={() => onSectorToggle(sector.name)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SectorCard({
  sector,
  color,
  isExpanded,
  onToggle,
}: {
  sector: Sector;
  color: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border bg-dacc-bg/50 p-3 cursor-pointer transition-all hover:bg-dacc-bg/80"
      style={{ borderColor: `${color}20` }}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold" style={{ color }}>
          {sector.name}
        </span>
        <span className="font-mono text-xs" style={{ color }}>
          {isExpanded ? "−" : "+"}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {sector.primitives.map((p) => (
          <span
            key={p}
            className="font-mono text-[10px] px-1.5 py-0.5 bg-dacc-surface text-dacc-muted"
          >
            {p}
          </span>
        ))}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 space-y-2"
          >
            {sector.projects.map((project) => (
              <a
                key={project.name}
                href={`#analyzer`}
                onClick={(e) => e.stopPropagation()}
                className="block p-2 bg-dacc-surface/50 border border-dacc-surface hover:border-dacc-green/20 transition-colors"
              >
                <div className="font-mono text-xs text-dacc-text">
                  {project.name}
                </div>
                <div className="font-sans text-[10px] text-dacc-muted">
                  {project.oneLiner}
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
