# D/ACC Research Portal - Additional Databases

## Updated Architecture (11 Databases Total)

The original 6 databases capture the **positive case** for d/acc investment. These 5 additional databases capture the **critical analysis layer** - what could go wrong, what we're assuming, and what we're choosing not to invest in.

```
                         ORIGINAL FRAMEWORK
                    ┌─────────────────────────┐
                    │    Defense Categories   │
                    │    Primitives           │
                    │    Projects             │
                    │    Sectors              │
                    │    Investment Thesis    │
                    │    Market Data          │
                    └───────────┬─────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  DEPENDENCIES   │  │   ADVERSARIAL   │  │    TEMPORAL     │
│  (What can      │  │   SCENARIOS     │  │    DYNAMICS     │
│   break it)     │  │   (Who attacks) │  │  (How it       │
└────────┬────────┘  └────────┬────────┘  │   changes)      │
         │                    │           └────────┬────────┘
         └────────────────────┼────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                                       │
          ▼                                       ▼
┌─────────────────┐                    ┌─────────────────┐
│ COUNTERFACTUALS │                    │   VALIDATION    │
│ (What if we     │                    │   EVIDENCE      │
│  don't invest)  │                    │ (What we know)  │
└─────────────────┘                    └─────────────────┘
```

---

## DATABASE 7: Dependencies

**Purpose**: Maps what each primitive/project depends on to function - the d/acc alignment of a system is limited by its least d/acc-aligned dependency

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Dependency name |
| Dependency Type | Select | Infrastructure, Economic, Technical, Regulatory, Governance |
| Description | Text | What this dependency is |
| Provider/Bottleneck | Text | Who controls it |
| Centralization Risk | Select | Critical, High, Medium, Low |
| Alternatives Exist | Checkbox | Are there alternatives? |
| Failure Scenario | Text | What happens if this fails |
| Affected Primitives | Relation → Primitives | Which primitives depend on this |
| Mitigation Strategies | Text | How to reduce this risk |

### Key Insights from Data

The most critical dependencies (Centralization Risk = Critical):
- **Semiconductor Supply Chain**: TSMC/Samsung control all advanced chip production
- **Stablecoin Banking**: Circle's banking relationships are concentrated
- **Sequencer Centralization**: Every major L2 runs a single centralized sequencer
- **Bridge Validator Sets**: Small multisigs secure billions

### CSV Import
File: `csv-imports/dependencies.csv` (15 entries)

---

## DATABASE 8: Adversarial Scenarios

**Purpose**: Models who attacks each primitive, how, and what happens - d/acc is about offense/defense balance, which requires understanding offense

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Scenario name |
| Adversary Type | Select | Nation-State, Corporate, Criminal, Market, Regulatory, Technical |
| Description | Text | What the attack is |
| Attack Vector | Text | How the attack works |
| Target Primitives | Relation → Primitives | What's being attacked |
| Historical Precedent | Text | Has this happened before? |
| Degradation Mode | Text | What happens if attack succeeds partially |
| Defense Effectiveness Under Attack | Text | How well does defense hold |
| Likelihood | Select | High, Medium, Low |
| Impact | Select | Catastrophic, Critical, High, Medium, Low |

### Key Insights from Data

Highest likelihood + highest impact scenarios:
- **Governance Capture via Token Accumulation**: High likelihood, High impact
- **Smart Contract Bug Exploitation**: High likelihood, High impact
- **Sybil Attack on Identity Systems**: High likelihood, Medium impact
- **Nation-State Validator Coercion**: High likelihood, High impact

Low likelihood but catastrophic:
- **Zero-Day in Cryptographic Primitive**: Would break everything simultaneously
- **Quantum Computing Breakthrough**: All current cryptography vulnerable

### CSV Import
File: `csv-imports/adversarial-scenarios.csv` (15 entries)

---

## DATABASE 9: Temporal Dynamics

