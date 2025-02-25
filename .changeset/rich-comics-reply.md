---
'@openfn/language-openmrs': major
---

Remove all callbacks.

Removed `getEncounter()`, `getEncounters()`, `getPatient()`, `searchPatient()`
and `searchPerson()`.

## Migration Guide

All removed functionality is now captured by the `get(path, options)` function
introduced in `4.10.0`. Just pass a path to the resource you need, and add a
`{ query }` options object to search.

For example:

- Instead of `getEncounters()` , do `get('encounters')`
- Instead of `getEncounter('1234')`, do `get('encounters/1234')`
- Instead of `searchPatient({ query: 'sarah' })`, do
  `get('patient', { query: 'sarah' })`
- Instead of callback arguments, you can either use `.then()`:

```js
get('encounter/1234', state => {
  // the fetched resource is on state.data
  return state;
});
```

Or use an fn block:

```js
get('encounter/1234');
fn(state => {
  // the fetched resource is on state.data
  return state;
});
```
