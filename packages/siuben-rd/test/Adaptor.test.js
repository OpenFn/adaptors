import { expect } from 'chai';
import { execute } from '../src/Adaptor.js';
import * as http from '../src/http.js';

import { enableMockClient } from '@openfn/language-common/util';

const baseUrl = 'https://fake.server.com';
const testServer = enableMockClient(baseUrl);

const configuration = {
  baseUrl,
  username: 'admin',
  password: 'secret',
};

// Helper to mock the /authenticate endpoint that runs via execute()
testServer
  .intercept({
    path: '/authenticate',
    method: 'POST',
  })
  .reply(200, { Token: 'fake-token' })
  .persist();

describe('http.get', () => {
  it('should make an authenticated GET request', async () => {

    testServer
      .intercept({
        path: '/consulta',
        method: 'GET',
        headers: {
          Authorization: 'Bearer fake-token',
        },
      })
      .reply(200, { results: [{ id: 1, nombre: 'Juan' }] });

    const state = { configuration, data: {} };

    const finalState = await execute(http.get('consulta'))(state);

    expect(finalState.data).to.eql({ results: [{ id: 1, nombre: 'Juan' }] });
  });

  it('should make a GET request with query parameters', async () => {

    testServer
      .intercept({
        path: '/consulta',
        method: 'GET',
        query: {
          nombre: 'Felipe',
          provincia: 'Santo Domingo',
        },
      })
      .reply(200, { results: [{ id: 2, nombre: 'Felipe' }] });

    const state = { configuration, data: {} };

    const finalState = await execute(
      http.get('consulta', {
        query: {
          nombre: 'Felipe',
          provincia: 'Santo Domingo',
        },
      }),
    )(state);

    expect(finalState.data).to.eql({
      results: [{ id: 2, nombre: 'Felipe' }],
    });
  });
});

describe('http.request', () => {
  it('should make a GET request', async () => {

    testServer
      .intercept({
        path: '/consulta/123',
        method: 'GET',
      })
      .reply(200, { id: 123, nombre: 'Maria' });

    const state = { configuration, data: {} };

    const finalState = await execute(http.request('GET', 'consulta/123'))(
      state,
    );

    expect(finalState.data).to.eql({ id: 123, nombre: 'Maria' });
  });

  it('should throw an error if the server returns 403', async () => {

    testServer
      .intercept({
        path: '/restricted',
        method: 'GET',
      })
      .reply(403);

    const state = { configuration, data: {} };

    const error = await execute(http.request('GET', 'restricted'))(state).catch(
      e => e,
    );

    expect(error.statusMessage).to.eql('Forbidden');
  });
});
