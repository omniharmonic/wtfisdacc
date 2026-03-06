# D/ACC Research Portal - Cross-Linking Audit

## Complete Database List (12 Databases)

| # | Database | Purpose | Entry Count |
|---|----------|---------|-------------|
| 1 | Defense Categories | Vitalik's 4 d/acc domains | 4 |
| 2 | Primitives | On-chain primitive taxonomy | 29 |
| 3 | Projects | Specific protocols | 50+ |
| 4 | Sectors | Economic application areas | 10 |
| 5 | Investment Thesis | Ranked hypotheses | 8 |
| 6 | Market Data | Quantitative metrics | 30 |
| 7 | Four D's Framework | Evaluation criteria | 4 |
| 8 | **Investment Tiers** | Tier definitions (NEW) | 3 |
| 9 | Dependencies | Vulnerability mapping | 15 |
| 10 | Adversarial Scenarios | Attack modeling | 15 |
| 11 | Temporal Dynamics | Phase transitions | 14 |
| 12 | Counterfactuals | Vacuum analysis | 15 |
| 13 | Validation Evidence | Claim verification | 16 |

---

## Master Relation Map

```
                            ┌──────────────────┐
                            │ INVESTMENT TIERS │ ← NEW: Central reference
                            │    (3 tiers)     │
                            └────────┬─────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         │                           │                           │
         ▼                           ▼                           ▼
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│   PRIMITIVES    │◄──────►│    PROJECTS     │◄──────►│ INVESTMENT      │
│                 │        │                 │        │ THESIS          │
└────────┬────────┘        └────────┬────────┘        └────────┬────────┘
         │                          │                          │
         │    ┌─────────────────────┼──────────────────────┐   │
         │    │                     │                      │   │
         ▼    ▼                     ▼                      ▼   ▼
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│    DEFENSE      │        │    SECTORS      │        │  COUNTERFACTUALS│
│   CATEGORIES    │        │                 │        │                 │
└─────────────────┘        └─────────────────┘        └─────────────────┘
         │                          │                          │
         │                          │                          │
         ▼                          ▼                          ▼
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│   ADVERSARIAL   │        │  MARKET DATA    │        │   VALIDATION    │
│   SCENARIOS     │        │                 │        │   EVIDENCE      │
└─────────────────┘        └─────────────────┘        └─────────────────┘
         │
         │
         ▼
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│  DEPENDENCIES   │        │    TEMPORAL     │        │   FOUR D'S      │
│                 │        │    DYNAMICS     │        │   FRAMEWORK     │
└─────────────────┘        └─────────────────┘        └─────────────────┘
```

---

## Relation Definitions by Database

### 1. Investment Tiers (NEW - Central Reference)

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Primitives | Primitives | One-to-Many | Which primitives are in this tier |
| Projects | Projects | One-to-Many | Which projects are in this tier |
| Investment Theses | Investment Thesis | One-to-Many | Which theses are in this tier |

**Incoming Relations:**
- Primitives → Investment Tier
- Projects → Investment Tier
- Investment Thesis → Investment Tier

---

### 2. Defense Categories

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Related Primitives | Primitives | One-to-Many | Which primitives belong to this defense domain |
| Related Projects | Projects | One-to-Many | Which projects serve this defense domain |

**Incoming Relations:**
- Primitives → Defense Category
- Projects → Defense Category
- Adversarial Scenarios → Defense Category (implicit via primitives)

---

### 3. Primitives

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Investment Tier | Investment Tiers | Many-to-One | **NEW** Which tier this belongs to |
| Defense Category | Defense Categories | Many-to-One | Which d/acc domain |
| Sectors Served | Sectors | Many-to-Many | Which economic sectors |
| Related Projects | Projects | One-to-Many | Implementing protocols |
| Market Data | Market Data | One-to-Many | Relevant metrics |

**Incoming Relations:**
- Projects → Category (Primitive)
- Sectors → Required Primitives
- Investment Thesis → Related Primitives
- Dependencies → Affected Primitives
- Adversarial Scenarios → Target Primitives
- Temporal Dynamics → Primitive/Project
- Counterfactuals → Primitive/Category
- Validation Evidence → Related Primitive (implicit)

---

