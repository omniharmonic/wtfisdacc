# D/ACC Research Portal - Notion Database Schema

## Overview

This document provides the complete database architecture for the d/acc (Defensive Accelerationism) research portal. The schema is designed to map Vitalik Buterin's philosophical framework onto practical investment categories and on-chain primitives.

---

## Database Architecture

### 6 Core Databases with Cross-Linking Relations

```
                    ┌─────────────────────┐
                    │  DEFENSE CATEGORIES │
                    │  (Vitalik's d/acc)  │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  PRIMITIVES   │◄───│    PROJECTS     │───►│    SECTORS      │
│  (10 types)   │    │   (Protocols)   │    │  (10 economic)  │
└───────┬───────┘    └────────┬────────┘    └────────┬────────┘
        │                     │                      │
        └──────────┬──────────┴──────────────────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ INVESTMENT      │
          │ THESIS          │
          └─────────────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ MARKET DATA     │
          │ (Metrics)       │
          └─────────────────┘
```

---

## DATABASE 1: Defense Categories

**Purpose**: Maps Vitalik's d/acc philosophical framework - the four defense domains

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Category name (e.g., "Cyber Defense") |
| Domain | Select | Atoms-Macro, Atoms-Micro, Bits-Cyber, Bits-Info |
| Description | Text | Full description of the defense category |
| Key Technologies | Multi-select | Technologies within this category |
| D/acc Alignment | Select | ★★★★★ to ★☆☆☆☆ |
| Vitalik Quote | Text | Relevant quote from the essays |
| Related Primitives | Relation → Primitives | Links to on-chain primitives |
| Related Projects | Relation → Projects | Links to specific protocols |

### Entries to Create

1. **Macro Physical Defense**
   - Domain: Atoms-Macro
   - Description: Resilient infrastructure, decentralized connectivity, independent energy, multi-planetary civilization
   - Key Technologies: Starlink, Home Solar, Resilient Infrastructure
   - D/acc Alignment: ★★★★☆
   - Vitalik Quote: "Building tools to help people survive and even live comfortable lives independently or semi-independently of long international supply chains seems like a valuable defensive technology."

2. **Micro Physical Defense (Bio)**
   - Domain: Atoms-Micro
   - Description: Far-UVC irradiation, air filtering, rapid vaccine platforms, wastewater surveillance, decentralized health infrastructure
   - Key Technologies: Far-UVC, Air Filtering, Open Source Vaccines, Epidemic Detection
   - D/acc Alignment: ★★★★★
   - Vitalik Quote: "A future that doesn't have to resort to the sledgehammer of social compulsion because the infrastructure of public health is woven into the fabric of civilization."

3. **Cyber Defense**
   - Domain: Bits-Cyber
   - Description: Blockchains, zero-knowledge proofs, cryptocurrencies, social recovery wallets, trusted hardware, hardened operating systems
   - Key Technologies: ZK Proofs, Blockchains, Cryptography, Account Abstraction
   - D/acc Alignment: ★★★★★
   - Vitalik Quote: "Blockchains let us create economic and social structures with a 'shared hard drive' without having to depend on centralized actors."

4. **Info Defense**
   - Domain: Bits-Info
   - Description: Community Notes-style fact-checking, prediction markets, consensus-finding algorithms, wallet-level scam detection, ZK-based identity
   - Key Technologies: Community Notes, Prediction Markets, Pol.is, Sybil Resistance
   - D/acc Alignment: ★★★★☆
   - Vitalik Quote: "The key criterion: avoiding pre-assumed authorities that 'know what is true and false' and enforce perspectives on everyone."

---

## DATABASE 2: Primitives

**Purpose**: Taxonomy of 10 on-chain primitive categories with subcategories

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Primitive name |
| Category | Select | Infrastructure, Financial, Identity, Privacy, Governance, Coordination, Interoperability, Data/Storage, Security, Scalability |
| Subcategory | Select | Specific subcategory |
| Description | Text | What this primitive does |
| D/acc Score | Select | ★★★★★ to ★☆☆☆☆ |
| Investment Tier | Select | Tier 1, Tier 2, Tier 3 |
| Development Stage | Select | Very Early, Early, Early Growth, Growth, Mature |
| Risk Profile | Select | Very High, High, Medium-High, Medium, Low |
| Why D/acc | Text | Explanation of d/acc alignment |
| Key Players | Multi-select | Major projects in this space |
| Defense Category | Relation → Defense Categories | Which d/acc domain |
| Sectors Served | Relation → Sectors | Which economic sectors |
| Related Projects | Relation → Projects | Specific protocols |
| Market Data | Relation → Market Data | Market metrics |

### Entries to Create

#### Infrastructure Primitives

**1. Consensus Mechanisms**
- Category: Infrastructure
- Subcategory: Consensus
- Description: Distributed agreement protocols enabling trustless coordination - evolved from PoW to PoS variants
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Mature
- Risk Profile: Medium
- Why D/acc: Enables trustless coordination without central authority; 800,000+ Ethereum validators demonstrate decentralization
- Key Players: Ethereum (Gasper), Solana (Tower BFT), Cosmos (Tendermint)
- Defense Category: Cyber Defense

**2. Data Availability Layers**
- Category: Infrastructure
- Subcategory: Data Availability
- Description: Decentralized storage for rollup data, enabling light node verification without downloading full blocks
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Early Growth
- Risk Profile: Medium-High
- Why D/acc: Decentralizes critical DA bottleneck, prevents validator centralization through DAS
- Key Players: Celestia ($155M), EigenDA ($170M+), Avail ($27M)
- Defense Category: Cyber Defense

**3. Settlement Layers**
- Category: Infrastructure
- Subcategory: Settlement
- Description: Base layer blockchains providing final transaction validity and security
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Mature
- Risk Profile: Medium
- Why D/acc: Provides permissionless, censorship-resistant settlement without trusted parties
- Key Players: Ethereum ($48B+ L2 TVL), Bitcoin (~$25B annual security budget), Cosmos Hub
- Defense Category: Cyber Defense

