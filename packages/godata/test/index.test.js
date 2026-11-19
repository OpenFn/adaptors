import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  request,
  get,
  post,
  put,
  patch,
  del,
  listContacts,
  getContact,
  upsertContact,
  listOutbreaks,
  getOutbreak,
  upsertOutbreak,
  listCases,
  getCase,
  upsertCase,
  listLocations,
  getLocation,
  upsertLocation,
  listReferenceData,
  getReferenceData,
  upsertReferenceData,
} from '../src/index.js';

const apiUrl = 'https://godata.test/api';
const testServer = enableMockClient('https://godata.test');

const jsonHeaders = { headers: { 'content-type': 'application/json' } };
const auth = { authorization: 'Bearer test-token' };

const configuration = {
  apiUrl,
  email: 'user@example.com',
  password: 'secret',
  access_token: 'test-token',
};

const state = (extra = {}) => ({ configuration, references: [], ...extra });

const filterOf = where => ({ filter: JSON.stringify({ where }) });

const captureBody = (reply = {}) => {
  const captured = {};
  const handler = ({ body }) => {
    captured.body = JSON.parse(body);
    return reply;
  };
  return { captured, handler };
};

describe('execute', () => {
  it('logs in with email and password and sends the token as a Bearer header', async () => {
    const login = captureBody({ id: 'session-token', ttl: 600 });
    testServer
      .intercept({ path: '/api/users/login', method: 'POST' })
      .reply(200, login.handler, jsonHeaders);
    testServer
      .intercept({
        path: '/api/outbreaks',
        method: 'GET',
        headers: { authorization: 'Bearer session-token' },
      })
      .reply(200, [{ id: 'ob-1' }], jsonHeaders);

    const result = await execute(listOutbreaks())({
      configuration: {
        apiUrl,
        email: 'user@example.com',
        password: 'secret',
      },
    });

    expect(login.captured.body).to.eql({
      email: 'user@example.com',
      password: 'secret',
    });
    expect(result.data).to.eql([{ id: 'ob-1' }]);
  });

  it('rejects when login fails', async () => {
    testServer
      .intercept({ path: '/api/users/login', method: 'POST' })
      .reply(401, { error: { message: 'login failed' } }, jsonHeaders);

    const error = await execute(listOutbreaks())({
      configuration: { apiUrl, email: 'x@example.com', password: 'wrong' },
    }).catch(e => e);

    expect(error.statusCode).to.equal(401);
  });

  it('throws a clear error when apiUrl is missing', async () => {
    const error = await execute()({
      configuration: { email: 'x@example.com', password: 'y' },
    }).catch(e => e);

    expect(error.code).to.equal('MISSING_API_URL');
  });
});

describe('request', () => {
  it('sends any method to a path relative to apiUrl', async () => {
    testServer
      .intercept({ path: '/api/teams', method: 'GET', headers: auth })
      .reply(200, [{ id: 'team-1' }], jsonHeaders);

    const result = await request('GET', '/teams')(state());

    expect(result.data).to.eql([{ id: 'team-1' }]);
    expect(result.response.statusCode).to.equal(200);
    expect(result.response.url).to.equal(`${apiUrl}/teams`);
  });

  it('rejects absolute urls', async () => {
    const error = await request('GET', 'https://evil.test/teams')(
      state()
    ).catch(e => e);

    expect(error.code).to.equal('UNEXPECTED_ABSOLUTE_URL');
  });
});

describe('get', () => {
  it('JSON-encodes an object filter', async () => {
    testServer
      .intercept({
        path: '/api/users',
        method: 'GET',
        headers: auth,
        query: filterOf({ firstName: 'Luca' }),
      })
      .reply(200, [{ id: 'u-1' }], jsonHeaders);

    const result = await get('/users', {
      filter: { where: { firstName: 'Luca' } },
    })(state());

    expect(result.data).to.eql([{ id: 'u-1' }]);
  });

  it('passes a string filter through unchanged', async () => {
    const filter = '{"limit":1}';
    testServer
      .intercept({ path: '/api/users', method: 'GET', query: { filter } })
      .reply(200, [], jsonHeaders);

    const result = await get('/users', { filter })(state());

    expect(result.data).to.eql([]);
  });

  it('resolves lazy state references in the path', async () => {
    testServer
      .intercept({ path: '/api/outbreaks/ob-9/follow-ups', method: 'GET' })
      .reply(200, [{ id: 'fu-1' }], jsonHeaders);

    const result = await get($ => `/outbreaks/${$.outbreakId}/follow-ups`)(
      state({ outbreakId: 'ob-9' })
    );

    expect(result.data).to.eql([{ id: 'fu-1' }]);
  });

  it('rejects when GoData returns an error', async () => {
    testServer
      .intercept({ path: '/api/users', method: 'GET' })
      .reply(500, { error: 'boom' }, jsonHeaders);

    const error = await get('/users')(state()).catch(e => e);

    expect(error.statusCode).to.equal(500);
  });
});

