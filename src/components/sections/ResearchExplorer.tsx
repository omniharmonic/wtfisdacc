"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { SECTORS, PRIMITIVES, PROJECTS } from "@/lib/research-data";
import type { ResearchPrimitive, ResearchSector } from "@/lib/research-data";
import { QUADRANT_COLORS, QUADRANT_LABELS } from "@/lib/types";
import type { Quadrant } from "@/lib/types";
import { getAnonClient } from "@/lib/supabase";
import ProjectDetailModal from "@/components/ui/ProjectDetailModal";
import type { DetailItem } from "@/components/ui/ProjectDetailModal";
import type { UnifiedProject } from "@/components/ui/ProjectCardContent";

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
    tier_1: "#00FF88",
    tier_2: "#00D4FF",
    tier_3: "#FFD93D",
  };
  const label = tier.startsWith("tier_") ? tier.replace("tier_", "Tier ") : tier;
  return (
    <span
      className="font-mono text-[10px] px-1.5 py-0.5 border"
      style={{ color: colors[tier] || "#9999AA", borderColor: `${colors[tier] || "#9999AA"}40` }}
    >
      {label}
    </span>
  );
}

// Convert static ResearchProject to UnifiedProject
function staticToUnified(proj: typeof PROJECTS[number]): UnifiedProject {
  return {
    name: proj.name,
    description: proj.description,
    quadrant: proj.quadrant,
    category: proj.category,
    tier: proj.tier,
    totalScore: proj.daccScore,
    stage: proj.stage,
    differentiator: proj.differentiator,
    hasToken: proj.hasToken,
    tokenSymbol: proj.tokenSymbol,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function analysisToUnified(row: any): UnifiedProject {
  const total = (row.score_defensive || 0) + (row.score_decentralization || 0) +
                (row.score_democratic || 0) + (row.score_acceleration || 0);
  return {
    name: row.entity_name || "Unknown",
    description: row.one_liner || undefined,
    oneLiner: row.one_liner || undefined,
    quadrant: row.quadrant || "digital_defense",
    category: row.sector || row.entity_type || undefined,
    tier: row.tier || "not_aligned",
    totalScore: total,
    scores: {
      defensive: row.score_defensive || 0,
      decentralization: row.score_decentralization || 0,
      democratic: row.score_democratic || 0,
      acceleration: row.score_acceleration || 0,
    },
    websiteUrl: row.url || undefined,
    redFlags: row.red_flags || [],
    greenFlags: row.green_flags || [],
    waysIsDacc: row.ways_is_dacc || [],
    waysNotDacc: row.ways_not_dacc || [],
    waysMoreDacc: row.ways_more_dacc || [],
    source: "analyzer",
  };
}

export default function ResearchExplorer() {
  const [tab, setTab] = useState<Tab>("sectors");
  const [quadrantFilter, setQuadrantFilter] = useState<Quadrant | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedDetail, setSelectedDetail] = useState<DetailItem | null>(null);
  const [analyzedProjects, setAnalyzedProjects] = useState<UnifiedProject[]>([]);

  // Fetch analyzed projects from Supabase
  useEffect(() => {
    const client = getAnonClient();
    if (!client) return;

    client
      .from("analyses")
      .select("entity_name, entity_type, sector, quadrant, score_defensive, score_decentralization, score_democratic, score_acceleration, tier, one_liner, url, red_flags, green_flags, ways_is_dacc, ways_not_dacc, ways_more_dacc")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const rows = data as any[];
          // Deduplicate by name (keep most recent = first)
          const seen = new Set<string>();
          const unique = rows.filter((row) => {
            const name = (row.entity_name || "").toLowerCase();
            if (seen.has(name)) return false;
            seen.add(name);
            return true;
          });
          setAnalyzedProjects(unique.map(analysisToUnified));
        }
      });
  }, []);

  const filteredSectors = useMemo(
    () =>
      SECTORS.filter(
        (s) => quadrantFilter === "all" || s.quadrant === quadrantFilter
      ),
    [quadrantFilter]
  );

  const filteredPrimitives = useMemo(
    () => PRIMITIVES,
    []
  );

  // Merge static + analyzed projects, deduplicating by name
  const allProjects = useMemo(() => {
    const staticUnified = PROJECTS.map(staticToUnified);
    const staticNames = new Set(staticUnified.map((p) => p.name.toLowerCase()));
    // Add analyzed projects that aren't already in the static list
    const newFromAnalyzer = analyzedProjects.filter(
      (p) => !staticNames.has(p.name.toLowerCase())
    );
    return [...staticUnified, ...newFromAnalyzer];
  }, [analyzedProjects]);

  const filteredProjects = useMemo(() => {
    let p = allProjects;
    if (quadrantFilter !== "all") {
      p = p.filter((proj) => proj.quadrant === quadrantFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      p = p.filter(
        (proj) =>
          proj.name.toLowerCase().includes(q) ||
          (proj.category || "").toLowerCase().includes(q) ||
          (proj.description || "").toLowerCase().includes(q)
      );
    }
    return p;
  }, [quadrantFilter, search, allProjects]);

  const totalProjectCount = allProjects.length;

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
            {SECTORS.length} sectors, {PRIMITIVES.length} primitives, {totalProjectCount}+ projects mapped across the d/acc landscape.
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
              {t === "projects" && `Projects (${totalProjectCount})`}
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
                className="p-4 border bg-dacc-surface/30 hover:bg-dacc-surface/50 transition-colors cursor-pointer"
                style={{
                  borderColor: `${QUADRANT_COLORS[sector.quadrant]}20`,
                }}
                onClick={() => setSelectedDetail({ type: "sector", data: sector })}
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
                className="p-3 border border-dacc-surface bg-dacc-surface/30 hover:bg-dacc-surface/50 transition-colors flex flex-col sm:flex-row sm:items-center gap-2 cursor-pointer"
                onClick={() => setSelectedDetail({ type: "primitive", data: prim })}
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
                  key={`${proj.name}-${proj.source || "static"}`}
                  className="p-3 border bg-dacc-surface/30 hover:bg-dacc-surface/50 transition-colors cursor-pointer"
                  style={{
                    borderColor: `${QUADRANT_COLORS[proj.quadrant]}15`,
                  }}
                  onClick={() => setSelectedDetail({ type: "project", data: proj })}
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
                    {proj.source === "analyzer" && (
                      <span className="font-mono text-[10px] text-dacc-green/50 ml-auto shrink-0">
                        AI
                      </span>
                    )}
                  </div>
                  <div className="font-sans text-xs text-dacc-muted mb-2 line-clamp-2">
                    {proj.oneLiner || proj.description}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: QUADRANT_COLORS[proj.quadrant] }}
                    >
                      {proj.category || QUADRANT_LABELS[proj.quadrant]}
                    </span>
                    <span className="font-mono text-[10px] text-dacc-green">
                      {proj.totalScore}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {/* Detail modal */}
        {selectedDetail && (
          <ProjectDetailModal
            item={selectedDetail}
            onClose={() => setSelectedDetail(null)}
          />
        )}
      </div>
    </section>
  );
}
