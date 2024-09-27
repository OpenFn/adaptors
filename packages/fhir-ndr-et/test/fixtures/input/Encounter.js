export default {
  resource: {
    resourceType: 'Encounter',
    id: 'e84781ed-5f02-40ac-8c97-e7280fb153e3',
    status: 'finished',
    extension: [
      {
        url: 'http://cdr.aacahb.gov.et/visit-type',
        valueString: 'Not scheduled',
      },
      {},
    ],
    identifier: [
      {
        system: 'http://cdr.aacahb.gov.et/Encounter',
        value: '7834',
      },
    ],
    type: [
      {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '390906007',
            display: 'Follow-up encounter',
          },
        ],
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
      reference: 'Patient/1216a6e180f840b88a43e68d56dcm910',
    },
    period: {
      start: '2022-04-11',
      end: '2022-04-11',
    },
  },
  request: {
    method: 'PUT',
    url: 'Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3',
  },
};
