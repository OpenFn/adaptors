import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
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

const baseUrl = 'http://openspp-adaptor.test';
const testServer = enableMockClient(baseUrl);
const API = '/api/v2/spp';

const configuration = {
  baseUrl,
  clientId: 'test-client',
  clientSecret: 'test-secret',
};

const run = (...operations) =>
  execute(...operations)({ configuration: { ...configuration } });

const expectRejection = async (promise, check) => {
  let error;
  try {
    await promise;
  } catch (e) {
    error = e;
  }
  expect(error, 'expected the operation to throw').to.exist;
  check(error);
};

const jsonBody = expected => body => {
  expect(JSON.parse(body)).to.eql(expected);
  return true;
};

before(() => {
  testServer
    .intercept({ path: `${API}/oauth/token`, method: 'POST' })
    .reply(200, {
      access_token: 'fake-token',
      token_type: 'Bearer',
      expires_in: 86400,
      scope: '',
    })
    .persist();
});

describe('execute', () => {
  it('fetches one token per run and reuses it across operations', async () => {
    const onceUrl = 'http://openspp-token-once.test';
    const onceServer = enableMockClient(onceUrl);
    onceServer
      .intercept({ path: `${API}/oauth/token`, method: 'POST' })
      .reply(200, { access_token: 'only-once' });
    onceServer
      .intercept({
        path: `${API}/Program/${PROGRAM_PATH}`,
        method: 'GET',
        headers: { authorization: 'Bearer only-once' },
      })
      .reply(200, program)
      .times(2);

    const state = await execute(
      getProgram(PROGRAM_ID),
      getProgram(PROGRAM_ID)
    )({ configuration: { ...configuration, baseUrl: onceUrl } });

    expect(state.data).to.eql(program);
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
});

describe('getIndividual', () => {
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

  it('throws on a v1-style id without calling OpenSPP', async () => {
    await expectRejection(run(getIndividual('IND_Q4VGGZPF')), error => {
      expect(error.message).to.match(/Invalid identifier "IND_Q4VGGZPF"/);
    });
  });

  it('throws and does not keep stale data when the individual is not found', async () => {
    testServer
      .intercept({ path: `${API}/Individual/${IND_PATH}`, method: 'GET' })
      .reply(404, { detail: 'Individual not found' });

    await expectRejection(run(getIndividual(IND_ID)), error => {
      expect(error.statusCode).to.equal(404);
      expect(error.message).to.match(/Individual not found/);
    });
  });
});

describe('searchIndividual', () => {
  it('searches with v2 query params and returns a list', async () => {
    testServer
      .intercept({
        path: `${API}/Individual?name=ABAD&birthdate=ge2010-01-01&_count=10&_offset=20&_sort=-birthdate`,
        method: 'GET',
      })
      .reply(200, searchResult([individual]));

    const state = await run(
      searchIndividual(
        { name: 'ABAD', birthdate: 'ge2010-01-01' },
        { count: 10, offset: 20, sort: '-birthdate' }
      )
    );

    expect(state.data).to.eql([individual]);
    expect(state.response.page).to.eql({ total: 1, next: null });
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

  it('throws when the group filter is not system|value (OpenSPP would ignore it and return everyone)', async () => {
    await expectRejection(run(searchIndividual({ group: 'GRP_X' })), error => {
      expect(error.message).to.match(/Invalid identifier "GRP_X"/);
    });
  });
});

describe('createIndividual', () => {
  const data = {
    identifier: individual.identifier,
    name: { family: 'ABAD', given: 'CLARITA' },
  };

  it('creates an individual and returns it', async () => {
    testServer
      .intercept({
        path: `${API}/Individual`,
        method: 'POST',
        body: jsonBody(data),
      })
      .reply(201, individual);

    const state = await run(createIndividual(data));

    expect(state.data).to.eql(individual);
    expect(data).to.not.have.property('is_registrant');
  });

  it('throws before calling OpenSPP when identifier is missing', async () => {
    await expectRejection(run(createIndividual({ name: { given: 'X' } })), error => {
      expect(error.message).to.match(/identifier/);
    });
  });
});

describe('updateIndividual', () => {
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

  it('throws when data is not an object', async () => {
    await expectRejection(run(updateIndividual(IND_ID, 'nope')), error => {
      expect(error.message).to.match(/must be an object/);
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
});

const groupExists = () =>
  testServer
    .intercept({
      path: `${API}/Group/${GRP_PATH}?_elements=identifier`,
      method: 'GET',
    })
    .reply(200, { type: 'Group', identifier: group.identifier });

describe('getGroupMembers', () => {
  it('lists the individuals in a group, optionally by role', async () => {
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
      expect(error.message).to.match(/Group not found/);
    });
  });

  it('throws on an invalid group id instead of returning every individual', async () => {
    await expectRejection(run(getGroupMembers('GRP_X')), error => {
      expect(error.message).to.match(/Invalid identifier "GRP_X"/);
    });
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
      .reply(200, { ...groupMember('child'), status: 'ended' });

    const state = await run(removeFromGroup(GRP_ID, IND_ID, { reason: 'Moved out' }));

    expect(state.data.status).to.equal('ended');
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
      getPrograms({ targetType: 'individual' }, { count: 10, lastId: 42 })
    );

    expect(state.data).to.eql([program]);
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
      expect(error.message).to.match(/Invalid reference/);
    });
  });
});

const membershipsPath = `${API}/ProgramMembership?beneficiary=${encodeURIComponent(
  `Individual/${IND_ID}`
)}&_count=100`;

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
      expect(error.message).to.match(/Ambiguous membership/);
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
      expect(error.message).to.match(/not a member of/);
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
});