**4. Execution Environments**
- Category: Infrastructure
- Subcategory: Execution
- Description: Virtual machines for smart contract computation with varying performance/decentralization tradeoffs
- D/acc Score: ★★★☆☆
- Investment Tier: Tier 3
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Open-source execution prevents proprietary lock-in; multiple VMs enable ecosystem redundancy
- Key Players: EVM (70%+ dev share), Solana VM, Move VM (Aptos, Sui)
- Defense Category: Cyber Defense

#### Financial Primitives

**5. Stablecoins**
- Category: Financial
- Subcategory: Stablecoins
- Description: Price-stable digital assets; $309B market cap, $27.6T annual volume exceeding Visa+Mastercard
- D/acc Score: ★★☆☆☆ (centralized) / ★★★★☆ (decentralized)
- Investment Tier: Tier 2 (for decentralized mechanisms)
- Development Stage: Mature
- Risk Profile: Medium
- Why D/acc: 91% centralized creates concentration risk; decentralized alternatives (DAI, Ethena) preserve utility while maintaining decentralization
- Key Players: USDT (60%), USDC (20%), DAI, Ethena USDe
- Defense Category: Cyber Defense

**6. Lending/Borrowing**
- Category: Financial
- Subcategory: Lending
- Description: Permissionless credit markets with ~$34B TVL; flash loans enable uncollateralized borrowing within single blocks
- D/acc Score: ★★★☆☆
- Investment Tier: Tier 3
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Removes gatekeepers from credit access; over-collateralization protects against bad actors
- Key Players: Aave ($10.76B TVL), Compound, Morpho Blue
- Defense Category: Cyber Defense

**7. Perpetual DEXs**
- Category: Financial
- Subcategory: Derivatives
- Description: Decentralized derivatives with $1.4T+ annual volume (2024), up 872% YoY
- D/acc Score: ★★★☆☆
- Investment Tier: Tier 3
- Development Stage: Growth
- Risk Profile: Medium-High
- Why D/acc: Provides permissionless access to derivatives without centralized exchange risk
- Key Players: Hyperliquid (64.8% share), dYdX, GMX
- Defense Category: Cyber Defense

**8. AMMs**
- Category: Financial
- Subcategory: DEX
- Description: Automated market makers enabling trustless token exchange; evolved from constant product to concentrated liquidity
- D/acc Score: ★★★☆☆
- Investment Tier: Tier 3
- Development Stage: Mature
- Risk Profile: Medium
- Why D/acc: Removes reliance on centralized order books; intent-based systems redirect MEV to users
- Key Players: Uniswap V3 (4000x capital efficiency), Curve, CoW Protocol (63% intent trading)
- Defense Category: Cyber Defense

#### Identity & Attestation Primitives

**9. Decentralized Identity (DID)**
- Category: Identity
- Subcategory: DID
- Description: Self-sovereign identity with 200+ DID methods; W3C standards maturing
- D/acc Score: ★★★★★
- Investment Tier: Tier 1
- Development Stage: Early Growth
- Risk Profile: Medium-High
- Why D/acc: Creates self-sovereign alternatives to platform-controlled credentials; individuals own and selectively disclose identity
- Key Players: ENS, Polygon ID, Worldcoin (9,000+ integrations)
- Defense Category: Cyber Defense, Info Defense

**10. Reputation/Sybil Resistance**
- Category: Identity
- Subcategory: Reputation
- Description: Multi-signal identity verification protecting $380M+ in funds with 2M+ users
- D/acc Score: ★★★★★
- Investment Tier: Tier 1
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Enables verification of unique humanness without centralized authority; protects against coordinated manipulation
- Key Players: Gitcoin Passport (2M+ users, 34M+ credentials), Holonym
- Defense Category: Info Defense

**11. Zero-Knowledge Identity**
- Category: Identity
- Subcategory: ZK Identity
- Description: Privacy-preserving credential verification - prove attributes without revealing information
- D/acc Score: ★★★★★
- Investment Tier: Tier 1
- Development Stage: Early Growth
- Risk Profile: Medium-High
- Why D/acc: Directly counters "with modern AI to interpret it, there may be no place to hide"; Buenos Aires deployed ZK identity for 3.6M citizens
- Key Players: Semaphore, Sismo Connect, Polygon ID (Iden3)
- Defense Category: Cyber Defense, Info Defense

**12. Attestation Infrastructure**
- Category: Identity
- Subcategory: Attestation
- Description: On-chain credential issuance and verification; 80% reduction in compliance costs reported
- D/acc Score: ★★★★★
- Investment Tier: Tier 1
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Enables portable, verifiable credentials without reliance on centralized issuers
- Key Players: Ethereum Attestation Service (EAS), Verax
- Defense Category: Cyber Defense

#### Privacy Primitives

**13. Zero-Knowledge Proofs**
- Category: Privacy
- Subcategory: ZK Infrastructure
- Description: Verification without trust; $1.28B market (2024) → $7.59B by 2033 (22.1% CAGR)
- D/acc Score: ★★★★★
- Investment Tier: Tier 1
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: The only known technology allowing verification without trust, privacy without central authority, compliance without surveillance
- Key Players: zkSync, StarkNet, Polygon zkEVM, Scroll, Aztec
- Defense Category: Cyber Defense

**14. Fully Homomorphic Encryption (FHE)**
- Category: Privacy
- Subcategory: FHE
- Description: Computation on encrypted data; Zama achieved unicorn status; current 20 TPS, targeting 1,000 TPS with ASICs
- D/acc Score: ★★★★★
- Investment Tier: Tier 1
- Development Stage: Very Early
- Risk Profile: Very High
- Why D/acc: Enables encrypted data processing, preventing AI systems from accessing raw information - "the final frontier of on-chain privacy"
- Key Players: Zama ($130M total), Aztec Network ($100M)
- Defense Category: Cyber Defense

**15. MPC (Multi-Party Computation)**
- Category: Privacy
- Subcategory: MPC
- Description: Distributed key management and computation across parties
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Early Growth
- Risk Profile: Medium-High
- Why D/acc: Eliminates single points of failure in key custody; enables cooperation without revealing sensitive data
- Key Players: Lit Protocol, ZenGo, Fireblocks
- Defense Category: Cyber Defense

#### Governance Primitives

