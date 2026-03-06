# Quantum Computing Breakthrough

**Adversary Type**: Technical
**Likelihood**: Low (10yr) / Medium (20yr) | **Impact**: Catastrophic

## Description

Practical quantum computers capable of breaking elliptic curve cryptography using Shor's algorithm. Harvest-now-decrypt-later attacks on recorded transactions.

## Attack Vector

- Shor's algorithm against ECDSA
- Breaking current public key cryptography
- Decrypting historical recorded transactions

## Target Primitives

- All cryptographic protocols
- [[Key Management]]
- [[Zero-Knowledge Proofs]] (most variants)

## Historical Precedent

- NSA reportedly stockpiling encrypted data
- Active quantum computing research (Google, IBM, China)
- No practical attack yet demonstrated

## Degradation Mode

- All current key pairs compromised
- Historical transactions deanonymizable
- Requires full ecosystem migration

## Defense Effectiveness

**Moderate for prepared protocols**
- Quantum-resistant alternatives exist (lattice-based, hash-based)
- [[StarkNet]] uses quantum-resistant STARKs
- Migration is complex but possible

## Quantum-Resistant Approaches

| Approach | Status | Projects |
|----------|--------|----------|
| zk-STARKs | Production | [[StarkNet]] |
| Lattice-based | Research | Various |
| Hash-based | Research | Various |

## Mitigation Strategies

- Prefer quantum-resistant cryptography (STARKs)
- Develop migration plans
- Monitor quantum computing progress

## Implications for Investment

- [[StarkNet]] has structural advantage (STARKs)
- SNARK-based systems may need migration
- Long-term consideration, not immediate threat

## Related Scenarios

- [[Zero-Day in Cryptographic Primitive]]
