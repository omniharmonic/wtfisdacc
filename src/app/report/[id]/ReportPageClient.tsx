"use client";

import ReportCard from "@/components/ui/ReportCard";
import type { AnalysisScores, Tier, Quadrant, EntityType } from "@/lib/types";

interface ReportPageClientProps {
  analysis: {
    id: string;
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
}

export default function ReportPageClient({ analysis }: ReportPageClientProps) {
  return (
    <div className="min-h-screen bg-dacc-bg py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <a
            href="/"
            className="font-mono text-sm text-dacc-green text-glow-green hover:underline"
          >
            WTF is d/acc?
          </a>
          <h1 className="font-mono text-2xl font-bold text-dacc-text mt-4">
            d/acc Analysis Report
          </h1>
        </div>

        <ReportCard result={analysis} analysisId={analysis.id} />

        {/* CTA */}
        <div className="mt-8 text-center space-y-4">
          <a href="/#analyzer" className="btn-primary">
            Run your own analysis
          </a>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              className="font-mono text-xs text-dacc-cyan hover:text-dacc-cyan/80"
            >
              [COPY LINK]
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `${analysis.entityName} scored ${
                  analysis.scores.defensive +
                  analysis.scores.decentralization +
                  analysis.scores.democratic +
                  analysis.scores.acceleration
                }/100 on the d/acc diagnostic\n\n${window?.location?.href || ""}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-dacc-cyan hover:text-dacc-cyan/80"
            >
              [SHARE ON X]
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
