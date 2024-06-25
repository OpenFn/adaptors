---
'@openfn/language-mailchimp': major
---

This update contains changes to the HTTP helpers (`get`, `post` etc):

- Properly handle 204 responses (ie, success with no body)
- On error, throw the mailchimp JSON body, which is full of useful info
- Slightly change the shape of the returned state
- Better log output

This update contains one breaking change on the http helpers:

- state.response is now `{ headers, statusCode, body }` (it used to just be
  `body`)
