import { expect } from 'chai';
import { mockEntriesPagination } from './helpers';
import { listLibraries, getEntries } from '../src/Adaptor.js';
import { enableMockClient } from '@openfn/language-common/util';

const testServer = enableMockClient('https://api.mementodatabase.com');
const state = {
  configuration: {
    token: 'user-api-token',
  },
};

describe('Adaptor', () => {
  describe('listLibraries', () => {
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
  describe('getEntries', () => {
    it('should fetch all entries', async () => {
      const pageSize = 10;
      mockEntriesPagination(testServer, '/v1/libraries/HyZV7AYk0/entries', {
        pageSize,
        totalPage: 11,
        fields: 'all',
      });

      const { data } = await getEntries('HyZV7AYk0', {
        pageSize,
        throttleTime: 10000,
        maxRequests: 10,
      })(state);

      expect(data.entries.length).to.eql(11);
      expect(data.nextPageToken).to.eql(undefined);
    }).timeout(6e4 + 1000);
  });
});
