import { expect } from 'chai';
import {
  execute,
  request,
  getIndividual,
  searchIndividual,
  createIndividual,
  updateIndividual,
  getGroup,
  searchGroup,
  createGroup,
  updateGroup,
  getGroupMembers,
  addToGroup,
  removeFromGroup,
  getProgram,
  getPrograms,
  getEnrolledPrograms,
  enroll,
  unenroll,
  getServicePoint,
  searchServicePoint,
} from '../src/Adaptor.js';
import {
  IND_ID,
  IND_PATH,
  GRP_ID,
  GRP_PATH,
  PROGRAM_ID,
  PROGRAM_PATH,
  OTHER_PROGRAM_ID,
  individual,
  group,
  program,
  searchResult,
  membership,
  groupMember,
  servicePoint,
  servicePointBundle,
} from './fixtures.js';
import {
  createMockServer,
  assertAllMocksUsed,
  expectRejection,
  jsonBody,
  captureWarnings,
} from './helpers.js';

const baseUrl = 'http://openspp-adaptor.test';
const testServer = createMockServer(baseUrl);
const API = '/api/v2/spp';

const configuration = {
  baseUrl,
  clientId: 'test-client',
  clientSecret: 'test-secret',
};

// `execute` gets a token before the first operation. Only one token response
// is mocked per run, so a second token request fails the test.
const runWithState = (state, ...operations) => {
  testServer
    .intercept({ path: `${API}/oauth/token`, method: 'POST' })
    .reply(200, {
      access_token: 'fake-token',
      token_type: 'Bearer',
      expires_in: 86400,
      scope: '',
    });
  return execute(...operations)({ ...state, configuration: { ...configuration } });
};

const run = (...operations) => runWithState({}, ...operations);

// Mocks a GET search, runs the operation and returns the warnings it logged
const searchWarnings = async (path, operation) => {
  testServer
    .intercept({ path: `${API}${path}`, method: 'GET' })
    .reply(200, searchResult([]));
  return captureWarnings(() => run(operation));
};

const groupExists = () =>
  testServer
    .intercept({
      path: `${API}/Group/${GRP_PATH}?_elements=identifier`,
      method: 'GET',
    })
    .reply(200, { type: 'Group', identifier: group.identifier });

const membershipsPath = `${API}/ProgramMembership?beneficiary=${encodeURIComponent(
  `Individual/${IND_ID}`
)}&_count=100`;

afterEach(() => assertAllMocksUsed(testServer));

describe('execute', () => {
  it('fetches one token per run and reuses it across operations', async () => {
    testServer
      .intercept({
        path: `${API}/Program/${PROGRAM_PATH}`,
        method: 'GET',
        headers: { authorization: 'Bearer fake-token' },
      })
      .reply(200, program)
      .times(2);

    const state = await run(getProgram(PROGRAM_ID), getProgram(PROGRAM_ID));

    expect(state.data).to.eql(program);
  });

  it('starts with null data and no references', async () => {
    const state = await run();

    expect(state.data).to.be.null;
    expect(state.references).to.eql([]);
  });
});

describe('request', () => {
  it('sends any request under /api/v2/spp and writes the body to state.data', async () => {
    testServer
      .intercept({
        path: `${API}/Vocabulary?_count=5`,
        method: 'GET',
        headers: { authorization: 'Bearer fake-token' },
      })
      .reply(200, { data: [{ code: 'x' }] });

    const state = await run(
      request('GET', '/Vocabulary', undefined, { query: { _count: 5 } })
    );

    expect(state.data).to.eql({ data: [{ code: 'x' }] });
    expect(state.response.statusCode).to.equal(200);
  });

  it('sends the body argument as JSON', async () => {
    testServer
      .intercept({
        path: `${API}/Vocabulary`,
        method: 'POST',
        body: jsonBody({ code: 'x' }),
      })
      .reply(201, { code: 'x' });

    const state = await run(request('POST', '/Vocabulary', { code: 'x' }));

    expect(state.data).to.eql({ code: 'x' });
    expect(state.response.statusCode).to.equal(201);
  });
});

