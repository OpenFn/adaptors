import { expect } from 'chai';
import { createServer } from '../src/mock.js';
import { setMockClient } from '../src/collections.js';
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
      api.upsert(COLLECTION, key, value);
    }
  } else {
    api.upsert(COLLECTION, 'x', { id: 'x' });
  }

  const state = {
    configuration: {
      collections_token: 'x.y.z',
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

      const item = api.byKey(COLLECTION, key);
      expect(item).not.to.be.undefined;
      expect(item).to.eql(value);
    })(state);

    expect(count).to.eql(3);
  });

  it('should iterate over some items', async () => {
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

  it('should get a single item', async () => {
    const { state } = init();

    const result = await collections.get(COLLECTION, 'x')(state);

    expect(result.data).to.eql({
      key: 'x',
      value: { id: 'x' },
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

    const result = api.byKey(COLLECTION, key);
    expect(result).to.eql(item);
  });

  it('should set multiple items with a key generator', async () => {
    const { state } = init();

    const items = [{ id: 'x' }, { id: 'z' }];
    const keygen = item => item.id;

    await collections.set(COLLECTION, keygen, items)(state);

    const x = api.byKey(COLLECTION, items[0].key);
    expect(x).to.eql(items[0].value);

    const y = api.byKey(COLLECTION, items[1].key);
    expect(y).to.eql(items[1].value);
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
    expect(result).to.eql(undefined);
  });
});

describe('utils', () => {
  it('should map known query values', () => {
    const input = {
      createdBefore: '1',
      createdAfter: '1',
      updatedBefore: '1',
      updatedAfter: '1',
    };
    const mapped = collections.parseQuery({ query: input });
    expect(mapped).to.eql({
      created_before: '1',
      created_after: '1',
      updated_before: '1',
      updated_after: '1',
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
