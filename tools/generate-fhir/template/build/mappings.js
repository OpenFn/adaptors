// Add resource and profile mappings here to improve your generated adaptor

// export default {
//   include: [],
//   exclude: [],
//   overrides: {},
// };

// Temporary jembi mappings file
// I'm keeping this here throughout dev because it's annoying to keep losing it
// TODO is this going to be a problem with real adaptors?
// Maybe I need a clean command that will clean generated stuff but leave mapppings in place
export default {
  include: [
    'Encounter',
    'Patient',
    'MedicationAdministration',
    'MedicationDispense',
    'MedicationRequest',
    'Medication',
    'CarePlan',
    'RelatedPerson',
    'Observation',
  ],
  exclude: [],
  overrides: {
    Encounter: {},
    Patient: {
      // This is where we specify rules for different profiles
      // Stuff under the special key "any" will apply to all profiles
      any: {
        // Here we provide mapping rules per property

        // manually map the `religion` key to the patient.religion extension
        religion: {
          type: 'CodeableConcept',
          extension: 'http://hl7.org/fhir/StructureDefinition/patient-religion',
        },
      },
    },
    MedicationAdministration: {},
    MedicationDispense: {},
    MedicationRequest: {},
    Medication: {},
    CarePlan: {},
    RelatedPerson: {},
    Observation: {
      // For observations, we include a bunch of specfific mapping defaults
      // The schema doesn't include text in the codes
      // so we have to manually set each one here
      'arv-change-category-type-observation': {
        code: {
          defaults: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '182838006',
              },
            ],
            text: 'ARV regimen change',
          },
        },
      },
      'highest-education-observation': {
        code: {
          defaults: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '82589-3',
              },
            ],
            text: 'Highest level of education',
          },
        },
      },
      'patient-occupation-observation': {
        code: {
          defaults: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '85658-3',
              },
            ],
            text: 'Occupation',
          },
        },
      },
      'target-population-observation': {
        code: {
          defaults: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '385436007',
              },
            ],
            text: 'Target population',
          },
        },
      },
      'arv-regimen-changed-observation': {
        code: {
          defaults: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '182838006',
              },
            ],
            text: 'ARV regimen change',
          },
        },
      },
      'arv-regimen-change-reason-observation': {
        code: {
          defaults: {
            coding: [
              {
                system: 'http://loinc.org',
                code: 'LL354-2',
              },
            ],
            text: 'ARV regimen change reason',
          },
        },
      },
    },
  },
};
