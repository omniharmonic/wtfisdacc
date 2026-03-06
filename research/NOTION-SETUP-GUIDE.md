# D/ACC Research Portal - Notion Setup Guide

## Quick Start

This guide will help you set up 6 interconnected databases in Notion to create a comprehensive d/acc investment research portal. The databases are pre-populated with content from your research documents.

---

## Step 1: Create the Databases

Create each database as a **Full Page Database** in your Notion workspace under the d/acc research portal page.

### Database Creation Order (Important!)

1. **Defense Categories** (create first - foundation)
2. **Primitives** (core taxonomy)
3. **Projects** (specific protocols)
4. **Sectors** (economic applications)
5. **Investment Thesis** (synthesis)
6. **Market Data** (metrics)

---

## Step 2: Import CSV Files

For each database:
1. Create a new full-page database
2. Click "..." menu → "Import" → "CSV"
3. Select the corresponding CSV file from `csv-imports/` folder
4. Map columns to properties as shown below

---

## Database 1: Defense Categories

### Properties to Configure

| Property Name | Type | Notes |
|---------------|------|-------|
| Name | Title | Auto-created |
| Domain | Select | Options: Atoms-Macro, Atoms-Micro, Bits-Cyber, Bits-Info |
| Description | Text | Long text |
| Key Technologies | Multi-select | Create tags as needed |
| D/acc Alignment | Select | Options: 5, 4, 3, 2, 1 (or use stars) |
| Vitalik Quote | Text | Quoted text |
| Related Primitives | Relation | Link to Primitives database (create after) |
| Related Projects | Relation | Link to Projects database (create after) |

### After Import, Add Relations
- Create "Related Primitives" → link to Primitives database
- Create "Related Projects" → link to Projects database

---

## Database 2: Primitives

### Properties to Configure

| Property Name | Type | Notes |
|---------------|------|-------|
| Name | Title | Auto-created |
| Category | Select | Infrastructure, Financial, Identity, Privacy, Governance, Coordination, Interoperability, Data/Storage, Security, Scalability |
| Subcategory | Select | Create as needed from CSV |
| Description | Text | Long text |
| D/acc Score | Select | 5, 4, 3, 2, 1 |
| Investment Tier | Select | Tier 1, Tier 2, Tier 3 |
| Development Stage | Select | Very Early, Early, Early Growth, Growth, Mature |
| Risk Profile | Select | Very High, High, Medium-High, Medium, Low |
| Why D/acc | Text | Explanation |
| Key Players | Multi-select | Create tags |
| Defense Category | Relation | Link to Defense Categories |
| Sectors Served | Relation | Link to Sectors (create after) |
| Related Projects | Relation | Link to Projects |
| Market Data | Relation | Link to Market Data (create after) |

### Rollup Properties to Add
- **Project Count**: Rollup from Related Projects → Count all
- **Average D/acc Score**: Rollup from Related Projects → Average D/acc Score

---

## Database 3: Projects (Protocols)

### Properties to Configure

| Property Name | Type | Notes |
|---------------|------|-------|
| Name | Title | Auto-created |
| Category | Relation | Link to Primitives |
| Sectors | Relation | Link to Sectors |
| Defense Category | Relation | Link to Defense Categories |
| Description | Text | Long text |
| Funding Raised | Text | Dollar amounts |
| TVL / Market Metrics | Text | Current metrics |
| Key Differentiator | Text | Competitive advantage |
| D/acc Score | Select | 5, 4, 3, 2, 1 |
| Investment Tier | Select | Tier 1, Tier 2, Tier 3 |
| Stage | Select | Mainnet, Testnet, Development |
| Token | Checkbox | Has native token |
| Token Symbol | Text | If applicable |
| Website | URL | Project URL |

### Add Icons
Consider adding project logos as page icons for visual distinction.

---

## Database 4: Sectors

### Properties to Configure

| Property Name | Type | Notes |
|---------------|------|-------|
| Name | Title | Auto-created |
| Description | Text | Sector overview |
| Current Market Size | Text | Current figures |
| 2030+ Projection | Text | Forward projections |
| CAGR | Text | Growth rate |
| Transformation Timeline | Select | Already Deployed, 1-2 Years, 3-5 Years, 7-10 Years |
| Key Implementations | Text | Notable deployments |
| Required Primitives | Relation | Link to Primitives |
| Regulatory Context | Multi-select | MiCA, GENIUS Act, DSCSA, etc. |
| Key Institutional Players | Multi-select | Create tags |
| D/acc Alignment | Select | 5, 4, 3, 2, 1 |

### Rollup Properties
- **Primitive Count**: Rollup from Required Primitives → Count all
- **Project Count**: Rollup from linked Projects → Count all

---

## Database 5: Investment Thesis

### Properties to Configure

| Property Name | Type | Notes |
|---------------|------|-------|
| Name | Title | Auto-created |
| Tier | Select | Tier 1, Tier 2, Tier 3 |
| Summary | Text | One-line thesis |
| Full Description | Text | Long text |
| D/acc Alignment | Text | Why this aligns with d/acc |
| Market Opportunity | Text | Size and growth metrics |
| Key Investment Vectors | Multi-select | Specific opportunities |
| Risk Factors | Text | Main risks |
| Validation Needed | Text | Hypotheses to test |
| Position Sizing | Select | Core, Growth, Speculative, Selective |
| Related Primitives | Relation | Link to Primitives |
| Related Projects | Relation | Link to Projects |

---

## Database 6: Market Data

### Properties to Configure

