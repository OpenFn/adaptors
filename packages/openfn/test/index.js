import { execute, request, get, post, fn } from '../src';
import { enableMockClient } from '@openfn/language-common/util';
import { expect, assert } from 'chai';

const jsonHeaders = { 'Content-Type': 'application/json' };

const testServer = enableMockClient('https://test.openfn.org');

describe('execute()', () => {
  it('executes each operation in sequence', () => {
    let state = {};
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

    return execute(...operations)(state).then(finalState => {
      expect(finalState).to.eql({ counter: 3 });
    });
  });

  it('assigns references, data to the initialState', done => {
    let state = {};

    execute()(state)
      .then(finalState => {
        expect(finalState).to.eql({
          references: [],
          data: null,
        });
      })
      .then(done)
      .catch(done);
  });
});

describe('request()', () => {
  it('should make a GET request with authentication', async () => {
    testServer
      .intercept({ path: '/api/jobs', method: 'GET' })
      .reply(200, [{ id: 1, name: 'test job' }], { headers: jsonHeaders });

    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        access_token: 'test-jwt-token',
      },
    };

    const result = await execute(request('GET', 'jobs'))(state);

    expect(result.data).to.eql([{ id: 1, name: 'test job' }]);
    expect(result.response.statusCode).to.eql(200);
    expect(result.response.method).to.eql('GET');
  });

  it('should make a POST request with body', async () => {
    let requestBody;
    testServer.intercept({ path: '/api/jobs', method: 'POST' }).reply(
      201,
      req => {
        requestBody = req.body;
        return { id: 2, name: 'new job' };
      },
      { headers: jsonHeaders }
    );

    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        access_token: 'test-jwt-token',
      },
    };

    const jobData = {
      name: 'new job',
      body: 'fn(state => state)',
    };

    const result = await execute(request('POST', 'jobs', { body: jobData }))(
      state
    );

    expect(result.data).to.eql({ id: 2, name: 'new job' });
    expect(result.response.statusCode).to.eql(201);
    expect(JSON.parse(requestBody)).to.eql(jobData);
  });

  it('should throw error if no JWT token', async () => {
    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        // No JWT token
      },
    };

    let error;
    try {
      await execute(request('GET', 'jobs'))(state);
    } catch (e) {
      error = e;
    }

    expect(error.message).to.include(
      'Missing JWT token. Please authenticate first.'
    );
  });

  it('should throw error if no host configuration', async () => {
    const state = {
      configuration: {
        access_token: 'test-jwt-token',
        // No host
      },
    };

    let error;
    try {
      await execute(request('GET', 'jobs'))(state);
    } catch (e) {
      error = e;
    }

    expect(error.message).to.include('Missing required configuration: host');
  });

  it('should include Authorization header', async () => {
    let requestHeaders;
    testServer.intercept({ path: '/api/jobs', method: 'GET' }).reply(
      200,
      req => {
        requestHeaders = req.headers;
        return [{ id: 1 }];
      },
      { headers: jsonHeaders }
    );

    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        access_token: 'test-jwt-token',
      },
    };

    await execute(request('GET', 'jobs'))(state);

    expect(requestHeaders.Authorization).to.eql('Bearer test-jwt-token');
  });

  it('should not override existing Authorization header', async () => {
    let requestHeaders;
    testServer.intercept({ path: '/api/jobs', method: 'GET' }).reply(
      200,
      req => {
        requestHeaders = req.headers;
        return [{ id: 1 }];
      },
      { headers: jsonHeaders }
    );

    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        access_token: 'test-jwt-token',
      },
    };

    await execute(
      request('GET', 'jobs', {
        headers: { Authorization: 'Bearer custom-token' },
      })
    )(state);

    expect(requestHeaders.Authorization).to.eql('Bearer custom-token');
  });
});

