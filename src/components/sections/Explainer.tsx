"use client";

import { motion } from "framer-motion";

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
      className={`max-w-3xl mx-auto px-4 py-16 sm:py-24 ${className}`}
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

export default function Explainer() {
  return (
    <section id="explainer" className="relative">
      {/* Section A: The Problem */}
      <Section>
        <SectionTag>// The Problem</SectionTag>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-dacc-text mt-4 mb-8">
          Technology accelerates.
          <br />
          <span className="text-dacc-muted">That&apos;s not the question.</span>
        </h2>
        <div className="space-y-4 font-sans text-dacc-muted leading-relaxed">
          <p>
            The question is: <span className="text-dacc-text">acceleration toward what?</span>
          </p>
          <p>
            Toward centralized control? Or distributed resilience?
          </p>
          <p>
            Toward offense? Or defense?
          </p>
          <p className="text-dacc-green font-mono text-sm mt-8">
            d/acc is a filter. A framework. A diagnostic.
          </p>
          <p className="text-dacc-text">
            It asks: does this technology make the world more defensible, more
            democratic, more decentralized?
          </p>
        </div>

        {/* Fork diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 p-6 border border-dacc-green/20 bg-dacc-surface/50"
        >
          <div className="font-mono text-sm text-center">
            <div className="text-dacc-text mb-4">TECH ACCELERATION</div>
            <div className="text-dacc-muted mb-2">│</div>
            <div className="flex justify-center gap-12 sm:gap-24">
              <div className="text-center">
                <div className="text-dacc-red mb-2">╱</div>
                <div className="text-dacc-red font-bold">OFFENSE</div>
                <div className="text-dacc-muted text-xs mt-1">
                  Surveillance
                  <br />
                  Centralization
                  <br />
                  Control
                </div>
              </div>
              <div className="text-center">
                <div className="text-dacc-green mb-2">╲</div>
                <div className="text-dacc-green font-bold">DEFENSE</div>
                <div className="text-dacc-muted text-xs mt-1">
                  Privacy
                  <br />
                  Decentralization
                  <br />
                  Resilience
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Section B: The Axes */}
      <Section className="border-t border-dacc-green/10">
        <SectionTag>// The Axes</SectionTag>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-dacc-text mt-4 mb-8">
          Two dimensions.
          <br />
          <span className="text-dacc-green">Four quadrants.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="p-6 border border-dacc-cyan/20 bg-dacc-surface/30"
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
            className="p-6 border border-dacc-yellow/20 bg-dacc-surface/30"
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
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-dacc-text mt-4 mb-8">
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
        <p className="font-mono text-xs text-dacc-muted text-center mt-4">
          Explore the full interactive map below ↓
        </p>
      </Section>

      {/* Section D: The Four D's */}
      <Section className="border-t border-dacc-green/10">
        <SectionTag>// The Four D&apos;s Test</SectionTag>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-dacc-text mt-4 mb-8">
          The diagnostic checklist.
        </h2>
        <div className="space-y-4 mt-8">
          {[
            {
              letter: "D",
              word: "ecentralized",
              question: "Is control distributed? Can any single entity capture it?",
              color: "#00FF88",
            },
            {
              letter: "D",
              word: "emocratic",
              question: "Does it empower individuals? Does it enable coordination without coercion?",
              color: "#00D4FF",
            },
            {
              letter: "D",
              word: "ifferential",
              question: "Does it favor defense over offense? Does it shift the balance?",
              color: "#FFD93D",
            },
            {
              letter: "D",
              word: "efensive",
              question: "Is it resilient? Can it survive adversarial conditions?",
              color: "#00CED1",
            },
          ].map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-start gap-4 p-4 border border-dacc-surface bg-dacc-surface/30 hover:bg-dacc-surface/50 transition-colors"
            >
              <span
                className="font-mono text-2xl font-bold shrink-0"
                style={{ color: d.color }}
              >
                {d.letter}
              </span>
              <div>
                <div className="font-mono text-sm text-dacc-text">
                  <span style={{ color: d.color }}>{d.letter}</span>
                  {d.word}
                </div>
                <div className="font-sans text-sm text-dacc-muted mt-1">
                  {d.question}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section E: The Scoring */}
      <Section className="border-t border-dacc-green/10">
        <SectionTag>// The Scoring</SectionTag>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-dacc-text mt-4 mb-8">
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
        <div className="mt-8 p-4 border border-dacc-green/20 bg-dacc-surface/30">
          <p className="font-mono text-sm text-dacc-green">
            Ready to test a project?
          </p>
          <p className="font-sans text-sm text-dacc-muted mt-2">
            The analyzer below uses this exact rubric. Paste any URL and get an
            instant d/acc diagnostic.
          </p>
        </div>
      </Section>
    </section>
  );
}
