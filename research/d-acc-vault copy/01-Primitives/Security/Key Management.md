# Key Management

**Category**: Security > Key Management
**D/ACC Score**: 4 | **Investment Tier**: [[Tier 2 - Strong Conviction]]
**Development Stage**: Growth | **Risk Profile**: Medium
**Defense Category**: [[Cyber Defense]]

## Overview

MPC wallets, smart contract wallets (ERC-4337), and social recovery mechanisms. Modern key management combines MPC generation with smart contract features to eliminate single points of failure.

## Why D/ACC Aligned

Eliminates single points of failure in self-custody. Social recovery enables key restoration without central custodians—lose your key, recover through trusted contacts rather than a company.

## Key Implementations

| Project | Approach | Notes |
|---------|----------|-------|
| [[Safe]] | Smart contract multisig | Industry standard |
| Argent | Smart wallet + guardians | Social recovery |
| ZenGo | MPC | No single key |

## Temporal Dynamics

**[[Account Abstraction Adoption]]**
- EOAs being supplemented by smart contract wallets
- ERC-4337 live
- New user onboarding increasingly via smart accounts

## Counterfactual Analysis

**What if smart wallets don't achieve adoption?**
- Users remain on EOAs
- Key management stays hard
- Self-custody remains expert-only
- **Vacuum filled by**: Centralized custody (Coinbase), custodial wallets
- **Impact**: Moderately Negative - centralized custody wins

## Dependencies

- [[Semiconductor Supply Chain]] - Hardware wallets
- [[Settlement Layers]] - Transaction execution

## Adversarial Scenarios

- [[Sophisticated Phishing at Scale]] - Targeting wallet signers
- [[Supply Chain Compromise]] - Backdoored hardware wallets

## Related Primitives

- [[Multisig Infrastructure]]
- [[MPC]]
- [[Zero-Knowledge Identity]]

## Related Projects

- [[Safe]]
- Argent
- ZenGo
