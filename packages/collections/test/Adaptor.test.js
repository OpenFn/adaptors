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
const init = () => {
  api.createCollection(COLLECTION);

  api.upsert(COLLECTION, 'x', { id: 'x' });

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
});
