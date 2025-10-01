import { expect } from 'chai';
import { describe, it } from 'mocha';
import { mockEntriesPagination } from './helpers';
import { listLibraries, listEntries } from '../src/Adaptor.js';
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
      const response = {
          libraries: [
            {
              id: 'tDwmWwQn8',
              name: 'Adaptors',
              owner: 'openfn',
              createdTime: '2025-08-27T19:19:53.110Z',
              modifiedTime: '2025-08-28T13:31:38.645Z',
              revision: 3,
            },
          ],
        }
      testServer
        .intercept({
          path: '/v1/libraries',
          query: { token: 'user-api-token' },
        })
        .reply(200, response);

      const { data } = await listLibraries()(state);

      expect(data).to.eql(response);
    });
  });
  describe('listEntries', () => {
    it('should fetch all entries', async () => {
      const pageSize = 10;
      mockEntriesPagination(testServer, '/v1/libraries/HyZV7AYk0/entries', {
        pageSize,
        totalRecords: 11,
        fields: 'all',
      });

      // Reducing throttleTime for faster test execution
      const testConfig = { throttleTime: 10000 };

      const { data } = await listEntries('HyZV7AYk0', {
        pageSize,
        ...testConfig,
      })(state);

      expect(data.entries.length).to.eql(11);
      expect(data.nextPageToken).to.eql(undefined);
    }).timeout(6e4 + 1000);
  });
});
