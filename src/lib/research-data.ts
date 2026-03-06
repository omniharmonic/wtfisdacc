import type { Quadrant } from "./types";

export interface ResearchSector {
  name: string;
  quadrant: Quadrant;
  description: string;
  marketSize: string;
  projection: string;
  primitiveCount: number;
  projectCount: number;
}

export interface ResearchPrimitive {
  name: string;
  category: string;
  description: string;
  daccScore: number;
  tier: string;
  stage: string;
  whyDacc: string;
  keyPlayers: string;
}

export interface ResearchProject {
  name: string;
  category: string;
  description: string;
  tier: string;
  daccScore: number;
  stage: string;
  hasToken: boolean;
  tokenSymbol: string;
  differentiator: string;
  quadrant: Quadrant;
}

// Map sector names to quadrants
const SECTOR_QUADRANT_MAP: Record<string, Quadrant> = {
  "Biodefense & Health Systems": "physical_defense",
  "Open Source Hardware & Silicon": "physical_defense",
  "Resilient Manufacturing": "physical_defense",
  "Formal Verification & Security": "digital_defense",
  "Decentralized Energy": "physical_coordination",
  "Property Rights & Registries": "physical_coordination",
  "Carbon & Environmental Markets": "physical_coordination",
  "Civic Tech": "physical_coordination",
  "Zero-Knowledge Systems": "digital_defense",
  "Privacy-Preserving Computation": "digital_defense",
  "Decentralized Identity & Attestation": "digital_defense",
  "Communication & Messaging": "digital_defense",
  "Secrets-as-a-Service": "digital_defense",
  "Democratic Funding Mechanisms": "digital_coordination",
  "Epistemic Infrastructure": "digital_coordination",
  "Governance Tooling": "digital_coordination",
  "Decentralized Monetary Infrastructure": "digital_coordination",
  "Oracle Networks": "digital_coordination",
  "Cross-Chain Infrastructure": "digital_coordination",
  "Data Availability & Storage": "digital_defense",
  "Streaming & Treasury": "digital_coordination",
  "Ecosystem Connector": "digital_coordination",
};

function getQuadrantForCategory(category: string): Quadrant {
  return SECTOR_QUADRANT_MAP[category] || "digital_coordination";
}

export const SECTORS: ResearchSector[] = [
  { name: "Biodefense & Health Systems", quadrant: "physical_defense", description: "Technologies protecting human health through decentralized pathogen surveillance, open-source medical devices, and resilient healthcare infrastructure.", marketSize: "$2.5B", projection: "$8B+", primitiveCount: 3, projectCount: 5 },
  { name: "Open Source Hardware & Silicon", quadrant: "physical_defense", description: "Open-source hardware, silicon, and mobile operating systems reducing dependence on centralized manufacturers.", marketSize: "$800M", projection: "$5B+", primitiveCount: 3, projectCount: 4 },
  { name: "Resilient Manufacturing", quadrant: "physical_defense", description: "Decentralized, open-source manufacturing including robotics, 3D printing, and assistive technology.", marketSize: "$1.2B", projection: "$6B+", primitiveCount: 2, projectCount: 3 },
  { name: "Decentralized Energy", quadrant: "physical_coordination", description: "Peer-to-peer energy trading, decentralized grid management, and renewable energy coordination.", marketSize: "$3.5B", projection: "$25B+", primitiveCount: 3, projectCount: 2 },
  { name: "Property Rights & Registries", quadrant: "physical_coordination", description: "Blockchain-based land registries, fractional ownership, and property tokenization.", marketSize: "$3.5B", projection: "$19.4B", primitiveCount: 3, projectCount: 4 },
  { name: "Carbon & Environmental Markets", quadrant: "physical_coordination", description: "On-chain carbon credit infrastructure, environmental tokenization, and regenerative finance.", marketSize: "Emerging", projection: "$265B+", primitiveCount: 2, projectCount: 3 },
  { name: "Civic Tech", quadrant: "physical_coordination", description: "Community-driven civic tools, urban farming, and local coordination platforms.", marketSize: "Emerging", projection: "Growing", primitiveCount: 2, projectCount: 4 },
  { name: "Zero-Knowledge Systems", quadrant: "digital_defense", description: "ZK rollups, ZK infrastructure, and privacy-preserving computation at scale.", marketSize: "$1.28B", projection: "$90B+", primitiveCount: 4, projectCount: 6 },
  { name: "Privacy-Preserving Computation", quadrant: "digital_defense", description: "FHE, MPC, and secure computation enabling privacy without centralized trust.", marketSize: "Emerging", projection: "$7.59B+", primitiveCount: 3, projectCount: 3 },
  { name: "Decentralized Identity & Attestation", quadrant: "digital_defense", description: "Self-sovereign identity, verifiable credentials, and sybil resistance.", marketSize: "$170M", projection: "$5B+", primitiveCount: 4, projectCount: 6 },
  { name: "Communication & Messaging", quadrant: "digital_defense", description: "End-to-end encrypted, censorship-resistant messaging and communication protocols.", marketSize: "Emerging", projection: "Growing", primitiveCount: 2, projectCount: 3 },
  { name: "Formal Verification & Security", quadrant: "digital_defense", description: "Smart contract auditing, bug bounties, and formal verification tools.", marketSize: "$3.1B (losses/yr)", projection: "Growing", primitiveCount: 2, projectCount: 5 },
  { name: "Data Availability & Storage", quadrant: "digital_defense", description: "Decentralized data availability, permanent storage, and blockchain indexing.", marketSize: "$2B+", projection: "$10B+", primitiveCount: 4, projectCount: 8 },
  { name: "Democratic Funding Mechanisms", quadrant: "digital_coordination", description: "Quadratic funding, retroactive public goods funding, and impact certificates.", marketSize: "$60M+ distributed", projection: "Expanding", primitiveCount: 3, projectCount: 4 },
  { name: "Governance Tooling", quadrant: "digital_coordination", description: "DAO frameworks, on-chain voting, multisig infrastructure, and governance research.", marketSize: "$170M", projection: "$333M+", primitiveCount: 4, projectCount: 8 },
  { name: "Decentralized Monetary Infrastructure", quadrant: "digital_coordination", description: "Decentralized stablecoins, UBI protocols, and monetary primitives.", marketSize: "$309B stablecoins", projection: "Growing", primitiveCount: 3, projectCount: 5 },
];

