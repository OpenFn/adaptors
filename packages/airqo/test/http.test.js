// AirQo generic HTTP helpers, mocked with Undici MockAgent (no live network calls).
import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { http } from '../src/index.js';

const TEST_ORIGIN = 'https://airqo-http.test.net';
const TEST_BASE_URL = `${TEST_ORIGIN}/api/v2`;

const testServer = enableMockClient(TEST_ORIGIN);

const configuration = {
  baseUrl: TEST_BASE_URL,
  token: 'test_token_abc123',
};

describe('http.get', () => {
  it('makes an authenticated GET request to an arbitrary path', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/grids',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, { success: true, grids: [] });

    const state = { configuration };
    const finalState = await http.get('devices/metadata/grids')(state);

    expect(finalState.data.success).to.equal(true);
    expect(finalState.data.grids).to.be.an('array');
  });

  it('passes query options through to the request', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/sites',
        method: 'GET',
        query: { token: 'test_token_abc123', limit: '5' },
      })
      .reply(200, { success: true, sites: [] });

    const state = { configuration };
    const finalState = await http.get('devices/metadata/sites', {
      query: { limit: 5 },
    })(state);

    expect(finalState.data.success).to.equal(true);
  });

  it('throws a clear error when path is missing', async () => {
    try {
      await http.get('')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('path must be a non-empty string.');
    }
  });
});

describe('http.post', () => {
  it('makes an authenticated POST request with a body', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/some-endpoint',
        method: 'POST',
        query: { token: 'test_token_abc123' },
        body: JSON.stringify({ foo: 'bar' }),
      })
      .reply(200, { success: true });

    const state = { configuration };
    const finalState = await http.post('devices/some-endpoint', {
      foo: 'bar',
    })(state);

    expect(finalState.data.success).to.equal(true);
  });

  it('throws a clear error when path is missing', async () => {
    try {
      await http.post('', {})({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('path must be a non-empty string.');
    }
  });
});

describe('http.request', () => {
  it('makes an authenticated request with an arbitrary method', async () => {
    testServer
      .intercept({
        path: '/api/v2/devices/metadata/cohorts',
        method: 'GET',
        query: { token: 'test_token_abc123' },
      })
      .reply(200, { success: true, cohorts: [] });

    const state = { configuration };
    const finalState = await http.request('GET', 'devices/metadata/cohorts')(
      state
    );

    expect(finalState.data.success).to.equal(true);
    expect(finalState.data.cohorts).to.be.an('array');
  });

  it('throws a clear error when method is missing', async () => {
    try {
      await http.request('', 'devices/metadata/sites')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('method must be a non-empty string.');
    }
  });

  it('throws a clear error when path is missing', async () => {
    try {
      await http.request('GET', '')({ configuration });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('path must be a non-empty string.');
    }
  });
});
