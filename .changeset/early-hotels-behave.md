---
'@openfn/language-dhis2': major
---

- The options parameter has been removed entirely from the `get` and `create` functions.
- You can no longer pass `headers` or `content types` or `base64` to the `get` and `create` functions, use `http.get()` or `http.post()` for this.

### Migration Guide:

- If you used to do this `get(resourceType, options)` where:

```
get('tracker/enrollments', {
 query:{ orgUnit: 'TSyzvBiovKh'}
});

```

- You can now do this `get(path, params)`:

```
get('tracker/enrollments', {
  orgUnit: 'TSyzvBiovKh',
});

```
