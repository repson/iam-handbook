---
title: IAM glossary
description: A quick reference to the terms and abbreviations used throughout the handbook.
category: fundamentals
order: 5
updated: 2026-10-14
tags: [glossary, terminology, acronyms, IGA, PAM, CIAM, SSO, MFA]
---
This glossary uses practical working definitions. A specification may define a term more narrowly; use that definition when implementing the specification.

## Identity and lifecycle

| Term | Working definition |
| --- | --- |
| Subject | An entity requesting or receiving access. |
| Digital identity | A representation of a subject within a context. |
| Account | A record representing a subject in a particular system. |
| Attribute | A property associated with an entity, such as department or account status. |
| Authoritative source | The designated source responsible for a particular fact. |
| Provisioning | Creating or updating accounts and access in a target system. |
| Deprovisioning | Removing or disabling accounts or access in a target system. |
| Reconciliation | Comparing intended identity or access state with observed state. |
| JML | Joiner, mover, leaver: lifecycle events for workforce changes. |

## Access and authentication

| Term | Working definition |
| --- | --- |
| Authentication / AuthN | Establishing confidence in control of an associated authenticator. |
| Authorization / AuthZ | Determining whether a requested operation is permitted. |
| Authenticator | A means controlled by a claimant to authenticate. |
| MFA | Multi-factor authentication: combining distinct factor types. |
| SSO | Single sign-on: reusing an authentication session across applications. |
| Federation | A trust arrangement in which one system accepts identity assertions from another. |
| IdP | Identity provider: a system providing identity assertions to relying parties. |
| RP / SP | Relying party / service provider: a system consuming identity assertions. |
| Entitlement | A unit of access recognized by a system. |
| RBAC | Role-based access control: assigning permissions through roles. |
| ABAC | Attribute-based access control: evaluating attributes against policy. |
| ReBAC | Relationship-based access control: using relationships in access decisions. |

## Capabilities and protocols

| Term | Working definition |
| --- | --- |
| IGA | Identity governance and administration: lifecycle, access governance, and related administration. |
| PAM | Privileged access management: controlling and monitoring elevated access. |
| CIAM | Customer identity and access management. |
| OAuth | A framework for delegated authorization. |
| OIDC | OpenID Connect: an identity layer built on OAuth 2.0. |
| SAML | An XML-based framework for exchanging assertions, commonly used for federation. |
| SCIM | A standard schema and protocol for cross-domain identity management. |
| JWT | A claims representation format; its presence alone proves neither trust nor authorization. |
| PDP / PEP | Policy decision point / policy enforcement point. |

## How to use this glossary

Read [What is IAM?](what-is-iam.md) for the overall map. For a specific protocol, use the articles under [standards and protocols](../standards/standards-map.md), which link to normative definitions.
