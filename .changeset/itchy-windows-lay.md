---
'@openfn/language-common': minor
---

- Add `encodeFormBody` utility for encoding plain objects into `FormData`.
  Primitives are converted to strings, objects and arrays are JSON stringified,
  `Blob` and `File` values are appended as-is, and null/undefined values are
  skipped.
