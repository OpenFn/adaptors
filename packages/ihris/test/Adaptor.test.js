import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request } from '../src/Adaptor.js';

const testServer = enableMockClient('https://fake.server.com');

describe('request', () => {
  const state = {
    configuration: {
      baseUrl: 'https://fake.server.com',
      username: 'admin@ihris.org',
      password: 'admin123',
    },
    data: {},
    references: [],
  };

  beforeEach(() => {
    testServer
      .intercept({
        path: '/auth/login',
        method: 'POST',
        body: JSON.stringify({
          username: 'admin@ihris.org',
          password: 'admin123',
        }),
      })
      .reply(
        200,
        { success: true },
        {
          headers: { 'set-cookie': ['session=abc123; Path=/'] },
        }
      );
  });
  it('makes a post request to the right endpoint', async () => {
    const newRole = {
      resourceType: 'PractitionerRole',
      meta: {
        profile: [
          'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role',
        ],
      },
      practitioner: {
        reference: 'Practitioner/P10004',
      },
      organization: {
        reference: 'Organization/ministry-of-health',
      },
      location: [
        {
          reference: 'Location/kampala-hospital',
        },
      ],
      code: [
        {
          coding: [
            {
              system: 'http://ihris.org/fhir/CodeSystem/ihris-job',
              code: 'doctor',
              display: 'Doctor',
            },
          ],
        },
      ],
      active: true,
    };

    testServer
      .intercept({
        path: '/fhir/PractitionerRole',
        method: 'POST',
        body: JSON.stringify(newRole),
        headers: {
          Cookie: 'session=abc123',
          'content-type': 'application/fhir+json',
        },
      })
      .reply(201, {
        ...newRole,
        id: 'PR10001',
        meta: {
          ...newRole.meta,
          versionId: '1',
          lastUpdated: '2024-11-02T10:00:00.000+00:00',
        },
      });

    const finalState = await request(
      'POST',
      '/fhir/PractitionerRole',
      newRole
    )(state);
    expect(finalState.data.id).to.eql('PR10001');
    expect(finalState.data.resourceType).to.eql('PractitionerRole');
    expect(finalState.data.practitioner.reference).to.eql(
      'Practitioner/P10004'
    );
  });

  it('makes a get request to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/fhir/Practitioner',
        method: 'GET',
        headers: {
          Cookie: 'session=abc123',
          'content-type': 'application/fhir+json',
        },
        query: { active: 'true', _count: '10' },
      })
      .reply(200, {
        resourceType: 'Bundle',
        type: 'searchset',
        total: 2,
        entry: [
          {
            resource: {
              resourceType: 'Practitioner',
              id: 'P10004',
              active: true,
              name: [{ family: 'Johnson', given: ['Sarah'] }],
            },
          },
          {
            resource: {
              resourceType: 'Practitioner',
              id: 'P10005',
              active: true,
              name: [{ family: 'Smith', given: ['John'] }],
            },
          },
        ],
      });

    const finalState = await request(
      'GET',
      '/fhir/Practitioner',
      {},
      {
        query: { active: 'true', _count: '10' },
      }
    )(state);

    expect(finalState.data.resourceType).to.eql('Bundle');
    expect(finalState.data.entry).to.have.length(2);
    expect(finalState.data.total).to.eql(2);
  });
});
