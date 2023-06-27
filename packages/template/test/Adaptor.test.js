import { expect } from 'chai';
// import { execute, create, dataValue } from '../src/Adaptor.js';
import * as Adaptor from '../src/Adaptor.js';
import execute from '@openfn/test-execute';

import MockAgent from './mockAgent.js';
import { setGlobalDispatcher } from 'undici';

setGlobalDispatcher(MockAgent);

describe('execute', () => {
  it('executes each operation in sequence', async () => {
    const job = `
      fn(() => ({ counter: 1 }))
      fn(() => ({ counter: 2 }))
      fn(() => ({ counter: 3 }))
    `

    const finalState = await execute(job, Adaptor)
    expect(finalState).to.eql({ counter: 3 });
  });

  it('assigns references, data to the initialState', async() => {
    const job = `fn(s => s)`;
    const finalState = await execute(job, Adaptor)
    // TODO data: [null] should be data: null... this is a quirk of the runtime which
    // needs investigating
    expect(finalState).to.eql({ references: [], data: [null] });
  });
});

describe.skip('create', () => {
  it('makes a post request to the right endpoint', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await execute(
      create('patients', {
        name: dataValue('fullName')(state),
        gender: dataValue('gender')(state),
      })
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
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
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
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await execute(
      create('!@#$%^&*', { name: 'taylor' })
    )(state).catch(error => {
      return error;
    });
    
    expect(error.message).to.eql('Server error');
  });
});
