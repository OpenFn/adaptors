import {
  execute,
  get,
  post,
  put,
  patch,
  del,
  alterState,
  request,
} from '../src';
import { each } from '@openfn/language-common';
import { expect } from 'chai';
import nock from 'nock';
import { setUrl } from '../src/Utils';

function stdGet(state) {
  return execute(get('https://www.example.com/api/fake', {}))(state).then(
    nextState => {
      const { data, references } = nextState;
      expect(data).to.haveOwnProperty('httpStatus', 'OK');
      expect(data).to.haveOwnProperty('message', 'the response');

      expect(references).to.eql([{ triggering: 'event' }]);
    }
  );
}

function clientReq(method, state) {
  return execute(method('https://www.example.com/api/fake', {}))(state).then(
    nextState => {
      const { data, references } = nextState;
      expect(data).to.eql({ httpStatus: 'OK', message: 'the response' });
      expect(references).to.eql([{ a: 1 }]);
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

describe('setUrl', () => {
  it('handles no slashes on either baseUrl or path', () => {
    const configuration = { baseUrl: 'https://www.test.com' };
    const path = 'users/5';

    expect(setUrl(configuration, path)).to.eql('https://www.test.com/users/5');
  });

  it('handles a trailing slash on baseUrl and a leading slash on path', () => {
    const configuration = { baseUrl: 'https://www.test.com/' };
    const path = '/users/5';

    expect(setUrl(configuration, path)).to.eql('https://www.test.com/users/5');
  });

  it('handles a trailing slash on baseUrl, no leading slash on path', () => {
    const configuration = { baseUrl: 'https://www.test.com/' };
    const path = 'users/5';

    expect(setUrl(configuration, path)).to.eql('https://www.test.com/users/5');
  });

  it('handles a leading slash on path, nothing on baseUrl', () => {
    const configuration = { baseUrl: 'https://www.test.com' };
    const path = '/users/5';

    expect(setUrl(configuration, path)).to.eql('https://www.test.com/users/5');
  });
});

const testServer = nock('https://www.example.com');

describe('The client', () => {
  before(() => {
    testServer.get('/api/fake').reply(200, {
      httpStatus: 'OK',
      message: 'the response',
    });

    testServer.post('/api/fake').reply(200, {
      httpStatus: 'OK',
      message: 'the response',
    });

    testServer.put('/api/fake').reply(200, {
      httpStatus: 'OK',
      message: 'the response',
    });

    testServer.patch('/api/fake').reply(200, {
      httpStatus: 'OK',
      message: 'the response',
    });

    testServer.delete('/api/fake').reply(200, {
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  after(() => {
    nock.cleanAll();
  });
  const stdState = {
    configuration: null,
    data: { a: 1 },
  };

  it('works with GET', () => {
    let state = stdState;
    clientReq(get, state);
  });

  it('works with POST', () => {
    let state = stdState;
    clientReq(post, state);
  });

  it('works with PATCH', () => {
    let state = stdState;
    clientReq(patch, state);
  });

  it('works with POST', () => {
    let state = stdState;
    clientReq(put, state);
  });

  it('works with POST', () => {
    let state = stdState;
    clientReq(del, state);
  });
});

describe('get()', () => {
  before(() => {
    testServer.get('/api/fake').times(4).reply(200, {
      httpStatus: 'OK',
      message: 'the response',
    });

    testServer
      .get('/api/showMeMyHeaders')
      .times(3)
      .reply(200, function (url, body) {
        return [url, this.req.headers];
      });

    testServer
      .get('/api/showMeMyHeaders?id=1')
      .reply(200, function (url, body) {
        return [url, this.req.headers];
      });

    testServer
      .get('/api/fake-endpoint')
      .matchHeader('followAllRedirects', true)
      .reply(301, undefined, {
        Location: 'https://www.example.com/api/fake-endpoint-2',
      })
      .get('/api/fake-endpoint-2')
      .reply(302, undefined, {
        Location: 'https://www.example.com/api/fake-endpoint-3',
      })
      .get('/api/fake-endpoint-3')
      .reply(200, function (url, body) {
        return { url };
      });

    testServer.get('/api/fake-cookies').reply(
      200,
      function (url, body) {
        return { url };
      },
      { 'Set-Cookie': ['tasty_cookie=choco'] }
    );

    testServer.get('/api/fake-callback').reply(200, function (url, body) {
      return { url, id: 3 };
    });

    testServer.get('/api/fake-promise').reply(200, function (url, body) {
      return new Promise((resolve, reject) => {
        resolve({ url, id: 3 });
      });
    });

    testServer.get('/api/badAuth').times(2).reply(404);
    testServer.get('/api/crashDummy').times(2).reply(500);
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
      alterState(state => {
        state.counter = 1;
        return state;
      }),
      get('/api/fake', {}),
      alterState(state => {
        state.counter = 2;
        return state;
      })
    )(state).then(nextState => {
      const { data, references, counter } = nextState;
      expect(data).to.haveOwnProperty('httpStatus', 'OK');
      expect(data).to.haveOwnProperty('message', 'the response');
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

    const finalState = await execute(
      get('https://www.example.com/api/showMeMyHeaders', {
        headers: { 'x-openfn': 'testing' },
      })
    )(state);

    expect(finalState.data[0]).to.eql('/api/showMeMyHeaders');

    expect(finalState.data[1]).to.haveOwnProperty('x-openfn', 'testing');

    expect(finalState.data[1]).to.haveOwnProperty(
      'authorization',
      'Basic aGVsbG86dGhlcmU='
    );

    expect(finalState.data[1]).to.haveOwnProperty('host', 'www.example.com');

    expect(finalState.references).to.eql([{ triggering: 'event' }]);
  });

  it('accepts authentication for http basic auth', async () => {
    const state = {
      configuration: {
        username: 'hello',
        password: 'there',
      },
      data: { triggering: 'event' },
    };

    const finalState = await execute(
      get('https://www.example.com/api/showMeMyHeaders')
    )(state);
    expect(finalState.data[0]).to.eql('/api/showMeMyHeaders');
    expect(finalState.data[1]).to.haveOwnProperty(
      'authorization',
      'Basic aGVsbG86dGhlcmU='
    );
    expect(finalState.data[1]).to.haveOwnProperty('host', 'www.example.com');
  });

  it('can enable gzip', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const finalState = await execute(
      get('https://www.example.com/api/showMeMyHeaders', { gzip: true })
    )(state);

    expect(finalState.data[0]).to.eql('/api/showMeMyHeaders');

    expect(finalState.data[1]).to.haveOwnProperty(
      'accept-encoding',
      'gzip, deflate'
    );

    expect(finalState.data[1]).to.haveOwnProperty('host', 'www.example.com');
  });

  it('allows query strings to be set', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const finalState = await execute(
      get('https://www.example.com/api/showMeMyHeaders', { query: { id: 1 } })
    )(state);

    expect(finalState.data[0]).to.eql('/api/showMeMyHeaders?id=1');

    expect(finalState.data[1]).to.haveOwnProperty('host', 'www.example.com');
  });

  it('can follow redirects', async () => {
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

    const finalState = await execute(
      get('https://www.example.com/api/fake-cookies', {
        keepCookie: true,
      })
    )(state);

    expect(finalState.data.__cookie).to.eql('tasty_cookie=choco');
  });

  it('accepts callbacks and calls them with nextState', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const finalState = await execute(
      get('https://www.example.com/api/fake-callback', {}, state => {
        return state;
      })
    )(state);

    expect(finalState.data.id).to.eql(3);
  });

  it('returns a promise that contains nextState', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const finalState = await execute(
      get('https://www.example.com/api/fake-promise', {})
    )(state).then(state => state);
    expect(finalState.data.id).to.eql(3);
  });

  it('allows successCodes to be specified via options', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const finalState = await execute(
      get('https://www.example.com/api/badAuth', {
        options: { successCodes: [404] },
      })
    )(state);

    expect(finalState.response.status).to.eql(404);
  });

  it('throws an error for a non-2XX response', async () => {
    const state = {
      configuration: {},
      data: {},
    };

    const error = await execute(get('https://www.example.com/api/crashDummy'))(
      state
    ).catch(error => error);

    expect(error.response.status).to.eql(500);
  });

  it('can be called inside an each block', async () => {
    nock('https://www.repeat.com')
      .get('/api/fake-json')
      .times(3)
      .reply(200, function (url, body) {
        return body;
      });

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
          'https://www.repeat.com/api/fake-json',
          {
            body: state => state.data,
          },
          next => {
            next.replies.push(next.response.config.data);
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

describe('post', () => {
  before(() => {
    testServer.post('/api/fake-json').reply(200, function (url, body) {
      return body;
    });

    testServer.post('/api/fake-form').reply(200, function (url, body) {
      return body;
    });

    testServer.post('/api/fake-formData').reply(200, function (url, body) {
      return body;
    });

    testServer
      .post('/api/fake-custom-success-codes')
      .reply(302, function (url, body) {
        return { ...body, statusCode: 302 };
      });
  });

  it('can set JSON on the request body', async () => {
    const state = {
      configuration: {},
      data: { name: 'test', age: 24 },
    };

    const finalState = await execute(
      post('https://www.example.com/api/fake-json', { body: state.data })
    )(state);
    expect(finalState.data).to.eql({ name: 'test', age: 24 });
  });

  it('can set data via Form param on the request body', async () => {
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

    expect(finalState.data.body).to.contain(
      'Content-Disposition: form-data; name="username"\r\n\r\nfake'
    );
    expect(finalState.data.body).to.contain(
      'Content-Disposition: form-data; name="password"\r\n\r\nfake_pass'
    );
  });

  it('can set FormData on the request body', async () => {
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
    nock('https://www.repeat.com')
      .post('/api/fake-json')
      .times(3)
      .reply(200, function (url, body) {
        return body;
      });

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
          'https://www.repeat.com/api/fake-json',
          {
            body: state => state.data,
          },
          next => {
            next.replies.push(next.response.config.data);
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

  it.only('can be called inside an each with old "json" request config', async () => {
    nock('https://www.repeat.com')
      .post('/api/fake-json')
      .times(3)
      .reply(200, function (url, body) {
        return body;
      });

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
          'https://www.repeat.com/api/fake-json',
          {
            json: state => state.data,
          },
          next => {
            next.replies.push(next.response.config.data);
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
    let data = {
      id: 'fake_id',
      parent: 'fake_parent',
      mobile_phone: 'fake_phone',
    };
    const state = {
      configuration: {},
      data,
    };
    const finalState = await execute(
      post('https://www.example.com/api/fake-custom-success-codes', {
        data: state => {
          return state.data;
        },
        options: { successCodes: [302] },
      })
    )(state);

    expect(finalState.data.statusCode).to.eq(302);
  });
});

describe('put', () => {
  before(() => {
    testServer.put('/api/fake-items/6').reply(200, function (url, body) {
      return { body, statusCode: 200 };
    });
  });

  it('sends a put request', async () => {
    const state = {
      configuration: {},
      data: { name: 'New name' },
    };
    const finalState = await execute(
      put('https://www.example.com/api/fake-items/6', {
        body: state.data,
      })
    )(state);

    expect(finalState.data.statusCode).to.eql(200);
    expect(finalState.data.body).to.eql({ name: 'New name' });
  });

  it('can be called inside an each block', async () => {
    nock('https://www.repeat.com')
      .put('/api/fake-json')
      .times(3)
      .reply(200, function (url, body) {
        return body;
      });

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
        put(
          'https://www.repeat.com/api/fake-json',
          {
            body: state => state.data,
          },
          next => {
            next.replies.push(next.response.config.data);
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

describe('patch', () => {
  before(() => {
    testServer.patch('/api/fake-items/6').reply(200, function (url, body) {
      return { body, statusCode: 200 };
    });
  });

  it('sends a patch request', async () => {
    const state = {
      configuration: {},
      data: { name: 'New name', id: 6 },
    };
    const finalState = await execute(
      patch('https://www.example.com/api/fake-items/6', {
        body: state.data,
      })
    )(state);

    expect(finalState.data.statusCode).to.eql(200);
    expect(finalState.data.body).to.eql({ id: 6, name: 'New name' });
  });

  it('can be called inside an each block', async () => {
    nock('https://www.repeat.com')
      .patch('/api/fake-json')
      .times(3)
      .reply(200, function (url, body) {
        return body;
      });

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
        patch(
          'https://www.repeat.com/api/fake-json',
          {
            body: state => state.data,
          },
          next => {
            next.replies.push(next.response.config.data);
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

describe('delete', () => {
  before(() => {
    testServer.delete('/api/fake-del-items/6').reply(204, function (url, body) {
      return { ...body };
    });
  });

  it('sends a delete request', async () => {
    const state = {
      configuration: {},
      data: {},
    };
    const finalState = await execute(
      del('https://www.example.com/api/fake-del-items/6', {
        options: {
          successCodes: [204],
        },
      })
    )(state);

    expect(finalState.data).to.eql({});
  });

  it('can be called inside an each block', async () => {
    nock('https://www.repeat.com')
      .delete('/api/fake-json')
      .times(3)
      .reply(200, function (url, body) {
        return body;
      });

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
          'https://www.repeat.com/api/fake-json',
          {
            body: state => state.data,
          },
          next => {
            next.replies.push(next.response.config.data);
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

describe('the old request operation', () => {
  before(() => {
    testServer
      .post('/api/oldEndpoint?hi=there')
      .reply(200, function (url, body) {
        return body;
      });
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

describe('The `agentOptions` param', () => {
  before(() => {
    testServer
      .post('/api/sslCertCheck')
      .times(3)
      .reply(200, (url, body) => body);
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
      alterState(state => {
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
      alterState(state => {
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

describe('reject unauthorized allows for bad certs', () => {
  before(() => {
    testServer.get('/api/insecureStuff').reply(200, 'all my secrets!');
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
