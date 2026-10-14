---
title: Protecting an API as a resource server
description: Accept bearer and DPoP tokens, validate them, return standard errors, request step-up authentication, and publish metadata.
category: oauth-oidc
order: 10
level: Intermediate
updated: 2026-10-14
tags: [resource server, bearer token, RFC 6750, WWW-Authenticate, step-up, RFC 9470, audience, resource indicators]
---
The resource server is the API that receives access tokens. It is where OAuth turns into actual access decisions, and where many integration mistakes happen.

## Receiving the token

RFC 6750 defines how a bearer token is presented:

| Method | Example | Guidance |
| --- | --- | --- |
| Authorization header | `Authorization: Bearer mF_9.B5f-4.1JqM` | Use this. |
| Form body | `access_token=…` in a POST body | Only in limited cases. |
| Query parameter | `?access_token=…` | Avoid: leaks through logs, history, and referrers. |

[DPoP](dpop.md)-bound tokens use `Authorization: DPoP <token>` plus a `DPoP` proof header. A resource server that supports both must not accept a DPoP-bound token presented as a plain bearer token.

## Validation steps

1. Extract the token from the expected scheme.
2. Validate it: locally as a JWT (signature, `iss`, `aud`, `exp`, `typ`) or through introspection. See [JWT and token validation](jwt-and-token-validation.md) and [self-contained and opaque tokens](self-contained-and-opaque-tokens.md).
3. Check sender constraint if present (`cnf` matches the DPoP key or client certificate).
4. Check scopes or `authorization_details` for the operation.
5. Apply business authorization on the specific object. See [authorization in APIs](../patterns/api-authorization.md).

**Audience is essential.** Accept only tokens whose `aud` identifies this API. Clients can request audience-restricted tokens with the `resource` parameter defined in RFC 8707.

## Standard error responses

| Situation | HTTP status | `WWW-Authenticate` |
| --- | --- | --- |
| No token | 401 | `Bearer realm="api"` (no error code) |
| Malformed request | 400 | `Bearer error="invalid_request"` |
| Invalid, expired, or revoked token | 401 | `Bearer error="invalid_token"` |
| Token lacks the required scope | 403 | `Bearer error="insufficient_scope", scope="orders.write"` |
| Authentication too weak or too old | 401 | `Bearer error="insufficient_user_authentication", acr_values="…"` (RFC 9470) |

Standard errors let generic client libraries react correctly: refresh the token, ask for more scope, or trigger step-up.

## Step-up authentication (RFC 9470)

Some operations need stronger or more recent authentication than the current token reflects. The resource server responds:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer error="insufficient_user_authentication",
  error_description="A phishing-resistant authentication is required",
  acr_values="phr", max_age="300"
```

The client starts a new authorization request with those `acr_values` and `max_age`, obtains a new token whose `acr` and `auth_time` satisfy the requirement, and retries. The API decides what is sufficient; the authorization server performs the authentication.

## Advertising requirements

Publish [Protected Resource Metadata](discovery-and-metadata.md) (RFC 9728) and reference it with the `resource_metadata` parameter in `WWW-Authenticate`. Clients can then discover the trusted authorization servers, supported scopes, and whether DPoP is required.

## Operational practices

- Cache JWKS and introspection results appropriately; never cache a positive introspection beyond the token's `exp`.
- Do not log tokens; log `jti`, `client_id`, and `sub` instead.
- Apply rate limits per client and per subject.
- Strip any identity headers from incoming requests at the edge, so only verified data reaches services.
- Fail closed when keys or the introspection endpoint are unavailable.

## References

- [Bearer Token Usage, RFC 6750](https://www.rfc-editor.org/rfc/rfc6750.html).
- [Step Up Authentication Challenge Protocol, RFC 9470](https://www.rfc-editor.org/rfc/rfc9470.html).
- [Resource Indicators, RFC 8707](https://www.rfc-editor.org/rfc/rfc8707.html).
- [Protected Resource Metadata, RFC 9728](https://www.rfc-editor.org/rfc/rfc9728.html).
- [DPoP, RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html).
