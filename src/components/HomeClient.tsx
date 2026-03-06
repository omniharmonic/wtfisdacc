"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Explainer from "@/components/sections/Explainer";
import { MapProvider } from "@/lib/map-context";

const ResearchExplorer = dynamic(
  () => import("@/components/sections/ResearchExplorer"),
  {
    ssr: false,
    loading: () => (
      <div className="py-24 text-center font-mono text-dacc-muted">
        Loading research...
      </div>
    ),
  }
);

const Analyzer = dynamic(() => import("@/components/sections/Analyzer"), {
  ssr: false,
  loading: () => (
    <div className="py-24 text-center font-mono text-dacc-muted">
      Loading analyzer...
    </div>
  ),
});

const InteractiveMap = dynamic(
  () => import("@/components/sections/InteractiveMap"),
  {
    ssr: false,
    loading: () => (
      <div className="py-24 text-center font-mono text-dacc-muted">
        Loading map...
      </div>
    ),
  }
);

export default function HomeClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MapProvider>
      <Nav />
      <main>
        <Hero />
        <Explainer />
        <ResearchExplorer />
        <Analyzer />
        <InteractiveMap />
      </main>
      <footer className="py-8 px-4 border-t border-dacc-green/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-dacc-muted">
            WTF is d/acc? — An{" "}
            <a
              href="https://opencivics.co"
              className="text-dacc-green hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Civics
            </a>{" "}
            project
          </span>
          <span className="font-mono text-xs text-dacc-muted">
            Inspired by{" "}
            <span className="text-dacc-text">Vitalik Buterin&apos;s</span>{" "}
            d/acc philosophy
          </span>
        </div>
      </footer>
    </MapProvider>
  );
}
