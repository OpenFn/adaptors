---
'@openfn/language-postgresql': major
---

- remove callbacks support in all functions
- add examples for parameterized query statements
- export `cursor` and `assert` from common
- export `util.format` from `pg-format`

### Migration Guide

The callback parameter has been removed from all adaptor functions. If you need
to perform operations after a function completes, use promise chaining with
`.then()` instead.

#### Functions affected:

- `sql()`
- `insert()`
- `insertMany()`
- `upsert()`
- `upsertIf()`
- `upsertMany()`
- `describeTable()`
- `insertTable()`
- `modifyTable()`

#### Examples

**sql() - Before**

```js
sql(
  { text: 'SELECT * FROM users WHERE id = $1', values: [1] },
  { writeSql: true },
  state => {
    console.log('Query completed:', state.data);
    return state;
  }
);
```

**sql() - After**

```js
sql(
  { text: 'SELECT * FROM users WHERE id = $1', values: [1] },
  { writeSql: true }
).then(state => {
  console.log('Query completed:', state.data);
  return state;
});
```
