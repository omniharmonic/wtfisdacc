"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const AuthoritarianGraph = dynamic(
  () => import("@/components/ui/AuthoritarianGraph"),
  { ssr: false }
);

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      {...fadeInUp}
      className={`max-w-3xl mx-auto px-4 py-12 sm:py-24 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SectionTag({ children }: { children: string }) {
  return (
    <span className="font-mono text-xs text-dacc-green tracking-widest uppercase">
      {children}
    </span>
  );
}

const FOUR_DS = [
  {
    letter: "D",
    word: "efensive",
    question: "Does this make it easier to defend against harm than to cause harm?",
    color: "#00FF88",
    explanation:
      "Technologies that shift the offense/defense balance toward protection rather than attack. The core d/acc insight: we should accelerate technologies where defense has a structural advantage.",
    qualities: [
      "Shifts offense/defense balance toward defense",
      "Enables defense without centralized authority",
      "Resilient to single points of failure",
      "Protection improves faster than attack capability",
    ],
    greenFlags: [
      "ZK proofs enabling verification without exposure",
      "Social recovery wallets protecting against key loss",
      "Far-UVC light that kills pathogens universally",
    ],
    redFlags: [
      "Creates new attack surfaces",
      "Enables cheaper harm than protection",
      "Facilitates surveillance infrastructure",
    ],
  },
  {
    letter: "D",
    word: "ecentralized",
    question: "Can this operate without requiring trust that centralized actors will remain benevolent?",
    color: "#00D4FF",
    explanation:
      "Technologies that can operate without a single controlling entity or trusted third party. The key test: would this still work if the current operators became adversarial?",
    qualities: [
      "Control distributed across many actors",
      "Resistant to capture by any single entity",
      "Open-source codebase and transparent operation",
      "No centralized upgrade authority or kill switch",
    ],
    greenFlags: [
      "Bitcoin's permissionless consensus",
      "IPFS content addressing",
      "Ethereum's 800K+ validator set",
    ],
    redFlags: [
      "Requires trust in 'good guys' staying good",
      "Single points of failure",
      "Centralized upgrade authority",
    ],
  },
  {
    letter: "D",
    word: "emocratic",
    question: "Does this enable more people to participate meaningfully in governance and coordination?",
    color: "#FFD93D",
    explanation:
      "Technologies that enable broader participation in decisions and resist capture by small groups. Not majority-rule voting, but mechanisms that surface genuine community preferences.",
    qualities: [
      "Empowers individuals over institutions",
      "Enables coordination without coercion",
      "Preserves user sovereignty",
      "Resists plutocratic capture",
    ],
    greenFlags: [
      "Quadratic voting reducing whale dominance",
      "Community Notes finding cross-partisan consensus",
      "Retroactive public goods funding",
    ],
    redFlags: [
      "Concentrates capability in small groups",
      "Creates plutocratic dynamics (pay-to-play)",
      "Excludes participation based on resources",
    ],
  },
  {
    letter: "D",
    word: "ifferential",
    question: "Does this make defense grow faster than offense over time?",
    color: "#00CED1",
    explanation:
      "Technologies that accelerate defense capabilities faster than offense capabilities. The 'd' in d/acc — not all acceleration is equal; what matters is the differential between defensive and offensive uses.",
    qualities: [
      "Defense benefits more from improvements than offense",
      "Creates compounding defensive advantages",
      "Reduces the cost of protection faster than the cost of attack",
      "Viable path to mainstream adoption",
    ],
    greenFlags: [
      "Far-UVC (kills pathogens universally without targeting)",
      "Air filtering (pure defense, no offensive use)",
      "Encryption (asymmetric advantage for defenders)",
    ],
    redFlags: [
      "Equally useful for harmful applications",
      "Offense benefits more from improvements",
      "Creates arms race dynamics",
    ],
  },
];

function FourDsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Section className="border-t border-dacc-green/10">
      <SectionTag>// The Four D&apos;s Test</SectionTag>
      <h2 className="font-mono text-2xl sm:text-4xl font-bold text-dacc-text mt-4 mb-8">
        The diagnostic checklist.
      </h2>
      <div className="space-y-4 mt-8">
        {FOUR_DS.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="border bg-dacc-surface/30 hover:bg-dacc-surface/50 transition-colors cursor-pointer"
            style={{ borderColor: expanded === i ? `${d.color}40` : "var(--color-dacc-surface)" }}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="flex items-start gap-4 p-4">
              <span
                className="font-mono text-2xl font-bold shrink-0"
                style={{ color: d.color }}
              >
                {d.letter}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-dacc-text">
                    <span style={{ color: d.color }}>{d.letter}</span>
                    {d.word}
                  </div>
                  <span
                    className="font-mono text-lg transition-transform shrink-0"
                    style={{
                      color: d.color,
                      transform: expanded === i ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    +
                  </span>
                </div>
                <div className="font-sans text-sm text-dacc-muted mt-1">
                  {d.question}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-4 border-t border-dacc-surface ml-10">
                    <p className="font-sans text-sm text-dacc-muted pt-4">
                      {d.explanation}
                    </p>

                    <div>
                      <div className="font-mono text-xs text-dacc-text mb-2">
                        KEY QUALITIES
                      </div>
                      <ul className="space-y-1">
                        {d.qualities.map((q, j) => (
                          <li key={j} className="font-sans text-xs text-dacc-muted flex gap-2">
                            <span style={{ color: d.color }}>•</span> {q}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 border border-dacc-green/20 bg-dacc-bg/50">
                        <div className="font-mono text-xs text-dacc-green mb-2">
                          PASSES
                        </div>
                        <ul className="space-y-1">
                          {d.greenFlags.map((f, j) => (
                            <li key={j} className="font-sans text-xs text-dacc-muted flex gap-2">
                              <span className="text-dacc-green shrink-0">+</span> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 border border-dacc-red/20 bg-dacc-bg/50">
                        <div className="font-mono text-xs text-dacc-red mb-2">
                          FAILS
                        </div>
                        <ul className="space-y-1">
                          {d.redFlags.map((f, j) => (
                            <li key={j} className="font-sans text-xs text-dacc-muted flex gap-2">
                              <span className="text-dacc-red shrink-0">-</span> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default function Explainer() {
  return (
    <section id="explainer" className="relative">
      {/* Section A: The Problem */}
      <Section>
        <SectionTag>// The Problem</SectionTag>
        <h2 className="font-mono text-2xl sm:text-4xl font-bold text-dacc-text mt-4 mb-8">
          The default trajectory
          <br />
          <span className="text-dacc-red">is authoritarian.</span>
        </h2>
        <div className="space-y-4 font-sans text-dacc-muted leading-relaxed">
          <p>
            AI surveillance systems that predict and punish dissent.
            Centralized platforms that control what billions can say, see, and
            sell. Digital censorship infrastructure that can be activated with
            a single policy change.{" "}
            <span className="text-dacc-text">
              These aren&apos;t hypotheticals — they&apos;re accelerating.
            </span>
          </p>
          <p>
            Without strategic countermeasures, every breakthrough in AI, biotech,
            and networking concentrates more power in fewer hands. The window to
            build defensible alternatives is narrowing.
          </p>
          <p className="text-dacc-green font-mono text-sm mt-8">
            d/acc is the counterstrategy.
          </p>
          <p className="text-dacc-text">
            A framework for accelerating the technologies that preserve human
            flourishing and democracy — and identifying the ones that don&apos;t.
          </p>
        </div>

        {/* Animated divergence graph */}
        <AuthoritarianGraph />
      </Section>

      {/* Section B: The Axes */}
      <Section className="border-t border-dacc-green/10">
        <SectionTag>// The Axes</SectionTag>
        <h2 className="font-mono text-2xl sm:text-4xl font-bold text-dacc-text mt-4 mb-8">
          Two dimensions.
          <br />
          <span className="text-dacc-green">Four quadrants.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="p-4 sm:p-6 border border-dacc-cyan/20 bg-dacc-surface/30"
          >
            <div className="font-mono text-dacc-cyan font-bold mb-2">
              Y-AXIS: ATOMS ↔ BITS
            </div>
            <p className="text-sm text-dacc-muted">
              <span className="text-dacc-text">Physical</span> (atoms): biosecurity,
              energy, hardware.
              <br />
              <span className="text-dacc-text">Digital</span> (bits): cryptography,
              protocols, software.
            </p>
          </motion.div>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="p-4 sm:p-6 border border-dacc-yellow/20 bg-dacc-surface/30"
          >
            <div className="font-mono text-dacc-yellow font-bold mb-2">
              X-AXIS: SURVIVE ↔ THRIVE
            </div>
            <p className="text-sm text-dacc-muted">
              <span className="text-dacc-text">Defense</span>: protecting against threats,
              building resilience.
              <br />
              <span className="text-dacc-text">Coordination</span>: enabling cooperation,
              creating abundance.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Section C: The Quadrant Preview */}
      <Section className="border-t border-dacc-green/10">
        <SectionTag>// The Map</SectionTag>
        <h2 className="font-mono text-2xl sm:text-4xl font-bold text-dacc-text mt-4 mb-8">
          The d/acc landscape.
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-1 mt-8"
        >
          {[
            {
              label: "Physical Defense",
              color: "#00FF88",
              examples: "Biosecurity, Clean Energy, Hardware",
            },
            {
              label: "Physical Coordination",
              color: "#FFD93D",
              examples: "Urban Planning, Supply Chains, Health",
            },
            {
              label: "Digital Defense",
              color: "#00D4FF",
              examples: "ZK Proofs, Encryption, Privacy Tools",
            },
            {
              label: "Digital Coordination",
              color: "#00CED1",
              examples: "DAOs, Quadratic Voting, Prediction Markets",
            },
          ].map((q) => (
            <div
              key={q.label}
              className="p-4 sm:p-6 bg-dacc-surface/50 border transition-all hover:shadow-lg"
              style={{ borderColor: `${q.color}30` }}
            >
              <div
                className="font-mono text-sm font-bold mb-2"
                style={{ color: q.color }}
              >
                {q.label}
              </div>
              <div className="font-sans text-xs text-dacc-muted">
                {q.examples}
              </div>
            </div>
          ))}
        </motion.div>
        <div className="text-center mt-6">
          <a href="#map" className="btn-secondary inline-block">
            Explore the interactive map ↓
          </a>
        </div>
      </Section>

      {/* Section D: The Four D's */}
      <FourDsSection />

      {/* Section E: The Scoring */}
      <Section className="border-t border-dacc-green/10">
        <SectionTag>// The Scoring</SectionTag>
        <h2 className="font-mono text-2xl sm:text-4xl font-bold text-dacc-text mt-4 mb-8">
          100 points. Four dimensions.
        </h2>
        <p className="text-dacc-muted font-sans mb-8">
          Each project is scored across four dimensions (25 points each), then
          classified into tiers:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { range: "85-100", tier: "Tier 1", label: "Core d/acc", color: "#00FF88" },
            { range: "70-84", tier: "Tier 2", label: "Growth", color: "#00D4FF" },
            { range: "55-69", tier: "Tier 3", label: "Speculative", color: "#FFD93D" },
            { range: "<55", tier: "N/A", label: "Not Aligned", color: "#FF4444" },
          ].map((t) => (
            <div
              key={t.tier}
              className="p-4 text-center border bg-dacc-surface/30"
              style={{ borderColor: `${t.color}30` }}
            >
              <div
                className="font-mono text-2xl font-bold"
                style={{ color: t.color }}
              >
                {t.range}
              </div>
              <div className="font-mono text-xs text-dacc-text mt-1">
                {t.tier}
              </div>
              <div className="font-sans text-xs text-dacc-muted mt-1">
                {t.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#analyzer" className="btn-primary inline-block">
            Ready to test a project? →
          </a>
          <p className="font-sans text-sm text-dacc-muted mt-3">
            The analyzer below uses this exact rubric. Paste any URL and get an
            instant d/acc diagnostic.
          </p>
        </div>
      </Section>
    </section>
  );
}
