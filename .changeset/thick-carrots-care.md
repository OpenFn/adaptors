---
'@openfn/language-kobotoolbox': major
---

Update `http.request` option docs to use `data` instead of `body` in requests


### Migration Guide
- The `http.request()` function now uses `data` in stead of `body` for the body data.

#### Before 

```
http.request('PATCH', `assets/aDReHdA7UuNBYsiCXQBr43/data/bulk/`, {
  body: {
    submission_ids: ['aDReHdA7UuNBYsiCXQBr43'],
    data: {
      Transaction_status: 'success',
    },
  },
});

```

#### Now

```
http.request('PATCH', `assets/aDReHdA7UuNBYsiCXQBr43/data/bulk/`, {
  data: {
    submission_ids: ['aDReHdA7UuNBYsiCXQBr43'],
    data: {
      Transaction_status: 'success',
    },
  },
});

```

