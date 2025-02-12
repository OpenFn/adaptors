import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { execute, get, post, put, patch } from '../src/Adaptor.js';

// This creates a mock client which acts like a fake server.
// It enables pattern-matching on the request object and custom responses
// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
const baseUrl = 'https://fake.satusehat.server.com';
const testServer = enableMockClient(baseUrl);
before(() => {
  testServer
    .intercept({
      path: '/oauth2/v1/accesstoken',
      method: 'POST',
      query: {
        grant_type: 'client_credentials',
      },
    })
    .reply(200, {
      access_token: 'fake-token',
    })
    .persist();
});

describe('execute', () => {
  it('executes each operation in sequence', async () => {
    const state = {
      configuration: {
        baseUrl,
        clientId: 'someclientid',
        clientSecret: 'someclientsecret',
      },
    };
    const operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    const finalState = await execute(...operations)(state);

    expect(finalState).to.eql({ counter: 3 });
  });

  it('assigns references and data to the initialState', async () => {
    const state = {
      configuration: {
        baseUrl,
        clientId: 'someclientid',
        clientSecret: 'someclientsecret',
      },
    };

    const finalState = await execute()(state);

    expect(finalState).to.eql({
      configuration: {
        baseUrl: 'https://fake.satusehat.server.com',
        clientId: 'someclientid',
        clientSecret: 'someclientsecret',
        access_token: 'fake-token',
      },
      references: [],
      data: null,
    });
  });
});

