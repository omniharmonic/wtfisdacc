# Perpetual DEXs

**Category**: Financial > Derivatives
**D/ACC Score**: 3 | **Investment Tier**: [[Tier 3 - Selective Conviction]]
**Development Stage**: Growth | **Risk Profile**: Medium-High
**Defense Category**: [[Cyber Defense]]

## Overview

Decentralized derivatives with $1.4T+ annual volume (2024), up 872% YoY. [[Hyperliquid]] disrupted the market from 0.3% to 64.8% share through superior UX and a custom L1.

## Why D/ACC Aligned

Provides permissionless access to derivatives without centralized exchange counterparty risk. No single entity can freeze positions or prevent trading.

## Key Implementations

| Protocol | Market Share | Model |
|----------|--------------|-------|
| [[Hyperliquid]] | 64.8% | Custom L1, orderbook |
| [[dYdX]] | Declining | Cosmos SDK, orderbook |
| [[GMX]] | ~10% | Liquidity pool, Arbitrum |

## D/ACC Considerations

Score of 3 because:
- Important infrastructure but not fundamentally defensive
- Hyperliquid dominance creates concentration
- Oracle manipulation risks

## Market Validation

**Perp DEX 872% YoY Growth** - Validated, on-chain verifiable

| Metric | Value | Status |
|--------|-------|--------|
| 2024 Volume | $1.4T+ | Verified |
| Hyperliquid Share | 64.8% | Verified |
| Growth Pattern | Single-year shift from CeFi | Notable |

## Dependencies

- [[Oracle Infrastructure]] - Price feeds for mark prices
- [[Settlement Layers]] - Underlying security (varies by implementation)

## Adversarial Scenarios

- [[Coordinated Exchange Attack]] - Oracle manipulation for liquidation hunting

## Related Primitives

- [[Oracle Infrastructure]]
- [[AMMs]]
- [[Rollups]] (for some implementations)

## Related Sectors

- [[Financial Services and Banking]]
