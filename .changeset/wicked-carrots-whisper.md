---
'@openfn/language-openmrs': major
---

- Add pagination support on request helper function
- Remove `createEncounter` and `createPatient` functions

### Breaking Changes

The `createEncounter` and `createPatient` functions have been removed from the
OpenMRS adaptor. These functions were used to create new encounters and
patients. If you need to create new encounter or patient, you can use the
`create` function with the appropriate resource type.

Fore example, to create a new encounter, you can use the following code:

```js
create('encounter', $.encounter);
// $.encounter is an object that contains the encounter data
```

To create a new patient, you can use the following code:

```js
create('patient', $.patient);
// $.patient is an object that contains the patient data
```
