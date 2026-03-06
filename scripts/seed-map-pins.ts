// Seed script: populates map_pins with existing research projects
// Run with: npx tsx scripts/seed-map-pins.ts

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qqseoidgqvzcpnkncuyw.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

if (!SERVICE_KEY) {
  console.error("Missing SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

type Quadrant = "physical_defense" | "physical_coordination" | "digital_defense" | "digital_coordination";

// Quadrant regions for pin placement (matching InteractiveMap.tsx)
const QUADRANT_REGIONS: Record<Quadrant, { xMin: number; xMax: number; yMin: number; yMax: number }> = {
  physical_defense: { xMin: 200, xMax: 1600, yMin: 200, yMax: 1100 },
  physical_coordination: { xMin: 1900, xMax: 3300, yMin: 200, yMax: 1100 },
  digital_defense: { xMin: 200, xMax: 1600, yMin: 1350, yMax: 2250 },
  digital_coordination: { xMin: 1900, xMax: 3300, yMin: 1350, yMax: 2250 },
};

function randomInRegion(quadrant: Quadrant) {
  const r = QUADRANT_REGIONS[quadrant];
  return {
    x: r.xMin + Math.random() * (r.xMax - r.xMin),
    y: r.yMin + Math.random() * (r.yMax - r.yMin),
  };
}

interface ProjectSeed {
  name: string;
  one_liner: string;
  quadrant: Quadrant;
  sector: string;
  tier: string;
  website_url?: string;
}

const PROJECTS: ProjectSeed[] = [
  // Physical Defense — Biodefense
  { name: "Varro Inc.", one_liner: "Biodefense technology — pathogen early warning", quadrant: "physical_defense", sector: "Biodefense & Health Systems", tier: "Tier 2" },
  { name: "Pathoplexus", one_liner: "Open source pathogen surveillance", quadrant: "physical_defense", sector: "Biodefense & Health Systems", tier: "Tier 2" },
  { name: "OSLUV", one_liner: "Open source UV air purification", quadrant: "physical_defense", sector: "Biodefense & Health Systems", tier: "Tier 2" },
  { name: "Openwater", one_liner: "Affordable non-invasive medical imaging", quadrant: "physical_defense", sector: "Biodefense & Health Systems", tier: "Tier 2" },
  { name: "MediLedger", one_liner: "Pharmaceutical supply chain verification", quadrant: "physical_defense", sector: "Biodefense & Health Systems", tier: "Tier 2" },
  // Physical Defense — Hardware
  { name: "GrapheneOS", one_liner: "Privacy-focused hardened Android OS", quadrant: "physical_defense", sector: "Open Source Hardware & Silicon", tier: "Tier 1", website_url: "https://grapheneos.org" },
  { name: "Freedom Factory (ethOS)", one_liner: "Ethereum-native mobile OS", quadrant: "physical_defense", sector: "Open Source Hardware & Silicon", tier: "Tier 2" },
  { name: "Nanographs", one_liner: "Open source semiconductor technology", quadrant: "physical_defense", sector: "Open Source Hardware & Silicon", tier: "Tier 3" },
  { name: "Open Silicon / RISC-V", one_liner: "Open instruction set architecture", quadrant: "physical_defense", sector: "Open Source Hardware & Silicon", tier: "Tier 3", website_url: "https://riscv.org" },
  // Physical Defense — Manufacturing
  { name: "k-scale", one_liner: "Open source robotics", quadrant: "physical_defense", sector: "Resilient Manufacturing", tier: "Tier 2" },
  { name: "SalvageGarden", one_liner: "Accessible mobility tech", quadrant: "physical_defense", sector: "Resilient Manufacturing", tier: "Tier 3" },
  { name: "Simula", one_liner: "Open source VR/AR computing", quadrant: "physical_defense", sector: "Resilient Manufacturing", tier: "Tier 3" },
  // Physical Coordination — Energy
  { name: "Power Ledger", one_liner: "Peer-to-peer energy trading", quadrant: "physical_coordination", sector: "Decentralized Energy", tier: "Tier 2", website_url: "https://powerledger.io" },
  { name: "Energy Web Foundation", one_liner: "Open-source energy sector blockchain", quadrant: "physical_coordination", sector: "Decentralized Energy", tier: "Tier 2", website_url: "https://energyweb.org" },
  // Physical Coordination — Property
  { name: "Georgia Land Registry", one_liner: "Government blockchain land registry", quadrant: "physical_coordination", sector: "Property Rights & Registries", tier: "Tier 2" },
  { name: "Dubai Property Platform", one_liner: "Blockchain property registration", quadrant: "physical_coordination", sector: "Property Rights & Registries", tier: "Tier 2" },
  { name: "RealT", one_liner: "Tokenized real estate ownership", quadrant: "physical_coordination", sector: "Property Rights & Registries", tier: "Tier 2" },
  // Physical Coordination — Carbon
  { name: "Toucan Protocol", one_liner: "On-chain carbon credit infrastructure", quadrant: "physical_coordination", sector: "Carbon & Environmental Markets", tier: "Tier 2" },
  { name: "KlimaDAO", one_liner: "Decentralized carbon offsetting", quadrant: "physical_coordination", sector: "Carbon & Environmental Markets", tier: "Tier 2" },
  // Digital Defense — ZK
  { name: "Aztec Network", one_liner: "Private smart contracts with Noir", quadrant: "digital_defense", sector: "Zero-Knowledge Systems", tier: "Tier 1", website_url: "https://aztec.network" },
  { name: "zkSync", one_liner: "ZK rollup with account abstraction", quadrant: "digital_defense", sector: "Zero-Knowledge Systems", tier: "Tier 1", website_url: "https://zksync.io" },
  { name: "StarkNet", one_liner: "STARK-based quantum-resistant L2", quadrant: "digital_defense", sector: "Zero-Knowledge Systems", tier: "Tier 1", website_url: "https://starknet.io" },
  { name: "Polygon", one_liner: "Multi-chain ZK scaling suite", quadrant: "digital_defense", sector: "Zero-Knowledge Systems", tier: "Tier 1", website_url: "https://polygon.technology" },
  { name: "Scroll", one_liner: "ZK rollup with EVM equivalence", quadrant: "digital_defense", sector: "Zero-Knowledge Systems", tier: "Tier 1", website_url: "https://scroll.io" },
  // Digital Defense — Privacy
  { name: "Zama", one_liner: "Fully Homomorphic Encryption (FHE)", quadrant: "digital_defense", sector: "Privacy-Preserving Computation", tier: "Tier 1", website_url: "https://zama.ai" },
  { name: "ZenGo", one_liner: "MPC-based keyless wallet", quadrant: "digital_defense", sector: "Privacy-Preserving Computation", tier: "Tier 2", website_url: "https://zengo.com" },
  { name: "Lit Protocol", one_liner: "Decentralized key management", quadrant: "digital_defense", sector: "Privacy-Preserving Computation", tier: "Tier 2" },
  // Digital Defense — Identity
  { name: "ENS", one_liner: "Decentralized naming standard", quadrant: "digital_defense", sector: "Decentralized Identity & Attestation", tier: "Tier 1", website_url: "https://ens.domains" },
  { name: "Polygon ID", one_liner: "ZK-based identity protocol", quadrant: "digital_defense", sector: "Decentralized Identity & Attestation", tier: "Tier 1", website_url: "https://polygon.technology" },
  { name: "EAS", one_liner: "Universal attestation standard", quadrant: "digital_defense", sector: "Decentralized Identity & Attestation", tier: "Tier 1", website_url: "https://attest.sh" },
  { name: "Worldcoin", one_liner: "Biometric proof of personhood", quadrant: "digital_defense", sector: "Decentralized Identity & Attestation", tier: "Tier 2", website_url: "https://worldcoin.org" },
  { name: "Gitcoin Passport", one_liner: "Sybil resistance via attestation stamps", quadrant: "digital_defense", sector: "Decentralized Identity & Attestation", tier: "Tier 2" },
  { name: "Zupass", one_liner: "ZK credential system from Zuzalu", quadrant: "digital_defense", sector: "Decentralized Identity & Attestation", tier: "Tier 1" },
  { name: "Semaphore", one_liner: "ZK group membership proofs", quadrant: "digital_defense", sector: "Decentralized Identity & Attestation", tier: "Tier 1", website_url: "https://semaphore.pse.dev" },
  // Digital Defense — Communication
  { name: "XMTP Labs", one_liner: "E2E encrypted web3 messaging", quadrant: "digital_defense", sector: "Communication & Messaging", tier: "Tier 1" },
  { name: "HOPR", one_liner: "Mixnet for metadata privacy", quadrant: "digital_defense", sector: "Communication & Messaging", tier: "Tier 2" },
  { name: "Waku", one_liner: "Censorship-resistant messaging", quadrant: "digital_defense", sector: "Communication & Messaging", tier: "Tier 2" },
  { name: "Signal", one_liner: "End-to-end encrypted messaging", quadrant: "digital_defense", sector: "Communication & Messaging", tier: "Tier 1", website_url: "https://signal.org" },
  { name: "Proton", one_liner: "Encrypted email and storage", quadrant: "digital_defense", sector: "Communication & Messaging", tier: "Tier 1", website_url: "https://proton.me" },
  // Digital Defense — Security
  { name: "Trail of Bits", one_liner: "Industry-leading security research", quadrant: "digital_defense", sector: "Formal Verification & Security", tier: "Tier 1" },
  { name: "OpenZeppelin", one_liner: "Smart contract security standards", quadrant: "digital_defense", sector: "Formal Verification & Security", tier: "Tier 1", website_url: "https://openzeppelin.com" },
  { name: "Spearbit", one_liner: "Expert security auditor network", quadrant: "digital_defense", sector: "Formal Verification & Security", tier: "Tier 1" },
  { name: "Immunefi", one_liner: "Largest web3 bug bounty platform", quadrant: "digital_defense", sector: "Formal Verification & Security", tier: "Tier 1" },
  { name: "Code4rena", one_liner: "Competitive crowdsourced audits", quadrant: "digital_defense", sector: "Formal Verification & Security", tier: "Tier 1" },
  // Digital Defense — DA & Storage
  { name: "Celestia", one_liner: "First modular DA layer", quadrant: "digital_defense", sector: "Data Availability & Storage", tier: "Tier 1", website_url: "https://celestia.org" },
  { name: "EigenDA", one_liner: "Restaked data availability", quadrant: "digital_defense", sector: "Data Availability & Storage", tier: "Tier 1" },
  { name: "Avail", one_liner: "Validity proofs for DA", quadrant: "digital_defense", sector: "Data Availability & Storage", tier: "Tier 2" },
  { name: "Filecoin", one_liner: "Decentralized storage with proofs", quadrant: "digital_defense", sector: "Data Availability & Storage", tier: "Tier 1", website_url: "https://filecoin.io" },
  { name: "Arweave", one_liner: "Permanent decentralized storage", quadrant: "digital_defense", sector: "Data Availability & Storage", tier: "Tier 1", website_url: "https://arweave.org" },
  { name: "Radicle", one_liner: "Peer-to-peer Git hosting", quadrant: "digital_defense", sector: "Data Availability & Storage", tier: "Tier 2", website_url: "https://radicle.xyz" },
  { name: "The Graph", one_liner: "Decentralized blockchain indexing", quadrant: "digital_defense", sector: "Data Availability & Storage", tier: "Tier 1", website_url: "https://thegraph.com" },
  // Digital Defense — Rollups
  { name: "Optimism", one_liner: "Optimistic rollup with RetroPGF", quadrant: "digital_defense", sector: "Zero-Knowledge Systems", tier: "Tier 2", website_url: "https://optimism.io" },
  { name: "Arbitrum", one_liner: "Largest L2 by TVL", quadrant: "digital_defense", sector: "Zero-Knowledge Systems", tier: "Tier 2", website_url: "https://arbitrum.io" },
  { name: "Base", one_liner: "Institutional on-ramp L2 (OP Stack)", quadrant: "digital_defense", sector: "Zero-Knowledge Systems", tier: "Tier 2", website_url: "https://base.org" },
  // Digital Coordination — Funding
  { name: "Gitcoin", one_liner: "Pioneered quadratic funding", quadrant: "digital_coordination", sector: "Democratic Funding Mechanisms", tier: "Tier 1", website_url: "https://gitcoin.co" },
  { name: "Optimism RetroPGF", one_liner: "Retroactive public goods funding", quadrant: "digital_coordination", sector: "Democratic Funding Mechanisms", tier: "Tier 1" },
  { name: "Octant", one_liner: "Epoch-based public goods funding", quadrant: "digital_coordination", sector: "Democratic Funding Mechanisms", tier: "Tier 2" },
  { name: "Hypercerts", one_liner: "Tokenized impact certificates", quadrant: "digital_coordination", sector: "Democratic Funding Mechanisms", tier: "Tier 2" },
  // Digital Coordination — Epistemics
  { name: "Metaculus", one_liner: "Track record-based prediction platform", quadrant: "digital_coordination", sector: "Epistemic Infrastructure", tier: "Tier 2", website_url: "https://metaculus.com" },
  { name: "Polymarket", one_liner: "Real-money prediction markets", quadrant: "digital_coordination", sector: "Epistemic Infrastructure", tier: "Tier 2", website_url: "https://polymarket.com" },
  // Digital Coordination — Governance
  { name: "Safe", one_liner: "Industry standard multisig ($100B+ secured)", quadrant: "digital_coordination", sector: "Governance Tooling", tier: "Tier 1", website_url: "https://safe.global" },
  { name: "Snapshot", one_liner: "Gasless off-chain governance voting", quadrant: "digital_coordination", sector: "Governance Tooling", tier: "Tier 1", website_url: "https://snapshot.org" },
  { name: "Aragon", one_liner: "DAO creation and management framework", quadrant: "digital_coordination", sector: "Governance Tooling", tier: "Tier 2", website_url: "https://aragon.org" },
  { name: "Tally", one_liner: "Cross-protocol governance UI", quadrant: "digital_coordination", sector: "Governance Tooling", tier: "Tier 2", website_url: "https://tally.xyz" },
  // Digital Coordination — Monetary
  { name: "DAI (MakerDAO)", one_liner: "Decentralized overcollateralized stablecoin", quadrant: "digital_coordination", sector: "Decentralized Monetary Infrastructure", tier: "Tier 1" },
  { name: "Ethena (USDe)", one_liner: "Delta-neutral synthetic dollar", quadrant: "digital_coordination", sector: "Decentralized Monetary Infrastructure", tier: "Tier 2" },
  { name: "Uniswap", one_liner: "Largest DEX — 4000x capital efficiency", quadrant: "digital_coordination", sector: "Decentralized Monetary Infrastructure", tier: "Tier 2", website_url: "https://uniswap.org" },
  { name: "Aave", one_liner: "Decentralized lending with flash loans", quadrant: "digital_coordination", sector: "Decentralized Monetary Infrastructure", tier: "Tier 2", website_url: "https://aave.com" },
  // Digital Coordination — Oracles
  { name: "Chainlink", one_liner: "Leading oracle network (46-58% share)", quadrant: "digital_coordination", sector: "Oracle Networks", tier: "Tier 2", website_url: "https://chain.link" },
  { name: "Pyth", one_liner: "Sub-second price oracle", quadrant: "digital_coordination", sector: "Oracle Networks", tier: "Tier 2" },
  // Digital Coordination — Cross-chain
  { name: "LayerZero", one_liner: "Omnichain interoperability", quadrant: "digital_coordination", sector: "Cross-Chain Infrastructure", tier: "Tier 2", website_url: "https://layerzero.network" },
  { name: "CoW Protocol", one_liner: "MEV-protected batch auctions", quadrant: "digital_coordination", sector: "Cross-Chain Infrastructure", tier: "Tier 2" },
  // Digital Coordination — Streaming
  { name: "Sablier", one_liner: "Token streaming protocol", quadrant: "digital_coordination", sector: "Streaming & Treasury", tier: "Tier 2" },
  { name: "Superfluid", one_liner: "Programmable real-time cashflows", quadrant: "digital_coordination", sector: "Streaming & Treasury", tier: "Tier 2" },
  // Ecosystem
  { name: "Ethereum Foundation", one_liner: "Core Ethereum development and grants", quadrant: "digital_coordination", sector: "Ecosystem", tier: "Tier 1", website_url: "https://ethereum.org" },
  { name: "Foresight Institute", one_liner: "Longtermist technology research", quadrant: "digital_coordination", sector: "Ecosystem", tier: "Tier 2" },
];

async function seed() {
  console.log(`Seeding ${PROJECTS.length} projects into map_pins...`);

  // Check if already seeded
  const { count } = await supabase.from("map_pins").select("*", { count: "exact", head: true });
  if (count && count > 0) {
    console.log(`map_pins already has ${count} rows. Skipping seed.`);
    return;
  }

  const pins = PROJECTS.map((p) => {
    const pos = randomInRegion(p.quadrant);
    return {
      name: p.name,
      one_liner: p.one_liner,
      quadrant: p.quadrant,
      sector: p.sector,
      tier: p.tier,
      website_url: p.website_url || null,
      x: Math.round(pos.x),
      y: Math.round(pos.y),
      source: "seed",
    };
  });

  // Insert in batches of 25
  for (let i = 0; i < pins.length; i += 25) {
    const batch = pins.slice(i, i + 25);
    const { error } = await supabase.from("map_pins").insert(batch);
    if (error) {
      console.error(`Error inserting batch ${i / 25 + 1}:`, error.message);
    } else {
      console.log(`Inserted batch ${i / 25 + 1} (${batch.length} pins)`);
    }
  }

  const { count: finalCount } = await supabase.from("map_pins").select("*", { count: "exact", head: true });
  console.log(`Done! ${finalCount} pins in map_pins.`);
}

seed().catch(console.error);
