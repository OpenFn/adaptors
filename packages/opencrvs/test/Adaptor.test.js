import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  createBirthNotification,
  queryEvents,
  createDocumentEntry,
} from '../src/Adaptor.js';
import { birthRecordData } from './testData.js';

const authUrl = enableMockClient('https://auth.fake.opencrvs.server.com');
const baseUrl = 'https://gateway.fake.opencrvs.server.com';
const testServer = enableMockClient(baseUrl);

const state = {
  configuration: {
    domain: 'fake.opencrvs.server.com',
    clientId: 'someclientid',
    clientSecret: 'someclientsecret',
  },
};

before(() => {
  authUrl
    .intercept({
      path: '/token',
      method: 'POST',
      query: {
        client_id: state.configuration.clientId,
        client_secret: state.configuration.clientSecret,
        grant_type: 'client_credentials',
      },
    })
    .reply(200, {
      access_token: 'fake-token',
    })
    .persist();
});

describe('createBirthRecord', () => {
  it('successfully creates a birth record', async () => {
    testServer
      .intercept({
        path: '/notification',
        method: 'POST',
        headers: {
          Authorization: 'Bearer fake-token',
          'Content-type': 'application/json',
        },
      })

      .reply(200, {
        resourceType: 'Bundle',
        type: 'document',
        entry: birthRecordData,
      });
    state.data = birthRecordData;

    const finalState = await execute(
      createBirthNotification(state => state.data)
    )(state);

    expect(finalState.data).to.eql({
      resourceType: 'Bundle',
      type: 'document',
      entry: birthRecordData,
    });
  });
});

describe('createBirthNotification', () => {
  it('sends a valid FHIR document bundle containing required resources', async () => {
    let receivedBody;

    testServer
      .intercept({
        path: '/notification',
        method: 'POST',
        headers: {
          Authorization: 'Bearer fake-token',
          'Content-Type': 'application/json',
        },
      })
      .reply(200, req => {
        receivedBody = JSON.parse(req.body);

        const isValidBundle =
          receivedBody.resourceType === 'Bundle' &&
          receivedBody.type === 'document' &&
          Array.isArray(receivedBody.entry) &&
          receivedBody.entry.length > 0 &&
          receivedBody.entry.every(
            entry =>
              typeof entry.fullUrl === 'string' &&
              entry.fullUrl.startsWith('urn:uuid:') &&
              entry.resource &&
              typeof entry.resource.resourceType === 'string'
          ) &&
          receivedBody.entry.some(
            entry => entry.resource.resourceType === 'Composition'
          );

        if (!isValidBundle) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid FHIR document bundle' }),
          };
        }

        return {
          resourceType: 'Bundle',
          type: 'document',
          entry: receivedBody.entry,
        };
      });

    state.data = birthRecordData;

    const finalState = await execute(
      createBirthNotification(state => state.data)
    )(state);

    expect(receivedBody.resourceType).to.equal('Bundle');
    expect(receivedBody.type).to.equal('document');
    expect(receivedBody.entry).to.deep.equal(birthRecordData);

    expect(finalState.data).to.deep.equal({
      resourceType: 'Bundle',
      type: 'document',
      entry: birthRecordData,
    });

    const hasComposition = receivedBody.entry.some(
      e => e.resource?.resourceType === 'Composition'
    );
    expect(hasComposition).to.equal(true);
  });
});

describe('queryEvents', () => {
  it('sends the correct GraphQL query and variables in the request body', async () => {
    const expectedVariables = {
      event: 'birth',
      registrationStatuses: ['REGISTERED'],
      childGender: 'male',
      dateOfRegistrationEnd: '2022-12-31T23:59:59.999Z',
      dateOfRegistrationStart: '2021-11-01T00:00:00.000Z',
      declarationJurisdictionId: '',
      eventLocationId: '704b9706-d729-4834-8656-05b562065deb',
      fatherFirstNames: 'Dad',
      motherFirstNames: 'Mom',
    };

    let receivedRequestBody;

    testServer
      .intercept({
        path: '/graphql',
        method: 'POST',
        headers: {
          Authorization: 'Bearer fake-token',
          'Content-Type': 'application/json',
        },
      })
      .reply(200, request => {
        receivedRequestBody = request.body;
        return {
          data: {
            searchEvents: {
              totalItems: 0,
              results: [],
              __typename: 'EventSearchResultSet',
            },
          },
        };
      });

    const finalState = await execute(queryEvents(expectedVariables))(state);

    expect(finalState.data).to.eql([]);

    const parsedBody = JSON.parse(receivedRequestBody);

    expect(parsedBody.query).to.be.a('string');
    expect(parsedBody.query).to.include('searchEvents');

    expect(
      parsedBody.variables.advancedSearchParameters.eventLocationId
    ).to.equal(expectedVariables.eventLocationId);
    expect(parsedBody.variables.advancedSearchParameters.event).to.equal(
      'birth'
    );
    expect(
      parsedBody.variables.advancedSearchParameters.registrationStatuses
    ).to.eql(['REGISTERED']);
    expect(
      parsedBody.variables.advancedSearchParameters.fatherFirstNames
    ).to.equal('Dad');
    expect(
      parsedBody.variables.advancedSearchParameters.motherFirstNames
    ).to.equal('Mom');
  });
});

