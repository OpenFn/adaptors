---
'@openfn/language-opencrvs': minor
---

Add v2 event-notification API support: `createEvent`, `notifyEvent`, `submitBirthNotification` (chained create+notify), and `getLocations`. The internal `request` helper now accepts a `host` option (`'gateway' | 'register' | 'countryconfig'`, default `'gateway'`), making the same option available to `http.request`/`http.post`. Existing operations (`createBirthNotification`, `queryEvents`) are unchanged and continue to target the v1 gateway; `createBirthNotification` is marked `@deprecated` for v2 deployments.
