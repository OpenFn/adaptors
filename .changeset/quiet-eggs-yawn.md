---
'@openfn/language-commcare': minor
---

Add opt-in pagination to `http.get`

`http.get` now supports two pagination modes, both disabled by default:

- **Accumulate** — pass `paginate: true` to fetch all pages and return them
  as a single array in `state.data`:
  ```js
  http.get('case/v1', { paginate: true });
  ```
- **Stream** — pass a callback as the third argument to process each page
  individually without accumulating the full result in `state.data`:
  ```js
  http.get('case/v1', { paginate: true }, state => {
    // state.data is the current page's records only
    return state;
  });
  ```

Both modes support the v1 (offset/limit) and v2 (cursor) CommCare APIs.
In stream mode `state.data` is `{}` after the operation completes.
