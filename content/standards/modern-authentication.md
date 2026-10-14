---
title: MFA, passkeys, and account recovery
description: Understand factor types, phishing resistance, and the importance of the recovery path.
category: standards
order: 6
updated: 2026-10-14
tags: [MFA, passkeys, WebAuthn, FIDO, phishing resistance, recovery, authentication]
---
Authentication mechanisms differ in their resistance to phishing, theft, replay, and recovery abuse. A second step does not automatically mean a second factor or protection against every attack.

## Distinct factors

Common factor types are something you know, something you have, and something you are. Two passwords remain the same factor type. A biometric that locally unlocks a cryptographic authenticator can participate in a multi-factor authentication process without being sent to the application.

Evaluate the whole mechanism, including enrollment, device binding, user verification, fallback, and recovery.

## Phishing resistance

One-time codes can provide additional protection over a password alone, but a person can still be tricked into entering them at an attacker's site. Phishing-resistant authentication binds the authentication to the legitimate verifier in a way that a fake site cannot simply relay as a reusable secret.

## WebAuthn and passkeys

WebAuthn lets web applications use public-key credentials. The server stores a public key; the corresponding private key is controlled by the authenticator. Credentials are scoped to a relying party, and browser origin checks participate in the security model.

Passkeys use FIDO credentials and can be device-bound or synchronized through a credential provider. Those deployment choices affect availability, recovery, and assurance requirements.

An authenticator may be built into a phone or computer, or be a separate security key. The user experience and assurance requirements should guide the choice.

## Recovery is part of authentication

Imagine an application with strong passkey sign-in but a help desk that resets accounts based only on a caller knowing a name and team. The recovery process can undermine the intended protection.

Define how users register additional authenticators, recover after device loss, report compromise, and invalidate old authenticators. Give support staff clear procedures and evidence requirements.

## Start with requirements

Identify who is authenticating, what resources are involved, which threats matter, and what accessibility and device constraints exist. Then select an authentication and recovery design that meets those needs.

## References

- [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) covers authenticators, assurance, and lifecycle requirements.
- [W3C WebAuthn](https://www.w3.org/TR/webauthn-3/) specifies the web API and related validation model.
- [FIDO Alliance: passkeys](https://fidoalliance.org/passkeys/) explains passkey terminology and deployment concepts.
