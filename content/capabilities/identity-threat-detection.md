---
title: Identity threat detection and response (ITDR)
description: Detect attacks that use valid identities, and harden the identity infrastructure they target.
category: capabilities
order: 4
level: Advanced
updated: 2026-10-14
tags: [ITDR, detection, monitoring, account takeover, MFA fatigue, token theft, posture]
---
When attackers sign in with valid credentials, traditional perimeter defenses see a normal user. Identity threat detection and response (ITDR) focuses on recognizing misuse of identities and on protecting the systems that issue them.

ITDR is a capability description, not a protocol. It overlaps with security operations, IAM, and endpoint security.

## Common attack techniques

| Technique | What to look for |
| --- | --- |
| Password spraying and brute force | Many failures across accounts from one source, or slow attempts over time. |
| Credential stuffing | Sign-in attempts using credentials leaked from other services. |
| MFA fatigue | Repeated push prompts until a user approves one. |
| Adversary-in-the-middle phishing | A sign-in that succeeds through a proxy, followed by session use from a new location. |
| Session and token theft | A token or cookie reused from a different device or network than where it was issued. |
| Consent phishing | A new OAuth application granted broad permissions by a user. |
| Persistence through identity | New credentials on an application, a new federation trust, a new administrator, or a new MFA method. |

## Signals worth collecting

- Authentication events from identity providers, including failures and MFA results.
- Token issuance and refresh events where available.
- Administrative changes: roles, groups, policies, applications, and federation settings.
- Directory events, such as Kerberos ticket requests in Active Directory environments.
- Application audit logs for sensitive actions.
- Device and network context to correlate with identity events.

Centralize these with consistent identifiers so a person, their accounts, and their devices can be correlated.

## Detection ideas

Start with high-signal rules before investing in behavioral analytics:

- Any use of an emergency or dormant privileged account.
- A new MFA method registered shortly after a password reset or from an unusual location.
- Privileged role assignment outside a change process.
- New credentials added to a high-privilege application or service principal.
- Changes to federation trust or token-signing configuration.
- Many MFA prompts denied, followed by one approved.

Tune each rule to your environment and give it a response playbook.

## Posture: close the easy paths

Identity security posture management looks for weaknesses before they are exploited: accounts without MFA, legacy authentication protocols still enabled, stale privileged accounts, over-permissive application consents, and users excluded from access policies. Fixing posture issues reduces the number of alerts you need to investigate.

## Response

Detection is only useful if the team can act. Make sure responders can disable accounts, revoke sessions and tokens, remove authenticators, and roll back administrative changes quickly. See [responding to identity incidents](../processes/identity-incident-response.md).

## Sharing signals between systems

When one system detects compromise, others need to know. The OpenID Shared Signals Framework lets providers and applications exchange security events such as session revocation or credential changes. See [Shared Signals, CAEP, and RISC](../standards/shared-signals.md).

## References

- [MITRE ATT&CK: Credential Access tactic](https://attack.mitre.org/tactics/TA0006/).
- [MITRE ATT&CK T1621: Multi-Factor Authentication Request Generation](https://attack.mitre.org/techniques/T1621/).
- [MITRE ATT&CK T1528: Steal Application Access Token](https://attack.mitre.org/techniques/T1528/).
