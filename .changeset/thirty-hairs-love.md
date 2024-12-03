---
'@openfn/language-collections': patch
---

Fix an issue where requesting a single key that does not exist throws an error,
as in:

```
collections.get('my-collection', 'some-item')
```

Note that this requires Lightning v2.10.5+
