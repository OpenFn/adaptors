# @openfn/language-googlehealthcare

## 1.1.1

### Patch Changes

- Updated dependencies [4fe527c]
  - @openfn/language-common@2.0.0

## 1.1.0

### Minor Changes

- 73433c20: Add `fnIf` operation

### Patch Changes

- Updated dependencies [106ecf6d]
  - @openfn/language-common@1.14.0

## 1.0.1

### Patch Changes

- Security updates (lodash,undici)
- Updated dependencies
  - @openfn/language-common@1.13.2

## 1.0.0

### Major Changes

- 7df7e20: remove `projectId`, `dataSetId`, `cloudRegion`, and `fhirStoreId` out
  of configuration

  The new implementation of `createFhirResource(fhirStore, resource, callback)`
  allows you to use one set of credentials to access different Google Healthcare
  Cloud FHIR stores. `fhirStore` is an object that contains the FHIR store
  information
  (`{cloudRegion: string, projectId: string, datasetId: string, fhirStoreId: string}`).

## 0.1.0

### Minor Changes

- 861d774: add createFhirResource function

### Patch Changes

- aad9549: Ensure that standard OAuth2 credentials with snake-cased
  "access_token" keys can be used for OAuth2-reliant adaptors
- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0
