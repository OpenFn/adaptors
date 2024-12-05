---
'@openfn/language-collections': patch
---

Fix an issue where reference values for setting a single item were not resolved,
eg:

```js
collections.set('my-collection', 'some-key', state => state.data);
```
