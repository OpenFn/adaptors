export default {
  resourceType: 'Encounter',
  id: 'c5e7c7866308476cb3920d947da2a114',
  status: 'finished',
  class: {
    system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
    code: 'AMB',
    display: 'ambulatory',
  },
  identifier: [
    {
      system: 'http://cdr.aacahb.gov.et/Encounter',
      value: '7834',
    },
  ],
  extension: [
    {
      url: 'http://cdr.aacahb.gov.et/visit-type',
      valueString: 'unscheduled',
    },
    {
      url: 'http://cdr.aacahb.gov.et/next-visit',
      valueDateTime: '2020-10-05 00:00:00.000',
    },
  ],
  type: [
    {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '769681006',
          display: 'First encounter by subject',
        },
      ],
      text: 'First Encounter',
    },
  ],
  serviceType: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/service-type',
        code: '536',
        display: 'Art therapy',
      },
      {
        system: 'http://snomed.info/sct',
        code: '65153003',
        display: 'Art therapy',
      },
    ],
  },
  subject: {
    reference: 'Patient/b335d5b78135460d92b34a856d998493',
  },
  period: {
    start: '2004-10-05 00:00:00.000',
    end: '2004-10-05 00:00:00.000',
  },
  serviceProvider: {
    reference: 'Organization/CurrentServiceProviderExample',
  },
};
