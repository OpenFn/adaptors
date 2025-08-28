import { expect, assert } from 'chai';
import { listLibraries } from '../src/Adaptor.js';
import { enableMockClient } from '@openfn/language-common/util';

const testServer = enableMockClient('https://api.mementodatabase.com');
const state = {
  configuration: {
    token: 'user-api-token',
  },
};

describe('Adaptor', () => {
  it('lists libraries', async () => {
    testServer
      .intercept({
        path: '/v1/libraries',
        query: { token: 'user-api-token' },
      })
      .reply(200, {
        libraries: [],
      });

    const { data } = await listLibraries()(state);

    expect(data).to.eql({
      libraries: [],
    });
  });
});
