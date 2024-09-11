---
'@openfn/language-openmrs': major
---

- Add pagination support on request helper function
- Remove `createEncounter` and `createPatient` functions

### Migration Guide

The `createEncounter` and `createPatient` functions have been removed from the
OpenMRS adaptor. Use the `create` function with the appropriate resource type.
