---
title: Offboarding a leaver urgently
description: Remove all access for a departing person immediately and prove that it worked.
category: use-cases
order: 3
level: Intermediate
updated: 2026-10-14
tags: [offboarding, leaver, termination, revocation, sessions, evidence]
---
Daniel, a systems engineer with administrative access, is being dismissed this afternoon. HR asks that his access end at the moment the meeting starts, at 15:00. A normal overnight offboarding job is not enough.

This example applies [joiner, mover, leaver](../processes/joiner-mover-leaver.md) and [sessions, tokens, and revocation](../processes/sessions-and-revocation.md) under time pressure.

## Prepare before 15:00

Without alerting Daniel, the IAM and security teams build an inventory:

- Central directory and identity provider accounts.
- A separate administrative account, and any privileged role eligibility.
- Applications outside SSO with local accounts.
- Personal access tokens, API keys, and SSH keys he created.
- Service accounts or automation he owns or knows the credentials for.
- Shared secrets in vaults he could read.
- Devices: laptop, phone with company data, hardware security keys.

The inventory comes from the identity model, not from memory. Gaps found here are lessons for the regular process.

## Execute at 15:00

The order matters: stop new access, then end existing access, then remove standing paths.

1. Disable the central account and administrative account in the identity provider and directory.
2. Revoke refresh tokens and terminate identity provider sessions.
3. Terminate sessions in critical applications that do not re-check the identity provider.
4. Remove privileged role eligibility and active elevations.
5. Revoke personal access tokens, API keys, and SSH keys.
6. Disable local accounts in non-federated applications.
7. Wipe or lock company data on mobile devices and disable the laptop's access.

## Handle what he knew

Daniel may know shared credentials: a service account password, a break-glass procedure, or a network device's local admin password. Rotate each one. This is why shared credentials are costly, and why vaulting and [just-in-time access](../patterns/just-in-time-access.md) reduce the work.

Transfer ownership of his service accounts, scheduled jobs, and applications to his team, so nothing breaks silently when his account is disabled.

## Verify and record

Do not rely on “the workflow completed”. Check:

- A sign-in attempt with his account fails.
- Recent sign-in logs show no activity after 15:00.
- Each high-risk application shows the account as disabled.
- Tokens and keys listed in the inventory no longer work.

Record times for each step. This evidence shows auditors that the termination was effective and reveals which steps were slow.

## Afterwards

Retain business data and mailbox content according to legal and retention requirements; disabling access is separate from deleting records. Keep monitoring for any use of rotated credentials during the following days.

Finally, review the exercise: which access paths were missing from the inventory, and which steps should be automated for the next case?

## References

- [NIST SP 800-53 Rev. 5, PS-4 Personnel Termination and AC-2 Account Management](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final).
