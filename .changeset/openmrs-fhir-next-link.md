---
'@openfn/language-openmrs': patch
---

`fhir.get()`: fetch next pages from `instanceUrl` so a malformed or different
host in the `next` link no longer causes redirect loops or `400` errors (#1820)