describe('getIndividual', () => {
  it('resolves an id given as a function of state', async () => {
    testServer
      .intercept({ path: `${API}/Individual/${IND_PATH}`, method: 'GET' })
      .reply(200, individual);

    const state = await runWithState(
      { input: { id: IND_ID } },
      getIndividual(state => state.input.id)
    );

    expect(state.data).to.eql(individual);
  });

  it('reads an individual by system|value identifier', async () => {
    testServer
      .intercept({ path: `${API}/Individual/${IND_PATH}`, method: 'GET' })
      .reply(200, individual);

    const state = await run(getIndividual(IND_ID));

    expect(state.data).to.eql(individual);
  });

  it('sends sparse field and extension options', async () => {
    testServer
      .intercept({
        path: `${API}/Individual/${IND_PATH}?_elements=identifier%2Cname&_extensions=ext1`,
        method: 'GET',
      })
      .reply(200, individual);

    const state = await run(
      getIndividual(IND_ID, { elements: ['identifier', 'name'], extensions: 'ext1' })
    );

    expect(state.data).to.eql(individual);
  });

  it('throws on a v1-style id that is not system|value', async () => {
    await expectRejection(run(getIndividual('IND_Q4VGGZPF')), error => {
      expect(error.message).to.equal(
        'Invalid identifier "IND_Q4VGGZPF". Expected "system|value", eg "urn:openspp:vocab:id-type#national_id|PH-123"'
      );
      expect(error.statusCode).to.be.undefined;
    });
  });

  it('throws with the status and detail when the individual is not found', async () => {
    testServer
      .intercept({ path: `${API}/Individual/${IND_PATH}`, method: 'GET' })
      .reply(404, { detail: 'Individual not found' });

    await expectRejection(run(getIndividual(IND_ID)), error => {
      expect(error.message).to.equal(
        `OpenSPP 404 GET /Individual/${IND_ID}: Individual not found`
      );
      expect(error.statusCode).to.equal(404);
      expect(error.body).to.eql({ detail: 'Individual not found' });
    });
  });
});

