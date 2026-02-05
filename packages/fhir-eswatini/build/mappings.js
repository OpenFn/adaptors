// Add resource and profile mappings here to improve your generated adaptor

export default {
  // include: ['Patient', 'Appointment'],
  // // include: ['Appointment', 'Extension'],
  exclude: [],
  overrides: {},
  valueSets: [],
  initialiser: resource => {
    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
  },
};
