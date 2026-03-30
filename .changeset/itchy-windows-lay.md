---
'@openfn/language-common': minor
---

- Add `encodeFormBody` utility for encoding plain objects into `FormData`.
  Supports `json` mode (default — primitives as strings, objects/arrays as JSON)
  and `raw` mode (values appended as-is).
