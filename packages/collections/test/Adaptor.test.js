import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { createServer } from './mock/server.js';
import { setMockClient } from '../src/collections.js';
import * as collections from '../src/collections.js';

// This creates a mock client which acts like a fake server.
// It enables pattern-matching on the request object and custom responses
// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
const testServer = enableMockClient('https://fake.server.com');

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
    configuration: {},
  };
  return { state };
};

describe('get', () => {
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
