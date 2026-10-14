---
title: SAML and enterprise federation
description: Understand identity providers, service providers, assertions, and metadata.
category: standards
order: 4
updated: 2026-10-14
tags: [SAML, assertion, federation, SSO, metadata, XML]
---
Security Assertion Markup Language (SAML) 2.0 provides an XML-based framework for exchanging assertions. In common enterprise web SSO deployments, an identity provider authenticates a person and a service provider consumes an authentication assertion.

## The common browser interaction

In a service-provider-initiated sign-in, an application sends an authentication request toward the identity provider. After the required authentication, a SAML response is delivered to the application, which validates it and creates a local session.

Specific bindings, profiles, and initiation modes determine the details. “Supports SAML” does not mean every combination is supported.

## Assertions and trust

An assertion can communicate authentication information and attributes. Its recipient needs to establish the trusted issuer and validate the applicable signature, audience, destination, timing, and request relationship.

XML processing and signature validation have important implementation details. Use a maintained SAML library and the relevant profile rather than implementing validation from this overview.

Metadata describes information such as entity identifiers, endpoints, bindings, and keys. Trusting metadata and rotating signing certificates need an operational process.

## Account mapping is a design decision

An application might receive a subject identifier and organizational attributes. Decide which stable identifier links that assertion to a local account, and what happens when an attribute changes.

An unverified email match can connect the wrong local account. A display name should not function as an account-correlation key.

## Keep provisioning separate

SAML sign-in does not, by itself, define a complete joiner, mover, leaver process. An application may create an account during login, but that does not guarantee account removal or the termination of an existing session later.

Use [federation and provisioning](../patterns/federation-and-provisioning.md) to design the full integration. Check logout behavior explicitly instead of inferring it from SSO support.

## References

- [OASIS SAML 2.0 Core](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf).
- [OASIS SAML 2.0 Profiles](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf).
