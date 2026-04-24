---
'@openfn/language-googlesheets': minor
---

`batchUpdateValues()` now accepts a `data` array of `{ range, values }` objects, enabling multi-range updates in a single API call. The existing `range` + `values` params continue to work unchanged.
