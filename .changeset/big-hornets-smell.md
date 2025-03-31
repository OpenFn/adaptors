---
'@openfn/language-primero': minor
---

- Added a new http namespace, containing HTTP helpers for `get()`, `post()` and `patch()`.
- These functions will allow the users to make any requests with the `POST`, `PATCH`, and `GET` methods to `primero`.
- With these new updates, you can now do this:

```

http.get('cases', {
    query:{ remote: true }
})

```
