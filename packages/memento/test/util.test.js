import { expect } from 'chai';
import { requestWithPagination, handleRateLimit } from '../src/util';
import { mockEntriesResponse } from './helpers';
import { enableMockClient } from '@openfn/language-common/util';

const testServer = enableMockClient('https://util.mementodatabase.com');
const state = {
  configuration: {
    baseUrl: 'https://util.mementodatabase.com',
    token: 'user-api-token',
  },
};

const reqTimestamps = length => Array.from({ length }, (_, i) => Date.now());

describe('handleRateLimit', () => {
  let originalConsoleLog;
  let consoleLogCalls;

  beforeEach(() => {
    consoleLogCalls = [];
    originalConsoleLog = console.log;
    console.log = msg => consoleLogCalls.push(msg);
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  const requestConfig = {
    throttleTime: 10000, // 10s
    maxRequests: 5,
  };

  it('should return immediately when no previous requests exist', () => {
    const result = handleRateLimit([], requestConfig);
    expect(result).to.be.undefined;
  });
  it('should delay when hasReachedLimit is true', async () => {
    const config = { ...requestConfig, hasReachedLimit: true };
    const startTime = Date.now();

    await handleRateLimit([], config);

    const duration = Date.now() - startTime;
    expect(duration).to.be.at.least(1900); // allowing small margin of error
    expect(consoleLogCalls[0]).to.equal('Rate limit exceeded, waiting 2s');
  }).timeout(1e4);

  it('should remove expired requests', () => {
    const now = Date.now();
    const requestTimes = [
      now - 11000, // expired
      now - 5000, // valid
      now - 3000, // valid
    ];

    handleRateLimit(requestTimes, requestConfig);
    expect(requestTimes).to.have.lengthOf(2);
    expect(requestTimes).to.not.include(now - 11000);
  }).timeout(1e4);

  it('should delay when max requests reached', async () => {
    const now = Date.now();
    const requestTimes = [
      now - 5000,
      now - 4000,
      now - 3000,
      now - 2000,
      now - 1000,
    ];

    const startTime = Date.now();
    await handleRateLimit(requestTimes, requestConfig);
    const duration = Date.now() - startTime;

    expect(duration).to.be.at.least(6900); // allowing small margin of error
    expect(consoleLogCalls[0]).to.match(/Rate limiting: waiting \d+\.*\d*s/);
  }).timeout(1e4);

  it('should add minimum delay between requests', async () => {
    const now = Date.now();
    const requestTimes = [now - 5000];

    const startTime = Date.now();
    await handleRateLimit(requestTimes, requestConfig);
    const duration = Date.now() - startTime;

    expect(duration).to.be.at.least(1900); // allowing small margin of error
    expect(consoleLogCalls[0]).to.equal('Waiting 2s between requests');
  }).timeout(1e4);

  it('should log appropriate messages', async () => {
    // Test rate limit exceeded
    await handleRateLimit([], { ...requestConfig, hasReachedLimit: true });
    expect(consoleLogCalls[0]).to.equal('Rate limit exceeded, waiting 2s');

    const now = Date.now();

    // Test normal delay between requests
    await handleRateLimit([now - 1000], requestConfig);
    expect(consoleLogCalls[1]).to.equal('Waiting 2s between requests');

    // Test max requests reached
    const fullRequestTimes = Array(5)
      .fill()
      .map((_, i) => now - i * 1000);
    await handleRateLimit(fullRequestTimes, requestConfig);
    expect(consoleLogCalls[2]).to.match(/Rate limiting: waiting \d+\.*\d*s/);
  }).timeout(6e4);
});

describe('requestWithPagination', () => {
  it('should handle empty response', async () => {
    testServer
      .intercept({
        path: '/v1/libraries/test/entries',
        method: 'GET',
        query: { token: 'user-api-token', pageSize: 10, fields: 'all' },
      })
      .reply(() => ({
        statusCode: 200,
        data: JSON.stringify({ entries: [], nextPage: null }),
        responseOptions: {
          headers: { 'Content-Type': 'application/json' },
        },
      }));

    const { data } = await requestWithPagination(
      state,
      'GET',
      'libraries/test/entries',
      {
        query: {
          pageSize: 10,
          fields: 'all',
        },
      }
    );

    expect(data.entries).to.be.an('array').that.is.empty;
  });

  it.only('should respect maxRequests limit', async () => {
    const maxRequests = 2;
    let requestCount = 0;

    testServer
      .intercept({
        path: '/v1/libraries/test/entries',
        query: { token: 'user-api-token', pageSize: 10, fields: 'all' },
        method: 'GET',
      })
      .reply(() => {
        requestCount++;
        const body = mockEntriesResponse(requestCount, maxRequests, 10);
        console.log('body', body);
        return {
          statusCode: 200,
          data: JSON.stringify(body),
          responseOptions: {
            headers: { 'Content-Type': 'application/json' },
          },
        };
      });

    try {
      await requestWithPagination(state, 'GET', 'libraries/test/entries', {
        maxRequests,
        query: {
          pageSize: 10,
          fields: 'all',
        },
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      console.log(error);
      // expect(error.message).to.equal('Maximum number of requests reached');
      // expect(requestCount).to.equal(maxRequests);
    }
  }).timeout(6e4);

  // it('should make correct number of requests for 101 records', async () => {
  //   const pageSize = 10;
  //   const totalRecords = 101;
  //   const expectedRequests = Math.ceil(totalRecords / pageSize); // Should be 11 requests

  //   let actualRequests = 0;

  //   // First page response
  //   testServer
  //     .intercept({
  //       path: '/v1/libraries/test/entries',
  //       method: 'GET',
  //       query: { token: 'user-api-token', pageSize, fields: 'all' },
  //     })
  //     .reply(req => {
  //       actualRequests++;
  //       const body = mockEntriesResponse(1, expectedRequests, pageSize);
  //       return {
  //         statusCode: 200,
  //         data: JSON.stringify(body),
  //         responseOptions: {
  //           headers: { 'Content-Type': 'application/json' },
  //         },
  //       };
  //     });

  //   // Subsequent pages
  //   for (let page = 2; page <= expectedRequests; page++) {
  //     testServer
  //       .intercept({
  //         path: '/v1/libraries/test/entries',
  //         method: 'GET',
  //         query: {
  //           token: 'user-api-token',
  //           pageSize,
  //           pageToken: page,
  //           fields: 'all',
  //         },
  //       })
  //       .reply(req => {
  //         actualRequests++;
  //         const body = mockEntriesResponse(page, expectedRequests, pageSize);
  //         return {
  //           statusCode: 200,
  //           data: JSON.stringify(body),
  //           responseOptions: {
  //             headers: { 'Content-Type': 'application/json' },
  //           },
  //         };
  //       });
  //   }

  //   const { data } = await requestWithPagination(
  //     state,
  //     'GET',
  //     'libraries/test/entries',
  //     {
  //       throttleTime: 1000,
  //       maxRequests: 10,
  //       query: {
  //         pageSize,
  //         fields: 'all',
  //       },
  //     }
  //   );

  //   // Verify number of requests made
  //   expect(actualRequests).to.equal(expectedRequests);

  //   // Verify we got all records
  //   expect(data.entries.length).to.equal(totalRecords);

  //   // Verify the last page was partial (only 1 record)
  //   // This depends on how your mock implementation works
  //   const lastPageSize = totalRecords % pageSize || pageSize;
  //   expect(lastPageSize).to.equal(1);
  // }).timeout(6e4);
  // it('should auto fetch all entries', async () => {
  //   const pageSize = 10;
  //   mockEntriesPagination(testServer, '/v1/libraries/HyZV7AYk0/entries', {
  //     pageSize,
  //     totalPage: 11,
  //     fields: 'all',
  //   });

  //   const { data } = await requestWithPagination(
  //     state,
  //     'GET',
  //     'libraries/HyZV7AYk0/entries',
  //     {
  //       throttleTime: 10000,
  //       maxRequests: 10,
  //       query: { pageSize, fields: 'all' },
  //     }
  //   );

  //   expect(data.entries.length).to.eql(11);
  //   expect(data.nextPageToken).to.eql(undefined);
  //   expect(data.revision).to.be.greaterThanOrEqual(0);
  // }).timeout(6e4);

  // it('should auto throttle when throttleTime and maxRequests are set', async () => {
  //   const pageSize = 10;

  //   mockEntriesPagination(testServer, '/v1/libraries/HyZV7AYk0/entries', {
  //     pageSize,
  //     totalPage: 11,
  //     fields: 'all',
  //   });

  //   const { data } = await requestWithPagination(
  //     state,
  //     'GET',
  //     'libraries/HyZV7AYk0/entries',
  //     {
  //       query: {
  //         pageSize,
  //         fields: 'all',
  //       },
  //       throttleTime: 1000,
  //       maxRequests: 10,
  //     }
  //   );
  //   expect(data.entries.length).to.eql(11);
  //   expect(data.nextPageToken).to.eql(undefined);
  // }).timeout(6e4 + 1000);
  // it('should auto throttle when requests exceed limit', async () => {
  //   const pageSize = 10;

  //   mockRateLimitExceeded(testServer, '/v1/libraries/HyZV7AYk0/entries', {
  //     pageSize,
  //     totalPage: 11,
  //     fields: 'all',
  //   });
  //   const { data } = await requestWithPagination(
  //     state,
  //     'GET',
  //     'libraries/HyZV7AYk0/entries',
  //     {
  //       throttleTime: 1000,
  //       maxRequests: 10,
  //       snoozeTime: 100, //this will force rate limit exceeded
  //       query: {
  //         pageSize,
  //         fields: 'all',
  //       },
  //     }
  //   );
  //   expect(data.entries.length).to.eql(11);
  //   expect(data.nextPageToken).to.eql(undefined);
  // }).timeout(6e4 + 1000);
});
