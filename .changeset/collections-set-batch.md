---
'@openfn/language-collections': minor
---

Add `setBatch(name, items)`, which uploads an array of `{ key, value }` pairs. This covers the case where the key cannot be derived from the value, without having to carry the key on the value itself.
