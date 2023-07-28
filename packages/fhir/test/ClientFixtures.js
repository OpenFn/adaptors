const fixtures = {
  claim: {
    resourceType: 'Claim',
    id: '49023',
    meta: {
      versionId: '1',
      lastUpdated: '2019-10-18T20:20:56.872+00:00',
      source: '#ML8v9Ku1pGuXAhZr',
    },
    status: 'active',
    type: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/claim-type',
          code: 'pharmacy',
        },
      ],
    },
    use: 'claim',
    patient: {
      reference: 'Patient/49006',
    },
    billablePeriod: {
      start: '1992-10-04T20:27:01-04:00',
      end: '1992-10-04T21:06:01-04:00',
    },
    created: '1992-10-04T21:06:01-04:00',
    provider: {
      reference: 'Organization/49007',
      display: 'NASHOBA VALLEY MEDICAL CENTER',
    },
    priority: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/processpriority',
          code: 'normal',
        },
      ],
    },
    prescription: {
      reference: 'MedicationRequest/49022',
    },
    insurance: [
      {
        sequence: 1,
        focal: true,
        coverage: {
          display: 'UnitedHealthcare',
        },
      },
    ],
    item: [
      {
        sequence: 1,
        productOrService: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '185347001',
              display: 'Encounter for problem',
            },
          ],
          text: 'Encounter for problem',
        },
        encounter: [
          {
            reference: 'Encounter/49014',
          },
        ],
      },
    ],
    total: {
      value: 388.55,
      currency: 'USD',
    },
  },
  claimBundle: {
    resourceType: 'Bundle',
    id: '462a2358-3960-4195-bcc9-8777d3232df7',
    meta: {
      lastUpdated: '2023-07-26T10:43:22.471+00:00',
    },
    type: 'searchset',
    link: [
      {
        relation: 'self',
        url: 'https://hapi.fhir.org/baseR4/Claim/',
      },
      {
        relation: 'next',
        url: 'https://hapi.fhir.org/baseR4?_getpages=462a2358-3960-4195-bcc9-8777d3232df7&_getpagesoffset=20&_count=20&_pretty=true&_bundletype=searchset',
      },
    ],
    entry: [
      {
        fullUrl: 'https://hapi.fhir.org/baseR4/Claim/49023',
        resource: {
          resourceType: 'Claim',
          id: '49023',
          meta: {
            versionId: '1',
            lastUpdated: '2019-10-18T20:20:56.872+00:00',
            source: '#ML8v9Ku1pGuXAhZr',
          },
          status: 'active',
          type: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/claim-type',
                code: 'pharmacy',
              },
            ],
          },
          use: 'claim',
          patient: {
            reference: 'Patient/49006',
          },
          billablePeriod: {
            start: '1992-10-04T20:27:01-04:00',
            end: '1992-10-04T21:06:01-04:00',
          },
          created: '1992-10-04T21:06:01-04:00',
          provider: {
            reference: 'Organization/49007',
            display: 'NASHOBA VALLEY MEDICAL CENTER',
          },
          priority: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/processpriority',
                code: 'normal',
              },
            ],
          },
          prescription: {
            reference: 'MedicationRequest/49022',
          },
          insurance: [
            {
              sequence: 1,
              focal: true,
              coverage: {
                display: 'UnitedHealthcare',
              },
            },
          ],
          item: [
            {
              sequence: 1,
              productOrService: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '185347001',
                    display: 'Encounter for problem',
                  },
                ],
                text: 'Encounter for problem',
              },
              encounter: [
                {
                  reference: 'Encounter/49014',
                },
              ],
            },
          ],
          total: {
            value: 388.55,
            currency: 'USD',
          },
        },
        search: {
          mode: 'match',
        },
      },
    ],
  },
  patient: {
    resourceType: 'Patient',
    id: '592442',
    meta: {
      versionId: '2',
      lastUpdated: '2023-07-26T10:50:14.149+00:00',
      source: '#lxDt7D8lXB6Jk9ov',
    },
    text: {
      status: 'generated',
      div: '<div xmlns="http://www.w3.org/1999/xhtml"> <div class="hapiHeaderText">Caleb <b>CUSHING </b> </div> <table class="hapiPropertyTable"> <tbody> <tr> <td>Identifier</td> <td>5b6f0fc3-c98e-46a6-8435-896340edf860</td> </tr> </tbody> </table> </div>',
    },
    identifier: [
      {
        type: {
          coding: [
            {
              system: 'http://hl7.org/fhir/v2/0203',
              code: 'MR',
            },
          ],
        },
        value: '5b6f0fc3-c98e-46a6-8435-896340edf860',
      },
    ],
    name: [
      {
        family: 'Cushing',
        given: ['Caleb'],
      },
    ],
  },
  invalidPatient: {
    resourceType: 'OperationOutcome',
    text: {
      status: 'generated',
      div: '<div xmlns="http://www.w3.org/1999/xhtml"><h1>Operation Outcome</h1><table border="0"><tr><td style="font-weight: bold;">ERROR</td><td>[]</td><td>HAPI-2001: Resource Patient/592442asd is not known</td></tr></table></div>',
    },
    issue: [
      {
        severity: 'error',
        code: 'processing',
        diagnostics:
          'HAPI-2001: Resource Patient/invalid-patient-id is not known',
      },
    ],
  },
  patientBundle: {
    resourceType: 'Bundle',
    id: 'fe61d95d-025a-4f6b-af2b-1675897438eb',
    meta: {
      lastUpdated: '2023-07-27T10:11:45.940+00:00',
    },
    type: 'searchset',
    link: [
      {
        relation: 'self',
        url: 'https://hapi.fhir.org/baseR4/Patient?_count=1',
      },
      {
        relation: 'next',
        url: 'https://hapi.fhir.org/baseR4?_getpages=fe61d95d-025a-4f6b-af2b-1675897438eb&_getpagesoffset=1&_count=1&_pretty=true&_bundletype=searchset',
      },
    ],
    entry: [
      {
        fullUrl: 'https://hapi.fhir.org/baseR4/Patient/592450',
        resource: {
          resourceType: 'Patient',
          id: '592450',
          meta: {
            versionId: '1',
            lastUpdated: '2020-01-25T05:29:58.264+00:00',
            source: '#4X2jtGcxUFu488v9',
          },
          text: {
            status: 'generated',
            div: '<div xmlns="http://www.w3.org/1999/xhtml"><div class="hapiHeaderText">Caleb <b>CUSHING </b></div><table class="hapiPropertyTable"><tbody><tr><td>Identifier</td><td>fdd38fa3-5bd8-4fb6-8dd9-97a78e6d0551</td></tr></tbody></table></div>',
          },
          identifier: [
            {
              type: {
                coding: [
                  {
                    system: 'http://hl7.org/fhir/v2/0203',
                    code: 'MR',
                  },
                ],
              },
              value: 'fdd38fa3-5bd8-4fb6-8dd9-97a78e6d0551',
            },
          ],
          name: [
            {
              family: 'Cushing',
              given: ['Caleb'],
            },
          ],
        },
        search: {
          mode: 'match',
        },
      },
    ],
  },
  patientBundleCreateResponse: {
    resourceType: 'Bundle',
    id: '10989397',
    meta: {
      versionId: '1',
      lastUpdated: '2023-07-28T07:34:21.208+00:00',
      source: '#3xZ8hllB4CGY0C4O',
    },
    type: 'collection',
    link: [
      {
        relation: 'self',
        url: 'https://hapi.fhir.org/baseR4/Patient?_count=1',
      },
      {
        relation: 'next',
        url: 'https://hapi.fhir.org/baseR4?_getpages=fe61d95d-025a-4f6b-af2b-1675897438eb&_getpagesoffset=1&_count=1&_pretty=true&_bundletype=searchset',
      },
    ],
    entry: [
      {
        fullUrl: 'https://hapi.fhir.org/baseR4/Patient/592450',
        resource: {
          resourceType: 'Patient',
          id: '592450',
          meta: {
            versionId: '1',
            lastUpdated: '2020-01-25T05:29:58.264+00:00',
            source: '#4X2jtGcxUFu488v9',
          },
          text: {
            status: 'generated',
            div: '<div xmlns="http://www.w3.org/1999/xhtml"><div class="hapiHeaderText">Caleb <b>CUSHING </b></div><table class="hapiPropertyTable"><tbody><tr><td>Identifier</td><td>fdd38fa3-5bd8-4fb6-8dd9-97a78e6d0551</td></tr></tbody></table></div>',
          },
          identifier: [
            {
              type: {
                coding: [
                  {
                    system: 'http://hl7.org/fhir/v2/0203',
                    code: 'MR',
                  },
                ],
              },
              value: 'fdd38fa3-5bd8-4fb6-8dd9-97a78e6d0551',
            },
          ],
          name: [
            {
              family: 'Cushing',
              given: ['Caleb'],
            },
          ],
        },
        search: {
          mode: 'match',
        },
      },
    ],
  },
  patientTransactionBundle: {
    resourceType: 'Bundle',
    type: 'transaction',
    entry: [
      {
        fullUrl: 'https://hapi.fhir.org/baseR4/Patient/592442',
        resource: {
          resourceType: 'Patient',
          id: '592442',
          name: [{ given: 'Caleb', family: 'Cushing' }],
        },
        request: {
          method: 'POST',
          url: 'Patient',
        },
      },
      {
        fullUrl: 'https://hapi.fhir.org/baseR4/Observation/2435947',
        resource: {
          resourceType: 'Observation',
          status: 'final',
          code: { text: 'Tobacco smoking status NHIS' },
          subject: { reference: 'Patient/592442' },
        },
        request: {
          method: 'POST',
          url: 'Observation',
        },
      },
    ],
  },
  patientTransactionBundleResponse: {
    resourceType: 'Bundle',
    id: '113c6bdf-949b-4b82-9f30-05d936b47848',
    type: 'transaction-response',
    link: [
      {
        relation: 'self',
        url: 'https://hapi.fhir.org/baseR4',
      },
    ],
    entry: [
      {
        response: {
          status: '201 Created',
          location: 'Patient/10990981/_history/1',
          etag: '1',
          lastModified: '2023-07-28T09:43:14.921+00:00',
          outcome: {
            resourceType: 'OperationOutcome',
            text: {
              status: 'generated',
              div: '<div xmlns="http://www.w3.org/1999/xhtml"><h1>Operation Outcome</h1><table border="0"><tr><td style="font-weight: bold;">INFORMATION</td><td>[]</td><td>Successfully created resource &quot;Patient/10990981/_history/1&quot;. Took 29ms.</td></tr></table></div>',
            },
            issue: [
              {
                severity: 'information',
                code: 'informational',
                details: {
                  coding: [
                    {
                      system:
                        'https://hapifhir.io/fhir/CodeSystem/hapi-fhir-storage-response-code',
                      code: 'SUCCESSFUL_CREATE',
                      display: 'Create succeeded.',
                    },
                  ],
                },
                diagnostics:
                  'Successfully created resource "Patient/10990981/_history/1". Took 29ms.',
              },
            ],
          },
        },
      },
      {
        response: {
          status: '201 Created',
          location: 'Observation/10990982/_history/1',
          etag: '1',
          lastModified: '2023-07-28T09:43:14.921+00:00',
          outcome: {
            resourceType: 'OperationOutcome',
            text: {
              status: 'generated',
              div: '<div xmlns="http://www.w3.org/1999/xhtml"><h1>Operation Outcome</h1><table border="0"><tr><td style="font-weight: bold;">INFORMATION</td><td>[]</td><td>Successfully created resource &quot;Observation/10990982/_history/1&quot;. Took 5ms.</td></tr></table></div>',
            },
            issue: [
              {
                severity: 'information',
                code: 'informational',
                details: {
                  coding: [
                    {
                      system:
                        'https://hapifhir.io/fhir/CodeSystem/hapi-fhir-storage-response-code',
                      code: 'SUCCESSFUL_CREATE',
                      display: 'Create succeeded.',
                    },
                  ],
                },
                diagnostics:
                  'Successfully created resource "Observation/10990982/_history/1". Took 5ms.',
              },
            ],
          },
        },
      },
    ],
  },
  noAccessResponse:
    'Message: Not Found\n  ∟ Request: POST https://hapi.fhir.org/baseR4/noAccess\n  ∟ Status: 404\n',
};

export { fixtures };

// export default [
//   {
//     pattern: 'https://fake.server.com/api(.*)',

//     fixtures(match, params, headers) {
//       if (match[1] === '/api') {
//         return { body: fixtures.post.responseBody, params, headers };
//       }

//       throw new Error(
//         `No Fixture Match\ngot: ${JSON.stringify(match, 2, null)}`
//       );
//     },

//     post(match, data) {
//       return {
//         ok: true,
//         match,
//         ...data,
//       };
//     },
//   },
// ];
