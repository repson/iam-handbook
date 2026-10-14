---
title: OAuth and OIDC threats and mitigations
description: The attacks described in the OAuth Security BCP and the controls that prevent them.
category: oauth-oidc
order: 15
level: Advanced
updated: 2026-10-14
tags: [OAuth security, RFC 9700, threats, CSRF, mix-up, code injection, open redirect, token leakage, consent phishing]
---
OAuth is a framework with many options, and most real-world incidents come from how it is deployed rather than from the core protocol. RFC 9700, the OAuth 2.0 Security Best Current Practice, collects the lessons learned. This page summarizes the main threats and the controls that address them.

## Threats and controls

| Threat | What happens | Controls |
| --- | --- | --- |
| Redirect URI manipulation | A loose redirect match sends codes or tokens to an attacker. | Exact string matching of registered redirect URIs. |
| Authorization code interception or injection | An attacker steals or injects a code into another session. | PKCE for all clients; one-time codes bound to the client. |
| CSRF on the client callback | An attacker logs the victim into the attacker's account. | PKCE, `state`, or OIDC `nonce`. |
| Mix-up attack | A client using several servers sends a code to the wrong one. | `iss` response parameter (RFC 9207); per-server redirect URIs. |
| Open redirector | A trusted domain forwards users to a malicious site. | Do not redirect to unregistered URIs, including on errors. |
| Token leakage via URLs | Tokens in fragments or query strings leak through history and referrers. | Code flow instead of implicit; no tokens in URLs; `Referrer-Policy`. |
| Stolen access or refresh tokens | Tokens replayed from logs, storage, or malware. | Short lifetimes, refresh rotation, [DPoP](dpop.md) or mTLS. |
| Token replay at another API | A token for one API is accepted by another. | Audience restriction (`aud`, RFC 8707 `resource`). |
| Credential exposure in clients | Secrets extracted from mobile or SPA code. | Public clients with PKCE; no embedded secrets. |
| Clickjacking of the consent page | The consent UI is framed and the user is tricked into clicking. | `frame-ancestors` CSP and `X-Frame-Options`. |
| Consent phishing | A malicious app gets users to grant broad scopes. | Admin consent policies, verified publishers, scope review, monitoring. |
| Resource owner password grant | Clients handle user passwords directly. | Do not use; RFC 9700 says it must not be used. |
| Implicit grant | Access tokens delivered in the browser front channel. | Do not use; use authorization code with PKCE. |

## OpenID Connect–specific checks

- Validate the ID token's `iss`, `aud`, `exp`, signature, and `nonce`.
- Do not accept an ID token as an API access token.
- Do not link or create accounts from an unverified `email` claim.
- With several providers, key users on (`iss`, `sub`) to avoid cross-provider account takeover.

## A deployment checklist

1. Authorization code + PKCE (`S256`) for every client that involves a user.
2. Exact redirect URI matching; no wildcards.
3. Confidential clients use `private_key_jwt` or mutual TLS where possible.
4. Access tokens are audience-restricted and short-lived.
5. Refresh tokens rotate or are sender-constrained.
6. Sensitive APIs require DPoP or mTLS-bound tokens.
7. Authorization requests for sensitive operations use [PAR](par-and-jar.md).
8. Metadata `issuer` and token `iss` are validated.
9. Consent screens clearly show the client, scopes, and authorization details.
10. Logs exclude tokens and codes; anomalies in token issuance are monitored.

## Formal analysis and profiles

Security researchers have formally analyzed OAuth and OIDC, leading to many of these recommendations. For high-risk environments, the FAPI 2.0 Security Profile packages these controls into a single profile with a formally analyzed attacker model.

## References

- [OAuth 2.0 Security Best Current Practice, RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html).
- [OAuth 2.0 Threat Model and Security Considerations, RFC 6819](https://www.rfc-editor.org/rfc/rfc6819.html).
- [Authorization Server Issuer Identification, RFC 9207](https://www.rfc-editor.org/rfc/rfc9207.html).
- [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0-final.html).
- [OWASP OAuth 2.0 Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html).
