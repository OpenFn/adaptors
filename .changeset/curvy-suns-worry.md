---
'@openfn/language-mysql': major
---

- Query results write to `state.data` instead of `state.response`, for
  consistency with other adaptors
- Add support for prepared statements in `sql` function.

# Migration Guide:

Transitioning from `state.response` to `state.data`

### Accessing Query Results

- **Old Way:** -
  ```js
  sql(state => `select id, name from patients limit 10`);
  log($.response.body);
  log($.response.fields);
  ```
- **New Way:**
  ```js
  sql(state => `select id, name from patients limit 10`);
  log($.data.result);
  log($.data.fields);
  ```

### Use Prepared Statements

Use prepared statements to avoid SQL injection

**Un-Prepared SQL**

```javascript
// Bad
sql(state => `select * from users where id =${state.data.userId};`);
// Potential SQL injection
```

**Prepared SQL**

```javascript
// Good
sql(`select * from users where id = ?;`, {
  values: $.data.userId,
});
// Safe from SQL injection
```