describe('searchIndividual', () => {
  it('searches with v2 query params and returns a list', async () => {
    testServer
      .intercept({
        path: `${API}/Individual?name=ABAD&birthdate=ge2010-01-01&_count=10&_offset=20&_sort=-birthDate`,
        method: 'GET',
      })
      .reply(200, searchResult([individual]));

    const state = await run(
      searchIndividual(
        { name: 'ABAD', birthdate: 'ge2010-01-01' },
        { count: 10, offset: 20, sort: '-birthDate' }
      )
    );

    expect(state.data).to.eql([individual]);
    expect(state.response.page).to.eql({ total: 1, next: null });
  });

  it('resolves a query given as a function of state', async () => {
    testServer
      .intercept({ path: `${API}/Individual?identifier=${encodeURIComponent(IND_ID)}`, method: 'GET' })
      .reply(200, searchResult([individual]));

    const state = await runWithState(
      { input: { id: IND_ID } },
      searchIndividual(state => ({ identifier: state.input.id }))
    );

    expect(state.data).to.eql([individual]);
  });

  it('checks that a group filter exists before searching', async () => {
    groupExists();
    testServer
      .intercept({
        path: `${API}/Individual?group=${encodeURIComponent(GRP_ID)}`,
        method: 'GET',
      })
      .reply(200, searchResult([individual]));

    const state = await run(searchIndividual({ group: GRP_ID }));

    expect(state.data).to.eql([individual]);
  });

  it('throws when the group filter is for a group that does not exist (OpenSPP would ignore it and return everyone)', async () => {
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}?_elements=identifier`,
        method: 'GET',
      })
      .reply(404, { detail: 'Group not found' });

    await expectRejection(run(searchIndividual({ group: GRP_ID })), error => {
      expect(error.message).to.equal(
        `OpenSPP 404 GET /Group/${GRP_ID}: Group not found`
      );
      expect(error.statusCode).to.equal(404);
    });
  });

  it('throws when the group filter is not system|value (OpenSPP would ignore it and return everyone)', async () => {
    await expectRejection(run(searchIndividual({ group: 'GRP_X' })), error => {
      expect(error.message).to.match(/^Invalid identifier "GRP_X"\. Expected "system\|value"/);
    });
  });

  it('throws when the identifier filter is not system|value (OpenSPP would ignore it and return everyone)', async () => {
    await expectRejection(run(searchIndividual({ identifier: 'IND_X' })), error => {
      expect(error.message).to.match(/^Invalid identifier "IND_X"\. Expected "system\|value"/);
    });
  });

  it('throws on a v3 Odoo domain query (OpenSPP would ignore it and return everyone)', async () => {
    await expectRejection(
      run(searchIndividual([['spp_id', '=', 'X']])),
      error => {
        expect(error.message).to.equal(
          'query must be an object of OpenSPP search parameters, eg { name: "Santos" }. Odoo domains like [["spp_id","=","X"]] are not supported'
        );
      }
    );
  });

  it('warns on the v3 limit option and searches without it', async () => {
    const warnings = await searchWarnings(
      '/Individual',
      searchIndividual({}, { limit: 50 })
    );

    expect(warnings).to.eql([
      'WARNING: limit is not supported: use count to set the page size',
    ]);
  });

  it('warns on the v3 order option and searches without it', async () => {
    const warnings = await searchWarnings(
      '/Individual',
      searchIndividual({}, { order: 'name' })
    );

    expect(warnings).to.eql([
      'WARNING: order is not supported: use sort, eg { sort: "-birthDate" }',
    ]);
  });

  it('warns on lastId, which OpenSPP ignores', async () => {
    const warnings = await searchWarnings(
      '/Individual?_lastId=42',
      searchIndividual({}, { lastId: 42 })
    );

    expect(warnings).to.eql([
      'WARNING: searchIndividual does not support lastId: OpenSPP ignores lastId for individuals and groups; page with offset',
    ]);
  });

  it('warns on a sort field OpenSPP does not know (it sorts by name instead)', async () => {
    const warnings = await searchWarnings(
      '/Individual?_sort=-birthdate',
      searchIndividual({}, { sort: '-birthdate' })
    );

    expect(warnings).to.eql([
      'WARNING: searchIndividual does not support sort "-birthdate": use name, birthDate or lastUpdated, with - for descending (OpenSPP sorts by name for any other value)',
    ]);
  });

  it('does not warn on supported options', async () => {
    const warnings = await searchWarnings(
      '/Individual?_count=5&_offset=5&_sort=-lastUpdated',
      searchIndividual({}, { count: 5, offset: 5, sort: '-lastUpdated' })
    );

    expect(warnings).to.eql([]);
  });
});

describe('createIndividual', () => {
  const data = {
    identifier: individual.identifier,
    name: { family: 'ABAD', given: 'CLARITA' },
  };

  it('resolves data given as a function of state', async () => {
    testServer
      .intercept({ path: `${API}/Individual`, method: 'POST', body: jsonBody(data) })
      .reply(201, individual);

    const state = await runWithState(
      { input: data },
      createIndividual(state => state.input)
    );

    expect(state.data).to.eql(individual);
  });

  it('creates an individual and returns it', async () => {
    testServer
      .intercept({
        path: `${API}/Individual`,
        method: 'POST',
        body: jsonBody(data),
      })
      .reply(201, individual);

    const state = await run(createIndividual(Object.freeze({ ...data })));

    expect(state.data).to.eql(individual);
  });

  it('throws with OpenSPP\'s validation detail when identifier is missing', async () => {
    testServer
      .intercept({ path: `${API}/Individual`, method: 'POST' })
      .reply(422, {
        detail: [{ loc: ['body', 'identifier'], msg: 'Field required', type: 'missing' }],
      });

    await expectRejection(run(createIndividual({ name: { given: 'X' } })), error => {
      expect(error.message).to.equal(
        'OpenSPP 422 POST /Individual: body.identifier: Field required'
      );
      expect(error.statusCode).to.equal(422);
    });
  });
});

describe('updateIndividual', () => {
  it('resolves the id and data given as functions of state', async () => {
    testServer
      .intercept({
        path: `${API}/Individual/${IND_PATH}`,
        method: 'PATCH',
        body: jsonBody({ birthDate: '2016-05-04' }),
      })
      .reply(200, { ...individual, birthDate: '2016-05-04' });

    const state = await runWithState(
      { input: { id: IND_ID, birthDate: '2016-05-04' } },
      updateIndividual(
        state => state.input.id,
        state => ({ birthDate: state.input.birthDate })
      )
    );

    expect(state.data.birthDate).to.equal('2016-05-04');
  });

  it('patches only the given fields', async () => {
    testServer
      .intercept({
        path: `${API}/Individual/${IND_PATH}`,
        method: 'PATCH',
        body: jsonBody({ birthDate: '2016-05-03' }),
      })
      .reply(200, { ...individual, birthDate: '2016-05-03' });

    const state = await run(updateIndividual(IND_ID, { birthDate: '2016-05-03' }));

    expect(state.data.birthDate).to.equal('2016-05-03');
  });

  it('sends ifMatch as an If-Match header', async () => {
    testServer
      .intercept({
        path: `${API}/Individual/${IND_PATH}`,
        method: 'PATCH',
        headers: { 'if-match': '"1790220616815078"' },
      })
      .reply(200, individual);

    const state = await run(
      updateIndividual(IND_ID, { active: true }, { ifMatch: '"1790220616815078"' })
    );

    expect(state.data).to.eql(individual);
  });

  it('throws when data is not an object', async () => {
    await expectRejection(run(updateIndividual(IND_ID, 'nope')), error => {
      expect(error.message).to.equal('data must be an object, got "nope"');
    });
  });
});

describe('getGroup', () => {
  it('reads a group by system|value identifier', async () => {
    testServer
      .intercept({ path: `${API}/Group/${GRP_PATH}`, method: 'GET' })
      .reply(200, group);

    const state = await run(getGroup(GRP_ID));

    expect(state.data).to.eql(group);
  });
});

describe('searchGroup', () => {
  it('searches groups with v2 query params', async () => {
    testServer
      .intercept({
        path: `${API}/Group?name=Abad&type=household&_count=20`,
        method: 'GET',
      })
      .reply(200, searchResult([group]));

    const state = await run(
      searchGroup({ name: 'Abad', type: 'household' }, { count: 20 })
    );

    expect(state.data).to.eql([group]);
  });

  it('warns on sort, which OpenSPP ignores for groups', async () => {
    const warnings = await searchWarnings(
      '/Group?_sort=name',
      searchGroup({}, { sort: 'name' })
    );

    expect(warnings).to.eql([
      'WARNING: searchGroup does not support sort: OpenSPP cannot sort groups',
    ]);
  });

  it('warns on lastId, which OpenSPP ignores for groups', async () => {
    const warnings = await searchWarnings(
      '/Group?_lastId=42',
      searchGroup({}, { lastId: 42 })
    );

    expect(warnings).to.eql([
      'WARNING: searchGroup does not support lastId: OpenSPP ignores lastId for individuals and groups; page with offset',
    ]);
  });
});

describe('createGroup', () => {
  it('creates a group and returns it', async () => {
    const data = { identifier: group.identifier, name: 'Abad', groupType: 'household' };
    testServer
      .intercept({ path: `${API}/Group`, method: 'POST', body: jsonBody(data) })
      .reply(201, group);

    const state = await run(createGroup(data));

    expect(state.data).to.eql(group);
  });
});

describe('updateGroup', () => {
  it('patches only the given fields', async () => {
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}`,
        method: 'PATCH',
        body: jsonBody({ name: 'Abad-Santos' }),
      })
      .reply(200, { ...group, name: 'Abad-Santos' });

    const state = await run(updateGroup(GRP_ID, { name: 'Abad-Santos' }));

    expect(state.data.name).to.equal('Abad-Santos');
  });

  it('sends ifMatch as an If-Match header', async () => {
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}`,
        method: 'PATCH',
        headers: { 'if-match': '"7"' },
      })
      .reply(200, group);

    const state = await run(updateGroup(GRP_ID, { name: 'Abad' }, { ifMatch: '"7"' }));

    expect(state.data).to.eql(group);
  });
});

describe('getGroupMembers', () => {
  it('lists the individuals in a group', async () => {
    groupExists();
    testServer
      .intercept({
        path: `${API}/Individual?group=${encodeURIComponent(GRP_ID)}`,
        method: 'GET',
      })
      .reply(200, searchResult([individual]));

    const state = await run(getGroupMembers(GRP_ID));

    expect(state.data).to.eql([individual]);
  });

  it('filters members by role', async () => {
    groupExists();
    testServer
      .intercept({
        path: `${API}/Individual?group=${encodeURIComponent(GRP_ID)}&membership-role=head&_count=50`,
        method: 'GET',
      })
      .reply(200, searchResult([individual]));

    const state = await run(getGroupMembers(GRP_ID, { role: 'head', count: 50 }));

    expect(state.data).to.eql([individual]);
  });

  it('throws when the group does not exist instead of returning every individual', async () => {
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}?_elements=identifier`,
        method: 'GET',
      })
      .reply(404, { detail: 'Group not found' });

    await expectRejection(run(getGroupMembers(GRP_ID)), error => {
      expect(error.statusCode).to.equal(404);
      expect(error.message).to.equal(`OpenSPP 404 GET /Group/${GRP_ID}: Group not found`);
    });
  });

  it('throws on an invalid group id instead of returning every individual', async () => {
    await expectRejection(run(getGroupMembers('GRP_X')), error => {
      expect(error.message).to.match(/Invalid identifier "GRP_X"/);
    });
  });

  it('warns on lastId, which OpenSPP ignores', async () => {
    groupExists();
    const warnings = await searchWarnings(
      `/Individual?group=${encodeURIComponent(GRP_ID)}&_lastId=42`,
      getGroupMembers(GRP_ID, { lastId: 42 })
    );

    expect(warnings).to.eql([
      'WARNING: getGroupMembers does not support lastId: OpenSPP ignores lastId for individuals and groups; page with offset',
    ]);
  });

  it('warns on a sort field OpenSPP does not know (it sorts by name instead)', async () => {
    groupExists();
    const warnings = await searchWarnings(
      `/Individual?group=${encodeURIComponent(GRP_ID)}&_sort=age`,
      getGroupMembers(GRP_ID, { sort: 'age' })
    );

    expect(warnings).to.eql([
      'WARNING: getGroupMembers does not support sort "age": use name, birthDate or lastUpdated, with - for descending (OpenSPP sorts by name for any other value)',
    ]);
  });
});

