---
title: IAM glossary
description: A quick reference to the terms and abbreviations used throughout the handbook.
category: fundamentals
order: 99
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
| Correlation | Linking an incoming record to an existing subject or account. |
| Orphaned account | An account with no valid, active owner or subject. |
| Birthright access | Access granted automatically to everyone in a population. |
| NHI | Non-human identity: a service, workload, device, pipeline, or agent with its own identity. |
| Workload identity federation | Exchanging a platform-issued identity for short-lived access instead of storing a secret. |

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
| Identity proofing | Collecting and verifying evidence that a claimed real-world identity belongs to an applicant. |
| IAL / AAL / FAL | Identity, authenticator, and federation assurance levels in NIST SP 800-63. |
| Phishing-resistant authentication | Authentication that a fake site cannot relay, such as WebAuthn bound to the legitimate origin. |
| Passkey | A FIDO public-key credential used for sign-in, device-bound or synchronized. |
| Step-up authentication | Requiring a stronger or fresher authentication for a sensitive action. |
| SoD | Separation of duties: preventing one subject from holding conflicting access. |
| Least privilege | Granting only the access needed for a task, scope, and duration. |
| JIT access | Just-in-time access: privileges activated for a limited time and removed automatically. |
| Break-glass account | A monitored emergency account for use when normal access paths fail. |
| Access certification | A periodic review in which owners confirm or revoke existing access. |
| BOLA / IDOR | Broken object-level authorization: failing to check access to a specific object. |

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
| PIP / PAP | Policy information point (supplies attributes) / policy administration point (manages policy). |
| ITDR | Identity threat detection and response: detecting and responding to the misuse of identities. |
| PKCE | Proof Key for Code Exchange: binds an authorization request to the token request. |
| Access token | A credential a client presents to a resource server to access a protected API. |
| Refresh token | A credential a client uses to obtain new access tokens without user interaction. |
| ID token | An OIDC token telling the client about an authentication event and its subject. |
| Scope | A string describing requested or granted access in OAuth. |
| JWKS | JSON Web Key Set: an issuer's published public keys used to verify signatures. |
| DPoP | Demonstrating Proof of Possession: binds an OAuth token to a key held by the client. |
| Token exchange | Trading one token for another with a different audience, scope, or actor (RFC 8693). |
| LDAP | Lightweight Directory Access Protocol, for reading and modifying directories. |
| Kerberos | A ticket-based network authentication protocol, central to Active Directory. |
| SSF / CAEP / RISC | Shared Signals Framework and its profiles for exchanging session and risk events. |
| SPIFFE | A standard for workload identifiers and short-lived workload identity documents. |
| Zero Trust | An approach that evaluates each access request rather than trusting network location. |

## How to use this glossary

Read [What is IAM?](what-is-iam.md) for the overall map and [identity assurance levels](identity-assurance.md) for the assurance vocabulary. For a specific protocol, use the articles under [standards and protocols](../standards/standards-map.md), which link to normative definitions.
