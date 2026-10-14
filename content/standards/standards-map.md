---
title: A map of IAM standards
description: Choose the right family of standards for authentication, authorization, and provisioning.
category: standards
order: 1
updated: 2026-10-14
tags: [standards, protocols, OAuth, OIDC, SAML, SCIM, WebAuthn, LDAP, JWT]
---
IAM standards solve different problems. Before selecting one, describe the interaction: who is communicating, which trust relationship exists, and what result the recipient needs.

## The quick map

| Need | Relevant standard or family | What to read here |
| --- | --- | --- |
| Delegate access to an API | OAuth 2.0 | [OAuth](oauth.md) |
| Sign in to an application using an identity provider | OpenID Connect | [OpenID Connect](openid-connect.md) |
| Exchange identity assertions, often for enterprise SSO | SAML 2.0 | [SAML](saml.md) |
| Create and manage users and groups across systems | SCIM 2.0 | [SCIM](scim.md) |
| Authenticate with public-key credentials on the web | WebAuthn / FIDO | [Modern authentication](modern-authentication.md) |
| Access a directory | LDAP | Planned deeper coverage |
| Represent a set of claims | JWT | Read alongside the protocol that uses it |

## A format is not a complete protocol

A JWT is a token format. It does not tell you, by itself, which issuer is trusted, which keys are accepted, which recipient it is intended for, or whether it is the right kind of token for a request.

Likewise, “uses JSON” says little about the trust model. A secure integration needs the surrounding protocol, validation rules, and operational controls.

## Avoid one-protocol thinking

A business application can use OIDC for sign-in, SCIM for account management, and an application-specific API for permission assignment. Those choices can coexist.

An enterprise portfolio may support both SAML and OIDC because applications have different capabilities. Evaluate the actual integration and supported profiles rather than assuming one label describes every behavior.

## Read standards in layers

Start with the core specification, then identify security guidance, applicable profiles, errata, and your implementation's documentation. A published standard may contain older options that current security guidance advises against.

The articles in this section explain concepts. They are not complete implementation or conformance checklists.

## References

- [JWT, RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html).
- [JWT Best Current Practices, RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html).
- [LDAP technical specification roadmap, RFC 4510](https://www.rfc-editor.org/rfc/rfc4510.html).
