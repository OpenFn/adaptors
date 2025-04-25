---
'@openfn/language-dhis2': major
---

- Added a new http namespace, containing HTTP helpers for `get()`, `post()` and `patch()`.
- Added a `request()` function in the `http` file.
- Remove all callbacks

### Migration Change

If you used to do this:

```
get('programs', { query: { orgUnit: 'TSyzvBiovKh', fields: '*' }});

```

Do this instead: 

```
http.get('programs', { query: { orgUnit: 'TSyzvBiovKh', fields: '*' } });

```

