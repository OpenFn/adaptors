import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { request } from '../src/Adaptor.js';
import testData from './fixtures.json' assert {type: 'json'};

const testServer = enableMockClient('https://fake.server.com');

let state = {
  "configuration": {
    "baseUrl": "https://fake.server.com/",
    "subscription_key": "fbe630ee209443d787927b08b3c57902",
    "api_key": "9d372b835db142778a439ec2e9a2457d",
    "api_user": "812d588a-6d74-46cd-baaf-355a2f433020"
  }
}

describe('request', () => {
  it('makes a post request to the right endpoint', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/collection/v2_0/invoice',
        method: 'POST'
      })
      .reply(200, testData.invoiceResponse);

    const finalState = await request('POST', '/collection/v2_0/invoice', testData.invoiceBody, {
      headers: {
        Authorization: 'xyz'
      }
    })(state);
    expect(finalState.data).to.eql(testData.invoiceResponse);
  });

  it('gets and access token when one is not provided', async () => {
    let authHeaderUsed = null;
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/collection/token/',
        method: 'POST'
      })
      .reply(200, { access_token: 'xyz' });

    testServer
      .intercept({
        path: '/collection/v2_0/invoice',
        method: 'POST'
      })
      .reply(200, async (options, body) => {
        authHeaderUsed = options.headers['Authorization'];
        return testData.invoiceResponse;
      });

    const finalState = await request('POST', '/collection/v2_0/invoice', testData.invoiceBody)(state);
    expect(authHeaderUsed).to.match(/^Bearer\s.+/);
    expect(finalState.data).to.eql(testData.invoiceResponse);
  });

  it('throws an error if the service returns 403', async () => {
    testServer
      .intercept({
        path: '/noAccess',
        method: 'GET',
      })
      .reply(403);

    const error = await request('GET', '/noAccess', {}, {
      headers: {
        Authorization: 'xyz'
      }
    })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Forbidden');
  });
});
