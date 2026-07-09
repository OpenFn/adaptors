import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { createBirthRecord, get, request } from '../src/Adaptor.js';
import { setupMockServer, jsonReply } from './mock.js';
import {
  testBirthData,
  birthCreationResponse,
  tokenResponse,
} from './fixtures.js';

// enableMockClient registers a mock agent per origin for the whole test
// process, so set it up once at module load. Error-path tests use their
// own origins (below) so they don't collide with these happy-path mocks.
const { requests } = setupMockServer('https://bdr.npontu.com');

const configuration = {
  token: 'fake-test-token',
  baseUrl: 'https://bdr.npontu.com',
};

const BIRTH_PATH =
  '/api/v1/UserManagementService/integrations/registrations/birth';
const TOKEN_PATH = '/api/v1/UserManagementService/integrations/auth/token';

beforeEach(() => {
  requests.length = 0;
});

describe('createBirthRecord', () => {
  it('creates a birth record', async () => {
    const state = { configuration, data: testBirthData };

    const finalState = await createBirthRecord(state => state.data)(state);

    expect(finalState).to.exist;
    expect(finalState.data).to.exist;
    expect(finalState.data.api_status).to.equal('success');
    expect(finalState.data.api_data.document_number).to.equal(
      birthCreationResponse.api_data.document_number
    );
  });

  it('sends the payload and auth headers to the endpoint', async () => {
    const state = { configuration, data: testBirthData };

    await createBirthRecord(state => state.data)(state);

    expect(requests.length).to.equal(2);

    const [tokenRequest, birthRequest] = requests;
    expect(tokenRequest.method).to.equal('POST');
    expect(tokenRequest.path).to.equal(TOKEN_PATH);
    expect(tokenRequest.headers.Token).to.equal('fake-test-token');

    expect(birthRequest.method).to.equal('POST');
    expect(birthRequest.path).to.equal(BIRTH_PATH);
    expect(birthRequest.headers['Content-Type']).to.equal('application/json');
    expect(birthRequest.headers.Authorization).to.equal(
      `Bearer ${tokenResponse.api_data.access_token}`
    );
    // The whole payload must be forwarded, unchanged, as single-encoded JSON
    expect(birthRequest.data).to.deep.equal(testBirthData);
  });

  it('reuses a cached access token across operations in the same run', async () => {
    const state = { configuration, data: testBirthData };

    const nextState = await createBirthRecord(state => state.data)(state);
    await createBirthRecord(() => testBirthData)(nextState);

    const tokenFetches = requests.filter(r => r.path === TOKEN_PATH);
    expect(tokenFetches.length).to.equal(1);
  });
});

describe('get', () => {
  it('retrieves a birth record via GET', async () => {
    const state = { configuration };

    const finalState = await get(`${BIRTH_PATH}/123`)(state);

    expect(finalState.data.api_data.document_number).to.equal(
      birthCreationResponse.api_data.document_number
    );

    const getRequest = requests.find(r => r.method === 'GET');
    expect(getRequest.path).to.equal(`${BIRTH_PATH}/123`);
    expect(getRequest.data).to.equal(undefined);
    expect(getRequest.headers.Authorization).to.equal(
      `Bearer ${tokenResponse.api_data.access_token}`
    );
  });
});

describe('request', () => {
  it('makes a general HTTP request with the given method, path and body', async () => {
    const state = { configuration };

    const finalState = await request(
      'POST',
      '/api/v1/UserManagementService/integrations/utility',
      { type: 'regions' }
    )(state);

    expect(finalState.data.api_data).to.be.an('array');
    expect(finalState.data.api_data[0].name).to.equal('Ashanti');

    const utilityRequest = requests.find(r => r.path.includes('/utility'));
    expect(utilityRequest.method).to.equal('POST');
    expect(utilityRequest.data).to.deep.equal({ type: 'regions' });
    expect(utilityRequest.headers.Authorization).to.equal(
      `Bearer ${tokenResponse.api_data.access_token}`
    );
  });
});

describe('error handling', () => {
  it('refreshes the token and retries once on 401', async () => {
    const pool = enableMockClient('https://bdr-retry.test');
    let tokenCalls = 0;
    pool
      .intercept({ method: 'POST', path: /auth\/token/ })
      .reply(() => {
        tokenCalls++;
        return jsonReply(tokenResponse);
      })
      .persist();
    // First data call gets a 401 (consumed once), the retry gets a 200
    pool
      .intercept({ method: 'POST', path: BIRTH_PATH })
      .reply(401, { api_message: 'token expired' });
    pool
      .intercept({ method: 'POST', path: BIRTH_PATH })
      .reply(200, birthCreationResponse);

    const state = {
      configuration: { token: 'fake-test-token', baseUrl: 'https://bdr-retry.test' },
      data: testBirthData,
    };

    const finalState = await createBirthRecord(state => state.data)(state);

    expect(finalState.data.api_status).to.equal('success');
    expect(tokenCalls).to.equal(2);
  });

  it('throws a clear error on non-2xx responses', async () => {
    const pool = enableMockClient('https://bdr-fail.test');
    pool
      .intercept({ method: 'POST', path: /auth\/token/ })
      .reply(200, tokenResponse)
      .persist();
    pool
      .intercept({ method: 'POST', path: BIRTH_PATH })
      .reply(417, { api_message: 'Record failed to save' })
      .persist();

    const state = {
      configuration: { token: 'fake-test-token', baseUrl: 'https://bdr-fail.test' },
      data: testBirthData,
    };

    let error;
    try {
      await createBirthRecord(state => state.data)(state);
    } catch (e) {
      error = e;
    }

    expect(error).to.exist;
    expect(error.statusCode).to.equal(417);
    expect(error.message).to.match(/returned 417/);
    expect(error.body.api_message).to.equal('Record failed to save');
  });

  it('throws when the token response is malformed', async () => {
    const pool = enableMockClient('https://bdr-badtoken.test');
    pool
      .intercept({ method: 'POST', path: /auth\/token/ })
      .reply(200, { api_code: 200, api_data: {} })
      .persist();

    const state = {
      configuration: { token: 'fake-test-token', baseUrl: 'https://bdr-badtoken.test' },
      data: testBirthData,
    };

    let error;
    try {
      await createBirthRecord(state => state.data)(state);
    } catch (e) {
      error = e;
    }

    expect(error).to.exist;
    expect(error.code).to.equal('BDR_AUTH_ERROR');
    expect(error.message).to.match(/Malformed token response/);
  });

  it('throws when configuration.token is missing', async () => {
    const state = {
      configuration: { baseUrl: 'https://bdr.npontu.com' },
      data: testBirthData,
    };

    let error;
    try {
      await createBirthRecord(state => state.data)(state);
    } catch (e) {
      error = e;
    }

    expect(error).to.exist;
    expect(error.message).to.match(/Missing configuration.token/);
  });
});
