# @openfn/language-fhir-opensrp

## 2.0.1 - 03 September 2026

### Patch Changes

- fd1b2be: Security update
- Updated dependencies \[654026d]
- Updated dependencies \[96c6822]
- Updated dependencies \[fd1b2be]
  - @openfn/language-common@3.3.5
  - @openfn/language-fhir-4@0.6.0

## 2.0.0 - 18 August 2026

### Major Changes

- c6621d3: Update `read()` to return full `BundleEntry` objects instead of
  unwrapped resources

  Each item in `state.data` is a full `BundleEntry` —
  `{ fullUrl, resource, search }` — so resource content now lives at
  `entry.resource`.

  **Before**

  ```js
  read('Patient', { query: { _count: 50 } });
  fn(state => {
    const ids = state.data.map(p => p.id);
    return { ...state, ids };
  });
  ```

  **After**

  ```js
  read('Patient', { query: { _count: 50 } });
  fn(state => {
    const ids = state.data.map(e => e.resource.id);
    return { ...state, ids };
  });
  ```

## 1.1.0 - 12 August 2026

### Minor Changes

- 5fdaff6: `read()` now auto-paginates FHIR Bundle responses, returning all
  resources as a flat array in `state.data`.

  ```js
  // Auto-paginate — fetches all pages, 50 resources per request
  read('Patient', { query: { _count: 50 } });

  // Set _getpagesoffset to fetch resources page without auto-pagination
  read('Patient', { query: { _getpagesoffset: 100, _count: 50 } });

  // Non-Bundle responses (e.g. metadata) are returned as-is in state.data
  read('metadata');
  ```

## 1.0.0

Implemented the `fhir-opensrp` adaptor with `create()`, `read()`, `delete()`,
`update()` and `request()` methods.

Exported `fhir-4` builder helper functions for the fhir resources
