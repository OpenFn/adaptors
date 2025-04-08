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
  it('should get an encounter by uuid', async () => {
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
  it('should update a patient', async () => {
    testServer
      .intercept({
        path: `/ws/rest/v1/patient/${testData.patient.uuid}`,
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

    const result = await upsert(
      `patient/${testData.patient.uuid}`,
      state => state.patient
    )(state);

    expect(result.data.person.display).to.eql(testData.patient.person.display);
  });
  it('should create a patient', async () => {
    testServer
      .intercept({
        path: `/ws/rest/v1/patient/${testData.patient.uuid}`,
        method: 'GET',
      })
      .reply(200, { results: [] }, { ...jsonHeaders });

    testServer
      .intercept({
        path: `/ws/rest/v1/patient`,
        method: 'POST',
      })
      .reply(200, ({ body }) => body, {
        ...jsonHeaders,
      });

    const result = await upsert(
      `patient/${testData.patient.uuid}`,
      state => state.patient
    )(state);

    expect(result.data.person.display).to.eql(testData.patient.person.display);
  });
});

describe('delete', () => {
  it('should delete an encounter by uuid', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/123',
        method: 'DELETE',
      })
      .reply(200, { uuid: '123', voided: true }, { ...jsonHeaders });

    const { data } = await execute(adaptor.delete('/encounter/123'))(state);

    expect(data.uuid).to.eql('123');
  });

  it('should delete a resource with options', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/encounter/456?purge=true',
        method: 'DELETE',
      })
      .reply(200, { uuid: '456', voided: false }, { ...jsonHeaders });

    const { data } = await execute(
      adaptor.delete('/encounter/456', { purge: true })
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
      await execute(adaptor.delete('encounter/789'))(state);
    } catch (error) {
      expect(error.body.error).to.eql('Not Found');
    }
  });
});
