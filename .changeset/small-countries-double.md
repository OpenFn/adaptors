---
'@openfn/language-dhis2': major
---

- Implement a `util` namespace for non-operation helper functions.

- This means that if you used to do this:

```

findAttributeValueById(state.tei, 'y1w2R6leVmh')

```

do this instead:

```

util.findAttributeValueById(state.tei, 'y1w2R6leVmh');

```
