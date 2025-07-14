
import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { post, request } from '../src/http';
import { execute } from '../src';

const authUrl = enableMockClient('https://auth.fake.opencrvs.http.com');
const baseUrl = 'https://gateway.fake.opencrvs.http.com';
const testServer = enableMockClient(baseUrl);

const state = {
  configuration: {
    domain: 'fake.opencrvs.http.com',
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

describe('request', () => {
  it('sends a POST request and sets response and data on state', async () => {
    const payload = { foo: 'bar' };
    const expectedResponse = { status: 'ok', received: true };

    testServer
      .intercept({
        path: '/test',
        method: 'POST',
        headers: {
          Authorization: 'Bearer fake-token',
          'Content-Type': 'application/json',
        },
      })
      .reply(200, expectedResponse);

    state.data = payload;

    const finalState = await execute(request('POST', '/test', payload))(state);

    expect(finalState.response).to.be.an('object');
    expect(finalState.response.statusCode).to.equal(200);

    expect(finalState.data).to.deep.equal(expectedResponse);
  });
});

describe('post', () => {
  it('sends a POST request with body and returns parsed response in state', async () => {
    const payload = { foo: 'bar' };
    const responseBody = { success: true, received: payload };

    testServer
      .intercept({
        path: '/test',
        method: 'POST',
        headers: {
          Authorization: 'Bearer fake-token',
          'Content-Type': 'application/json',
        },
      })
      .reply(200, responseBody);

    state.data = payload;

    const finalState = await execute(post('/test', state => state.data))(state);

    expect(finalState.response.statusCode).to.equal(200);
    expect(finalState.data).to.deep.equal(responseBody);
  });
});