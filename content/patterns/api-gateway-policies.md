---
title: API gateway security policies
description: Authentication, authorization, traffic, and threat-protection policies at the API edge, with examples from common gateways.
category: patterns
order: 5
level: Intermediate
updated: 2026-10-14
tags: [API gateway, policies, JWT validation, rate limiting, ext_authz, Envoy, Azure API Management, Apigee, Kong, AWS API Gateway]
---
An API gateway sits between clients and services. It is a good place to enforce consistent, coarse-grained policies once instead of in every service. It is not a substitute for object-level authorization inside the service; see [authorization in APIs](api-authorization.md).

## Policy categories

| Category | Typical policies | Purpose |
| --- | --- | --- |
| Authentication | JWT validation, token introspection, mTLS, API keys. | Establish which client and user are calling. |
| Coarse authorization | Required scopes or claims per route; external authorization call. | Reject clearly unauthorized calls early. |
| Token handling | Phantom token, token exchange, header injection. | Present services with a trustworthy, minimal identity. |
| Traffic management | Rate limits, quotas, spike arrest, concurrency limits. | Protect availability and enforce plans. |
| Threat protection | Payload size limits, JSON/XML schema validation, content-type checks. | Block malformed or abusive requests. |
| Transport | TLS versions, mTLS to backends, IP allow lists. | Secure the connection. |
| Browser rules | CORS. | Control which web origins can call the API. |
| Observability | Audit logging, correlation IDs, metrics. | Investigate and detect abuse. |

## Authentication policies

**JWT validation** checks signature, issuer, audience, expiry, and required claims using the issuer's JWKS. **Introspection** handles opaque tokens. **mTLS** authenticates clients by certificate.

**API keys identify an application, not a user.** They are long-lived shared secrets, often embedded in clients. Use them for metering and coarse identification, not as the only protection for user data.

## Example: Envoy JWT authentication filter

```yaml
http_filters:
- name: envoy.filters.http.jwt_authn
  typed_config:
    "@type": type.googleapis.com/envoy.extensions.filters.http.jwt_authn.v3.JwtAuthentication
    providers:
      example_idp:
        issuer: https://login.example.test
        audiences: [https://api.example.test]
        remote_jwks:
          http_uri:
            uri: https://login.example.test/jwks
            cluster: idp
            timeout: 5s
        forward: false
    rules:
    - match: { prefix: /orders }
      requires: { provider_name: example_idp }
```

For decisions beyond token validity, Envoy's **external authorization** filter (`ext_authz`) calls a policy service, such as Open Policy Agent, for every request. See [policy engines](policy-engines.md).

## Example: Azure API Management `validate-jwt`

```xml
<validate-jwt header-name="Authorization" require-scheme="Bearer"
              failed-validation-httpcode="401">
  <openid-config url="https://login.example.test/.well-known/openid-configuration" />
  <audiences><audience>https://api.example.test</audience></audiences>
  <issuers><issuer>https://login.example.test</issuer></issuers>
  <required-claims>
    <claim name="scope" match="any" separator=" ">
      <value>orders.read</value>
    </claim>
  </required-claims>
</validate-jwt>
```

Other gateways offer equivalent features: JWT authorizers and Lambda authorizers in AWS API Gateway, the OAuthV2 and VerifyJWT policies in Apigee, and the JWT and OpenID Connect plugins in Kong.

## Header hygiene

- **Strip** incoming headers that services treat as identity, such as `X-User-Id`, before adding verified values.
- **Forward** only what services need: a validated token, or a minimal signed internal token.
- **Remove** sensitive response headers such as server versions.

## Rate limiting by identity

Limits per IP address are easy to evade and can block shared networks. Prefer limits keyed by `client_id`, by subject, or by API key, with separate limits for expensive operations such as login, token issuance, and search.

## What the gateway should not do alone

- Decide whether a user may access a specific object.
- Hold the only copy of authorization logic that services also need.
- Be the only control between the internet and services that are also reachable directly.

## References

- [Envoy JWT Authentication filter](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/jwt_authn_filter) and [External Authorization filter](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_authz_filter).
- [Azure API Management: validate-jwt policy](https://learn.microsoft.com/azure/api-management/validate-jwt-policy).
- [AWS API Gateway: JWT authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html).
- [Apigee: OAuthV2 policy](https://docs.cloud.google.com/apigee/docs/api-platform/reference/policies/oauthv2-policy).
- [Kong Gateway documentation](https://developer.konghq.com/gateway/).
- [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x11-t10/), including API4 Unrestricted Resource Consumption.
