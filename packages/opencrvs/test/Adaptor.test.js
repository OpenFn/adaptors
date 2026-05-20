import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  createBirthNotification,
  createEvent,
  notifyEvent,
  submitBirthNotification,
  getLocations,
  queryEvents,
  createDocumentEntry,
} from '../src/Adaptor.js';
import { birthRecordData } from './testData.js';

const authUrl = enableMockClient('https://auth.fake.opencrvs.server.com');
const baseUrl = 'https://gateway.fake.opencrvs.server.com';
const testServer = enableMockClient(baseUrl);
const registerServer = enableMockClient(
  'https://register.fake.opencrvs.server.com'
);
const countryconfigServer = enableMockClient(
  'https://countryconfig.fake.opencrvs.server.com'
);

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

describe('createEvent', () => {
  it('POSTs to register/api/events/events with a UUID transactionId', async () => {
    let receivedBody;

    registerServer
      .intercept({
        path: '/api/events/events',
        method: 'POST',
        headers: {
          Authorization: 'Bearer fake-token',
          'Content-Type': 'application/json',
        },
      })
      .reply(200, req => {
        receivedBody = JSON.parse(req.body);
        return { id: 'evt-1', trackingId: 'TRK1', type: 'birth' };
      });

    const finalState = await execute(
      createEvent('birth', { createdAtLocation: 'loc-1' })
    )(state);

    expect(receivedBody.type).to.equal('birth');
    expect(receivedBody.createdAtLocation).to.equal('loc-1');
    expect(receivedBody.transactionId).to.match(UUID_REGEX);

    expect(finalState.data).to.eql({
      id: 'evt-1',
      trackingId: 'TRK1',
      type: 'birth',
    });
  });

  it('uses a caller-supplied transactionId when provided', async () => {
    let receivedBody;

    registerServer
      .intercept({ path: '/api/events/events', method: 'POST' })
      .reply(200, req => {
        receivedBody = JSON.parse(req.body);
        return { id: 'evt-2' };
      });

    await execute(
      createEvent('birth', {
        createdAtLocation: 'loc-1',
        transactionId: 'fixed-txn-123',
      })
    )(state);

    expect(receivedBody.transactionId).to.equal('fixed-txn-123');
  });
});

describe('notifyEvent', () => {
  it('POSTs NOTIFY to register/api/events/events/{id}/notify', async () => {
    let receivedBody;
    let receivedPath;

    registerServer
      .intercept({
        path: '/api/events/events/evt-1/notify',
        method: 'POST',
        headers: {
          Authorization: 'Bearer fake-token',
          'Content-Type': 'application/json',
        },
      })
      .reply(200, req => {
        receivedBody = JSON.parse(req.body);
        receivedPath = req.path;
        return { id: 'evt-1', status: 'NOTIFIED' };
      });

    const declaration = {
      'child.name': { firstname: 'Test', surname: 'Baby' },
      'child.dob': '2026-05-01',
    };

    const finalState = await execute(
      notifyEvent('evt-1', declaration, { createdAtLocation: 'loc-1' })
    )(state);

    expect(receivedPath).to.equal('/api/events/events/evt-1/notify');
    expect(receivedBody.type).to.equal('NOTIFY');
    expect(receivedBody.createdAtLocation).to.equal('loc-1');
    expect(receivedBody.declaration).to.eql(declaration);
    expect(receivedBody.annotation).to.eql({});
    expect(receivedBody.transactionId).to.match(UUID_REGEX);

    expect(finalState.data).to.eql({ id: 'evt-1', status: 'NOTIFIED' });
  });
});

describe('submitBirthNotification', () => {
  it('chains createEvent then notifyEvent with the returned id', async () => {
    let createBody;
    let notifyBody;
    let notifyPath;

    registerServer
      .intercept({ path: '/api/events/events', method: 'POST' })
      .reply(200, req => {
        createBody = JSON.parse(req.body);
        return { id: 'evt-chained' };
      });

    registerServer
      .intercept({
        path: '/api/events/events/evt-chained/notify',
        method: 'POST',
      })
      .reply(200, req => {
        notifyBody = JSON.parse(req.body);
        notifyPath = req.path;
        return { id: 'evt-chained', status: 'NOTIFIED', trackingId: 'TRK99' };
      });

    const declaration = {
      'child.name': { firstname: 'Test', surname: 'Baby' },
      'child.dob': '2026-05-01',
      'child.gender': 'female',
    };

    const finalState = await execute(
      submitBirthNotification(declaration, { createdAtLocation: 'loc-9' })
    )(state);

    expect(createBody.type).to.equal('birth');
    expect(createBody.createdAtLocation).to.equal('loc-9');

    expect(notifyPath).to.equal('/api/events/events/evt-chained/notify');
    expect(notifyBody.type).to.equal('NOTIFY');
    expect(notifyBody.declaration).to.eql(declaration);
    expect(notifyBody.createdAtLocation).to.equal('loc-9');
    expect(notifyBody.transactionId).to.not.equal(createBody.transactionId);

    expect(finalState.data).to.eql({
      id: 'evt-chained',
      status: 'NOTIFIED',
      trackingId: 'TRK99',
    });
  });

  it('throws if createEvent response is missing an id', async () => {
    registerServer
      .intercept({ path: '/api/events/events', method: 'POST' })
      .reply(200, {});

    let error;
    try {
      await execute(
        submitBirthNotification(
          { 'child.name': { firstname: 'Test', surname: 'Baby' } },
          { createdAtLocation: 'loc-1' }
        )
      )(state);
    } catch (e) {
      error = e;
    }

    expect(error).to.exist;
    expect(error.message).to.match(
      /createEvent response did not include an id/
    );
  });
});

describe('getLocations', () => {
  it('GETs countryconfig/api/events/locations', async () => {
    countryconfigServer
      .intercept({
        path: '/api/events/locations',
        method: 'GET',
        headers: {
          Authorization: 'Bearer fake-token',
        },
      })
      .reply(200, [
        { id: 'loc-1', name: 'Ibombo' },
        { id: 'loc-2', name: 'Itambo' },
      ]);

    const finalState = await execute(getLocations())(state);

    expect(finalState.data).to.eql([
      { id: 'loc-1', name: 'Ibombo' },
      { id: 'loc-2', name: 'Itambo' },
    ]);
  });

  it('passes through query parameters', async () => {
    let receivedQuery;

    countryconfigServer
      .intercept({
        path: '/api/events/locations',
        method: 'GET',
        query: { type: 'ADMIN_STRUCTURE' },
      })
      .reply(200, req => {
        receivedQuery = req.query;
        return [];
      });

    await execute(getLocations({ params: { type: 'ADMIN_STRUCTURE' } }))(state);

    expect(receivedQuery).to.have.property('type', 'ADMIN_STRUCTURE');
  });
});
