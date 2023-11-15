---
'@openfn/language-http': patch
---

Clean up `state.response.request` by returning only
`{ method, path, host, protocol }`