**16. Voting Mechanisms**
- Category: Governance
- Subcategory: Voting
- Description: On-chain governance with token-based, quadratic, conviction, and holographic consensus variants
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Enables broader participation in decisions; QV reduces plutocratic dominance through square-root weighting
- Key Players: Snapshot, Tally, Aragon
- Defense Category: Info Defense

**17. Treasury Management**
- Category: Governance
- Subcategory: Treasury
- Description: Streaming payments and DAO treasury infrastructure; $34B total DAO treasury holdings
- D/acc Score: ★★★☆☆
- Investment Tier: Tier 3
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Enables real-time treasury flows without discrete approval bottlenecks
- Key Players: Sablier, Superfluid, Safe
- Defense Category: Cyber Defense

#### Coordination Primitives

**18. Multisig Infrastructure**
- Category: Coordination
- Subcategory: Multisig
- Description: Multi-signature authentication securing $100B+ in assets across 7M+ accounts
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Mature
- Risk Profile: Low
- Why D/acc: Eliminates single points of failure in asset custody; enables social recovery without central custodians
- Key Players: Safe (Gnosis Safe), Argent
- Defense Category: Cyber Defense

**19. Quadratic Funding**
- Category: Coordination
- Subcategory: Public Goods Funding
- Description: Mathematically amplifies small contributions; $60M+ distributed via Gitcoin, 400x matching multipliers
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Early Growth
- Risk Profile: Medium-High
- Why D/acc: Enables collective prioritization of public goods without centralized allocation - "demonstrates sustainable democratic funding"
- Key Players: Gitcoin, Allo Protocol, Optimism RetroPGF ($100M+ committed)
- Defense Category: Info Defense

**20. Impact Certificates (Hypercerts)**
- Category: Coordination
- Subcategory: Impact Verification
- Description: Tokenized impact claims with 10,000+ in circulation, 20,000+ unique addresses
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Early
- Risk Profile: High
- Why D/acc: Enables retroactive funding of public goods with verifiable impact
- Key Players: Hypercerts, EasyRetroPGF
- Defense Category: Info Defense

#### Interoperability Primitives

**21. Cross-Chain Bridges**
- Category: Interoperability
- Subcategory: Bridges
- Description: ~$1.4B TVL despite $2.8B+ historical exploit losses (40% of Web3 hacks)
- D/acc Score: ★★☆☆☆ (trusted) / ★★★★☆ (ZK-based)
- Investment Tier: Tier 3
- Development Stage: Growth
- Risk Profile: High
- Why D/acc: Necessary for ecosystem connectivity but centralization tendencies create caution; ZK-based bridges emerging as safer alternative
- Key Players: LayerZero ($304M TVL), Wormhole ($850M TVL), Axelar
- Defense Category: Cyber Defense

**22. Intent-Based Systems**
- Category: Interoperability
- Subcategory: Intents
- Description: Solver competition for optimal execution; CoW Protocol commands 63% of intent trading
- D/acc Score: ★★★☆☆
- Investment Tier: Tier 3
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Redirects MEV value back to users as price improvement
- Key Players: CoW Protocol ($2.4B monthly), UniswapX
- Defense Category: Cyber Defense

#### Data & Storage Primitives

**23. Decentralized Storage**
- Category: Data/Storage
- Subcategory: Storage
- Description: Filecoin (22 exabytes capacity) vs Arweave ($9-12/GB for ~200-year storage)
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Ensures data availability without platform dependency, preventing AI/corporations from controlling information access
- Key Players: Filecoin (414% storage growth), Arweave (~140TB Permaweb)
- Defense Category: Cyber Defense

**24. Oracle Infrastructure**
- Category: Data/Storage
- Subcategory: Oracles
- Description: Off-chain data feeds; Chainlink 46-58% market share, Pyth grew 46x in 2024
- D/acc Score: ★★★☆☆
- Investment Tier: Tier 3
- Development Stage: Mature
- Risk Profile: Medium
- Why D/acc: Critical middleware but market concentration creates d/acc tension; emerging networks with decentralized architecture may capture share
- Key Players: Chainlink ($20-39B TVS), Pyth ($4.7B TVS), Chronicle, RedStone
- Defense Category: Cyber Defense

**25. Indexing**
- Category: Data/Storage
- Subcategory: Indexing
- Description: Blockchain data queryability; The Graph covers 40+ blockchains
- D/acc Score: ★★★☆☆
- Investment Tier: Tier 3
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Enables decentralized data access for dApps
- Key Players: The Graph ($3.4B GRT growth), Subsquid (100-1000x faster)
- Defense Category: Cyber Defense

#### Security Primitives

**26. Key Management**
- Category: Security
- Subcategory: Key Management
- Description: MPC wallets, smart contract wallets (ERC-4337), social recovery
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Eliminates single points of failure; social recovery enables key restoration without central custodians
- Key Players: Safe, Argent, ZenGo
- Defense Category: Cyber Defense

**27. Audit Mechanisms**
- Category: Security
- Subcategory: Auditing
- Description: Security verification; $3.1B losses in H1 2025 alone; Immunefi paid $155M+ to whitehats
- D/acc Score: ★★★☆☆
- Investment Tier: Tier 3
- Development Stage: Mature
- Risk Profile: Medium
- Why D/acc: Creates economic incentives for defensive security research
- Key Players: Trail of Bits, OpenZeppelin, Spearbit, Immunefi, Code4rena
- Defense Category: Cyber Defense

#### Scalability Primitives

**28. Rollups**
- Category: Scalability
- Subcategory: Rollups
- Description: Optimistic (83-85% share, 7-day finality) vs ZK (15-17%, instant validity proofs)
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Growth
- Risk Profile: Medium
- Why D/acc: Scales blockchain without sacrificing decentralization; ZK rollups preserve privacy
- Key Players: Arbitrum, Optimism, Base, zkSync, StarkNet, Scroll
- Defense Category: Cyber Defense

**29. EIP-4844 / Danksharding**
- Category: Scalability
- Subcategory: Protocol Upgrades
- Description: Blob transactions with 10-100x fee reductions; full Danksharding targets 100,000 TPS
- D/acc Score: ★★★★☆
- Investment Tier: Tier 2
- Development Stage: Early Growth
- Risk Profile: Medium
- Why D/acc: Removes infrastructure bottleneck for decentralized scaling
- Key Players: Ethereum core protocol
- Defense Category: Cyber Defense