describe('addToGroup', () => {
  it('adds an individual with a role code', async () => {
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}/$add-member`,
        method: 'POST',
        body: jsonBody({
          entity: { reference: `Individual/${IND_ID}` },
          role: {
            coding: [
              { system: 'urn:openspp:vocab:group-membership-type', code: 'head' },
            ],
          },
        }),
      })
      .reply(201, groupMember('head'));

    const state = await run(addToGroup(GRP_ID, IND_ID, 'head'));

    expect(state.data).to.eql(groupMember('head'));
  });

  it('updates the role when the individual is already a member', async () => {
    testServer
      .intercept({ path: `${API}/Group/${GRP_PATH}/$add-member`, method: 'POST' })
      .reply(409, { detail: 'Individual is already a member of this group' });
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}/member/${IND_PATH}`,
        method: 'PATCH',
        body: jsonBody({
          role: {
            coding: [
              { system: 'urn:openspp:vocab:group-membership-type', code: 'head' },
            ],
          },
        }),
      })
      .reply(200, groupMember('head'));

    const state = await run(addToGroup(GRP_ID, IND_ID, 'head'));

    expect(state.data).to.eql(groupMember('head'));
  });

  it('keeps existing roles when an existing member is added without a role', async () => {
    testServer
      .intercept({ path: `${API}/Group/${GRP_PATH}/$add-member`, method: 'POST' })
      .reply(409, { detail: 'Individual is already a member of this group' });
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}/member/${IND_PATH}`,
        method: 'PATCH',
        body: jsonBody({}),
      })
      .reply(200, groupMember('child'));

    const state = await run(addToGroup(GRP_ID, IND_ID));

    expect(state.data.role.coding[0].code).to.equal('child');
  });

  it('throws a 409 that is not "already a member" instead of patching (eg an ambiguous identifier)', async () => {
    testServer
      .intercept({ path: `${API}/Group/${GRP_PATH}/$add-member`, method: 'POST' })
      .reply(409, { detail: 'Identifier matches more than one registrant' });

    await expectRejection(run(addToGroup(GRP_ID, IND_ID, 'head')), error => {
      expect(error.statusCode).to.equal(409);
      expect(error.message).to.match(/Identifier matches more than one registrant/);
    });
  });

  it('sends startDate for the new membership', async () => {
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}/$add-member`,
        method: 'POST',
        body: jsonBody({
          entity: { reference: `Individual/${IND_ID}` },
          startDate: '2026-09-01',
        }),
      })
      .reply(201, groupMember('other'));

    const state = await run(
      addToGroup(GRP_ID, IND_ID, undefined, { startDate: '2026-09-01' })
    );

    expect(state.data).to.eql(groupMember('other'));
  });

  it('sends a role given as a CodeableConcept unchanged', async () => {
    const role = { coding: [{ system: 'urn:example:roles', code: 'caregiver' }] };
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}/$add-member`,
        method: 'POST',
        body: jsonBody({ entity: { reference: `Individual/${IND_ID}` }, role }),
      })
      .reply(201, groupMember('caregiver'));

    const state = await run(addToGroup(GRP_ID, IND_ID, role));

    expect(state.data).to.eql(groupMember('caregiver'));
  });
});

describe('removeFromGroup', () => {
  it('ends the membership with an optional reason', async () => {
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}/$remove-member`,
        method: 'POST',
        body: jsonBody({
          entity: { reference: `Individual/${IND_ID}` },
          reason: 'Moved out',
        }),
      })
      .reply(200, { ...groupMember('child'), status: 'inactive' });

    const state = await run(removeFromGroup(GRP_ID, IND_ID, { reason: 'Moved out' }));

    expect(state.data.status).to.equal('inactive');
  });

  it('sends endedDate', async () => {
    testServer
      .intercept({
        path: `${API}/Group/${GRP_PATH}/$remove-member`,
        method: 'POST',
        body: jsonBody({
          entity: { reference: `Individual/${IND_ID}` },
          endedDate: '2026-09-15',
        }),
      })
      .reply(200, { ...groupMember('child'), endedDate: '2026-09-15' });

    const state = await run(
      removeFromGroup(GRP_ID, IND_ID, { endedDate: '2026-09-15' })
    );

    expect(state.data.endedDate).to.equal('2026-09-15');
  });

  it('throws on an individual id that is not system|value', async () => {
    await expectRejection(run(removeFromGroup(GRP_ID, 'IND_X')), error => {
      expect(error.message).to.match(/^Invalid identifier "IND_X"\. Expected "system\|value"/);
    });
  });
});

