---
'@openfn/language-salesforce': minor
---

- Add utils functions `assertNoNesting` and `removeNestings`
- Update `@openfn/langauge-common` package to `workspace:*`
- Use `throwError` function from common to throw errors for `assertNoNesting`
  and `removeNestings` functions
- Asserts input data for `upsert`, `create` and `update` to be an object or
  array of objects
- Update `bulk` to use `removeNestings`