describe('post, put, patch and del', () => {
  it('post sends a JSON body', async () => {
    const team = captureBody({ id: 'team-1' });
    testServer
      .intercept({ path: '/api/teams', method: 'POST', headers: auth })
      .reply(200, team.handler, jsonHeaders);

    const result = await post('/teams', { name: 'Team A' })(state());

    expect(team.captured.body).to.eql({ name: 'Team A' });
    expect(result.data).to.eql({ id: 'team-1' });
  });

  it('put sends a JSON body', async () => {
    const team = captureBody({ id: 'team-1', name: 'Team B' });
    testServer
      .intercept({ path: '/api/teams/team-1', method: 'PUT', headers: auth })
      .reply(200, team.handler, jsonHeaders);

    await put('/teams/team-1', { name: 'Team B' })(state());

    expect(team.captured.body).to.eql({ name: 'Team B' });
  });

  it('patch sends a JSON body', async () => {
    const user = captureBody({ id: 'u-1' });
    testServer
      .intercept({ path: '/api/users/u-1', method: 'PATCH', headers: auth })
      .reply(200, user.handler, jsonHeaders);

    await patch('/users/u-1', { lastName: 'Smith' })(state());

    expect(user.captured.body).to.eql({ lastName: 'Smith' });
  });

  it('del sends a DELETE', async () => {
    testServer
      .intercept({ path: '/api/teams/team-1', method: 'DELETE', headers: auth })
      .reply(200, { count: 1 }, jsonHeaders);

    const result = await del('/teams/team-1')(state());

    expect(result.data).to.eql({ count: 1 });
  });
});

describe('list and get operations', () => {
  const cases = [
    ['listOutbreaks', () => listOutbreaks(), '/api/outbreaks'],
    ['listLocations', () => listLocations(), '/api/locations'],
    ['listReferenceData', () => listReferenceData(), '/api/reference-data'],
    ['listContacts', () => listContacts('ob-1'), '/api/outbreaks/ob-1/contacts'],
    ['listCases', () => listCases('ob-1'), '/api/outbreaks/ob-1/cases'],
  ];

  cases.forEach(([name, op, path]) => {
    it(`${name} GETs ${path} and writes the body to state.data`, async () => {
      testServer
        .intercept({ path, method: 'GET', headers: auth })
        .reply(200, [{ id: 'r-1' }], jsonHeaders);

      const result = await op()(state());

      expect(result.data).to.eql([{ id: 'r-1' }]);
      expect(result.response.statusCode).to.equal(200);
    });
  });

  const filtered = [
    ['getOutbreak', q => getOutbreak(q), '/api/outbreaks'],
    ['getLocation', q => getLocation(q), '/api/locations'],
    ['getReferenceData', q => getReferenceData(q), '/api/reference-data'],
    ['getContact', q => getContact('ob-1', q), '/api/outbreaks/ob-1/contacts'],
    ['getCase', q => getCase('ob-1', q), '/api/outbreaks/ob-1/cases'],
  ];

  filtered.forEach(([name, op, path]) => {
    it(`${name} sends the query as a JSON filter to ${path}`, async () => {
      testServer
        .intercept({
          path,
          method: 'GET',
          headers: auth,
          query: filterOf({ name: 'A' }),
        })
        .reply(200, [{ id: 'r-1' }], jsonHeaders);

      const result = await op({ where: { name: 'A' } })(state());

      expect(result.data).to.eql([{ id: 'r-1' }]);
    });
  });

  it('resolves a lazy outbreak id', async () => {
    testServer
      .intercept({ path: '/api/outbreaks/ob-7/cases', method: 'GET' })
      .reply(200, [], jsonHeaders);

    const result = await listCases($ => $.outbreakId)(
      state({ outbreakId: 'ob-7' })
    );

    expect(result.data).to.eql([]);
  });
});

