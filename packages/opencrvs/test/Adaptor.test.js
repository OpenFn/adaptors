import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  createBirthNotification,
  queryEvents,
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
