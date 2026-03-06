"use client";

import { useState, useEffect } from "react";
import { QUADRANT_LABELS } from "@/lib/types";
import type { Quadrant } from "@/lib/types";
import type { PendingMapProject } from "@/lib/map-context";

const SECTOR_OPTIONS: Record<Quadrant, string[]> = {
  physical_defense: ["Biodefense & Health Systems", "Open Source Hardware & Silicon", "Resilient Manufacturing"],
  physical_coordination: ["Decentralized Energy", "Property Rights & Registries", "Carbon & Environmental Markets", "Civic Tech"],
  digital_defense: ["Zero-Knowledge Systems", "Privacy-Preserving Computation", "Decentralized Identity & Attestation", "Communication & Messaging", "Formal Verification & Security", "Data Availability & Storage"],
  digital_coordination: ["Democratic Funding Mechanisms", "Epistemic Infrastructure", "Governance Tooling", "Decentralized Monetary Infrastructure", "Oracle Networks", "Cross-Chain Infrastructure", "Streaming & Treasury"],
};

interface MapPinFormProps {
  prefill?: PendingMapProject | null;
  onSubmit: (data: {
    name: string;
    one_liner: string;
    quadrant: Quadrant;
    sector: string;
    website_url: string;
    image_url: string;
  }) => void;
  onCancel: () => void;
}

export default function MapPinForm({ prefill, onSubmit, onCancel }: MapPinFormProps) {
  const [name, setName] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [quadrant, setQuadrant] = useState<Quadrant>("digital_defense");
  const [sector, setSector] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (prefill) {
      setName(prefill.name);
      setOneLiner(prefill.oneLiner);
      setQuadrant(prefill.quadrant);
      setSector(prefill.sector || "");
      setWebsiteUrl(prefill.websiteUrl || "");
      setImageUrl(prefill.logoUrl || "");
    }
  }, [prefill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      one_liner: oneLiner.trim(),
      quadrant,
      sector,
      website_url: websiteUrl.trim(),
      image_url: imageUrl.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-dacc-green/30 bg-dacc-bg/95 backdrop-blur-sm p-4 space-y-3"
    >
      <div className="font-mono text-sm text-dacc-green mb-2">
        ADD PIN TO MAP
      </div>

      <div>
        <label className="font-mono text-xs text-dacc-muted block mb-1">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-dacc-surface/50 border border-dacc-green/20 px-2 py-1.5 text-dacc-text font-mono text-sm outline-none focus:border-dacc-green/40"
          required
        />
      </div>

      <div>
        <label className="font-mono text-xs text-dacc-muted block mb-1">One-liner</label>
        <input
          type="text"
          value={oneLiner}
          onChange={(e) => setOneLiner(e.target.value)}
          className="w-full bg-dacc-surface/50 border border-dacc-green/20 px-2 py-1.5 text-dacc-text font-mono text-sm outline-none focus:border-dacc-green/40"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-mono text-xs text-dacc-muted block mb-1">Quadrant *</label>
          <select
            value={quadrant}
            onChange={(e) => {
              setQuadrant(e.target.value as Quadrant);
              setSector("");
            }}
            className="w-full bg-dacc-surface/50 border border-dacc-green/20 px-2 py-1.5 text-dacc-text font-mono text-sm outline-none"
          >
            {Object.entries(QUADRANT_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-mono text-xs text-dacc-muted block mb-1">Sector</label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full bg-dacc-surface/50 border border-dacc-green/20 px-2 py-1.5 text-dacc-text font-mono text-sm outline-none"
          >
            <option value="">Select...</option>
            {SECTOR_OPTIONS[quadrant].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="font-mono text-xs text-dacc-muted block mb-1">Website URL</label>
        <input
          type="url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          className="w-full bg-dacc-surface/50 border border-dacc-green/20 px-2 py-1.5 text-dacc-text font-mono text-sm outline-none focus:border-dacc-green/40"
          placeholder="https://"
        />
      </div>

      <div>
        <label className="font-mono text-xs text-dacc-muted block mb-1">Logo URL</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full bg-dacc-surface/50 border border-dacc-green/20 px-2 py-1.5 text-dacc-text font-mono text-sm outline-none focus:border-dacc-green/40"
          placeholder="https://..."
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn-primary flex-1 text-sm py-2">
          ADD PIN
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex-1 text-sm py-2"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}
