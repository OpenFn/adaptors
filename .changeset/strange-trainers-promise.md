---
'@openfn/language-odk': patch
---

Small fixes includes

- ODK uses email, not username. This changes the config schema so it matches
  what ODK wants and what their documentation provides.
  (https://docs.getodk.org/central-api-authentication/)
- By manually concatenating the baseUrl and the path in the adaptor, rather than
  relying on commonRequest to do so, we lost the ability to handle /
  addition/omission. We don't want users to have to figure out if they should or
  shouldn't put / in various places.
- This adds a log to explain that authentication failed.
- This removes the try/catch so that users can see the helpful error message
  returned by commonRequest`
