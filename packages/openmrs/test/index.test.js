import { enableMockClient } from '@openfn/language-common/util';
import { expect } from 'chai';
import { request } from '../src/Utils';
import testData from './fixtures.json' assert { type: 'json' };

import {
  get,
  post,
  create,
  upsert,
  execute,
  getPatient,
  searchPerson,
  searchPatient,
} from '../src';

const testServer = enableMockClient('https://fn.openmrs.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  instanceUrl: 'https://fn.openmrs.org',
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

describe('request', () => {
  it('should GET with a query', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah 1' },
        method: 'GET',
      })
      .reply(200, { results: [{ display: 'Sarah 1' }] }, { ...jsonHeaders });
    const state = { configuration };

    const { body } = await request(
      state,
      'GET',
      '/ws/rest/v1/patient',
      {},
      { q: 'Sarah 1' }
    );

    expect(body.results[0].display).to.eql('Sarah 1');
  });
  it('should auto-fetch patients with a limit', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah', limit: 1 },
        method: 'GET',
      })
      .reply(
        200,
        {
          results: [{ display: 'Sarah 1' }],
          links: [
            {
              rel: 'next',
              uri: 'https://fn.openmrs.org/ws/rest/v1/patient?q=Sarah&limit=1&startIndex=1',
              resourceAlias: null,
            },
          ],
        },
        { ...jsonHeaders }
      );
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah', limit: 1, startIndex: 1 },
        method: 'GET',
      })
      .reply(
        200,
        {
          results: [{ display: 'Sarah 2' }],
        },
        { ...jsonHeaders }
      );

    const state = { configuration };
    const { body } = await request(
      state,
      'GET',
      '/ws/rest/v1/patient',
      {},
      { q: 'Sarah', limit: 1 }
    );
    expect(body.results[0].display).to.eql('Sarah 1');
    expect(body.results[1].display).to.eql('Sarah 2');
  });

  it('should not auto-fetch if the user sets startIdex', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah', limit: 1 },
        method: 'GET',
      })
      .reply(
        200,
        {
          results: [{ display: 'Sarah 1' }],
          links: [
            {
              rel: 'next',
              uri: 'https://fn.openmrs.org/ws/rest/v1/patient?q=Sarah&limit=1&startIndex=1',
              resourceAlias: null,
            },
          ],
        },
        { ...jsonHeaders }
      );
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah', limit: 1, startIndex: 1 },
        method: 'GET',
      })
      .reply(
        200,
        {
          results: [{ display: 'Sarah 2' }],
        },
        { ...jsonHeaders }
      );

    const state = { configuration };
    const { body } = await request(
      state,
      'GET',
      '/ws/rest/v1/patient',
      {},
      { q: 'Sarah', limit: 1, startIndex: 1 }
    );

    expect(body.results[0].display).to.eql('Sarah 2');
    expect(body.results.length).to.eql(1);
  });
});

describe('get', () => {
  it('should get an encounter by uuid', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/123',
        method: 'GET',
      })
      .reply(200, { uuid: '123' }, { ...jsonHeaders });

    const state = { configuration };
    const { data } = await execute(get('encounter/123'))(state);

    expect(data.uuid).to.eql('123');
  });
});

describe('post', () => {
  it('should post an encounter', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter',
        method: 'POST',
      })
      .reply(200, ({ body }) => body, {
        ...jsonHeaders,
      });

    const { encounter } = testData;
    const state = { configuration, encounter };
    const { data } = await execute(post('encounter', state => state.encounter))(
      state
    );

    expect(data.patient).to.eql('1fdaa696-e759-4a7d-a066-f1ae557c151b');
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

    const { patient } = testData;
    const state = { configuration, patient };
    const { data } = await execute(create('patient', state => state.patient))(
      state
    );

    expect(data).to.eql(patient);
  });
  it('should throw an error if the resource is not found', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/wrong-resource',
        method: 'POST',
      })
      .reply(404, { error: 'Not Found' }, { ...jsonHeaders });

    const state = { configuration };
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

    const state = { configuration, patient };
    await execute(create('patient', state => state.patient))(state);
  });
});

describe('getPatient', () => {
  it('should get a patient by uuid', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient/b52ec6f9-0e26-424c-a4a1-c64f9d571eb3',
        method: 'GET',
      })
      .reply(
        200,
        { uuid: 'b52ec6f9-0e26-424c-a4a1-c64f9d571eb3' },
        { ...jsonHeaders }
      );

    const state = { configuration };
    const { data } = await execute(
      getPatient('b52ec6f9-0e26-424c-a4a1-c64f9d571eb3')
    )(state);

    expect(data.uuid).to.eql('b52ec6f9-0e26-424c-a4a1-c64f9d571eb3');
  });
});

describe('searchPerson', () => {
  it('should search for a person', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/person?q=Sarah',
        method: 'GET',
      })
      .reply(200, { results: [{ display: 'Sarah' }] }, { ...jsonHeaders });
    const state = { configuration };

    const { data } = await execute(
      searchPerson({
        q: 'Sarah',
      })
    )(state);

    expect(data.results[0].display).to.eql('Sarah');
  });
});

describe('searchPatient', () => {
  it('should search for a patient', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient?q=Sarah',
        method: 'GET',
      })
      .reply(200, { results: [{ display: 'Sarah' }] }, { ...jsonHeaders });

    const state = { configuration };
    const { data } = await execute(
      searchPatient({
        q: 'Sarah',
      })
    )(state);

    expect(data.results[0].display).to.eql('Sarah');
  });
});

describe('upsert', () => {
  it.skip('should update a patient', async () => {
    testServer
      .intercept({
        path: `/ws/rest/v1/patient`,
        query: { q: testData.patient.display },
        method: 'GET',
      })
      .reply(200, { results: testData.patientResults }, { ...jsonHeaders });

    testServer
      .intercept({
        path: `/ws/rest/v1/patient/${testData.patient.uuid}`,
        method: 'POST',
      })
      .reply(200, ({ body }) => body, {
        ...jsonHeaders,
      });

    const state = {
      configuration,
      patient: testData.patient,
    };

    const result = await upsert(
      'patient',
      state => ({
        q: state.patient.person.display,
      }),
      state => state.patient
    )(state);

    console.log(result);

    // expect(result.results[0].display).to.eql('Sarah');
  });
});
