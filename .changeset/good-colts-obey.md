---
'@openfn/language-salesforce': minor
---

- Add utils helper `validateNoDotKeys` and `flattenData`
- Update `bulk` to use `flattenData`
- Add validation to `upsert`, `create` and `update` to ensure no dots are
  present in the input data
