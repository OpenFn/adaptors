---
'@openfn/language-mysql': major
---

- Result use `state.data` instead of `state.response`
- Add support for prepared statements in `sql` function.

# Migration Guide:

Transitioning from `state.response` to `state.data`

### 1. Update Access to Result Data

- **Old Access:**
  - `state.response.body`
- **New Access:**
  - `state.data.result`

### 2. Update Access to Fields

- **Old Access:**
  - `state.response.fields`
- **New Access:**
  - `state.data.fields`

### Use prepared statements

Use prepared statements to avoid SQL injection

**Old Way**

```javascript
sql(state => `select * from users where id =${state.data.userId};`);
```

**New Way**

```javascript
sql(state => `select * from users where id = ?;`, {
  values: state => [state.data.userId],
});
```
