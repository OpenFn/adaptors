---
'@openfn/language-salesforce': minor
---

- Add utils helper `assertNoNesting` and `removeNestings`
- Update `bulk` to use `removeNestings`
- Add validation to `upsert`, `create` and `update` to ensure no dots are
  present in the input data
