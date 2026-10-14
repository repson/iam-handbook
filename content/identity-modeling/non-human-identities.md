---
title: Workload and non-human identities
description: Model services, jobs, bots, devices, and AI agents with owners, credentials, and lifecycles of their own.
category: identity-modeling
order: 4
level: Intermediate
updated: 2026-10-14
tags: [workload identity, non-human identity, NHI, service account, machine identity, AI agents, secrets]
---
In most organizations, software identities outnumber people. Service accounts, API clients, CI/CD pipelines, scheduled jobs, devices, and automated agents all authenticate and act. They are often created quickly and rarely reviewed.

The term **non-human identity (NHI)** groups these together. The important point is not the label but the questions: who owns it, what can it do, how does it authenticate, and when does it end?

## A taxonomy

| Type | Example | Typical authentication |
| --- | --- | --- |
| Service account | A directory account used by a legacy integration. | Password or keytab. |
| OAuth client | A backend calling an API with client credentials. | Client secret, private-key JWT, or mTLS. |
| Workload | A container or function in a cloud or orchestration platform. | Platform-issued, short-lived identity document. |
| Pipeline | A CI/CD job deploying to production. | Federated token from the CI provider. |
| Device | A laptop, server, or IoT sensor. | Certificate bound to hardware where available. |
| Agent | Software, including AI agents, acting for a person or on its own. | Delegated tokens with limited scope and lifetime. |

## What changes compared with people

There is no HR record, no manager, and no interactive login. Lifecycle events come from deployments, repositories, and infrastructure changes instead of employment changes.

That means three things must be designed explicitly:

1. **Ownership.** Record an accountable team, not only the engineer who created it. Ownership transfers when teams reorganize.
2. **Lifecycle triggers.** Tie creation and removal to the system that deploys the workload, so retiring the service also retires its identity.
3. **Credential handling.** There is no person to type a password, so credentials are stored somewhere. Every stored secret is a candidate for theft.

## Prefer issued identity over stored secrets

The strongest pattern is to have the runtime platform attest the workload and issue a short-lived credential, which the workload exchanges for access. No long-lived secret is copied into configuration.

[SPIFFE](https://spiffe.io/) standardizes this idea with a workload identifier (`spiffe://trust-domain/path`) and short-lived identity documents (SVIDs) as X.509 certificates or JWTs. Cloud providers offer comparable workload identity federation. See [CI/CD workload federation](../use-cases/ci-cd-workload-federation.md) for a worked example.

Where a static secret is unavoidable, keep it in a secrets manager, scope it narrowly, rotate it, and monitor its use.

## Agents acting for people

An automated agent that acts on a person's behalf raises a delegation question: whose authority is being used? Prefer tokens that identify both the user and the acting client, limit scope and duration, and require fresh user confirmation for high-impact actions. OAuth Token Exchange defines an `act` (actor) claim for representing this delegation chain. See [advanced OAuth](../standards/oauth-extensions.md).

Avoid giving an agent a person's full session or a broadly privileged service account “to make it work”.

## A minimal inventory

For each non-human identity, record:

- Identifier, type, and the platform where it exists.
- Owning team and business purpose.
- Credential type, location, issue date, and rotation or expiry.
- Permissions and the resources they cover.
- Last observed use and normal usage pattern.

Unused identities with standing privileges and no owner are priority cleanup candidates.

## Keep learning

Apply this model in [giving a workload access to an API](../use-cases/workload-access.md), and see [privileged access management](../capabilities/privileged-access.md) for identities with elevated rights.

## References

- [SPIFFE concepts](https://spiffe.io/docs/latest/spiffe-about/spiffe-concepts/).
- [OWASP Non-Human Identities Top 10](https://owasp.org/www-project-non-human-identities-top-10/).
- [OAuth 2.0 Token Exchange, RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html).
