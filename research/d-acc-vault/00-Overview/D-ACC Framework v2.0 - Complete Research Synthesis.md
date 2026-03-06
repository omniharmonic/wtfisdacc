# D/ACC Framework v2.0 — Complete Research Synthesis

*A Comprehensive Framework for Evaluating Defensive Accelerationist Technologies*

**Version**: 2.0
**Date**: January 22, 2026
**Status**: Framework Finalized

---

## Executive Summary

This document synthesizes the Defensive Accelerationism (D/ACC) research framework into a coherent, first-principles-based system for evaluating technologies, primitives, and market sectors. The framework addresses three core needs:

1. **Vitalik's Quadrant Framework** — Organizing technologies along Atoms/Bits and Survive/Thrive axes
2. **Taxonomically Sound Categories** — MECE (Mutually Exclusive, Collectively Exhaustive) primitives and sectors
3. **Rigorous Evaluation Rubric** — Scoring methodology combining D/ACC alignment with market opportunity

---

## Part I: The D/ACC Quadrant Framework

### Vitalik's Two Axes

Vitalik Buterin's defensive accelerationism framework organizes technology along two fundamental axes:

```
                        SURVIVE                          THRIVE
                   (Defense/Protection)            (Growth/Flourishing)
              ┌────────────────────────────┬────────────────────────────┐
              │                            │                            │
              │   BITS-SURVIVE             │   BITS-THRIVE              │
              │                            │                            │
    BITS      │   • Privacy preservation   │   • Collective governance  │
   (Digital)  │   • Identity sovereignty   │   • Market coordination    │
              │   • Censorship resistance  │   • Creative expression    │
              │   • Data integrity         │   • Knowledge sharing      │
              │                            │                            │
              ├────────────────────────────┼────────────────────────────┤
              │                            │                            │
              │   ATOMS-SURVIVE            │   ATOMS-THRIVE             │
              │                            │                            │
   ATOMS      │   • Biosecurity            │   • Renewable energy       │
  (Physical)  │   • Infrastructure         │   • Supply optimization    │
              │     resilience             │   • Local manufacturing    │
              │   • Food/water security    │   • Physical coordination  │
              │                            │                            │
              └────────────────────────────┴────────────────────────────┘
```

### Axis Definitions

**Atoms vs. Bits**
- **Atoms**: Technologies interfacing with the physical world—infrastructure, biology, energy, supply chains
- **Bits**: Technologies operating in the digital/information realm—cryptography, governance, markets, identity

**Survive vs. Thrive**
- **Survive**: Defensive technologies that protect against harm, preserve integrity, resist attack
- **Thrive**: Generative technologies that enable growth, coordination, and human flourishing

### Quadrant Examples

| Quadrant | Definition | Example Technologies |
|----------|------------|---------------------|
| **Atoms-Survive** | Physical defense and resilience | Far-UVC, air filtering, resilient infrastructure, decentralized power |
| **Atoms-Thrive** | Physical coordination and growth | P2P energy trading, supply chain optimization, local manufacturing |
| **Bits-Survive** | Digital defense and sovereignty | ZK proofs, encryption, self-sovereign identity, censorship resistance |
| **Bits-Thrive** | Digital coordination and creation | Quadratic funding, DAOs, prediction markets, creator economies |

### Application Guidance

When classifying a technology:
1. **Primary axis**: Does it primarily interface with physical (Atoms) or digital (Bits) reality?
2. **Secondary axis**: Does it primarily protect/defend (Survive) or enable/coordinate (Thrive)?
3. **Note**: Many technologies span multiple quadrants—classify by *primary* function

---

## Part II: Primitives Taxonomy (v2.0)

### Design Principles

The primitives taxonomy is organized by **fundamental function**—what the primitive enables you to DO—rather than by implementation technique or domain. This resolves overlaps in the previous taxonomy (e.g., ZK being both "Privacy" and "Identity").

### The Six Primitive Functions

