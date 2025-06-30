---
'@openfn/language-openfn': major
---

## Breaking Changes

- Add support for v2 API
- Drop support for v1 API
- Remove unused dependencies
- Add `post()` and `get()` functions
- Update `request()` function signature to `request(method, path, options)`.

### Request Function Signature Change

The `request()` function now uses a more explicit parameter structure instead of
a single options object.

**Old syntax (v1):**

```js
request({
  method: 'POST',
  path: 'jobs',
  data: {
    trigger_id: 1,
    expression: 'fn(state => state)',
  },
});
```

**New syntax (v2):**

```js
request('POST', 'jobs', {
  body: {
    trigger_id: 1,
    expression: 'fn(state => state)',
  },
});
```
