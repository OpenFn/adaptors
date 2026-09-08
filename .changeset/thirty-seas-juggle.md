---
'@openfn/language-commcare': patch
---

Deprecate `get`, `post`, and `request`. These functions only work with CommCare's legacy v0.5 API. Use `http.get`, `http.post`, and `http.request` instead.

Note that `get`/`post`/`request` hard-code the `v0.5` version segment into the URL, but the `http.*` functions do not add a version automatically — you must include `v0.5` yourself in the path to get the same behaviour.

```js
// before
get('/case/12345');
// after
http.get('v0.5/case/12345');

// before
post('/user', { username: 'test', password: 'somepassword' });
// after
http.post('v0.5/user', { username: 'test', password: 'somepassword' });

// before
request('GET', '/a/asri/api/v0.5/case');
// after
http.request('GET', 'v0.5/case');
```
