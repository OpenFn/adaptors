import { expect } from 'chai';
import { execute, create, get, getClaim } from '../src/Adaptor.js';
import { fixtures } from './ClientFixtures';

import MockAgent from './mockAgent.js';
import { setGlobalDispatcher } from 'undici';

setGlobalDispatcher(MockAgent);

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

describe.skip('create', () => {
  it('should create a Bundle in FHIR store', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://hapi.fhir.org',
        apiPath: 'baseR4',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await execute(
      create('Bundle', state => ({ ...state.data, type: 'collection' }))
    )(state);

    expect(finalState.data).to.eql({
      fullName: 'Mamadou',
      gender: 'M',
      id: 7,
    });
  });

  it('throws an error for a 404', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://hapi.fhir.org',
        apiPath: 'baseR4',
      },
    };

    const error = await execute(create('noAccess', { name: 'taylor' }))(
      state
    ).catch(error => {
      return error;
    });

    expect(error.message).to.eql('Page not found');
  });

  it('handles and throws different kinds of errors', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://hapi.fhir.org',
        apiPath: 'baseR4',
      },
    };

    const error = await execute(create('!@#$%^&*', { name: 'taylor' }))(
      state
    ).catch(error => {
      return error;
    });

    expect(error.message).to.eql('Server error');
  });
});

describe('get', () => {
  it('should get patient resource bundle', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://hapi.fhir.org',
        apiPath: 'baseR4',
      },
    };

    const finalState = await execute(
      get('Patient', { _count: 1, _pretty: true })
    )(state);

    expect(finalState.data).to.eql(fixtures.patientBundle);
  });
  it('should get patient resource by id', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://hapi.fhir.org',
        apiPath: 'baseR4',
      },
    };

    const finalState = await execute(get('Patient/592442'))(state);

    expect(finalState.data).to.eql(fixtures.patient);
  });
  it.skip('should throw for invalid patient id');
});

describe.skip('getClaim', () => {
  it('should get claim');
});
