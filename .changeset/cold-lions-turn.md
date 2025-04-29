---
'@openfn/language-progres': major
---

- Migrate from `common.http` to `common.request`.
- Remove `axios` and `nock` from progres.
- Remove exportation of `http` from `common`, and the exportation of `axios`.
- With the switch to `common-request` the function pattern changes from:

```
  postData({
   url: urlDTP,
   body: obj,
   headers: {
     'Ocp-Apim-Subscription-Key': configuration['Ocp-Apim-Subscription-Key'],
   },
   agentOptions: {
     key,
     cert,
   },
  }, callback)(state)

```

to this:

```
  postData({
   url: urlDTP,
   body: obj,
   headers: {
     'Ocp-Apim-Subscription-Key': configuration['Ocp-Apim-Subscription-Key'],
   },
   agentOptions: {
     key,
     cert,
   },
  }, callback)

```
