---
'@openfn/language-openmrs': patch
---

`fhir.get()`: take the next-page query from the `next` link without parsing its
host, so pagination keeps working when a proxy sends a malformed host (#1820)
