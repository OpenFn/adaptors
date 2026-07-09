---
'@openfn/language-ghana-bdr': major
---

Rewrite the adaptor for the new Ghana BDR API
(https://documenter.getpostman.com/view/26097188/2sB2qZE2N9).

Breaking changes:

- `sendBirthNotification()` has been removed. Use `createBirthRecord()`
  instead (note that the new API uses a different payload shape).
- Authentication has changed: `configuration` now requires `baseUrl` and a
  long-lived API `token` instead of `username` and `password`. Short-lived
  access tokens are fetched and refreshed automatically.
