import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { execute} from '../src/Adaptor.js';
import { request, post } from '../src/http.js';

const tokenUrl = 'https://primespingb2cuat.b2clogin.com'

// Mock OAuth token server
const authServer = enableMockClient(tokenUrl);

// Mock PING API server
const testServer = enableMockClient('https://fake.ping.server.com');

const state = {
  configuration: {
    baseUrl: 'https://fake.ping.server.com',
    tokenUrl: tokenUrl,
    clientId: 'test-client-id',
    username: 'test-user',
    password: 'test-password',
    scope: 'https://primespingb2cuat.onmicrosoft.com/apimurls/API.Read',
    subscriptionKey: 'test-key',
  },
};

before(() => {
  authServer
    .intercept({
      path: '/primespingb2cuat.onmicrosoft.com/b2c_1_msawe-primes-ping-test-apim-rpocuf/oauth2/v2.0/token',
      method: 'POST',
    })
    .reply(200, {
      access_token: 'fake-token',
      token_type: 'Bearer',
      expires_in: 3600,
    })
    .persist();
});

describe('post', () => {
  it('posts data to ingestion endpoint', async () => {
    testServer
      .intercept({
        path: '/api/ingestion/v2/PNR-1363/data',
        method: 'POST',
        headers: {
          Authorization: 'Bearer fake-token',
          'Ocp-Apim-Subscription-Key': 'test-key',
          'content-type': 'application/json',
        },
      })
      .reply(200, { 
        success: true, 
        recordsProcessed: 2 
      });

    state.data = {
      ShippingProcessId: 'SHP-2748',
      InteropId: 'INT-1436',
      Data: [
        {
          ExternalId: 'id55',
          Fields: [
            {
              Name: 'progres_lpinterventionid',
              Value: '34be03a4-1eea-f011-8544-7c1e525f3837',
            },
          ],
        },
      ],
    };

    const finalState = await execute(
      post('/api/ingestion/v2/PNR-1363/data', {
        ShippingProcessId: state.data.ShippingProcessId,
        InteropId: state.data.InteropId,
        Data: state.data.Data,
      })
    )(state);

    expect(finalState.data).to.eql({
      success: true,
      recordsProcessed: 2,
    });
  });
});

describe('request', () => {
  it('retrieves data with paging', async () => {
    testServer
      .intercept({
        path: '/primes/fetch/paging/v3/retrievedatawithpaging',
        method: 'POST',
        headers: {
          Authorization: 'Bearer fake-token',
          'Ocp-Apim-Subscription-Key': 'test-key',
          'content-type': 'application/json',
        },
      })
      .reply(200, {
        data: [
          { id: 1, interventionId: '34be03a4-1eea-f011-8544-7c1e525f3837' },
          { id: 2, interventionId: 'ee0b14fa-e1ea-f011-8544-7c1e525f3837' },
        ],
        totalRecords: 2,
      });

    const finalState = await execute(
      request('POST', 'primes/fetch/paging/v3/retrievedatawithpaging', {
        ShippingProcessId: 'SHP-2747',
        PartnerId: 'PNR-1363',
        InteropID: 'INT-1436',
        APIVersion: 'V3',
        QueryParameters: [],
      })
    )(state);

    expect(finalState.data).to.eql({
      data: [
        { id: 1, interventionId: '34be03a4-1eea-f011-8544-7c1e525f3837' },
        { id: 2, interventionId: 'ee0b14fa-e1ea-f011-8544-7c1e525f3837' },
      ],
      totalRecords: 2,
    });
  });

  it('throws an error if the service returns 403', async () => {
    const errorMessage = "Mock dispatch not matched for path '/noAccess': subsequent request to origin https://fake.ping.server.com was not allowed (net.connect disabled)"
    testServer
      .intercept({
        path: '/api/noAccess',
        method: 'POST',
      })
      .reply(403);

    const error = await execute(
      request('POST', 'noAccess', { name: 'test' })
    )(state).catch(error => {
      return error;
    });
    expect(error.message).to.eql(errorMessage);
  });
});




