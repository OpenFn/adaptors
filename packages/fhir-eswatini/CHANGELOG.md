# @openfn/language-fhir-eswatini

## 0.2.0 - 24 February 2026

### Minor Changes

- 7b3b584: Allow valuesets to map shorthand values to simple strings.

Only eswatini extension values are mapped, and documentation isn't expressive
enough yet to describe all values.

For example:

Patient.identifier.type:

```
const resource = b.patient('SzPatient', {
  identifier: [
    {
      type: 'PI',
    },
  ],
});
```

Expands to:

```
{
  resourceType: 'Patient',
  meta: {
    profile: [
      'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzPatient',
    ],
  },
  identifier: [
    {
      type: {
        coding: [
          {
            system:
              'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzPersonIdentificationsCS',
            code: 'PI',
            display: 'Personal ID Number',
          },
        ],
      },
    },
  ],
}
```

Encounter.class:

```
builders.encounter('SzEncounter', {
  class: 'OPD',
});
```

Expands to:

```
{
  resourceType: 'Encounter',
  meta: {
    profile: [
      'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzEncounter',
    ],
  },
  class: {
    code: 'OPD',
    display: 'Outpatient Department',
    system:
      'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzEncounterClassificationCS',
  }
}
```

### Patch Changes

- Updated dependencies \[3c52750]
- Updated dependencies \[81dd8bd]
  - @openfn/language-fhir-4@0.2.8

## 0.1.1 - 09 February 2026

### Patch Changes

- Updated dependencies \[d935dda]
- Updated dependencies \[a78d53e]
  - @openfn/language-fhir-4@0.2.7

## 0.1.0

Initial release.