---

## DATABASE 3: Sectors

**Purpose**: 10 economic sectors where blockchain primitives apply

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Sector name |
| Description | Text | Sector overview |
| Current Market Size | Text | Current market figures |
| 2030+ Projection | Text | Forward projections |
| CAGR | Text | Compound annual growth rate |
| Transformation Timeline | Select | Already Deployed, 1-2 Years, 3-5 Years, 7-10 Years |
| Key Implementations | Text | Notable deployments |
| Required Primitives | Relation → Primitives | Primitives needed |
| Regulatory Context | Multi-select | MiCA, GENIUS Act, DSCSA, etc. |
| Key Institutional Players | Multi-select | Major institutions involved |
| D/acc Alignment | Select | ★★★★★ to ★☆☆☆☆ |

### Entries to Create

**1. Financial Services / Banking**
- Description: Cross-border payments, settlement, custody, compliance automation
- Current Market Size: JPMorgan Kinexys processing up to $2B daily; $900B+ since 2020
- 2030+ Projection: $34 trillion TAM for cross-border payments
- CAGR: N/A
- Transformation Timeline: Already Deployed
- Key Implementations: JPMorgan Kinexys, DTCC tokenization pilot (Russell 1000, Treasuries), Ripple (300+ financial institutions)
- Required Primitives: Identity/Attestation, Settlement, Compliance Automation, Custody
- Regulatory Context: EU MiCA, US GENIUS Act, SEC approval (DTCC)
- Key Institutional Players: JPMorgan, DTCC, Ripple, Deutsche Bank, HSBC
- D/acc Alignment: ★★★☆☆

**2. Capital Markets / RWA Tokenization**
- Description: Tokenization of real-world assets including securities, bonds, treasuries
- Current Market Size: $2.08T current market (private credit $14B, treasuries $8.2B)
- 2030+ Projection: $3.5-30T (varies by analyst); $13.55T median
- CAGR: 45.46%
- Transformation Timeline: 3-5 Years
- Key Implementations: Securitize ($500M+ issuance, BlackRock-led $47M funding), European Investment Bank €100M digital bond on Ethereum
- Required Primitives: Identity, Settlement, Oracles, Tokenization
- Regulatory Context: SEC/FINRA accreditation, EU MiCA
- Key Institutional Players: BlackRock (BUIDL $2.9B AUM), Securitize, Franklin Templeton
- D/acc Alignment: ★★★☆☆

**3. Real Estate**
- Description: Land registries, fractional ownership, property tokenization
- Current Market Size: $3.5B fractional ownership market (2024)
- 2030+ Projection: $19.4B by 2033 (fractional); blockchain land registries expanding
- CAGR: 21%
- Transformation Timeline: 3-5 Years
- Key Implementations: Georgia (100,000+ titles on Bitcoin, 2M+ records), Sweden (ChromaWay, 1M+ properties), Dubai (XRP Ledger), RealT (2,500+ properties, 40,000+ investors)
- Required Primitives: Identity, Settlement, Tokenization, Oracles
- Regulatory Context: Reg D, Reg A+, Reg CF (US securities)
- Key Institutional Players: Georgia government, Sweden Lantmäteriet, Dubai Land Department
- D/acc Alignment: ★★★★☆

**4. Supply Chain / Logistics**
- Description: Traceability, provenance, pharmaceutical tracking
- Current Market Size: MediLedger consortium (24+ companies), IBM Food Trust
- 2030+ Projection: $97.17B by 2032 (food traceability)
- CAGR: 11.2%
- Transformation Timeline: Already Deployed (pharma), 3-5 Years (broader)
- Key Implementations: MediLedger (DSCSA compliance, Pfizer, McKesson), IBM Food Trust (Walmart mango tracing: 6 days → 2.2 seconds), VeChain (23+ Walmart China lines)
- Required Primitives: Oracles, Identity, Privacy (ZK for competitive confidentiality)
- Regulatory Context: DSCSA (US pharma), FDA pilot participation
- Key Institutional Players: Pfizer, McKesson, Cardinal Health, Walmart
- D/acc Alignment: ★★★★☆

**5. Energy / Carbon Markets**
- Description: Renewable energy trading, carbon credit tokenization, grid management
- Current Market Size: Energy Web Foundation $90M tokens; Power Ledger deployments
- 2030+ Projection: $265.58B by 2033
- CAGR: 71.14%
- Transformation Timeline: 3-5 Years (energy), 7-10 Years (carbon - quality issues)
- Key Implementations: Power Ledger (30% renewable autonomy at Chiang Mai University, 142 buildings), KlimaDAO (17M+ tonnes CO2-equivalent)
- Required Primitives: Oracles, Marketplaces, Identity, Verification
- Regulatory Context: Carbon credit standards (Verra halted tokenization 2022)
- Key Institutional Players: Shell, Centrica, Tokyo Electric Power (Energy Web partners)
- D/acc Alignment: ★★★★☆

**6. Healthcare**
- Description: Medical records, pharmaceutical tracking, clinical trials
- Current Market Size: $831M (2024)
- 2030+ Projection: $178.91B by 2034
- CAGR: N/A (massive growth trajectory)
- Transformation Timeline: Already Deployed (pharma tracking), 7-10 Years (records)
- Key Implementations: Estonia KSI Blockchain (national health infrastructure since 2011), MediLedger (pharmaceutical DSCSA)
- Required Primitives: Privacy (ZK/FHE), Identity, Storage, Compliance
- Regulatory Context: HIPAA, GDPR, DSCSA
- Key Institutional Players: Estonia government, MediLedger consortium
- D/acc Alignment: ★★★★★

**7. Insurance**
- Description: Parametric insurance, claims automation, reinsurance
- Current Market Size: Emerging
- 2030+ Projection: $40.6B by 2033
- CAGR: N/A
- Transformation Timeline: 3-5 Years
- Key Implementations: Arbol (AI-powered weather insurance with Chainlink oracles), dRe Platform (first on-chain parametric reinsurance), Etherisc (flight delays, crop insurance)
- Required Primitives: Oracles, Smart Contracts, Identity
- Regulatory Context: Insurance regulations (state-by-state US)
- Key Institutional Players: Arbol, Etherisc
- D/acc Alignment: ★★★★☆