describe('createDocumentEntry', () => {
  it('should create a valid bundle entry with auto-generated UUID when no fullUrl provided', () => {
    const resource = {
      resourceType: 'Patient',
      name: [{ given: ['John'], family: 'Doe' }],
      gender: 'male',
    };

    const entry = createDocumentEntry(resource);

    expect(entry).to.have.property('fullUrl');
    expect(entry).to.have.property('resource');
    expect(entry.fullUrl).to.match(
      /^urn:uuid:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
    expect(entry.resource).to.deep.equal(resource);
  });

  it('should create a valid bundle entry with provided fullUrl', () => {
    const resource = {
      resourceType: 'Observation',
      status: 'final',
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
      },
    };

    const customUrl = 'urn:uuid:12345678-abcd-efgh-ijkl-123456789012';
    const entry = createDocumentEntry(resource, customUrl);

    expect(entry.fullUrl).to.equal(customUrl);
    expect(entry.resource).to.deep.equal(resource);
  });

  it('should preserve all resource properties without modification', () => {
    const complexResource = {
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
          value: '1234567890',
        },
      ],
      name: [
        {
          use: 'en',
          family: 'Smith',
          given: ['Jane', 'Marie'],
        },
      ],
      gender: 'female',
      birthDate: '1990-01-01',
      address: [
        {
          type: 'PRIMARY_ADDRESS',
          line: ['123 Main St', 'Apt 4B'],
          city: 'Anytown',
          postalCode: '12345',
          country: 'US',
        },
      ],
      extension: [
        {
          url: 'http://opencrvs.org/specs/extension/patient-occupation',
          valueString: 'Engineer',
        },
      ],
    };

    const entry = createDocumentEntry(complexResource);

    expect(entry.resource).to.deep.equal(complexResource);
    expect(entry.resource.resourceType).to.equal('Patient');
    expect(entry.resource.name[0].given).to.deep.equal(['Jane', 'Marie']);
    expect(entry.resource.extension[0].valueString).to.equal('Engineer');
  });

  it('should work with FHIR-4 builder patterns', () => {
    const builderResult = {
      resourceType: 'Task',
      status: 'draft',
      intent: 'unknown',
      code: {
        coding: [
          {
            system: 'http://opencrvs.org/specs/types',
            code: 'BIRTH',
          },
        ],
      },
      extension: [
        {
          url: 'http://opencrvs.org/specs/extension/contact-person',
          valueString: 'MOTHER',
        },
      ],
    };

    const customId = 'urn:uuid:task-12345';
    const entry = createDocumentEntry(builderResult, customId);

    expect(entry.fullUrl).to.equal(customId);
    expect(entry.resource.resourceType).to.equal('Task');
    expect(entry.resource.status).to.equal('draft');
    expect(entry.resource.code.coding[0].code).to.equal('BIRTH');
  });

  it('should handle empty resource objects', () => {
    const emptyResource = {
      resourceType: 'Basic',
    };

    const entry = createDocumentEntry(emptyResource);

    expect(entry.resource).to.deep.equal(emptyResource);
    expect(entry.resource.resourceType).to.equal('Basic');
    expect(entry.fullUrl).to.match(/^urn:uuid:/);
  });

  it('should create unique UUIDs for multiple calls without fullUrl', () => {
    const resource1 = { resourceType: 'Patient', name: [{ given: ['John'] }] };
    const resource2 = { resourceType: 'Patient', name: [{ given: ['Jane'] }] };

    const entry1 = createDocumentEntry(resource1);
    const entry2 = createDocumentEntry(resource2);

    expect(entry1.fullUrl).to.not.equal(entry2.fullUrl);
    expect(entry1.fullUrl).to.match(/^urn:uuid:/);
    expect(entry2.fullUrl).to.match(/^urn:uuid:/);
  });
});
