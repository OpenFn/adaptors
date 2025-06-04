---
'@openfn/language-common': major
---

- Update `map()` to work like Array.map in js

### Migration Guide

- `map()` will return an array mapped into `state.data` if you used to do this:

```

map("$.[*]",
 create("SObject",
   field("FirstName", sourceValue("$.firstName"))
 )
)

```

You can do this instead:

```

map('$.[*]', data => {
  return { firstName: data.firstName };
});

```