describe('get', () => {
  it('throws if an absolute URL is passed', async () => {
    const state = {
      configuration: {
        baseUrl,
        clientId: 'someclientid',
        clientSecret: 'someclientsecret',
      },
    };

    // happily the request won't actually be made, so we don't need to mock anything here
    let err;
    try {
      await execute(get('https://www.blah.com/a/b/c'))(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.equal('UNEXPECTED_ABSOLUTE_URL');
  });

  it('should fetch organizations', async () => {
    testServer
      .intercept({
        path: `/fhir-r4/v1/Organization`,
        method: 'GET',
        query: {
          name: 'somename',
        },
      })
      .reply(200, () => {
        return {
          entry: [
            {
              fullUrl:
                'https://fake.satusehat.server.com/fhir-r4/v1/Organization/12345-6789',
              resource: {
                active: true,
                id: '12345-6789',
                identifier: [],
                meta: {
                  lastUpdated: '2024-02-16T23:20:58.932647+00:00',
                  versionId: 'someid',
                },
                name: 'STAGING email@gmail.com',
                resourceType: 'Organization',
                telecom: [
                  {
                    system: 'phone',
                    use: 'work',
                    value: '+62011',
                  },
                  {
                    system: 'email',
                    use: 'work',
                    value: 'email@gmail.com',
                  },
                ],
              },
            },
          ],
          link: [
            {
              relation: 'search',
              url: 'https://fake.satusehat.server.com/fhir-r4/v1/Organization/?name=somename',
            },
          ],
          resourceType: 'Bundle',
          total: 1,
          type: 'searchset',
        };
      });

    const state = {
      configuration: {
        baseUrl,
        clientId: 'someclientid',
        clientSecret: 'someclientsecret',
      },
    };

    const { data } = await execute(get('Organization', { name: 'somename' }))(
      state
    );

    expect(data.entry.length).to.equal(1);
    expect(data).to.haveOwnProperty('link');
  });

  it('should fetch organization by id', async () => {
    testServer
      .intercept({
        path: `/fhir-r4/v1/Organization/12345-6789`,
        method: 'GET',
      })
      .reply(200, () => {
        return {
          active: true,
          id: '12345-6789',
          identifier: [],
          meta: {
            lastUpdated: '2024-02-16T21:24:59.581504+00:00',
            versionId: 'someid',
          },
          name: 'STAGING email@gmail.com',
          resourceType: 'Organization',
          telecom: [
            {
              system: 'phone',
              use: 'work',
              value: '+62011',
            },
            {
              system: 'email',
              use: 'work',
              value: 'email@gmail.com',
            },
          ],
        };
      });

    const state = {
      configuration: {
        baseUrl,
        clientId: 'someclientid',
        clientSecret: 'someclientsecret',
      },
    };

    const { data } = await execute(get('Organization/12345-6789'))(state);

    expect(data.id).to.equal('12345-6789');
    expect(data.active).to.equal(true);
  });
});

describe('post', () => {
  it('should create an organization', async () => {
    testServer
      .intercept({
        path: `/fhir-r4/v1/Organization`,
        method: 'POST',
      })

      .reply(200, () => {
        return {
          active: true,
          address: [
            {
              city: 'Jakarta',
              country: 'ID',
              extension: [
                {
                  extension: [
                    {
                      url: 'province',
                      valueCode: '01',
                    },
                    {
                      url: 'city',
                      valueCode: '0111',
                    },
                    {
                      url: 'district',
                      valueCode: '011101',
                    },
                    {
                      url: 'village',
                      valueCode: '01110101',
                    },
                  ],
                  url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode',
                },
              ],
              line: ['Address Line'],
              postalCode: '55292',
              type: 'both',
              use: 'work',
            },
          ],
          id: 'abcd-efg-hij1',
          identifier: [
            {
              system: 'http://sys-ids.kemkes.go.id/organization/00001',
              use: 'official',
              value: 'Some Value',
            },
          ],
          meta: {
            lastUpdated: '2024-05-27T08:34:55.213877+00:00',
            versionId: 'MNHadg34',
          },
          name: 'Some Name',
          partOf: {
            reference: 'Organization/abcd-efg-hij1',
          },
          resourceType: 'Organization',
          telecom: [
            {
              system: 'phone',
              use: 'work',
              value: '+6221-783042654',
            },
            {
              system: 'email',
              use: 'work',
              value: 'email@gmail.com',
            },
            {
              system: 'url',
              use: 'work',
              value: 'www.email@gmail.com',
            },
          ],
          type: [
            {
              coding: [
                {
                  code: 'dept',
                  display: 'Hospital Department',
                  system:
                    'http://terminology.hl7.org/CodeSystem/organization-type',
                },
              ],
            },
          ],
        };
      });

    const state = {
      configuration: {
        baseUrl,
        clientId: 'someclientid',
        clientSecret: 'someclientsecret',
      },
    };

    const { data } = await execute(
      post('Organization', {
        resourceType: 'Organization',
        active: true,
        identifier: [
          {
            use: 'official',
            system: 'http://sys-ids.kemkes.go.id/organization/00001',
            value: 'Some Value',
          },
        ],
        type: [
          {
            coding: [
              {
                system:
                  'http://terminology.hl7.org/CodeSystem/organization-type',
                code: 'dept',
                display: 'Hospital Department',
              },
            ],
          },
        ],
        name: 'Some Name',
        telecom: [
          {
            system: 'phone',
            value: '+6221-783042654',
            use: 'work',
          },
          {
            system: 'email',
            value: 'email@gmail.com',
            use: 'work',
          },
          {
            system: 'url',
            value: 'www.emailt@gmail.com',
            use: 'work',
          },
        ],
        address: [
          {
            use: 'work',
            type: 'both',
            line: ['Address Line'],
            city: 'Jakarta',
            postalCode: '55292',
            country: 'ID',
            extension: [
              {
                url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode',
                extension: [
                  {
                    url: 'province',
                    valueCode: '01',
                  },
                  {
                    url: 'city',
                    valueCode: '0111',
                  },
                  {
                    url: 'district',
                    valueCode: '011101',
                  },
                  {
                    url: 'village',
                    valueCode: '01110101',
                  },
                ],
              },
            ],
          },
        ],
        partOf: {
          reference: 'Organization/abcd-efg-hij1',
        },
      })
    )(state);

    expect(data).to.haveOwnProperty('name');
    expect(data.name).to.equal('Some Name');
    expect(data.active).to.equal(true);
  });
});

describe('put', () => {
  it('should update an organization', async () => {
    testServer
      .intercept({
        path: `/fhir-r4/v1/Organization/12345-6789`,
        method: 'PUT',
      })
      .reply(200, () => {
        return {
          active: false,
          id: '12345-6789',
          identifier: [],
          meta: {
            lastUpdated: '2024-05-29T07:37:07.508864+00:00',
            versionId: 'someid',
          },
          resourceType: 'Organization',
        };
      });

    const state = {
      configuration: {
        baseUrl,
        clientId: 'someclientid',
        clientSecret: 'someclientsecret',
      },
    };

    const { data } = await execute(
      put('Organization/12345-6789', {
        resourceType: 'Organization',
        id: '12345-6789',
        active: false,
      })
    )(state);

    expect(data.active).to.equal(false);
    expect(data.id).to.equal('12345-6789');
  });
});

describe('patch', () => {
  it('should partially update an organization', async () => {
    testServer
      .intercept({
        path: `/fhir-r4/v1/Organization/12345-6789`,
        method: 'PATCH',
      })
      .reply(200, () => {
        return {
          active: false,
          id: '12345-6789',
          identifier: [],
          meta: {
            lastUpdated: '2024-05-29T07:37:07.508864+00:00',
            versionId: 'someid',
          },
          resourceType: 'Organization',
        };
      });

    const state = {
      configuration: {
        baseUrl,
        clientId: 'someclientid',
        clientSecret: 'someclientsecret',
      },
    };

    const { data } = await execute(
      patch('Organization/12345-6789', [
        {
          op: 'replace',
          path: '/active',
          value: false,
        },
      ])
    )(state);

    expect(data.active).to.equal(false);
    expect(data.id).to.equal('12345-6789');
  });
});
