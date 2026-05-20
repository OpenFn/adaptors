---
'@openfn/language-opencrvs': minor
---

Add v2 event-notification API support: `createEvent`, `notifyEvent`, `submitBirthNotification` (chained create+notify), and `getLocations`. The opencrvs adaptor's internal `request` helper now accepts a `host` option (`'gateway' | 'register' | 'countryconfig'`, default `'gateway'`) to target the appropriate OpenCRVS subdomain. Existing operations (`createBirthNotification`, `queryEvents`) are unchanged and continue to target the v1 gateway; `createBirthNotification` is marked `@deprecated` for v2 deployments.