```
┌─────────────────────────────────────────────────────────────────────┐
│                     D/ACC PRIMITIVE FUNCTIONS                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. COMPUTE      Execute logic without central control               │
│  2. COORDINATE   Make collective decisions and allocate resources    │
│  3. EXCHANGE     Transfer value and assets                           │
│  4. VERIFY       Prove claims without revealing secrets              │
│  5. STORE        Persist data with availability guarantees           │
│  6. CONNECT      Link identities, systems, and physical world        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Why These Six?

These map to **irreducible operations** any decentralized civilization needs:

| Function | Replaces | Core Question |
|----------|----------|---------------|
| COMPUTE | Trusted institutions | Can we run programs without central authority? |
| COORDINATE | Governments/hierarchies | Can we make collective decisions? |
| EXCHANGE | Banks/financial institutions | Can we trade and transfer value? |
| VERIFY | Notaries/auditors/credentials | Can we prove claims without disclosure? |
| STORE | Archives/databases | Can we persist data reliably? |
| CONNECT | Identity systems/bridges | Can we link systems and worlds? |

---

### 1. COMPUTE (Decentralized Execution)

**Function**: Execute arbitrary logic with verifiable correctness and no single point of control.

| Subcategory | Description | Key Primitives |
|-------------|-------------|----------------|
| **Consensus** | Agreement on state | PoS, PoW, BFT variants |
| **Execution** | Where computation runs | EVM, Solana VM, Move VM |
| **Scaling** | Increase throughput | Rollups (Optimistic, ZK), EIP-4844, Data Availability |
| **Settlement** | Finalize state changes | Ethereum, Bitcoin |

**Key Players**: Ethereum, Arbitrum, Optimism, zkSync, StarkNet, Celestia, EigenDA

---

### 2. COORDINATE (Collective Decision-Making)

**Function**: Enable groups to make decisions, allocate resources, and take collective action without central authority.

| Subcategory | Description | Key Primitives |
|-------------|-------------|----------------|
| **Voting & Signaling** | Preference aggregation | Token voting, Quadratic voting, Conviction voting |
| **Resource Allocation** | Distributing funds/attention | Quadratic funding, Retroactive funding, Impact certificates |
| **Treasury Management** | Collective asset control | DAO treasuries, Streaming payments |
| **Execution Control** | Gating who can do what | Multisig, Timelocks, Permission systems |

**Key Players**: Snapshot, Tally, Gitcoin, Allo Protocol, Safe, Optimism RetroPGF, Hypercerts

---

### 3. EXCHANGE (Value Transfer)

**Function**: Enable transfer and transformation of value without trusted intermediaries.

| Subcategory | Description | Key Primitives |
|-------------|-------------|----------------|
| **Money** | Stable units of account | Stablecoins (USDC, USDT, DAI, USDe) |
| **Spot Markets** | Immediate exchange | AMMs (Uniswap, Curve), Order books |
| **Derivatives** | Future/leveraged positions | Perpetual DEXs (Hyperliquid, dYdX, GMX) |
| **Credit** | Temporal value transfer | Lending protocols (Aave, Compound, Morpho) |
| **Payments** | Transfer infrastructure | Payment channels, Streaming (Sablier, Superfluid) |

**Key Players**: Uniswap, Aave, Hyperliquid, Ethena, MakerDAO, CoW Protocol

---

### 4. VERIFY (Provable Claims)

**Function**: Make and verify claims about state, identity, or computation without revealing underlying data.

| Subcategory | Description | Key Primitives |
|-------------|-------------|----------------|
| **Computation Proofs** | Prove execution correctness | ZK proofs (zkSNARKs, zkSTARKs) |
| **Identity Proofs** | Prove who/what you are | ZK Identity, DID, Worldcoin |
| **Reputation Proofs** | Prove track record | Sybil resistance, Gitcoin Passport |
| **Attestation** | Third-party claims | EAS, Verax |
| **Confidential Computation** | Compute on encrypted data | FHE, MPC |

**Key Players**: Polygon ID, Semaphore, EAS, Gitcoin Passport, Zama, Aztec, Lit Protocol

**Note**: Privacy is achieved *through* verification techniques (ZK, FHE, MPC), not a separate category.

---

### 5. STORE (Persistent Data)

**Function**: Persist and retrieve data with guarantees about availability, integrity, and access.

| Subcategory | Description | Key Primitives |
|-------------|-------------|----------------|
| **Blob Storage** | Raw data persistence | IPFS, Filecoin, Arweave |
| **Structured Data** | Queryable state | The Graph, Subsquid |
| **Real-World Data** | External information | Oracles (Chainlink, Pyth, Chronicle) |
| **Data Availability** | Rollup data | Celestia, EigenDA, Avail |

**Key Players**: Filecoin, Arweave, The Graph, Chainlink, Pyth, Celestia

---

### 6. CONNECT (Bridging Boundaries)

**Function**: Link disparate systems, identities, and domains including physical world.

| Subcategory | Description | Key Primitives |
|-------------|-------------|----------------|
| **Cross-Chain** | Between blockchains | Bridges, IBC, LayerZero |
| **Intent Resolution** | Between desire and execution | Solvers, CoW Protocol, UniswapX |
| **Identity Binding** | Between personas/accounts | DID linking, Account abstraction, ENS |
| **Physical Binding** | Between atoms and bits | IoT attestation, Supply chain |
| **Key Infrastructure** | Between humans and cryptography | Key management, Social recovery, MPC wallets |

**Key Players**: LayerZero, Wormhole, CoW Protocol, ENS, Safe, Argent

---

### Cross-Cutting Properties (Tags, Not Categories)

These are **qualities** that primitives can have—use as tags, not categories:

| Property | Description | Achieved Through |
|----------|-------------|------------------|
| **Privacy** | Selective disclosure | ZK, FHE, MPC |
| **Security** | Resistance to attack | Formal verification, Economic guarantees |
| **Scalability** | Performance at scale | Architectural choices |
| **Censorship Resistance** | Unstoppability | Decentralization across layers |

---

### Primitives-to-Quadrant Mapping

| Function | Bits-Survive | Bits-Thrive | Atoms-Survive | Atoms-Thrive |
|----------|--------------|-------------|---------------|--------------|
| COMPUTE | Redundancy, fault tolerance | Performance, throughput | — | — |
| COORDINATE | — | Voting, funding allocation | — | Local governance |
| EXCHANGE | Censorship-resistant payments | Markets, lending | — | P2P energy trading |
| VERIFY | Privacy, attestation | Reputation | IoT sensors | Supply chain |
| STORE | Backup, archival | Indexing | Inventory | — |
| CONNECT | Key management | Identity | Physical binding | Mesh networks |

---

## Part III: Sectors Taxonomy (v2.0)

### Design Principles

Sectors are organized by **functional domain**—the fundamental human coordination problem addressed—rather than industry vertical (which creates overlap) or use case (which is too granular).

### The Ten Functional Domains

```
D/ACC Research Domains (v2.0)
├── 1. Value Transfer          — Moving and storing economic value
├── 2. Asset Coordination      — Managing ownership of assets
├── 3. Supply Networks         — Coordinating production and distribution
├── 4. Energy Systems          — Managing energy and carbon
├── 5. Health & Biotech        — Healthcare and biotech coordination
├── 6. Identity & Credentials  — Proving who you are
├── 7. Governance & Voting     — Collective decision-making
├── 8. Legal & Disputes        — Contracts and enforcement
├── 9. Knowledge & Education   — Learning and research coordination
└── 10. Media & Creative       — Art, content, attribution
```

---

### Sector Definitions

| # | Domain | Core Problem | D/ACC Quadrant | Example Implementations |
|---|--------|--------------|----------------|------------------------|
| 1 | **Value Transfer** | Moving value across time, space, form | Bits-Survive | JPMorgan Kinexys, Stablecoins, Remittances |
| 2 | **Asset Coordination** | Coordinating ownership claims | Bits+Atoms-Thrive | RWA tokenization, Real estate, Securities |
| 3 | **Supply Networks** | Production and distribution | Atoms-Thrive | MediLedger, IBM Food Trust, Trade finance |
| 4 | **Energy Systems** | Energy production/distribution, carbon | Atoms-Survive | Power Ledger, KlimaDAO, Grid coordination |
| 5 | **Health & Biotech** | Healthcare delivery, biotech R&D | Atoms-Survive | Estonia KSI, Clinical trials, Drug tracking |
| 6 | **Identity & Credentials** | Proving identity and capabilities | Bits-Survive | Buenos Aires ZK ID, ENS, Verifiable credentials |
| 7 | **Governance & Voting** | Collective decision-making | Bits-Thrive | Estonia e-voting, DAO governance, Public goods |
| 8 | **Legal & Disputes** | Contracts, enforcement, arbitration | Bits-Survive | Smart contracts, Kleros, Compliance |
| 9 | **Knowledge & Education** | Learning, credentials, research | Bits-Thrive | DeSci, Academic credentials, Prediction markets |
| 10 | **Media & Creative** | Art, content, attribution, royalties | Bits-Thrive | Audius, Livepeer, NFTs, Creator economies |

---

### Sector Details

#### 1. Value Transfer
**Scope**: Payment systems, banking, remittances, stablecoins, monetary policy
**Market Size**: $27.6T stablecoin volume (exceeds Visa+Mastercard); $34T cross-border TAM
**Key Implementations**: JPMorgan Kinexys ($2B daily), Ripple (300+ institutions)
**Required Primitives**: EXCHANGE (Money, Payments), VERIFY (Identity)

#### 2. Asset Coordination
**Scope**: Capital markets, tokenization, real estate, securities, insurance
**Market Size**: $2.08T current RWA → $13.55T median projection by 2030
**Key Implementations**: BlackRock BUIDL ($2.9B AUM), Securitize, Georgia land registry
**Required Primitives**: VERIFY (Attestation), STORE (Real-World Data), CONNECT (Physical Binding)

#### 3. Supply Networks
**Scope**: Logistics, manufacturing, trade finance, provenance, agriculture
**Market Size**: $97.17B by 2032 (food traceability alone)
**Key Implementations**: MediLedger (24+ pharma companies), IBM Food Trust, VeChain
**Required Primitives**: STORE (Real-World Data), VERIFY (Attestation), CONNECT (Physical Binding)

#### 4. Energy Systems
**Scope**: Grid coordination, renewable certificates, carbon markets, resource management
**Market Size**: $265.58B by 2033 (71.14% CAGR)
**Key Implementations**: Power Ledger (30% renewable autonomy), KlimaDAO (17M+ tonnes CO2)
**Required Primitives**: STORE (Oracles), EXCHANGE (Markets), COORDINATE (Allocation)

#### 5. Health & Biotech
**Scope**: Medical records, clinical trials, drug supply chains, longevity research
**Market Size**: $831M (2024) → $178.91B by 2034
**Key Implementations**: Estonia KSI (national health since 2011), MediLedger pharmaceutical
**Required Primitives**: VERIFY (Confidential Computation), STORE (Encrypted), CONNECT (Identity)

#### 6. Identity & Credentials
**Scope**: Digital identity, verifiable credentials, reputation systems
**Market Size**: Foundation for multi-trillion markets (finance, healthcare, governance)
**Key Implementations**: Buenos Aires (3.6M citizens), Gitcoin Passport (2M+ users), ENS (2M+ names)
**Required Primitives**: VERIFY (Identity Proofs, Reputation), CONNECT (Identity Binding)

#### 7. Governance & Voting
**Scope**: Voting systems, public goods funding, collective coordination
**Market Size**: $170M DAO tooling → $333M by 2031; $60M+ distributed via Gitcoin
**Key Implementations**: Estonia (>50% online voting), Gitcoin, Optimism RetroPGF
**Required Primitives**: COORDINATE (Voting, Resource Allocation), VERIFY (Identity)

#### 8. Legal & Disputes
**Scope**: Smart contracts, arbitration, regulatory compliance, dispute resolution
**Market Size**: Multi-billion legal tech TAM
**Key Implementations**: Kleros, Aragon Court, Smart contract standards
**Required Primitives**: COORDINATE (Execution Control), VERIFY (Attestation)

#### 9. Knowledge & Education
**Scope**: Credential verification, research coordination (DeSci), learning markets
**Market Size**: Emerging—significant DeSci momentum
**Key Implementations**: ResearchHub, Molecule, Academic credential verification
**Required Primitives**: VERIFY (Attestation), COORDINATE (Funding), STORE (Data)

#### 10. Media & Creative
**Scope**: Digital art, content attribution, royalty distribution, creator economies
**Market Size**: ~$35B (down from $414B peak); transforming toward utility
**Key Implementations**: Audius (330K+ rights holders), Livepeer ($48M), Theta (30K+ nodes)
**Required Primitives**: VERIFY (Attribution), STORE (Content), EXCHANGE (Royalties)

---

### Sectors-to-Quadrant Mapping

```
                    SURVIVE                          THRIVE
              ┌────────────────────────────┬────────────────────────────┐
              │                            │                            │
              │  Value Transfer            │  Governance & Voting       │
    BITS      │  Identity & Credentials    │  Knowledge & Education     │
              │  Legal & Disputes          │  Media & Creative          │
              │                            │                            │
              ├────────────────────────────┼────────────────────────────┤
              │                            │                            │
              │  Energy Systems            │  Supply Networks           │
   ATOMS      │  Health & Biotech          │  Asset Coordination*       │
              │                            │                            │
              └────────────────────────────┴────────────────────────────┘

