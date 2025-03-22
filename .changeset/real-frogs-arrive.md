---
'@openfn/language-salesforce': major
---

## Breaking Change

Previously, `http.get()`, `http.post()`, etc. could be used to make HTTP
requests to any external system. These functions have been removed and replaced
with Salesforce-only HTTP operations.

### What Changed?

- Removed general-purpose HTTP functions (`http.get()`, `http.post()`, and
  `http.request()`)
- HTTP operations are now restricted to Salesforce API endpoints only

### Required Changes

#### Before:

```js
// This used to work for any external API
http.get('https://external-api.com/data');
http.post('https://another-service.com/endpoint', data);
```

#### After

```js
// Only Salesforce API operations are supported
http.get('Account', { query: { start: '2025-03-03' } });
http.post('Contact', { Name: 'test' });
```

#### Migration Steps

1. For Salesforce operations: Continue using `http.get()`, `http.post()`, etc.

2. For non-Salesforce HTTP requests:

   - Move these operations to a different adaptor (like `@openfn/language-http`)
   - Or use `@openfn/language-common` for generic HTTP operations
