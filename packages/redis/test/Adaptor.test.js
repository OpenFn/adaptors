import { expect } from 'chai';

import { get, set, setMockClient } from '../src';

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

  it('should return null if key does not exist', async () => {
    const state = {};
    const client = {
      get: () => Promise.resolve(null),
    };
    setMockClient(client);

    await get('not-found')(state).then(state => {
      expect(state.data).to.eql(null);
    });
  });
  it('should set a value for a key', async () => {
    const state = {};
    const client = {
      set: () => Promise.resolve('OK'),
    };
    setMockClient(client);

    await set(
      'name',
      'kwaku'
    )(state).then(state => {
      expect(state.data).to.eql('OK');
    });
  });
});