describe('upserts', () => {
  const mockMatches = (path, where, matches) =>
    testServer
      .intercept({
        path,
        method: 'GET',
        headers: auth,
        query: filterOf(where),
      })
      .reply(200, matches, jsonHeaders);

  it('upsertContact creates a contact when none match', async () => {
    const contact = { visualId: 'CON-1', firstName: 'Luca' };
    mockMatches('/api/outbreaks/ob-1/contacts', { visualId: 'CON-1' }, []);
    const created = captureBody({ id: 'c-1', ...contact });
    testServer
      .intercept({ path: '/api/outbreaks/ob-1/contacts', method: 'POST' })
      .reply(200, created.handler, jsonHeaders);

    const result = await upsertContact('ob-1', 'visualId', contact)(state());

    expect(created.captured.body).to.eql(contact);
    expect(result.data.id).to.equal('c-1');
  });

  it('upsertContact updates the contact when exactly one matches', async () => {
    const contact = { visualId: 'CON-1', firstName: 'Luca' };
    mockMatches('/api/outbreaks/ob-1/contacts', { visualId: 'CON-1' }, [
      { id: 'c-1' },
    ]);
    const updated = captureBody({ id: 'c-1', ...contact });
    testServer
      .intercept({ path: '/api/outbreaks/ob-1/contacts/c-1', method: 'PUT' })
      .reply(200, updated.handler, jsonHeaders);

    const result = await upsertContact('ob-1', 'visualId', contact)(state());

    expect(updated.captured.body).to.eql(contact);
    expect(result.data.id).to.equal('c-1');
  });

  it('upsertContact throws when more than one contact matches', async () => {
    mockMatches('/api/outbreaks/ob-1/contacts', { visualId: 'CON-1' }, [
      { id: 'c-1' },
      { id: 'c-2' },
    ]);

    const error = await upsertContact('ob-1', 'visualId', {
      visualId: 'CON-1',
    })(state()).catch(e => e);

    expect(error.code).to.equal('UPSERT_MULTIPLE_MATCHES');
    expect(error.description).to.contain('2 records');
    expect(error.description).to.contain('CON-1');
  });

  it('upsertCase adds the matched id and removes visualId on update', async () => {
    mockMatches('/api/outbreaks/ob-1/cases', { visualId: 'CA-1' }, [
      { id: 'case-1' },
    ]);
    const updated = captureBody({ id: 'case-1' });
    testServer
      .intercept({ path: '/api/outbreaks/ob-1/cases/case-1', method: 'PUT' })
      .reply(200, updated.handler, jsonHeaders);

    const input = { visualId: 'CA-1', firstName: 'Ada' };
    await upsertCase('ob-1', 'visualId', input)(state());

    expect(updated.captured.body).to.eql({ id: 'case-1', firstName: 'Ada' });
    expect(input).to.eql({ visualId: 'CA-1', firstName: 'Ada' });
  });

  it('upsertCase resolves lazy data before matching', async () => {
    mockMatches('/api/outbreaks/ob-1/cases', { visualId: 'CA-2' }, []);
    const created = captureBody({ id: 'case-2' });
    testServer
      .intercept({ path: '/api/outbreaks/ob-1/cases', method: 'POST' })
      .reply(200, created.handler, jsonHeaders);

    await upsertCase('ob-1', 'visualId', $ => ({
      visualId: $.patient.caseId,
    }))(state({ patient: { caseId: 'CA-2' } }));

    expect(created.captured.body).to.eql({ visualId: 'CA-2' });
  });

  it('upsertOutbreak matches externalId against the outbreak id', async () => {
    mockMatches('/api/outbreaks', { id: 'ob-1' }, [{ id: 'ob-1' }]);
    const updated = captureBody({ id: 'ob-1' });
    testServer
      .intercept({ path: '/api/outbreaks/ob-1', method: 'PUT' })
      .reply(200, updated.handler, jsonHeaders);

    await upsertOutbreak({ externalId: 'ob-1', data: { name: 'Demo' } })(
      state()
    );

    expect(updated.captured.body).to.eql({ name: 'Demo' });
  });

  it('upsertLocation creates a location when none match', async () => {
    mockMatches('/api/locations', { name: 'Here' }, []);
    const created = captureBody({ id: 'loc-1' });
    testServer
      .intercept({ path: '/api/locations', method: 'POST' })
      .reply(200, created.handler, jsonHeaders);

    await upsertLocation('name', { name: 'Here', active: true })(state());

    expect(created.captured.body).to.eql({ name: 'Here', active: true });
  });

  it('upsertReferenceData updates the entry when exactly one matches', async () => {
    mockMatches('/api/reference-data', { id: 'REF_A' }, [{ id: 'REF_A' }]);
    const updated = captureBody({ id: 'REF_A' });
    testServer
      .intercept({ path: '/api/reference-data/REF_A', method: 'PUT' })
      .reply(200, updated.handler, jsonHeaders);

    await upsertReferenceData('id', { id: 'REF_A', value: 'A' })(state());

    expect(updated.captured.body).to.eql({ id: 'REF_A', value: 'A' });
  });
});