**8. Governance / E-Voting**
- Description: Electronic voting, AGM voting, DAO governance
- Current Market Size: $170M DAO tooling (2024)
- 2030+ Projection: $333M by 2031 (DAO tooling); 50%+ online voting (Estonia model)
- CAGR: N/A
- Transformation Timeline: Already Deployed (Estonia), 3-5 Years (broader)
- Key Implementations: Estonia (>50% votes cast online in 2023 - first globally), Abu Dhabi Securities Exchange (AGM voting 2024), Broadridge (80% US outstanding shares)
- Required Primitives: Identity (ZK), Voting Mechanisms, Privacy
- Regulatory Context: Election laws, securities regulations
- Key Institutional Players: Estonia government, Broadridge, Abu Dhabi SE
- D/acc Alignment: ★★★★★

**9. Public Goods / Social Coordination**
- Description: Quadratic funding, retroactive public goods funding, mutual aid
- Current Market Size: $60M+ distributed via Gitcoin; $100M+ committed by Optimism
- 2030+ Projection: Expanding with ecosystem growth
- CAGR: N/A
- Transformation Timeline: Already Deployed
- Key Implementations: Gitcoin Grants ($60M+ distributed), Optimism RetroPGF (850M OP long-term, 501+ projects), Allo Protocol
- Required Primitives: Quadratic Funding, Identity/Sybil Resistance, Impact Verification
- Regulatory Context: Minimal (crypto-native)
- Key Institutional Players: Gitcoin, Optimism, Ethereum Foundation
- D/acc Alignment: ★★★★★

**10. Art / Media**
- Description: NFTs, decentralized streaming, creator royalties
- Current Market Size: ~$35B (down from $414B peak May 2022)
- 2030+ Projection: Uncertain - market in transformation
- CAGR: Negative (contracting)
- Transformation Timeline: Already Deployed but transforming
- Key Implementations: Audius (330,000+ rights holders via ICE partnership), Livepeer ($48M raised, video transcoding), Theta Network (30,000+ edge nodes)
- Required Primitives: NFTs, Streaming Infrastructure, Royalty Enforcement
- Regulatory Context: Copyright, IP law
- Key Institutional Players: OpenSea, Audius, Livepeer
- D/acc Alignment: ★★★☆☆

---

## DATABASE 4: Projects (Protocols)

**Purpose**: Specific protocols and implementations with detailed metrics

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Protocol name |
| Website | URL | Project website |
| Category | Relation → Primitives | Primary primitive category |
| Sectors | Relation → Sectors | Sectors served |
| Defense Category | Relation → Defense Categories | D/acc alignment domain |
| Description | Text | What the project does |
| Funding Raised | Text | Total funding |
| TVL / Market Metrics | Text | Current metrics |
| Key Differentiator | Text | Competitive advantage |
| D/acc Score | Select | ★★★★★ to ★☆☆☆☆ |
| Investment Tier | Select | Tier 1, Tier 2, Tier 3 |
| Stage | Select | Mainnet, Testnet, Development |
| Token | Checkbox | Has native token |
| Token Symbol | Text | Token symbol if applicable |

### Initial Entries (50+ projects from research)

#### Tier 1 Projects (Highest D/acc Alignment)

1. **Ethereum Attestation Service (EAS)**
   - Category: Attestation Infrastructure
   - Description: Two core contracts for on-chain/off-chain attestations with custom resolvers
   - Funding: Open source (Ethereum ecosystem)
   - Key Differentiator: 80% compliance cost reduction, 90% faster verification
   - D/acc Score: ★★★★★
   - Stage: Mainnet

2. **Polygon ID**
   - Category: ZK Identity
   - Description: ZK-powered identity using Iden3 protocol, private by default
   - Funding: Part of Polygon ecosystem
   - Key Differentiator: Buenos Aires deployment for 3.6M citizens
   - D/acc Score: ★★★★★
   - Stage: Mainnet

3. **Gitcoin Passport (Holonym)**
   - Category: Reputation/Sybil Resistance
   - Description: Multi-signal identity verification with 2M+ users, 34M+ credentials
   - Funding: Acquired by Holonym Foundation
   - TVL: Protecting $380M+ in funds
   - Key Differentiator: Stamps aggregate verifiable credentials from web2/web3
   - D/acc Score: ★★★★★
   - Stage: Mainnet

4. **Zama (fhEVM)**
   - Category: FHE
   - Description: Confidential smart contracts via fully homomorphic encryption
   - Funding: $130M total ($73M Series A + $57M Series B)
   - Key Differentiator: Only FHE unicorn; targeting 1,000 TPS with ASICs
   - D/acc Score: ★★★★★
   - Stage: Development/Testnet

5. **Aztec Network**
   - Category: Privacy L2
   - Description: Privacy-first L2 with hybrid execution (Private + AVM)
   - Funding: $100M Series B
   - Key Differentiator: Noir programming language for ZK circuits
   - D/acc Score: ★★★★★
   - Stage: Testnet (May 2025)

6. **zkSync**
   - Category: ZK Rollups
   - Description: zkEVM rollup with native account abstraction
   - Funding: $458M total
   - TVL: ~$500M
   - Key Differentiator: zkEVM with hyperscaling roadmap
   - D/acc Score: ★★★★★
   - Stage: Mainnet

7. **StarkNet**
   - Category: ZK Rollups
   - Description: zk-STARK based L2 with Cairo language
   - Funding: $282M+
   - Key Differentiator: Quantum-resistant, no trusted setup
   - D/acc Score: ★★★★★
   - Stage: Mainnet

8. **Semaphore**
   - Category: ZK Identity
   - Description: Anonymous group membership signaling (Ethereum Foundation PSE)
   - Funding: Ethereum Foundation grants
   - Key Differentiator: Powers World ID
   - D/acc Score: ★★★★★
   - Stage: Mainnet

#### Tier 2 Projects