* Asset Coordination spans both quadrants (physical assets + digital coordination)
```

---

## Part IV: The Evaluation Rubric

### Overview

Projects are evaluated on two orthogonal dimensions:
1. **D/ACC Alignment Score** (0-100) — How well does this embody D/ACC principles?
2. **Market Opportunity Score** (0-100) — What is the size and timing of the opportunity?

The combined score informs investment tier placement.

---

### Dimension 1: D/ACC Alignment Score (0-100)

Four criteria, each scored 0-25:

#### Criterion 1: DEFENSIVE (0-25)

*Does this shift the offense/defense balance toward protection?*

| Score | Description | Indicators |
|-------|-------------|------------|
| 0-5 | **Offensive** | Creates new attack surfaces; enables cheaper harm than protection |
| 6-10 | **Neutral** | Equally useful for offense and defense |
| 11-15 | **Mildly Defensive** | Some defensive properties but significant offensive potential |
| 16-20 | **Defensive** | Clear defensive advantage; harder to misuse than use properly |
| 21-25 | **Strongly Defensive** | Fundamentally defensive by design; offense difficult/impossible |

**Red Flags**: Surveillance infrastructure, weaponizable autonomy, centralized data collection
**Green Flags**: ZK proofs (verify without expose), Social recovery (protect against loss), Air filtering (pure defense)

---

#### Criterion 2: DECENTRALIZED (0-25)

*Can this operate without requiring trust in centralized actors?*

| Score | Description | Indicators |
|-------|-------------|------------|
| 0-5 | **Fully Centralized** | Single point of control; requires trusting operator |
| 6-10 | **Federation** | Multiple parties but identifiable, coordinated set |
| 11-15 | **Distributed** | Many operators but some concentration or privileged roles |
| 16-20 | **Decentralized** | No single point of failure; permissionless participation |
| 21-25 | **Maximally Decentralized** | Credibly neutral; resistant to capture; geographic distribution |

**Red Flags**: Upgrade keys, Admin functions, Validator concentration, Single cloud provider
**Green Flags**: 1000+ validators, Permissionless participation, Multiple client implementations, Geographic distribution

---

#### Criterion 3: DEMOCRATIC (0-25)

*Does this enable broader participation and resist capture?*

| Score | Description | Indicators |
|-------|-------------|------------|
| 0-5 | **Plutocratic** | Wealth equals power; small groups dominate |
| 6-10 | **Oligarchic** | Some participation but concentrated influence |
| 11-15 | **Representative** | Delegation mechanisms but potential for capture |
| 16-20 | **Participatory** | Meaningful participation available to most |
| 21-25 | **Deeply Democratic** | Equal voice mechanisms; resistant to capture; inclusive |

**Red Flags**: Token-weighted voting with whale concentration, Closed governance councils, High participation barriers
**Green Flags**: Quadratic voting, 1-person-1-vote with Sybil resistance, Low barriers to participation, Cross-partisan consensus mechanisms

---

#### Criterion 4: DIFFERENTIAL (0-25)

*Does defense grow faster than offense over time?*

| Score | Description | Indicators |
|-------|-------------|------------|
| 0-5 | **Arms Race** | Improvements equally benefit attack and defense |
| 6-10 | **Slight Defense Edge** | Defense benefits marginally more from improvements |
| 11-15 | **Moderate Differential** | Clear pathway where defense compounds faster |
| 16-20 | **Strong Differential** | Defense scales superlinearly vs. offense |
| 21-25 | **Asymmetric** | Fundamentally asymmetric in defense's favor |

**Red Flags**: General-purpose dual-use (drones), Offense benefits more from Moore's Law
**Green Flags**: Far-UVC (kills all pathogens universally), Network effects favor defense, Verification cheaper than deception

---

### Dimension 2: Market Opportunity Score (0-100)

Four criteria, each scored 0-25:

#### Criterion 1: MARKET SIZE (0-25)

| Score | TAM Range | Description |
|-------|-----------|-------------|
| 0-5 | <$100M | Niche market |
| 6-10 | $100M-$1B | Emerging market |
| 11-15 | $1B-$10B | Significant market |
| 16-20 | $10B-$100B | Large market |
| 21-25 | >$100B | Massive market |

---

#### Criterion 2: GROWTH TRAJECTORY (0-25)

| Score | CAGR Range | Description |
|-------|------------|-------------|
| 0-5 | Negative/Flat | Declining or stagnant |
| 6-10 | 0-10% | Slow growth |
| 11-15 | 10-25% | Moderate growth |
| 16-20 | 25-50% | Strong growth |
| 21-25 | >50% | Explosive growth |

---

#### Criterion 3: TIMING (0-25)

| Score | Timeline | Description |
|-------|----------|-------------|
| 0-5 | 10+ years | Too early; technology not ready |
| 6-10 | 5-10 years | Early; requires significant development |
| 11-15 | 3-5 years | Emerging; pilots converting to production |
| 16-20 | 1-3 years | Imminent; clear adoption curve |
| 21-25 | Now | Already deployed; proven demand |

---

#### Criterion 4: COMPETITIVE POSITION (0-25)

| Score | Position | Description |
|-------|----------|-------------|
| 0-5 | Crowded/Commoditized | Many competitors, no differentiation |
| 6-10 | Competitive | Several strong players |
| 11-15 | Differentiated | Clear advantages in specific dimensions |
| 16-20 | Category Leader | Dominant position or strong network effects |
| 21-25 | Monopoly/Infrastructure | Essential infrastructure; winner-take-most |

---

### Combined Scoring Matrix

```
                         MARKET OPPORTUNITY SCORE
                    Low (0-40)    Medium (41-70)   High (71-100)
                 ┌──────────────┬───────────────┬───────────────┐
        High     │              │               │               │
       (71-100)  │   TIER 2     │    TIER 1     │    TIER 1     │
                 │   (Monitor)  │   (Core)      │   (Core+)     │
    D/ACC        ├──────────────┼───────────────┼───────────────┤
   ALIGNMENT     │              │               │               │
       Medium    │   TIER 3     │    TIER 2     │    TIER 2     │
       (41-70)   │   (Selective)│   (Growth)    │   (Growth)    │
                 ├──────────────┼───────────────┼───────────────┤
        Low      │              │               │               │
        (0-40)   │   EXCLUDE    │    TIER 3     │    TIER 3     │
                 │              │   (Selective) │   (Speculative)|
                 └──────────────┴───────────────┴───────────────┘
