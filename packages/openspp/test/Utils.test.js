import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import {
  authorize,
  request,
  prepareNextState,
  prepareSearchState,
  encodeIdentifier,
  parseReference,
  unwrapSearch,
  buildQuery,
  assertObject,
  assertHasIdentifier,
} from '../src/Utils.js';

const baseUrl = 'http://openspp-utils.test';
const testServer = enableMockClient(baseUrl);

const configuration = {
  baseUrl,
  clientId: 'test-client',
  clientSecret: 'test-secret',
};

const expectRejection = async (promise, check) => {
  let error;
  try {
    await promise;
  } catch (e) {
    error = e;
  }
  expect(error, 'expected the promise to reject').to.exist;
  check(error);
};

describe('Utils', () => {
  describe('authorize', () => {
    it('exchanges client credentials for a token and stores it on configuration', async () => {
      testServer
        .intercept({
          path: '/api/v2/spp/oauth/token',
          method: 'POST',
          body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: 'test-client',
            client_secret: 'test-secret',
          }),
        })
        .reply(200, {
          access_token: 'fresh-token',
          token_type: 'Bearer',
          expires_in: 86400,
          scope: 'individual:read',
        });

      const state = await authorize({ configuration });

      expect(state.configuration.access_token).to.equal('fresh-token');
      expect(configuration.access_token).to.be.undefined;
    });

    it('reuses an existing access token without calling the token endpoint', async () => {
      const state = { configuration: { ...configuration, access_token: 'kept' } };

      const next = await authorize(state);

      expect(next.configuration.access_token).to.equal('kept');
    });

    it('throws a clear error when client credentials are missing', async () => {
      await expectRejection(
        authorize({ configuration: { baseUrl } }),
        error => {
          expect(error.message).to.match(/clientId and clientSecret/);
        }
      );
    });

    it('throws with the server detail when the credentials are rejected', async () => {
      testServer
        .intercept({ path: '/api/v2/spp/oauth/token', method: 'POST' })
        .reply(401, { detail: 'Invalid client credentials' });

      await expectRejection(authorize({ configuration }), error => {
        expect(error.message).to.equal(
          'OpenSPP 401 POST /oauth/token: Invalid client credentials'
        );
        expect(error.statusCode).to.equal(401);
      });
    });
  });

  describe('request', () => {
    const authed = { ...configuration, access_token: 'abc' };

    it('sends a Bearer token to a path under /api/v2/spp', async () => {
      testServer
        .intercept({
          path: '/api/v2/spp/Program',
          method: 'GET',
          headers: { authorization: 'Bearer abc' },
        })
        .reply(200, { data: [] });

      const response = await request(authed, 'GET', '/Program');

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.eql({ data: [] });
    });

    it('sends query parameters and a JSON body', async () => {
      testServer
        .intercept({
          path: '/api/v2/spp/Group?name=Santos&_count=5',
          method: 'POST',
          body: JSON.stringify({ a: 1 }),
          headers: { 'content-type': 'application/json' },
        })
        .reply(201, { ok: true });

      const response = await request(authed, 'POST', '/Group', {
        query: { name: 'Santos', _count: 5 },
        body: { a: 1 },
      });

      expect(response.statusCode).to.equal(201);
    });

    it('sends If-Match only when ifMatch is given', async () => {
      testServer
        .intercept({
          path: '/api/v2/spp/Individual/x',
          method: 'PATCH',
          headers: { 'if-match': '"123"' },
        })
        .reply(200, {});

      const response = await request(authed, 'PATCH', '/Individual/x', {
        body: {},
        ifMatch: '"123"',
      });

      expect(response.statusCode).to.equal(200);
    });

    it('turns a string detail into the error message', async () => {
      testServer
        .intercept({ path: '/api/v2/spp/Individual/y', method: 'GET' })
        .reply(404, { detail: 'Individual not found' });

      await expectRejection(
        request(authed, 'GET', '/Individual/y'),
        error => {
          expect(error.message).to.equal(
            'OpenSPP 404 GET /Individual/y: Individual not found'
          );
          expect(error.statusCode).to.equal(404);
          expect(error.body).to.eql({ detail: 'Individual not found' });
        }
      );
    });

    it('shows identifiers decoded in the error message', async () => {
      testServer
        .intercept({
          path: '/api/v2/spp/Group/urn%3Ax%23household_id%7CHH-9',
          method: 'GET',
        })
        .reply(404, { detail: 'Group not found' });

      await expectRejection(
        request(authed, 'GET', '/Group/urn%3Ax%23household_id%7CHH-9'),
        error => {
          expect(error.message).to.equal(
            'OpenSPP 404 GET /Group/urn:x#household_id|HH-9: Group not found'
          );
        }
      );
    });

    it('flattens validation error arrays into the message', async () => {
      testServer
        .intercept({ path: '/api/v2/spp/Individual', method: 'POST' })
        .reply(422, {
          detail: [
            { loc: ['body', 'identifier'], msg: 'Field required', type: 'missing' },
            { loc: ['body', 'birthDate'], msg: 'Invalid date', type: 'date' },
          ],
        });

      await expectRejection(
        request(authed, 'POST', '/Individual', { body: {} }),
        error => {
          expect(error.message).to.equal(
            'OpenSPP 422 POST /Individual: body.identifier: Field required; body.birthDate: Invalid date'
          );
        }
      );
    });

    it('falls back to a problem-details title', async () => {
      testServer
        .intercept({ path: '/api/v2/spp/Group/z', method: 'GET' })
        .reply(409, { title: 'Conflict', status: 409 });

      await expectRejection(request(authed, 'GET', '/Group/z'), error => {
        expect(error.message).to.equal('OpenSPP 409 GET /Group/z: Conflict');
      });
    });

    it('falls back to the status text when the body is empty', async () => {
      testServer
        .intercept({ path: '/api/v2/spp/Group/empty', method: 'GET' })
        .reply(500, '');

      await expectRejection(request(authed, 'GET', '/Group/empty'), error => {
        expect(error.message).to.equal(
          'OpenSPP 500 GET /Group/empty: Internal Server Error'
        );
      });
    });

    it('hints that a 403 may mean not found, no consent or a missing scope', async () => {
      testServer
        .intercept({ path: '/api/v2/spp/Individual/hidden', method: 'GET' })
        .reply(403, { detail: 'Access denied' });

      await expectRejection(
        request(authed, 'GET', '/Individual/hidden'),
        error => {
          expect(error.message).to.equal(
            'OpenSPP 403 GET /Individual/hidden: Access denied (OpenSPP returns 403 when a record does not exist, has no consent, or the API client lacks a scope)'
          );
        }
      );
    });

    it('includes Retry-After when rate limited', async () => {
      testServer
        .intercept({ path: '/api/v2/spp/Program', method: 'GET' })
        .reply(429, { detail: 'Rate limit exceeded' }, {
          headers: { 'retry-after': '30' },
        });

      await expectRejection(request(authed, 'GET', '/Program'), error => {
        expect(error.message).to.equal(
          'OpenSPP 429 GET /Program: Rate limit exceeded (retry after 30s)'
        );
      });
    });

    it('rejects absolute URLs', async () => {
      await expectRejection(
        request(authed, 'GET', 'https://evil.example.com/x'),
        error => {
          expect(error.code).to.equal('UNEXPECTED_ABSOLUTE_URL');
        }
      );
    });
  });

  describe('prepareNextState', () => {
    it('writes the body to data and the rest of the response to response', () => {
      const state = { data: { old: true }, references: [] };
      const response = { statusCode: 200, headers: {}, body: { new: true } };

      const next = prepareNextState(state, response);

      expect(next.data).to.eql({ new: true });
      expect(next.response).to.eql({ statusCode: 200, headers: {} });
      expect(next.references).to.eql([{ old: true }]);
    });
  });

  describe('prepareSearchState', () => {
    it('writes the result list to data and paging info to response.page', () => {
      const response = {
        statusCode: 200,
        body: {
          data: [{ a: 1 }],
          meta: { total: 40, count: 1, offset: 0 },
          links: { self: '/s?_offset=0', next: '/s?_offset=1', prev: null },
        },
      };

      const next = prepareSearchState({ references: [] }, response);

      expect(next.data).to.eql([{ a: 1 }]);
      expect(next.response.statusCode).to.equal(200);
      expect(next.response.page).to.eql({ total: 40, next: '/s?_offset=1' });
    });

    it('reads paging info from a FHIR Bundle', () => {
      const response = {
        statusCode: 200,
        body: {
          resourceType: 'Bundle',
          total: 2,
          link: [
            { relation: 'self', url: '/sp?_offset=0' },
            { relation: 'next', url: '/sp?_offset=1' },
          ],
          entry: [{ resource: { a: 1 } }],
        },
      };

      const next = prepareSearchState({ references: [] }, response);

      expect(next.data).to.eql([{ a: 1 }]);
      expect(next.response.page).to.eql({ total: 2, next: '/sp?_offset=1' });
    });

    it('sets next to null on the last page', () => {
      const response = {
        statusCode: 200,
        body: { data: [], meta: { total: 0 }, links: { next: null } },
      };

      const next = prepareSearchState({ references: [] }, response);

      expect(next.response.page).to.eql({ total: 0, next: null });
    });
  });

  describe('encodeIdentifier', () => {
    it('URL-encodes a system|value identifier as one path segment', () => {
      expect(
        encodeIdentifier('urn:openspp:vocab:id-type#national_id|PH-123')
      ).to.equal('urn%3Aopenspp%3Avocab%3Aid-type%23national_id%7CPH-123');
    });

    it('throws when the identifier has no system|value separator', () => {
      expect(() => encodeIdentifier('IND_Q4VGGZPF')).to.throw(
        /Invalid identifier "IND_Q4VGGZPF"\. Expected "system\|value"/
      );
    });

    it('throws when the identifier is not a string', () => {
      expect(() => encodeIdentifier(undefined)).to.throw(/Invalid identifier/);
    });
  });

  describe('parseReference', () => {
    it('splits a typed reference into type and identifier', () => {
      expect(parseReference('Group/urn:x#household_id|HH-1')).to.eql({
        type: 'Group',
        identifier: 'urn:x#household_id|HH-1',
      });
    });

    it('only accepts the allowed resource types', () => {
      expect(() =>
        parseReference('Program/urn:openspp:program|x', ['Individual', 'Group'])
      ).to.throw(
        /Invalid reference "Program\/urn:openspp:program\|x"\. Expected "Individual\/system\|value" or "Group\/system\|value"/
      );
    });

    it('throws when the reference has no type prefix', () => {
      expect(() => parseReference('urn:x|1', ['Individual'])).to.throw(
        /Invalid reference/
      );
    });
  });

  describe('unwrapSearch', () => {
    it('returns data from a SearchResult', () => {
      expect(
        unwrapSearch({ data: [{ a: 1 }], meta: {}, links: {} })
      ).to.eql([{ a: 1 }]);
    });

    it('returns resources from a FHIR Bundle', () => {
      expect(
        unwrapSearch({
          resourceType: 'Bundle',
          entry: [{ resource: { a: 1 } }, { resource: { a: 2 } }],
        })
      ).to.eql([{ a: 1 }, { a: 2 }]);
    });

    it('returns an empty array for an empty Bundle', () => {
      expect(unwrapSearch({ resourceType: 'Bundle', entry: [] })).to.eql([]);
    });
  });

  describe('buildQuery', () => {
    it('maps adaptor options to OpenSPP parameters and drops undefined values', () => {
      expect(
        buildQuery(
          { name: 'Santos', gender: undefined },
          { count: 10, offset: 20, sort: '-birthdate', elements: ['name', 'identifier'] }
        )
      ).to.eql({
        name: 'Santos',
        _count: 10,
        _offset: 20,
        _sort: '-birthdate',
        _elements: 'name,identifier',
      });
    });

    it('throws on the v3 limit option', () => {
      expect(() => buildQuery({}, { limit: 50 })).to.throw(
        /Use count instead of limit/
      );
    });

    it('throws on the v3 order option', () => {
      expect(() => buildQuery({}, { order: 'id desc' })).to.throw(
        /Use sort instead of order/
      );
    });
  });

  describe('assertObject', () => {
    it('accepts a plain object', () => {
      expect(() => assertObject({ a: 1 })).not.to.throw();
    });

    it('throws on arrays, null and primitives, naming the argument', () => {
      expect(() => assertObject([1], 'query')).to.throw(/query must be an object/);
      expect(() => assertObject(null)).to.throw(/data must be an object/);
      expect(() => assertObject('x')).to.throw(/data must be an object/);
    });
  });

  describe('assertHasIdentifier', () => {
    it('accepts data with at least one identifier', () => {
      expect(() =>
        assertHasIdentifier({ identifier: [{ system: 's', value: 'v' }] })
      ).not.to.throw();
    });

    it('throws when identifier is missing or empty', () => {
      expect(() => assertHasIdentifier({})).to.throw(/data.identifier/);
      expect(() => assertHasIdentifier({ identifier: [] })).to.throw(
        /data.identifier/
      );
    });
  });
});