9. **Celestia**
   - Category: Data Availability
   - Description: Modular DA layer with 8MB blocks, targeting 1GB
   - Funding: $155M
   - Key Differentiator: 99.9% cost reduction vs Ethereum mainnet
   - D/acc Score: ★★★★☆
   - Stage: Mainnet

10. **EigenDA**
    - Category: Data Availability
    - Description: DA using Ethereum restaking, 100MB/second throughput
    - Funding: $170M+ (via EigenLayer)
    - Key Differentiator: Ethereum-aligned security model
    - D/acc Score: ★★★★☆
    - Stage: Mainnet

11. **Safe (Gnosis Safe)**
    - Category: Multisig
    - Description: Multi-signature infrastructure for asset custody
    - Funding: $100M (2022)
    - TVL: $100B+ secured, 7M+ accounts
    - Key Differentiator: Industry standard, account abstraction stack
    - D/acc Score: ★★★★☆
    - Stage: Mainnet

12. **Optimism**
    - Category: Rollups
    - Description: Optimistic rollup with retroactive public goods funding
    - Funding: $178M+
    - TVL: ~$800M
    - Key Differentiator: RetroPGF committed $100M+ to 501 contributors
    - D/acc Score: ★★★★☆
    - Stage: Mainnet

13. **Arbitrum**
    - Category: Rollups
    - Description: Optimistic rollup, largest L2 by TVL
    - Funding: $120M Series B
    - TVL: ~$2.5B
    - Key Differentiator: Nitro architecture, Stylus multi-VM
    - D/acc Score: ★★★★☆
    - Stage: Mainnet

14. **Hypercerts**
    - Category: Impact Certificates
    - Description: Tokenized impact claims (extended ERC-1155)
    - Funding: Protocol Labs, Gitcoin grants
    - Metrics: 10,000+ in circulation, 20,000+ addresses
    - Key Differentiator: EasyRetroPGF integration
    - D/acc Score: ★★★★☆
    - Stage: Mainnet

15. **Allo Protocol**
    - Category: Quadratic Funding
    - Description: Programmable capital allocation infrastructure
    - Funding: Gitcoin ecosystem
    - Key Differentiator: Enables any community to run funding rounds
    - D/acc Score: ★★★★☆
    - Stage: Mainnet

16. **Lit Protocol**
    - Category: MPC
    - Description: Decentralized key management and access control
    - Funding: $20M+
    - Key Differentiator: Programmable conditions for decryption
    - D/acc Score: ★★★★☆
    - Stage: Mainnet

17. **Aave**
    - Category: Lending
    - Description: Decentralized lending/borrowing protocol
    - Funding: Various
    - TVL: $10.76B across 15+ chains
    - Key Differentiator: Flash loans, multi-chain deployment
    - D/acc Score: ★★★☆☆
    - Stage: Mainnet

18. **Uniswap**
    - Category: AMMs
    - Description: Largest DEX with concentrated liquidity (V3)
    - Funding: $165M+
    - Metrics: $1.8T+ cumulative volume
    - Key Differentiator: 4000x capital efficiency vs V2
    - D/acc Score: ★★★☆☆
    - Stage: Mainnet

19. **ENS (Ethereum Name Service)**
    - Category: DID
    - Description: Human-readable naming integrated with identity systems
    - Funding: DAO treasury
    - Metrics: 2M+ names registered
    - Key Differentiator: De facto standard for Ethereum identity
    - D/acc Score: ★★★★☆
    - Stage: Mainnet

20. **Filecoin**
    - Category: Decentralized Storage
    - Description: Incentivized storage network with smart contracts (FVM)
    - Funding: $257M
    - Metrics: 22 exabytes capacity, ~3,000 providers
    - Key Differentiator: 414% storage growth to Q1 2024
    - D/acc Score: ★★★★☆
    - Stage: Mainnet

#### Tier 3 Projects

21. **Chainlink**
    - Category: Oracles
    - Description: Decentralized oracle network
    - Funding: $32M ICO + ecosystem
    - TVL: $20-39B TVS (46-58% market share)
    - Key Differentiator: 400+ integrations, first mover
    - D/acc Score: ★★★☆☆
    - Stage: Mainnet

22. **Pyth**
    - Category: Oracles
    - Description: Pull-model oracle with 400ms updates
    - Funding: Jump Crypto backed
    - TVL: $4.7B TVS (46x growth in 2024)
    - Key Differentiator: Exchange-sourced data, sub-second latency
    - D/acc Score: ★★★☆☆
    - Stage: Mainnet

23. **LayerZero**
    - Category: Cross-Chain Bridges
    - Description: Omnichain interoperability protocol
    - Funding: $120M+ Series A
    - TVL: $304M, $23.9B volume
    - Key Differentiator: Modular DVN architecture, ZK verification emerging
    - D/acc Score: ★★★☆☆
    - Stage: Mainnet

24. **CoW Protocol**
    - Category: Intent-Based Systems
    - Description: Batch auctions with MEV protection
    - Funding: Gnosis ecosystem
    - Metrics: 63% of intent trading, $2.4B monthly volume
    - Key Differentiator: Returns MEV to users as price improvement
    - D/acc Score: ★★★☆☆
    - Stage: Mainnet

25. **Hyperliquid**
    - Category: Perpetual DEXs
    - Description: Custom L1 for derivatives
    - Funding: Self-funded
    - Metrics: 64.8% perp DEX market share, 200K orders/second
    - Key Differentiator: Disrupted market from 0.3% to dominance
    - D/acc Score: ★★★☆☆
    - Stage: Mainnet

(Additional 25+ projects follow same pattern - dYdX, GMX, Curve, Compound, Morpho, The Graph, Arweave, World ID, Chronicle, RedStone, Wormhole, Axelar, Scroll, Polygon zkEVM, Base, Sablier, Superfluid, Aragon, DAOhaus, GrapheneOS, QubesOS, Zupass, etc.)

---

## DATABASE 5: Investment Thesis

