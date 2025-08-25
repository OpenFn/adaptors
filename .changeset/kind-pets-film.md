---
'@openfn/language-mssql': patch
---

Optimize query handling by:

- Revert to using `tedious.Request's callback` signature
- Remove `rowCollectionOnRequestCompletion` option from configuration
- Improve error messaging for `AggregateError` errors
