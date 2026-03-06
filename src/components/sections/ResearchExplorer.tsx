"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SECTORS, PRIMITIVES, PROJECTS } from "@/lib/research-data";
import { QUADRANT_COLORS, QUADRANT_LABELS } from "@/lib/types";
import type { Quadrant } from "@/lib/types";

type Tab = "sectors" | "primitives" | "projects";

const QUADRANT_FILTER_OPTIONS: { id: Quadrant | "all"; label: string; color: string }[] = [
  { id: "all", label: "All", color: "#E0E0E0" },
  { id: "physical_defense", label: "Phys. Defense", color: QUADRANT_COLORS.physical_defense },
  { id: "physical_coordination", label: "Phys. Coord.", color: QUADRANT_COLORS.physical_coordination },
  { id: "digital_defense", label: "Dig. Defense", color: QUADRANT_COLORS.digital_defense },
  { id: "digital_coordination", label: "Dig. Coord.", color: QUADRANT_COLORS.digital_coordination },
];

function TierBadgeSmall({ tier }: { tier: string }) {
  const colors: Record<string, string> = {
    "Tier 1": "#00FF88",
    "Tier 2": "#00D4FF",
    "Tier 3": "#FFD93D",
  };
  return (
    <span
      className="font-mono text-[10px] px-1.5 py-0.5 border"
      style={{ color: colors[tier] || "#9999AA", borderColor: `${colors[tier] || "#9999AA"}40` }}
    >
      {tier}
    </span>
  );
}

export default function ResearchExplorer() {
  const [tab, setTab] = useState<Tab>("sectors");
  const [quadrantFilter, setQuadrantFilter] = useState<Quadrant | "all">("all");
  const [search, setSearch] = useState("");

  const filteredSectors = useMemo(
    () =>
      SECTORS.filter(
        (s) => quadrantFilter === "all" || s.quadrant === quadrantFilter
      ),
    [quadrantFilter]
  );

  const filteredPrimitives = useMemo(
    () => PRIMITIVES, // primitives don't have a quadrant directly, show all
    []
  );

  const filteredProjects = useMemo(() => {
    let p = PROJECTS;
    if (quadrantFilter !== "all") {
      p = p.filter((proj) => proj.quadrant === quadrantFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      p = p.filter(
        (proj) =>
          proj.name.toLowerCase().includes(q) ||
          proj.category.toLowerCase().includes(q) ||
          proj.description.toLowerCase().includes(q)
      );
    }
    return p;
  }, [quadrantFilter, search]);

  return (
    <section id="research" className="py-16 sm:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-dacc-green tracking-widest uppercase">
            // The Research
          </span>
          <h2 className="font-mono text-2xl sm:text-4xl font-bold text-dacc-text mt-4">
            The d/acc{" "}
            <span className="text-dacc-green text-glow-green">taxonomy</span>.
          </h2>
          <p className="font-sans text-dacc-muted mt-2 max-w-lg mx-auto">
            {SECTORS.length} sectors, {PRIMITIVES.length} primitives, {PROJECTS.length}+ projects mapped across the d/acc landscape.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-6 overflow-x-auto scrollbar-hide">
          {(["sectors", "primitives", "projects"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-mono text-xs sm:text-sm px-3 sm:px-4 py-2 border transition-colors whitespace-nowrap shrink-0 ${
                tab === t
                  ? "bg-dacc-green/10 border-dacc-green/40 text-dacc-green"
                  : "border-dacc-surface text-dacc-muted hover:text-dacc-text hover:border-dacc-green/20"
              }`}
            >
              {t === "sectors" && `Sectors (${SECTORS.length})`}
              {t === "primitives" && `Primitives (${PRIMITIVES.length})`}
              {t === "projects" && `Projects (${PROJECTS.length})`}
            </button>
          ))}
        </div>

        {/* Quadrant filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {QUADRANT_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setQuadrantFilter(opt.id)}
              className={`font-mono text-xs px-3 py-1 border transition-colors ${
                quadrantFilter === opt.id
                  ? "bg-dacc-surface"
                  : "hover:bg-dacc-surface/50"
              }`}
              style={{
                borderColor:
                  quadrantFilter === opt.id ? `${opt.color}60` : `${opt.color}20`,
                color: quadrantFilter === opt.id ? opt.color : "#9999AA",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Search (projects tab only) */}
        {tab === "projects" && (
          <div className="max-w-md mx-auto mb-6">
            <div className="flex items-center gap-2 border border-dacc-green/20 bg-dacc-surface/30 px-3 py-2">
              <span className="text-dacc-green font-mono text-sm shrink-0">
                search&gt;
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="filter projects..."
                className="flex-1 bg-transparent border-none outline-none text-dacc-text font-mono text-sm placeholder:text-dacc-muted/50"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-dacc-muted hover:text-dacc-text font-mono text-xs"
                >
                  [clear]
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        {tab === "sectors" && (
          <motion.div
            key="sectors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {filteredSectors.map((sector) => (
              <div
                key={sector.name}
                className="p-4 border bg-dacc-surface/30 hover:bg-dacc-surface/50 transition-colors"
                style={{
                  borderColor: `${QUADRANT_COLORS[sector.quadrant]}20`,
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div
                    className="font-mono text-sm font-bold"
                    style={{ color: QUADRANT_COLORS[sector.quadrant] }}
                  >
                    {sector.name}
                  </div>
                </div>
                <div className="font-sans text-xs text-dacc-muted mb-3 line-clamp-2">
                  {sector.description}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-dacc-muted">
                    {QUADRANT_LABELS[sector.quadrant]}
                  </span>
                  <span className="font-mono text-[10px] text-dacc-text">
                    {sector.marketSize}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-[10px] text-dacc-muted">
                    → {sector.projection}
                  </span>
                  <span className="font-mono text-[10px] text-dacc-muted">
                    {sector.projectCount} projects
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === "primitives" && (
          <motion.div
            key="primitives"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            {filteredPrimitives.map((prim) => (
              <div
                key={prim.name}
                className="p-3 border border-dacc-surface bg-dacc-surface/30 hover:bg-dacc-surface/50 transition-colors flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <div className="flex items-center gap-2 sm:w-64 shrink-0">
                  <TierBadgeSmall tier={prim.tier} />
                  <span className="font-mono text-sm text-dacc-text font-bold">
                    {prim.name}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="font-sans text-xs text-dacc-muted">
                    {prim.description}
                  </span>
                </div>
                <div className="sm:w-20 shrink-0 text-right">
                  <span className="font-mono text-xs text-dacc-muted">
                    {prim.stage}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === "projects" && (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="font-mono text-xs text-dacc-muted mb-3 text-center">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.name}
                  className="p-3 border bg-dacc-surface/30 hover:bg-dacc-surface/50 transition-colors"
                  style={{
                    borderColor: `${QUADRANT_COLORS[proj.quadrant]}15`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TierBadgeSmall tier={proj.tier} />
                    <span className="font-mono text-sm text-dacc-text font-bold truncate">
                      {proj.name}
                    </span>
                    {proj.hasToken && proj.tokenSymbol && (
                      <span className="font-mono text-[10px] text-dacc-cyan">
                        ${proj.tokenSymbol}
                      </span>
                    )}
                  </div>
                  <div className="font-sans text-xs text-dacc-muted mb-2 line-clamp-2">
                    {proj.description}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: QUADRANT_COLORS[proj.quadrant] }}
                    >
                      {proj.category}
                    </span>
                    <span className="font-mono text-[10px] text-dacc-green">
                      {proj.daccScore}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
