import { expect } from 'chai';
import { describe, it } from 'mocha';
import { mockEntries, mockEntriesPagination } from './helpers';
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
    it.only('should fetch all entries', async () => {
      const totalRecords = 11;
      const pageSize = 10;

      const listEntriesQuery = {
        token: 'user-api-token',
        fields: 'all',
        pageSize,
      };

      let requestsCount = 0;
      let rateLimitCount = 0;

      // First 10 requests are successful
      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries',
          method: 'GET',
          query: listEntriesQuery,
        })
        .reply(200, req => {
          requestsCount++;
          return mockEntries(totalRecords, pageSize);
        })
        .times(10);

      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries',
          method: 'GET',
          query: listEntriesQuery,
        })
        .reply(403, req => {
          requestsCount++;
          rateLimitCount++;
          expect(requestsCount).to.eql(11);
          return {
            description: 'API rate limit exceeded',
            code: 403,
          };
        })
        .times(1);

      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries',
          method: 'GET',
          query: { ...listEntriesQuery, pageToken: pageSize + 1 },
        })
        .reply(403, req => {
          requestsCount++;
          rateLimitCount++;
          return { description: 'API rate limit exceeded', code: 403 };
        })
        .times(10);

      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries',
          method: 'GET',
          query: listEntriesQuery,
        })
        .reply(200, req => {
          requestsCount++;
          return mockEntries(totalRecords, pageSize);
        })
        .times(1);

      // After throttleTime, Requests are successful again
      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries',
          method: 'GET',
          query: { ...listEntriesQuery, pageToken: pageSize + 1 },
        })
        .reply(200, req => {
          requestsCount++;
          const nextPage = parseInt(req.query.pageToken, 10) + 1;
          return mockEntries(totalRecords, pageSize, nextPage);
        })
        .times(10);

      const startTime = Date.now();
      const numberOfRequests = 11;
      const throttleTime = 1e3; // Reduced for faster test execution
      const requests = Array(numberOfRequests)
        .fill()
        .map(() =>
          listEntries('HyZV7AYk0', { pageSize: 10, throttleTime })(state)
        );
      const results = await Promise.all(requests);
      const totalTime = Date.now() - startTime;

      results.forEach(result => {
        expect(result.data.entries.length).to.be.greaterThanOrEqual(10);
      });

      // Ensure calls were spread over throttleTime due to rate limiting
      expect(totalTime).to.be.greaterThanOrEqual(throttleTime);
      expect(requestsCount).to.eql(10);
      expect(requestsCount).to.eql(30);
    }).timeout(6e4);

    it('should handle concurrent requests when hitting rate limits', async () => {
      const totalRecords = 10;
      const pageSize = 10;

      const listEntriesQuery = {
        token: 'user-api-token',
        fields: 'all',
        pageSize,
      };

      let requestsCount = 0;
      // First 10 requests are successful
      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries',
          method: 'GET',
          query: listEntriesQuery,
        })
        .reply(200, req => {
          requestsCount++;
          return mockEntries(totalRecords, pageSize);
        })
        .times(10);

      // Request 11 is rate limited
      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries',
          method: 'GET',
          query: listEntriesQuery,
        })
        .reply(403, req => {
          requestsCount++;
          expect(requestsCount).to.eql(11);
          return { description: 'API rate limit exceeded', code: 403 };
        });

      // After throttleTime, Request 12 is successful again
      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries',
          method: 'GET',
          query: listEntriesQuery,
        })
        .reply(200, req => {
          requestsCount++;
          expect(requestsCount).to.eql(12);
          return mockEntries(totalRecords, pageSize);
        });

      const startTime = Date.now();
      const numberOfRequests = 11;
      const throttleTime = 6e3; // Reduced for faster test execution
      const requests = Array(numberOfRequests)
        .fill()
        .map(() =>
          listEntries('HyZV7AYk0', { pageSize: 10, throttleTime })(state)
        );
      const results = await Promise.all(requests);
      const totalTime = Date.now() - startTime;

      results.forEach(result => {
        expect(result.data.entries.length).to.be.greaterThanOrEqual(10);
      });

      // Ensure calls were spread over throttleTime due to rate limiting
      expect(totalTime).to.be.greaterThanOrEqual(throttleTime);
      expect(requestsCount).to.eql(12);
    }).timeout(6e4);
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

      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0',
          method: 'GET',
          query: { token: 'user-api-token' },
        })
        .reply(200, response);

      const { data } = await getFields('HyZV7AYk0')(state);

      expect(data).to.eql(response);
    });
  });
});
