# zkEmail

**Category**: Cyber Defense > Cryptographic Provenance
**D/ACC Domain**: Cyber Defense & Cryptography
**Quadrant**: Bits-Survive
**Stage**: Active | **Funding**: ENS Grants

## Overview

zkEmail is a public goods organization that enables private verification of email data on-chain without revealing the email contents. It bridges web2 and web3 identities by proving statements about emails (sender, content, metadata) using zero-knowledge proofs.

## How It Works

1. User has email from domain (e.g., @company.com)
2. zkEmail creates ZK proof of email properties
3. Proof verifiable on-chain without revealing email content
4. Can prove: sender domain, specific text exists, timestamps, etc.

## Use Cases

- **Identity verification**: Prove you received email from @harvard.edu
- **Employment verification**: Prove @bigcompany.com emailed you
- **Account recovery**: Prove ownership via email proof
- **Privacy-preserving KYC**: Prove attributes without revealing PII

## Why D/ACC Aligned

Email is the de facto identity system of web2. zkEmail makes it:
- Verifiable (cryptographic proof)
- Private (ZK reveals nothing beyond claimed fact)
- Decentralized (no trusted oracle needed)
- Composable (works with smart contracts)

## D/ACC Alignment

| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Defensive | 21/25 | Enables verification without exposure |
| Decentralized | 22/25 | No trusted intermediary |
| Democratic | 20/25 | Anyone with email can participate |
| Differential | 20/25 | Verification scales; forgery doesn't |
| **Total** | **83/100** | **Tier 1** |

## Key People

- **Aayush Gupta** — Core contributor (speaker at d/acc events)
- Also working on [[Proteus]] (AI image provenance)

## Related Projects

- [[Holonym]] — Privacy-preserving identity
- [[Proteus]] — AI image provenance
- [[vLayer]] — Email proofs
- [[zkP2P]] — Peer-to-peer with ZK email proofs

## Related

- [[Cyber Defense]]
- [[Zero-Knowledge Proofs]]
- [[Decentralized Identity]]
