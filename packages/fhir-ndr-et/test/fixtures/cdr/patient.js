export default {
  resourceType: 'Patient',
  id: 'b335d5b78135460d92b34a856d998493',
  extension: [
    {
      url: 'http://hl7.org/fhir/StructureDefinition/patient-religion',
      valueCodeableConcept: {
        coding: [
          {
            system:
              'http://terminology.hl7.org/ValueSet/v3-ReligiousAffiliation',
            code: '1036',
            display: 'Orthodox',
          },
        ],
      },
    },
    {
      url: 'http://hl7.org/fhir/StructureDefinition/patient-relatedPerson',
      valueReference: {
        reference: 'RelatedPerson/9516a6e180f840b88a43e68d56cdcf93',
      },
    },
    {
      url: 'http://cdr.aacahb.gov.et/EducationalLevel',
      valueString: 'TVET',
    },
    {
      url: 'http://cdr.aacahb.gov.et/TargetPopulationGroup',
      valueString: 'sex worker',
    },
    {
      url: 'http://cdr.aacahb.gov.et/Occupation',
      valueString: 'Foreman',
    },
  ],
  identifier: [
    {
      system: 'http://cdr.aacahb.gov.et/SmartCareID',
      value: 'b335d5b78135460d92b34a856d998493',
    },
    {
      system: 'http://cdr.aacahb.gov.et/MRN',
      value: '178597',
    },
    {
      system: 'http://cdr.aacahb.gov.et/UAN',
      value: '140800101816',
    },
  ],
  name: [
    {
      use: 'official',
      family: 'Bekele',
      given: ['Almaz', 'Lameso'],
    },
  ],
  telecom: [
    {
      system: 'phone',
      value: '+2519000000',
      use: 'home',
    },
    {
      system: 'phone',
      value: '+2509000000',
      use: 'work',
    },
    {
      system: 'phone',
      value: '+2509000000',
      use: 'mobile',
    },
    {
      system: 'email',
      value: 'someone@something.org',
      use: 'home',
    },
  ],
  gender: 'female',
  birthDate: '1983-03-10',
  address: [
    {
      type: 'physical',
      text: 'Rural',
      state: 'Addis Ababa',
      city: 'Cherkos sub city',
      district: '10',
      line: ['17', '927/5'],
    },
  ],
  maritalStatus: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
        code: 'M',
        display: 'Married',
      },
    ],
  },
  managingOrganization: {
    reference: 'Organization/009a6a861c1b45778c0cbedadefe52a4',
  },
};
