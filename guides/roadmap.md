---
title: A handbook that grows
description: What the handbook covers today, and the direction for future discoveries.
updated: 2026-10-14
---
This handbook began with an introduction to the discipline, a working vocabulary, and examples that connect the concepts. It is a growing reference rather than an exhaustive encyclopedia.

## Available now — Foundations

The first edition covers eight areas: fundamentals, identity modeling, architecture, processes, capabilities, design patterns, use cases, and standards.

Start with the [learning path](learning-path.md), or choose the concept relevant to a current problem. Articles include examples, cross-references, and primary sources where applicable.

## Available now — Operations and practice

The second edition adds operational and advanced material:

- **Governance and privilege:** identity governance, roles and entitlements, privileged access management, just-in-time access, and emergency access.
- **Security operations:** identity threat detection and response, identity incident response, and urgent offboarding.
- **Populations:** customer IAM, identity assurance levels, non-human identities, and partner access.
- **Authorization at runtime:** policy engines and policy as code, and authorization in APIs and microservices.
- **Standards in practice:** JWT validation, advanced OAuth, LDAP and Kerberos, and Shared Signals.
- **Running the program:** metrics that measure outcomes rather than deployment.

## Available now — OAuth, OpenID Connect, and application security

A dedicated section covers OAuth and OpenID Connect in depth: grant types and client authentication, authorization server endpoints, discovery and Protected Resource Metadata, token claims, self-contained and opaque tokens, resource servers and step-up, DPoP, PAR, JAR, RAR, logout, and the threats in the security BCP.

The design patterns add access control models compared, API gateway policies, the backend-for-frontend pattern, native and mobile apps, and cookies and sessions. New use cases cover a payment authorized with PAR, RAR, and DPoP, and an AI agent connecting to a protected API through MCP. A product landscape links to official vendor and project documentation.

## Next — Deeper walkthroughs

Planned topics include annotated protocol traces for OIDC and SAML, signing-key rotation exercises, SCIM interoperability testing, and SAML single logout.

Examples should identify the specification or profile they implement and the limits of the demonstration.

## Later — More architectures and patterns

Areas to explore include multi-tenant SaaS identity, decentralized identity and verifiable credentials (OpenID for Verifiable Credentials, SD-JWT), passkey deployment at scale, and migrating from on-premises directories.

The aim is to compare the conditions under which a pattern helps and the tradeoffs it introduces. Product-specific implementation notes can supplement the underlying concepts.

There is no promised delivery schedule. This roadmap records direction and provides a place to organize new discoveries.

## How new material enters the handbook

A discovery becomes an article or an improvement to an existing article. It should include context, a clear explanation, an example where useful, and references that a reader can inspect.

Use the [contribution guide](contribute.md) to add or revise content. Small, verified improvements are welcome; an article does not need to cover an entire subject to be useful.
