---
title: Privileged access management (PAM)
description: Control, limit, and record the access that can change systems, security settings, or other people's access.
category: capabilities
order: 3
level: Intermediate
updated: 2026-10-14
tags: [PAM, privileged access, administrators, vaulting, session recording, least privilege, JIT]
---
Privileged access is access that can significantly change a system, bypass its controls, or affect other identities. Attackers seek it because one privileged account can be worth more than thousands of ordinary ones.

## What counts as privileged

It is broader than “domain administrator”:

- Infrastructure administration: operating systems, hypervisors, cloud control planes, databases.
- Security administration: identity providers, MFA policy, logging, endpoint protection.
- Identity administration: the ability to reset passwords, add group members, or grant roles.
- Application administration and powerful business functions, such as changing payment details.
- Workloads and pipelines that can deploy code or change infrastructure.

Define privilege by impact, then inventory the accounts, roles, and secrets that carry it.

## Core controls

| Control | Purpose |
| --- | --- |
| Separate admin identities | Keep everyday activity, such as email and browsing, away from privileged sessions. |
| Phishing-resistant authentication | Make credential theft and MFA relay much harder for the most valuable accounts. |
| Least privilege and scoping | Grant the narrowest role for the task and the systems involved. |
| Just-in-time elevation | Activate privilege for a limited period instead of holding it permanently. |
| Credential vaulting and rotation | Keep shared and service credentials out of people's hands and rotate them. |
| Session brokering and recording | Mediate access to sensitive targets and record what happened. |
| Approval and justification | Require a reason, ticket, or second person for high-impact access. |
| Monitoring | Alert on privileged sign-ins, role activations, and changes to the controls themselves. |

Not every environment needs every control. Prioritize by the blast radius of the access.

## Reduce standing privilege

Permanent administrator rights are always available to an attacker who compromises the account. Reducing standing privilege is often more effective than adding monitoring around it.

Approaches include eligible roles activated on demand, time-bound group membership, and ephemeral credentials issued per session. See [just-in-time access](../patterns/just-in-time-access.md).

## Protect the administrator's workstation

A privileged session is only as trustworthy as the device it runs on. Malware on an everyday laptop can capture sessions and tokens. For the most sensitive tiers, use dedicated, hardened administrative workstations or isolated environments.

## Do not forget non-human privilege

Automation frequently has more privilege than any person: deployment pipelines, backup systems, infrastructure-as-code roles, and monitoring agents. Apply ownership, scoping, short-lived credentials, and monitoring to these as well. See [workload and non-human identities](../identity-modeling/non-human-identities.md).

## Measure the program

Useful indicators include the number of standing privileged assignments, the percentage of privileged accounts with phishing-resistant MFA, privileged credentials past their rotation date, and the time between a privileged role change and its detection.

## Keep learning

See [emergency access](../processes/emergency-access.md) for break-glass accounts and [identity threat detection](identity-threat-detection.md) for monitoring.

## References

- [NIST SP 800-53 Rev. 5, AC-6 Least Privilege](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) and its enhancements for privileged accounts.
- [CIS Critical Security Controls v8.1](https://www.cisecurity.org/controls/v8-1), safeguards on dedicated administrator accounts and centralized access control.
- [CISA: More than a password](https://www.cisa.gov/MFA) on MFA and phishing resistance.
