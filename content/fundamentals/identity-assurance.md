---
title: Identity assurance levels
description: Describe how much confidence a system needs in proofing, authentication, and federation, and why those are separate dimensions.
category: fundamentals
order: 5
level: Intermediate
updated: 2026-10-14
tags: [assurance, IAL, AAL, FAL, identity proofing, NIST 800-63, risk]
---
“How sure are we?” has more than one answer. A person can authenticate strongly to an account that was created with no evidence about who they are. A strong login can then be weakened by a carelessly accepted federation assertion.

NIST SP 800-63-4 separates these questions into three assurance dimensions. The vocabulary is useful even outside the US federal context.

## Three separate dimensions

| Dimension | Question | Example of higher assurance |
| --- | --- | --- |
| IAL — Identity Assurance Level | How confident are we that the claimed real-world identity belongs to this applicant? | Validated identity evidence and verification that the applicant is its genuine owner. |
| AAL — Authenticator Assurance Level | How confident are we that the claimant controls the authenticators bound to the account? | Multi-factor, phishing-resistant authentication with a hardware-protected key. |
| FAL — Federation Assurance Level | How confident is the relying party in the assertion it received from an identity provider? | Audience-restricted, protected assertions bound to the subscriber or the relying party. |

Each dimension has levels 1 to 3. They are selected independently. A pseudonymous community site might need no identity proofing and still benefit from phishing-resistant authentication.

## Choose levels from impact, not habit

The guidelines describe a risk-based process. Identify the harm that would result from a wrong identity, a compromised account, or a forged assertion. Consider the users, the transactions, privacy, equity, and usability.

The outcome should be a documented decision, including any compensating controls and accepted residual risk. “We chose the highest level everywhere” is not automatically safer if it pushes users toward insecure workarounds or excludes people who cannot complete a proofing process.

## Proofing is a lifecycle event

Identity proofing typically happens at enrollment, but it can return:

- When a person recovers an account after losing all authenticators.
- When a low-assurance account requests a high-impact capability.
- When evidence previously collected is no longer trustworthy.

A recovery path that skips the proofing originally required effectively lowers the IAL of every account that can use it. See [MFA, passkeys, and account recovery](../standards/modern-authentication.md).

## Assurance flows through federation

When an application relies on an external identity provider, it inherits that provider's proofing and authentication practices. OpenID Connect can carry an `acr` (authentication context class reference) and `amr` (authentication methods references) claim. SAML uses an authentication context in the assertion.

These claims are statements by the issuer. They are meaningful only when the relying party trusts the issuer to apply them consistently, ideally under an agreement or trust framework that defines what each value means.

## An example

A benefits portal allows citizens to check application status and change bank details.

- **Checking status** may require IAL1 or IAL2 and AAL2.
- **Changing bank details** has higher fraud impact. The portal requires a recent AAL2 phishing-resistant authentication and notifies the old contact address of the change.

The same account receives different requirements per transaction. This is the idea behind step-up authentication.

## Keep learning

Compare these dimensions with [authentication and authorization](authentication-and-authorization.md), then read [customer IAM](../architecture/customer-iam.md) for proofing and recovery at product scale.

## References

- [NIST SP 800-63-4: Digital Identity Guidelines](https://pages.nist.gov/800-63-4/sp800-63.html) introduces the assurance model and the risk-management process.
- [NIST SP 800-63A-4](https://pages.nist.gov/800-63-4/sp800-63a.html) covers identity proofing and enrollment.
- [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) covers authentication and authenticator management.
- [NIST SP 800-63C-4](https://pages.nist.gov/800-63-4/sp800-63c.html) covers federation and assertions.
