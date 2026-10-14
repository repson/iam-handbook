---
title: SCIM and automated provisioning
description: Use a shared schema and HTTP protocol to manage users and groups across systems.
category: standards
order: 5
updated: 2026-10-14
tags: [SCIM, provisioning, users, groups, reconciliation, API]
---
System for Cross-domain Identity Management (SCIM) 2.0 defines schemas and an HTTP-based protocol for managing identity resources across systems. It commonly connects a provisioning service to an application's user and group API.

## Schema and protocol

RFC 7643 defines resource schemas, including users and groups. RFC 7644 defines operations and protocol behavior. A deployment's supported features and extensions need to be discovered or documented.

An illustrative user representation is:

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "externalId": "employee-1042",
  "userName": "maya@example.test",
  "active": true
}
```

This example is intentionally small. The service provider assigns the resource `id`; `externalId` can carry the provisioning client's identifier. Do not assume they are interchangeable.

## A lifecycle integration

A connector can create a user before their start date, update mapped attributes, manage supported group memberships, and change account state when the affiliation ends.

SCIM's `active` attribute represents administrative status. The target application's exact disablement behavior still needs to be confirmed, including local sessions and alternate login methods.

## Make the connector reliable

Define correlation rules, required attributes, supported operations, pagination, rate limits, retries, and error handling. Not every implementation supports all optional protocol features.

Use reconciliation to compare intended state with the target. If a request times out after creation succeeds, a blind retry may create an unintended duplicate unless correlation and retry behavior are designed correctly.

## Questions for an application owner

- Does changing `active` prevent all required forms of access?
- Which permissions are managed by groups, and which need another API?
- Are deleted users recoverable, and what happens to their business records?
- How are manually changed accounts detected?

## References

- [SCIM Core Schema, RFC 7643](https://www.rfc-editor.org/rfc/rfc7643.html).
- [SCIM Protocol, RFC 7644](https://www.rfc-editor.org/rfc/rfc7644.html).