| Property Name | Type | Notes |
|---------------|------|-------|
| Name | Title | Metric name |
| Category | Select | Market Size, TVL, Volume, Funding, Growth Rate, Adoption |
| Current Value | Text | Current figure |
| 2030+ Projection | Text | Forward projection |
| CAGR | Text | Growth rate |
| Source | Text | Data source |
| Last Updated | Date | When data was collected |
| Related Primitive | Relation | Link to Primitives |
| Related Sector | Relation | Link to Sectors |

---

## Step 3: Configure Relations

After all databases are created, go back and link them:

### Defense Categories
- Add relation "Related Primitives" → Primitives
- Add relation "Related Projects" → Projects

### Primitives
- Add relation "Defense Category" → Defense Categories
- Add relation "Sectors Served" → Sectors
- Add relation "Related Projects" → Projects
- Add relation "Market Data" → Market Data

### Projects
- Add relation "Category" → Primitives
- Add relation "Sectors" → Sectors
- Add relation "Defense Category" → Defense Categories

### Sectors
- Add relation "Required Primitives" → Primitives

### Investment Thesis
- Add relation "Related Primitives" → Primitives
- Add relation "Related Projects" → Projects

### Market Data
- Add relation "Related Primitive" → Primitives
- Add relation "Related Sector" → Sectors

---

## Step 4: Create Views

### Recommended Views for Each Database

#### Defense Categories
1. **Grid View** (default) - All categories with properties
2. **Board by Domain** - Kanban with 4 columns (Atoms-Macro, Atoms-Micro, Bits-Cyber, Bits-Info)

#### Primitives
1. **All Primitives** - Table sorted by Category
2. **By D/acc Score** - Table filtered/sorted by D/acc Score descending
3. **By Investment Tier** - Board with 3 columns (Tier 1, Tier 2, Tier 3)
4. **By Category** - Board with 10 columns (one per category)
5. **Gallery View** - Visual cards for each primitive

#### Projects
1. **All Projects** - Table sorted by D/acc Score
2. **Tier 1 Only** - Table filtered to Tier 1
3. **By Stage** - Board (Mainnet, Testnet, Development)
4. **Has Token** - Table filtered where Token = checked
5. **Gallery by Category** - Visual cards grouped by primitive category

#### Sectors
1. **All Sectors** - Table sorted by D/acc Alignment
2. **By Timeline** - Board (Already Deployed, 1-2 Years, 3-5 Years, 7-10 Years)
3. **Gallery View** - Visual cards with market projections

#### Investment Thesis
1. **By Tier** - Board with 3 columns
2. **By Position Sizing** - Board (Core, Growth, Speculative, Selective)
3. **All Theses** - Table with full descriptions

#### Market Data
1. **All Metrics** - Table sorted by Category
2. **By Category** - Board (Market Size, TVL, Volume, Funding, Growth Rate, Adoption)
3. **Growth Opportunities** - Table filtered where CAGR is high

---

## Step 5: Create Dashboard Page

Create a new page called "D/ACC Dashboard" with linked database views:

### Suggested Layout

```
# D/ACC Research Portal Dashboard

## The Four D's Framework
[Linked view: Defense Categories - Board by Domain]

## Investment Priorities by Tier
[Linked view: Primitives - By Investment Tier (Board)]

## Top Projects (Tier 1)
[Linked view: Projects - Tier 1 Only]

## Sector Opportunities
[Linked view: Sectors - By Timeline (Board)]

## Key Market Metrics
[Linked view: Market Data - Growth Opportunities]
```

---

## Step 6: Link Entries

After importing all CSVs, manually link related entries:

### Defense Categories → Primitives
- Cyber Defense: Link to ZK Proofs, DID, Stablecoins, Rollups, etc.
- Info Defense: Link to Reputation/Sybil Resistance, Voting Mechanisms, Quadratic Funding
- Atoms-Micro: Link to any bio-related primitives (if added)
- Atoms-Macro: Link to infrastructure primitives

### Primitives → Projects
- Zero-Knowledge Proofs → zkSync, StarkNet, Scroll, Aztec
- Decentralized Identity → ENS, Polygon ID, Gitcoin Passport
- FHE → Zama
- And so on...

### Primitives → Sectors
- Identity/Attestation → Financial Services, Healthcare, Governance
- ZK Proofs → All sectors (universal privacy need)
- Oracles → Insurance, Supply Chain, DeFi

### Projects → Sectors
- MediLedger → Supply Chain, Healthcare
- Safe → All sectors (custody infrastructure)
- And so on...

---

## Step 7: Add The Four D's Evaluation Template

Create a template in the Projects database for evaluating new projects:

### Four D's Checklist (add as template properties)

| Criterion | Question | Red Flag |
|-----------|----------|----------|
| Defensive | Does this shift power toward protection rather than attack? | Creates new attack surfaces |
| Decentralized | Can this operate without a single controlling entity? | Requires trust in "good guys" staying good |
| Democratic | Does this enable broader participation in decisions? | Concentrates capability in small groups |
| Differential | Does this accelerate defense faster than offense? | Equally useful for harmful applications |

---

## Maintenance

### Weekly Tasks
- Update Market Data with new figures
- Add new Projects as discovered
- Update Project stages and TVL metrics

### Monthly Tasks
- Review Investment Thesis entries
- Update sector market projections
- Add new primitives if categories emerge

### Quarterly Tasks
- Validate hypotheses in Investment Thesis
- Review D/acc scores based on developments
- Update transformation timelines for sectors

---

## File Locations

All CSV files are located in:
```
/d:acc category research/csv-imports/
├── defense-categories.csv
├── primitives.csv
├── projects.csv
├── sectors.csv
├── investment-thesis.csv
└── market-data.csv
```

Full schema documentation:
```
/d:acc category research/notion-database-schema.md
```

---

## Questions?

If you need help with specific configurations or want to add additional dimensions, the schema document contains the full framework with all relationships mapped out.
