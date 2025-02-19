---
'@openfn/language-http': major
---

Add a `data` argument to `put()`, `patch()` and `post()`

## Migration Guide

`put()`, `patch()` and `post()` have had their signatures changed from
`post(path, options)` to `post(path, data, options)`.

The payload attached to the body, which in 6.0 was passed on the options object
as `body`, is now the second argument to the function, and options is passed
third.

So if you used to do this:

```js
post('/patient', { body: $.patient });
```

You must edit your code to do this:

```js
post('/patient', $.patient);
```

You can still pass options to the request via the third argument:

```js
post('/patient', $.patient, { query: $.query, headers: $.headers });
```
