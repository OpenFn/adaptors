import { execute, get, post, put, patch, del, fn } from '../src';
import { each, parseCsv } from '@openfn/language-common';
import { enableMockClient } from '@openfn/language-common/util';
import { expect } from 'chai';

// TODO this is no longer need, but we still need the tests
// import { setUrl } from '../src/Utils';
// TODO make sure these are covered in the general get tests
describe.skip('parseUrl', () => {
  it('handles no slashes on either baseUrl or path', () => {
    const configuration = { baseUrl: 'https://www.test.com' };
    const path = 'users/5';

    expect(parseUrl(path, configuration.baseUrl)).to.eql(
      'https://www.test.com/users/5'
    );
  });

  it('handles a trailing slash on baseUrl and a leading slash on path', () => {
    const configuration = { baseUrl: 'https://www.test.com/' };
    const path = '/users/5';

    expect(parseUrl(path, configuration.baseUrl)).to.eql(
      'https://www.test.com/users/5'
    );
  });

  it('handles a trailing slash on baseUrl, no leading slash on path', () => {
    const configuration = { baseUrl: 'https://www.test.com/' };
    const path = 'users/5';

    expect(parseUrl(path, configuration.baseUrl)).to.eql(
      'https://www.test.com/users/5'
    );
  });

  it('handles a leading slash on path, nothing on baseUrl', () => {
    const configuration = { baseUrl: 'https://www.test.com' };
    const path = '/users/5';

    expect(parseUrl(path, configuration.baseUrl)).to.eql(
      'https://www.test.com/users/5'
    );
  });
});

const testServer = enableMockClient('https://www.example.com');

function stdGet(state) {
  return execute(get('https://www.example.com/api/fake', {}))(state).then(
    nextState => {
      const { data, references } = nextState;
      expect(data).to.haveOwnProperty('code', '200');
      expect(data).to.haveOwnProperty('body', 'the response');

      expect(references).to.eql([{ triggering: 'event' }]);
    }
  );
}

