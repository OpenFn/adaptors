import { expect } from 'chai';
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
  warnUnsupportedOptions,
  warnUnsupportedSort,
  searchResource,
  readResource,
  createResource,
  patchResource,
  listMemberships,
  findMembership,
  putMembership,
} from '../src/Utils.js';
import {
  createMockServer,
  assertAllMocksUsed,
  expectRejection,
  jsonBody,
  captureWarnings,
} from './helpers.js';

const baseUrl = 'http://openspp-utils.test';
const testServer = createMockServer(baseUrl);

const configuration = {
  baseUrl,
  clientId: 'test-client',
  clientSecret: 'test-secret',
};

describe('Utils', () => {
  afterEach(() => assertAllMocksUsed(testServer));

  describe('authorize', () => {
    it('exchanges client credentials for a token and stores it on configuration', async () => {
      testServer
        .intercept({
          path: '/api/v2/spp/oauth/token',
          method: 'POST',
          body: jsonBody({
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

      expect(next).to.equal(state);
    });

    it('throws a clear error when client credentials are missing', async () => {
      await expectRejection(
        authorize({ configuration: { baseUrl } }),
        error => {
          expect(error.message).to.equal(
            'Invalid credentials: include clientId and clientSecret in state.configuration'
          );
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
          body: jsonBody({ a: 1 }),
          headers: { 'content-type': 'application/json' },
        })
        .reply(201, { ok: true });

      const response = await request(authed, 'POST', '/Group', {
        query: { name: 'Santos', _count: 5 },
        body: { a: 1 },
      });

      expect(response.statusCode).to.equal(201);
    });

    it('sends If-Match when ifMatch is given', async () => {
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

    it('sends no If-Match header without ifMatch', async () => {
      testServer
        .intercept({
          path: '/api/v2/spp/Individual/x',
          method: 'PATCH',
          headers: headers => !('if-match' in headers),
        })
        .reply(200, {});

      const response = await request(authed, 'PATCH', '/Individual/x', { body: {} });

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
            'OpenSPP 403 GET /Individual/hidden: Access denied (OpenSPP returns 403 when the API client lacks a scope, or, for API clients that require consent, when an individual or group does not exist or has no consent)'
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
          expect(error.url).to.equal('https://evil.example.com/x');
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
      expect(() => encodeIdentifier(undefined)).to.throw(
        /^Invalid identifier "undefined"\. Expected "system\|value"/
      );
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
        'Invalid reference "urn:x|1". Expected "Individual/system|value"'
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
    it('maps lastId and a list of extensions', () => {
      expect(buildQuery({}, { lastId: 42, extensions: ['a', 'b'] })).to.eql({
        _lastId: 42,
        _extensions: 'a,b',
      });
    });

    it('maps adaptor options to OpenSPP parameters and drops undefined values', () => {
      expect(
        buildQuery(
          { name: 'Santos', gender: undefined },
          { count: 10, offset: 20, sort: '-birthDate', elements: ['name', 'identifier'] }
        )
      ).to.eql({
        name: 'Santos',
        _count: 10,
        _offset: 20,
        _sort: '-birthDate',
        _elements: 'name,identifier',
      });
    });

    it('warns on the v3 limit option and leaves it out', async () => {
      let query;
      const warnings = await captureWarnings(() => {
        query = buildQuery({}, { limit: 50 });
      });

      expect(query).to.eql({});
      expect(warnings).to.eql([
        'WARNING: limit is not supported: use count to set the page size',
      ]);
    });

    it('warns on the v3 order option and leaves it out', async () => {
      let query;
      const warnings = await captureWarnings(() => {
        query = buildQuery({}, { order: 'id desc' });
      });

      expect(query).to.eql({});
      expect(warnings).to.eql([
        'WARNING: order is not supported: use sort, eg { sort: "-birthDate" }',
      ]);
    });
  });

  describe('assertObject', () => {
    it('accepts a plain object', () => {
      expect(() => assertObject({ a: 1 })).not.to.throw();
    });

    it('throws on arrays, null and primitives, naming the argument', () => {
      expect(() => assertObject([1], 'query')).to.throw('query must be an object, got [1]');
      expect(() => assertObject(null)).to.throw('data must be an object, got null');
      expect(() => assertObject('x')).to.throw('data must be an object, got "x"');
    });
  });

  describe('warnUnsupportedOptions', () => {
    it('does not warn on options without the unsupported keys', async () => {
      const warnings = await captureWarnings(() => {
        warnUnsupportedOptions('searchGroup', { count: 10 }, { sort: 'no sort' });
        warnUnsupportedOptions('searchGroup', { sort: undefined }, { sort: 'no sort' });
      });

      expect(warnings).to.eql([]);
    });

    it('warns once per unsupported option, naming the function, the option and the reason', async () => {
      const warnings = await captureWarnings(() =>
        warnUnsupportedOptions(
          'searchGroup',
          { sort: 'name', lastId: 1, count: 5 },
          { sort: 'OpenSPP cannot sort groups', lastId: 'no cursor' }
        )
      );

      expect(warnings).to.eql([
        'WARNING: searchGroup does not support sort: OpenSPP cannot sort groups',
        'WARNING: searchGroup does not support lastId: no cursor',
      ]);
    });
  });

  describe('warnUnsupportedSort', () => {
    it('does not warn on the fields OpenSPP sorts individuals by, ascending or descending', async () => {
      const warnings = await captureWarnings(() => {
        for (const sort of [
          undefined,
          'name',
          '-name',
          'birthDate',
          '-birthDate',
          'lastUpdated',
          '-lastUpdated',
        ]) {
          warnUnsupportedSort('searchIndividual', sort);
        }
      });

      expect(warnings).to.eql([]);
    });

    it('warns on any other value, naming the function and the value', async () => {
      const values = ['birthdate', '-birth_date', '--name', '', 'name,birthDate', 1];
      const warnings = await captureWarnings(() => {
        for (const sort of values) {
          warnUnsupportedSort('searchIndividual', sort);
        }
      });

      expect(warnings).to.eql(
        values.map(
          sort =>
            `WARNING: searchIndividual does not support sort ${JSON.stringify(
              sort
            )}: use name, birthDate or lastUpdated, with - for descending (OpenSPP sorts by name for any other value)`
        )
      );
    });
  });

  describe('searchResource', () => {
    const authed = { ...configuration, access_token: 'abc' };
    const GROUP = 'urn:openspp:vocab:id-type#household_id|HH-1';

    it('returns the raw search response for the query and paging options', async () => {
      testServer
        .intercept({ path: '/api/v2/spp/Individual?name=Santos&_count=5', method: 'GET' })
        .reply(200, { data: [{ name: 'x' }], meta: { total: 1 } });

      const response = await searchResource(authed, 'Individual', { name: 'Santos' }, { count: 5 });

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.eql({ data: [{ name: 'x' }], meta: { total: 1 } });
    });

    it('checks that a group filter exists before searching individuals', async () => {
      testServer
        .intercept({
          path: `/api/v2/spp/Group/${encodeURIComponent(GROUP)}?_elements=identifier`,
          method: 'GET',
        })
        .reply(200, { identifier: [] });
      testServer
        .intercept({ path: `/api/v2/spp/Individual?group=${encodeURIComponent(GROUP)}`, method: 'GET' })
        .reply(200, { data: [] });

      const response = await searchResource(authed, 'Individual', { group: GROUP });

      expect(response.body).to.eql({ data: [] });
    });

    it('throws when a group filter is for a group that does not exist', async () => {
      testServer
        .intercept({
          path: `/api/v2/spp/Group/${encodeURIComponent(GROUP)}?_elements=identifier`,
          method: 'GET',
        })
        .reply(404, { detail: 'Group not found' });

      await expectRejection(
        searchResource(authed, 'Individual', { group: GROUP }),
        error => expect(error.statusCode).to.equal(404)
      );
    });

    it('does not look up the group for group: "none"', async () => {
      testServer
        .intercept({ path: '/api/v2/spp/Individual?group=none', method: 'GET' })
        .reply(200, { data: [] });

      const response = await searchResource(authed, 'Individual', { group: 'none' });

      expect(response.body).to.eql({ data: [] });
    });

    it('only looks up the group when searching individuals', async () => {
      testServer
        .intercept({ path: `/api/v2/spp/Group?group=${encodeURIComponent(GROUP)}`, method: 'GET' })
        .reply(200, { data: [] });

      const response = await searchResource(authed, 'Group', { group: GROUP });

      expect(response.body).to.eql({ data: [] });
    });

    it('throws on an Odoo domain', async () => {
      await expectRejection(
        searchResource(authed, 'Individual', [['name', '=', 'X']]),
        error =>
          expect(error.message).to.equal(
            'query must be an object of OpenSPP search parameters, eg { name: "Santos" }. Odoo domains like [["name","=","X"]] are not supported'
          )
      );
    });

    it('throws on a malformed identifier or group filter', async () => {
      for (const key of ['identifier', 'group']) {
        await expectRejection(
          searchResource(authed, 'Individual', { [key]: 'X_1' }),
          error =>
            expect(error.message).to.match(/^Invalid identifier "X_1"\. Expected "system\|value"/)
        );
      }
    });
  });

  describe('readResource', () => {
    const authed = { ...configuration, access_token: 'abc' };
    const ID = 'urn:openspp:vocab:id-type#national_id|PH-1';

    it('returns the response for one resource, with field options', async () => {
      testServer
        .intercept({
          path: `/api/v2/spp/Individual/${encodeURIComponent(ID)}?_elements=name`,
          method: 'GET',
        })
        .reply(200, { name: { text: 'X' } });

      const response = await readResource(authed, 'Individual', ID, { elements: ['name'] });

      expect(response.body).to.eql({ name: { text: 'X' } });
    });
  });

  describe('createResource', () => {
    const authed = { ...configuration, access_token: 'abc' };

    it('posts the resource and returns the response', async () => {
      const data = { identifier: [{ system: 's', value: 'v' }] };
      testServer
        .intercept({ path: '/api/v2/spp/Group', method: 'POST', body: jsonBody(data) })
        .reply(201, data);

      const response = await createResource(authed, 'Group', data);

      expect(response.statusCode).to.equal(201);
      expect(response.body).to.eql(data);
    });

    it('throws when data is not an object', async () => {
      await expectRejection(createResource(authed, 'Group', 'nope'), error => {
        expect(error.message).to.equal('data must be an object, got "nope"');
      });
    });
  });

  describe('patchResource', () => {
    const authed = { ...configuration, access_token: 'abc' };
    const ID = 'urn:openspp:vocab:id-type#national_id|PH-1';

    it('patches the resource with If-Match and returns the response', async () => {
      testServer
        .intercept({
          path: `/api/v2/spp/Individual/${encodeURIComponent(ID)}`,
          method: 'PATCH',
          body: jsonBody({ birthDate: '2000-01-01' }),
          headers: { 'if-match': '"7"' },
        })
        .reply(200, { birthDate: '2000-01-01' });

      const response = await patchResource(authed, 'Individual', ID, { birthDate: '2000-01-01' }, { ifMatch: '"7"' });

      expect(response.body).to.eql({ birthDate: '2000-01-01' });
    });
  });

  describe('program memberships', () => {
    const authed = { ...configuration, access_token: 'abc' };
    const BENEFICIARY = 'Individual/urn:openspp:vocab:id-type#national_id|PH-1';
    const BENEFICIARY_PATH = encodeURIComponent('urn:openspp:vocab:id-type#national_id|PH-1');
    const PROGRAM = 'urn:openspp:program|cash';
    const OTHER_PROGRAM = 'urn:openspp:program|food';
    const membershipsPath = `/api/v2/spp/ProgramMembership?beneficiary=${encodeURIComponent(BENEFICIARY)}&_count=100`;
    const membershipIn = (program, status = 'enrolled') => ({
      program: { reference: `Program/${program}` },
      beneficiary: { reference: BENEFICIARY },
      status,
      enrollmentDate: '2024-12-16',
    });
    const page = (memberships, next = null) => ({
      data: memberships,
      meta: { total: memberships.length },
      links: { next },
    });

    describe('listMemberships', () => {
      it('reads up to 100 memberships of a beneficiary with extra filters', async () => {
        testServer
          .intercept({ path: `${membershipsPath.replace('&_count', '&status=enrolled&_count')}`, method: 'GET' })
          .reply(200, page([membershipIn(PROGRAM)]));

        const response = await listMemberships(authed, BENEFICIARY, { status: 'enrolled' });

        expect(response.body.data).to.eql([membershipIn(PROGRAM)]);
      });
    });

    describe('findMembership', () => {
      it('finds the membership for the program', async () => {
        testServer
          .intercept({ path: membershipsPath, method: 'GET' })
          .reply(200, page([membershipIn(PROGRAM)]));

        const found = await findMembership(authed, BENEFICIARY, PROGRAM);

        expect(found.membership).to.eql(membershipIn(PROGRAM));
        expect(found.programReference).to.equal(`Program/${PROGRAM}`);
        expect(found.isAmbiguous).to.equal(false);
      });

      it('returns no membership when the beneficiary is not in the program', async () => {
        testServer
          .intercept({ path: membershipsPath, method: 'GET' })
          .reply(200, page([membershipIn(OTHER_PROGRAM)]));

        const found = await findMembership(authed, BENEFICIARY, PROGRAM);

        expect(found.membership).to.be.undefined;
        expect(found.isAmbiguous).to.equal(false);
      });

      it('is ambiguous with more than one membership', async () => {
        testServer
          .intercept({ path: membershipsPath, method: 'GET' })
          .reply(200, page([membershipIn(PROGRAM), membershipIn(OTHER_PROGRAM)]));

        const found = await findMembership(authed, BENEFICIARY, PROGRAM);

        expect(found.isAmbiguous).to.equal(true);
      });

      it('is ambiguous when there is another page of memberships', async () => {
        testServer
          .intercept({ path: membershipsPath, method: 'GET' })
          .reply(200, page([membershipIn(PROGRAM)], `${membershipsPath}&_offset=100`));

        const found = await findMembership(authed, BENEFICIARY, PROGRAM);

        expect(found.isAmbiguous).to.equal(true);
      });

      it('throws on an untyped beneficiary', async () => {
        await expectRejection(findMembership(authed, 'urn:x|1', PROGRAM), error =>
          expect(error.message).to.match(/^Invalid reference "urn:x\|1"/)
        );
      });

      it('throws on a program id that is not system|value', async () => {
        await expectRejection(findMembership(authed, BENEFICIARY, 'cash'), error =>
          expect(error.message).to.match(/^Invalid identifier "cash"/)
        );
      });
    });

    describe('putMembership', () => {
      const found = {
        membership: membershipIn(PROGRAM),
        programReference: `Program/${PROGRAM}`,
        isAmbiguous: false,
      };

      it('puts the membership with the new status and the given exit details', async () => {
        testServer
          .intercept({
            path: `/api/v2/spp/ProgramMembership/${BENEFICIARY_PATH}`,
            method: 'PUT',
            body: jsonBody({
              ...membershipIn(PROGRAM, 'exited'),
              exitDate: '2026-09-30',
              exitReason: { text: 'Moved' },
            }),
          })
          .reply(200, membershipIn(PROGRAM, 'exited'));

        const response = await putMembership(authed, BENEFICIARY, found, {
          status: 'exited',
          exitDate: '2026-09-30',
          exitReason: { text: 'Moved' },
        });

        expect(response.body.status).to.equal('exited');
      });

      it('refuses an ambiguous membership', async () => {
        await expectRejection(
          putMembership(authed, BENEFICIARY, { ...found, isAmbiguous: true }, { status: 'exited' }),
          error => expect(error.message).to.match(/^Ambiguous membership: /)
        );
      });

      it('throws when OpenSPP updated a membership in another program', async () => {
        testServer
          .intercept({ path: `/api/v2/spp/ProgramMembership/${BENEFICIARY_PATH}`, method: 'PUT' })
          .reply(200, membershipIn(OTHER_PROGRAM, 'exited'));

        await expectRejection(
          putMembership(authed, BENEFICIARY, found, { status: 'exited' }),
          error =>
            expect(error.message).to.equal(
              `OpenSPP updated a membership in a different program (Program/${OTHER_PROGRAM}) instead of Program/${PROGRAM}. Check this beneficiary's memberships in OpenSPP.`
            )
        );
      });
    });
  });
});
