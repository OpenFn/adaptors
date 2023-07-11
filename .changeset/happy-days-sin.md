---
'@openfn/language-googlehealthcare': major
---

remove `projectId`, `dataSetId`, `cloudRegion`, and `fhirStoreId` out of
configuration

The new implementation of `createFhirResource(fhirStore, resource, callback)`
allows you to use one set of credentials to access different Google Healthcare
Cloud FHIR stores. `fhirStore` is an object that contains the FHIR store
information
(`{cloudRegion: string, projectId: string, datasetId: string, fhirStoreId: string}`).
