---
'@openfn/language-fhir-eswatini': minor
---

Support short-hand properties for extensions, which works hand-in-hand with
value mapping.

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
