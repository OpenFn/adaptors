---
'@openfn/language-common': major
---

- Re-write `map()` to work more like JavaScript's `Array.map()`.

### Migration Guide

The behaviour of the `map()` function has changed subtly but significantly.

Workflows using common <3.0 should replace `map()` with `each()`, which has the
same functionality.

If you used to do this:

```js
map('$.[*]', create('SObject', field('FirstName', sourceValue('$.firstName'))));
```

You must do this instead:

```js
each(
  '$.[*]',
  create('SObject', field('FirstName', sourceValue('$.firstName')))
);
```
