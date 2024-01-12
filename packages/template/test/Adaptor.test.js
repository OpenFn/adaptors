import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { execute, create, dataValue } from '../src/Adaptor.js';

// This creates a mock client which acts like a fake server.
// It enables pattern-matching on the request object and custom responses
// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
const testServer = enableMockClient('https://fake.server.com');

describe('execute', () => {
  it('executes each operation in sequence', async () => {
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

    const finalState = await execute(...operations)(state);

    expect(finalState).to.eql({ counter: 3 });
  });

  it('assigns references and data to the initialState', async () => {
    const state = {};

    const finalState = await execute()(state);

    expect(finalState).to.eql({ references: [], data: null });
  });
});

describe('create', () => {
  it('makes a post request to the right endpoint', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/api/patients',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      // Set the reply from this endpoint
      // The body will be returned to state.data
      .reply(200, { id: 7, fullName: 'Mamadou', gender: 'M' });

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

  it('throws an error if the service returns 403', async () => {
    testServer
      .intercept({
        path: '/api/noAccess',
        method: 'POST',
      })
      .reply(403);

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

    expect(error.statusMessage).to.eql('Forbidden');
  });

  it('handles and throws mapped errors', async () => {
    testServer
      .intercept({
        path: '/api/blah',
        method: 'POST',
      })
      .reply(404);

    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await execute(create('blah', { name: 'taylor' }))(
      state
    ).catch(error => {
      return error;
    });

    expect(error.message).to.eql('Page not found');
  });
});
