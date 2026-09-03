---
'@openfn/language-commcare': patch
---

Deprecate `get`, `post`, and `request`. These functions only work with CommCare's legacy v0.5 API. Use `http.get`, `http.post`, and `http.request` instead.

Note that the URL structure changes: the version segment moves from before the resource (`v0.5/case`) to after it (`case/v2`). Update the path itself, not just the function name.

```js
// before
get('/case/12345');
// after
http.get('case/v2/12345');

// before
post('/user', { username: 'test', password: 'somepassword' });
// after
http.post('user/v2', { username: 'test', password: 'somepassword' });

// before
request('GET', '/a/asri/api/v0.5/case');
// after
http.request('GET', 'case/v2');
```
