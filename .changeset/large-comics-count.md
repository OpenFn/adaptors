---
'@openfn/language-mysql': major
---

- Removed `query(options) ⇒ Operation` function
- Removed `sqlString(queryString) ⇒ Operation` function
- Remove `http` function from `common` exports
- Add `sql(query, options) ⇒ Operation` function

### Migration Guide

So if you were using `query()` function, you can replace it with `sql()`
function.

Before:

```js
query({ sql: 'select * from users;' });
//or
sqlString('select * from users;');
```

Now:

```js
sql('select * from users;');
```