describe('getProgram', () => {
  it('reads a program by identifier', async () => {
    testServer
      .intercept({ path: `${API}/Program/${PROGRAM_PATH}`, method: 'GET' })
      .reply(200, program);

    const state = await run(getProgram(PROGRAM_ID));

    expect(state.data).to.eql(program);
  });
});

describe('getPrograms', () => {
  it('lists programs with filters and a cursor', async () => {
    testServer
      .intercept({
        path: `${API}/Program?targetType=individual&_count=10&_lastId=42`,
        method: 'GET',
      })
      .reply(200, searchResult([program]));

    const state = await run(
      getPrograms({ targetType: 'individual', count: 10, lastId: 42 })
    );

    expect(state.data).to.eql([program]);
  });

  for (const key of ['offset', 'limit']) {
    it(`warns on ${key}, pointing to count and lastId (programs page with a cursor)`, async () => {
      const warnings = await searchWarnings(
        `/Program?${key}=10`,
        getPrograms({ [key]: 10 })
      );

      expect(warnings).to.eql([
        `WARNING: getPrograms does not support ${key}: OpenSPP pages programs with a cursor, so use count (page size, 1-100) and lastId (the _lastId value in state.response.page.next)`,
      ]);
    });
  }

  it('throws when options is not an object', async () => {
    await expectRejection(run(getPrograms('individual')), error => {
      expect(error.message).to.equal('options must be an object, got "individual"');
    });
  });

  it('warns on order, saying programs cannot be sorted', async () => {
    const warnings = await searchWarnings(
      '/Program?order=name',
      getPrograms({ order: 'name' })
    );

    expect(warnings).to.eql([
      'WARNING: getPrograms does not support order: OpenSPP cannot sort programs',
    ]);
  });
});

