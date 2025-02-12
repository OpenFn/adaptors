/**
 * This file specifies the mapping rules for each Resource Type
 *
 * Only rules with a key in the mappings object here will have a builder
 * generated for themp
 *
 * For each resource type, all keys in the constructor will be automatically
 * mapped to the jembi resource.
 *
 * The mappings can be used to configure how each key is mapped
 *
 * If defaults are provided for a key, and the input does not
 * specify that key, then those defaults will be applied by the builder.
 * Ie, you can set default values for each type here!
 *
 * You can prevent a key from being mapped by setting it to false here.
 */

export default {
  // Every resource type here will have builders generated for it
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
};
