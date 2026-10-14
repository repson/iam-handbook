---
title: Authorization in APIs and microservices
description: Enforce object-level and function-level access, propagate identity safely between services, and isolate tenants.
category: patterns
order: 4
level: Advanced
updated: 2026-10-14
tags: [API, microservices, BOLA, IDOR, multi-tenancy, token exchange, gateway, OWASP]
---
Broken authorization is consistently among the most common serious API vulnerabilities. The cause is rarely the login; it is a missing check on a specific object or function after the user is authenticated.

## Two checks every endpoint needs

**Function-level authorization** asks whether the caller may use this operation at all. For example, only administrators may call `DELETE /users/{id}`.

**Object-level authorization** asks whether the caller may perform this operation on this particular object. For example, a customer may call `GET /orders/{id}` only for their own orders.

```text
GET /orders/9817
Authorization: Bearer <token for customer c-42>

1. Is the token valid, for this API, and not expired?    → authentication
2. Does it allow reading orders?                         → function level
3. Does order 9817 belong to customer c-42?              → object level
```

Skipping step 3 is the classic broken object-level authorization (BOLA, also called IDOR) flaw. Unpredictable identifiers make guessing harder but are not an authorization control.

## Where to enforce

| Layer | Good at | Not enough on its own because |
| --- | --- | --- |
| API gateway | Token validation, coarse scopes, rate limiting. | It usually does not know who owns order 9817. |
| Service | Object ownership, business rules, state. | Every service must implement checks consistently. |
| Data layer | Row-level filtering by tenant or owner. | Hard to express complex business rules. |

Use the gateway for coarse checks and the service for object-level decisions. Defense in depth helps; assuming another layer did the check does not.

## Propagating identity between services

When service A calls service B on behalf of a user, B needs to know both who the user is and which service is calling. Options include:

- **Forwarding the user's token.** Simple, but the token's audience may not include service B, and B gains a token it could replay elsewhere.
- **Token exchange.** Service A exchanges the incoming token for a new one with service B as the audience and a reduced scope, following OAuth Token Exchange (RFC 8693). See [advanced OAuth](../standards/oauth-extensions.md).
- **Signed internal context.** An internal token minted by a trusted component, carrying the user and calling service.

Never accept identity from an unsigned header such as `X-User-Id` unless a trusted component sets it and clients cannot reach the service directly.

## Multi-tenant isolation

In a multi-tenant system, every request must be bound to a tenant, and every data access must be constrained to that tenant. Derive the tenant from the validated token or session, not from a request parameter the client controls.

Test cross-tenant access explicitly: a valid user of tenant A requesting a resource ID from tenant B must be denied, and the denial should not reveal whether the resource exists.

## Mass assignment and property-level access

Authorization also applies to fields. A user allowed to update their profile must not be able to set `"role": "admin"` by adding it to the request body. Explicitly define which properties each caller may read and write.

## Test authorization like a feature

For each endpoint, maintain a matrix of roles or relationships against expected results, and automate it. Include another user's object, another tenant's object, a lower-privileged role, and an expired or wrong-audience token.

## Keep learning

See [policy engines](policy-engines.md) to externalize decisions and [JWT and token validation](../standards/jwt-and-token-validation.md) for the token checks in step 1.

## References

- [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x11-t10/): API1 Broken Object Level Authorization, API3 Broken Object Property Level Authorization, API5 Broken Function Level Authorization.
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).
- [OAuth 2.0 Token Exchange, RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html).
