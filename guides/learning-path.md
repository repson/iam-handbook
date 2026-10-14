---
title: A path through the essentials
description: Start with the language of identity, then connect the model, architecture, and lifecycle.
updated: 2026-10-14
---
You do not need to read every standard before understanding IAM. Follow this short route, then explore the areas that match your work. Each step builds on the last.

## 01 — Learn the vocabulary

Begin with [What is IAM?](../content/fundamentals/what-is-iam.md). Then distinguish [identities, accounts, and credentials](../content/fundamentals/identities-accounts-credentials.md) and compare [authentication and authorization](../content/fundamentals/authentication-and-authorization.md).

**You should be able to explain:** why a successful sign-in is only part of managing access.

## 02 — Describe the identity

Read [a basic identity model](../content/identity-modeling/identity-model.md) and [sources, attributes, and correlation](../content/identity-modeling/sources-and-attributes.md).

**Try it:** sketch a person with two accounts, one affiliation, and a time-limited access assignment. Mark which system owns each fact.

## 03 — Connect the components

Explore [the components of an IAM architecture](../content/architecture/components.md) and [a workforce reference architecture](../content/architecture/workforce-reference.md).

**Try it:** draw a runtime sign-in flow separately from an administrative account-creation flow.

## 04 — Follow the lifecycle

Read [joiner, mover, leaver](../content/processes/joiner-mover-leaver.md), then [sessions, tokens, and revocation](../content/processes/sessions-and-revocation.md).

**You should be able to explain:** why an account-disablement event does not necessarily end all active access immediately.

## 05 — Choose the right integration

Use [a map of IAM standards](../content/standards/standards-map.md) and [federation and provisioning](../content/patterns/federation-and-provisioning.md).

**Try it:** identify which mechanism handles application sign-in and which mechanism handles account removal.

## 06 — Apply the ideas

Walk through [onboarding an employee](../content/use-cases/employee-onboarding.md) and [giving a workload access to an API](../content/use-cases/workload-access.md). Compare how ownership, authentication, and revocation differ.

**Next:** use the [capability map](../content/capabilities/capability-map.md) to connect these technical building blocks to an operating IAM program.

## 07 — Govern and limit privilege

Read [identity governance](../content/capabilities/identity-governance.md), [roles, groups, and entitlements](../content/identity-modeling/roles-groups-entitlements.md), and [privileged access management](../content/capabilities/privileged-access.md). Then see how [just-in-time access](../content/patterns/just-in-time-access.md) reduces standing privilege.

**Try it:** pick one administrative role and describe how it would be requested, activated, logged, and removed.

## 08 — Secure the runtime

Study [JWT and token validation](../content/standards/jwt-and-token-validation.md) and [authorization in APIs](../content/patterns/api-authorization.md). Continue with [policy engines](../content/patterns/policy-engines.md) when rules outgrow application code.

**You should be able to explain:** why a valid token for the right user can still be the wrong token for a request.

## 09 — Prepare for things going wrong

Read [emergency access](../content/processes/emergency-access.md), [identity threat detection](../content/capabilities/identity-threat-detection.md), and [responding to identity incidents](../content/processes/identity-incident-response.md). Walk through [offboarding a leaver urgently](../content/use-cases/urgent-offboarding.md).

**Try it:** list every place a compromised account could still have access after its password is reset.

## Go deeper

Choose the branch that matches your work:

- **Customer identity:** [customer IAM](../content/architecture/customer-iam.md) and [identity assurance levels](../content/fundamentals/identity-assurance.md).
- **Workloads and automation:** [non-human identities](../content/identity-modeling/non-human-identities.md) and [deploying from CI/CD without stored secrets](../content/use-cases/ci-cd-workload-federation.md).
- **Protocols:** [advanced OAuth](../content/standards/oauth-extensions.md), [Shared Signals](../content/standards/shared-signals.md), and [LDAP and Kerberos](../content/standards/ldap-and-kerberos.md).
- **Running the program:** [measuring an IAM program](../content/capabilities/iam-metrics.md) and [partner access](../content/use-cases/b2b-partner-access.md).

## Keep a working glossary

Return to the [IAM glossary](../content/fundamentals/glossary.md) whenever an abbreviation gets in the way. Understanding the relationship between terms matters more than memorizing them.
