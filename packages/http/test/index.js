import { execute, request, get, post, put, patch, del, fn } from '../src';
import { each, parseCsv } from '@openfn/language-common';
import { enableMockClient } from '@openfn/language-common/util';
import { expect, assert } from 'chai';

const jsonHeaders = { 'Content-Type': 'application/json' };

const testServer = enableMockClient('https://www.example.com');

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
      body: { x: 31 },
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

    expect(data).to.eql({ 'x-openfn': 'testing' });
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

  it('pass state to the callback', async () => {
    testServer
      .intercept({
        path: '/api/callback',
        method: 'GET',
      })
      .reply(
        200,
        { id: 3 },
        {
          headers: jsonHeaders,
        }
      );

    const state = {
      configuration: { baseUrl: 'https://www.example.com' },
      data: {},
    };

    let callbackState;

    const finalState = await execute(
      get('api/callback', {}, state => {
        callbackState = state;
        return state;
      })
    )(state);

    expect(callbackState).to.eql(finalState);
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

  it('can be called inside an each block', async () => {
    testServer
      .intercept({
        path: '/api/fake-json',
        method: 'GET',
      })
      .reply(200, ({ body }) => body)
      .persist();

    const state = {
      configuration: {},
      things: [
        { name: 'a', age: 42 },
        { name: 'b', age: 83 },
        { name: 'c', age: 112 },
      ],
      replies: [],
    };

    const finalState = await execute(
      each(
        '$.things[*]',
        get(
          'https://www.example.com/api/fake-json',
          {
            body: state => state.data,
          },
          next => {
            next.replies.push(next.response.body);
            return next;
          }
        )
      )
    )(state);

    expect(finalState.replies).to.eql([
      '{"name":"a","age":42}',
      '{"name":"b","age":83}',
      '{"name":"c","age":112}',
    ]);
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
      post('https://www.example.com/api/json', {
        body: { name: 'tony stark', age: 24 },
      })
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
      post('https://www.example.com/api/form-data', {
        form: formData,
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
      post('https://www.example.com/api/custom-success-codes', {
        body: state => state.data,
        errors: { 502: false },
      })
    )(state);

    expect(response.statusCode).to.eq(502);
  });

  it('can be called inside an each block', async () => {
    testServer
      .intercept({
        path: '/api/json',
        method: 'POST',
      })
      .reply(200, ({ body }) => body)
      .persist();

    const state = {
      configuration: {},
      things: [
        { name: 'a', age: 42 },
        { name: 'b', age: 83 },
        { name: 'c', age: 112 },
      ],
      replies: [],
    };

    const finalState = await execute(
      each(
        '$.things[*]',
        post(
          'https://www.example.com/api/json',
          {
            body: state => state.data,
          },
          next => {
            next.replies.push(next.response.body);
            return next;
          }
        )
      )
    )(state);

    expect(finalState.replies).to.eql([
      '{"name":"a","age":42}',
      '{"name":"b","age":83}',
      '{"name":"c","age":112}',
    ]);
  });

  it('can be called inside an each with old "json" request config', async () => {
    testServer
      .intercept({
        path: '/api/fake-json',
        method: 'POST',
      })
      .reply(200, ({ body }) => body)
      .persist();

    const state = {
      configuration: {},
      things: [
        { name: 'a', age: 42 },
        { name: 'b', age: 83 },
        { name: 'c', age: 112 },
      ],
      replies: [],
    };

    const finalState = await execute(
      each(
        '$.things[*]',
        post(
          'https://www.example.com/api/fake-json',
          {
            json: state => state.data,
          },
          next => {
            next.replies.push(next.response.body);
            return next;
          }
        )
      )
    )(state);

    expect(finalState.replies).to.eql([
      '{"name":"a","age":42}',
      '{"name":"b","age":83}',
      '{"name":"c","age":112}',
    ]);
  });

  it('should make an http request from inside the parseCSV callback', async function () {
    testServer
      .intercept({
        path: '/api/csv-reader',
        method: 'POST',
      })
      .reply(200, ({ body }) => body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .persist();

    const csv = 'id,name\n1,taylor\n2,mtuchi\n3,joe\n4,stu\n5,elias';
    const state = { references: [], data: [], apiResponses: [] };

    const resultingState = await parseCsv(
      csv,
      { chunkSize: 2 },
      (state, rows) =>
        post(
          'https://www.example.com/api/csv-reader',
          {
            body: rows,
          },
          state => {
            state.apiResponses.push(...state.response.body);
            return state;
          }
        )(state)
    )(state);

    expect(resultingState.apiResponses).to.eql([
      { id: '1', name: 'taylor' },
      { id: '2', name: 'mtuchi' },
      { id: '3', name: 'joe' },
      { id: '4', name: 'stu' },
      { id: '5', name: 'elias' },
    ]);
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
      put('https://www.example.com/api/fake-items/6', {
        body,
      })
    )(state);

    expect(response.statusCode).to.eql(200);
    expect(req.body).to.equal(JSON.stringify(body));
  });

  it('can be called inside an each block', async () => {
    testServer
      .intercept({
        path: '/api/json',
        method: 'put',
      })
      .reply(200, ({ body }) => body)
      .persist();

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
      },
      things: [
        { name: 'a', age: 42 },
        { name: 'b', age: 83 },
        { name: 'c', age: 112 },
      ],
      replies: [],
    };

    const finalState = await execute(
      each(
        '$.things[*]',
        put(
          '/api/json',
          {
            body: state => state.data,
          },
          next => {
            next.replies.push(next.response.body);
            return next;
          }
        )
      )
    )(state);

    expect(finalState.replies).to.eql([
      '{"name":"a","age":42}',
      '{"name":"b","age":83}',
      '{"name":"c","age":112}',
    ]);
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
      patch('https://www.example.com/api/items/7', {
        body,
      })
    )(state);

    expect(response.statusCode).to.eql(200);
    expect(req.body).to.equal(JSON.stringify(body));
  });

  it('can be called inside an each block', async () => {
    testServer
      .intercept({
        path: '/api/fake-json',
        method: 'PATCH',
      })
      .reply(200, ({ body }) => body)
      .persist();

    const state = {
      configuration: {
        baseUrl: 'https://www.example.com',
      },
      things: [
        { name: 'a', age: 42 },
        { name: 'b', age: 83 },
        { name: 'c', age: 112 },
      ],
      replies: [],
    };

    const finalState = await execute(
      each(
        '$.things[*]',
        patch(
          '/api/fake-json',
          state => ({
            body: state.data,
          }),
          next => {
            next.replies.push(next.response.body);
            return next;
          }
        )
      )
    )(state);

    expect(finalState.replies).to.eql([
      '{"name":"a","age":42}',
      '{"name":"b","age":83}',
      '{"name":"c","age":112}',
    ]);
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

  it('can be called inside an each block', async () => {
    testServer
      .intercept({
        path: '/api/fake-json',
        method: 'DELETE',
      })
      .reply(200, ({ body }) => body)
      .persist();

    const state = {
      configuration: {},
      things: [
        { name: 'a', age: 42 },
        { name: 'b', age: 83 },
        { name: 'c', age: 112 },
      ],
      replies: [],
    };

    const finalState = await execute(
      each(
        '$.things[*]',
        del(
          'https://www.example.com/api/fake-json',
          {
            body: state => state.data,
          },
          next => {
            next.replies.push(next.response.body);
            return next;
          }
        )
      )
    )(state);

    expect(finalState.replies).to.eql([
      '{"name":"a","age":42}',
      '{"name":"b","age":83}',
      '{"name":"c","age":112}',
    ]);
  });
});

