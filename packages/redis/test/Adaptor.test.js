import { expect } from 'chai';

import { get, set, hget, hset, hGetAll, scan, setMockClient } from '../src';

describe('get', () => {
  before(async () => {
    const client = {
      get: () => {
        return Promise.resolve('ok');
      },
      set: () => {
        return Promise.resolve('');
      },
    };
    setMockClient(client);
  });

  it('should get the string value of a key', async () => {
    const state = {};
    get('key')(state).then(state => {
      expect(state.data).to.eql('ok');
    });
  });
});