```

---

### Investment Tier Definitions

| Tier | D/ACC Score | Market Score | Position Sizing | Strategy |
|------|-------------|--------------|-----------------|----------|
| **Tier 1** | 71-100 | 41-100 | Core (15-25%) | Hold through volatility |
| **Tier 2** | 41-70 + High Market OR 71-100 + Low Market | Various | Growth (5-15%) | Add on validation |
| **Tier 3** | 41-70 | Various | Selective (1-5%) | Trade or selective hold |
| **Exclude** | 0-40 | 0-40 | None | Do not invest |

---

## Part V: Applying the Framework

### Project Evaluation Template

For each project, complete:

```
PROJECT: [Name]
─────────────────────────────────────────────────────

CLASSIFICATION
├── Primary Primitive Function: [COMPUTE/COORDINATE/EXCHANGE/VERIFY/STORE/CONNECT]
├── Subcategory: [Specific subcategory]
├── Primary Sector: [One of 10 sectors]
├── D/ACC Quadrant: [Atoms/Bits × Survive/Thrive]
└── Tags: [Privacy, Security, Scalability, etc.]

D/ACC ALIGNMENT SCORE
├── Defensive:    __/25  Rationale: ________________
├── Decentralized: __/25  Rationale: ________________
├── Democratic:   __/25  Rationale: ________________
├── Differential: __/25  Rationale: ________________
└── TOTAL:        __/100

