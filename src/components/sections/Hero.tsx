"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import GlitchText from "@/components/ui/GlitchText";
import TypeWriter from "@/components/ui/TypeWriter";

const MatrixRain = dynamic(() => import("@/components/ui/MatrixRain"), {
  ssr: false,
});

export default function Hero() {
  const [showTagline, setShowTagline] = useState(false);

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Matrix rain background */}
      <div className="absolute inset-0 z-0">
        <MatrixRain />
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dacc-bg/60 via-transparent to-dacc-bg" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <GlitchText>
          <h1 className="font-mono text-5xl sm:text-6xl md:text-7xl font-bold text-dacc-green text-glow-green">
            WTF is d/acc?
          </h1>
        </GlitchText>

        <div className="mt-6 h-8">
          <TypeWriter
            text="Decentralized. Democratic. Differential. Defensive."
            speed={40}
            className="font-mono text-lg sm:text-xl text-dacc-muted"
            onComplete={() => setShowTagline(true)}
          />
        </div>

        <div
          className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center transition-opacity duration-1000 ${
            showTagline ? "opacity-100" : "opacity-0"
          }`}
        >
          <a href="#explainer" className="btn-primary">
            Learn the framework
          </a>
          <a href="#analyzer" className="btn-secondary">
            Analyze a project
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-dacc-muted">scroll to learn</span>
        <div className="w-px h-8 bg-gradient-to-b from-dacc-green/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