describe('tls', () => {
  before(() => {
    testServer
      .intercept({
        path: '/api/sslCertCheck',
        method: 'POST',
      })
      .reply(200, ({ body }) => body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .persist();
  });

  it('gets expanded and still works', async () => {
    const state = {
      configuration: {
        label: 'my custom SSL cert',
        publicKey: 'something@mamadou.org',
        privateKey: 'abc123',
      },
      data: { a: 1 },
    };

    const finalState = await execute(
      fn(state => {
        state.httpsOptions = { ca: state.configuration.privateKey };
        return state;
      }),
      post('https://www.example.com/api/sslCertCheck', state => ({
        body: state.data,
        agentOptions: state.httpsOptions,
      }))
    )(state);
    expect(finalState.data).to.eql({ a: 1 });
  });

  it('lets the user create an https agent with a cert', async () => {
    const state = {
      configuration: {
        label: 'my custom SSL cert',
        publicKey: 'something@mamadou.org',
        privateKey: 'abc123',
      },
      data: { a: 1 },
    };

    const finalState = await execute(
      post('https://www.example.com/api/sslCertCheck', {
        body: state => state.data,
        tls: { ca: state.configuration.privateKey },
      })
    )(state);
    expect(finalState.data).to.eql({ a: 1 });
  });

  it('lets the user define a cert earlier and use it later', async () => {
    const state = {
      configuration: {
        label: 'my custom SSL cert',
        publicKey: 'something@mamadou.org',
        privateKey: 'abc123',
      },
      data: { a: 2 },
    };

    const finalState = await execute(
      fn(state => {
        state.httpsOptions = { ca: state.configuration.privateKey };
        return state;
      }),
      post('https://www.example.com/api/sslCertCheck', {
        body: state => state.data,
        tls: state => state.httpsOptions,
      })
    )(state);

    expect(finalState.data).to.eql({ a: 2 });
  });
});

describe('reject unauthorized allows for bad certs', () => {
  before(() => {
    testServer
      .intercept({
        path: '/api/insecureStuff',
        method: 'GET',
      })
      .reply(200, 'all my secrets!');
  });

  it('lets the user send requests while ignoring SSL', async () => {
    const state = {
      configuration: {},
      data: { a: 1 },
    };

    const finalState = await execute(
      get('https://www.example.com/api/insecureStuff', {
        agentOptions: { rejectUnauthorized: false },
        body: state => state.data,
      })
    )(state);

    expect(finalState.data).to.eql('all my secrets!');
  });
});