MARKET OPPORTUNITY SCORE
├── Market Size:   __/25  TAM: $____
├── Growth:        __/25  CAGR: ____%
├── Timing:        __/25  Stage: ________________
├── Competition:   __/25  Position: ________________
└── TOTAL:         __/100

COMBINED ASSESSMENT
├── Investment Tier: [1/2/3/Exclude]
├── Conviction Level: [High/Medium/Low]
└── Key Risks: ________________
```

---

### Example Evaluation: Zama (FHE)

```
PROJECT: Zama
─────────────────────────────────────────────────────

CLASSIFICATION
├── Primary Primitive Function: VERIFY
├── Subcategory: Confidential Computation
├── Primary Sector: Health & Biotech (also: Value Transfer, Identity)
├── D/ACC Quadrant: Bits-Survive
└── Tags: Privacy, FHE, Encryption

D/ACC ALIGNMENT SCORE
├── Defensive:     23/25  FHE prevents data access even during computation
├── Decentralized: 18/25  Open-source but Zama has implementation lead
├── Democratic:    20/25  Enables private participation in systems
├── Differential:  22/25  Defense scales with compute; offense gains nothing
└── TOTAL:         83/100

MARKET OPPORTUNITY SCORE
├── Market Size:   20/25  Multi-trillion (healthcare, finance, AI)
├── Growth:        22/25  Nascent but 50%+ growth projected
├── Timing:        12/25  3-5 years (20 TPS → 1000 TPS ASIC roadmap)
├── Competition:   20/25  Only FHE unicorn; first-mover advantage
└── TOTAL:         74/100