**Purpose**: Investment hypotheses ranked by conviction with supporting evidence

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Thesis name |
| Tier | Select | Tier 1, Tier 2, Tier 3 |
| Summary | Text | One-line thesis |
| Full Description | Text | Detailed thesis |
| D/acc Alignment | Text | Why this aligns with d/acc |
| Market Opportunity | Text | Size and growth metrics |
| Key Investment Vectors | Multi-select | Specific opportunities |
| Risk Factors | Text | Main risks |
| Validation Needed | Text | Hypotheses to test |
| Position Sizing | Select | Core, Growth, Speculative, Selective |
| Related Primitives | Relation → Primitives | Linked primitives |
| Related Projects | Relation → Projects | Example projects |

### Entries

**1. Zero-Knowledge Infrastructure**
- Tier: Tier 1
- Summary: Universal privacy + compliance compatibility creates massive market opportunity
- Full Description: ZK proofs are the only known technology allowing verification without trust, privacy without central authority, compliance without surveillance. This directly addresses Vitalik's concern that "with modern AI to interpret it, there may be no place to hide."
- D/acc Alignment: ★★★★★ - Perfect alignment; enables defense without centralization
- Market Opportunity: $90B ZK L2 market by 2031 (60.7% CAGR); $7.59B ZK tech by 2033 (22.1% CAGR)
- Key Investment Vectors: zkEVM Rollups, ZK Credential Systems, ZK Proving Infrastructure, ZK Developer Tooling
- Risk Factors: Technical complexity, proving time optimization, developer adoption curve
- Validation Needed: Enterprise ZK pilots (Deutsche Bank, HSBC) converting to production
- Position Sizing: Core
- Related Primitives: ZK Proofs, ZK Identity, Rollups
- Related Projects: zkSync, StarkNet, Polygon zkEVM, Scroll, Aztec

**2. Decentralized Identity & Attestation**
- Tier: Tier 1
- Summary: Foundation for institutional adoption while preserving user sovereignty
- Full Description: Creates self-sovereign alternatives to platform-controlled credentials. Enables individuals to own and selectively disclose identity without depending on corporations or governments. Financial institutions report 80% compliance cost reduction.
- D/acc Alignment: ★★★★★ - Self-sovereignty is core d/acc principle
- Market Opportunity: Multi-trillion addressable market across finance, healthcare, governance; 200+ DID methods published
- Key Investment Vectors: Attestation Protocols (EAS ecosystem), ZK Credential Systems, Reputation Aggregation, Social Recovery
- Risk Factors: Adoption chicken-and-egg, standards fragmentation, key recovery UX
- Validation Needed: Buenos Aires ZK identity replicability; institutional DID adoption
- Position Sizing: Core
- Related Primitives: DID, Reputation, Attestation, ZK Identity
- Related Projects: EAS, Polygon ID, Gitcoin Passport, ENS, World ID

**3. Privacy-Preserving Computation (FHE/MPC)**
- Tier: Tier 1
- Summary: Institutional privacy gap creates demand-supply mismatch
- Full Description: Enables computation on encrypted data from multiple parties—more composable than ZK for multi-party scenarios. Directly addresses critical gap between institutional privacy requirements and on-chain transparency.
- D/acc Alignment: ★★★★★ - Prevents AI systems from accessing raw information
- Market Opportunity: Only ~$250M total funding vs multi-trillion DeFi/RWA opportunity; Zama unicorn validates timing
- Key Investment Vectors: FHE Smart Contract Platforms, MPC Wallet Infrastructure, FHE Hardware Acceleration, Privacy-Preserving Compliance
- Risk Factors: Current 20 TPS performance; ASIC development timeline; nascent ecosystem
- Validation Needed: FHE performance trajectory (20→1,000 TPS)
- Position Sizing: Growth
- Related Primitives: FHE, MPC
- Related Projects: Zama, Aztec Network, Lit Protocol

**4. Data Availability Layers**
- Tier: Tier 2
- Summary: Infrastructure bottleneck removal for rollup scaling
- Full Description: Decentralizes critical DA bottleneck for rollup scaling. Celestia's Data Availability Sampling enables light node verification without downloading full blocks—preventing validator centralization. DA costs represent 90%+ of L2 operating expenses.
- D/acc Alignment: ★★★★☆ - Prevents centralization at infrastructure layer
- Market Opportunity: Market scales directly with rollup adoption; three well-funded competitors
- Key Investment Vectors: DA Layer Native Tokens, Rollup Infrastructure Built on DA Layers
- Risk Factors: Competition creates execution risk; winner-take-most dynamics possible
- Validation Needed: Celestia cost advantage translating to sustained rollup adoption vs EigenDA security
- Position Sizing: Growth
- Related Primitives: Data Availability
- Related Projects: Celestia, EigenDA, Avail

**5. Quadratic/Retroactive Funding Infrastructure**
- Tier: Tier 2
- Summary: Democratic coordination primitive demonstrating sustainable public goods financing
- Full Description: Mathematically amplifies small contributions, enabling collective prioritization of public goods without centralized allocation. 400x matching multipliers for small donations demonstrated.
- D/acc Alignment: ★★★★☆ - Enables democratic coordination
- Market Opportunity: $60M+ distributed via Gitcoin; $100M+ committed by Optimism; infrastructure layer more investable
- Key Investment Vectors: Funding Protocol Infrastructure (Allo), Sybil Resistance Systems, Impact Verification (Hypercerts)
- Risk Factors: Sybil attacks, funding predictability challenges, adoption beyond crypto-native
- Validation Needed: QV adoption correlation with improved participation rates
- Position Sizing: Speculative
- Related Primitives: Quadratic Funding, Impact Certificates, Sybil Resistance
- Related Projects: Gitcoin, Allo Protocol, Optimism RetroPGF, Hypercerts

**6. Decentralized Stablecoin Mechanisms**
- Tier: Tier 2
- Summary: Reduce concentration risk in the largest crypto market segment
- Full Description: 91% of $309B stablecoin market remains centralized and fiat-backed, creating concentration risk. Decentralized alternatives preserve utility while maintaining decentralization.
- D/acc Alignment: ★★★★☆ - Reduces single points of failure in monetary infrastructure
- Market Opportunity: $309B market cap; regulatory pressure on centralized stablecoins creating opportunity
- Key Investment Vectors: Decentralized Stablecoin Protocols, Yield Optimization Layers, Delta-Neutral Mechanisms
- Risk Factors: Historical peg stability failures (algorithmic), regulatory uncertainty
- Validation Needed: Sustained peg stability under stress; regulatory clarity
- Position Sizing: Selective
- Related Primitives: Stablecoins
- Related Projects: DAI, Ethena USDe, Frax

