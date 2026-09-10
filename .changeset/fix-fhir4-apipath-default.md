---
'@openfn/language-fhir-4': patch
---

Fix incorrect default `apiPath` (`/fhir`) being appended to requests when `configuration.apiPath` is not set, which could produce the wrong request URL
