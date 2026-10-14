---
title: Native and mobile apps
description: Apply RFC 8252 to iOS, Android, and desktop apps, store tokens safely, and decide when a mobile BFF helps.
category: patterns
order: 7
level: Intermediate
updated: 2026-10-14
tags: [mobile, native apps, RFC 8252, AppAuth, PKCE, redirect URI, universal links, app links, keychain, keystore, BFF]
---
Native applications are public clients: anything shipped in an app package can be extracted. RFC 8252, *OAuth 2.0 for Native Apps*, describes how to use OAuth safely from mobile and desktop apps.

## Use the system browser, not a WebView

Authorization requests must go through an **external user agent**:

| Platform | Recommended mechanism |
| --- | --- |
| iOS, macOS | `ASWebAuthenticationSession` |
| Android | Custom Tabs (with a browser fallback) |
| Desktop | The default system browser |

An embedded WebView lets the app read the user's credentials and cookies, and users cannot verify the address bar. Many identity providers block WebViews for this reason. The system browser also shares the SSO session across apps and supports passkeys.

## Redirect URIs

| Type | Example | Notes |
| --- | --- | --- |
| Claimed HTTPS URL | `https://app.example.test/oauth/callback` | Preferred. Universal Links (iOS) or App Links (Android) prove the app owns the domain. |
| Private-use URI scheme | `com.example.app:/oauth/callback` | Use a reverse-domain scheme; another app could register the same scheme, so PKCE is essential. |
| Loopback | `http://127.0.0.1:{port}/callback` | Desktop apps; the server must accept any port. |

## The flow

Authorization code + PKCE, with no client secret. Use a maintained library such as [AppAuth](https://appauth.io/) or the identity provider's SDK rather than implementing the flow by hand.

## Storing tokens

- Keep refresh tokens in the platform's secure storage: Keychain on Apple platforms, Android Keystore–backed encrypted storage on Android.
- Gate refresh-token use behind local biometrics or device credentials for sensitive apps.
- Keep access tokens in memory where possible.
- Never log tokens or include them in crash reports and analytics.

## Proving the app is genuine

Because a public client cannot authenticate, anyone can impersonate the app's `client_id`. Platform attestation services, such as Apple App Attest and Google Play Integrity, can provide evidence that requests come from a genuine app on a genuine device. Standards for using attestation in OAuth client authentication are being developed at the IETF. DPoP can additionally bind tokens to a key stored in secure hardware.

## Do you need a mobile BFF?

Unlike browsers, mobile apps have secure storage and are less exposed to script injection, so a BFF is not required. It can still help when:

- Several backend APIs need tokens the app should not hold.
- Business logic or API aggregation already lives in a backend.
- You want to revoke and observe all access centrally.

The trade-off is a session between app and BFF that must itself be protected, for example with a token stored in secure storage and bound to the device.

## Native sign-in without a browser

Some products want a fully native login UI. Collecting passwords in the app reintroduces the risks OAuth avoids, and the resource owner password grant must not be used. The IETF is working on *OAuth 2.0 for First-Party Applications*, which defines a native, challenge-based flow for first-party apps; check its status before adopting it.

## References

- [OAuth 2.0 for Native Apps, RFC 8252](https://www.rfc-editor.org/rfc/rfc8252.html).
- [AppAuth](https://appauth.io/) for iOS, Android, and JavaScript.
- [Apple: ASWebAuthenticationSession](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession).
- [Android: Custom Tabs](https://developer.chrome.com/docs/android/custom-tabs).
- [OAuth 2.0 for First-Party Applications (IETF draft)](https://datatracker.ietf.org/doc/draft-ietf-oauth-first-party-apps/).
- [OWASP Mobile Application Security](https://mas.owasp.org/).
