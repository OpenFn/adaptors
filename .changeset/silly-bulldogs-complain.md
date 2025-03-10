---
'@openfn/language-dhis2': minor
---

- Implement a namespaced `http` for all generic functions.
- Add a generic request function in the `http` file.
- Remove all callbacks

### Migration Change

If you used to do this:

```
get('programs', { orgUnit: 'TSyzvBiovKh', fields: '*' });

```

Do this instead: 

```
http.get('programs', { orgUnit: 'TSyzvBiovKh', fields: '*' });

```

