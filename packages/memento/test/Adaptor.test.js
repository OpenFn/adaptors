import { expect } from 'chai';
import { describe, it } from 'mocha';
import { mockEntries } from './helpers.js';
import {
  listLibraries,
  listEntries,
  createEntry,
  updateEntry,
  getFields,
} from '../src/index.js';
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
    it('should handle concurrent requests when hitting rate limits', async () => {
      const totalRecords = 11;
      const pageSize = 10;

      let requestCount = 0;
      let totalRequests = 0;
      let rateLimitCount = 0;
      let successfulRequests = 0;
      const maxRequests = 10;
      const throttleTime = 2e3; // 1 second for testing

      let lastThrottleTime = null;

      testServer
        .intercept({
          path: /\/v1\/libraries\/HyZV7AYk2\/entries/,
          method: 'GET',
        })
        .reply(req => {
          totalRequests++;
          requestCount++;
          const currentTime = Date.now();

          // If we hit max requests, start throttling
          if (requestCount > maxRequests && !lastThrottleTime) {
            lastThrottleTime = currentTime;
            rateLimitCount++;
            return {
              statusCode: 403,
              data: {
                description: 'API rate limit exceeded',
                code: 403,
              },
              responseOptions: {
                headers: { 'content-type': 'application/json' },
              },
            };
          }

          // Continue returning 403 during throttle period
          const progressTime = currentTime - lastThrottleTime;
          if (requestCount > maxRequests && progressTime < throttleTime) {
            rateLimitCount++;

            return {
              statusCode: 403,
              data: {
                description: 'API rate limit exceeded',
                code: 403,
              },
              responseOptions: {
                headers: { 'content-type': 'application/json' },
              },
            };
          }

          // Reset requestCount and throttle timer if we're past the throttle period
          if (lastThrottleTime && progressTime > throttleTime) {
            lastThrottleTime = null;
            requestCount = 0;
          }

          successfulRequests++;
          const pageToken = parseInt(req.query.pageToken, 10) || 0;

          return {
            statusCode: 200,
            data: mockEntries(totalRecords, pageSize, pageToken),
            responseOptions: {
              headers: { 'content-type': 'application/json' },
            },
          };
        })
        .times(60); // Allow up to 60 requests for the test

      const startTime = Date.now();
      const concurrentRequests = 11;

      // Create 11 concurrent requests
      const requests = Array(concurrentRequests)
        .fill()
        .map(() =>
          listEntries('HyZV7AYk2', { pageSize: 10, throttleTime })(state)
        );

      const results = await Promise.all(requests);
      const totalTime = Date.now() - startTime;

      // Verify all requests returned the expected data
      results.forEach(result => {
        expect(result.data.entries.length).to.eq(11);
      });

      console.log(`Total time: ${totalTime}ms`);

      expect(successfulRequests).to.eq(33);
      expect(totalRequests).to.greaterThanOrEqual(56);
      expect(rateLimitCount).to.greaterThanOrEqual(23);
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
    it('retrieves library fields', async () => {
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
