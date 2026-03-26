---
'@openfn/language-dagu': minor
'@openfn/language-common': minor
'@openfn/language-http': patch
---

- Add contentType support in RequestOptions

- Add `encodeFormBody` utility to `@openfn/language-common` for encoding plain
  objects into `FormData` with `json`, `raw`, and `blob` modes

- Remove inline `encodeFormBody` from `@openfn/language-http` and use the shared
  implementation from `@openfn/language-common`
