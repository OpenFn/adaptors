export default {
  include: [],
  // include: ['Patient'],
  exclude: [],
  overrides: {},
  valueSets: [],
  // This function should run on every resource
  // maybe it should bs structured like overrides.all?
  // initialiser: resource => {
  //   resource.meta = {
  //     profile: [
  //       `http://hl7.org/fhir/StructureDefinition/${resource.resourceType}`,
  //     ],
  //   };
  // },
};
