# AMMs (Automated Market Makers)

**Category**: Financial > DEX
**D/ACC Score**: 3 | **Investment Tier**: [[Tier 3 - Selective Conviction]]
**Development Stage**: Mature | **Risk Profile**: Medium
**Defense Category**: [[Cyber Defense]]

## Overview

Automated market makers enabling trustless token exchange without orderbooks. [[Uniswap]] V3 achieves up to 4000x capital efficiency vs V2 through concentrated liquidity.

## Why D/ACC Aligned

Removes reliance on centralized order books. Anyone can provide liquidity and trade without permission. Intent-based systems (CoW Protocol) redirect MEV to users.

## Key Implementations

| Protocol | Differentiator | Volume |
|----------|----------------|--------|
| [[Uniswap]] V3 | 4000x capital efficiency | $1.8T+ cumulative |
| [[Curve]] | StableSwap for pegged assets | $1.5B+ TVL |
| [[CoW Protocol]] | 63% intent trading, MEV protection | $2.4B monthly |

## D/ACC Considerations

Score of 3 because:
- Critical infrastructure but concentration in implementations
- MEV extraction creates value leakage to sophisticated actors
- Still dependent on centralized sequencers (for L2 deployments)

## Temporal Dynamics

**[[MEV Democratization]]**
- MEV extraction increasingly captured by sophisticated actors
- Some protocols returning value to users
- Phase transition: Encrypted mempool adoption reaching majority

## Adversarial Scenarios

- [[Smart Contract Bug Exploitation]] - Curve pool exploit
- MEV sandwich attacks

## Related Primitives

- [[Intent-Based Systems]]
- [[Stablecoins]]
- [[Rollups]]

## Related Sectors

- [[Financial Services and Banking]]
