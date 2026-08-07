---
'@openfn/language-fhir-opensrp': minor
---

`read()` now auto-paginates FHIR Bundle responses, returning all resources as a flat array in `state.data`.

```js
// Auto-paginate — fetches all pages, 50 resources per request
read('Patient', { query: { _count: 50 } });

// Set _getpagesoffset to fetch resources page without auto-pagination
read('Patient', { query: { _getpagesoffset: 100, _count: 50 } });

// Non-Bundle responses (e.g. metadata) are returned as-is in state.data
read('metadata');
```
