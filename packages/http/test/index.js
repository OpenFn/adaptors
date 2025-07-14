import { execute, request, get, post, put, patch, del, fn } from '../src';
import { enableMockClient } from '@openfn/language-common/util';
import { expect, assert } from 'chai';
import { getTLSOptions } from '../src/util';

const jsonHeaders = { 'Content-Type': 'application/json' };

const testServer = enableMockClient('https://www.example.com', {
  defaultContentType: 'text',
});

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
  it('should get a string', async () => {
    testServer.intercept({ path: '/greeting' }).reply(200, 'hello');

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
      },
    };

    const result = await execute(request('GET', '/greeting'))(state);

    expect(result.data).to.eql('hello');
  });

  it('should throw if no baseUrl is set and no url is provided', async () => {
    const state = {
      configuration: null,
    };
    let err;
    try {
      await execute(request('GET'))(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.eql('NO_URL');
    expect(err.description).to.not.be.undefined;
  });
  it('should pass if baseUrl is not set and url is absolute', async () => {
    testServer.intercept({ path: '/greeting' }).reply(200, 'hello');

    const state = {
      configuration: null,
    };
    const result = await execute(
      request('GET', 'https://www.example.com/greeting')
    )(state);
    expect(result.data).to.eql('hello');
  });
  it('should throw if baseUrl is not set and url is relative', async () => {
    const state = {
      configuration: null,
    };
    let err;
    try {
      await execute(request('GET', 'greeting'))(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.eql('UNEXPECTED_RELATIVE_URL');
    expect(err.description).to.not.be.undefined;
  });

  it('should throw if url is absolute and does not match baseUrl', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
      },
    };

    let err;
    try {
      await execute(request('GET', 'https://www.something.net/greeting'))(
        state
      );
    } catch (e) {
      err = e;
    }

    expect(err.code).to.eql('BASE_URL_MISMATCH');
  });

  it('should accept parseAs to force parsed content', async () => {
    testServer
      .intercept({ path: '/json' })
      .reply(
        200,
        {},
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .times(2);

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
      },
    };

    // get json by default
    const result1 = await execute(request('GET', '/json'))(state);
    expect(result1.data).to.eql({});

    // force string
    const result2 = await execute(request('GET', '/json', { parseAs: 'text' }))(
      state
    );

    expect(result2.data).to.eql('{}');
  });
});