COMBINED ASSESSMENT
├── Investment Tier: TIER 1
├── Conviction Level: High
└── Key Risks: ASIC development timeline; 50x performance improvement required
```

---

### Example Evaluation: Chainlink (Oracles)

```
PROJECT: Chainlink
─────────────────────────────────────────────────────

CLASSIFICATION
├── Primary Primitive Function: STORE
├── Subcategory: Real-World Data
├── Primary Sector: Asset Coordination (also: Supply Networks, Insurance)
├── D/ACC Quadrant: Bits-Survive / Atoms-Thrive
└── Tags: Oracles, Data, Infrastructure

D/ACC ALIGNMENT SCORE
├── Defensive:     15/25  Enables verified data but centralization risk
├── Decentralized: 12/25  46-58% market share; validator concentration
├── Democratic:    14/25  Permissionless use but not governance
├── Differential:  15/25  Defense and offense benefit similarly
└── TOTAL:         56/100

MARKET OPPORTUNITY SCORE
├── Market Size:   22/25  $20-39B TVS secured; all sectors need oracles
├── Growth:        18/25  Mature but growing with RWA adoption
├── Timing:        23/25  Already deployed; proven demand
├── Competition:   15/25  Dominant but facing Pyth (46x growth), Chronicle
└── TOTAL:         78/100

