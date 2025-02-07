---
'@openfn/language-kobotoolbox': major
---

Update all functions in the main API

## Migration guide

- callbacks have removed from all functions. You can use `.then()` or `fn()` to
  access the data returned by a function, ie, `getForms().then(state => state)`
- `getForms(params, callback)` is now `getForms()`, and will download download
  assets of type survey. Use `http.get('assets/')` to retrieve other assets (and
  add query parameters)
- `getSubmissions(params, callback)` is now `getSubmissions(formId, { query })`.
- `getDeploymentInfo(params, callback)` is now `getDeploymentInfo(formId)`
