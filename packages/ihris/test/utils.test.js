import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';

import { request, _resetAuth } from '../src/Utils.js';
import { testServer } from './helpers.js';

const makeConfig = (overrides = {}) => ({
  baseUrl: 'https://ihris.example.com',
  username: 'admin@ihris.org',
  password: 'admin123',
  ...overrides,
});

const authReply = (cookie = 'session=abc123') =>
  testServer
    .intercept({ path: '/auth/login', method: 'POST' })
    .reply(
      200,
      { success: true },
      { headers: { 'set-cookie': [`${cookie}; Path=/`] } },
    );

describe('Utils.js - request', () => {
  beforeEach(() => _resetAuth());

  describe('authentication', () => {
    it('authenticates and sends the cookie on first request', async () => {
      authReply();
      testServer
        .intercept({
          path: '/fhir/Practitioner',
          method: 'GET',
          headers: { Cookie: 'session=abc123' },
        })
        .reply(200, { resourceType: 'Practitioner' });

      const response = await request(
        makeConfig(),
        'GET',
        '/fhir/Practitioner',
        {},
      );
      expect(response.body.resourceType).to.eql('Practitioner');
    });

    it('does not mutate the configuration object', async () => {
      authReply();
      const configuration = makeConfig();
      const snapshot = { ...configuration };

      testServer
        .intercept({ path: '/fhir/Practitioner', method: 'GET' })
        .reply(200, { resourceType: 'Practitioner' });

      await request(configuration, 'GET', '/fhir/Practitioner', {});

      expect(configuration).to.deep.equal(snapshot);
      expect(configuration).to.not.have.property('cookie');
    });

    it('caches the cookie — auth is called only once', async () => {
      // Single auth interceptor — if auth fires twice the second call throws.
      authReply();
      testServer
        .intercept({ path: '/fhir/Practitioner', method: 'GET' })
        .reply(200, { resourceType: 'Bundle' });
      testServer
        .intercept({ path: '/fhir/Practitioner', method: 'GET' })
        .reply(200, { resourceType: 'Bundle' });

      const config = makeConfig();
      await request(config, 'GET', '/fhir/Practitioner', {});
      await request(config, 'GET', '/fhir/Practitioner', {});
    });

    it('deduplicates concurrent auth calls — only one login fires', async () => {
      authReply();
      testServer
        .intercept({ path: '/fhir/Practitioner', method: 'GET' })
        .reply(200, { resourceType: 'Bundle' });
      testServer
        .intercept({ path: '/fhir/Practitioner', method: 'GET' })
        .reply(200, { resourceType: 'Bundle' });

      const config = makeConfig();
      await Promise.all([
        request(config, 'GET', '/fhir/Practitioner', {}),
        request(config, 'GET', '/fhir/Practitioner', {}),
      ]);
    });

    it('clears the cache and retries auth after a failed login', async () => {
      testServer
        .intercept({ path: '/auth/login', method: 'POST' })
        .reply(401, { error: 'Unauthorized' });

      await request(makeConfig(), 'GET', '/fhir/Practitioner', {}).catch(
        () => {},
      );

      // cookiePromise was cleared — next request re-authenticates
      authReply('session=retry123');
      testServer
        .intercept({
          path: '/fhir/Practitioner',
          method: 'GET',
          headers: { Cookie: 'session=retry123' },
        })
        .reply(200, { resourceType: 'Practitioner' });

      const response = await request(
        makeConfig(),
        'GET',
        '/fhir/Practitioner',
        {},
      );
      expect(response.body.resourceType).to.eql('Practitioner');
    });
  });
});
