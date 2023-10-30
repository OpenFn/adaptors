import { expect } from 'chai';
import { execute, create, dataValue, request } from '../src/Adaptor.js';

import { enableMockClient } from '@openfn/language-common/util';

const testServer = enableMockClient('https://www.example.com');

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

describe('request', () => {
  it('should makea get request', async () => {
    testServer
      .intercept({
        path: '/api/patients',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(
        200,
        { id: 7, fullName: 'Mamadou', gender: 'M' },
        {
          headers: { 'content-type': 'application/json' },
        }
      );
    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await execute(request('GET', 'api/patients'))(state);

    expect(finalState.data).to.eql({
      fullName: 'Mamadou',
      gender: 'M',
      id: 7,
    });
  });
});

describe('create', () => {
  it('makes a post request to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/api/patients',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(
        200,
        { id: 7, fullName: 'Mamadou', gender: 'M' },
        {
          headers: { 'content-type': 'application/json' },
        }
      );
    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
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
    testServer
      .intercept({
        path: '/api/noAccess',
        method: 'POST',
      })
      .reply(
        404,
        {
          message: 'Not found',
          status: 'error',
          code: 404,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );
    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await execute(create('noAccess', { name: 'taylor' }))(
      state
    ).catch(error => {
      return error;
    });

    expect(error.message).to.eql('POST /api/noAccess - 404 Not Found');
  });

  it('handles and throws different kinds of errors', async () => {
    testServer
      .intercept({
        path: '/api/server-error',
        method: 'POST',
      })
      .reply(
        500,
        {
          message: 'Server error',
          status: 'error',
          code: 500,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );
    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await execute(create('server-error', { name: 'taylor' }))(
      state
    ).catch(error => {
      return error;
    });

    expect(error.message).to.eql(
      'POST /api/server-error - 500 Internal Server Error'
    );
  });
});
