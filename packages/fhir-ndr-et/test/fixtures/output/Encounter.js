export default {
  resourceType: 'Encounter',
  id: 'GeneralEncounterExample',
  meta: {
    profile: [
      'http://moh.gov.et/fhir/hiv/StructureDefinition/target-facility-encounter',
    ],
  },
  identifier: [
    {
      system: 'http://moh.gov.et/fhir/hiv/identifier/encounter',
      value: '001',
    },
  ],
  status: 'finished',
  class: {
    system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
    code: 'OBSENC',
  },
  type: [
    {
      extension: [
        {
          url: 'http://moh.gov.et/fhir/hiv/StructureDefinition/encounter-visit-type',
          valueCodeableConcept: {
            coding: [
              {
                system:
                  'http://moh.gov.et/fhir/hiv/CodeSystem/encounter-visit-type-code-system',
                code: 'unscheduled',
              },
            ],
          },
        },
      ],
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '390906007',
        },
      ],
      text: 'Follow-up encounter',
    },
  ],
  serviceType: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/service-type',
        code: '536',
        display: 'Art therapy',
      },
    ],
  },
  subject: {
    reference: 'Patient/GeneralPatientExample',
  },
  period: {
    start: '2012-12-09',
    end: '2012-12-09',
  },
  serviceProvider: {
    reference: 'Organization/Patient.managingOrganization',
  },
};
