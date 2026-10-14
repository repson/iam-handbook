---
title: Measuring an IAM program
description: Choose metrics that show whether access is correct, timely, and resilient, not just whether tools are deployed.
category: capabilities
order: 5
level: Intermediate
updated: 2026-10-14
tags: [metrics, KPI, KRI, reporting, maturity, operating model]
---
IAM programs are often measured by deployment: number of applications behind SSO, number of users enrolled in MFA. Those numbers matter, but they do not show whether a leaver actually lost access or whether an approval meant anything.

Good metrics describe outcomes and risks, and each one should lead to a decision.

## Four useful families

| Family | Question | Example metrics |
| --- | --- | --- |
| Coverage | How much of the estate is under control? | Applications with SSO; applications with automated provisioning; privileged accounts in PAM. |
| Timeliness | How quickly does access follow reality? | Time to usable access for joiners; time to confirmed revocation for leavers. |
| Hygiene | How much access is wrong or unexplained? | Orphaned accounts; accounts without owners; standing privileged assignments; unused entitlements. |
| Resilience and security | Can the system withstand failure and attack? | Phishing-resistant MFA coverage; break-glass test results; mean time to revoke a compromised session. |

## Prefer confirmed outcomes

“Termination tickets closed within 24 hours” measures paperwork. “Leavers whose access was confirmed removed in every connected application within 24 hours” measures the outcome. Where possible, compute metrics from reconciliation data rather than from workflow status.

## Use a denominator you can defend

A coverage percentage is only as good as its inventory. “95% of applications use SSO” may mean 95% of the applications the IAM team knows about. Report the inventory source and how unknown applications are discovered, for example from expense data, network logs, or SaaS discovery.

## Distinguish indicators of performance and risk

- **Key performance indicators** describe how well a process works, such as median joiner time.
- **Key risk indicators** describe exposure, such as the number of dormant privileged accounts.

Set thresholds for risk indicators and an owner who acts when one is breached.

## A starter dashboard

1. Percentage of workforce identities with an authoritative source and lifecycle owner.
2. Median and 95th percentile time to confirmed revocation for leavers.
3. Number of orphaned and ownerless accounts, trending over time.
4. Percentage of privileged access that is just-in-time rather than standing.
5. Phishing-resistant MFA coverage for administrators and for all users.
6. Certification revocations not yet fulfilled after a defined period.
7. Non-human identities with long-lived secrets past their rotation date.

## Avoid metric traps

- Do not reward high certification completion if nearly every item is approved without review.
- Do not compare teams by raw counts without normalizing for size and risk.
- Do not let a metric become the goal; check periodically whether it still reflects the risk it was chosen for.

## Keep learning

Connect metrics to the [capability map](capability-map.md) and to [identity governance](identity-governance.md).

## References

- [NIST SP 800-55 Vol. 1: Measurement Guide for Information Security](https://csrc.nist.gov/pubs/sp/800/55/v1/final).
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework), including the Identity Management, Authentication, and Access Control category (PR.AA).