describe('The execute() function', () => {
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

    let finalState = execute()(state);

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

describe('get()', () => {
  before(() => {
    testServer
      .intercept({
        path: '/api/fake',
        method: 'GET',
      })
      .reply(
        200,
        {
          code: '200',
          body: 'the response',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .persist();

    testServer
      .intercept({
        path: '/api/showMeMyHeaders',
        method: 'GET',
      })
      .reply(200, req => req, {
        headers: {
          'x-openfn': 'testing',
          authorization: 'Basic aGVsbG86dGhlcmU=',
          'Content-Type': 'application/json',
        },
      })
      .persist();

    testServer
      .intercept({
        path: '/api/showMeMyHeaders?id=1',
        method: 'GET',
      })
      .reply(200, req => req, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    // TODO Follow All Redirects support
    // testServer
    //   .get('/api/fake-endpoint')
    //   .matchHeader('followAllRedirects', true)
    //   .reply(301, undefined, {
    //     Location: 'https://www.example.com/api/fake-endpoint-2',
    //   })
    //   .get('/api/fake-endpoint-2')
    //   .reply(302, undefined, {
    //     Location: 'https://www.example.com/api/fake-endpoint-3',
    //   })
    //   .get('/api/fake-endpoint-3')
    //   .reply(200, function (url, body) {
    //     return { url };
    //   });

    testServer
      .intercept({
        path: '/api/fake-cookies',
        method: 'GET',
      })
      .reply(
        200,
        {
          __cookie: 'tasty_cookie=choco',
          __headers: { 'Set-Cookie': ['tasty_cookie=choco'] },
        },
        {
          headers: {
            'Set-Cookie': ['tasty_cookie=choco'],
            'Content-Type': 'application/json',
          },
        }
      );

    testServer
      .intercept({
        path: '/api/fake-callback',
        method: 'GET',
      })
      .reply(200, req => ({ ...req, id: 3 }), {
        headers: { 'Content-Type': 'application/json' },
      });

    testServer
      .intercept({
        path: '/api/fake-promise',
        method: 'GET',
      })
      .reply(200, req => ({ ...req, id: 3 }), {
        headers: { 'Content-Type': 'application/json' },
      });

    testServer
      .intercept({
        path: '/api/badAuth',
        method: 'GET',
      })
      .reply(404)
      .persist();

    testServer
      .intercept({
        path: '/api/crashDummy',
        method: 'GET',
      })
      .reply(500)
      .persist();
  });

  it('prepares nextState properly', () => {
    let state = {
      configuration: {
        username: 'hello',
        password: 'there',
        baseUrl: 'https://www.example.com',
      },
      data: {
        triggering: 'event',
      },
    };

    return execute(
      fn(state => {
        state.counter = 1;
        return state;
      }),
      get('/api/fake', {}),
      fn(state => {
        state.counter = 2;
        return state;
      })
    )(state).then(nextState => {
      const { data, references, counter } = nextState;
      expect(data).to.haveOwnProperty('code', '200');
      expect(data).to.haveOwnProperty('body', 'the response');
      expect(references).to.eql([{ triggering: 'event' }]);
      expect(counter).to.eql(2);
    });
  });

  it('works without a baseUrl', () => {
    let state = {
      configuration: {
        username: 'hello',
        password: 'there',
      },
      data: { triggering: 'event' },
    };
    return stdGet(state);
  });

  it('works with an empty set of credentials', () => {
    let state = {
      configuration: {},
      data: { triggering: 'event' },
    };
    return stdGet(state);
  });

  it('works with no credentials (null)', () => {
    let state = {
      configuration: null,
      data: {
        triggering: 'event',
      },
    };
    return stdGet(state);
  });

  it('accepts headers', async () => {
    const state = {
      configuration: {
        username: 'hello',
        password: 'there',
      },
      data: { triggering: 'event' },
    };

    const { data, references, response } = await execute(
      get('https://www.example.com/api/showMeMyHeaders', {
        headers: { 'x-openfn': 'testing' },
      })
    )(state);

    expect(data.path).to.eql('/api/showMeMyHeaders');

    expect(response.headers).to.haveOwnProperty('x-openfn', 'testing');

    expect(response.headers).to.haveOwnProperty(
      'authorization',
      'Basic aGVsbG86dGhlcmU='
    );

    // expect(data[1]).to.haveOwnProperty('host', 'www.example.com');

    expect(references).to.eql([{ triggering: 'event' }]);
  });

  it('accepts authentication for http basic auth', async () => {
    const state = {
      configuration: {
        username: 'hello',
        password: 'there',
      },
      data: { triggering: 'event' },
    };

    const { data, response } = await execute(
      get('https://www.example.com/api/showMeMyHeaders')
    )(state);

    expect(data.path).to.eql('/api/showMeMyHeaders');
    expect(response.headers).to.haveOwnProperty(
      'authorization',
      'Basic aGVsbG86dGhlcmU='
    );
    // TODO how to test baseUrl? Do we want to test baseUrl
    // expect(data.headers).to.haveOwnProperty('host', 'www.example.com');
  });

  it('allows query strings to be set', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const { data } = await execute(
      get('https://www.example.com/api/showMeMyHeaders', { query: { id: 1 } })
    )(state);

    expect(data.path).to.eql('/api/showMeMyHeaders');
    expect(data.query).to.eql({ id: 1 });
    // TODO how to test baseUrl? Do we want to test baseUrl
    // expect(data[1]).to.haveOwnProperty('host', 'www.example.com');
  });

  it.skip('can follow redirects', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const finalState = await execute(
      get('https://www.example.com/api/fake-endpoint', {
        headers: { followAllRedirects: true },
      })
    )(state);
    expect(finalState.data.url).to.eql('/api/fake-endpoint-3');
  });

  it('can keep and reuse cookies', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const { data } = await execute(
      get('https://www.example.com/api/fake-cookies', {
        keepCookie: true,
      })
    )(state);

    expect(data.__cookie).to.eql('tasty_cookie=choco');
  });

  it('accepts callbacks and calls them with nextState', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const { data } = await execute(
      get('https://www.example.com/api/fake-callback', {}, state => {
        return state;
      })
    )(state);

    expect(data.id).to.eql(3);
  });

  it('returns a promise that contains nextState', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const { data } = await execute(
      get('https://www.example.com/api/fake-promise')
    )(state).then(state => state);
    expect(data.id).to.eql(3);
  });

  it('allows errors to be specified via options', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const { response } = await execute(
      get('https://www.example.com/api/badAuth', {
        errors: { 404: false },
      })
    )(state);

    expect(response.code).to.eql(404);
  });

  it('throws an error for a non-2XX response', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const error = await execute(get('https://www.example.com/api/crashDummy'))(
      state
    ).catch(error => error);

    expect(error.code).to.eql(500);
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
  before(() => {
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
  });

  it('should make an http request from inside the parseCSV callback', async function () {
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

  it('can set JSON on the request body', async () => {
    testServer
      .intercept({
        path: '/api/fake-json',
        method: 'POST',
      })
      .reply(200, { name: 'test', age: 24 });

    const state = {
      configuration: {},
      data: { name: 'test', age: 24 },
    };

    const finalState = await execute(
      post('https://www.example.com/api/fake-json', {
        body: state.data,
        parseAs: 'json',
      })
    )(state);
    expect(finalState.data).to.eql({ name: 'test', age: 24 });
  });

  it.skip('can set data via Form param on the request body', async () => {
    testServer
      .intercept({
        path: '/api/fake-form',
        method: 'POST',
      })
      .reply(200, ({ body }) => body);

    let form = {
      username: 'fake',
      password: 'fake_pass',
    };
    const state = {
      configuration: {},
      data: form,
    };

    const finalState = await execute(
      post('https://www.example.com/api/fake-form', {
        form: state => state.data,
      })
    )(state);

    console.log(finalState.data);
    expect(finalState.data.body).to.contain(
      'Content-Disposition: form-data; name="username"\r\n\r\nfake'
    );
    expect(finalState.data.body).to.contain(
      'Content-Disposition: form-data; name="password"\r\n\r\nfake_pass'
    );
  });

  it.skip('can set FormData on the request body', async () => {
    testServer
      .intercept({
        path: '/api/fake-formData',
        method: 'POST',
      })
      .reply(200, ({ body }) => body);
    let formData = {
      id: 'fake_id',
      parent: 'fake_parent',
      mobile_phone: 'fake_phone',
    };

    const state = {
      configuration: {},
      data: formData,
    };

    const finalState = await execute(
      post('https://www.example.com/api/fake-formData', {
        formData: state => {
          return state.data;
        },
      })
    )(state);

    expect(finalState.data.body).to.contain(
      'Content-Disposition: form-data; name="id"\r\n\r\nfake_id'
    );
    expect(finalState.data.body).to.contain(
      'Content-Disposition: form-data; name="parent"\r\n\r\nfake_parent'
    );
    expect(finalState.data.body).to.contain(
      'Content-Disposition: form-data; name="mobile_phone"\r\n\r\nfake_phone'
    );
  });

  it('can be called inside an each block', async () => {
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

  it.skip('can be called inside an each with old "json" request config', async () => {
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

  it('can set successCodes on the request', async () => {
    testServer
      .intercept({
        path: '/api/fake-custom-success-codes',
        method: 'POST',
      })
      .reply(302, ({ body }) => ({ body, code: 302 }));

    const state = {
      configuration: {},
      data: {
        id: 'fake_id',
        parent: 'fake_parent',
        mobile_phone: 'fake_phone',
      },
    };
    const { data } = await execute(
      post('https://www.example.com/api/fake-custom-success-codes', {
        body: state => state.data,
        errors: { 302: false },
        parseAs: 'json',
      })
    )(state);

    expect(data.code).to.eq(302);
  });
});

describe('put', () => {
  before(() => {
    testServer
      .intercept({
        path: '/api/fake-items/6',
        method: 'PUT',
      })
      .reply(
        200,
        { name: 'New name' },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  });

  it('sends a put request', async () => {
    const state = {
      configuration: {},
      data: { name: 'New name' },
    };
    const { data, response } = await execute(
      put('https://www.example.com/api/fake-items/6', {
        body: state.data,
      })
    )(state);

    expect(response.code).to.eql(200);
    expect(data).to.eql({ name: 'New name' });
  });

  it('can be called inside an each block', async () => {
    testServer
      .intercept({
        path: '/api/fake-json',
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
          '/api/fake-json',
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
  before(() => {
    testServer
      .intercept({
        path: '/api/fake-items/6',
        method: 'PATCH',
      })
      .reply(
        200,
        { name: 'New name', id: 6 },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  });

  it('sends a patch request', async () => {
    const state = {
      configuration: {},
      data: { name: 'New name', id: 6 },
    };
    const { data, response } = await execute(
      patch('https://www.example.com/api/fake-items/6', {
        body: state.data,
      })
    )(state);

    expect(response.code).to.eql(200);
    expect(data).to.eql({ id: 6, name: 'New name' });
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
  before(() => {
    testServer
      .intercept({
        path: '/api/fake-del-items/6',
        method: 'DELETE',
      })
      .reply(
        204,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  });

  it('sends a delete request', async () => {
    const state = {
      configuration: {},
      data: {},
    };
    const { data, response } = await execute(
      del('https://www.example.com/api/fake-del-items/6')
    )(state);

    expect(data).to.eql({});
    expect(response.code).to.eql(204);
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

    console.log(finalState.replies);

    expect(finalState.replies).to.eql([
      '{"name":"a","age":42}',
      '{"name":"b","age":83}',
      '{"name":"c","age":112}',
    ]);
  });
});

describe.skip('the old request operation', () => {
  before(() => {
    testServer.post('/api/oldEndpoint?hi=there').reply(200, ({ body }) => body);
  });

  it('sends a post request', async () => {
    const state = {
      configuration: {},
      data: { a: 1 },
    };
    const finalState = await execute(
      request({
        method: 'post',
        url: 'https://www.example.com/api/oldEndpoint',
        json: { a: 1 },
        qs: { hi: 'there' },
      })
    )(state);

    expect(finalState).to.eql({ a: 1 });
  });
});

describe.skip('The `agentOptions` param', () => {
  before(() => {
    testServer
      .intercept({
        path: '/api/sslCertCheck',
        method: 'POST',
      })
      .reply(200, ({ body }) => body)
      .persist();
  });

  it('gets expanded and still works', async () => {
    const state = {
      configuration: {
        label: 'my custom SSL cert',
        prublicKey: 'something@mamadou.org',
        privateKey: 'abc123',
      },
      data: { a: 1 },
    };

    const finalState = await execute(
      fn(state => {
        state.httpsOptions = { ca: state.configuration.privateKey };
        return state;
      }),
      post('https://www.example.com/api/sslCertCheck', {
        body: state.data,
        agentOptions: state => state.httpsOptions,
      })
    )(state);
    expect(finalState.data).to.eql({ a: 1 });
    expect(finalState.response.config.httpsAgent.options.ca).to.eql('abc123');
  });

  it('lets the user create an https agent with a cert', async () => {
    const state = {
      configuration: {
        label: 'my custom SSL cert',
        prublicKey: 'something@mamadou.org',
        privateKey: 'abc123',
      },
      data: { a: 1 },
    };

    const finalState = await execute(
      post('https://www.example.com/api/sslCertCheck', {
        body: state => state.data,
        agentOptions: { ca: state.configuration.privateKey },
      })
    )(state);
    expect(finalState.data).to.eql({ a: 1 });
    expect(finalState.response.config.httpsAgent.options.ca).to.eql('abc123');
  });

  it('lets the user define a cert earlier and use it later', async () => {
    const state = {
      configuration: {
        label: 'my custom SSL cert',
        prublicKey: 'something@mamadou.org',
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
        agentOptions: state => state.httpsOptions,
      })
    )(state);

    expect(finalState.data).to.eql({ a: 2 });
    expect(finalState.response.config.httpsAgent.options.ca).to.eql('abc123');
  });
});

describe.skip('reject unauthorized allows for bad certs', () => {
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

    expect(finalState.data.body).to.eql('all my secrets!');
    expect(
      finalState.response.config.httpsAgent.options.rejectUnauthorized
    ).to.eql(false);
  });
});
