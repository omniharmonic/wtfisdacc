# Sequencer Centralization

**Dependency Type**: Infrastructure
**Centralization Risk**: Critical
**Alternatives Exist**: FALSE (currently)

## Description

Every major L2 ([[Arbitrum]], [[Optimism]], Base, [[zkSync]]) runs a single centralized sequencer controlled by the protocol team.

## Providers/Bottlenecks

| L2 | Sequencer Operator |
|----|-------------------|
| Arbitrum | Offchain Labs |
| Optimism | OP Labs |
| Base | Coinbase |
| zkSync | Matter Labs |

## Failure Scenario

- Sequencer downtime halts L2 (has happened multiple times)
- Censorship at sequencer level possible
- Regulatory pressure could force compliance

## Affected Primitives

- [[Rollups]]
- All L2 DeFi applications

## Mitigation Strategies

- Decentralized sequencer roadmaps (all major L2s have these)
- Based rollups (L1 proposers sequence)
- Shared sequencing (Espresso)

## Temporal Dynamics

**[[L2 Sequencer Roadmaps]]**
- All L2s launched centralized
- Decentralization "on roadmap" for years
- Timeline consistently slips
- Revenue model conflicts (sequencer fees)

## Validation Evidence

**Sequencer Decentralization Timelines** - Unvalidated (promises)
- Roadmaps published
- Some technical progress
- No concrete dates
- **Confidence**: Low - roadmaps are aspirational

## Investment Implications

- Monitor actual decentralization progress
- L2 d/acc alignment may be overstated currently
- Sequencer risk underweighted in most analyses

## Related Dependencies

- [[Ethereum Consensus Dependency]]
- [[MEV Infrastructure]]

## Related Scenarios

- [[Nation-State Validator Coercion]]
