# @openfn/language-fhir-eswatini

## 0.5.1 - 12 March 2026

### Patch Changes

- 317e3c7: Alphabetically sort generated props Correctly format generated types
  with a space and a surrounding code block: '\`\`'
- Updated dependencies \[317e3c7]
  - @openfn/language-fhir-4@0.3.2

## 0.5.0

### Minor Changes

- 5e7a76d: Export utils from common

## 0.4.1 - 06 March 2026

### Patch Changes

- cb65bd0: Fix the profile url generated for all resource types
- 4824307: Fix some valuemaps that were failing to fire (eg, LabResult.code)

## 0.4.0 - 02 March 2026

### Minor Changes

- 355f383: Add bundle APIs: `createBundle`, `addToBundle` and `uploadBundle`

### Patch Changes

- 3a9915b: When mapping coding values, also index on the display value. This is
  useful for codings where the code is not intuitive, but the display value is.
- Updated dependencies \[3a9915b]
- Updated dependencies \[355f383]
  - @openfn/language-fhir-4@0.3.0

## 0.3.0 - 24 February 2026

### Minor Changes

- 2974c81: Support short-hand properties for extensions, which works
  hand-in-hand with value mapping.

  For example, setting patient.inkundla like this:

  ```
  b.patient('SzPatient', {
    inkhundla: '3', // 'LOBAMBA',
  })
  ```

  Will generate a FHIR resource like this:

  ```
  {
    resourceType: 'Patient',
    meta: {
      profile: ['http://172.209.216.154:3447/fhir/StructureDefinition/SzPatient'],
    },
    extension: [{
      url: 'http://172.209.216.154:3447/fhir/StructureDefinition/SzInkhundlaExtension',
      valueCodeableConcept: {
        coding: [
          {
            system:
              'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzTinkhundlaCS',
            code: '3',
            display: 'LOBAMBA',
          },
        ],
        // If we ignore text here, it's fine
        text: 'LOBAMBA',
      },
    }]
  }
  ```

  Note that underscored properties (like `Patient._birthTime`) are not yet
  supported, nor are extensions defined in the core FHIR spec
  (`Patient.nationality`). These must be input long-hand for now:

  ```
  b.patient('SzPatient', {
    _birthDate: {
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/patient-birthTime',
          valueDateTime: '2000-01-01T14:35:45-05:00',
        },
      ],
    },
  })
  ```

### Patch Changes

- Updated dependencies \[213115b]
- Updated dependencies \[6ef5351]
  - @openfn/language-fhir-4@0.2.10

## 0.2.1 - 24 February 2026

### Patch Changes

- 856f85c: Security updates
- Updated dependencies \[856f85c]
  - @openfn/language-common@3.2.3
  - @openfn/language-fhir-4@0.2.9

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
