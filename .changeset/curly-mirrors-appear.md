---
'@openfn/language-http': major
---

- Add contentType option for automatic `Content-Type` header allocation.
- Add `Content-Type` header to the response.


## Breaking Changes

All the functions in the `http` adaptor would require a header object to be sent to the `options` field. 

In this new change, we are allowing the user to either pass in a header with the desired `Content-Type` or pass in a value in the `contentType` option. 

If `Content-Type` is passed, we will use the value sent, else automatically create it based on the value sent in `contentType` with the default being `json`.
