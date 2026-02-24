// Add resource and profile mappings here to improve your generated adaptor

export default {
  include: [],
  include: ['Patient'],
  exclude: [],
  overrides: {},

  // so I want the identifier value set now
  valueSets: [
    // 'https://hapifhir.eswatinihie.com',
    // 'http://hl7.org/fhir/ValueSet',

    '.', // all valuesets from valid domains
  ],
  // specify which domains we want to download valuesets for
  // Note that the base domains should be covered by fhir 4
  // also note the https duplication
  valueSetDomains: [
    // 'http://terminology.hl7.org',
    // 'https://terminology.hl7.org',
    // 'http://terminology.hl7.org',
    // 'https://terminology.hl7.org',
    'http://172.209.216.154:3447',
    'https://hapifhir.eswatinihie.com',
  ],
  initialiser: resource => {
    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
  },
};
