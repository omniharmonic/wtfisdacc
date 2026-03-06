# Lending and Borrowing

**Category**: Financial > Lending
**D/ACC Score**: 3 | **Investment Tier**: [[Tier 3 - Selective Conviction]]
**Development Stage**: Growth | **Risk Profile**: Medium
**Defense Category**: [[Cyber Defense]]

## Overview

Permissionless credit markets with ~$34B TVL. Flash loans enable uncollateralized borrowing within single transaction blocks—a unique primitive impossible in traditional finance.

## Why D/ACC Aligned

Removes gatekeepers from credit access. Over-collateralization protects against bad actors without requiring identity verification or credit scores.

## Key Implementations

| Protocol | TVL | Differentiator |
|----------|-----|----------------|
| [[Aave]] | $10.76B | 15+ chains, flash loans, GHO |
| [[Compound]] | $2B+ | Governor standard, isolated markets |
| [[Morpho Blue]] | Growing | Modular market creation |

## D/ACC Considerations

Score of 3 because:
- Important but not fundamentally defensive
- Institutional capture risk (KYC pools emerging)
- Oracle dependency creates centralization vectors

## Temporal Dynamics

**[[DeFi Institutional Capture]]**
- DeFi protocols adding KYC pools for institutional capital
- Aave Arc-style permissioned pools becoming larger share
- Risk: Non-compliant DeFi marginalized

## Dependencies

- [[Oracle Infrastructure]] - Price feeds critical for liquidations
- [[Stablecoins]] - Primary collateral and borrow asset

## Adversarial Scenarios

- [[Coordinated Exchange Attack]] - Price manipulation triggers cascading liquidations
- [[Smart Contract Bug Exploitation]] - Euler Finance lost $197M

## Validation Evidence

**Aave $10.76B TVL** - Validated, on-chain verifiable

## Related Primitives

- [[Oracle Infrastructure]]
- [[Stablecoins]]
- [[AMMs]]

## Related Sectors

- [[Financial Services and Banking]]
