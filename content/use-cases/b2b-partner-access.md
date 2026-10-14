---
title: Giving a partner organization access
description: Let a supplier's employees use your application through federation, with sponsorship, scope, and an end date.
category: use-cases
order: 5
level: Intermediate
updated: 2026-10-14
tags: [B2B, partners, external users, federation, guest access, sponsorship]
---
A logistics company works with a supplier whose 30 staff need access to a shipment-tracking portal. The supplier has its own identity provider. Creating and managing 30 local passwords would be slow to set up and easy to forget when people leave the supplier.

## Choose the identity model

| Option | Benefit | Risk |
| --- | --- | --- |
| Local accounts created by you | Full control over authentication. | You do not learn when the supplier's staff leave. |
| Federation with the supplier's IdP | Supplier staff use their own login; leaving the supplier ends their sign-in. | You depend on the supplier's authentication and offboarding quality. |
| Guest accounts linked to external identities | Combines a local record for authorization with external authentication. | Guests can accumulate if nobody reviews them. |

Federation, with a local record for each external user, is a common balance. See [federation and provisioning](../patterns/federation-and-provisioning.md).

## Establish the relationship, not only the trust

Before configuring OIDC or SAML, agree on the business relationship:

- An internal **sponsor** accountable for the partnership.
- A partner-side **administrator** who confirms who should have access.
- The **scope**: which applications and which data.
- An **end date** or review date for the agreement itself.
- Minimum authentication requirements, such as MFA, and how they are evidenced.
- How the partner reports leavers and security incidents.

## Configure federation narrowly

Trust the partner's issuer only for users in its own domain or tenant. Map the partner's stable subject identifier to the local record; do not link accounts by email address alone.

If your policy requires MFA, check whether the partner's assertion indicates it, for example through `amr` or `acr` claims, and decide whether to trust that claim or require your own second factor. See [identity assurance levels](../fundamentals/identity-assurance.md).

## Authorize by organization

Partner users should see only their own organization's shipments. Bind each external user to their organization, and enforce that boundary in the application on every query, as in [authorization in APIs](../patterns/api-authorization.md).

## Keep it from decaying

Partner access is often granted once and forgotten. Add controls:

- Expire external accounts that have not signed in for a defined period.
- Ask the sponsor to review the partner's user list regularly.
- When the agreement ends, disable the federation trust and all linked accounts.
- Monitor sign-ins from the partner for unusual activity.

## Test the edges

- A partner user cannot see another partner's shipments.
- A user disabled at the partner can no longer sign in.
- A user from a different organization using the same IdP platform is rejected.
- Ending the agreement removes access for everyone in it.

## References

- [NIST SP 800-63C-4](https://pages.nist.gov/800-63-4/sp800-63c.html) on federation assurance and trust agreements.
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html), including the `acr` and `amr` claims.
