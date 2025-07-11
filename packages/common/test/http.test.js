import { expect, assert } from 'chai';
import { request, get, post, options } from '../src/http';
import { assertRelativeUrl, enableMockClient } from '../src/util/http';

const client = enableMockClient('https://a.com', {
  defaultContentType: 'text',
});

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

  it('should not override existing headers with json()', () => {
    const opts = { headers: { x: 1 } };

    const result = options(opts).json();
    expect(result).to.eql({
      headers: {
        x: 1,
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

describe('assertRelativeUrl', () => {
  specify('https://www.test.com is absolute', () => {
    assert.throws(
      () => assertRelativeUrl('https://www.test.com'),
      'UNEXPECTED_ABSOLUTE_URL'
    );
  });

  specify('http://www.test.com is absolute', () => {
    assert.throws(
      () => assertRelativeUrl('http://www.test.com'),
      'UNEXPECTED_ABSOLUTE_URL'
    );
  });

  specify('x/y/z is relative', () => {
    assert.doesNotThrow(() => assertRelativeUrl('x/y/z'));
  });

  specify('/x/y/z is relative', () => {
    assert.doesNotThrow(() => assertRelativeUrl('/x/y/z'));
  });

  specify('www.x.com is treated as relative', () => {
    assert.doesNotThrow(() => assertRelativeUrl('www.x.com'));
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

    const state = {};
    const { response, data } = await request(
      'TEST',
      'https://a.com/api/1'
    )(state);

    expect(data).to.eql({ ok: true });
    expect(response.statusCode).to.eql(200);
  });

  it('should request with a query', async () => {
    mock('/api/2', { method: 'GET', query: { jam: 'jar' } });

    const { response, data } = await request('GET', 'https://a.com/api/2', {
      query: { jam: 'jar' },
    })();

    expect(data).to.eql({ ok: true });
    expect(response.statusCode).to.eql(200);
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

    const { response, data } = await request(
      'GET',
      'https://a.com/api/4',
      options().basic('u', 'p')
    )();

    expect(data).to.eql({ ok: true });
    expect(response.statusCode).to.eql(200);
  });

  it('should expand references', async () => {
    mock('/api/5', { method: 'PATCH' });

    const { response, data } = await request(
      () => 'PATCH',
      () => 'https://a.com/api/5',
      () => ({ body: { x: 'y' } })
    )();

    expect(data).to.eql({ x: 'y' });
    expect(response.statusCode).to.eql(200);
  });
});

// Again, only super light testing of the API surface
describe('get()', () => {
  it('should make a simple get request', async () => {
    mock('/api/100', { query: { name: 'lamine' } });

    const { response, data } = await get('https://a.com/api/100', {
      query: { name: 'lamine' },
    })();

    expect(data).to.eql({ ok: true });
    expect(response.statusCode).to.eql(200);
  });
});

describe('post()', () => {
  it('should make a simple post request', async () => {
    mock('/api/101', { method: 'POST' });

    const { response, data } = await post('https://a.com/api/101', {
      name: 'lamine',
    })();

    expect(data).to.eql({ name: 'lamine' });
    expect(response.statusCode).to.eql(200);
  });
});
