import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, get, post, execute } from '../src/Adaptor.js';
import { fetchCookie } from '../src/Utils.js';

const testServer = enableMockClient('https://fake.server.com');

// Base state factory — pass config overrides (e.g. { apiPath: 'api/v2' })
const makeState = (configOverrides = {}) => ({
  configuration: {
    baseUrl: 'https://fake.server.com',
    apiKey: 'test-api-key',
    ...configOverrides,
  },
  data: {},
});

describe('fetchCookie', () => {
  it('stores the SID cookie in state.configuration using default apiPath api/v1', async () => {
    testServer
      .intercept({ path: '/api/v1/me', method: 'GET' })
      .reply(200, {}, { headers: { 'set-cookie': 'sid=abc123; Path=/' } });

    const nextState = await fetchCookie(makeState());

    expect(nextState.configuration.cookie).to.eql('abc123');
  });

  it('uses a custom apiPath when provided', async () => {
    testServer
      .intercept({ path: '/custom/me', method: 'GET' })
      .reply(200, {}, { headers: { 'set-cookie': 'sid=custom99; Path=/' } });

    const nextState = await fetchCookie(makeState({ apiPath: 'custom' }));

    expect(nextState.configuration.cookie).to.eql('custom99');
  });

  it('throws when the set-cookie header does not start with sid=', async () => {
    testServer
      .intercept({ path: '/api/v1/me', method: 'GET' })
      .reply(200, {}, { headers: { 'set-cookie': 'session=abc123; Path=/' } });

    const error = await fetchCookie(makeState()).catch(e => e);

    expect(error.message).to.include('SID cookie not found');
  });
});

describe('request', () => {
  it('makes a POST request to the right endpoint', async () => {
    testServer
      .intercept({ path: '/api/v1/patients', method: 'POST' })
      .reply(200, { id: 7, fullName: 'Mamadou', gender: 'M' });

    const finalState = await request('POST', 'patients', {
      fullName: 'Mamadou',
      gender: 'M',
    })(makeState());

    expect(finalState.data).to.eql({ id: 7, fullName: 'Mamadou', gender: 'M' });
  });

  it('makes a GET request to the right endpoint', async () => {
    testServer
      .intercept({ path: '/api/v1/patients', method: 'GET' })
      .reply(200, [{ id: 1, name: 'Ama' }]);

    const finalState = await request('GET', 'patients', null)(makeState());

    expect(finalState.data).to.eql([{ id: 1, name: 'Ama' }]);
  });

  it('sends a Bearer Authorization header', async () => {
    testServer
      .intercept({
        path: '/api/v1/patients',
        method: 'GET',
        headers: { authorization: 'Bearer test-api-key' },
      })
      .reply(200, { ok: true });

    const finalState = await request('GET', 'patients', null)(makeState());

    expect(finalState.data).to.eql({ ok: true });
  });

  it('sends the body as URL-encoded form data', async () => {
    let capturedBody;

    testServer
      .intercept({ path: '/api/v1/submit', method: 'POST' })
      .reply(200, req => {
        capturedBody = req.body;
        return { saved: true };
      });

    await request('POST', 'submit', { name: 'Bukayo', age: '25' })(makeState());

    expect(capturedBody).to.eql('name=Bukayo&age=25');
  });

  it('prefixes the path with the default apiPath api/v1', async () => {
    testServer
      .intercept({ path: '/api/v1/records', method: 'GET' })
      .reply(200, { total: 5 });

    const finalState = await request('GET', 'records', null)(makeState());

    expect(finalState.data).to.eql({ total: 5 });
  });

  it('uses a custom apiPath from configuration', async () => {
    testServer
      .intercept({ path: '/api/v2/records', method: 'GET' })
      .reply(200, { total: 10 });

    const finalState = await request('GET', 'records', null)(makeState({ apiPath: 'api/v2' }));

    expect(finalState.data).to.eql({ total: 10 });
  });

  it('appends previous data to state.references', async () => {
    testServer
      .intercept({ path: '/api/v1/patients', method: 'GET' })
      .reply(200, { id: 1 });

    const state = { ...makeState(), data: { existing: true } };
    const finalState = await request('GET', 'patients', null)(state);

    expect(finalState.references).to.have.length(1);
    expect(finalState.references[0]).to.eql({ existing: true });
  });

  it('sets state.response without the body property', async () => {
    testServer
      .intercept({ path: '/api/v1/patients', method: 'GET' })
      .reply(200, { id: 1 });

    const finalState = await request('GET', 'patients', null)(makeState());

    expect(finalState.response).to.exist;
    expect(finalState.response.body).to.be.undefined;
  });

  it('throws an error if the service returns 403', async () => {
    testServer
      .intercept({ path: '/api/v1/noAccess', method: 'POST' })
      .reply(403);

    const error = await request('POST', 'noAccess', { name: 'taylor' })(makeState()).catch(e => e);

    expect(error.statusMessage).to.eql('Forbidden');
  });
});

describe('get', () => {
  it('makes a GET request', async () => {
    testServer
      .intercept({ path: '/api/v1/indicators', method: 'GET' })
      .reply(200, [{ id: 'abc' }]);

    const finalState = await get('indicators')(makeState());

    expect(finalState.data).to.eql([{ id: 'abc' }]);
  });
});

describe('post', () => {
  it('makes a POST request', async () => {
    testServer
      .intercept({ path: '/api/v1/patients', method: 'POST' })
      .reply(200, { id: 99 });

    const finalState = await post('patients', { name: 'Amara' })(makeState());

    expect(finalState.data).to.eql({ id: 99 });
  });
});

describe('execute', () => {
  it('calls fetchCookie before running operations', async () => {
    testServer
      .intercept({ path: '/api/v1/me', method: 'GET' })
      .reply(200, {}, { headers: { 'set-cookie': 'sid=session1; Path=/' } });

    testServer
      .intercept({ path: '/api/v1/patients', method: 'GET' })
      .reply(200, { total: 3 });

    const finalState = await execute(get('patients'))(makeState());

    expect(finalState.configuration.cookie).to.eql('session1');
    expect(finalState.data).to.eql({ total: 3 });
  });
});
