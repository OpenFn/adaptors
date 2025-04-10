import { enableMockClient } from '@openfn/language-common/util';
import { expect } from 'chai';

import testData from './fixtures.json' assert { type: 'json' };

import { get, create, update, upsert, execute } from '../src';
import * as adaptor from '../src';

const testServer = enableMockClient('https://index-tests.openmrs.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  instanceUrl: 'https://index-tests.openmrs.org',
};

const state = {
  configuration,
  patient: testData.patient,
  encounter: testData.encounter,
};

// Helper function to set up a single paginated call
const mockPage = (resourceType, itemIds = ['1'], hasMore, query) => {
  testServer
    .intercept({
      path: `/ws/rest/v1/${resourceType}`,
      method: 'GET',
      query,
    })
    .reply(
      200,
      {
        results: itemIds.map(uuid => ({ uuid })),
        links: hasMore
          ? [
              {
                rel: 'next',
                uri: '.',
              },
            ]
          : [],
      },
      { ...jsonHeaders }
    );
};

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = { configuration };
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    let state = {};

    execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});

describe('get', () => {
  it('should get a single item by uuid', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/123',
        method: 'GET',
      })
      .reply(200, { uuid: '123' }, { ...jsonHeaders });

    const { data } = await execute(get('encounter/123'))(state);

    expect(data.length).to.equal(1);
    expect(data[0].uuid).to.eql('123');
  });

  it('should get a singleton', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/123?limit=1',
        method: 'GET',
      })
      .reply(200, { uuid: '123' }, { ...jsonHeaders });

    // prettier-ignore
    const { data } = await execute(
      get('encounter/123', { singleton: true })
    )(state);

    expect(data.uuid).to.eql('123');
  });

  it('should get all items by default', async () => {
    // should I just import the mock server from utils?
    mockPage('encounter', ['1', '2'], true);
    // note that limit is added after the first request
    mockPage('encounter', ['3', '4'], true, { startIndex: 3, limit: 2 });
    mockPage('encounter', ['5', '6'], false, { startIndex: 5, limit: 2 });

    // prettier-ignore
    const { data } = await execute(
      get('encounter')
    )(state);

    expect(data.length).to.eql(6);
    expect(data[0]).to.eql({ uuid: '1' });
  });

  it('should get all items by with a page size', async () => {
    // should I just import the mock server from utils?
    mockPage('encounter', ['1', '2', '3', '4'], true, { limit: 4 });
    // note that limit is added after the first request
    mockPage('encounter', ['5', '6', '7', '8'], true, {
      startIndex: 5,
      limit: 4,
    });
    mockPage('encounter', ['9', '10'], false, { startIndex: 9, limit: 4 });

    // prettier-ignore
    const { data } = await execute(
      get('encounter', {
        pageSize: 4
      })
    )(state);

    expect(data.length).to.eql(10);
    expect(data[0]).to.eql({ uuid: '1' });
    expect(data[9]).to.eql({ uuid: '10' });
  });

  it('should get with a limit', async () => {
    // should I just import the mock server from utils?
    mockPage('encounter', ['1', '2'], false, { limit: 22 });

    // prettier-ignore
    const { data } = await execute(
      get('encounter', { limit: 22 })
    )(state);

    expect(data.length).to.eql(2);
  });

  it('should get with a max', async () => {
    // should I just import the mock server from utils?
    mockPage('encounter', ['1', '2'], false, { limit: 22 });

    // prettier-ignore
    const { data } = await execute(
      get('encounter', { max: 22 })
    )(state);

    expect(data.length).to.eql(2);
  });

  it('should prefer limit to max', async () => {
    mockPage('encounter', ['1', '2'], false, { limit: 22 });

    // prettier-ignore
    const { data } = await execute(
      get('encounter', { max: 33, limit: 22 })
    )(state);

    expect(data.length).to.eql(2);
  });

  it('should only get one page with limit', async () => {
    mockPage('encounter__', ['1', '2'], true, { limit: 22 });
    mockPage('encounter__', ['3', '4'], true, { limit: 22 });

    // prettier-ignore
    const { data } = await execute(
      get('encounter__', { limit: 22 })
    )(state);

    expect(data.length).to.eql(2);
  });

  it('should get multiple pages with max and pageSize', async () => {
    mockPage('encounter', ['1', '2'], true, { limit: 2 });
    mockPage('encounter', ['3', '4'], false, { limit: 2, startIndex: 3 });

    // prettier-ignore
    const { data } = await execute(
      get('encounter', { max: 20, pageSize: 2 })
    )(state);

    expect(data.length).to.eql(4);
  });

  it('should parse query params', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah' },
        method: 'GET',
      })
      .reply(200, { results: testData.patientResults }, { ...jsonHeaders });

    const { data } = await execute(get('patient', { q: 'Sarah' }))(state);

    expect(data[0].uuid).to.eql(testData.patientResults[0].uuid);
  });

  it('should be robust to leading and trailing slashes: /encounter/123', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/123',
        method: 'GET',
      })
      .reply(200, { uuid: '123' }, { ...jsonHeaders });

    const { data } = await execute(get('/encounter/123'))(state);

    expect(data.length).to.equal(1);
    expect(data[0].uuid).to.eql('123');
  });

  it('should be robust to leading and trailing slashes: encounter/123/', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/123',
        method: 'GET',
      })
      .reply(200, { uuid: '123' }, { ...jsonHeaders });

    const { data } = await execute(get('encounter/123/'))(state);

    expect(data.length).to.equal(1);
    expect(data[0].uuid).to.eql('123');
  });

  it('should be robust to leading and trailing slashes: encounter/123', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/123',
        method: 'GET',
      })
      .reply(200, { uuid: '123' }, { ...jsonHeaders });

    const { data } = await execute(get('encounter/123'))(state);

    expect(data.length).to.equal(1);
    expect(data[0].uuid).to.eql('123');
  });
});

