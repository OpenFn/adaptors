import { expect } from 'chai';

import { request } from '../src/Adaptor.js';
import { enableMockClient } from '../src/Utils';

const client = enableMockClient('https://us11.api.mailchimp.com');

import Adaptor from '../src';
const { execute, post } = Adaptor;

const apiToken = apiKey =>
  Buffer.from(`openfn:${apiKey}`, 'utf-8').toString('base64');

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {
      configuration: {
        apiKey: 'somEThINGkeyish',
        server: 'us11',
      },
    };
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
    let state = {
      configuration: {
        apiKey: 'somEThINGkeyish',
        server: 'us11',
      },
    };

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ ...state, references: [], data: null });
    });
  });
});

describe('post', () => {
  it('calls the callback', async () => {
    let state = {
      configuration: {
        apiKey: '00bba-us11',
        server: 'us11',
      },
    };

    client
      .intercept({
        path: '/3.0/account-exports',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${apiToken(state.configuration.apiKey)}`,
        },
      })
      .reply(200, { foo: 'bar' });

    return execute(
      post(
        '/account-exports',
        {
          include_stages: [],
        },
        {},
        state => {
          let responseBody = state.data;
          // Check that the post made it's way to the request as a string.
          expect(responseBody).to.eql({ foo: 'bar' });
        }
      )
    )(state);
  });
});

describe('get', () => {
  it('should send a get request', async () => {
    const state = {
      references: [],
      configuration: {
        apiKey: '00bba-us11',
        server: 'us11',
      },
    };

    client
      .intercept({
        path: '/3.0/',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${apiToken(state.configuration.apiKey)}`,
        },
      })
      .reply(200, {
        account_name: 'Open Function Group',
        email: 'taylor@openfn.org',
      });

    const finalState = await execute(request('GET', '/'))(state);

    expect(finalState.data).to.eql({
      account_name: 'Open Function Group',
      email: 'taylor@openfn.org',
    });
  });
});

describe('request', () => {
  it('should return state with data and response', async () => {
    const state = {
      references: [],
      configuration: {
        apiKey: '00bba-us11',
        server: 'us11',
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${apiToken(state.configuration.apiKey)}`,
    };
    client
      .intercept({
        path: '/3.0/',
        method: 'GET',
        headers,
      })
      .reply(200, {});

    const finalState = await execute(request('GET', '/'))(state);

    expect(finalState).to.eql({
      ...state,
      data: {},
      response: {
        statusCode: 200,
        headers: {},
        body: {},
      },
    });
  });
  it('should expand argument references', async () => {
    const operationFixture = [
      {
        method: 'POST',
        path: '/lists/abdc123/members/test@openfn.org/tags',
        operation_id: 'test@openfn.org',
        body: '{}',
      },
    ];
    const state = {
      references: [],
      configuration: {
        apiKey: '00bba-us11',
        server: 'us11',
      },
      operations: operationFixture,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${apiToken(state.configuration.apiKey)}`,
    };
    client
      .intercept({
        path: '/3.0/batches',
        method: 'POST',
        headers,
        data: operationFixture,
      })
      .reply(200, r => {
        expect(r.body).to.eql(JSON.stringify(operationFixture));
        expect(r.headers).to.eql(headers);
        return r;
      });

    await execute(
      request('POST', '/batches', state => ({
        body: state.operations,
      }))
    )(state);
  });

  it('should throw 401', async () => {
    const state = {
      references: [],
      configuration: {
        apiKey: 'invalidKey-us11',
        server: 'us11',
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${apiToken(state.configuration.apiKey)}`,
    };
    client
      .intercept({
        path: '/3.0/',
        method: 'GET',
        headers,
      })
      .reply(401, {
        type: 'https://mailchimp.com/developer/marketing/docs/errors/',
        title: 'API Key Invalid',
        status: 401,
        detail: 'API key has been disabled',
        instance: '82e67146-6d11-9301-ffa1-893f2918013a',
      });

    await execute(request('GET', '/'))(state).catch(error => {
      expect(error.type).to.eql(
        'https://mailchimp.com/developer/marketing/docs/errors/'
      );
      expect(error.status).to.eql(401);
      expect(error.detail).to.eql('API key has been disabled');
    });
  });

  it('should handle 204 (no body)', async () => {
    const state = {
      references: [],
      configuration: {},
    };

    client
      .intercept({
        path: '/3.0/',
        method: 'GET',
      })
      .reply(204);

    const result = await execute(request('GET', '/'))(state);

    expect(result.data).to.eql({});
    expect(result.response).to.eql({
      statusCode: 204,
      headers: {},
      body: {},
    });
  });

  it('should throw 400', async () => {
    const state = {
      references: [],
      configuration: {},
    };

    const err = {
      title: 'Member Exists',
      status: 400,
      detail:
        'blah@gmail.com is already a list member. Use PUT to insert or update list members.',
      instance: 'f12345624-4c60-1821-c58e-a1082e8fda58',
    };

    client
      .intercept({
        path: '/3.0/lists/blah',
        method: 'POST',
      })
      .reply(404, err);

    let error;
    await execute(request('POST', '/lists/blah'))(state).catch(e => {
      error = e;
    });

    expect(error.title).to.eql(err.title);
    expect(error.status).to.eql(err.status);
    expect(error.detail).to.eql(err.detail);
    expect(error.instance).to.eql(err.instance);
  });

  it('should include method, path and headers', async () => {
    const state = {
      references: [],
      configuration: {
        apiKey: '00bba-us11',
        server: 'us11',
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${apiToken(state.configuration.apiKey)}`,
    };
    client
      .intercept({
        path: '/3.0/',
        method: 'GET',
        headers,
      })
      .reply(200, r => {
        expect(r.method).to.eql('GET');
        expect(r.path).to.eql('/3.0/');
        expect(r.headers).to.eql(headers);
        return r;
      });

    await execute(request('GET', '/'))(state);
  });
});
