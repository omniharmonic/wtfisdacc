# Nation-State Validator Coercion

**Adversary Type**: Nation-State
**Likelihood**: High | **Impact**: High

## Description

Government compels validators in its jurisdiction to censor transactions or implement surveillance through legal pressure, sanctions enforcement, or infrastructure seizure.

## Attack Vector

- Legal pressure on incorporated validators
- Sanctions enforcement mandates
- Infrastructure seizure threats

## Target Primitives

- [[Consensus Mechanisms]]
- [[Rollups]]
- [[Settlement Layers]]

## Historical Precedent

**OFAC Sanctions Compliance**
- 45% of Ethereum blocks became OFAC-compliant post-Tornado Cash
- Tornado Cash addresses effectively censored
- Demonstrates feasibility of validator coercion

## Degradation Mode

- Transactions from sanctioned addresses delayed or never included
- Two-tier transaction system emerges
- "Compliant" vs "non-compliant" block producers

## Defense Effectiveness

**Moderate** - Geographic distribution helps but major jurisdictions (US/EU) control significant stake.

## Mitigation Strategies

- Geographic validator distribution
- Jurisdiction-diverse validator sets
- Protocol-level censorship resistance (inclusion lists)
- Encrypted mempools

## Implications for Investment

Favor protocols with:
- Decentralized validator sets
- Geographic distribution
- Censorship resistance mechanisms

## Related Scenarios

- [[Regulatory Capture of Bridges]]
- [[Targeted Developer Persecution]]
- [[Coordinated Deplatforming]]