describe('Update', () => {
  it('should update a patient', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient/b52ec6f9-0e26-424c-a4a1-c64f9d571eb3',
        method: 'POST',
      })
      .reply(200, ({ body }) => body, {
        ...jsonHeaders,
      });

    const { data } = await execute(
      update(
        'patient/b52ec6f9-0e26-424c-a4a1-c64f9d571eb3',
        state => state.patient
      )
    )(state);
    expect(data.uuid).to.eql('b52ec6f9-0e26-424c-a4a1-c64f9d571eb3');
  });
});

describe('create', () => {
  it('should create a patient', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        method: 'POST',
      })
      .reply(200, ({ body }) => body, {
        ...jsonHeaders,
      });

    const { data } = await execute(create('patient', state => state.patient))(
      state
    );
    expect(data.display).to.eql(testData.patient.display);
  });
  it('should throw an error if the resource is not found', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/wrong-resource',
        method: 'POST',
      })
      .reply(404, { error: 'Not Found' }, { ...jsonHeaders });

    try {
      await execute(create('wrong-resource'))(state);
    } catch (error) {
      expect(error.body.error).to.eql('Not Found');
    }
  });
  it('should expand references', async () => {
    const { patient } = testData;
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        method: 'POST',
      })
      .reply(
        200,
        ({ body }) => {
          expect(body).to.eql(JSON.stringify(patient));
          return body;
        },
        {
          ...jsonHeaders,
        }
      );

    await execute(create('patient', state => state.patient))(state);
  });
});

describe('upsert', () => {
  const existingUuid = 'abc';
  const nonExistingUuid = 'xyz';

  // set up fixtures to be shared by these tests
  testServer
    .intercept({
      path: `/ws/rest/v1/patient/${existingUuid}`,
      method: 'GET',
    })
    .reply(200, { ...testData.patientResults }, { ...jsonHeaders })
    .persist();

  testServer
    .intercept({
      path: `/ws/rest/v1/patient/${nonExistingUuid}`,
      method: 'GET',
    })
    .reply(404, {}, { ...jsonHeaders })
    .persist();

  testServer
    .intercept({
      path: `/ws/rest/v1/patient/${existingUuid}`,
      method: 'POST',
    })
    .reply(200, ({ body }) => body, {
      ...jsonHeaders,
    })
    .persist();

  testServer
    .intercept({
      path: `/ws/rest/v1/patient`,
      method: 'GET',
      query: {
        q: 'batman',
      },
    })
    .reply(404, { results: testData.patientResults }, { ...jsonHeaders })
    .persist();

  testServer
    .intercept({
      path: `/ws/rest/v1/patient`,
      method: 'GET',
      query: {
        q: 'spiderman',
      },
    })
    .reply(404, {}, { ...jsonHeaders })
    .persist();

  testServer
    .intercept({
      path: `/ws/rest/v1/patient`,
      method: 'POST',
    })
    .reply(200, ({ body }) => body, {
      ...jsonHeaders,
    })
    .persist();

  it('should update an existing patient', async () => {
    const result = await upsert(
      `patient/${existingUuid}`,
      state => state.patient
    )(state);

    expect(result.data.person.display).to.eql(testData.patient.person.display);
  });
  it('should create a new patient', async () => {
    const result = await upsert(
      `patient/${nonExistingUuid}`,
      state => state.patient
    )(state);

    expect(result.data.person.display).to.eql(testData.patient.person.display);
  });
  it('update an existing patient with a query', async () => {
    const result = await upsert('patient', state => state.patient, {
      q: 'batman',
    })(state);

    expect(result.data.person.display).to.eql(testData.patient.person.display);
  });
  it('create a new patient with a query', async () => {
    const result = await upsert('patient', state => state.patient, {
      q: 'spiderman',
    })(state);

    expect(result.data.person.display).to.eql(testData.patient.person.display);
  });
});

describe('destroy', () => {
  it('should delete an encounter by uuid', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/123',
        method: 'DELETE',
      })
      .reply(200, { uuid: '123', voided: true }, { ...jsonHeaders });

    const { data } = await execute(adaptor.destroy('/encounter/123'))(state);

    expect(data.uuid).to.eql('123');
  });

  it('should destroy a resource with options', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/456?purge=true',
        method: 'DELETE',
      })
      .reply(200, { uuid: '456', voided: false }, { ...jsonHeaders });

    const { data } = await execute(
      adaptor.destroy('/encounter/456', { purge: true })
    )(state);

    expect(data.uuid).to.eql('456');
  });

  it('should throw an error if the resource is not found', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/789',
        method: 'DELETE',
      })
      .reply(404, { error: 'Not Found' }, { ...jsonHeaders });

    try {
      await execute(adaptor.destroy('encounter/789'))(state);
    } catch (error) {
      expect(error.body.error).to.eql('Not Found');
    }
  });
});
