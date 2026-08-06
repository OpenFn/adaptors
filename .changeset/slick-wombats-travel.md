---
'@openfn/language-commcare': minor
---

Add `http` namespace with `http.get()`, `http.post()`, and `http.request()` for direct access to the CommCare REST API.

All functions support two URL conventions:

- **Relative paths** are automatically prefixed with `/a/<domain>/api/`, so you only need to provide the resource and version.
- **Absolute paths** (starting with `/`) are passed through unchanged, giving you full control over the URL.

```js
// Relative path — resolves to /a/my-project/api/case/v1
http.get('case/v1');

// Absolute path — used exactly as written
http.get('/a/my-project/api/case/v1');
```
