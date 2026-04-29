---
'@openfn/language-browserless': patch
---

Fix `baseUrl` in the credential configuration schema. The field is required and has `minLength: 1`, so the previously declared `["string", "null"]` type was contradictory and also crashed the OpenFn credential form on render.
