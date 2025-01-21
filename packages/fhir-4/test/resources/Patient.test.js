import { expect, assert } from 'chai';
import { b } from '@openfn/language-fhir-4';

// For now, remove text and metadata from examples
const cleanExample = eg => {
  const { text, meta, ...rest } = eg;
  return rest;
};

describe('Patient', () => {
  it('should create a simple Patient', () => {
    const resource = b.patient({});
    assert.isOk(resource);
  });

  it("should create example 'patient-example'", () => {
    // https://hl7.org/fhir/R4B/patient-example.json.html
    const example = {
      resourceType: 'Patient',
      id: 'example',
      text: {
        status: 'generated',
        div: '\u003cdiv xmlns\u003d"http://www.w3.org/1999/xhtml"\u003e\n\t\t\t\u003ctable\u003e\n\t\t\t\t\u003ctbody\u003e\n\t\t\t\t\t\u003ctr\u003e\n\t\t\t\t\t\t\u003ctd\u003eName\u003c/td\u003e\n\t\t\t\t\t\t\u003ctd\u003ePeter James \n              \u003cb\u003eChalmers\u003c/b\u003e (\u0026quot;Jim\u0026quot;)\n            \u003c/td\u003e\n\t\t\t\t\t\u003c/tr\u003e\n\t\t\t\t\t\u003ctr\u003e\n\t\t\t\t\t\t\u003ctd\u003eAddress\u003c/td\u003e\n\t\t\t\t\t\t\u003ctd\u003e534 Erewhon, Pleasantville, Vic, 3999\u003c/td\u003e\n\t\t\t\t\t\u003c/tr\u003e\n\t\t\t\t\t\u003ctr\u003e\n\t\t\t\t\t\t\u003ctd\u003eContacts\u003c/td\u003e\n\t\t\t\t\t\t\u003ctd\u003eHome: unknown. Work: (03) 5555 6473\u003c/td\u003e\n\t\t\t\t\t\u003c/tr\u003e\n\t\t\t\t\t\u003ctr\u003e\n\t\t\t\t\t\t\u003ctd\u003eId\u003c/td\u003e\n\t\t\t\t\t\t\u003ctd\u003eMRN: 12345 (Acme Healthcare)\u003c/td\u003e\n\t\t\t\t\t\u003c/tr\u003e\n\t\t\t\t\u003c/tbody\u003e\n\t\t\t\u003c/table\u003e\n\t\t\u003c/div\u003e',
      },
      identifier: [
        {
          use: 'usual',
          type: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                code: 'MR',
              },
            ],
          },
          system: 'urn:oid:1.2.36.146.595.217.0.1',
          value: '12345',
          period: {
            start: '2001-05-06',
          },
          assigner: {
            display: 'Acme Healthcare',
          },
        },
      ],
      active: true,
      name: [
        {
          use: 'official',
          family: 'Chalmers',
          given: ['Peter', 'James'],
        },
        {
          use: 'usual',
          given: ['Jim'],
        },
        {
          use: 'maiden',
          family: 'Windsor',
          given: ['Peter', 'James'],
          period: {
            end: '2002',
          },
        },
      ],
      telecom: [
        {
          use: 'home',
        },
        {
          system: 'phone',
          value: '(03) 5555 6473',
          use: 'work',
          rank: 1,
        },
        {
          system: 'phone',
          value: '(03) 3410 5613',
          use: 'mobile',
          rank: 2,
        },
        {
          system: 'phone',
          value: '(03) 5555 8834',
          use: 'old',
          period: {
            end: '2014',
          },
        },
      ],
      gender: 'male',
      birthDate: '1974-12-25',
      //   _birthDate: {
      //     extension: [
      //       {
      //         url: 'http://hl7.org/fhir/StructureDefinition/patient-birthTime',
      //         valueDateTime: '1974-12-25T14:35:45-05:00',
      //       },
      //     ],
      //   },
      deceasedBoolean: false,
      address: [
        {
          use: 'home',
          type: 'both',
          text: '534 Erewhon St PeasantVille, Rainbow, Vic  3999',
          line: ['534 Erewhon St'],
          city: 'PleasantVille',
          district: 'Rainbow',
          state: 'Vic',
          postalCode: '3999',
          period: {
            start: '1974-12-25',
          },
        },
      ],
      contact: [
        {
          relationship: [
            {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/v2-0131',
                  code: 'N',
                },
              ],
            },
          ],
          name: {
            family: 'du Marché',
            _family: {
              extension: [
                {
                  url: 'http://hl7.org/fhir/StructureDefinition/humanname-own-prefix',
                  valueString: 'VV',
                },
              ],
            },
            given: ['Bénédicte'],
          },
          telecom: [
            {
              system: 'phone',
              value: '+33 (237) 998327',
            },
          ],
          address: {
            use: 'home',
            type: 'both',
            line: ['534 Erewhon St'],
            city: 'PleasantVille',
            district: 'Rainbow',
            state: 'Vic',
            postalCode: '3999',
            period: {
              start: '1974-12-25',
            },
          },
          gender: 'female',
          period: {
            start: '2012',
          },
        },
      ],
      managingOrganization: {
        reference: 'Organization/1',
      },
      meta: {
        tag: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v3-ActReason',
            code: 'HTEST',
            display: 'test health data',
          },
        ],
      },
    };

    const resource = b.patient({
      id: 'example',
      identifier: {
        use: 'usual',
        type: b.cc(['MR', 'http://terminology.hl7.org/CodeSystem/v2-0203']),
        system: 'urn:oid:1.2.36.146.595.217.0.1',
        value: '12345',
        period: {
          start: '2001-05-06',
        },
        assigner: {
          display: 'Acme Healthcare',
        },
      },
      active: true,

      // Nothing I can do to simplify this structure
      // maybe name { official: {}, usual: {}, maiden } *shrug*
      name: [
        {
          use: 'official',
          family: 'Chalmers',
          given: ['Peter', 'James'],
        },
        {
          use: 'usual',
          given: ['Jim'],
        },
        {
          use: 'maiden',
          family: 'Windsor',
          given: ['Peter', 'James'],
          period: {
            end: '2002',
          },
        },
      ],

      // can't really improve this. Maybe { home, work, mobile } *shrug*
      telecom: [
        {
          use: 'home',
        },
        {
          system: 'phone',
          value: '(03) 5555 6473',
          use: 'work',
          rank: 1,
        },
        {
          system: 'phone',
          value: '(03) 3410 5613',
          use: 'mobile',
          rank: 2,
        },
        {
          system: 'phone',
          value: '(03) 5555 8834',
          use: 'old',
          period: {
            end: '2014',
          },
        },
      ],
      gender: 'male',
      birthDate: '1974-12-25',
      deceased: false, // maps to deceasedBoolean. small gain. But also, deceasedBoolean won't work.
      address: [
        {
          use: 'home',
          type: 'both',
          text: '534 Erewhon St PeasantVille, Rainbow, Vic  3999',
          line: ['534 Erewhon St'],
          city: 'PleasantVille',
          district: 'Rainbow',
          state: 'Vic',
          postalCode: '3999',
          period: {
            start: '1974-12-25',
          },
        },
      ],
      contact: [
        {
          relationship: [
            b.cc(['N', 'http://terminology.hl7.org/CodeSystem/v2-0131']),
          ],
          name: {
            family: 'du Marché',
            _family: {
              extension: [
                {
                  url: 'http://hl7.org/fhir/StructureDefinition/humanname-own-prefix',
                  valueString: 'VV',
                },
              ],
            },
            given: ['Bénédicte'],
          },
          telecom: [
            {
              system: 'phone',
              value: '+33 (237) 998327',
            },
          ],
          address: {
            use: 'home',
            type: 'both',
            line: ['534 Erewhon St'],
            city: 'PleasantVille',
            district: 'Rainbow',
            state: 'Vic',
            postalCode: '3999',
            period: {
              start: '1974-12-25',
            },
          },
          gender: 'female',
          period: {
            start: '2012',
          },
        },
      ],

      // This is a little easier too
      managingOrganization: 'Organization/1',
    });
    expect(cleanExample(resource)).to.eql(cleanExample(example));
  });
});
