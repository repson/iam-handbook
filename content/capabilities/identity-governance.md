---
title: Identity governance and administration (IGA)
description: Connect lifecycle automation, access requests, certifications, and policy into an accountable program.
category: capabilities
order: 2
level: Intermediate
updated: 2026-10-14
tags: [IGA, governance, certification, SoD, lifecycle, compliance, audit]
---
Identity governance and administration (IGA) is the capability that keeps access aligned with business intent over time. Administration makes changes; governance makes those changes owned, justified, and verifiable.

## What IGA covers

| Function | Purpose |
| --- | --- |
| Identity lifecycle | Turn joiner, mover, and leaver events into access changes. |
| Access catalog | Describe roles and entitlements in business language. |
| Access requests | Let people request access with approval and policy checks. |
| Provisioning and reconciliation | Apply changes to targets and detect drift. |
| Access certification | Periodically confirm that existing access is still appropriate. |
| Policy | Enforce separation of duties, eligibility, and expiry. |
| Reporting and evidence | Show auditors and owners who has what, and why. |

These can come from one platform or several. The responsibilities matter more than the product boundary.

## Connected, disconnected, and unmanaged applications

A **connected** application has an automated connector for reading and changing access. A **disconnected** application is governed through tickets or manual tasks. An **unmanaged** application is unknown to the program.

Coverage is a central question. Report it explicitly, because a clean certification on 40% of applications says little about the other 60%. Prioritize connections by risk: privileged, financial, regulated, and customer-data systems first.

## Certification campaigns that produce decisions

Certifications often degrade into “approve all” exercises. Improve them by:

- Reviewing fewer, higher-risk items rather than every entitlement equally.
- Showing context: what the access allows, how it was granted, last use, and peer comparison.
- Choosing the reviewer who can actually judge: a resource owner rather than only a manager.
- Pre-revoking expired and unused access in low-risk cases, with an exception path.
- Confirming that every “revoke” decision was fulfilled in the target system.

Event-driven reviews, triggered by a mover event or an unusual assignment, complement periodic campaigns.

## Where policy is evaluated

Separation-of-duties and eligibility rules should be evaluated:

1. **Preventively** at request time, before approval.
2. **During provisioning**, in case access arrives through another path.
3. **Detectively** through reconciliation and reporting.

Every violation should be either removed or accepted as a time-bound, owned exception with a compensating control.

## Common failure modes

- Approvers rubber-stamp because requests lack context.
- Access is approved but never provisioned, or revoked but never removed.
- Application owners have left and nobody is accountable.
- Local accounts and direct assignments bypass the governance system.
- The catalog lists technical group names nobody understands.

## Evidence

Auditors typically ask for a population (who has access), the approval for selected assignments, the review history, and proof that terminated users lost access within the required time. Produce these as normal outputs of the process rather than through a yearly manual effort.

## Keep learning

See [roles, groups, and entitlements](../identity-modeling/roles-groups-entitlements.md), [access requests and reviews](../processes/access-requests-and-reviews.md), and [measuring an IAM program](iam-metrics.md).

## References

- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), especially AC-2 Account Management, AC-5 Separation of Duties, and AC-6 Least Privilege.
- [CIS Critical Security Controls v8.1](https://www.cisecurity.org/controls/v8-1), Control 5 (Account Management) and Control 6 (Access Control Management).
