---
'@openfn/language-openmrs': major
---

- Add pagination support on request helper function
- Remove `createEncounter` and `createPatient` functions

### Migration Guide

The `createEncounter` and `createPatient` functions have been removed from the
OpenMRS adaptor. Use the `create` function with the appropriate resource type.

To create a new encounter, you can use the following code:

```js
create('encounter', $.encounter);
```

To create a new patient, you can use the following code:

```js
create('patient', $.patient);
```
