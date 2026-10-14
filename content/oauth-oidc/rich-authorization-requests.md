---
title: Rich Authorization Requests (RAR)
description: Express fine-grained, structured permissions with authorization_details when scopes are not enough.
category: oauth-oidc
order: 13
level: Advanced
updated: 2026-10-14
tags: [RAR, RFC 9396, authorization_details, fine-grained authorization, scopes, payments, consent]
---
Scopes are strings such as `payments`. They cannot express “transfer 45 EUR from account A to account B once” or “read the lab results of patient 123 for the next week”. Rich Authorization Requests (RAR, RFC 9396) add the `authorization_details` parameter: a JSON array of structured permission objects.

## The structure

Each object has a required `type`, which defines its schema, plus fields. RFC 9396 defines common optional fields:

| Field | Meaning | Example |
| --- | --- | --- |
| `type` | Required. Identifier of the authorization type. | `payment_initiation` |
| `locations` | Resource servers or URIs where the permission applies. | `["https://payments.example.test"]` |
| `actions` | Actions allowed. | `["initiate", "status", "cancel"]` |
| `datatypes` | Kinds of data requested. | `["contacts", "photos"]` |
| `identifier` | A specific resource. | `"account-12345"` |
| `privileges` | Privilege levels. | `["admin"]` |

The `type` owner defines additional fields such as amounts or creditor details.

## An example

```json
[
  {
    "type": "payment_initiation",
    "locations": ["https://payments.example.test"],
    "instructedAmount": { "currency": "EUR", "amount": "45.00" },
    "creditorName": "Merchant A",
    "creditorAccount": { "iban": "DE02100100109307118603" },
    "remittanceInformationUnstructured": "Order 1234"
  }
]
```

The client sends this URL-encoded in `authorization_details` on the authorization request, preferably through [PAR](par-and-jar.md) because it can be large and must not be tampered with.

## Through the flow

1. **Authorization request:** the client includes `authorization_details`.
2. **Consent:** the authorization server shows the user what exactly is being approved, for example “Pay 45.00 EUR to Merchant A”. Rendering each type clearly is the server's responsibility.
3. **Token response:** the server returns the granted `authorization_details`, which can be narrower than requested.
4. **Access token:** the details appear as a claim in JWT access tokens or in the introspection response.
5. **Resource server:** the API enforces them: it executes only the approved payment.

## RAR and scopes together

RAR does not replace scopes. Use scopes for coarse, long-lived access (`openid`, `profile`, `accounts.read`) and `authorization_details` for transactional or per-resource grants. A request can contain both.

## Typical use cases

- Payment initiation and account access in open banking.
- Signing a specific document with a qualified signature service.
- Access to a specific patient's records for a limited time in health care.
- Delegating a bounded task to an AI agent: “book one flight under 300 EUR for these dates”.

## Design considerations

- Publish the JSON schema for each `type` and validate requests against it.
- Advertise supported types in `authorization_details_types_supported` (authorization server metadata and [Protected Resource Metadata](discovery-and-metadata.md)).
- Decide how the server derives policy from details: amount limits, account ownership, risk scoring, step-up.
- Avoid making tokens long-lived when they carry transactional authorizations.

## References

- [OAuth 2.0 Rich Authorization Requests, RFC 9396](https://www.rfc-editor.org/rfc/rfc9396.html).
- [OAuth 2.0 Pushed Authorization Requests, RFC 9126](https://www.rfc-editor.org/rfc/rfc9126.html).
- [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0-final.html).