### 4. Projects

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Investment Tier | Investment Tiers | Many-to-One | **NEW** Which tier this belongs to |
| Category | Primitives | Many-to-One | Primary primitive category |
| Defense Category | Defense Categories | Many-to-One | Which d/acc domain |
| Sectors | Sectors | Many-to-Many | Which sectors served |

**Incoming Relations:**
- Primitives → Related Projects
- Defense Categories → Related Projects
- Investment Thesis → Related Projects
- Temporal Dynamics → Primitive/Project

---

### 5. Investment Thesis

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Investment Tier | Investment Tiers | Many-to-One | **NEW** Which tier |
| Related Primitives | Primitives | Many-to-Many | Supporting primitives |
| Related Projects | Projects | Many-to-Many | Example implementations |

**Incoming Relations:**
- Counterfactuals → Related Investment Thesis
- Validation Evidence → Related Thesis (implicit)

---

### 6. Sectors

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Required Primitives | Primitives | Many-to-Many | Which primitives needed |

**Incoming Relations:**
- Primitives → Sectors Served
- Projects → Sectors
- Market Data → Related Sector
- Counterfactuals → Related Sector (implicit)

---

### 7. Market Data

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Related Primitive | Primitives | Many-to-One | Which primitive this measures |
| Related Sector | Sectors | Many-to-One | Which sector this measures |

**Incoming Relations:**
- Primitives → Market Data

---

### 8. Four D's Framework

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| (None - reference table) | - | - | Used for evaluation, not linked |

**Usage:** Template/checklist for evaluating new entries in Primitives and Projects

---

### 9. Dependencies

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Affected Primitives | Primitives | Many-to-Many | Which primitives depend on this |

**Incoming Relations:**
- (None - this is the vulnerability layer)

---

### 10. Adversarial Scenarios

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Target Primitives | Primitives | Many-to-Many | What's being attacked |

**Incoming Relations:**
- (None - this is the threat layer)

---

### 11. Temporal Dynamics

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Primitive/Project | Primitives OR Projects | Many-to-One | What's changing |

**Incoming Relations:**
- (None - this is the trajectory layer)

---

### 12. Counterfactuals

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Primitive/Category | Primitives | Many-to-One | What we're analyzing |
| Related Investment Thesis | Investment Thesis | Many-to-One | Which thesis this informs |

**Incoming Relations:**
- (None - this is the analysis layer)

---

### 13. Validation Evidence

**Outgoing Relations:**
| Relation | Target | Type | Purpose |
|----------|--------|------|---------|
| Related Thesis | Investment Thesis | Many-to-One | Which thesis this validates/undermines |
| Related Primitive | Primitives | Many-to-One | Which primitive this claim is about |

**Incoming Relations:**
- (None - this is the evidence layer)

---

## Tier Assignment Verification

### Tier 1 Primitives (should link to Tier 1)
- Zero-Knowledge Proofs ✓
- Decentralized Identity (DID) ✓
- Zero-Knowledge Identity ✓
- Fully Homomorphic Encryption (FHE) ✓
- Attestation Infrastructure ✓
- Reputation/Sybil Resistance ✓

### Tier 1 Projects (should link to Tier 1)
- zkSync ✓
- StarkNet ✓
- Scroll ✓
- Aztec Network ✓
- Polygon ID ✓
- Gitcoin Passport (Holonym) ✓
- Zama (fhEVM) ✓
- EAS ✓
- Semaphore ✓
- Zupass ✓
- World ID ✓

### Tier 2 Primitives (should link to Tier 2)
- Data Availability Layers ✓
- Consensus Mechanisms ✓
- Settlement Layers ✓
- Quadratic Funding ✓
- Multisig Infrastructure ✓
- Voting Mechanisms ✓
- Decentralized Storage ✓
- MPC ✓
- Rollups ✓
- Key Management ✓
- Impact Certificates ✓
- Stablecoins (decentralized only) ✓

### Tier 2 Projects (should link to Tier 2)
- Celestia ✓
- EigenDA ✓
- Avail ✓
- Safe ✓
- Optimism ✓
- Arbitrum ✓
- Allo Protocol ✓
- Hypercerts ✓
- Filecoin ✓
- Arweave ✓
- Lit Protocol ✓
- ENS ✓
- DAI ✓
- Ethena ✓
- Aave ✓
- Compound ✓
- Uniswap ✓
- Curve ✓
- Snapshot ✓

