import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAnalysisById } from "@/lib/supabase";
import ReportPageClient from "./ReportPageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const analysis = await getAnalysisById(id);

  if (!analysis) {
    return { title: "Report Not Found | WTF is d/acc?" };
  }

  const total =
    analysis.score_defensive +
    analysis.score_decentralization +
    analysis.score_democratic +
    analysis.score_acceleration;

  return {
    title: `${analysis.entity_name} | d/acc Score: ${total}/100`,
    description: analysis.one_liner || `d/acc analysis of ${analysis.entity_name}`,
    openGraph: {
      title: `${analysis.entity_name} — d/acc Score: ${total}/100`,
      description: analysis.one_liner || `d/acc analysis of ${analysis.entity_name}`,
    },
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { id } = await params;
  const analysis = await getAnalysisById(id);

  if (!analysis) {
    notFound();
  }

  return (
    <ReportPageClient
      analysis={{
        id: analysis.id,
        entityName: analysis.entity_name,
        entityType: analysis.entity_type,
        quadrant: analysis.quadrant,
        scores: {
          defensive: analysis.score_defensive,
          decentralization: analysis.score_decentralization,
          democratic: analysis.score_democratic,
          acceleration: analysis.score_acceleration,
        },
        tier: analysis.tier,
        redFlags: analysis.red_flags || [],
        greenFlags: analysis.green_flags || [],
        waysIsDacc: analysis.ways_is_dacc || [],
        waysNotDacc: analysis.ways_not_dacc || [],
        waysMoreDacc: analysis.ways_more_dacc || [],
        oneLiner: analysis.one_liner || "",
      }}
    />
  );
}
