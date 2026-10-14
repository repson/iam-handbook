---
title: Emergency (break-glass) access
description: Keep a controlled way in when the normal identity path is unavailable, without creating a permanent back door.
category: processes
order: 4
level: Intermediate
updated: 2026-10-14
tags: [break-glass, emergency access, resilience, recovery, privileged access]
---
Centralizing authentication creates a dependency. If the identity provider, the MFA service, or a conditional access policy fails, administrators may be locked out of the very systems they need to fix.

Emergency access, often called break-glass access, is a pre-planned path for that situation. It is deliberately exceptional, heavily monitored, and regularly tested.

## Scenarios to plan for

- The central identity provider or its MFA dependency is unavailable.
- A misconfigured policy blocks all administrators.
- The federation trust or a signing certificate has expired.
- An incident requires locking out compromised administrator accounts.
- A natural disaster or network outage separates sites.

For each, identify which systems must be reachable and who must be able to act.

## Design principles

**Independence.** Emergency accounts should not depend on the component that is likely to fail. A cloud administrator account that authenticates through the same federated identity provider does not help when that provider is down.

**Strong, non-shared authentication.** Use phishing-resistant authenticators such as hardware security keys, stored securely and separately. Avoid a single shared password in a document.

**Narrow and few.** Keep a small number of accounts with only the access needed to restore normal operation.

**Split knowledge where justified.** For the most sensitive accounts, require two people, for example one holding the key and another holding the PIN or the safe combination.

**Exclusion with intent.** Emergency accounts are often excluded from policies such as conditional access. Document each exclusion and compensate with monitoring.

## Detect every use

Any authentication by an emergency account should raise a high-priority alert to several people. A use without a corresponding incident is itself an incident.

After use, rotate or re-seal the credentials, record who used the account and why, and review the actions performed.

## Test regularly

An emergency procedure that has never been executed is a hypothesis. Schedule exercises, for example quarterly, to confirm that:

1. The credentials and authenticators are where the procedure says.
2. The accounts can sign in without the normal dependencies.
3. The alert fires and reaches the right people.
4. The responders know the steps without improvising.

## Include other recovery paths

Break-glass accounts are one part of resilience. Also consider:

- Documented recovery for the identity platform itself, such as configuration backups.
- Offline copies of critical runbooks and contact lists.
- Expiry monitoring for certificates and federation metadata.
- How to temporarily relax a policy safely, and how to revert it.

## Keep learning

See [privileged access management](../capabilities/privileged-access.md) for everyday elevated access, and [identity incident response](identity-incident-response.md) for when the identity system itself is under attack.

## References

- [NIST SP 800-53 Rev. 5, AC-2 Account Management and CP Contingency Planning](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final).
- [CISA: Phishing-Resistant MFA](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf).
