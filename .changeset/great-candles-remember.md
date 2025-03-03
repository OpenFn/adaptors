---
'@openfn/language-http': major
---

- Strip `callbacks` from `http`.

## Migration Guide

All functions in `http` allowed for the use of `callbacks` as the third option.
We have stripped this and allow users to use promise chaining instead.

So if you used to do this:

```js
post('/patient', { body: $.patient }, next => {
  state.results.push(next.response.body);
  return next;
});
```

You must edit your code to do this:

```js
post('/patient', $.patient).then(next => {
  state.results.push(next.response.body);
  return next;
});
```
