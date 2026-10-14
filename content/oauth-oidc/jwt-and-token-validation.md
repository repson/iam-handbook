---
title: JWT and token validation
description: Read a JSON Web Token's structure and apply the checks that decide whether a token can be trusted.
category: oauth-oidc
order: 8
level: Intermediate
updated: 2026-10-14
tags: [JWT, JWS, JWK, JWKS, token validation, access token, ID token, RFC 8725]
---
A JSON Web Token (JWT) is a compact way to represent claims. It is used for ID tokens, many access tokens, client authentication assertions, and security events. The format is simple; validating it correctly is where most problems occur.

## Structure

A signed JWT has three base64url-encoded parts separated by dots: `header.payload.signature`.

```jsonc
// Header
{ "alg": "ES256", "kid": "2026-10-key-1", "typ": "at+jwt" }

// Payload
{
  "iss": "https://login.example.test",
  "sub": "p-1042",
  "aud": "https://api.example.test",
  "exp": 1792000000,
  "iat": 1791999700,
  "scope": "documents.read",
  "client_id": "print-app"
}
```

The payload is encoded, not encrypted. Anyone holding the token can read it. Do not put secrets or unnecessary personal data in a signed JWT. Encrypted JWTs (JWE) exist but add complexity.

## The related specifications

| Specification | Defines |
| --- | --- |
| JWS, RFC 7515 | Signing and its serialization. |
| JWE, RFC 7516 | Encryption. |
| JWK, RFC 7517 | Representing public keys as JSON, including key sets (JWKS). |
| JWA, RFC 7518 | Algorithm identifiers such as `RS256` and `ES256`. |
| JWT, RFC 7519 | The claims set and registered claims like `iss`, `sub`, `aud`, `exp`. |
| JWT BCP, RFC 8725 | Security guidance for using JWTs. |
| JWT access tokens, RFC 9068 | A profile for OAuth access tokens in JWT format. |

## A validation checklist

A recipient should, at minimum:

1. **Restrict algorithms.** Accept only the algorithms you expect for this issuer. Reject `none`. Do not let the token's header choose between symmetric and asymmetric verification.
2. **Find the key from trusted configuration.** Use the issuer's published key set, fetched from a configured location over HTTPS, and select the key by `kid`. Never use a key embedded in the token itself unless a specification explicitly requires it and you validate the chain.
3. **Verify the signature** before trusting any claim.
4. **Check the issuer** (`iss`) matches exactly the expected issuer.
5. **Check the audience** (`aud`) contains your identifier. A token for another API must be rejected.
6. **Check time claims**: `exp` in the future, `nbf` if present, with a small clock-skew allowance.
7. **Check the token type.** An ID token is not an access token. RFC 9068 uses `typ: at+jwt` for access tokens so they cannot be confused with other JWTs.
8. **Apply protocol-specific checks**, such as `nonce` for OIDC ID tokens, then your own authorization rules.

Use a maintained library and configure it for these checks; many vulnerabilities come from defaults or from skipping a step.

## Common mistakes

| Mistake | Consequence |
| --- | --- |
| Decoding without verifying | Any user can forge claims. |
| Accepting `alg: none` or algorithm confusion | Signature checks can be bypassed. |
| Not checking `aud` | A token issued for one service is replayed against another. |
| Using an ID token to call an API | The API trusts a token never intended for it. |
| Treating a JWT as revocable | Self-contained tokens remain valid until expiry unless the recipient checks state. |
| Logging full tokens | Logs become a source of valid credentials. |

## Key rotation

Issuers rotate signing keys. Recipients should cache the key set, refresh it when they see an unknown `kid` (with rate limiting), and tolerate overlap between the old and new keys. Test rotation before an emergency forces it.

## Opaque or structured?

An access token can be a JWT validated locally or an opaque reference checked through introspection (RFC 7662). Local validation is fast but makes revocation harder; introspection gives current state at the cost of a network call. See [self-contained and opaque tokens](self-contained-and-opaque-tokens.md) for a full comparison and [token claims](token-claims.md) for the claims you will validate.

## References

- [JWT, RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html).
- [JWT Best Current Practices, RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html).
- [JWT Profile for OAuth 2.0 Access Tokens, RFC 9068](https://www.rfc-editor.org/rfc/rfc9068.html).
- [JSON Web Key, RFC 7517](https://www.rfc-editor.org/rfc/rfc7517.html).
