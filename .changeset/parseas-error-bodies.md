---
"@openfn/language-common": patch
---

Pass parseAs into assertOK so error response bodies are parsed as JSON instead of left as strings (e.g. application/fhir+json)
