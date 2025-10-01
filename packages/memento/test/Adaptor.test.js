import { expect } from 'chai';
import { describe, it } from 'mocha';
import { mockEntriesPagination } from './helpers';
import {
  listLibraries,
  listEntries,
  createEntry,
  updateEntry,
  getFields,
} from '../src';
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
      };
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
  describe('createEntry', () => {
    it('creates an entry', async () => {
      const response = {
        id: 'KmtiUVZ0ZEgzUyVoVW1pIyNKNCY',
        author: 'openfn',
        createdTime: '2025-10-01T09:43:33.599Z',
        modifiedTime: '2025-10-01T09:43:33.599Z',
        status: 'active',
        revision: 29,
        size: 14,
        fields: [],
      };
      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries',
          method: 'POST',
          query: { token: 'user-api-token' },
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            fields: [
              {
                value: 'Bukayo',
                id: 1,
              },
            ],
          }),
        })
        .reply(201, response);

      const { data } = await createEntry('HyZV7AYk0', {
        fields: [
          {
            value: 'Bukayo',
            id: 1,
          },
        ],
      })(state);

      expect(data).to.eql(response);
    });
  });

  describe('updateEntry', () => {
    it('updates an entry', async () => {
      const response = {
        id: 'KmtiUVZ0ZEgzUyVoVW1pIyNKNCY',
        author: 'openfn',
        createdTime: '2025-10-01T09:43:33.599Z',
        modifiedTime: '2025-10-01T09:43:33.599Z',
        status: 'active',
        revision: 29,
        size: 14,
        fields: [],
      };
      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries/T0xIYmE-V2QoMmRTWF1sVVJUKnU',
          method: 'PUT',
          query: { token: 'user-api-token' },
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            fields: [
              {
                value: 'Bukayo',
                id: 1,
              },
            ],
          }),
        })
        .reply(200, response);

      const { data } = await updateEntry(
        'HyZV7AYk0',
        'T0xIYmE-V2QoMmRTWF1sVVJUKnU',
        {
          fields: [
            {
              value: 'Bukayo',
              id: 1,
            },
          ],
        }
      )(state);

      expect(data).to.eql(response);
    });
  });
  describe('getFields', () => {
    it.only('retrieves library fields', async () => {
      const response = {
        fields: [
          {
            id: 1,
            name: 'Date',
            type: 'date',
            role: 'status',
            order: 0,
          },
        ],
      };

      testServer.intercept({
        path: '/v1/libraries/HyZV7AYk0',
        method: 'GET',
        query: { token: 'user-api-token' },
      }).reply(200, response);

      const { data } = await getFields('HyZV7AYk0')(state);

      expect(data).to.eql(response);
    });
  });
});
