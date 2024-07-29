---
'@openfn/language-salesforce': major
---

Fix `autoFetch` in `query()` function

- All records are merged in a single`records` array
- Results are pushed to `[0]` in `state.references`
