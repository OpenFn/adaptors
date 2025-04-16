---
'@openfn/language-salesforce': major
---

- Modernize `query()` implementation using jsforce v3
- Remove `autoFetch` option from `query()` function
- Add `max` option to `query()` function
- Change query result structure:
  - `state.data` now contains only the array of records
  - Query metadata (`done`, `totalSize`, `nextRecordsUrl`) moved to
    `state.response`

### Migration Guide

##### What Changed

1. The `autoFetch` option has been removed from the `query()` function.
   Previously, this option would automatically fetch all records when set to
   `true`.

2. The query result structure has been updated:
   - Previously: `state.data` contained
     `{ done, totalSize, records: [], nextRecordsUrl }`
   - Now:
     - `state.data` contains only the array of records
     - `state.response` contains `{ done, totalSize }` and `nextRecordsUrl` when
       there are more records to fetch (`done: false`)

**Before**

```js
// Old way - using autoFetch
query('select name from account', { autoFetch: true });
// Result: state.data = { done, totalSize, records: [] }
```

**After**

To fetch all records now, use the `max: Infinity` option:

```js
// New way - using max: Infinity
query('select name from account', { max: Infinity });
// Result:
// state.data = [] // Array of records
// state.response = { done, totalSize }
```
