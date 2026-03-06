# Ethereum Attestation Service (EAS)

**Category**: Attestation Infrastructure
**D/ACC Score**: 5 | **Investment Tier**: [[Tier 1 - Highest Conviction]]
**Stage**: Mainnet | **Token**: FALSE

## Overview

Two core contracts (SchemaRegistry.sol and EAS.sol) for on-chain/off-chain attestations with custom resolvers. Foundational attestation primitive enabling 80% compliance cost reduction and 90% faster verification.

## Key Differentiators

- **Foundational primitive** - Base layer for attestations
- **Custom resolvers** - Flexible verification logic
- **On/off-chain** - Hybrid attestation support

## Why D/ACC Aligned

Enables portable, verifiable credentials without centralized issuers. Anyone can:
1. Create attestation schemas
2. Issue attestations
3. Verify attestations permissionlessly

## Architecture

```
SchemaRegistry.sol → Define attestation structure
        ↓
    EAS.sol → Issue and verify attestations
        ↓
Custom Resolvers → Application-specific logic
```

## Validation Evidence

**80% Compliance Cost Reduction** - Weakly validated
- Case studies cited
- Vendor incentive to overstate
- Small sample size

## Ecosystem

- Part of Ethereum core infrastructure
- Open source
- No token (pure public good)

## Related Primitives

- [[Attestation Infrastructure]]
- [[Decentralized Identity]]
- [[Zero-Knowledge Identity]]

## Related Projects

- Verax
- [[Polygon ID]]

## Investment Thesis

Part of [[Decentralized Identity Thesis]] - foundational attestation layer.