export const PRIMITIVES: ResearchPrimitive[] = [
  { name: "Zero-Knowledge Proofs", category: "Privacy", description: "Verification without trust; $1.28B market projected to $7.59B by 2033.", daccScore: 5, tier: "Tier 1", stage: "Growth", whyDacc: "The only known technology allowing verification without trust, privacy without central authority", keyPlayers: "zkSync, StarkNet, Polygon zkEVM, Scroll, Aztec" },
  { name: "Fully Homomorphic Encryption", category: "Privacy", description: "Computation on encrypted data. Zama achieved unicorn status ($130M).", daccScore: 5, tier: "Tier 1", stage: "Very Early", whyDacc: "Enables encrypted data processing, preventing AI systems from accessing raw information", keyPlayers: "Zama ($130M), Aztec Network ($100M)" },
  { name: "Zero-Knowledge Identity", category: "Identity", description: "Privacy-preserving credential verification — prove attributes without revealing information.", daccScore: 5, tier: "Tier 1", stage: "Early Growth", whyDacc: "Directly counters surveillance; prove properties without revealing data", keyPlayers: "Semaphore, Sismo Connect, Polygon ID (Iden3)" },
  { name: "Attestation Infrastructure", category: "Identity", description: "On-chain credential issuance and verification. EAS enables 80% compliance cost reduction.", daccScore: 5, tier: "Tier 1", stage: "Growth", whyDacc: "Enables portable, verifiable credentials without reliance on centralized issuers", keyPlayers: "Ethereum Attestation Service (EAS), Verax" },
  { name: "Decentralized Identity (DID)", category: "Identity", description: "Self-sovereign identity with 200+ DID methods published. W3C standards maturing.", daccScore: 5, tier: "Tier 1", stage: "Early Growth", whyDacc: "Creates self-sovereign alternatives to platform-controlled credentials", keyPlayers: "ENS, Polygon ID, Worldcoin (9,000+ integrations)" },
  { name: "Reputation/Sybil Resistance", category: "Identity", description: "Multi-signal identity verification protecting $380M+ in funds with 2M+ users.", daccScore: 5, tier: "Tier 1", stage: "Growth", whyDacc: "Enables verification of unique humanness without centralized authority", keyPlayers: "Gitcoin Passport (Holonym), 2M+ users" },
  { name: "MPC (Multi-Party Computation)", category: "Privacy", description: "Distributed key management and computation across parties without revealing inputs.", daccScore: 4, tier: "Tier 2", stage: "Early Growth", whyDacc: "Eliminates single points of failure in key custody", keyPlayers: "Lit Protocol, ZenGo, Fireblocks" },
  { name: "Consensus Mechanisms", category: "Infrastructure", description: "Distributed agreement protocols enabling trustless coordination.", daccScore: 4, tier: "Tier 2", stage: "Mature", whyDacc: "Enables trustless coordination without central authority", keyPlayers: "Ethereum (Gasper), Solana (Tower BFT), Cosmos (Tendermint)" },
  { name: "Data Availability Layers", category: "Infrastructure", description: "Decentralized storage for rollup data, enabling light node verification.", daccScore: 4, tier: "Tier 2", stage: "Early Growth", whyDacc: "Decentralizes critical DA bottleneck through Data Availability Sampling", keyPlayers: "Celestia ($155M), EigenDA ($170M+), Avail ($27M)" },
  { name: "Rollups", category: "Scalability", description: "Optimistic (83-85% share) vs ZK (15-17%, instant validity proofs).", daccScore: 4, tier: "Tier 2", stage: "Growth", whyDacc: "Scales blockchain without sacrificing decentralization", keyPlayers: "Arbitrum, Optimism, Base, zkSync, StarkNet, Scroll" },
  { name: "Decentralized Storage", category: "Data/Storage", description: "Filecoin (22 exabytes capacity) vs Arweave ($9-12/GB for ~200-year storage).", daccScore: 4, tier: "Tier 2", stage: "Growth", whyDacc: "Ensures data availability without platform dependency", keyPlayers: "Filecoin, Arweave (~140TB Permaweb)" },
  { name: "Multisig Infrastructure", category: "Coordination", description: "Multi-signature authentication securing $100B+ in assets across 7M+ accounts.", daccScore: 4, tier: "Tier 2", stage: "Mature", whyDacc: "Eliminates single points of failure in asset custody", keyPlayers: "Safe (Gnosis Safe), Argent" },
  { name: "Quadratic Funding", category: "Coordination", description: "Mathematically amplifies small contributions; $60M+ distributed via Gitcoin.", daccScore: 4, tier: "Tier 2", stage: "Early Growth", whyDacc: "Enables collective prioritization of public goods", keyPlayers: "Gitcoin, Allo Protocol, Optimism RetroPGF ($100M+)" },
  { name: "Impact Certificates", category: "Coordination", description: "Tokenized impact claims with 10,000+ in circulation, 20,000+ unique addresses.", daccScore: 4, tier: "Tier 2", stage: "Early", whyDacc: "Enables retroactive funding of public goods with verifiable impact", keyPlayers: "Hypercerts, EasyRetroPGF" },
  { name: "Voting Mechanisms", category: "Governance", description: "On-chain governance with quadratic, conviction, and holographic consensus.", daccScore: 4, tier: "Tier 2", stage: "Growth", whyDacc: "Quadratic voting reduces plutocratic dominance", keyPlayers: "Snapshot, Tally, Aragon" },
  { name: "Key Management", category: "Security", description: "MPC wallets, smart contract wallets (ERC-4337), social recovery.", daccScore: 4, tier: "Tier 2", stage: "Growth", whyDacc: "Social recovery enables key restoration without central custodians", keyPlayers: "Safe, Argent, ZenGo" },
  { name: "Settlement Layers", category: "Infrastructure", description: "Base layer blockchains providing final transaction validity and security.", daccScore: 4, tier: "Tier 2", stage: "Mature", whyDacc: "Provides permissionless, censorship-resistant settlement", keyPlayers: "Ethereum, Bitcoin, Cosmos Hub" },
  { name: "EIP-4844 / Danksharding", category: "Scalability", description: "Blob transactions with 10-100x fee reductions.", daccScore: 4, tier: "Tier 2", stage: "Early Growth", whyDacc: "Removes infrastructure bottleneck for decentralized scaling", keyPlayers: "Ethereum core protocol" },
  { name: "Stablecoins", category: "Financial", description: "Price-stable digital assets; $309B market cap. 91% remain centralized.", daccScore: 2, tier: "Tier 2", stage: "Mature", whyDacc: "Decentralized alternatives preserve utility with decentralization", keyPlayers: "USDT (60%), USDC (20%), DAI, Ethena USDe" },
  { name: "Execution Environments", category: "Infrastructure", description: "Virtual machines for smart contracts. EVM maintains 70%+ developer share.", daccScore: 3, tier: "Tier 3", stage: "Growth", whyDacc: "Open-source execution prevents proprietary lock-in", keyPlayers: "EVM, Solana VM, Move VM (Aptos, Sui)" },
  { name: "Oracle Infrastructure", category: "Data/Storage", description: "Off-chain data feeds. Chainlink 46-58% market share.", daccScore: 3, tier: "Tier 3", stage: "Mature", whyDacc: "Critical middleware but market concentration creates d/acc tension", keyPlayers: "Chainlink, Pyth, Chronicle, RedStone" },
  { name: "AMMs", category: "Financial", description: "Automated market makers. Uniswap V3 achieves up to 4000x capital efficiency.", daccScore: 3, tier: "Tier 3", stage: "Mature", whyDacc: "Removes reliance on centralized order books", keyPlayers: "Uniswap V3, Curve, CoW Protocol" },
  { name: "Cross-Chain Bridges", category: "Interoperability", description: "~$1.4B TVL despite $2.8B+ historical exploit losses.", daccScore: 2, tier: "Tier 3", stage: "Growth", whyDacc: "Necessary for connectivity but centralization tendencies; ZK-based variants better", keyPlayers: "LayerZero, Wormhole, Axelar" },
  { name: "Lending/Borrowing", category: "Financial", description: "Permissionless credit markets with ~$34B TVL.", daccScore: 3, tier: "Tier 3", stage: "Growth", whyDacc: "Removes gatekeepers from credit access", keyPlayers: "Aave ($10.76B TVL), Compound, Morpho Blue" },
  { name: "Indexing", category: "Data/Storage", description: "Blockchain data queryability. The Graph covers 40+ blockchains.", daccScore: 3, tier: "Tier 3", stage: "Growth", whyDacc: "Enables decentralized data access for dApps", keyPlayers: "The Graph, Subsquid" },
  { name: "Perpetual DEXs", category: "Financial", description: "Decentralized derivatives with $1.4T+ annual volume.", daccScore: 3, tier: "Tier 3", stage: "Growth", whyDacc: "Permissionless access without centralized counterparty risk", keyPlayers: "Hyperliquid (64.8%), dYdX, GMX" },
  { name: "Treasury Management", category: "Governance", description: "Streaming payments and DAO treasury infrastructure. $34B total holdings.", daccScore: 3, tier: "Tier 3", stage: "Growth", whyDacc: "Real-time treasury flows without approval bottlenecks", keyPlayers: "Sablier, Superfluid, Safe" },
  { name: "Intent-Based Systems", category: "Interoperability", description: "Solver competition for optimal execution. CoW Protocol leads with 63%.", daccScore: 3, tier: "Tier 3", stage: "Growth", whyDacc: "Redirects MEV value back to users", keyPlayers: "CoW Protocol, UniswapX" },
  { name: "Audit Mechanisms", category: "Security", description: "Security verification. $3.1B losses in H1 2025. Immunefi paid $155M+ to whitehats.", daccScore: 3, tier: "Tier 3", stage: "Mature", whyDacc: "Creates economic incentives for defensive security research", keyPlayers: "Trail of Bits, OpenZeppelin, Spearbit, Immunefi, Code4rena" },
];

