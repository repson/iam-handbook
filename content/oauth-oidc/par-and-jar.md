---
title: PAR and JAR — protecting the authorization request
description: Push authorization requests to the server (RFC 9126) and sign them as JWTs (RFC 9101) for integrity, confidentiality, and early validation.
category: oauth-oidc
order: 12
level: Advanced
updated: 2026-10-14
tags: [PAR, RFC 9126, JAR, RFC 9101, request object, request_uri, authorization request, FAPI]
---
In a classic OAuth flow, all authorization request parameters travel in the browser's URL. The user, browser extensions, and malware can read or change them, URLs have length limits, and the authorization server cannot authenticate the client until much later. PAR and JAR address these problems.

## Pushed Authorization Requests (PAR, RFC 9126)

The client sends the authorization parameters directly to the server over a back channel, authenticating as it would at the token endpoint. The server returns a short-lived reference.

```http
POST /par HTTP/1.1
Host: login.example.test
Content-Type: application/x-www-form-urlencoded

client_id=budget-app&response_type=code
&redirect_uri=https%3A%2F%2Fbudget.example.test%2Fcb
&scope=openid%20payments.initiate&state=af0ifjsldkj
&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256
&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion=eyJhbGciOiJFUzI1NiJ9…
```

```json
{ "request_uri": "urn:ietf:params:oauth:request_uri:6esc_11ACC5bwc014ltc14eY22c", "expires_in": 60 }
```

The browser is then redirected with only two parameters:

```text
https://login.example.test/authorize?client_id=budget-app
  &request_uri=urn%3Aietf%3Aparams%3Aoauth%3Arequest_uri%3A6esc_11ACC5bwc014ltc14eY22c
```

### Benefits

- **Integrity and confidentiality:** parameters never pass through the browser.
- **Client authentication up front:** the server knows the request comes from the genuine client before showing any UI.
- **Early validation:** errors such as an invalid redirect URI or scope are returned to the client directly, not shown to the user.
- **No size limit:** large requests, such as [rich authorization requests](rich-authorization-requests.md), fit comfortably.

Servers advertise `pushed_authorization_request_endpoint` and can set `require_pushed_authorization_requests: true`; clients can be registered with the same flag.

## JWT-Secured Authorization Requests (JAR, RFC 9101)

JAR packages the authorization parameters in a signed (and optionally encrypted) JWT called a **request object**:

```json
{
  "iss": "budget-app",
  "aud": "https://login.example.test",
  "response_type": "code",
  "client_id": "budget-app",
  "redirect_uri": "https://budget.example.test/cb",
  "scope": "openid payments.initiate",
  "state": "af0ifjsldkj",
  "nonce": "n-0S6_WzA2Mj",
  "exp": 1792000300
}
```

The request object can be passed by value (`request=<JWT>`) or by reference (`request_uri`). Its header uses `typ: oauth-authz-req+jwt`. The signature gives non-repudiation: the server can prove which client asked for what.

## PAR, JAR, or both?

| Need | Use |
| --- | --- |
| Keep parameters out of the browser, authenticate the client early | PAR |
| Non-repudiable, signed request | JAR |
| Highest assurance, for example open banking | PAR with a signed request object, as some profiles require |

FAPI 2.0 requires PAR for authorization requests; it makes signed request objects optional and specified in its message-signing profile.

## Implementation notes

- `request_uri` values must be single-use or short-lived and bound to the client that pushed them.
- Clients still need PKCE and `state`; PAR protects the request, not the response.
- Authorization servers must ignore parameters in the front-channel URL that conflict with the pushed request.

## References

- [OAuth 2.0 Pushed Authorization Requests, RFC 9126](https://www.rfc-editor.org/rfc/rfc9126.html).
- [JWT-Secured Authorization Request (JAR), RFC 9101](https://www.rfc-editor.org/rfc/rfc9101.html).
- [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0-final.html).
