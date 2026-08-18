---
'@openfn/language-fhir-opensrp': major
---

Update `read()` to return full `BundleEntry` objects instead of unwrapped
resources

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
