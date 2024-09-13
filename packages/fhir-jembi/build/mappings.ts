/**
 * This file specifies the mapping rules for each Resource Type
 *
 * Only rules with a key in the mappings object here will have a builder
 * generated for them
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

// TODO do mapping rules need to change per variant now?
// hope not!
// this is pretty high level
export default {
  // Encounter: {
  //   identifier: {
  //     // Force identifier to accept a string
  //     // (the system will be defaulted)
  //     type: 'string',
  //   },
  //   // Specify individual mapping rules for fields here
  //   // or pass field: false to ignore it
  //   // (meta is always ignored)

  //   // serviceProvider will be defaulted
  //   // (I don't really know if we want this but lets see!)
  //   serviceProvider: {
  //     defaults: {
  //       reference: 'Organization/Patient.managingOrganization',
  //     },
  //   },
  // },
  // Patient: {
  //   // This should automap now, probably as patientReligion
  //   // But it doesn't??

  //   // manually map the `religion` key to the patient.religion extension
  //   religion: {
  //     type: 'CodeableConcept',
  //     extension: 'http://hl7.org/fhir/StructureDefinition/patient-religion',
  //   },
  // },
  // Observation: {
  //   // id: true,
  // },
  MedicationDispense: {},
};
