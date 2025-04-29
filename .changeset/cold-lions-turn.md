---
'@openfn/language-progres': major
---

- Migrate from `axios` to `common.request`.
- Remove `axios` and `nock` from progres.
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
