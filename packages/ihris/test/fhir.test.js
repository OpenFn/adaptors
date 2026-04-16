import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';

import { fhir } from '../src/index.js';
import { _resetAuth } from '../src/fhir.utils.js';
import { testServer } from './helpers.js';

const makeState = (overrides = {}) => ({
  configuration: {
    baseUrl: 'https://ihris.example.com',
    username: 'admin@ihris.org',
    password: 'admin123',
  },
  data: {},
  references: [],
  ...overrides,
});

describe('fhir namespace', () => {
  beforeEach(() => _resetAuth());

  describe('authentication', () => {
    it('authenticates and sends the cookie on first request', async () => {
      const state = makeState();

      testServer.intercept({ path: '/auth/login', method: 'POST' }).reply(
        200,
        { success: true },
        {
          headers: { 'set-cookie': ['session=fhirabc; Path=/'] },
        },
      );

      testServer
        .intercept({
          path: '/fhir/Practitioner',
          method: 'GET',
          headers: { Cookie: 'session=fhirabc' },
        })
        .reply(200, {
          resourceType: 'Bundle',
          type: 'searchset',
          entry: [{ resource: { resourceType: 'Practitioner', id: 'P001' } }],
        });

      const finalState = await fhir.get('Practitioner')(state);
      expect(finalState.data.resourceType).to.eql('Bundle');
    });

    it('does not mutate the configuration object', async () => {
      const state = makeState();
      const snapshot = { ...state.configuration };

      testServer.intercept({ path: '/auth/login', method: 'POST' }).reply(
        200,
        { success: true },
        {
          headers: { 'set-cookie': ['session=fhirmut; Path=/'] },
        },
      );

      testServer
        .intercept({ path: '/fhir/Practitioner', method: 'GET' })
        .reply(200, { resourceType: 'Bundle', entry: [] });

      await fhir.get('Practitioner')(state);

      expect(state.configuration).to.deep.equal(snapshot);
      expect(state.configuration).to.not.have.property('cookie');
    });

    it('caches the cookie — auth is called only once per configuration object', async () => {
      const state = makeState();

      // Single auth intercept — a second auth call would throw.
      testServer.intercept({ path: '/auth/login', method: 'POST' }).reply(
        200,
        { success: true },
        {
          headers: { 'set-cookie': ['session=fhircached; Path=/'] },
        },
      );

      testServer
        .intercept({ path: '/fhir/Practitioner', method: 'GET' })
        .reply(200, { resourceType: 'Bundle', entry: [] });

      testServer
        .intercept({ path: '/fhir/Practitioner', method: 'GET' })
        .reply(200, { resourceType: 'Bundle', entry: [] });

      const state2 = await fhir.get('Practitioner')(state);
      // Second operation reuses same configuration object — no re-auth
      await fhir.get('Practitioner')(state2);
    });
  });

  describe('fhir.get', () => {
    it('fetches a resource by type', async () => {
      const state = makeState();

      testServer.intercept({ path: '/auth/login', method: 'POST' }).reply(
        200,
        { success: true },
        {
          headers: { 'set-cookie': ['session=tok123; Path=/'] },
        },
      );

      testServer
        .intercept({
          path: '/fhir/Practitioner',
          method: 'GET',
          headers: { Cookie: 'session=tok123' },
        })
        .reply(200, {
          resourceType: 'Bundle',
          type: 'searchset',
          total: 1,
          entry: [
            {
              resource: {
                resourceType: 'Practitioner',
                id: 'P10004',
                active: true,
              },
            },
          ],
        });

      const finalState = await fhir.get('Practitioner')(state);
      expect(finalState.data.resourceType).to.eql('Bundle');
      expect(finalState.data.total).to.eql(1);
      expect(finalState.data.entry[0].resource.id).to.eql('P10004');
    });

    it('follows pagination — second page uses the path from the next link', async () => {
      const state = makeState();

      testServer.intercept({ path: '/auth/login', method: 'POST' }).reply(
        200,
        { success: true },
        {
          headers: { 'set-cookie': ['session=page123; Path=/'] },
        },
      );

      // Page 1: /fhir/Practitioner — includes a next link that changes the path to /fhir
      testServer
        .intercept({ path: '/fhir/Practitioner', method: 'GET' })
        .reply(200, {
          resourceType: 'Bundle',
          type: 'searchset',
          total: 2,
          link: [
            {
              relation: 'next',
              url: 'https://ihris.example.com/fhir?_getpages=token999&_getpagesoffset=1&_count=1&_bundletype=searchset',
            },
          ],
          entry: [{ resource: { resourceType: 'Practitioner', id: 'P001' } }],
        });

      // Page 2: path changes to /fhir (not /fhir/Practitioner)
      testServer
        .intercept({
          path: '/fhir',
          method: 'GET',
          query: {
            _getpages: 'token999',
            _getpagesoffset: '1',
            _count: '1',
            _bundletype: 'searchset',
          },
        })
        .reply(200, {
          resourceType: 'Bundle',
          type: 'searchset',
          total: 2,
          entry: [{ resource: { resourceType: 'Practitioner', id: 'P002' } }],
        });

      const finalState = await fhir.get('Practitioner')(state);
      expect(finalState.data.entry).to.have.length(2);
      expect(finalState.data.entry[0].resource.id).to.eql('P001');
      expect(finalState.data.entry[1].resource.id).to.eql('P002');
    });
  });

  describe('query param mapping', () => {
    const authAndReply = query => {
      testServer
        .intercept({ path: '/auth/login', method: 'POST' })
        .reply(
          200,
          { success: true },
          { headers: { 'set-cookie': ['session=s; Path=/'] } },
        );
      testServer
        .intercept({ path: '/fhir/Practitioner', method: 'GET', query })
        .reply(200, { resourceType: 'Bundle', entry: [] });
    };

    it('maps count → _count', async () => {
      authAndReply({ _count: '5' });
      await fhir.get('Practitioner', { count: 5 })(makeState());
    });

    it('maps lastUpdated → _lastUpdated', async () => {
      authAndReply({ _lastUpdated: 'ge2024-01-01' });
      await fhir.get('Practitioner', { lastUpdated: 'ge2024-01-01' })(
        makeState(),
      );
    });

    it('maps sort → _sort', async () => {
      authAndReply({ _sort: '-lastUpdated' });
      await fhir.get('Practitioner', { sort: '-lastUpdated' })(makeState());
    });

    it('maps getPagesOffset → _getpagesoffset', async () => {
      authAndReply({ _getpagesoffset: '10' });
      await fhir.get('Practitioner', { getPagesOffset: 10 })(makeState());
    });

    it('passes through unknown params unchanged', async () => {
      authAndReply({ active: 'true' });
      await fhir.get('Practitioner', { active: 'true' })(makeState());
    });

    it('maps known params and passes through unknown ones together', async () => {
      authAndReply({ _count: '10', active: 'true' });
      await fhir.get('Practitioner', { count: 10, active: 'true' })(
        makeState(),
      );
    });
  });
});