describe('getEnrolledPrograms', () => {
  it('lists enrolled memberships for a typed beneficiary', async () => {
    testServer
      .intercept({
        path: `${API}/ProgramMembership?beneficiary=${encodeURIComponent(`Individual/${IND_ID}`)}&status=enrolled&_count=100`,
        method: 'GET',
      })
      .reply(200, searchResult([membership('enrolled')]));

    const state = await run(getEnrolledPrograms(`Individual/${IND_ID}`));

    expect(state.data).to.eql([membership('enrolled')]);
  });

  it('throws on an untyped beneficiary', async () => {
    await expectRejection(run(getEnrolledPrograms(IND_ID)), error => {
      expect(error.message).to.equal(
        `Invalid reference "${IND_ID}". Expected "Individual/system|value" or "Group/system|value"`
      );
    });
  });
});

describe('enroll', () => {
  it('creates a membership when the beneficiary is not in the program', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(200, searchResult([]));
    testServer
      .intercept({
        path: `${API}/ProgramMembership`,
        method: 'POST',
        body: jsonBody({
          program: { reference: `Program/${PROGRAM_ID}` },
          beneficiary: { reference: `Individual/${IND_ID}` },
          status: 'enrolled',
        }),
      })
      .reply(201, membership('enrolled'));

    const state = await run(enroll(`Individual/${IND_ID}`, PROGRAM_ID));

    expect(state.data.status).to.equal('enrolled');
  });

  it('sends enrollmentDate for a new membership', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(200, searchResult([]));
    testServer
      .intercept({
        path: `${API}/ProgramMembership`,
        method: 'POST',
        body: jsonBody({
          program: { reference: `Program/${PROGRAM_ID}` },
          beneficiary: { reference: `Individual/${IND_ID}` },
          status: 'enrolled',
          enrollmentDate: '2026-09-01',
        }),
      })
      .reply(201, membership('enrolled'));

    const state = await run(
      enroll(`Individual/${IND_ID}`, PROGRAM_ID, { enrollmentDate: '2026-09-01' })
    );

    expect(state.data.status).to.equal('enrolled');
  });

  it('enrolls a group', async () => {
    const beneficiary = `Group/${GRP_ID}`;
    testServer
      .intercept({
        path: `${API}/ProgramMembership?beneficiary=${encodeURIComponent(beneficiary)}&_count=100`,
        method: 'GET',
      })
      .reply(200, searchResult([]));
    testServer
      .intercept({
        path: `${API}/ProgramMembership`,
        method: 'POST',
        body: jsonBody({
          program: { reference: `Program/${PROGRAM_ID}` },
          beneficiary: { reference: beneficiary },
          status: 'enrolled',
        }),
      })
      .reply(201, membership('enrolled', PROGRAM_ID, beneficiary));

    const state = await run(enroll(beneficiary, PROGRAM_ID));

    expect(state.data.beneficiary.reference).to.equal(beneficiary);
  });

  it('does nothing when the beneficiary is already enrolled', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(200, searchResult([membership('enrolled')]));

    const state = await run(enroll(`Individual/${IND_ID}`, PROGRAM_ID));

    expect(state.data).to.eql(membership('enrolled'));
  });

  it('re-enrolls an only membership with a PUT', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(200, searchResult([membership('exited')]));
    testServer
      .intercept({
        path: `${API}/ProgramMembership/${IND_PATH}`,
        method: 'PUT',
        body: jsonBody({
          program: { reference: `Program/${PROGRAM_ID}` },
          beneficiary: { reference: `Individual/${IND_ID}` },
          status: 'enrolled',
          enrollmentDate: '2024-12-16',
        }),
      })
      .reply(200, membership('enrolled'));

    const state = await run(enroll(`Individual/${IND_ID}`, PROGRAM_ID));

    expect(state.data.status).to.equal('enrolled');
  });

  it('refuses to update when the beneficiary has several memberships', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(
        200,
        searchResult([membership('exited'), membership('enrolled', OTHER_PROGRAM_ID)])
      );

    await expectRejection(run(enroll(`Individual/${IND_ID}`, PROGRAM_ID)), error => {
      expect(error.message).to.equal(
        `Ambiguous membership: Individual/${IND_ID} is in more than one program, and OpenSPP cannot safely update one of them through the API. Change the membership in OpenSPP instead.`
      );
    });
  });

  it('refuses to update when the memberships have more than one page', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(200, {
        ...searchResult([membership('exited')]),
        links: { next: `${membershipsPath}&_offset=100` },
      });

    await expectRejection(run(enroll(`Individual/${IND_ID}`, PROGRAM_ID)), error => {
      expect(error.message).to.match(/^Ambiguous membership: /);
    });
  });
});

