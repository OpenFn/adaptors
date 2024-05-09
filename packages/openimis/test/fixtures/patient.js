// This is a partial sample result from the openimis demo server
export default {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 1,
  link: [
    {
      relation: 'self',
      url: 'https%3A%2F%2Fdemo.openimis.org%2Fapi%2Fapi_fhir_r4%2FPatient%2F%3Fformat%3Djson',
    },
    {
      relation: 'next',
      url: 'https%3A%2F%2Fdemo.openimis.org%2Fapi%2Fapi_fhir_r4%2FPatient%2F%3Fformat%3Djson%26page-offset%3D2',
    },
  ],
  entry: [
    {
      fullUrl:
        'https://demo.openimis.org/api/api_fhir_r4/Patient/23cf1d3c-d07e-4ac8-a966-87ed502a454e',
      resource: {
        resourceType: 'Patient',
        id: '23cf1d3c-d07e-4ac8-a966-87ed502a454e',
        extension: [
          {
            url: 'https://openimis.github.io/openimis_fhir_r4_ig/StructureDefinition/patient-is-head',
            valueBoolean: false,
          },
          {
            url: 'https://openimis.github.io/openimis_fhir_r4_ig/StructureDefinition/patient-card-issued',
            valueBoolean: false,
          },
          {
            url: 'https://openimis.github.io/openimis_fhir_r4_ig/StructureDefinition/patient-group-reference',
            valueReference: {
              reference: 'Group/c8e83c86-5868-479a-8c30-b41d16c77cc3',
              type: 'Group',
              identifier: {
                type: {
                  coding: [
                    {
                      system:
                        'https://openimis.github.io/openimis_fhir_r4_ig/CodeSystem/openimis-identifiers',
                      code: 'UUID',
                    },
                  ],
                },
                value: 'c8e83c86-5868-479a-8c30-b41d16c77cc3',
              },
            },
          },
        ],
        identifier: [
          {
            type: {
              coding: [
                {
                  system:
                    'https://openimis.github.io/openimis_fhir_r4_ig/CodeSystem/openimis-identifiers',
                  code: 'UUID',
                },
              ],
            },
            value: '23cf1d3c-d07e-4ac8-a966-87ed502a454e',
          },
          {
            type: {
              coding: [
                {
                  system:
                    'https://openimis.github.io/openimis_fhir_r4_ig/CodeSystem/openimis-identifiers',
                  code: 'Code',
                },
              ],
            },
            value: '111111117',
          },
        ],
        name: [
          {
            use: 'usual',
            family: 'Manth',
            given: ['Aby'],
          },
        ],
        gender: 'female',
        birthDate: '2001-05-17',
        address: [
          {
            extension: [
              {
                url: 'https://openimis.github.io/openimis_fhir_r4_ig/StructureDefinition/address-municipality',
                valueString: 'Achi',
              },
              {
                url: 'https://openimis.github.io/openimis_fhir_r4_ig/StructureDefinition/address-location-reference',
                valueReference: {
                  reference: 'Location/8ed4eb0d-61ae-4022-8b4c-3076a619f957',
                  type: 'Location',
                  identifier: {
                    type: {
                      coding: [
                        {
                          system:
                            'https://openimis.github.io/openimis_fhir_r4_ig/CodeSystem/openimis-identifiers',
                          code: 'UUID',
                        },
                      ],
                    },
                    value: '8ed4eb0d-61ae-4022-8b4c-3076a619f957',
                  },
                },
              },
            ],
            use: 'home',
            type: 'physical',
            text: 'Jetset zone 85',
            city: 'Rachla',
            district: 'District 1',
            state: 'Lesotho',
          },
        ],
        photo: [
          {
            contentType: 'jpg',
            url: 'http://demo.openimis.org/photo/Images/Updated//111111117_E00001_20180327_0.0_0.0.jpg',
            title: '111111117_E00001_20180327_0.0_0.0.jpg',
            creation: '2018-03-27',
          },
        ],
      },
    },
  ],
};
