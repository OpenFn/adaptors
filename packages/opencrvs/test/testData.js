export const birthRecordData = [
  {
    fullUrl: 'urn:uuid:37dd8e55-69c0-493d-b1a0-b7462a1d806a',
    resource: {
      identifier: {
        system: 'urn:ietf:rfc:3986',
        value: '8f793c5a-3d53-4c9b-898b-1c04759716c6',
      },
      resourceType: 'Composition',
      status: 'final',
      type: {
        coding: [
          {
            system: 'http://opencrvs.org/doc-types',
            code: 'birth-notification',
          },
        ],
        text: 'Birth Notification',
      },
      class: {
        coding: [
          {
            system: 'http://opencrvs.org/specs/classes',
            code: 'crvs-document',
          },
        ],
        text: 'CRVS Document',
      },
      subject: {
        reference: 'urn:uuid:760c393e-4dc3-4572-83f6-b70765963ef1',
      },
      date: '2022-08-14T14:43:47.000Z',
      author: [],
      title: 'Birth Notification',
      section: [
        {
          title: 'Child details',
          code: {
            coding: [
              {
                system: 'http://opencrvs.org/specs/sections',
                code: 'child-details',
              },
            ],
            text: 'Child details',
          },
          entry: [
            {
              reference: 'urn:uuid:760c393e-4dc3-4572-83f6-b70765963ef1',
            },
          ],
        },
        {
          title: 'Birth encounter',
          code: {
            coding: [
              {
                system: 'http://opencrvs.org/specs/sections',
                code: 'birth-encounter',
              },
            ],
            text: 'Birth encounter',
          },
          entry: [
            {
              reference: 'urn:uuid:7cb1d9cc-ea4b-4046-bea0-38bdf3082f56',
            },
          ],
        },
        {
          title: "Mother's details",
          code: {
            coding: [
              {
                system: 'http://opencrvs.org/specs/sections',
                code: 'mother-details',
              },
            ],
            text: "Mother's details",
          },
          entry: [
            {
              reference: 'urn:uuid:d9d3a8c8-6a47-47a1-be86-0493a4ec55a7',
            },
          ],
        },
        {
          title: "Informant's details",
          code: {
            coding: [
              {
                system: 'http://opencrvs.org/specs/sections',
                code: 'informant-details',
              },
            ],
            text: "Informant's details",
          },
          entry: [
            {
              reference: 'urn:uuid:b74fbd0e-8536-4c11-833d-781e89a4b553',
            },
          ],
        },
        {
          title: "Father's details",
          code: {
            coding: [
              {
                system: 'http://opencrvs.org/doc-sections',
                code: 'father-details',
              },
            ],
            text: "Father's details",
          },
          entry: [
            {
              reference: 'urn:uuid:ad1e15bb-51da-449a-8a12-c7dae10728e4',
            },
          ],
        },
      ],
    },
  },
  {
    fullUrl: 'urn:uuid:8546aaf3-8a60-4150-bc24-ab5579bc0fa2',
    resource: {
      resourceType: 'Task',
      status: 'draft',
      intent: 'unknown',
      identifier: [],
      code: {
        coding: [
          {
            system: 'http://opencrvs.org/specs/types',
            code: 'BIRTH',
          },
        ],
      },
      focus: {
        reference: 'urn:uuid:37dd8e55-69c0-493d-b1a0-b7462a1d806a',
      },
      extension: [
        {
          url: 'http://opencrvs.org/specs/extension/contact-person',
          valueString: 'MOTHER',
        },
        {
          url: 'http://opencrvs.org/specs/extension/contact-person-phone-number',
          valueString: '+260759205190',
        },
        {
          url: 'http://opencrvs.org/specs/extension/contact-person-email',
          valueString: 'axon@gmail.com',
        },
        {
          url: 'http://opencrvs.org/specs/extension/timeLoggedMS',
          valueInteger: 0,
        },
        {
          url: 'http://opencrvs.org/specs/extension/in-complete-fields',
          valueString: 'N/A',
        },
        {
          url: 'http://opencrvs.org/specs/extension/regLastOffice',
          valueReference: {
            reference: 'Location/178e21a9-60ad-4283-bd49-f576f61a5648',
          },
        },
      ],
    },
  },
  {
    fullUrl: 'urn:uuid:760c393e-4dc3-4572-83f6-b70765963ef1',
    resource: {
      resourceType: 'Patient',
      active: true,
      name: [
        {
          use: 'en',
          family: 'Tatke',
          given: ['Harney'],
        },
      ],
      gender: 'male',
      birthDate: '2022-06-29',
      deceasedBoolean: false,
      multipleBirthBoolean: false,
    },
  },
  {
    fullUrl: 'urn:uuid:d9d3a8c8-6a47-47a1-be86-0493a4ec55a7',
    resource: {
      resourceType: 'Patient',
      active: true,
      identifier: [
        {
          use: 'official',
          type: {
            coding: [
              {
                system: 'http://opencrvs.org/specs/identifier-type',
                code: 'NATIONAL_ID',
              },
            ],
          },
          value: '3624667568',
        },
      ],
      name: [
        {
          use: 'en',
          family: 'Ratke',
          given: ['Mom'],
        },
      ],
      gender: 'female',
      telecom: [
        {
          use: 'mobile',
          system: 'phone',
          value: '+260759205190',
        },
      ],
      birthDate: '2002-06-29',
      deceasedBoolean: false,
      multipleBirthInteger: 2,
      maritalStatus: {
        coding: [
          {
            system: 'http://hl7.org/fhir/StructureDefinition/marital-status',
            code: 'M',
          },
        ],
        text: 'MARRIED',
      },
      address: [
        {
          type: 'PRIMARY_ADDRESS',
          line: [
            '12',
            'Usual Street',
            'Usual Residental Area',
            '',
            '',
            'URBAN',
          ],
          city: 'Meghanland',
          district: 'c51ea274-8ffa-4b0b-b3d3-12991e9f0630',
          state: 'c5d7a275-3638-41a3-bd53-145bd9410fd6',
          postalCode: '52275',
          country: 'FAR',
        },
      ],
      extension: [
        {
          url: 'http://opencrvs.org/specs/extension/patient-occupation',
          valueString: 'Housewife',
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/patient-nationality',
          extension: [
            {
              url: 'code',
              valueCodeableConcept: {
                coding: [
                  {
                    system: 'urn:iso:std:iso:3166',
                    code: '{{countryCode}}',
                  },
                ],
              },
            },
            {
              url: 'period',
              valuePeriod: {
                start: '',
                end: '',
              },
            },
          ],
        },
        {
          url: 'http://opencrvs.org/specs/extension/educational-attainment',
          valueString: 'POST_SECONDARY_ISCED_4',
        },
      ],
    },
  },
  {
    fullUrl: 'urn:uuid:b74fbd0e-8536-4c11-833d-781e89a4b553',
    resource: {
      resourceType: 'RelatedPerson',
      relationship: {
        coding: [
          {
            system:
              'http://hl7.org/fhir/ValueSet/relatedperson-relationshiptype',
            code: 'MOTHER',
          },
        ],
      },
      patient: {
        reference: 'urn:uuid:d9d3a8c8-6a47-47a1-be86-0493a4ec55a7',
      },
    },
  },
  {
    fullUrl: 'urn:uuid:ad1e15bb-51da-449a-8a12-c7dae10728e4',
    resource: {
      resourceType: 'Patient',
      active: true,
      identifier: [
        {
          use: 'official',
          type: {
            coding: [
              {
                system: 'http://opencrvs.org/specs/identifier-type',
                code: 'NATIONAL_ID',
              },
            ],
          },
          value: '6848901132',
        },
      ],
      name: [
        {
          use: 'en',
          family: 'Ratke',
          given: ['Dad'],
        },
      ],
      gender: 'male',
      telecom: [
        {
          use: 'mobile',
          system: 'phone',
          value: '+260759205190',
        },
      ],
      birthDate: '2002-06-29',
      deceasedBoolean: false,
      multipleBirthInteger: 2,
      maritalStatus: {
        coding: [
          {
            system: 'http://hl7.org/fhir/StructureDefinition/marital-status',
            code: 'M',
          },
        ],
        text: 'MARRIED',
      },
      address: [
        {
          type: 'PRIMARY_ADDRESS',
          line: [
            '12',
            'Usual Street',
            'Usual Residental Area',
            '',
            '',
            'URBAN',
          ],
          city: 'Madgeland',
          district: 'c51ea274-8ffa-4b0b-b3d3-12991e9f0630',
          state: 'c5d7a275-3638-41a3-bd53-145bd9410fd6',
          postalCode: '52275',
          country: 'FAR',
        },
      ],
      extension: [
        {
          url: 'http://opencrvs.org/specs/extension/patient-occupation',
          valueString: 'Businessman',
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/patient-nationality',
          extension: [
            {
              url: 'code',
              valueCodeableConcept: {
                coding: [
                  {
                    system: 'urn:iso:std:iso:3166',
                    code: 'FAR',
                  },
                ],
              },
            },
            {
              url: 'period',
              valuePeriod: {
                start: '',
                end: '',
              },
            },
          ],
        },
        {
          url: 'http://opencrvs.org/specs/extension/educational-attainment',
          valueString: 'POST_SECONDARY_ISCED_4',
        },
      ],
    },
  },
  {
    fullUrl: 'urn:uuid:7cb1d9cc-ea4b-4046-bea0-38bdf3082f56',
    resource: {
      resourceType: 'Encounter',
      status: 'finished',
      location: [
        {
          location: {
            reference: 'Location/704b9706-d729-4834-8656-05b562065deb',
          },
        },
      ],
    },
  },
  {
    fullUrl: 'urn:uuid:45c68568-2ca0-4932-9731-535dd4180fe0',
    resource: {
      resourceType: 'Observation',
      status: 'final',
      context: {
        reference: 'urn:uuid:7cb1d9cc-ea4b-4046-bea0-38bdf3082f56',
      },
      category: [
        {
          coding: [
            {
              system: 'http://hl7.org/fhir/observation-category',
              code: 'procedure',
              display: 'Procedure',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57722-1',
            display: 'Birth plurality of Pregnancy',
          },
        ],
      },
      valueQuantity: {
        value: 'SINGLE',
      },
    },
  },
  {
    fullUrl: 'urn:uuid:d2d3d5b8-658e-4c29-9ec5-cb2431b4ddf3',
    resource: {
      resourceType: 'Observation',
      status: 'final',
      context: {
        reference: 'urn:uuid:7cb1d9cc-ea4b-4046-bea0-38bdf3082f56',
      },
      category: [
        {
          coding: [
            {
              system: 'http://hl7.org/fhir/observation-category',
              code: 'vital-signs',
              display: 'Vital Signs',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '3141-9',
            display: 'Body weight Measured',
          },
        ],
      },
      valueQuantity: {
        value: 4,
        unit: 'kg',
        system: 'http://unitsofmeasure.org',
        code: 'kg',
      },
    },
  },
  {
    fullUrl: 'urn:uuid:706905cf-7e5d-4d9f-866a-a3795780a990',
    resource: {
      resourceType: 'Observation',
      status: 'final',
      context: {
        reference: 'urn:uuid:7cb1d9cc-ea4b-4046-bea0-38bdf3082f56',
      },
      category: [
        {
          coding: [
            {
              system: 'http://hl7.org/fhir/observation-category',
              code: 'procedure',
              display: 'Procedure',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '73764-3',
            display: 'Birth attendant title',
          },
        ],
      },
      valueString: 'PHYSICIAN',
    },
  },
  {
    fullUrl: 'urn:uuid:eee21c26-67a2-40af-8cf7-5f4bc969153f',
    resource: {
      resourceType: 'QuestionnaireResponse',
      extension: [],
      status: 'completed',
      subject: {
        reference: 'urn:uuid:7cb1d9cc-ea4b-4046-bea0-38bdf3082f56',
      },
      item: [
        {
          text: 'birth.mother.mother-view-group.motherIdType',
          linkId: '',
          answer: [
            {
              valueString: 'NATIONAL_ID',
            },
          ],
        },
        {
          text: 'birth.father.father-view-group.fatherIdType',
          linkId: '',
          answer: [
            {
              valueString: 'NATIONAL_ID',
            },
          ],
        },
      ],
    },
  },
];
