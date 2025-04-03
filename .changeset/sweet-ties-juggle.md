---
'@openfn/language-salesforce': major
---

- Modernize `query()` implementation using jsforce v3
- Remove `autoFetch` option from `query()` function
- Add `limit` option to `query()` function

### Migration Guide

##### What Changed

The `autoFetch` option has been removed from the query() function. Previously,
this option would automatically fetch all records when set to `true`.

**Before**

```js
// Old way - using autoFetch
query('select name from account', { autoFetch: true });
```

**After**

To fetch all records now, use the `limit: false` option:

```js
// New way - using limit: false
query('select name from account', { limit: false });
```

**Why This Changed**

This change simplifies the API and removes redundant functionality, as
`limit: false` provides the same capability in a more explicit way.
