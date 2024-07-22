import nock from 'nock';
import { expect } from 'chai';
import { http } from '../src/Adaptor';

describe('post', () => {
  before(() => {
    const fakeServer = nock('https://www.example.com');

    fakeServer.post('/api/fake').reply(200, {
      httpStatus: 'OK',
    });

    fakeServer
      .post('/api/fake?id=3', 'stringPayload')
      .reply(200, function (uri, body) {
        return [uri, body];
      });
  });

  it('sends a post request', async () => {
    const response = await http.post({
      url: 'https://www.example.com/api/fake',
    })();

    expect(Object.keys(response)).to.eql(
      ['status', 'statusText', 'headers', 'config', 'request', 'data'],
      'look like an axios response'
    );

    expect(response.status).to.eql(200);
  });

  it('expands all references', async () => {
    const unresolvedValue = state => state.foo;
    const unresolveId = state => state.id;

    const initialState = { foo: 'stringPayload', id: 3 };

    const response = await http.post({
      url: 'https://www.example.com/api/fake',
      data: unresolvedValue,
      params: { id: unresolveId },
    })(initialState);

    expect(response.status).to.eql(200);
    expect(response.data).to.eql(['/api/fake?id=3', 'stringPayload']);
  });
});

describe('delete', () => {
  before(() => {
    const fakeServer = nock('https://www.example.com');

    fakeServer.delete('/api/items/5').reply(204, {});
    fakeServer.delete('/api/items/6').reply(204, {});
  });

  it('sends a delete request', async () => {
    const response = await http.delete({
      url: 'https://www.example.com/api/items/5',
    })();

    expect(Object.keys(response)).to.eql(
      ['status', 'statusText', 'headers', 'config', 'request', 'data'],
      'look like an axios response'
    );

    expect(response.status).to.eql(204);
    expect(response.data).to.eql({});
  });

  it('expands all references', async () => {
    const initialState = { foo: 'stringPayload', id: 6 };

    const response = await http.delete({
      url: state => `https://www.example.com/api/items/${state.id}`,
    })(initialState);

    expect(response.status).to.eql(204);
    expect(response.data).to.eql({});
  });
});

describe('head', () => {
  before(() => {
    const fakeServer = nock('https://www.example.com');

    fakeServer
      .head('/api/items')
      .reply(
        200,
        {},
        { fakeHeader: 'fakeValue', 'content-type': 'application/json' }
      );
  });

  it('sends a head request', async () => {
    const response = await http.head({
      url: 'https://www.example.com/api/items',
    })();

    expect(Object.keys(response)).to.eql(
      ['status', 'statusText', 'headers', 'config', 'request', 'data'],
      'look like an axios response'
    );

    expect(response.status).to.eql(200);
    expect(response.data).to.eql({});
    expect(response.headers).to.eql({
      fakeheader: 'fakeValue',
      'content-type': 'application/json',
    });
  });
});

describe('put', () => {
  before(() => {
    const fakeServer = nock('https://www.example.com');

    fakeServer.put('/api/items/6').reply(200, { name: 'New name' });
    fakeServer.put('/api/items/6').reply(200, { name: 'New name' });
  });

  it('sends a put request', async () => {
    const response = await http.put({
      url: 'https://www.example.com/api/items/6',
      data: { name: 'New name' },
    })();

    expect(Object.keys(response)).to.eql(
      ['status', 'statusText', 'headers', 'config', 'request', 'data'],
      'look like an axios response'
    );

    expect(response.status).to.eql(200);
    expect(response.data).to.eql({ name: 'New name' });
  });

  it('expands all references', async () => {
    const initialState = { id: 6 };

    const response = await http.put({
      url: state => `https://www.example.com/api/items/${state.id}`,
      data: { name: 'New name' },
    })(initialState);

    expect(response.status).to.eql(200);
    expect(response.data).to.eql({ name: 'New name' });
  });
});

describe('patch', () => {
  before(() => {
    const fakeServer = nock('https://www.example.com');

    fakeServer.patch('/api/items/6').reply(200, { name: 'New name' });
    fakeServer.patch('/api/items/6').reply(200, { name: 'New name' });
  });

  it('sends a patch request', async () => {
    const response = await http.patch({
      url: 'https://www.example.com/api/items/6',
      data: { name: 'New name' },
    })();

    expect(Object.keys(response)).to.eql(
      ['status', 'statusText', 'headers', 'config', 'request', 'data'],
      'look like an axios response'
    );

    expect(response.status).to.eql(200);
    expect(response.data).to.eql({ name: 'New name' });
  });

  it('expands all references', async () => {
    const initialState = { id: 6 };

    const response = await http.patch({
      url: state => `https://www.example.com/api/items/${state.id}`,
      data: { name: 'New name' },
    })(initialState);

    expect(response.status).to.eql(200);
    expect(response.data).to.eql({ name: 'New name' });
  });
});

describe('options', () => {
  before(() => {
    const fakeServer = nock('https://www.example.com');
    fakeServer.options('/api/items').reply(
      200,
      {},
      {
        allow: 'OPTIONS, GET, HEAD, POST',
        'content-type': 'application/json',
      }
    );
    fakeServer.options('/api/items').reply(
      200,
      {},
      {
        allow: 'OPTIONS, GET, HEAD, POST',
        'content-type': 'application/json',
      }
    );
  });

  it('sends a options request', async () => {
    const response = await http.options({
      url: 'https://www.example.com/api/items',
      data: {},
    })();

    expect(Object.keys(response)).to.eql(
      ['status', 'statusText', 'headers', 'config', 'request', 'data'],
      'look like an axios response'
    );

    expect(response.status).to.eql(200);
    expect(response.data).to.eql({});
    expect(response.headers).to.eql({
      allow: 'OPTIONS, GET, HEAD, POST',
      'content-type': 'application/json',
    });
  });
});

describe('get', () => {
  before(() => {
    const fakeServer = nock('https://www.example.com');
    fakeServer.get('/api/items/6').reply(200, { name: 'Some Name' });
    fakeServer.get('/api/items/6').reply(200, { name: 'Some Name' });
    fakeServer.post('/api/ssl').reply(200, 'Nice cert!');
  });

  it('sends a get request', async () => {
    const response = await http.get({
      url: 'https://www.example.com/api/items/6',
    })();

    expect(Object.keys(response)).to.eql(
      ['status', 'statusText', 'headers', 'config', 'request', 'data'],
      'look like an axios response'
    );

    expect(response.status).to.eql(200);
    expect(response.data).to.eql({ name: 'Some Name' });
  });

  it('expands all references', async () => {
    const initialState = { id: 6 };

    const response = await http.get({
      url: state => `https://www.example.com/api/items/${state.id}`,
      data: { name: 'Some Name' },
    })(initialState);

    expect(response.status).to.eql(200);
    expect(response.data).to.eql({ name: 'Some Name' });
  });

  it('allows users to pass https agent options via `agentOptions`', async () => {
    let initialState = { configuration: { privateKey: '123' } };

    const response = await http.post({
      url: 'https://www.example.com/api/ssl',
      data: { name: 'Some Name' },
      agentOptions: { ca: initialState.configuration.privateKey },
    })(initialState);

    expect(response.status).to.eql(200);
    expect(response.data).to.eql('Nice cert!');

    expect(response.config.httpsAgent.options).to.eql({
      ca: '123',
      noDelay: true,
      path: null,
    });
  });
});
