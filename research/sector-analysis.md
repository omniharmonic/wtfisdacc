# d/acc Sector Analysis: Carl's Market Map vs Current Database

## Key Finding: Structural Mismatch

**Problem**: The current Sectors database contains **industry verticals** (Healthcare, Financial Services, Real Estate, etc.) while Carl's Market Map uses **technology categories** organized by the d/acc 2×2 framework.

These serve different purposes and should coexist:
- **Industry Verticals** = Where d/acc technologies get applied
- **Market Categories** = The actual d/acc technology taxonomy

---

## Carl's Actual Market Categories (from v0 Market Map)

### 🟢 PHYSICAL DEFENSE (Atoms × Survive) — 12 companies

| Category | Companies | Count |
|----------|-----------|-------|
| Biodefense & Health Systems | Varro Inc., Pathoplexus, OSLUV, Openwater, MediLedger | 5 |
| Open Source Hardware & Silicon | GrapheneOS, Freedom Factory (ethOS), Nanographs, Open Silicon Initiatives | 4 |
| Resilient Manufacturing | k-scale, SalvageGarden, Simula | 3 |

### 🟡 PHYSICAL COORDINATION (Atoms × Thrive) — 13 companies

| Category | Companies | Count |
|----------|-----------|-------|
| Decentralized Energy | Power Ledger, Energy Web Foundation | 2 |
| Property Rights & Registries | Georgia Land Registry, Dubai Property Platform, Rwanda Cadastre, RealT | 4 |
| Carbon & Environmental Markets | Toucan Protocol, KlimaDAO, Verra ⚠️ | 3 |
| Civic Tech | Better.SG, Edible Garden City, Soil Social, Chiang Mai Maker Club | 4 |

### 🔵 DIGITAL DEFENSE (Bits × Survive) — 24 companies

| Category | Companies | Count |
|----------|-----------|-------|
| Zero-Knowledge Systems | Aztec Network, zkSync, StarkNet, Polygon, Scroll, Taceo | 6 |
| Privacy-Preserving Computation | Zama (FHE), ZenGo, Fireblocks | 3 |
| Decentralized Identity & Attestation | ENS, Worldcoin, Polygon ID, EAS, Gitcoin Passport, Buenos Aires QuarkID | 6 |
| Communication & Messaging | XMTP Labs, HOPR, Waku | 3 |
| Secrets-as-a-Service | Mysten Labs (Sui) | 1 |
| Formal Verification & Security | Trail of Bits, OpenZeppelin, Spearbit, Immunefi, Code4rena | 5 |

### 🔷 DIGITAL COORDINATION (Bits × Thrive) — 40 companies

| Category | Companies | Count |
|----------|-----------|-------|
| Democratic Funding Mechanisms | Gitcoin, Optimism RetroPGF, Octant, Hypercerts | 4 |
| Epistemic Infrastructure | Metaculus, Polymarket, CheckMateSG, Deepsafe | 4 |
| Governance Tooling | Safe, Argent, Aragon, Compound Governor, Metagov, FAB DAO, Tally, Snapshot | 8 |
| Decentralized Monetary Infrastructure | Circles/CirclesUBI, DAI (MakerDAO), Ethena (USDe), USDT ⚠️, USDC ⚠️ | 5 |
| Oracle Networks | Pyth, Chronicle, RedStone, Chainlink ⚠️ | 4 |
| Cross-Chain Infrastructure | LayerZero, Axelar, Wormhole, CoW Protocol, UniswapX | 5 |
| Data Availability & Storage | Celestia, EigenDA, Avail, Filecoin, Arweave, Radicle, The Graph, Subsquid | 8 |
| Streaming & Treasury | Sablier, Superfluid | 2 |

### 🌐 ECOSYSTEM CONNECTORS — 6 organizations (separate category)
Ethereum Foundation, Foresight Institute, web3privacy, Emergent Research, Plurality Institute, Open Source Observer

---

## Recommended Structure: 19 Market Categories

Based on Carl's work, here are the **authoritative d/acc market categories**:

### Physical Defense (3 categories)
1. Biodefense & Health Systems
2. Open Source Hardware & Silicon
3. Resilient Manufacturing

### Physical Coordination (4 categories)
4. Decentralized Energy
5. Property Rights & Registries
6. Carbon & Environmental Markets
7. Civic Tech

### Digital Defense (6 categories)
8. Zero-Knowledge Systems
9. Privacy-Preserving Computation
10. Decentralized Identity & Attestation
11. Communication & Messaging
12. Secrets-as-a-Service
13. Formal Verification & Security

### Digital Coordination (6 categories)
14. Democratic Funding Mechanisms
15. Epistemic Infrastructure
16. Governance Tooling
17. Decentralized Monetary Infrastructure
18. Oracle Networks
19. Cross-Chain Infrastructure
20. Data Availability & Storage
21. Streaming & Treasury

---

## Recommendation

**Option A: Replace Existing Sectors**
Replace the 10 industry-vertical sectors with Carl's 19 market categories. This aligns the database with the actual d/acc technology taxonomy.

**Option B: Add New "Market Category" Field**
Keep existing Sectors for industry mapping but add a new "Market Category" field to Projects that uses Carl's taxonomy.

**Recommended: Option A** — The existing sectors (Healthcare, Financial Services, etc.) don't map to how d/acc projects are actually organized. Carl's categories are the accurate representation.
