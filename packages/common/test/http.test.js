import { expect } from 'chai';
import { request, get, post, options } from '../src/http';
import { enableMockClient } from '../src/util/http';

const client = enableMockClient('https://a.com');

describe('options', () => {
  it('should return an object', () => {
    const opts = { a: 1, b: 2, c: 3 };

    const result = options(opts);

    expect(result).to.eql(opts);
  });

  it('should return a default object', () => {
    const opts = {};

    const result = options();

    expect(result).to.eql(opts);
  });

  it('should return an object with no keys', () => {
    const result = options();

    expect(Object.keys(result)).to.eql([]);
  });

  it('should return an object with no keys', () => {
    const keys = [];
    const result = options();
    for (const key in result) {
      keys.push(key);
    }

    expect(keys).to.eql([]);
  });

  it('should work with json()', () => {
    const opts = { a: 1 };

    const result = options(opts).json();
    expect(result).to.eql({
      a: 1,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should work with basic()', () => {
    const opts = { a: 1 };

    const result = options(opts).basic('u', 'p');

    expect(result).to.eql({
      a: 1,
      headers: {
        Authorization: 'Basic dTpw',
      },
    });
  });

  it('should work with oauth', () => {
    const opts = { a: 1 };

    const result = options(opts).oauth('abc');

    expect(result).to.eql({
      a: 1,
      headers: {
        Authorization: 'Bearer abc',
      },
    });
  });

  it('should work with bearer', () => {
    const opts = { a: 1 };

    const result = options(opts).bearer('x.y.z');

    expect(result).to.eql({
      a: 1,
      headers: {
        Authorization: 'Bearer x.y.z',
      },
    });
  });

  it('should allow chaining', () => {
    const opts = { a: 1 };

    const result = options(opts).basic('u', 'p').json();

    expect(result).to.eql({
      a: 1,
      headers: {
        Authorization: 'Basic dTpw',
        'Content-Type': 'application/json',
      },
    });
  });
});

const mock = (path, req = {}, res = {}) => {
  const responseHeaders = Object.assign(
    { 'Content-Type': 'application/json' },
    res.headers
  );

  return client
    .intercept({
      path,
      method: req.method || 'GET',
      headers: req.headers,
      query: req.query,
    })
    .reply(r => ({
      statusCode: res.code || 200,
      data: res.body ?? r.body ?? { ok: true },
      responseOptions: {
        headers: responseHeaders,
      },
    }));
};

// Beacuse request is just a wrapper around util.request, it is only tested very lightly
describe('request()', () => {
  it('should make a successful arbitary request', async () => {
    mock('/api/1', { method: 'TEST' });

    const result = await request('TEST', 'https://a.com/api/1')();

    expect(result.body).to.eql({ ok: true });
    expect(result.statusCode).to.eql(200);
  });

  it('should request with a query', async () => {
    mock('/api/2', { method: 'GET', query: { jam: 'jar' } });

    const result = await request('GET', 'https://a.com/api/2', {
      query: { jam: 'jar' },
    })();

    expect(result.body).to.eql({ ok: true });
    expect(result.statusCode).to.eql(200);
  });

  it('should throw for a 404', async () => {
    mock('/api/3', {}, { code: 404 });

    let error;
    try {
      await request('GET', 'https://a.com/api/3')();
    } catch (e) {
      error = e;
    }

    expect(error.statusCode).to.eql(404);
    expect(error.statusMessage).to.eql('Not Found');
  });

  it('should request with basic auth', async () => {
    mock('/api/4', {
      method: 'GET',
      headers: {
        Authorization: 'Basic dTpw',
      },
    });

    const result = await request(
      'GET',
      'https://a.com/api/4',
      options().basic('u', 'p')
    )();

    expect(result.body).to.eql({ ok: true });
    expect(result.statusCode).to.eql(200);
  });

  it('should expand references', async () => {
    mock('/api/5', { method: 'PATCH' });

    const result = await request(
      () => 'PATCH',
      () => 'https://a.com/api/5',
      () => ({ body: { x: 'y' } })
    )();

    expect(result.body).to.eql({ x: 'y' });
    expect(result.statusCode).to.eql(200);
  });
});

// Again, only super light testing of the API surface
describe('get()', () => {
  it('should make a simple get request', async () => {
    mock('/api/100', { query: { name: 'lamine' } });

    const result = await get('https://a.com/api/100', {
      query: { name: 'lamine' },
    })();

    expect(result.body).to.eql({ ok: true });
    expect(result.statusCode).to.eql(200);
  });
});

describe('post()', () => {
  it('should make a simple post request', async () => {
    mock('/api/101', { method: 'POST' });

    const result = await post('https://a.com/api/101', { name: 'lamine' })();

    expect(result.body).to.eql({ name: 'lamine' });
    expect(result.statusCode).to.eql(200);
  });
});
