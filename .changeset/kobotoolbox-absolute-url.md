---
'@openfn/language-kobotoolbox': patch
---

Throw a clear error when a request path is an absolute URL (`https://...` or
`//...`) instead of failing with "Invalid URL" or quietly requesting a path on
the Kobo server (#1168)
