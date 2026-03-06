export interface Project {
  name: string;
  oneLiner: string;
  url: string;
}

export interface Sector {
  name: string;
  primitives: string[];
  projects: Project[];
}

export interface QuadrantData {
  id: string;
  label: string;
  color: string;
  description: string;
  sectors: Sector[];
}

export const QUADRANTS: QuadrantData[] = [
  {
    id: "physical_defense",
    label: "Physical Defense",
    color: "#00FF88",
    description: "Technologies protecting physical infrastructure and biological systems",
    sectors: [
      {
        name: "Biosecurity",
        primitives: ["Pathogen surveillance", "Decentralized testing", "Open-source vaccines"],
        projects: [
          { name: "SecureDNA", oneLiner: "DNA synthesis screening", url: "https://securedna.org" },
          { name: "Nucleic Acid Observatory", oneLiner: "Wastewater pathogen detection", url: "https://www.naobservatory.org" },
        ],
      },
      {
        name: "Clean Energy",
        primitives: ["Solar manufacturing", "Grid decentralization", "Energy storage"],
        projects: [
          { name: "Solar Commons", oneLiner: "Community-owned solar", url: "#" },
        ],
      },
      {
        name: "Hardware Security",
        primitives: ["Open-source chips", "Secure enclaves", "Supply chain verification"],
        projects: [
          { name: "GrapheneOS", oneLiner: "Privacy-focused mobile OS", url: "https://grapheneos.org" },
          { name: "RISC-V", oneLiner: "Open instruction set architecture", url: "https://riscv.org" },
        ],
      },
    ],
  },
  {
    id: "physical_coordination",
    label: "Physical Coordination",
    color: "#FFD93D",
    description: "Systems enabling cooperation in the physical world",
    sectors: [
      {
        name: "Healthcare",
        primitives: ["Decentralized clinical trials", "Health data sovereignty", "Open pharma"],
        projects: [
          { name: "VitaDAO", oneLiner: "Decentralized longevity research", url: "https://vitadao.com" },
          { name: "DeSci Labs", oneLiner: "Open science infrastructure", url: "https://desci.com" },
        ],
      },
      {
        name: "Supply Chains",
        primitives: ["Provenance tracking", "Fair trade verification", "Logistics coordination"],
        projects: [
          { name: "Baseline Protocol", oneLiner: "Enterprise coordination via ZK", url: "https://baseline-protocol.org" },
        ],
      },
      {
        name: "Urban Planning",
        primitives: ["Participatory budgeting", "Land registries", "Public goods funding"],
        projects: [
          { name: "CityDAO", oneLiner: "On-chain land ownership", url: "https://citydao.io" },
        ],
      },
    ],
  },
  {
    id: "digital_defense",
    label: "Digital Defense",
    color: "#00D4FF",
    description: "Cryptographic and software tools for digital sovereignty",
    sectors: [
      {
        name: "Privacy",
        primitives: ["Zero-knowledge proofs", "FHE", "MPC"],
        projects: [
          { name: "Aztec Network", oneLiner: "Private smart contracts via ZK", url: "https://aztec.network" },
          { name: "Zama", oneLiner: "Fully homomorphic encryption tooling", url: "https://zama.ai" },
          { name: "Semaphore", oneLiner: "ZK group membership proofs", url: "https://semaphore.pse.dev" },
        ],
      },
      {
        name: "Identity",
        primitives: ["Self-sovereign ID", "Verifiable credentials", "Sybil resistance"],
        projects: [
          { name: "World ID", oneLiner: "Proof of personhood", url: "https://worldcoin.org" },
          { name: "Polygon ID", oneLiner: "ZK identity framework", url: "https://polygon.technology" },
          { name: "EAS", oneLiner: "Ethereum Attestation Service", url: "https://attest.sh" },
        ],
      },
      {
        name: "Encryption",
        primitives: ["E2E messaging", "Encrypted storage", "Key management"],
        projects: [
          { name: "Signal", oneLiner: "End-to-end encrypted messaging", url: "https://signal.org" },
          { name: "Proton", oneLiner: "Encrypted email and storage", url: "https://proton.me" },
        ],
      },
    ],
  },
  {
    id: "digital_coordination",
    label: "Digital Coordination",
    color: "#00CED1",
    description: "Protocols enabling digital-first cooperation and governance",
    sectors: [
      {
        name: "Governance",
        primitives: ["Quadratic voting", "Conviction voting", "Futarchy"],
        projects: [
          { name: "Gitcoin", oneLiner: "Quadratic funding for public goods", url: "https://gitcoin.co" },
          { name: "Optimism", oneLiner: "Retroactive public goods funding", url: "https://optimism.io" },
          { name: "Snapshot", oneLiner: "Off-chain governance voting", url: "https://snapshot.org" },
        ],
      },
      {
        name: "Finance",
        primitives: ["AMMs", "Lending protocols", "Stablecoins"],
        projects: [
          { name: "Uniswap", oneLiner: "Decentralized token exchange", url: "https://uniswap.org" },
          { name: "Aave", oneLiner: "Decentralized lending", url: "https://aave.com" },
          { name: "ENS", oneLiner: "Decentralized naming system", url: "https://ens.domains" },
        ],
      },
      {
        name: "Information",
        primitives: ["Prediction markets", "Content verification", "Reputation systems"],
        projects: [
          { name: "Polymarket", oneLiner: "Prediction market platform", url: "https://polymarket.com" },
          { name: "Community Notes", oneLiner: "Bridging-based fact checking", url: "#" },
        ],
      },
    ],
  },
];