describe('unenroll', () => {
  it('sets an only membership to exited', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(200, searchResult([membership('enrolled')]));
    testServer
      .intercept({
        path: `${API}/ProgramMembership/${IND_PATH}`,
        method: 'PUT',
        body: jsonBody({
          program: { reference: `Program/${PROGRAM_ID}` },
          beneficiary: { reference: `Individual/${IND_ID}` },
          status: 'exited',
          enrollmentDate: '2024-12-16',
          exitDate: '2026-09-24',
        }),
      })
      .reply(200, membership('exited'));

    const state = await run(
      unenroll(`Individual/${IND_ID}`, PROGRAM_ID, { exitDate: '2026-09-24' })
    );

    expect(state.data.status).to.equal('exited');
  });

  it('sends exitReason', async () => {
    const exitReason = { text: 'Moved away' };
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(200, searchResult([membership('enrolled')]));
    testServer
      .intercept({
        path: `${API}/ProgramMembership/${IND_PATH}`,
        method: 'PUT',
        body: jsonBody({
          program: { reference: `Program/${PROGRAM_ID}` },
          beneficiary: { reference: `Individual/${IND_ID}` },
          status: 'exited',
          enrollmentDate: '2024-12-16',
          exitReason,
        }),
      })
      .reply(200, membership('exited'));

    const state = await run(
      unenroll(`Individual/${IND_ID}`, PROGRAM_ID, { exitReason })
    );

    expect(state.data.status).to.equal('exited');
  });

  it('does nothing when the membership is not enrolled', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(200, searchResult([membership('exited')]));

    const state = await run(unenroll(`Individual/${IND_ID}`, PROGRAM_ID));

    expect(state.data.status).to.equal('exited');
  });

  it('throws when the beneficiary is not in the program', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(200, searchResult([]));

    await expectRejection(run(unenroll(`Individual/${IND_ID}`, PROGRAM_ID)), error => {
      expect(error.message).to.equal(
        `Individual/${IND_ID} is not a member of Program/${PROGRAM_ID}`
      );
    });
  });

  it('refuses to update when the beneficiary has several memberships', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(
        200,
        searchResult([membership('enrolled'), membership('enrolled', OTHER_PROGRAM_ID)])
      );

    await expectRejection(run(unenroll(`Individual/${IND_ID}`, PROGRAM_ID)), error => {
      expect(error.message).to.match(/Ambiguous membership/);
    });
  });

  it('throws if OpenSPP updated a membership in a different program', async () => {
    testServer
      .intercept({ path: membershipsPath, method: 'GET' })
      .reply(200, searchResult([membership('enrolled')]));
    testServer
      .intercept({ path: `${API}/ProgramMembership/${IND_PATH}`, method: 'PUT' })
      .reply(200, membership('exited', OTHER_PROGRAM_ID));

    await expectRejection(run(unenroll(`Individual/${IND_ID}`, PROGRAM_ID)), error => {
      expect(error.message).to.match(/updated a membership in a different program/);
    });
  });
});

