import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { getUserInfo, request } from '../src/Adaptor.js';

const baseUrl = 'https://esignet-mock.collab.mosip.net';

const testServer = enableMockClient(baseUrl);

const state = {
  configuration: {
    baseUrl,
    access_token: 'fake-access-token',
  },
};

describe('getUserInfo', () => {
  it('fetches citizen claims from the userinfo endpoint', async () => {
    testServer
      .intercept({
        path: '/v1/esignet/oidc/userinfo',
        method: 'GET',
        headers: {
          Authorization: 'Bearer fake-access-token',
        },
      })
      .reply(200, {
        sub: 'citizen-unique-id',
        name: 'Jane Doe',
        gender: 'female',
        birthdate: '1992-03-15',
        email: 'jane@example.com',
        phone_number: '+254700000000',
      });

    const finalState = await getUserInfo()(state);

    expect(finalState.data).to.eql({
      sub: 'citizen-unique-id',
      name: 'Jane Doe',
      gender: 'female',
      birthdate: '1992-03-15',
      email: 'jane@example.com',
      phone_number: '+254700000000',
    });
    expect(finalState.response.statusCode).to.eql(200);
  });

  it('throws on 401 when the access token is invalid', async () => {
    testServer
      .intercept({
        path: '/v1/esignet/oidc/userinfo',
        method: 'GET',
      })
      .reply(401, { error: 'invalid_token' });

    const error = await getUserInfo()(state).catch(e => e);

    expect(error.statusCode).to.eql(401);
    expect(error.statusMessage).to.eql('Unauthorized');
  });
});

describe('request', () => {
  it('makes a GET request with bearer auth', async () => {
    testServer
      .intercept({
        path: '/v1/esignet/oidc/userinfo',
        method: 'GET',
        headers: {
          Authorization: 'Bearer fake-access-token',
        },
      })
      .reply(200, {
        sub: 'abc-123',
        name: 'Test User',
      });

    const finalState = await request(
      'GET',
      'v1/esignet/oidc/userinfo'
    )(state);

    expect(finalState.data).to.eql({
      sub: 'abc-123',
      name: 'Test User',
    });
  });

  it('throws on 403 forbidden', async () => {
    testServer
      .intercept({
        path: '/v1/esignet/oidc/userinfo',
        method: 'GET',
      })
      .reply(403, { error: 'access_denied' });

    const error = await request(
      'GET',
      'v1/esignet/oidc/userinfo'
    )(state).catch(e => e);

    expect(error.statusCode).to.eql(403);
    expect(error.statusMessage).to.eql('Forbidden');
  });
});
