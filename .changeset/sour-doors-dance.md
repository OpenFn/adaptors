---
'@openfn/language-mssql': patch
---

Update tedious to 1.18.0. This should have no impact on the adaptor, but note
this version will only run in node versions 18.x and 20+ (this should be fully
compatible with all `@openfn/cli` and `@openfn/ws-worker` releases)
