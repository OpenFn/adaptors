import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { execute, getFHIR, dataValue } from '../src/Adaptor.js';

import sampleResult from './fixtures/patient.js';

let testServer;

before(() => {
  testServer = enableMockClient('https://www.example.com');

  testServer
    .intercept({
      method: 'post',
      path: '/api/api_fhir_r4/login/',
      body: JSON.stringify({
        username: 'user',
        password: 'password',
      }),
    })
    .reply(
      200,
      { token: 'a.b.c' },
      { headers: { 'content-type': 'application/json' } }
    )
    .persist();
});

const stateWithAuth = {
  configuration: {
    baseUrl: 'https://www.example.com',
    username: 'user',
    password: 'password',
  },
};

describe('execute', () => {
  it('executes each operation in sequence', done => {
    const state = { ...stateWithAuth };
    const operations = [
      state => {
        return { ...state, counter: 1 };
      },
      state => {
        return { ...state, counter: 2 };
      },
      state => {
        return { ...state, counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState.counter).to.eql(3);
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    const state = { ...stateWithAuth };

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe('getFHIR', () => {
  it('includes a bearer token in headers', async () => {
    testServer
      .intercept({
        path: 'api/api_fhir_r4/Patient',
        headers: {
          Authorization: 'Bearer a.b.c',
        },
      })
      .reply(200, {});

    const state = { ...stateWithAuth };
    let err;
    try {
      await execute(getFHIR('Patient'))(state);
    } catch (e) {
      err = e;
    }
    expect(err).to.be.undefined;
  });

  it('removes auth token from state', async () => {
    const state = { ...stateWithAuth };
    const result = await execute(s => s)(state);

    expect(result.auth).to.be.undefined;
  });

  it('fetches patients', async () => {
    testServer
      .intercept({
        path: 'api/api_fhir_r4/Patient',
      })
      .reply(200, sampleResult, {
        headers: { 'content-type': 'application/json' },
      });

    const state = { ...stateWithAuth };
    const result = await execute(getFHIR('Patient'))(state);

    expect(result.data).to.eql(sampleResult);
  });
});
