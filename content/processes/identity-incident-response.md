---
title: Responding to identity incidents
description: Contain a compromised account or identity system, evict the attacker, and restore trust.
category: processes
order: 5
level: Advanced
updated: 2026-10-14
tags: [incident response, account takeover, compromise, containment, eviction, ITDR]
---
Many security incidents involve valid credentials: a phished password, a stolen session cookie, a leaked API key, or an abused OAuth consent. Responding well requires knowing every place where access can persist.

## Typical identity incidents

| Incident | Example |
| --- | --- |
| Account takeover | An attacker signs in with a phished password and approves an MFA prompt. |
| Session or token theft | Malware copies browser cookies or refresh tokens and replays them elsewhere. |
| Secret leak | A cloud access key is committed to a public repository. |
| Malicious consent | A user grants a malicious application access to their mailbox. |
| Privilege escalation | An attacker adds themselves to an administrative group. |
| Identity infrastructure compromise | A federation signing key or identity provider admin account is stolen. |

## Contain: cut every path, not only the password

Resetting a password rarely ends an intrusion by itself. For a compromised user account, consider:

1. Disable sign-in or block the account temporarily.
2. Revoke refresh tokens and terminate identity provider and application sessions.
3. Remove authenticators the attacker registered, such as a new MFA device or passkey.
4. Revoke OAuth grants and application consents created during the incident.
5. Rotate API keys, personal access tokens, and secrets the account could read.
6. Review mailbox rules, forwarding, and delegated permissions.
7. Reset the password and require re-enrollment through a trusted channel.

See [sessions, tokens, and revocation](sessions-and-revocation.md) for why each artifact needs its own action.

## Scope: what did the identity touch?

Use authentication logs, token issuance logs, and application audit logs to answer:

- Which accounts and workloads were used, and from where?
- What changed: group memberships, role assignments, applications, federation settings, policies?
- Which data and resources were accessed?
- Were persistence mechanisms created, such as new accounts, credentials, or trusted identity providers?

Attackers who obtain administrative access often add persistence through identity changes. Review recent changes to administrators, application credentials, federation trusts, and conditional access exclusions.

## Evict and recover

If identity infrastructure itself was compromised, the response is larger. A stolen token-signing key lets an attacker mint valid tokens for any user, so rotating that key and reestablishing trust with every relying party is required. Plan for this before you need it; see [emergency access](emergency-access.md).

Return to normal operation in stages: restore access for verified users, keep enhanced monitoring, and confirm that the persistence mechanisms are gone.

## Learn

After the incident, document the initial access path, which controls failed or were missing, how long each containment step took, and what evidence was unavailable. Common follow-ups include phishing-resistant MFA, shorter token lifetimes, consent restrictions, and better identity logging.

## Prepare in advance

- Runbooks for the common incidents above, including who has authority to disable accounts.
- Tested ability to revoke sessions and tokens at scale.
- Identity logs retained long enough for investigation and searchable centrally.
- An inventory of federation trusts, signing keys, and privileged roles.

## References

- [NIST SP 800-61 Rev. 3: Incident Response Recommendations](https://csrc.nist.gov/pubs/sp/800/61/r3/final).
- [MITRE ATT&CK T1078: Valid Accounts](https://attack.mitre.org/techniques/T1078/).
- [MITRE ATT&CK T1550: Use Alternate Authentication Material](https://attack.mitre.org/techniques/T1550/).
