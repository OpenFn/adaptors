---
'@openfn/language-commcare': patch
---

Deprecate `get`, `post`, and `request`. These functions only work with CommCare's legacy v0.5 API. Use `http.get`, `http.post`, and `http.request` instead.
