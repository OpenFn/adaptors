import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  request,
  post,
  createBirthNotification,
  queryEvents,
} from '../src/Adaptor.js';
import { birthRecordData } from './testData.js';

const authUrl = enableMockClient('https://auth.fake.opencrvs.server.com');
const baseUrl = 'https://gateway.fake.opencrvs.server.com';
const testServer = enableMockClient(baseUrl);

const state = {
  configuration: {
    domain: 'gateway.fake.opencrvs.server.com',
    clientId: 'someclientid',
    clientSecret: 'someclientsecret',
  },
};

before(() => {
  state.configuration.domain = 'fake.opencrvs.server.com';
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

describe('request', () => {
  it('makes a post request to create a birth notification', async () => {
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
      request('POST', '/notification', {
        resourceType: 'Bundle',
        type: 'document',
        meta: {
          lastUpdated: new Date().toISOString(),
        },
        entry: birthRecordData,
      })
    )(state);

    expect(finalState.data).to.eql({
      resourceType: 'Bundle',
      type: 'document',
      entry: birthRecordData,
    });
  });
});

describe('post', () => {
  it('makes a post request to create a birth notification', async () => {
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
      post('/notification', {
        resourceType: 'Bundle',
        type: 'document',
        meta: {
          lastUpdated: new Date().toISOString(),
        },
        entry: birthRecordData,
      })
    )(state);

    expect(finalState.data).to.eql({
      resourceType: 'Bundle',
      type: 'document',
      entry: birthRecordData,
    });
  });
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

describe('queryEvents', () => {
  it('successfully searches for an event', async () => {
    testServer
      .intercept({
        path: '/graphql',
        method: 'POST',
        headers: {
          Authorization: 'Bearer fake-token',
          'Content-type': 'application/json',
        },
      })

      .reply(200, {
        data: {
          searchEvents: {
            totalItems: 0,
            results: [],
            __typename: 'EventSearchResultSet',
          },
        },
      });

    const finalState = await execute(
      queryEvents({
        event: 'birth',
        registrationStatuses: ['REGISTERED'],
        childGender: 'male',
        dateOfRegistrationEnd: '2022-12-31T23:59:59.999Z',
        dateOfRegistrationStart: '2021-11-01T00:00:00.000Z',
        declarationJurisdictionId: '',
        eventLocationId: '704b9706-d729-4834-8656-05b562065deb',
        fatherFirstNames: 'Dad',
        motherFirstNames: 'Mom',
      })
    )(state);

    expect(finalState.data).to.eql({
      data: {
        searchEvents: {
          totalItems: 0,
          results: [],
          __typename: 'EventSearchResultSet',
        },
      },
    });
  });
});
