import { expect } from 'chai';

import { get, set, hget, hset, hGetAll, scan, setMockClient } from '../src';

describe('get', () => {
  it('should get the string value of a key', async () => {
    const client = {
      get: () => {
        return Promise.resolve('ok');
      },
    };
    setMockClient(client);

    const state = {};
    await get('key')(state).then(state => {
      expect(state.data).to.eql('ok');
    });
  });
  it('should return nil if key does not exist', async () => {
    const state = {};
    const client = {
      get: () => Promise.resolve(null),
    };
    setMockClient(client);

    await get('not-found')(state).then(state => {
      expect(state.data).to.eql(null);
    });
  });
});