**Purpose**: Tracks how d/acc alignment changes over time - decentralization isn't static, it's a trajectory that can flip

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Dynamic name |
| Primitive/Project | Relation → Primitives or Projects | What's changing |
| Dynamic Type | Select | Centralization Spiral, Winner-Take-Most, Decentralization Opportunity, Promised Decentralization, Regulatory Capture, Participation Decay, Attack/Defense Cycle, Market Cycle, Infrastructure Transition, Standards War, Existential Threat |
| Description | Text | What's happening |
| Current Phase | Text | Where we are now |
| Trajectory | Select | Improving, Stable, Worsening, Uncertain |
| Phase Transition Triggers | Text | What would cause a phase change |
| Early Warning Signs | Text | What to watch for |
| Historical Pattern | Text | Has this happened before in similar systems |
| Intervention Points | Text | Where investment could change trajectory |

### Key Insights from Data

**Worsening trajectories** (prioritize intervention or avoidance):
- Liquid Staking Centralization (Lido approaching thresholds)
- Stablecoin Regulatory Capture (MiCA/GENIUS Act increasing compliance)
- DAO Voter Apathy (participation declining)
- Privacy Regulatory Pressure (Tornado Cash precedent expanding)

**Improving trajectories** (potential investment opportunities):
- ZK Prover Decentralization (costs dropping, networks emerging)
- Bridge Security Evolution (ZK bridges in development)
- Account Abstraction Adoption (ERC-4337 live, growing)

**Uncertain** (watch and wait):
- L2 Sequencer Roadmaps (promises but no delivery)
- MEV Democratization (progress but builders still concentrated)
- Identity Standards Fragmentation (could consolidate or fragment further)

### CSV Import
File: `csv-imports/temporal-dynamics.csv` (14 entries)

---

## DATABASE 10: Counterfactual Analysis

**Purpose**: Answers "what if we don't invest?" - the relevant comparison isn't to an ideal, it's to what would exist otherwise

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Analysis name |
| Primitive/Category | Relation → Primitives | What we're analyzing |
| Counterfactual Question | Text | The question being asked |
| If We Don't Invest | Text | What happens without d/acc capital |
| What Fills The Vacuum | Text | Who/what takes over |
| Vacuum D/acc Score | Select | 1-5 (how d/acc-aligned is the alternative) |
| Net D/acc Impact of Inaction | Select | Strongly Negative, Moderately Negative, Mildly Negative, Neutral, Positive |
| Strategic Implication | Text | What this means for investment |
| Related Investment Thesis | Relation → Investment Thesis | Links to thesis |

### Key Insights from Data

**Highest urgency** (Vacuum D/acc Score = 1, Strongly Negative impact):
- **ZK Identity Vacuum**: Without ZK identity, privacy and compliance become mutually exclusive; vacuum filled by KYC everywhere
- **Decentralized Identity Vacuum**: Vacuum filled by government digital ID and Big Tech identity providers
- **Decentralized Stablecoin Vacuum**: Vacuum filled by CBDCs and fully surveilled payment rails

