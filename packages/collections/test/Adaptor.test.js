import { expect } from 'chai';
import { MockAgent } from 'undici';
import { createServer } from '../src/mock.js';
import { setMockClient, streamResponse } from '../src/collections.js';
import * as collections from '../src/collections.js';

const client = createServer();
const { api } = client;

setMockClient(client);

const COLLECTION = 'my-collection';

afterEach(() => {
  api.reset();
});

// Set up a simple collection with some defaults
const init = items => {
  api.createCollection(COLLECTION);

  if (items) {
    for (const [key, value] of items) {
      api.upsert(COLLECTION, key, JSON.stringify(value));
    }
  } else {
    api.upsert(COLLECTION, 'x', JSON.stringify({ id: 'x' }));
  }

  const state = {
    configuration: {
      collections_token: 'x.y.z',
      collections_endpoint: 'https://app.openfn.org/collections',
    },
  };
  return { state };
};

describe('each', () => {
  it('should throw if no access token', async () => {
    const { state } = init();
    state.configuration = {};

    let err;
    try {
      await collections.each(COLLECTION, 'x', state => state)(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.eql('INVALID_AUTH');
  });

  it('should iterate over all items', async () => {
    const { state } = init([
      ['a', { id: 'a' }],
      ['b', { id: 'b' }],
      ['c', { id: 'c' }],
    ]);

    let count = 0;

    await collections.each(COLLECTION, '*', (state, value, key) => {
      count++;
      expect(state).to.eql(state);

      const item = JSON.parse(api.byKey(COLLECTION, key));
      expect(item).not.to.be.undefined;
      expect(item).to.eql(value);
    })(state);

    expect(count).to.eql(3);
  });

  it('should iterate over some items with a key pattern', async () => {
    const { state } = init([
      ['az', { id: 'a' }],
      ['bz', { id: 'b' }],
      ['cz', { id: 'c' }],
    ]);

    let count = 0;

    await collections.each(COLLECTION, 'b*', (_state, value, key) => {
      count++;
      expect(key).to.eql('bz');
      expect(value).to.eql({ id: 'b' });
    })(state);

    expect(count).to.eql(1);
  });

  it('should iterate over some items with an object query', async () => {
    const { state } = init([
      ['az', { id: 'a' }],
      ['bz', { id: 'b' }],
      ['cz', { id: 'c' }],
    ]);

    let count = 0;

    await collections.each(COLLECTION, { key: 'b*' }, (_state, value, key) => {
      count++;
      expect(key).to.eql('bz');
      expect(value).to.eql({ id: 'b' });
    })(state);

    expect(count).to.eql(1);
  });

  it('should respect the item limit', async () => {
    const { state } = init([
      ['bz1', { id: 'a' }],
      ['bz2', { id: 'b' }],
      ['bz3', { id: 'c' }],
      ['bz4', { id: 'd' }],
    ]);

    let count = 0;

    await collections.each(
      COLLECTION,
      { key: 'b*', limit: 2 },
      (_state, value, key) => {
        count++;
        expect(key).to.match(/(bz1|bz2)/);
      }
    )(state);

    expect(count).to.eql(2);
  });

  it('should support an async callback', async () => {
    const { state } = init([
      ['az', { id: 'a' }],
      ['cz', { id: 'c' }],
    ]);

    const wait = () => new Promise(resolve => setTimeout(resolve, 100));
    let start = Date.now();
    await collections.each(COLLECTION, '*', () => wait())(state);

    expect(Date.now() - start).to.be.greaterThan(100);
  });

  it('should write the cursor back to state', async () => {
    const { state } = init([
      ['az', { id: 'a' }],
      ['cz', { id: 'c' }],
    ]);

    await collections.each(COLLECTION, { key: '*', limit: 1 })(state);

    expect(state.data.cursor).to.equal('1');
  });
});

describe('get', () => {
  it('should throw if no access token', async () => {
    const { state } = init();
    state.configuration = {};

    let err;
    try {
      await collections.get(COLLECTION, 'x')(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.eql('INVALID_AUTH');
  });

  it('should get a single item with string query', async () => {
    const { state } = init();

    const result = await collections.get(COLLECTION, 'x')(state);

    expect(result.data).to.eql({
      id: 'x',
    });
  });

  it('should get a single item with object query', async () => {
    const { state } = init();

    const result = await collections.get(COLLECTION, { key: 'x' })(state);

    expect(result.data).to.eql({
      id: 'x',
    });
  });

  it('should get all items', async () => {
    const { state } = init([
      ['a', { id: 'a' }],
      ['b', { id: 'b' }],
      ['c', { id: 'c' }],
    ]);

    const result = await collections.get(COLLECTION, '*')(state);

    expect(result.data.length).to.equal(3);
    expect(result.data[0].key).to.eql('a');
    expect(result.data[1].key).to.eql('b');
    expect(result.data[2].key).to.eql('c');
  });

  it('should get all items across multiple pages', async () => {
    const items = new Array(200)
      .fill(0)
      .map((_v, idx) => [`${idx}`, { v: idx }]);
    const { state } = init(items);

    const result = await collections.get(COLLECTION, {
      query: '*',
      pageSize: 30,
    })(state);

    expect(result.data.length).to.equal(200);
    const allKeys = items.map(i => i[0]);
    const returnedKeys = result.data.map(v => v.key);

    expect(allKeys).to.eql(returnedKeys);
  });

  it('should get some items across multiple pages (but not a full final page)', async () => {
    const items = new Array(200)
      .fill(0)
      .map((_v, idx) => [`${idx}`, { v: idx }]);
    const { state } = init(items);

    const result = await collections.get(COLLECTION, {
      query: '*',
      pageSize: 100,
      limit: 150,
    })(state);

    expect(result.data.length).to.equal(150);

    const allKeys = items.slice(0, 150).map(i => i[0]);
    const returnedKeys = result.data.map(v => v.key);

    expect(allKeys).to.eql(returnedKeys);
  });

  // TODO query must default to *

  it('should get with a limit', async () => {
    const { state } = init([
      ['a', { id: 'a' }],
      ['b', { id: 'b' }],
      ['c', { id: 'c' }],
    ]);

    const result = await collections.get(COLLECTION, { key: '*', limit: 2 })(
      state
    );

    expect(result.data.length).to.equal(2);
    expect(result.data[0].key).to.eql('a');
    expect(result.data[1].key).to.eql('b');
  });

  it('should get some items', async () => {
    const { state } = init([
      ['a-1', { id: 'a' }],
      ['b-2', { id: 'b' }],
      ['c-3', { id: 'c' }],
    ]);

    const result = await collections.get(COLLECTION, 'b*')(state);

    expect(result.data).to.eql([
      {
        key: 'b-2',
        value: { id: 'b' },
      },
    ]);
  });

  it('should write the cursor to state', async () => {
    const { state } = init([
      ['a-1', { id: 'a' }],
      ['b-2', { id: 'b' }],
      ['c-3', { id: 'c' }],
    ]);

    const result = await collections.get(COLLECTION, { key: 'b*', limit: 1 })(
      state
    );

    expect(result.data.cursor).to.eql('2');
  });

  it('should expand references', async () => {
    const { state } = init([
      ['a-1', { id: 'a' }],
      ['b-2', { id: 'b' }],
      ['c-3', { id: 'c' }],
    ]);

    const result = await collections.get(
      () => COLLECTION,
      () => 'b*'
    )(state);

    expect(result.data).to.eql([
      {
        key: 'b-2',
        value: { id: 'b' },
      },
    ]);
  });

  it('should accept a query object with key', async () => {
    const { state } = init([
      ['a-1', { id: 'a' }],
      ['b-2', { id: 'b' }],
      ['c-3', { id: 'c' }],
    ]);

    const result = await collections.get(COLLECTION, { key: 'b*' })(state);

    expect(result.data).to.eql([
      {
        key: 'b-2',
        value: { id: 'b' },
      },
    ]);
  });

  // TODO support query operators (and throw for invalid values)
});

describe('set', () => {
  it('should throw if no access token', async () => {
    const { state } = init();
    state.configuration = {};

    let err;
    try {
      await collections.set(COLLECTION, 'x', {})(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.eql('INVALID_AUTH');
  });

  it('should set a single item', async () => {
    const { state } = init();

    const key = 'x';
    const item = { id: 'x' };

    await collections.set(COLLECTION, key, item)(state);

    const result = api.asJSON(COLLECTION, key);
    expect(result).to.eql(item);
  });

  it('should set multiple items with a key generator', async () => {
    const { state } = init();

    const items = [{ id: 'x' }, { id: 'z' }];
    const keygen = item => item.id;

    await collections.set(COLLECTION, keygen, items)(state);

    const x = api.asJSON(COLLECTION, items[0].id);
    expect(x).to.eql(items[0]);

    const y = api.asJSON(COLLECTION, items[1].id);
    expect(y).to.eql(items[1]);
  });
});

describe('remove', () => {
  it('should throw if no access token', async () => {
    const { state } = init();
    state.configuration = {};

    let err;
    try {
      await collections.remove(COLLECTION, 'x')(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.eql('INVALID_AUTH');
  });

  it('should remove an item', async () => {
    const { state } = init();
    api.upsert(COLLECTION, 'x', { id: 'x' });

    await collections.remove(COLLECTION, 'x')(state);

    const result = api.byKey(COLLECTION, 'x');
    expect(result).to.be.undefined;
  });

  it('should remove several items', async () => {
    const { state } = init();
    api.upsert(COLLECTION, 'x', { id: 'x' });
    api.upsert(COLLECTION, 'y', { id: 'y' });

    await collections.remove(COLLECTION, '*')(state);

    const x = api.byKey(COLLECTION, 'x');
    expect(x).to.be.undefined;
    const y = api.byKey(COLLECTION, 'y');
    expect(y).to.be.undefined;
  });
});

describe('utils', () => {
  it('should map known query values', () => {
    const input = {
      createdBefore: '1',
      createdAfter: '1',
    };
    const mapped = collections.parseQuery({ query: input });
    expect(mapped).to.eql({
      created_before: '1',
      created_after: '1',
    });
  });

  it('should preserver other query values', () => {
    const input = {
      created_before: '1',
      created_after: '1',
      updated_before: '1',
      updated_after: '1',
      foo: 'x',
    };
    const mapped = collections.parseQuery({ query: input });
    expect(mapped).to.eql({
      created_before: '1',
      created_after: '1',
      updated_before: '1',
      updated_after: '1',
      foo: 'x',
    });
  });
});

describe('streamResponse', () => {
  let client;

  before(() => {
    const mockAgent = new MockAgent({ connections: 1 });
    mockAgent.disableNetConnect();
    client = mockAgent.get('https://app.openfn.org');
  });

  it('should stream a response with an item and cursor', async () => {
    client.intercept({ path: '/collections/my-collection' }).reply(200, {
      cursor: 'b',
      items: [
        {
          key: 'a',
          value: 'str',
        },
      ],
    });

    const response = await client.request({
      method: 'GET',
      path: '/collections/my-collection',
    });

    let callbackValue;
    const cursor = await streamResponse(response, ({ key, value }) => {
      callbackValue = value;
    });

    expect(callbackValue).to.eql('str');
    expect(cursor).to.equal('b');
  });

  it('should stream a response with an item and null cursor', async () => {
    client.intercept({ path: '/collections/my-collection' }).reply(200, {
      cursor: null,
      items: [
        {
          key: 'a',
          value: 'str',
        },
      ],
    });

    const response = await client.request({
      method: 'GET',
      path: '/collections/my-collection',
    });

    let callbackValue;
    const cursor = await streamResponse(response, ({ key, value }) => {
      callbackValue = value;
    });

    expect(callbackValue).to.eql('str');
    expect(cursor).to.equal(null);
  });

  it('should handle the cursor key coming last', async () => {
    client.intercept({ path: '/collections/my-collection' }).reply(200, {
      items: [
        {
          key: 'a',
          value: 'str',
        },
      ],
      cursor: 'b',
    });

    const response = await client.request({
      method: 'GET',
      path: '/collections/my-collection',
    });

    let callbackValue;
    const cursor = await streamResponse(response, ({ key, value }) => {
      callbackValue = value;
    });

    expect(callbackValue).to.eql('str');
    expect(cursor).to.equal('b');
  });

  it('should handle key value pairs in a different order', async () => {
    client.intercept({ path: '/collections/my-collection' }).reply(200, {
      items: [
        {
          value: 'str',
          key: 'a',
        },
      ],
      cursor: 'b',
    });

    const response = await client.request({
      method: 'GET',
      path: '/collections/my-collection',
    });

    let callbackValue;
    const cursor = await streamResponse(response, ({ key, value }) => {
      callbackValue = value;
    });

    expect(callbackValue).to.eql('str');
    expect(cursor).to.equal('b');
  });
});