describe('get()', () => {
  it('should get a string', async () => {
    testServer.intercept({ path: '/greeting' }).reply(200, 'hello');

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
      },
    };

    const result = await execute(get('/greeting'))(state);

    expect(result.data).to.eql('hello');
  });

  it('should get JSON from a path', async () => {
    testServer
      .intercept({ path: '/json' })
      .reply(200, JSON.stringify({ x: 23 }), {
        headers: { 'Content-Type': 'application/json' },
      });

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
      },
    };

    const result = await execute(get('/json'))(state);

    expect(result.data).to.eql({ x: 23 });
  });

  it('should interpret a response as json with parseAs', async () => {
    testServer
      .intercept({ path: '/json' })
      .reply(200, JSON.stringify({ x: 23 }));

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
      },
    };

    const result = await execute(get('/json', { parseAs: 'json' }))(state);

    expect(result.data).to.eql({ x: 23 });
  });

  it('should get JSON from a full url', async () => {
    testServer
      .intercept({ path: '/json' })
      .reply(200, JSON.stringify({ x: 24 }), {
        headers: { 'Content-Type': 'application/json' },
      });

    const state = {};

    const result = await execute(get('https://www.example.com/json'))(state);

    expect(result.data).to.eql({ x: 24 });
  });

  it('should get JSON as a string if parseAs is set', async () => {
    const jsonstring = JSON.stringify({ x: 23 });
    testServer.intercept({ path: '/json' }).reply(200, jsonstring, {
      headers: { 'Content-Type': 'application/json' },
    });

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
      },
    };

    const result = await execute(get('/json', { parseAs: 'text' }))(state);

    expect(result.data).to.eql(jsonstring);
  });

  it('should write the response to state', async () => {
    testServer
      .intercept({ path: '/json' })
      .reply(201, JSON.stringify({ x: 31 }), {
        headers: jsonHeaders,
      });

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
      },
    };

    const result = await execute(get('/json'))(state);

    const { response } = result;
    const { duration, ...responseWithoutDuration } = response;
    expect(responseWithoutDuration).to.eql({
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      statusCode: 201,
      statusMessage: 'Created',
      url: 'https://www.example.com/json',
    });
    assert.isNumber(duration);
    assert.isAtLeast(duration, 0);
  });

  it('preserves state and writes to references', async () => {
    testServer
      .intercept({
        path: '/api/fake',
        method: 'GET',
      })
      .reply(
        200,
        {
          body: 'response',
        },
        {
          headers: jsonHeaders,
        }
      );

    const state = {
      counter: 0,
      configuration: {
        baseUrl: 'https://www.example.com',
      },
      data: {
        triggering: 'event',
      },
    };

    const result = await execute(
      fn(state => {
        state.counter += 1;
        return state;
      }),
      get('/api/fake', {}),
      fn(state => {
        state.counter += 1;
        return state;
      })
    )(state);

    const { data, references, counter, response } = result;
    expect(response).to.exist;
    expect(data).to.eql({ body: 'response' });
    expect(references).to.eql([{ triggering: 'event' }]);
    expect(counter).to.eql(2);
  });

  it('sends headers with the request', async () => {
    testServer
      .intercept({
        path: '/api/showMeMyHeaders',
        method: 'GET',
      })
      .reply(200, req => req.headers, { headers: jsonHeaders });

    const state = {
      data: { triggering: 'event' },
    };

    const { data } = await execute(
      get('https://www.example.com/api/showMeMyHeaders', {
        headers: { 'x-openfn': 'testing' },
      })
    )(state);
    expect(data).to.eql({
      'x-openfn': 'testing',
      'Content-Type': 'application/json',
    });
  });

  it('sets up a basic auth header', async () => {
    testServer
      .intercept({
        path: '/api/private',
        method: 'GET',
      })
      .reply(200, req => req.headers, { headers: jsonHeaders });

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
        username: 'hello',
        password: 'there',
      },
    };

    const { data } = await execute(get('/api/private'))(state);

    expect(data.Authorization).to.eql('Basic aGVsbG86dGhlcmU=');
  });

  it('sets up an oauth/token header', async () => {
    testServer
      .intercept({
        path: '/api/private',
        method: 'GET',
      })
      .reply(200, req => req.headers, { headers: jsonHeaders });

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
        access_token: '00QCjAl4MlV-WPX',
      },
    };

    const { data } = await execute(get('/api/private'))(state);

    expect(data.Authorization).to.eql('Bearer 00QCjAl4MlV-WPX');
  });

  it('does not override the Authorization header', async () => {
    testServer
      .intercept({
        path: '/api/auth',
        method: 'GET',
      })
      .reply(200, req => req.headers, { headers: jsonHeaders });

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
        username: 'hello',
        password: 'there',
      },
    };

    const { data } = await execute(
      get('/api/auth', { headers: { Authorization: 'Bearer abc' } })
    )(state);

    expect(data.Authorization).to.eql('Bearer abc');
  });

  it('allows query strings to be set', async () => {
    testServer
      .intercept({
        path: '/api/by-id?id=1',
        method: 'GET',
      })
      .reply(
        200,
        { ok: true },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

    const state = {
      configuration: {},
    };

    const { data } = await execute(
      get('https://www.example.com/api/by-id', { query: { id: 1 } })
    )(state);

    expect(data).eql({ ok: true });
  });

  it('should throw for a 404 response', async () => {
    testServer
      .intercept({
        path: '/api/404',
        method: 'GET',
      })
      .reply(404);

    const state = {
      configuration: {},
      data: {},
    };

    let error;

    try {
      await execute(get('https://www.example.com/api/404'))(state);
    } catch (e) {
      error = e;
    }

    const { statusCode, url, method, duration, name } = error;
    expect({
      statusCode,
      url,
      method,
      name,
    }).to.eql({
      name: 'Error',
      statusCode: 404,
      url: 'https://www.example.com/api/404',
      method: 'GET',
    });

    assert.isNumber(duration);
  });

  it('should suppress 404 errors through the error map', async () => {
    testServer
      .intercept({
        path: '/api/404',
        method: 'GET',
      })
      .reply(404);

    const state = {
      configuration: {},
      data: {},
    };

    const { response } = await execute(
      get('https://www.example.com/api/404', {
        errors: { 404: false },
      })
    )(state);

    expect(response.statusCode).to.eql(404);
  });
});