export const PROJECTS: ResearchProject[] = [
  // Physical Defense — Biodefense
  { name: "Varro Inc.", category: "Biodefense & Health Systems", description: "Biodefense technology company", tier: "Tier 2", daccScore: 75, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "Pathogen early warning systems", quadrant: "physical_defense" },
  { name: "Pathoplexus", category: "Biodefense & Health Systems", description: "Pathogen detection and monitoring platform", tier: "Tier 2", daccScore: 72, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "Open source pathogen surveillance", quadrant: "physical_defense" },
  { name: "OSLUV", category: "Biodefense & Health Systems", description: "Open source UV air purification systems", tier: "Tier 2", daccScore: 70, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Decentralized air quality defense", quadrant: "physical_defense" },
  { name: "Openwater", category: "Biodefense & Health Systems", description: "Non-invasive medical imaging technology", tier: "Tier 2", daccScore: 68, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "Affordable medical diagnostics", quadrant: "physical_defense" },
  { name: "MediLedger", category: "Biodefense & Health Systems", description: "Pharmaceutical supply chain verification", tier: "Tier 2", daccScore: 72, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Drug authenticity verification", quadrant: "physical_defense" },
  // Physical Defense — Hardware
  { name: "GrapheneOS", category: "Open Source Hardware & Silicon", description: "Privacy-focused mobile operating system", tier: "Tier 1", daccScore: 88, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Hardened Android without Google", quadrant: "physical_defense" },
  { name: "Freedom Factory (ethOS)", category: "Open Source Hardware & Silicon", description: "Ethereum-native mobile operating system", tier: "Tier 2", daccScore: 70, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "Web3-native mobile OS", quadrant: "physical_defense" },
  { name: "Nanographs", category: "Open Source Hardware & Silicon", description: "Open source semiconductor technology", tier: "Tier 3", daccScore: 62, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "Open silicon design", quadrant: "physical_defense" },
  { name: "Open Silicon Initiatives", category: "Open Source Hardware & Silicon", description: "Open source silicon and hardware design", tier: "Tier 3", daccScore: 65, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "RISC-V and open hardware", quadrant: "physical_defense" },
  // Physical Defense — Manufacturing
  { name: "k-scale", category: "Resilient Manufacturing", description: "Open source robotics and manufacturing", tier: "Tier 2", daccScore: 68, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "Democratized robotics", quadrant: "physical_defense" },
  { name: "SalvageGarden", category: "Resilient Manufacturing", description: "Accessible mobility and assistive technology", tier: "Tier 3", daccScore: 58, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "Open source accessibility", quadrant: "physical_defense" },
  { name: "Simula", category: "Resilient Manufacturing", description: "Open source VR/AR computing platform", tier: "Tier 3", daccScore: 60, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "Decentralized spatial computing", quadrant: "physical_defense" },
  // Physical Coordination — Energy
  { name: "Power Ledger", category: "Decentralized Energy", description: "Peer-to-peer energy trading platform", tier: "Tier 2", daccScore: 72, stage: "Mainnet", hasToken: true, tokenSymbol: "POWR", differentiator: "Blockchain energy marketplace", quadrant: "physical_coordination" },
  { name: "Energy Web Foundation", category: "Decentralized Energy", description: "Open-source blockchain for energy sector", tier: "Tier 2", daccScore: 70, stage: "Mainnet", hasToken: true, tokenSymbol: "EWT", differentiator: "Energy sector infrastructure", quadrant: "physical_coordination" },
  // Physical Coordination — Property
  { name: "Georgia Land Registry", category: "Property Rights & Registries", description: "Government blockchain land registry", tier: "Tier 2", daccScore: 75, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "First national land registry on blockchain", quadrant: "physical_coordination" },
  { name: "Dubai Property Platform", category: "Property Rights & Registries", description: "Blockchain-based property registration", tier: "Tier 2", daccScore: 72, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Government-backed property chain", quadrant: "physical_coordination" },
  { name: "Rwanda Cadastre", category: "Property Rights & Registries", description: "Decentralized land registration system", tier: "Tier 2", daccScore: 68, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "African land rights digitization", quadrant: "physical_coordination" },
  { name: "RealT", category: "Property Rights & Registries", description: "Tokenized real estate ownership", tier: "Tier 2", daccScore: 70, stage: "Mainnet", hasToken: true, tokenSymbol: "REALT", differentiator: "Fractional property ownership", quadrant: "physical_coordination" },
  // Physical Coordination — Carbon
  { name: "Toucan Protocol", category: "Carbon & Environmental Markets", description: "On-chain carbon credit infrastructure", tier: "Tier 2", daccScore: 72, stage: "Mainnet", hasToken: true, tokenSymbol: "TCO2", differentiator: "Carbon tokenization standard", quadrant: "physical_coordination" },
  { name: "KlimaDAO", category: "Carbon & Environmental Markets", description: "Decentralized carbon offsetting", tier: "Tier 2", daccScore: 68, stage: "Mainnet", hasToken: true, tokenSymbol: "KLIMA", differentiator: "Carbon-backed treasury", quadrant: "physical_coordination" },
  // Physical Coordination — Civic
  { name: "Better.SG", category: "Civic Tech", description: "Singapore civic tech collective", tier: "Tier 3", daccScore: 60, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Community-driven civic tools", quadrant: "physical_coordination" },
  { name: "Edible Garden City", category: "Civic Tech", description: "Urban farming and food sovereignty", tier: "Tier 3", daccScore: 58, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Local food resilience", quadrant: "physical_coordination" },
  // Digital Defense — ZK
  { name: "Aztec Network", category: "Zero-Knowledge Systems", description: "Private smart contracts on Ethereum", tier: "Tier 1", daccScore: 92, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "Programmable privacy with Noir", quadrant: "digital_defense" },
  { name: "zkSync", category: "Zero-Knowledge Systems", description: "ZK rollup for Ethereum scaling", tier: "Tier 1", daccScore: 88, stage: "Mainnet", hasToken: true, tokenSymbol: "ZK", differentiator: "ZK rollup with account abstraction", quadrant: "digital_defense" },
  { name: "StarkNet", category: "Zero-Knowledge Systems", description: "STARK-based ZK rollup", tier: "Tier 1", daccScore: 87, stage: "Mainnet", hasToken: true, tokenSymbol: "STRK", differentiator: "Cairo language and STARK proofs", quadrant: "digital_defense" },
  { name: "Polygon", category: "Zero-Knowledge Systems", description: "Multi-chain scaling with ZK tech", tier: "Tier 1", daccScore: 85, stage: "Mainnet", hasToken: true, tokenSymbol: "POL", differentiator: "ZK-EVM and scaling suite", quadrant: "digital_defense" },
  { name: "Scroll", category: "Zero-Knowledge Systems", description: "ZK rollup with EVM equivalence", tier: "Tier 1", daccScore: 84, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Bytecode-level EVM compatibility", quadrant: "digital_defense" },
  { name: "Taceo", category: "Zero-Knowledge Systems", description: "ZK infrastructure and tooling", tier: "Tier 2", daccScore: 72, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "ZK development tools", quadrant: "digital_defense" },
  // Digital Defense — Privacy Computing
  { name: "Zama", category: "Privacy-Preserving Computation", description: "Fully Homomorphic Encryption (FHE)", tier: "Tier 1", daccScore: 90, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "FHE for encrypted computation", quadrant: "digital_defense" },
  { name: "ZenGo", category: "Privacy-Preserving Computation", description: "MPC-based wallet security", tier: "Tier 2", daccScore: 75, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Keyless wallet with MPC", quadrant: "digital_defense" },
  { name: "Fireblocks", category: "Privacy-Preserving Computation", description: "Institutional digital asset custody", tier: "Tier 2", daccScore: 72, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Enterprise MPC custody", quadrant: "digital_defense" },
  // Digital Defense — Identity
  { name: "ENS", category: "Decentralized Identity & Attestation", description: "Ethereum Name Service", tier: "Tier 1", daccScore: 90, stage: "Mainnet", hasToken: true, tokenSymbol: "ENS", differentiator: "Decentralized naming standard", quadrant: "digital_defense" },
  { name: "Polygon ID", category: "Decentralized Identity & Attestation", description: "ZK-based identity protocol", tier: "Tier 1", daccScore: 85, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "ZK credentials and claims", quadrant: "digital_defense" },
  { name: "EAS", category: "Decentralized Identity & Attestation", description: "Ethereum Attestation Service", tier: "Tier 1", daccScore: 88, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Universal attestation standard", quadrant: "digital_defense" },
  { name: "Worldcoin", category: "Decentralized Identity & Attestation", description: "Proof of personhood with ZK", tier: "Tier 2", daccScore: 70, stage: "Mainnet", hasToken: true, tokenSymbol: "WLD", differentiator: "Biometric proof of humanity", quadrant: "digital_defense" },
  { name: "Gitcoin Passport", category: "Decentralized Identity & Attestation", description: "Sybil resistance through attestations", tier: "Tier 2", daccScore: 78, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Composable identity stamps", quadrant: "digital_defense" },
  { name: "Zupass", category: "Decentralized Identity & Attestation", description: "ZK credential system for tickets and attestations", tier: "Tier 1", daccScore: 85, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Privacy-preserving ticketing; Zuzalu origin", quadrant: "digital_defense" },
  // Digital Defense — Communication
  { name: "XMTP Labs", category: "Communication & Messaging", description: "Secure web3 messaging protocol", tier: "Tier 1", daccScore: 85, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "End-to-end encrypted web3 messaging", quadrant: "digital_defense" },
  { name: "HOPR", category: "Communication & Messaging", description: "Privacy-preserving messaging network", tier: "Tier 2", daccScore: 78, stage: "Mainnet", hasToken: true, tokenSymbol: "HOPR", differentiator: "Mixnet for metadata privacy", quadrant: "digital_defense" },
  { name: "Waku", category: "Communication & Messaging", description: "Decentralized communication protocol", tier: "Tier 2", daccScore: 75, stage: "Development", hasToken: false, tokenSymbol: "", differentiator: "Censorship-resistant messaging", quadrant: "digital_defense" },
  // Digital Defense — Security
  { name: "Trail of Bits", category: "Formal Verification & Security", description: "Security research and auditing", tier: "Tier 1", daccScore: 88, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Industry-leading security research", quadrant: "digital_defense" },
  { name: "OpenZeppelin", category: "Formal Verification & Security", description: "Smart contract security standards", tier: "Tier 1", daccScore: 90, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Defender and contract standards", quadrant: "digital_defense" },
  { name: "Spearbit", category: "Formal Verification & Security", description: "Security auditing collective", tier: "Tier 1", daccScore: 85, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Expert auditor network", quadrant: "digital_defense" },
  { name: "Immunefi", category: "Formal Verification & Security", description: "Bug bounty platform for web3", tier: "Tier 1", daccScore: 87, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Largest web3 bug bounty platform", quadrant: "digital_defense" },
  { name: "Code4rena", category: "Formal Verification & Security", description: "Competitive audit platform", tier: "Tier 1", daccScore: 85, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Crowdsourced security audits", quadrant: "digital_defense" },
  // Digital Defense — DA & Storage
  { name: "Celestia", category: "Data Availability & Storage", description: "Modular data availability layer", tier: "Tier 1", daccScore: 88, stage: "Mainnet", hasToken: true, tokenSymbol: "TIA", differentiator: "First modular DA layer", quadrant: "digital_defense" },
  { name: "EigenDA", category: "Data Availability & Storage", description: "Restaked data availability", tier: "Tier 1", daccScore: 85, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "EigenLayer-secured DA", quadrant: "digital_defense" },
  { name: "Avail", category: "Data Availability & Storage", description: "Modular blockchain data availability", tier: "Tier 2", daccScore: 80, stage: "Mainnet", hasToken: true, tokenSymbol: "AVAIL", differentiator: "Validity proofs for DA", quadrant: "digital_defense" },
  { name: "Filecoin", category: "Data Availability & Storage", description: "Decentralized storage network", tier: "Tier 1", daccScore: 85, stage: "Mainnet", hasToken: true, tokenSymbol: "FIL", differentiator: "Proven storage with proofs", quadrant: "digital_defense" },
  { name: "Arweave", category: "Data Availability & Storage", description: "Permanent decentralized storage", tier: "Tier 1", daccScore: 87, stage: "Mainnet", hasToken: true, tokenSymbol: "AR", differentiator: "Permaweb and permanent storage", quadrant: "digital_defense" },
  { name: "Radicle", category: "Data Availability & Storage", description: "Decentralized code collaboration", tier: "Tier 2", daccScore: 75, stage: "Mainnet", hasToken: true, tokenSymbol: "RAD", differentiator: "Peer-to-peer Git hosting", quadrant: "digital_defense" },
  { name: "The Graph", category: "Data Availability & Storage", description: "Decentralized indexing protocol", tier: "Tier 1", daccScore: 88, stage: "Mainnet", hasToken: true, tokenSymbol: "GRT", differentiator: "Blockchain data indexing", quadrant: "digital_defense" },
  { name: "Subsquid", category: "Data Availability & Storage", description: "Decentralized data lake", tier: "Tier 2", daccScore: 75, stage: "Mainnet", hasToken: true, tokenSymbol: "SQD", differentiator: "Multi-chain indexing", quadrant: "digital_defense" },
  // Digital Coordination — Funding
  { name: "Gitcoin", category: "Democratic Funding Mechanisms", description: "Quadratic funding for public goods", tier: "Tier 1", daccScore: 88, stage: "Mainnet", hasToken: true, tokenSymbol: "GTC", differentiator: "Pioneered quadratic funding", quadrant: "digital_coordination" },
  { name: "Optimism RetroPGF", category: "Democratic Funding Mechanisms", description: "Retroactive public goods funding", tier: "Tier 1", daccScore: 85, stage: "Mainnet", hasToken: true, tokenSymbol: "OP", differentiator: "Retroactive rewards for impact", quadrant: "digital_coordination" },
  { name: "Octant", category: "Democratic Funding Mechanisms", description: "Epoch-based public goods funding", tier: "Tier 2", daccScore: 78, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "GLM-backed funding rounds", quadrant: "digital_coordination" },
  { name: "Hypercerts", category: "Democratic Funding Mechanisms", description: "Impact certificates for public goods", tier: "Tier 2", daccScore: 75, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Tokenized impact claims", quadrant: "digital_coordination" },
  // Digital Coordination — Epistemics
  { name: "Metaculus", category: "Epistemic Infrastructure", description: "Prediction and forecasting platform", tier: "Tier 2", daccScore: 80, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Track record of accurate forecasts", quadrant: "digital_coordination" },
  { name: "Polymarket", category: "Epistemic Infrastructure", description: "Prediction market platform", tier: "Tier 2", daccScore: 78, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Real-money prediction markets", quadrant: "digital_coordination" },
  // Digital Coordination — Governance
  { name: "Safe", category: "Governance Tooling", description: "Multi-signature wallet infrastructure", tier: "Tier 1", daccScore: 92, stage: "Mainnet", hasToken: true, tokenSymbol: "SAFE", differentiator: "Industry standard multisig", quadrant: "digital_coordination" },
  { name: "Argent", category: "Governance Tooling", description: "Smart wallet with social recovery", tier: "Tier 2", daccScore: 78, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Mobile-first smart wallet", quadrant: "digital_coordination" },
  { name: "Aragon", category: "Governance Tooling", description: "DAO creation and management", tier: "Tier 2", daccScore: 75, stage: "Mainnet", hasToken: true, tokenSymbol: "ANT", differentiator: "DAO framework pioneer", quadrant: "digital_coordination" },
  { name: "Snapshot", category: "Governance Tooling", description: "Off-chain voting platform", tier: "Tier 1", daccScore: 88, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Gasless governance voting", quadrant: "digital_coordination" },
  { name: "Tally", category: "Governance Tooling", description: "Governance aggregation and voting", tier: "Tier 2", daccScore: 75, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Cross-protocol governance UI", quadrant: "digital_coordination" },
  // Digital Coordination — Monetary
  { name: "DAI", category: "Decentralized Monetary Infrastructure", description: "Decentralized stablecoin", tier: "Tier 1", daccScore: 90, stage: "Mainnet", hasToken: true, tokenSymbol: "DAI", differentiator: "Overcollateralized stable", quadrant: "digital_coordination" },
  { name: "Ethena (USDe)", category: "Decentralized Monetary Infrastructure", description: "Synthetic dollar protocol", tier: "Tier 2", daccScore: 72, stage: "Mainnet", hasToken: true, tokenSymbol: "ENA", differentiator: "Delta-neutral stablecoin", quadrant: "digital_coordination" },
  { name: "Circles/CirclesUBI", category: "Decentralized Monetary Infrastructure", description: "Universal basic income protocol", tier: "Tier 2", daccScore: 72, stage: "Mainnet", hasToken: true, tokenSymbol: "CRC", differentiator: "Web of trust UBI", quadrant: "digital_coordination" },
  // Digital Coordination — Oracles
  { name: "Chainlink", category: "Oracle Networks", description: "Leading oracle network", tier: "Tier 2", daccScore: 70, stage: "Mainnet", hasToken: true, tokenSymbol: "LINK", differentiator: "Market leader but centralization risk", quadrant: "digital_coordination" },
  { name: "Pyth", category: "Oracle Networks", description: "High-frequency price oracle", tier: "Tier 2", daccScore: 78, stage: "Mainnet", hasToken: true, tokenSymbol: "PYTH", differentiator: "Sub-second price updates", quadrant: "digital_coordination" },
  { name: "Chronicle", category: "Oracle Networks", description: "Decentralized oracle protocol", tier: "Tier 2", daccScore: 75, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "MakerDAO oracle spinoff", quadrant: "digital_coordination" },
  { name: "RedStone", category: "Oracle Networks", description: "Modular oracle network", tier: "Tier 2", daccScore: 72, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Flexible oracle delivery", quadrant: "digital_coordination" },
  // Digital Coordination — Cross-chain
  { name: "LayerZero", category: "Cross-Chain Infrastructure", description: "Omnichain interoperability protocol", tier: "Tier 2", daccScore: 75, stage: "Mainnet", hasToken: true, tokenSymbol: "ZRO", differentiator: "Universal message passing", quadrant: "digital_coordination" },
  { name: "CoW Protocol", category: "Cross-Chain Infrastructure", description: "MEV-protected trading", tier: "Tier 2", daccScore: 78, stage: "Mainnet", hasToken: true, tokenSymbol: "COW", differentiator: "Batch auctions and intent-based", quadrant: "digital_coordination" },
  // Digital Coordination — Streaming
  { name: "Sablier", category: "Streaming & Treasury", description: "Token streaming protocol", tier: "Tier 2", daccScore: 72, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Real-time payments", quadrant: "digital_coordination" },
  { name: "Superfluid", category: "Streaming & Treasury", description: "Programmable cashflows", tier: "Tier 2", daccScore: 75, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Streaming finance primitive", quadrant: "digital_coordination" },
  // Ecosystem
  { name: "Ethereum Foundation", category: "Ecosystem Connector", description: "Core Ethereum development and grants", tier: "Tier 1", daccScore: 95, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Ecosystem stewardship", quadrant: "digital_coordination" },
  { name: "Foresight Institute", category: "Ecosystem Connector", description: "Longtermist technology research", tier: "Tier 2", daccScore: 78, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Existential risk research", quadrant: "digital_coordination" },
  // Rollups (Digital Defense)
  { name: "Optimism", category: "Zero-Knowledge Systems", description: "Optimistic rollup with RetroPGF", tier: "Tier 2", daccScore: 82, stage: "Mainnet", hasToken: true, tokenSymbol: "OP", differentiator: "OP Stack and RetroPGF", quadrant: "digital_defense" },
  { name: "Arbitrum", category: "Zero-Knowledge Systems", description: "Largest L2 by TVL", tier: "Tier 2", daccScore: 80, stage: "Mainnet", hasToken: true, tokenSymbol: "ARB", differentiator: "Largest L2 ecosystem; Nitro architecture", quadrant: "digital_defense" },
  { name: "Base", category: "Zero-Knowledge Systems", description: "Coinbase L2 built on OP Stack", tier: "Tier 2", daccScore: 72, stage: "Mainnet", hasToken: false, tokenSymbol: "", differentiator: "Institutional on-ramp to L2s", quadrant: "digital_defense" },
  // DeFi
  { name: "Aave", category: "Decentralized Monetary Infrastructure", description: "Decentralized lending/borrowing", tier: "Tier 2", daccScore: 76, stage: "Mainnet", hasToken: true, tokenSymbol: "AAVE", differentiator: "Flash loans; multi-chain", quadrant: "digital_coordination" },
  { name: "Uniswap", category: "Decentralized Monetary Infrastructure", description: "Largest DEX", tier: "Tier 2", daccScore: 78, stage: "Mainnet", hasToken: true, tokenSymbol: "UNI", differentiator: "4000x capital efficiency V3", quadrant: "digital_coordination" },
];