COMBINED ASSESSMENT
├── Investment Tier: TIER 2 (High market, medium D/ACC)
├── Conviction Level: Medium
└── Key Risks: Market share erosion; concentration concerns
```

---

## Part VI: Framework Implementation Checklist

### Immediate Actions

- [ ] Update vault structure to reflect new primitive taxonomy (6 functions)
- [ ] Update vault structure to reflect new sector taxonomy (10 domains)
- [ ] Add quadrant classification to all existing entries
- [ ] Create evaluation templates for all Tier 1 and Tier 2 projects
- [ ] Build scoring spreadsheet/database with rubric

### Knowledge Base Updates

- [ ] Create MOC files for each of the 6 primitive functions
- [ ] Create MOC files for each of the 10 sector domains
- [ ] Add D/ACC Quadrant property to all project/primitive pages
- [ ] Update wiki links to reflect new taxonomy
- [ ] Archive old taxonomy files (don't delete—preserve lineage)

### Validation Process

- [ ] Have 2+ evaluators score each project independently
- [ ] Average scores to reduce individual bias
- [ ] Document rationale for each score
- [ ] Review quarterly for trajectory changes

---

## Appendices

### Appendix A: Migration from v1.0 to v2.0

| Old Category | New Function | Notes |
|--------------|--------------|-------|
| Infrastructure > Consensus | COMPUTE > Consensus | Direct |
| Infrastructure > Data Availability | COMPUTE > Scaling | DA is compute infra |
| Infrastructure > Settlement | COMPUTE > Settlement | Direct |
| Infrastructure > Execution | COMPUTE > Execution | Direct |
| Financial > Stablecoins | EXCHANGE > Money | Direct |
| Financial > Lending | EXCHANGE > Credit | Direct |
| Financial > Perpetual DEXs | EXCHANGE > Derivatives | Direct |
| Financial > AMMs | EXCHANGE > Spot Markets | Direct |
| Identity > DID | VERIFY > Identity Proofs | Identity is verification |
| Identity > Reputation | VERIFY > Reputation Proofs | Direct |
| Identity > ZK Identity | VERIFY > Identity Proofs | ZK is technique |
| Identity > Attestation | VERIFY > Attestation | Direct |
| Privacy > ZK Proofs | VERIFY > Computation Proofs | ZK is verification |
| Privacy > FHE | VERIFY > Confidential Computation | Direct |
| Privacy > MPC | VERIFY or STORE | Context-dependent |
| Governance > Voting | COORDINATE > Voting | Direct |
| Governance > Treasury | COORDINATE > Treasury | Direct |
| Coordination > Multisig | COORDINATE > Execution Control | Direct |
| Coordination > Quadratic Funding | COORDINATE > Resource Allocation | Direct |
| Coordination > Impact Certificates | COORDINATE > Resource Allocation | Direct |
| Interoperability > Bridges | CONNECT > Cross-Chain | Direct |
| Interoperability > Intents | CONNECT > Intent Resolution | Direct |
| Data/Storage > Decentralized Storage | STORE > Blob Storage | Direct |
| Data/Storage > Oracles | STORE > Real-World Data | Direct |
| Data/Storage > Indexing | STORE > Structured Data | Direct |
| Security > Key Management | CONNECT > Key Infrastructure | Keys connect humans |
| Security > Audits | VERIFY > Audit | Audits verify |
| Scalability > Rollups | COMPUTE > Scaling | Direct |
| Scalability > EIP-4844 | COMPUTE > Scaling | Direct |

### Appendix B: Sector Migration

| Old Sector | New Domain | Notes |
|------------|------------|-------|
| Financial Services/Banking | Value Transfer + Asset Coordination | Split by function |
| Capital Markets/RWA | Asset Coordination | Unified |
| Real Estate | Asset Coordination | Subsumed |
| Supply Chain/Logistics | Supply Networks | Renamed |
| Energy/Carbon | Energy Systems | Renamed |
| Healthcare | Health & Biotech | Expanded |
| Insurance | Asset Coordination | Risk pooling = asset coordination |
| Governance/E-Voting | Governance & Voting | Merged |
| Public Goods/Social | Governance & Voting | Merged |
| Art/Media | Media & Creative | Renamed |
| (NEW) | Identity & Credentials | Added |
| (NEW) | Legal & Disputes | Added |
| (NEW) | Knowledge & Education | Added |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 15, 2026 | Initial framework |
| 2.0 | Jan 22, 2026 | Complete restructure: Quadrant framework, MECE taxonomy, Comprehensive rubric |

---

*Framework developed by the D/ACC Research Team*
*Contact: benjamin@opencivics.co*
