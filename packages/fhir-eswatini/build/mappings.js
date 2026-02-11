// Add resource and profile mappings here to improve your generated adaptor

export default {
  include: ['Patient'],
  // // include: ['Appointment', 'Extension'],
  exclude: [],
  overrides: {},

  // so I want the identifier value set now
  valueSets: ['PersonIdentifiersVS'],
  initialiser: resource => {
    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
  },
};
