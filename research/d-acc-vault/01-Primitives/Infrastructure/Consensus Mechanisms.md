# Consensus Mechanisms

**Category**: Infrastructure > Consensus
**D/ACC Score**: 4 | **Investment Tier**: [[Tier 2 - Strong Conviction]]
**Development Stage**: Mature | **Risk Profile**: Medium
**Defense Category**: [[Cyber Defense]]

## Overview

Distributed agreement protocols enabling trustless coordination. Consensus mechanisms have evolved from Proof of Work (PoW) to Proof of Stake (PoS) variants, with Ethereum now having 800,000+ validators demonstrating meaningful decentralization.

## Why D/ACC Aligned

Enables trustless coordination without central authority. Validator diversity prevents capture by any single entity or government.

## Key Implementations

| Protocol | Mechanism | Notes |
|----------|-----------|-------|
| Ethereum | Gasper | 800K+ validators |
| Solana | Tower BFT | High throughput |
| Cosmos | Tendermint | Modular consensus |

## Market Context

- Ethereum has $48B+ L2 TVL secured by consensus
- Bitcoin maintains ~$25B annual security budget
- [[L1 Funding]] declined 85% in Q4 2024 (maturing market)

## Dependencies

- [[Ethereum Consensus Dependency]] - All EVM rollups depend on Ethereum's security budget
- [[Cloud Infrastructure Dependency]] - Majority of nodes run on 3 cloud providers

## Temporal Dynamics

**Dynamic**: [[Liquid Staking Centralization]]
- Lido at 28-32% stake, trending toward potential supermajority
- Network effects drive stake toward largest liquid staking providers
- Phase transition trigger: Lido crossing 33% (safety threshold)

## Adversarial Scenarios

- [[Nation-State Validator Coercion]] - Government compels validators to censor transactions
- [[Economic Attack on Consensus]] - Well-funded actor accumulates majority stake/hashpower

## Related Primitives

- [[Settlement Layers]]
- [[Rollups]]
- [[Data Availability Layers]]

## Related Projects

- [[Ethereum]]
- [[Solana]]
- [[Cosmos Hub]]