**Lower urgency** (alternatives aren't terrible):
- **Oracle Decentralization Vacuum**: Chainlink isn't actively captured; concentration risk but not existential
- **Quadratic Funding Vacuum**: Traditional grants work reasonably well
- **DAO Tooling Vacuum**: Centralized governance is functional

### CSV Import
File: `csv-imports/counterfactuals.csv` (15 entries)

---

## DATABASE 11: Validation Evidence

**Purpose**: Tracks what we actually know vs. what we're assuming - investment decisions should weight validated claims differently from speculative ones

### Properties

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Claim name |
| Claim Type | Select | Technical Performance, Market Adoption, Market Projection, Mechanism Effectiveness, Market Structure, Market Size, Value Proposition, Model Validity, Protocol Metrics, Governance Adoption, Real World Adoption, Adoption Metrics |
| Claim | Text | The specific claim |
| Source | Text | Where this claim comes from |
| Evidence Status | Select | Validated - Observable, Validated - Government Record, Validated - Regulatory Record, Partially Validated, Weakly Validated - Vendor Claims, Unvalidated - Projection, Unvalidated - Needs Testing |
| Supporting Evidence | Text | Evidence for the claim |
| Contradicting Evidence | Text | Evidence against the claim |
| What Would Disprove | Text | Falsifiability criterion |
| Confidence Level | Select | High, Medium, Low, Speculative |
| Implications If Wrong | Text | What changes if this is false |
| Last Verified | Date | When this was last checked |

### Key Insights from Data

**High confidence, validated claims** (safe to rely on):
- Chainlink 46-58% market share (directly measurable)
- $34B DAO treasury holdings (on-chain verifiable)
- Perp DEX 872% YoY growth (on-chain verifiable)
- MediLedger DSCSA compliance (regulatory record)
- Estonia 50%+ online voting (government record)

**Low confidence, speculative claims** (be careful):
- FHE 1,000 TPS target (unvalidated projection, no working ASIC)
- RWA $13.55T by 2030 (wide range indicates uncertainty)
- QV improves participation (hypothesis not systematically tested)
- Sequencer decentralization timelines (promises, not delivery)

**Medium confidence, partially validated** (monitor closely):
- ZK enterprise adoption (pilots real, conversion uncertain)
- Buenos Aires identity replicability (single case study)
- 80% compliance cost reduction (vendor claims, not independently verified)

### CSV Import
File: `csv-imports/validation-evidence.csv` (16 entries)

---

## Cross-Linking These Databases

### New Relations to Add

**Dependencies → Primitives**
- Each dependency entry links to affected primitives

**Adversarial Scenarios → Primitives**
- Each scenario links to target primitives

**Temporal Dynamics → Primitives/Projects**
- Each dynamic links to the primitive or project it describes

**Counterfactuals → Primitives + Investment Thesis**
- Links to both the primitive being analyzed and relevant thesis

**Validation Evidence → Investment Thesis**
- Claims support or undermine specific theses

### Recommended Views for New Databases

**Dependencies**
1. By Centralization Risk (Board: Critical, High, Medium, Low)
2. By Dependency Type (Board)
3. Critical Dependencies Only (Filtered table)

**Adversarial Scenarios**
1. Risk Matrix (Board: Likelihood × Impact)
2. By Adversary Type (Board)
3. High Likelihood (Filtered table)

**Temporal Dynamics**
1. By Trajectory (Board: Improving, Stable, Worsening, Uncertain)
2. Worsening Only (Filtered table - intervention priorities)
3. By Dynamic Type (Board)

**Counterfactuals**
1. By Net Impact (Board: Strongly Negative → Positive)
2. High Urgency (Filtered: Vacuum D/acc Score ≤ 2)
3. By Related Thesis (Grouped table)

**Validation Evidence**
1. By Confidence Level (Board)
2. By Evidence Status (Board)
3. Low Confidence Claims (Filtered - things to investigate)
4. Recently Verified (Sorted by Last Verified)

---

## Updated Dashboard Layout

Add a new section to the dashboard:

```
# D/ACC Research Portal Dashboard

[... existing sections ...]

---

## Critical Analysis Layer

### Highest Risk Dependencies
[Linked view: Dependencies - Centralization Risk = Critical]

### Active Threats
[Linked view: Adversarial Scenarios - Likelihood = High]

### Worsening Trajectories (Intervention Needed)
[Linked view: Temporal Dynamics - Trajectory = Worsening]

### Investment Urgency
[Linked view: Counterfactuals - Net Impact = Strongly Negative]

### Claims Needing Validation
[Linked view: Validation Evidence - Confidence = Low]
```

---

## Integration with Original Framework

These databases change how you use the original databases:

1. **Before investing in a Primitive**: Check Dependencies for critical vulnerabilities
2. **Before investing in a Project**: Check Adversarial Scenarios for relevant threats
3. **When evaluating Investment Thesis**: Check Validation Evidence for claim confidence
4. **When prioritizing**: Check Counterfactuals to compare vacuum scenarios
5. **When monitoring portfolio**: Check Temporal Dynamics for trajectory changes

The original framework tells you **what to invest in**. These additions tell you **what to watch out for** and **how confident to be**.