**7. Oracle Infrastructure (Emerging Networks)**
- Tier: Tier 3
- Summary: Critical middleware with decentralization trajectory opportunity
- Full Description: Critical middleware for real-world integration but Chainlink's 46-58% market share creates d/acc tension. Emerging networks with more decentralized architecture may capture share.
- D/acc Alignment: ★★★☆☆ - Important but concentration concerns
- Market Opportunity: All sectors requiring off-chain data; Pyth 46x growth validates competition
- Key Investment Vectors: Emerging Oracle Networks with Decentralized Architecture
- Risk Factors: Network effects favoring incumbents; integration switching costs
- Validation Needed: Market share dynamics; decentralization improvements
- Position Sizing: Selective
- Related Primitives: Oracles
- Related Projects: Pyth, Chronicle, RedStone

**8. ZK-Based Cross-Chain Infrastructure**
- Tier: Tier 3
- Summary: Security resolution for cross-chain with reduced trust assumptions
- Full Description: Necessary for ecosystem connectivity but $2.8B historical exploit losses and centralization tendencies create caution. ZK-based bridges may resolve security concerns with validity proofs instead of trust assumptions.
- D/acc Alignment: ★★★☆☆ - ZK variants higher alignment
- Market Opportunity: Essential infrastructure as multi-chain world develops
- Key Investment Vectors: ZK-Based Bridges, Intent-Based Systems with Decentralized Solvers
- Risk Factors: Security track record; bridge exploit history; complexity
- Validation Needed: ZK bridge security in production
- Position Sizing: Speculative
- Related Primitives: Cross-Chain Bridges, Intent-Based Systems
- Related Projects: LayerZero V2 (ZK DVNs), CoW Protocol, UniswapX

---

## DATABASE 6: Market Data

**Purpose**: Quantitative metrics for tracking market sizes and growth

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Metric name |
| Category | Select | Market Size, TVL, Volume, Funding, Growth Rate |
| Current Value | Text | Current figure |
| 2030+ Projection | Text | Forward projection |
| CAGR | Text | Growth rate |
| Source | Text | Data source |
| Last Updated | Date | When data was collected |
| Related Primitive | Relation → Primitives | Linked primitive |
| Related Sector | Relation → Sectors | Linked sector |

### Entries

1. **Stablecoin Market Cap**: $309B (2024)
2. **Stablecoin Annual Volume**: $27.6T (exceeds Visa+Mastercard)
3. **RWA Tokenization Current**: $2.08T
4. **RWA Tokenization 2030**: $3.5-30T (45%+ CAGR)
5. **ZK Technology Market**: $1.28B → $7.59B by 2033 (22.1% CAGR)
6. **ZK L2 Solutions**: Emerging → $90B by 2031 (60.7% CAGR)
7. **DeFi TVL**: $129-214B
8. **DeFi Protocol Revenue**: $12B (2024)
9. **FHE Total Funding**: ~$130M
10. **Blockchain Energy Market**: $265.58B by 2033 (71.1% CAGR)
11. **Healthcare Blockchain**: $831M → $178.91B by 2034
12. **Supply Chain Blockchain**: $97.17B by 2032 (11.2% CAGR)
13. **Parametric Insurance**: $40.6B by 2033
14. **DAO Treasury Holdings**: ~$34B
15. **DAO Tooling Market**: $170M (2024) → $333M by 2031
16. **Perpetual DEX Volume**: $1.4T+ annual (2024), up 872% YoY
17. **Safe TVL**: $100B+ secured
18. **Gitcoin Distributed**: $60M+
19. **L1 Funding Decline**: 85% in Q4 2024
20. **Enterprise Blockchain Funding**: Down 69% YoY to $164M

---

## Cross-Linking Relations Summary

### Primary Relations

1. **Primitives ↔ Defense Categories**: Each primitive maps to 1-2 defense categories
2. **Primitives ↔ Sectors**: Many-to-many; primitives serve multiple sectors
3. **Projects ↔ Primitives**: Each project implements 1-3 primitives
4. **Projects ↔ Sectors**: Projects may serve multiple sectors
5. **Investment Thesis ↔ Primitives**: Each thesis focuses on related primitives
6. **Investment Thesis ↔ Projects**: Example projects for each thesis
7. **Market Data ↔ Primitives/Sectors**: Metrics link to relevant categories

### Rollup Relations (for Notion views)

1. **By D/acc Score**: Filter all databases by ★★★★★ to ★☆☆☆☆
2. **By Investment Tier**: Filter Tier 1, 2, 3 across primitives, projects, thesis
3. **By Defense Domain**: View primitives/projects by Vitalik's 4 domains
4. **By Sector**: View all primitives/projects applicable to each sector
5. **By Development Stage**: Track maturity across ecosystem

---

## Recommended Notion Views

### Dashboard Views

1. **D/acc Alignment Matrix**: Gallery view of primitives sorted by d/acc score
2. **Investment Priority Board**: Kanban by tier with projects as cards
3. **Defense Domain Map**: Board view with 4 columns (Macro/Micro/Cyber/Info)
4. **Sector Opportunity Matrix**: Table with sectors × primitives
5. **Project Pipeline**: Table sorted by stage and funding

### Analytical Views

1. **Market Size Timeline**: Chart of projected growth by category
2. **Funding Gap Analysis**: Compare funding vs market opportunity
3. **Validation Tracker**: List of hypotheses needing empirical testing

---

## Implementation Notes

1. **Start with Defense Categories** - This grounds everything in Vitalik's framework
2. **Build Primitives second** - The core taxonomy
3. **Add Projects third** - Populate with 50+ initial entries
4. **Create Sectors fourth** - Economic application areas
5. **Build Investment Thesis fifth** - Synthesize the above
6. **Add Market Data last** - Quantitative layer

Each database should be created as a full-page database in Notion, then linked via Relations. Use rollups to aggregate d/acc scores, market sizes, and project counts across related entries.