describe('contentType', () => {
  it('should prefer contentType option to content-type header', async () => {
    let req;
    testServer
      .intercept({
        path: '/api/fake-json',
        method: 'POST',
      })
      .reply(200, r => {
        req = r;
        return { id: 1, name: 'a', age: 42 };
      });
    const state = {
      configuration: {},
    };

    const response = await execute(
      post(
        'https://www.example.com/api/fake-json',
        { name: 'a', age: 42 },
        { headers: { 'Content-Type': 'application/json' }, contentType: 'form' }
      )
    )(state);

    expect(req.body instanceof FormData).to.equal(true);
    expect(JSON.parse(response.data).id).to.eql(1);
  });

  it('should handle invalid contentType and default to application/json', async () => {
    let req;
    testServer
      .intercept({
        path: '/api/fake-json',
        method: 'POST',
      })
      .reply(200, r => {
        req = r;
        return { id: 1, name: 'a', age: 42 };
      });
    const state = {
      configuration: {},
    };

    const response = await execute(
      post(
        'https://www.example.com/api/fake-json',
        { name: 'a', age: 42 },
        { contentType: 'file' }
      )
    )(state);

    expect(req.body).to.equal(JSON.stringify({ name: 'a', age: 42 }));
    expect(JSON.parse(response.data).id).to.eql(1);
    expect(req.headers['Content-Type']).to.equal('application/json');
  });

  it('should use content-type header when given', async () => {
    let req;
    testServer
      .intercept({
        path: '/api/fake-json',
        method: 'POST',
      })
      .reply(200, r => {
        req = r;
        return { id: 1, name: 'a', age: 42 };
      });
    const state = {
      configuration: {},
    };

    const response = await execute(
      post(
        'https://www.example.com/api/fake-json',
        { name: 'a', age: 42 },
        { headers: { 'Content-Type': 'application/json' } }
      )
    )(state);

    expect(req.body).to.equal(JSON.stringify({ name: 'a', age: 42 }));
    expect(JSON.parse(response.data).id).to.eql(1);
    expect(req.headers['Content-Type']).to.equal('application/json');
  });
});

describe('post', () => {
  it('post a JSON object', async () => {
    let req;

    testServer
      .intercept({
        path: '/api/json',
        method: 'POST',
      })
      .reply(200, r => {
        req = r;
        return 'ok';
      });

    const state = {};

    await execute(
      post('https://www.example.com/api/json', { name: 'tony stark', age: 24 })
    )(state);

    expect(req.body).to.equal(JSON.stringify({ name: 'tony stark', age: 24 }));
  });

  it('should send plain jSON as formdata', async () => {
    let form;
    let entries = [];
    testServer
      .intercept({
        path: '/api/form-data',
        method: 'POST',
      })
      .reply(200, res => {
        // What we receive in the mock should be formdata
        // note that we should also have a bunch of headers,
        // but they seem to be missing
        form = res.body;
        for (const [key, value] of form.entries()) {
          entries.push({ [key]: value });
        }
        return 'ok';
      });

    let formData = {
      id: 'fake_id',
      parent: 'fake_parent',
      mobile_phone: 'fake_phone',
    };

    const { data } = await execute(
      post('https://www.example.com/api/form-data', formData, {
        contentType: 'form',
      })
    )({});

    expect(data).to.equal('ok');
    expect(form instanceof FormData).to.equal(true);
    expect(entries.length).to.equal(3);
  });

  it('can override error codes on the request', async () => {
    testServer
      .intercept({
        path: '/api/custom-success-codes',
        method: 'POST',
      })
      .reply(502);

    const state = {
      configuration: {},
      data: {
        id: 'a',
        parent: 'b',
        mobile_phone: 'c',
      },
    };
    const { response } = await execute(
      post(
        'https://www.example.com/api/custom-success-codes',
        state => state.data,
        {
          errors: { 502: false },
        }
      )
    )(state);

    expect(response.statusCode).to.eq(502);
  });
});

