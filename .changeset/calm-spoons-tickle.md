---
'@openfn/language-collections': minor
---

BREAKING: Pass state into the keygen function on `set()`. This allows state to
be used to calculate keys.

When calling `collections.set(collection, keygen, values)`, the keygen function
signature has changed from `(value, index) => key` to
`(value, state, index) => key`.
