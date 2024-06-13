---
'@openfn/language-fhir': major
---

- All HTTP methods now write `{ data, response }` to state, where data is the
  response body and response is the raw response
- All HTTP methods now support a `throwOnError` param, which defaults to true.
  If false, the adaptor will not throw if the HTTP status is <=400
- request: return { data, response } directly
- request: fix an issue where default headers would override user headers
- request: if the body contains application/json content, parse it as JSON