describe('put', () => {
  it('should send a put request with json', async () => {
    let req;
    const body = { x: 1, y: 2 };

    testServer
      .intercept({
        path: '/api/fake-items/6',
        method: 'PUT',
      })
      .reply(200, r => {
        req = r;
        return 'ok';
      });

    const state = {};

    const { response } = await execute(
      put('https://www.example.com/api/fake-items/6', body)
    )(state);

    expect(response.statusCode).to.eql(200);
    expect(req.body).to.equal(JSON.stringify(body));
  });
});

describe('patch', () => {
  it('should send a patch request with json', async () => {
    let req;
    const body = { x: 1, y: 2 };

    testServer
      .intercept({
        path: '/api/items/7',
        method: 'PATCH',
      })
      .reply(200, r => {
        req = r;
        return 'ok';
      });

    const state = {};

    const { response } = await execute(
      patch('https://www.example.com/api/items/7', body)
    )(state);

    expect(response.statusCode).to.eql(200);
    expect(req.body).to.equal(JSON.stringify(body));
  });
});

describe('delete', () => {
  before(() => {});

  it('sends a delete request', async () => {
    testServer
      .intercept({
        path: '/api/items/6',
        method: 'DELETE',
      })
      .reply(204);

    const state = {
      configuration: {},
      data: {},
    };
    const { response } = await execute(
      del('https://www.example.com/api/items/6')
    )(state);

    expect(response.statusCode).to.eql(204);
  });
});

describe('getTLSOptions', () => {
  it('prefers requestOptions.tls over and agent options configuration.tls', () => {
    const state = {
      configuration: {
        tls: { ca: 'tls-ca', cert: 'tls-cert' },
      },
    };

    const requestOptions = {
      agentOptions: { ca: 'agent-ca', key: 'agent-key' },
      tls: { ca: 'tls-from-request', cert: 'req-cert' },
    };

    const result = getTLSOptions(state, requestOptions);
    expect(result).to.deep.equal(requestOptions.tls);
  });

  it('prefers requestOptions.agentOptions over configuration.tls if requestOptions.tls is not provided', () => {
    const state = {
      configuration: {
        tls: { ca: 'tls-ca', cert: 'tls-cert' },
      },
    };

    const requestOptions = {
      agentOptions: { ca: 'agent-ca', key: 'agent-key' },
    };

    const result = getTLSOptions(state, requestOptions);
    expect(result).to.deep.equal(requestOptions.agentOptions);
  });

  it('falls back to configuration.tls if neither tls nor agentOptions provided', () => {
    const state = {
      configuration: {
        tls: { ca: 'config-ca', cert: 'tls-cert', key: 'tls-key' },
      },
    };

    const requestOptions = {};

    const result = getTLSOptions(state, requestOptions);
    expect(result).to.deep.equal({
      ca: 'config-ca',
      cert: 'tls-cert',
      key: 'tls-key',
    });
  });

  it('uses state.configuration.tls if no other options are provided', () => {
    const state = {
      configuration: {
        tls: { ca: 'tls-ca', cert: 'tls-cert' },
      },
    };

    const requestOptions = {};

    const result = getTLSOptions(state, requestOptions);
    expect(result).to.deep.equal({
      ca: 'tls-ca',
      cert: 'tls-cert',
    });
  });

  it('returns undefined if no TLS config is found', () => {
    const state = {
      configuration: {},
    };

    const requestOptions = {};
    const result = getTLSOptions(state, requestOptions);

    expect(result).to.deep.equal(undefined);
  });
});