### Tier 3 Primitives (should link to Tier 3)
- Oracle Infrastructure ✓
- Cross-Chain Bridges ✓
- Intent-Based Systems ✓
- Perpetual DEXs ✓
- AMMs ✓
- Lending/Borrowing ✓
- Indexing ✓
- Treasury Management ✓
- Execution Environments ✓
- Audit Mechanisms ✓

### Tier 3 Projects (should link to Tier 3)
- Chainlink ✓
- Pyth ✓
- Chronicle ✓
- RedStone ✓
- LayerZero ✓
- Wormhole ✓
- Axelar ✓
- CoW Protocol ✓
- UniswapX ✓
- Hyperliquid ✓
- dYdX ✓
- GMX ✓
- The Graph ✓
- Subsquid ✓
- Sablier ✓
- Superfluid ✓
- Immunefi ✓
- Code4rena ✓
- Aragon ✓

---

## Notion Implementation Steps

### Step 1: Create Investment Tiers Database First
This is now a foundational database that others reference.

Properties:
| Property | Type |
|----------|------|
| Name | Title |
| Tier Level | Number (1, 2, 3) |
| Position Sizing | Select (Core, Growth, Selective/Speculative) |
| Description | Text |
| D/acc Alignment Threshold | Number |
| Market Opportunity Threshold | Text |
| Core Criteria | Text |
| Risk Tolerance | Text |
| Portfolio Allocation Guidance | Text |
| Primitives | Relation → Primitives (will be populated by reverse relation) |
| Projects | Relation → Projects (will be populated by reverse relation) |
| Investment Theses | Relation → Investment Thesis (will be populated by reverse relation) |

### Step 2: Update Primitives Database
Add/modify:
- Change "Investment Tier" from Select to **Relation → Investment Tiers**

### Step 3: Update Projects Database
Add/modify:
- Change "Investment Tier" from Select to **Relation → Investment Tiers**

### Step 4: Update Investment Thesis Database
Add/modify:
- Change "Tier" from Select to **Relation → Investment Tiers**

### Step 5: Add Relations to New Databases
- Dependencies: Add "Affected Primitives" relation
- Adversarial Scenarios: Add "Target Primitives" relation
- Temporal Dynamics: Add "Primitive/Project" relation
- Counterfactuals: Add "Primitive/Category" and "Related Investment Thesis" relations
- Validation Evidence: Add "Related Thesis" and "Related Primitive" relations

---

## Rollup Properties to Add

### Investment Tiers
- **Primitive Count**: Rollup from Primitives relation → Count
- **Project Count**: Rollup from Projects relation → Count
- **Thesis Count**: Rollup from Investment Theses relation → Count
- **Average D/acc Score**: Rollup from Primitives → Average of D/acc Score

### Primitives
- **Dependency Count**: Rollup from Dependencies (reverse lookup) → Count
- **Threat Count**: Rollup from Adversarial Scenarios (reverse lookup) → Count

### Investment Thesis
- **Evidence Count**: Rollup from Validation Evidence → Count
- **High Confidence Evidence**: Rollup from Validation Evidence → Count where Confidence = High
- **Counterfactual Urgency**: Rollup from Counterfactuals → Show Net Impact

---

## Views That Use Tier Linking

### Cross-Database Views

1. **Tier 1 Complete View**
   - Linked view of Primitives filtered by Investment Tier = Tier 1
   - Linked view of Projects filtered by Investment Tier = Tier 1
   - Linked view of Investment Thesis filtered by Tier = Tier 1

2. **Portfolio Dashboard**
   - Investment Tiers as kanban columns
   - Projects as cards within each tier
   - Rollup showing total count and aggregate metrics per tier

3. **Risk-Adjusted View**
   - Projects grouped by Tier
   - Dependencies shown as linked entries
   - Validation Evidence confidence level visible

---

## Data Integrity Checks

After importing and linking, verify:

1. [ ] Every Primitive has exactly one Investment Tier assigned
2. [ ] Every Project has exactly one Investment Tier assigned
3. [ ] Every Investment Thesis has exactly one Investment Tier assigned
4. [ ] Tier assignments match between Primitive and its Related Projects
5. [ ] Counterfactuals link to correct Investment Thesis entries
6. [ ] Validation Evidence links to claims made in Investment Thesis
7. [ ] Dependencies link to all affected Primitives (check the Affected Primitives field)
8. [ ] Adversarial Scenarios link to all relevant Target Primitives