describe('getServicePoint', () => {
  it('reads a service point by name', async () => {
    testServer
      .intercept({
        path: `${API}/ServicePoint/OpenFn%20Test%20Service%20Point%201`,
        method: 'GET',
      })
      .reply(200, servicePoint);

    const state = await run(getServicePoint('OpenFn Test Service Point 1'));

    expect(state.data).to.eql(servicePoint);
  });

  it('throws on an empty name', async () => {
    await expectRejection(run(getServicePoint('')), error => {
      expect(error.message).to.equal('Invalid service point name ""');
    });
  });
});

describe('searchServicePoint', () => {
  it('unwraps the FHIR Bundle into a list', async () => {
    testServer
      .intercept({
        path: `${API}/ServicePoint?country=PH&contractActive=true&_count=20`,
        method: 'GET',
      })
      .reply(200, servicePointBundle([servicePoint]));

    const state = await run(
      searchServicePoint({ country: 'PH', contractActive: true }, { count: 20 })
    );

    expect(state.data).to.eql([servicePoint]);
    expect(state.response.page).to.eql({ total: 1, next: null });
  });

  const ignored = {
    sort: 'OpenSPP cannot sort service points',
    lastId: 'OpenSPP pages service points with offset, not lastId',
    elements: 'OpenSPP always returns every service point field',
    extensions: 'OpenSPP has no extensions for service points',
  };
  for (const [key, reason] of Object.entries(ignored)) {
    it(`warns on ${key}, which OpenSPP ignores for service points`, async () => {
      testServer
        .intercept({ path: `${API}/ServicePoint?_${key}=x`, method: 'GET' })
        .reply(200, servicePointBundle([]));

      const warnings = await captureWarnings(() =>
        run(searchServicePoint({}, { [key]: 'x' }))
      );

      expect(warnings).to.eql([
        `WARNING: searchServicePoint does not support ${key}: ${reason}`,
      ]);
    });
  }
});
