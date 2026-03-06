"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "hero", label: "home" },
  { id: "explainer", label: "framework" },
  { id: "research", label: "research" },
  { id: "analyzer", label: "analyzer" },
  { id: "map", label: "map" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll-spy: find which section is most visible
      const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id));
      let current = "hero";
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section.id;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dacc-bg/90 backdrop-blur-md border-b border-dacc-green/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="#hero"
          className="font-mono text-sm font-bold text-dacc-green text-glow-green"
        >
          d/acc
        </a>
        <div className="flex items-center gap-1 sm:gap-4">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`font-mono text-xs sm:text-sm px-2 py-1 transition-colors ${
                active === id
                  ? "text-dacc-green"
                  : "text-dacc-muted hover:text-dacc-text"
              }`}
            >
              {active === id && (
                <span className="text-dacc-green mr-1">&gt;</span>
              )}
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