describe('get()', () => {
  it('should make a GET request', async () => {
    testServer
      .intercept({ path: '/api/jobs', method: 'GET' })
      .reply(200, [{ id: 1, name: 'test job' }], { headers: jsonHeaders });

    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        access_token: 'test-jwt-token',
      },
    };

    const result = await execute(get('jobs'))(state);

    expect(result.data).to.eql([{ id: 1, name: 'test job' }]);
    expect(result.response.method).to.eql('GET');
  });

  it('should include query parameters', async () => {
    testServer
      .intercept({ path: '/api/jobs?limit=10&offset=0', method: 'GET' })
      .reply(200, [{ id: 1 }], { headers: jsonHeaders });

    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        access_token: 'test-jwt-token',
      },
    };

    const result = await execute(
      get('jobs', {
        query: { limit: 10, offset: 0 },
      })
    )(state);

    expect(result.data).to.eql([{ id: 1 }]);
  });

  it('should include custom headers', async () => {
    let requestHeaders;
    testServer.intercept({ path: '/api/jobs', method: 'GET' }).reply(
      200,
      req => {
        requestHeaders = req.headers;
        return [{ id: 1 }];
      },
      { headers: jsonHeaders }
    );

    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        access_token: 'test-jwt-token',
      },
    };

    await execute(
      get('jobs', {
        headers: { 'x-custom': 'value' },
      })
    )(state);

    expect(requestHeaders['x-custom']).to.eql('value');
    expect(requestHeaders['Content-Type']).to.eql('application/json');
  });
});

describe('post()', () => {
  it('should make a POST request with data', async () => {
    let requestBody;
    testServer.intercept({ path: '/api/jobs', method: 'POST' }).reply(
      201,
      req => {
        requestBody = req.body;
        return { id: 2, name: 'new job' };
      },
      { headers: jsonHeaders }
    );

    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        access_token: 'test-jwt-token',
      },
    };

    const jobData = {
      name: 'new job',
      body: 'fn(state => state)',
    };

    const result = await execute(post('jobs', jobData))(state);

    expect(result.data).to.eql({ id: 2, name: 'new job' });
    expect(result.response.statusCode).to.eql(201);
    expect(JSON.parse(requestBody)).to.eql(jobData);
  });

  it('should include query parameters and headers', async () => {
    let requestData;
    testServer
      .intercept({ path: '/api/jobs?project=123', method: 'POST' })
      .reply(
        201,
        req => {
          requestData = {
            body: req.body,
            headers: req.headers,
          };
          return { id: 2 };
        },
        { headers: jsonHeaders }
      );

    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        access_token: 'test-jwt-token',
      },
    };

    const jobData = { name: 'test job' };

    await execute(
      post('jobs', jobData, {
        query: { project: 123 },
        headers: { 'x-custom': 'value' },
      })
    )(state);

    expect(JSON.parse(requestData.body)).to.eql(jobData);
    expect(requestData.headers['x-custom']).to.eql('value');
    expect(requestData.headers['Content-Type']).to.eql('application/json');
  });
});

describe('integration', () => {
  it('should authenticate and then make requests', async () => {
    testServer
      .intercept({ path: '/api/login', method: 'POST' })
      .reply(200, { access_token: 'test-jwt-token' });

    testServer
      .intercept({ path: '/api/jobs', method: 'GET' })
      .reply(200, [{ id: 1, name: 'test job' }], { headers: jsonHeaders });

    const state = {
      configuration: {
        host: 'https://test.openfn.org',
        username: 'test@example.com',
        password: 'password123',
      },
    };

    const result = await execute(get('jobs'))(state);

    expect(result.configuration.jwt).to.eql('test-jwt-token');
    expect(result.data).to.eql([{ id: 1, name: 'test job' }]);
  });

  it('should preserve state and references', async () => {
    testServer
      .intercept({ path: '/api/login', method: 'POST' })
      .reply(200, { access_token: 'test-jwt-token' });

    testServer
      .intercept({ path: '/api/jobs', method: 'GET' })
      .reply(200, [{ id: 1 }], { headers: jsonHeaders });

    const state = {
      counter: 0,
      configuration: {
        host: 'https://test.openfn.org',
        username: 'test@example.com',
        password: 'password123',
      },
      data: { triggering: 'event' },
    };

    const result = await execute(
      fn(state => {
        state.counter += 1;
        return state;
      }),
      get('jobs'),
      fn(state => {
        state.counter += 1;
        return state;
      })
    )(state);

    expect(result.counter).to.eql(2);
    expect(result.configuration.jwt).to.eql('test-jwt-token');
    expect(result.data).to.eql([{ id: 1 }]);
    expect(result.references).to.eql([{ triggering: 'event' }]);
  });
});
