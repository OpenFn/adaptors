---
'@openfn/language-asana': patch
---

Don't allow HTTP helpers to call out to different domains. This can cause a
security violation where credentials are sent to external servers. Use generic
HTTP helpers like `http.get` or `fetch` instead.
