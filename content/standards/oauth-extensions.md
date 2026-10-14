---
title: Advanced OAuth
description: Device flow, token exchange, sender-constrained tokens, pushed and rich authorization requests, and OAuth 2.1.
category: standards
order: 8
level: Advanced
updated: 2026-10-14
tags: [OAuth, device flow, token exchange, DPoP, mTLS, PAR, RAR, OAuth 2.1, FAPI]
---
The core OAuth 2.0 framework is extended by a family of specifications. Each addresses a specific gap. You rarely need all of them, but knowing what exists helps you avoid building a custom mechanism.

## Overview

| Need | Specification |
| --- | --- |
| Sign in on a device without a browser or keyboard | Device Authorization Grant, RFC 8628 |
| Exchange one token for another, or act on behalf of a user | Token Exchange, RFC 8693 |
| Bind a token to the client so a stolen token is useless | DPoP, RFC 9449; mutual TLS, RFC 8705 |
| Keep authorization request parameters out of the browser | Pushed Authorization Requests (PAR), RFC 9126 |
| Request fine-grained permissions, such as one payment | Rich Authorization Requests (RAR), RFC 9396 |
| Request a token for a specific API | Resource Indicators, RFC 8707 |
| Discover server endpoints and capabilities | Authorization Server Metadata, RFC 8414 |
| Apply current security practice | OAuth Security BCP, RFC 9700; OAuth 2.1 |

## Device authorization grant

Smart TVs, command-line tools, and IoT devices cannot easily display a full sign-in page. The device obtains a short user code and shows a URL. The user completes sign-in on a phone or computer, while the device polls the authorization server until tokens are issued.

The user code can be phished: an attacker can start a flow and persuade a victim to enter the code. Show clearly what is being authorized and restrict the flow to clients that need it.

## Token exchange

Token Exchange lets a client present one token and receive another with a different audience, scope, or subject. Two important uses:

- **Downscoping across services.** A gateway exchanges a broad user token for a token valid only for one downstream API. See [authorization in APIs](../patterns/api-authorization.md).
- **Delegation.** The new token can include an `act` claim identifying the party acting on behalf of the subject, which is useful for services and agents. See [non-human identities](../identity-modeling/non-human-identities.md).

The authorization server decides which exchanges are permitted; this policy is the security boundary.

## Sender-constrained tokens

A bearer token works for whoever holds it. Sender-constrained tokens add proof of possession:

- **DPoP** binds the token to a key the client holds. Each request carries a signed proof for that HTTP method and URL. It works at the application layer, including from browsers.
- **Mutual TLS** binds the token to the client's TLS certificate. It suits server-to-server and high-assurance environments.

Both reduce the value of tokens stolen from logs, proxies, or compromised storage.

## Pushed and rich authorization requests

With **PAR**, the client sends authorization parameters directly to the authorization server and receives a reference to use in the browser redirect. Parameters cannot be tampered with in the browser and are not exposed in URLs.

**RAR** adds an `authorization_details` parameter with structured content, such as “transfer 45 EUR to account X”, which scopes cannot express well.

## OAuth 2.1 and security profiles

OAuth 2.1 consolidates OAuth 2.0 with the security lessons published since: PKCE for authorization-code flows, exact redirect URI matching, and removal of the implicit and resource owner password credentials grants. Check its current status on the IETF datatracker; the practices it reflects are already recommended by RFC 9700.

For high-risk APIs such as open banking, the OpenID Foundation's FAPI 2.0 Security Profile combines several of these mechanisms, including PAR and sender-constrained tokens, into a single profile.

## References

- [Device Authorization Grant, RFC 8628](https://www.rfc-editor.org/rfc/rfc8628.html).
- [Token Exchange, RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html).
- [DPoP, RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html).
- [Mutual-TLS client authentication and certificate-bound tokens, RFC 8705](https://www.rfc-editor.org/rfc/rfc8705.html).
- [PAR, RFC 9126](https://www.rfc-editor.org/rfc/rfc9126.html) and [RAR, RFC 9396](https://www.rfc-editor.org/rfc/rfc9396.html).
- [OAuth 2.1 draft](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/).
- [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0-final.html).
