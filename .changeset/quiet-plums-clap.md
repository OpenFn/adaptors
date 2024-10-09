---
'@openfn/language-http': patch
---

- Fix an issue where an error is thrown if `state.configuration` is `null`
- better error when `baseUrl` is not set and the passed url is a relative url.
- better error when `baseUrl` is not set and no url is provided.
