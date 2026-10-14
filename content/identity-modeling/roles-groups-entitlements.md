---
title: Roles, groups, and entitlements
description: Build an access catalog that people can understand, review, and safely change.
category: identity-modeling
order: 3
level: Intermediate
updated: 2026-10-14
tags: [roles, groups, entitlements, access catalog, role mining, role explosion]
---
Most access problems become visible in the catalog: the list of things people can be given. If nobody can explain what `GRP-FIN-RW-07` allows, nobody can request, approve, or review it meaningfully.

## Three different things

| Concept | What it is | Example |
| --- | --- | --- |
| Entitlement | The smallest unit of access a system recognizes. | `ledger:post-journal` in the finance application. |
| Group | A container of subjects, often used by a system to grant entitlements. | Directory group `finance-ledger-posters`. |
| Role | A business-meaningful bundle of access, assigned by policy or request. | “Accounts payable clerk”. |

A group is a technical mechanism. A role is a business abstraction. A group may implement a role in one system, but treating every group as a role mixes those two levels.

## Describe each entitlement

A useful catalog entry includes:

- A human-readable name and description of what it allows.
- The owning system and the accountable entitlement owner.
- A sensitivity or risk rating, and whether it is privileged.
- Who may hold it: populations, prerequisites, and conflicts.
- How it is granted: birthright, role-derived, or requested.
- How it is provisioned and how its removal is verified.

Start with the entitlements that matter most: privileged, financial, regulated, or customer-data access. A complete but meaningless catalog is less useful than an accurate partial one.

## Birthright, role-derived, and requested access

**Birthright access** is granted to everyone in a population, such as email for employees. **Role-derived access** follows from attributes like job function or department. **Requested access** requires an explicit request and approval.

Record which mechanism produced each assignment. When a person moves, role-derived access can be recalculated automatically; requested access needs an owner decision.

## Avoid role explosion

Creating one role per combination of job, region, project, and seniority quickly produces more roles than people. Signs of trouble include roles held by one person, roles that differ by a single entitlement, and roles nobody can describe.

Options include:

- Keep roles coarse and express variation with attributes or scopes, as in [RBAC and ABAC](../patterns/rbac-and-abac.md).
- Separate **business roles** (what a person does) from **technical roles** (what a system needs).
- Use parameterized assignments, such as “approver, limited to cost center 4100”.

## Role mining is an input, not a decision

Role mining analyzes existing assignments to suggest common bundles. It describes current access, including access that should never have been granted. Have an owner validate any proposed role before using it as policy.

## Express conflicts in the catalog

Separation-of-duties rules are easier to enforce when written against entitlements rather than group names. For example: “No subject may hold both `vendor:create` and `payment:approve` for the same company code.”

Evaluate conflicts at request time, during provisioning, and in periodic reviews, because access can also arrive through paths that bypass the request process.

## Keep learning

See [access requests and reviews](../processes/access-requests-and-reviews.md) for how the catalog is used day to day, and [identity governance](../capabilities/identity-governance.md) for the program around it.

## References

- [NIST RBAC project](https://csrc.nist.gov/projects/role-based-access-control) and the ANSI/INCITS 359 RBAC model, which includes role hierarchies and separation-of-duty constraints.
- [NIST SP 800-53 Rev. 5, AC-5 Separation of Duties and AC-6 Least Privilege](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final).
