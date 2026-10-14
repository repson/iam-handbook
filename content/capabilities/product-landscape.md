---
title: The IAM product landscape
description: Representative products and open-source projects for each IAM capability, with links to their official documentation and criteria for choosing.
category: capabilities
order: 6
level: Foundational
updated: 2026-10-14
tags: [products, vendors, open source, IdP, CIAM, IGA, PAM, authorization, API gateway, secrets, libraries]
---
Products change quickly; capabilities change slowly. This page maps the main product categories to the [capability map](capability-map.md) and lists representative examples with links to their official documentation.

> The lists are illustrative, alphabetical within each category, and not exhaustive. Inclusion is not an endorsement. Check current features, certifications, licensing, and support terms in each vendor's documentation.

## Identity providers and access management (workforce and customer)

Authentication, SSO, federation (OIDC, SAML), MFA, and OAuth authorization servers.

| Product | Type | Documentation |
| --- | --- | --- |
| Amazon Cognito | Cloud service | [docs.aws.amazon.com/cognito](https://docs.aws.amazon.com/cognito/) |
| Auth0 | Cloud service | [auth0.com/docs](https://auth0.com/docs) |
| authentik | Open source | [docs.goauthentik.io](https://docs.goauthentik.io/) |
| Curity Identity Server | Commercial, self-hosted or cloud | [curity.io/docs](https://curity.io/docs/) |
| Duende IdentityServer | .NET framework (commercial license) | [docs.duendesoftware.com](https://docs.duendesoftware.com/) |
| Google Cloud Identity Platform | Cloud service | [docs.cloud.google.com/identity-platform/docs](https://docs.cloud.google.com/identity-platform/docs) |
| Keycloak | Open source (CNCF) | [keycloak.org/documentation](https://www.keycloak.org/documentation) |
| Microsoft Entra ID | Cloud service | [learn.microsoft.com/entra/identity](https://learn.microsoft.com/entra/identity/) |
| Okta | Cloud service | [developer.okta.com](https://developer.okta.com/) |
| Ory (Hydra, Kratos) | Open source and cloud | [ory.com/docs](https://www.ory.com/docs/) |
| Ping Identity | Commercial, cloud and self-hosted | [docs.pingidentity.com](https://docs.pingidentity.com/) |
| ZITADEL | Open source and cloud | [zitadel.com/docs](https://zitadel.com/docs) |

The OpenID Foundation publishes a list of [certified OpenID Connect and FAPI implementations](https://openid.net/certification/), a useful neutral starting point.

## Identity governance and administration (IGA)

Lifecycle, access requests, certifications, separation of duties. See [IGA](identity-governance.md).

| Product | Documentation |
| --- | --- |
| Evolveum midPoint (open source) | [docs.evolveum.com/midpoint](https://docs.evolveum.com/midpoint/) |
| Omada | [documentation.omadaidentity.com](https://documentation.omadaidentity.com/) |
| SailPoint | [documentation.sailpoint.com](https://documentation.sailpoint.com/) |
| Saviynt | [saviynt.com](https://saviynt.com/) (product documentation requires a customer login) |

## Privileged access and secrets

Vaulting, session brokering, just-in-time elevation, and secret management. See [PAM](privileged-access.md).

| Product | Focus | Documentation |
| --- | --- | --- |
| BeyondTrust | PAM | [docs.beyondtrust.com](https://docs.beyondtrust.com/) |
| CyberArk (now Palo Alto Networks Idira) | PAM, secrets | [paloaltonetworks.com/idira](https://www.paloaltonetworks.com/idira) |
| Delinea | PAM | [docs.delinea.com](https://docs.delinea.com/) |
| HashiCorp Boundary | Session brokering | [developer.hashicorp.com/boundary/docs](https://developer.hashicorp.com/boundary/docs) |
| HashiCorp Vault / OpenBao | Secrets, dynamic credentials | [developer.hashicorp.com/vault/docs](https://developer.hashicorp.com/vault/docs), [openbao.org](https://openbao.org/) |
| Teleport | Infrastructure access | [goteleport.com/docs](https://goteleport.com/docs/) |

## Authorization engines

Externalized, fine-grained authorization. See [access control models](../patterns/access-control-models.md) and [policy engines](../patterns/policy-engines.md).

| Project | Model | Documentation |
| --- | --- | --- |
| Amazon Verified Permissions | Cedar policies (managed) | [docs.aws.amazon.com/verifiedpermissions](https://docs.aws.amazon.com/verifiedpermissions/) |
| Cedar | Policy language and engine | [docs.cedarpolicy.com](https://docs.cedarpolicy.com/) |
| Cerbos | Policy-based | [docs.cerbos.dev](https://docs.cerbos.dev/) |
| Open Policy Agent | Policy-based (Rego) | [openpolicyagent.org/docs](https://www.openpolicyagent.org/docs/latest/) |
| OpenFGA | Relationship-based | [openfga.dev/docs](https://openfga.dev/docs) |
| SpiceDB | Relationship-based | [authzed.com/docs](https://authzed.com/docs) |

## API gateways

Token validation, rate limiting, and policy enforcement at the edge. See [API gateway policies](../patterns/api-gateway-policies.md).

| Product | Documentation |
| --- | --- |
| Amazon API Gateway | [docs.aws.amazon.com/apigateway](https://docs.aws.amazon.com/apigateway/) |
| Apigee | [docs.cloud.google.com/apigee/docs](https://docs.cloud.google.com/apigee/docs) |
| Azure API Management | [learn.microsoft.com/azure/api-management](https://learn.microsoft.com/azure/api-management/) |
| Envoy (open source) | [envoyproxy.io/docs](https://www.envoyproxy.io/docs) |
| Kong Gateway | [developer.konghq.com](https://developer.konghq.com/) |

## Workload identity

| Project | Documentation |
| --- | --- |
| SPIFFE / SPIRE (open source, CNCF) | [spiffe.io/docs](https://spiffe.io/docs/latest/) |
| Cloud workload identity federation | See each cloud provider's IAM documentation. |

## Client libraries

Use maintained, preferably certified, libraries rather than writing protocol code.

| Library | Platform | Documentation |
| --- | --- | --- |
| AppAuth | iOS, Android, JS | [appauth.io](https://appauth.io/) |
| Authlib | Python | [docs.authlib.org](https://docs.authlib.org/) |
| jose, openid-client | Node.js and browsers | [github.com/panva/jose](https://github.com/panva/jose), [github.com/panva/openid-client](https://github.com/panva/openid-client) |
| MSAL | Multiple platforms | [learn.microsoft.com/entra/identity-platform/msal-overview](https://learn.microsoft.com/entra/identity-platform/msal-overview) |
| Nimbus JOSE + JWT, Nimbus OAuth | Java | [connect2id.com/products/nimbus-jose-jwt](https://connect2id.com/products/nimbus-jose-jwt) |
| Spring Security OAuth 2.0 | Java | [docs.spring.io/spring-security](https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html) |

## How to choose

| Criterion | Questions |
| --- | --- |
| Standards | Which OIDC, SAML, SCIM, and OAuth extensions (PAR, DPoP, RAR) are supported? Is it certified? |
| Populations | Workforce, customers, partners, workloads? At what scale? |
| Deployment | Cloud, self-hosted, hybrid? Data residency requirements? |
| Extensibility | Custom flows, hooks, claims, connectors? |
| Operations | SLA, disaster recovery, key rotation, upgrades, observability? |
| Security | Admin protection, audit logs, phishing-resistant MFA, tenant isolation? |
| Exit | Can users, credentials, and configuration be exported? How hard is migration? |
| Cost | Pricing per user, per active user, per connection, or per API call? |

Run a proof of concept with your own hardest use cases, such as a rehire, a partner federation, or a step-up flow, before deciding.
