---
'@openfn/language-godata': major
---

Move godata onto the current adaptor template.

Breaking changes:

- Callback arguments have been removed from every operation. A callback passed
  as the last argument is now ignored. Chain with `.then()` or a following
  `fn()` instead:

  ```js
  // before
  listCases('343d-dc3e', state => { /* ... */ return state; });
  // after
  listCases('343d-dc3e').then(state => { /* ... */ return state; });
  ```

- A failed HTTP request now fails the operation. Previously the error was
  swallowed and returned as state, so failed runs could look successful.
- An upsert that matches more than one record now throws
  `UPSERT_MULTIPLE_MATCHES`. Previously it logged a message and returned no
  state.
- The session token is now sent in an `Authorization: Bearer` header instead of
  the `access_token` query string.
- The `axios` export has been removed.

Other changes:

- Add generic HTTP helpers: `request`, `get`, `post`, `put`, `patch` and `del`.
  Use them to reach any GoData endpoint, e.g. follow-ups, teams or users.
- Every operation now writes `state.response` (status code, headers, url) next
  to `state.data`.
- All arguments accept lazy state references, e.g. `listCases($ => $.outbreakId)`.
- `execute` no longer calls `process.exit(1)` on error.
- Every request is logged with its method, url, query, status and duration.
  Failed requests also log the response body.
