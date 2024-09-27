export default {
  resourceType: 'Encounter',
  id: 'c5e7c7866308476cb3920d947da2a114',
  meta: {
    profile: [
      'http://moh.gov.et/fhir/hiv/StructureDefinition/target-facility-encounter',
    ],
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Encounter</b></p></div>"
  },
  identifier: [
    {
      system: 'http://moh.gov.et/fhir/hiv/identifier/encounter',
      value: '7834',
    },
  ],
  status: 'finished',
  class: {
    system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
    code: 'AMB',
    display: 'ambulatory', // JC added from input - presume is harmless
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
          code: '769681006',
          display: 'First encounter by subject', // JC added by me
        },
      ],
      //text: 'First encounter by subject',
      text: 'First Encounter',
    },
  ],
  subject: {
    reference: 'Patient/b335d5b78135460d92b34a856d998493',
  },
  serviceType: {
    coding: [
      {
        system:
          'http://moh.gov.et/fhir/hiv/CodeSystem/encounter-service-type-code-system',
        code: '536',
        display: 'Art therapy', // JC kept the display string
      },
    ],
  },
  period: {
    start: '2004-10-05 00:00:00.000',
    end: '2004-10-05 00:00:00.000',
  },
  serviceProvider: {
    reference: 'Organization/CurrentServiceProviderExample',
  },
};
