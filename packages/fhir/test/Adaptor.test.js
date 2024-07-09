import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import {
  execute,
  create,
  get,
  post,
  getClaim,
  createTransactionBundle,
} from '../src/Adaptor.js';
import { fixtures } from './ClientFixtures';

import MockAgent from './mockAgent.js';
import { setGlobalDispatcher } from 'undici';

// setGlobalDispatcher(MockAgent);
const apiPath = 'baseR4';
const baseUrl = 'https://hapi.fhir.org';
const testServer = enableMockClient(baseUrl);

const configuration = {
  baseUrl,
  apiPath,
};

describe('execute', () => {
  it('executes each operation in sequence', done => {
    const state = {};
    const operations = [
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
    const state = {};

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe('create', () => {
  it('should create a Bundle in FHIR store', async () => {
    testServer
      .intercept({
        path: 'baseR4/Bundle',
        method: 'POST',
      })
      .reply(200, fixtures.patientBundleCreateResponse);
    const state = {
      configuration,
      data: fixtures.patientBundle,
    };

    const finalState = await execute(
      create('Bundle', state => ({ ...state.data, type: 'collection' }))
    )(state);

    expect(finalState.data).to.eql(fixtures.patientBundleCreateResponse);
  });

  it.skip('throws an error for a 404', async () => {
    testServer
      .intercept({
        path: 'baseR4/noAccess',
        method: 'POST',
      })
      .reply(404, fixtures.noAccessResponse);

    const state = {
      configuration,
    };

    let e;
    const finalState = await execute(create('noAccess', { name: 'taylor' }))(
      state
    ).catch(err => {
      e = err;
    });

    expect(e.message).to.contain('Message: Not Found');
    expect(finalState).to.eql(undefined);
  });
});

describe('createTransactionBundle', () => {
  it('should create a Bundle in FHIR store', async () => {
    testServer
      .intercept({
        path: '/baseR4/',
        method: 'POST',
      })
      .reply(200, fixtures.patientTransactionBundleResponse);

    const state = {
      configuration,
      data: fixtures.patientTransactionBundle,
    };

    const finalState = await execute(
      createTransactionBundle(state => state.data)
    )(state);

    expect(finalState.data).to.eql(fixtures.patientTransactionBundleResponse);
  });
});

describe('get', () => {
  it('should get patient resource bundle', async () => {
    testServer
      .intercept({
        path: '/baseR4/Patient',
        method: 'GET',
      })
      .reply(200, fixtures.patientBundle);

    const state = { configuration };

    const finalState = await execute(get('Patient'))(state);

    expect(finalState.data).to.eql(fixtures.patientBundle);
  });

  it('should get patient resource bundle with params', async () => {
    testServer
      .intercept({
        path: '/baseR4/Patient',
        query: {
          _count: 1,
          _pretty: true,
        },
        method: 'GET',
      })
      .reply(200, fixtures.patientBundle);

    const state = { configuration };

    const finalState = await execute(
      get('Patient', { _count: 1, _pretty: true })
    )(state);

    expect(finalState.data).to.eql(fixtures.patientBundle);
  });

  it('should get patient resource by id', async () => {
    testServer
      .intercept({
        path: '/baseR4/Patient/592442',
        method: 'GET',
      })
      .reply(200, fixtures.patient);
    const state = { configuration };

    const finalState = await execute(get('Patient/592442'))(state);

    expect(finalState.data).to.eql(fixtures.patient);
  });

  it.skip('should throw for invalid patient id', async () => {
    testServer
      .intercept({
        path: '/baseR4/Patient/invalid-patient-id',
        method: 'GET',
      })
      .reply(404, fixtures.invalidPatient);
    const state = { configuration };

    const finalState = await execute(get('Patient/invalid-patient-id'))(state);

    expect(finalState.data).to.eql(fixtures.invalidPatient);
  });
});

describe('getClaim', () => {
  it('should get claim resource bundle', async () => {
    testServer
      .intercept({
        path: '/baseR4/Claim',
        method: 'GET',
      })
      .reply(200, fixtures.claimBundle);

    const state = { configuration };

    const finalState = await execute(getClaim())(state);

    expect(finalState.data).to.eql(fixtures.claimBundle);
  });

  it('should get claim by id', async () => {
    testServer
      .intercept({
        path: '/baseR4/Claim/49023',
        method: 'GET',
      })
      .reply(200, fixtures.claim);

    const state = {
      configuration,
    };

    const finalState = await execute(getClaim('49023'))(state);

    expect(finalState.data).to.eql(fixtures.claim);
  });
});
