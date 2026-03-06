# D/ACC Categories — Empirical Alignment

*Reconciling our framework with categories emerging from the d/acc community*

---

## The Empirical Categories

Based on research from d/acc events (Devcon Bangkok Discovery Day, SHIFT Grants, ETH SF workshops, and Vitalik's writings), the community has converged on **seven primary technology domains**:

| # | Empirical Category | Vitalik's Framing | Quadrant |
|---|-------------------|-------------------|----------|
| 1 | **Biosecurity & Biodefense** | "Micro Physical Defense" | Atoms-Survive |
| 2 | **Infrastructure & Physical Resilience** | "Macro Physical Defense" | Atoms-Survive/Thrive |
| 3 | **Cyber Defense & Cryptography** | "Cyber Defense" | Bits-Survive |
| 4 | **Information Resilience & Epistemics** | "Info Defense" | Bits-Survive/Thrive |
| 5 | **Social Technology** | Democratic coordination | Bits-Thrive |
| 6 | **NeuroTech & Longevity** | Human enhancement | Atoms-Thrive |
| 7 | **Decentralized AI** | AI safety through decentralization | Bits-Survive/Thrive |

---

## Mapping to Our Primitive Functions

Our six primitive functions (COMPUTE, COORDINATE, EXCHANGE, VERIFY, STORE, CONNECT) are **implementation layers** that cut across all seven empirical domains. Here's how they relate:

```
EMPIRICAL DOMAINS (What we're defending/building)
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  Biosecurity  │  Physical   │   Cyber    │   Info    │  Social  │ AI │
│  & Biodefense │  Resilience │  Defense   │ Resilience│   Tech   │    │
│               │             │            │           │          │    │
└────────────────────────────────────────────────────────────────────────┘
                              ↓ enabled by ↓
┌────────────────────────────────────────────────────────────────────────┐
│              PRIMITIVE FUNCTIONS (How we build them)                   │
│                                                                        │
│    COMPUTE  │  COORDINATE  │  EXCHANGE  │  VERIFY  │  STORE  │ CONNECT│
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Category 1: Biosecurity & Biodefense

*"Creating public health infrastructure woven into the fabric of civilization without requiring social compulsion."* — Vitalik

### Subcategories & Real Projects

#### 1.1 Airborne Pathogen Defense
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Far-UVC Research (UMD PHAB Lab)** | Germicidal UV light to eliminate pathogens | Research | $9.4M Balvi grant |
| **Air Support Project** | Open-source fan-and-filter air purifiers | Prototype | Balvi grant |
| **Pocket Air Testers** | Wearable virus detection via software updates | Development | — |

#### 1.2 Open Source Vaccines
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **RaDVaC** | Rapid Deployment Vaccine Collaborative; open-source vaccine designs | Active | $2.5M Balvi |
| **Verifiable Vaccines** | On-chain verification of vaccine provenance | Concept | — |

#### 1.3 Epidemic Detection & Surveillance
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Wastewater Surveillance** | Decentralized pathogen monitoring | Deployed | Various |
| **Open Source Pathogen Detection** | Real-time airborne detection (Tom Cirrito's work) | Development | — |

#### 1.4 Medical Imaging & Diagnostics
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **OpenWater** | Wearable MRI-quality imaging ($54M raised); 1000x cheaper than MRI | Production 2025 | $54M |
| **Open Source Medical Devices** | Mary Lou Jepsen's "Silicon Hospital" | Development | — |

### Key Speakers (d/acc events)
- **Amy Proal** — Chronic disease and aging research
- **Tom Cirrito** — Airborne pathogen detection
- **Soham Sankaran** — Verifiable vaccines via auditable OS
- **Rohan Dixit** — D/ACC model for funding unloved diseases
- **Mary Lou Jepsen** — OpenWater medical imaging
- **Aaron Collins** — Healthy indoor air via OS tools

---

## Category 2: Infrastructure & Physical Resilience

*"Technologies that help people survive and live comfortable lives independently or semi-independently of long international supply chains."* — Vitalik

### Subcategories & Real Projects

#### 2.1 Decentralized Connectivity
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Starlink** | Satellite internet resistant to terrestrial disruption | Deployed | SpaceX |
| **Helium** | Decentralized wireless network | Deployed | $365M+ |
| **Althea** | Mesh networking incentive layer | Active | — |

#### 2.2 Independent Energy
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Home Solar + Storage** | Residential energy independence | Deployed | Various |
| **Power Ledger** | P2P energy trading (30% renewable autonomy) | Deployed | $34M |
| **KlimaDAO** | Carbon market coordination (17M+ tonnes) | Active | — |

#### 2.3 Resilient Manufacturing
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Distributed 3D Printing** | Local manufacturing capability | Emerging | — |
| **Open Source Hardware** | RISC-V, OpenBCI, etc. | Active | Various |

#### 2.4 Space Technology
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Multi-planetary Civilization** | Backup for civilization | Long-term | SpaceX, others |

### Key Speakers (d/acc events)
- **Louis Goessling** — Scaling clean air infrastructure
- **Isla Munro** — Pop-ups and d/acc community building

---

## Category 3: Cyber Defense & Cryptography

*"Blockchains let us create economic and social structures with a 'shared hard drive' without having to depend on centralized actors."* — Vitalik

### Subcategories & Real Projects

#### 3.1 Zero-Knowledge Proofs
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **zkSync** | zkEVM rollup | Mainnet | $458M |
| **StarkNet** | STARK-based L2 | Mainnet | $282M |
| **Scroll** | zkEVM | Mainnet | $80M |
| **Aztec** | Private smart contracts | Development | $119M |
| **Semaphore** | Anonymous signaling | Active | Ethereum Foundation |

#### 3.2 Fully Homomorphic Encryption (FHE)
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Zama** | FHE smart contracts (only FHE unicorn) | Development | $130M |
| **Sunscreen** | FHE compiler | Development | — |
| **Inco** | FHE infrastructure | Development | — |

#### 3.3 Multi-Party Computation (MPC)
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Lit Protocol** | Programmable MPC | Active | $13M |
| **Partisia Blockchain** | MPC-native chain | Mainnet | — |
| **TACEO** | MPC infrastructure | Development | — |

#### 3.4 Secure Hardware & Operating Systems
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **GrapheneOS** | Hardened mobile OS | Deployed | Donations |
| **Qubes OS** | Security through compartmentalization | Deployed | Open source |
| **OS Silicon** | Open-source chip tapeout (Tim Ansell/Mithro) | Development | — |
| **Verifiable Cryptographic Hardware** | Michael Gao's work | Research | — |

#### 3.5 Cryptographic Provenance
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **zkEmail** | Email verification without revealing content | Active | ENS grants |
| **Proteus** | AI image provenance via perceptual hashing | Development | — |
| **Holonym** | Privacy-preserving identity (Zeronym, Silk wallet) | Active | — |

### Key Speakers (d/acc events)
- **Aayush Gupta** — zkEmail and Proteus
- **Michael Gao** — Verifiable cryptographic hardware
- **Tim Ansell (Mithro)** — OS Silicon chip tapeout
- **Vivek** — Cryptography for human connection
- **Wei Dai** — Programmable cryptography

---

## Category 4: Information Resilience & Epistemics

*"The key criterion: avoiding pre-assumed authorities that 'know what is true and false' and enforce perspectives on everyone."* — Vitalik

### Subcategories & Real Projects

#### 4.1 Crowdsourced Fact-Checking
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Community Notes (X/Twitter)** | Crowd-sourced context; credibly neutral algorithm | Deployed | Twitter/X |
| **Fediverse Community Notes** | Extending model to decentralized social | Concept | — |

#### 4.2 Prediction Markets
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Polymarket** | Crypto prediction market; 2024 election accuracy | Deployed | $70M+ |
| **Metaculus** | Reputation-based forecasting (not market) | Deployed | $5.5M+ |
| **Augur** | Decentralized prediction market | Active | — |
| **Gnosis** | Prediction market infrastructure | Active | — |

#### 4.3 Consensus-Finding Algorithms
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Pol.is** | Surfaces consensus, hides division | Deployed | Open source |
| **vTaiwan** | National-scale deliberation (80%+ → gov action) | Deployed | Taiwan gov |

#### 4.4 Sybil Resistance & Reputation
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Gitcoin Passport** | Multi-signal identity (2M+ users) | Deployed | Gitcoin |
| **Worldcoin** | Biometric proof-of-personhood | Deployed | $240M+ |
| **BrightID** | Social graph Sybil resistance | Active | — |
| **Proof of Humanity** | Video + vouching | Active | — |

#### 4.5 Scam Detection
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Wallet-level scam detection** | Pre-transaction warnings | Active | Various |
| **Blocklist aggregators** | Community-curated threat lists | Active | — |

### Key Speakers (d/acc events)
- **Jay Baxter** — Community Notes (scaling public epistemics)
- **Deger Turan** — Metaculus (epistemic infrastructure for science)
- **Rachel Lambert** — Fediverse and community notes at hyperscale
- **Shayne Coplan** — Polymarket
- **Robin Hanson** — Prediction markets theory

---

## Category 5: Social Technology

*"Tools that help communities make high-quality decisions and maintain cohesion."* — Vitalik

### Subcategories & Real Projects

#### 5.1 Quadratic & Democratic Funding
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Gitcoin Grants** | QF distribution ($60M+ total) | Deployed | Gitcoin |
| **Allo Protocol** | Modular grants infrastructure | Active | Gitcoin |
| **Optimism RetroPGF** | Retroactive public goods ($100M+ committed) | Deployed | Optimism |
| **Hypercerts** | Tokenized impact claims (10K+ issued) | Active | — |

#### 5.2 Voting Mechanisms
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Snapshot** | Off-chain signaling | Deployed | — |
| **Tally** | On-chain governance | Deployed | $17M |
| **Conviction Voting** | Time-weighted preferences | Active | — |
| **Quadratic Voting** | Diminishing returns on influence | Active | Various |

#### 5.3 DAO Infrastructure
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Safe** | Multisig standard ($100B+ secured) | Deployed | $100M |
| **Aragon** | DAO framework | Deployed | $25M+ |
| **Colony** | DAO operating system | Active | — |

#### 5.4 Coordination Tools
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Coordinape** | Peer allocation | Active | — |
| **Collab.Land** | Token-gated communities | Active | — |

### Key Speakers (d/acc events)
- **Vitalik Buterin** — Social technology philosophy
- **Various DAO leaders** — Governance mechanisms

---

## Category 6: NeuroTech & Longevity

*"Extending human capability and lifespan through technology."*

### Subcategories & Real Projects

#### 6.1 Brain-Computer Interfaces
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **OpenBCI** | Open-source EEG/BCI platform | Deployed | Crowdfunded |
| **Kernel Flow** | Non-invasive MEG-based BCI | Development | $107M |
| **Galea** | OpenBCI's mixed reality biometrics | Beta 2024 | — |

#### 6.2 Longevity Research
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **VitaDAO** | Decentralized longevity funding (24 projects, $4.2M) | Active | $4.1M (Pfizer) |
| **Molecule** | IP-NFT platform for biotech | Active | Pfizer Ventures |
| **AthenaDAO** | Women's health research | Active | — |
| **CryoDAO** | Cryopreservation research | Active | — |

#### 6.3 Whole Brain Emulation
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Brain preservation research** | Connectomics scaling | Research | — |

#### 6.4 Medical Enhancement
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Vasocomputation** | Mike Johnson's work | Research | — |

### Key Speakers (d/acc events)
- **Juan Benet** — Neurotech as humanity's next frontier
- **Jun Axup** — Whole-brain mammalian connectomics
- **Niahm Peren** — Whole brain emulation
- **Mike Johnson** — Vasocomputation
- **Nathan Cheng** — Longevity Acceleration Roadmap
- **Amy Proal** — Viruses and chronic aging

---

## Category 7: Decentralized AI

*"Ensuring AI development benefits humanity through decentralization."*

### Subcategories & Real Projects

#### 7.1 Open Source Models
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Llama (Meta)** | Open weights models (8B-405B) | Deployed | Meta |
| **Mistral** | European open models | Deployed | $640M |
| **Nous Research** | Fine-tuned open models (Hermes) | Active | a16z |
| **DeepSeek** | Open reasoning models | Deployed | — |

#### 7.2 Decentralized Inference
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Together.ai** | Decentralized inference network | Active | $228M |
| **Ritual** | On-chain AI inference | Development | $25M |
| **Gensyn** | Distributed training | Development | $50M |
| **Bittensor** | Decentralized AI network | Active | — |

#### 7.3 AI Governance
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Anthropic Constitutional AI** | Value alignment | Deployed | — |
| **Collective Intelligence (Pol.is + AI)** | AI steering via consensus | Research | Anthropic |

#### 7.4 Personal AI
| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **Personal AI Networks** | Davide Crapis's work | Concept | — |
| **Local LLM deployment** | Ollama, llama.cpp | Deployed | Open source |

### Key Speakers (d/acc events)
- **Vincent Weissernoa** — D/ACC vision for decentralized AI
- **Nelson Rosario** — Building the open AI economy
- **Davide Crapis** — Personal AI Networks
- **Smitha Mili** — Representation in AI-facilitated public sphere
- **Emad Mostaque** — Schelling AI / Open + Decentralized AI
- **Dawn Song** — Panel: responsible decentralized AI
- **Juan Benet** — Panel: responsible decentralized AI

---

## Cross-Cutting: Robotics & Physical AI

*Emerging category spanning multiple domains*

| Project | Description | Stage | Funding |
|---------|-------------|-------|---------|
| **k-scale** | Open source humanoid robots (Jinxiang Mo) | Development | — |
| **Simula** | Open-source VR computing (George Singer) | Development | — |
| **Nanographs** | Open source electron and ion beams | Development | — |
| **Jan Liphardt's work** | AI architecture for safe, governable robots | Research | — |

---

## Reconciliation Summary

### What Changed from v2.0?

1. **Added NeuroTech & Longevity** as distinct empirical category (was implicit)
2. **Added Decentralized AI** as distinct empirical category (was spread across)
3. **Renamed "Sectors" to "Domains"** to match empirical usage
4. **Biosecurity elevated** to top-level category (not just Healthcare)
5. **Physical Resilience** made explicit (was implicit in "Infrastructure")

### Mapping: Empirical → Our Taxonomy

| Empirical Category | Primary Primitive Functions |
|-------------------|---------------------------|
| Biosecurity | VERIFY (diagnostics), STORE (data), COORDINATE (response) |
| Physical Resilience | CONNECT (networks), EXCHANGE (energy), COMPUTE (local) |
| Cyber Defense | VERIFY (proofs), COMPUTE (secure execution), CONNECT (keys) |
| Info Resilience | VERIFY (attestation), COORDINATE (consensus), STORE (truth) |
| Social Tech | COORDINATE (all), EXCHANGE (funding) |
| NeuroTech | VERIFY (brain signals), COORDINATE (research), CONNECT (BCI) |
| Decentralized AI | COMPUTE (inference), COORDINATE (governance), VERIFY (outputs) |

### The 7×6 Matrix

Each empirical domain uses multiple primitive functions:

```
              COMPUTE  COORDINATE  EXCHANGE  VERIFY  STORE  CONNECT
Biosecurity      ○         ●          ○        ●       ●       ○
Physical         ●         ○          ●        ○       ○       ●
Cyber            ●         ○          ○        ●       ○       ●
Info             ○         ●          ○        ●       ●       ○
Social           ○         ●          ●        ○       ○       ○
NeuroTech        ○         ●          ○        ●       ○       ●
AI               ●         ●          ○        ●       ○       ○

● = Primary    ○ = Secondary
```

---

## Sources

- [d/acc Discovery Day at Devcon SEA](https://notes.ethereum.org/@Rose/SyW3Wvc5C)
- [SHIFT Grants (Vitalik-funded)](https://www.edgecity.live/shift-grants)
- [d/acc: one year later](https://vitalik.eth.limo/general/2025/01/05/dacc2.html)
- [Balvi Fund](https://www.balvi.io/)
- [VitaDAO](https://www.vitadao.com/)
- [OpenWater](https://www.openwater.health/)
- [Polymarket](https://polymarket.com/)
- [Pol.is](https://pol.is/)
- Various d/acc event schedules and speaker lists
