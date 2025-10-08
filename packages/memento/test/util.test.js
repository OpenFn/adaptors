/* eslint-disable no-undef */
import { expect } from 'chai';
import { requestWithPagination, handleRateLimit } from '../src/util';
import { mockEntriesResponse, mockRateLimitExceeded } from './helpers';
import { enableMockClient } from '@openfn/language-common/util';

const testServer = enableMockClient('https://util.mementodatabase.com');
const state = {
  configuration: {
    baseUrl: 'https://util.mementodatabase.com',
    token: 'user-api-token',
  },
};

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
    throttleTime: 1000, // 1s
    maxRequests: 5,
  };

  it('should return immediately when no previous requests exist', async () => {
    const result = await handleRateLimit([], requestConfig);
    expect(result).to.be.undefined;
  });
  it('should delay when hasReachedLimit is true', async () => {
    const config = { ...requestConfig, hasReachedLimit: true };
    const startTime = Date.now();

    await handleRateLimit([], config);

    const duration = Date.now() - startTime;
    expect(duration).to.be.at.least(1000); // allowing small margin of error
    expect(consoleLogCalls[0]).to.equal('Rate limit exceeded, waiting 1s');
  }).timeout(1e4);

  it('should remove expired requests', () => {
    const now = Date.now();
    const requestTimes = [
      now - 1100, // expired
      now - 500, // valid
      now - 300, // valid
    ];

    handleRateLimit(requestTimes, requestConfig);
    expect(requestTimes).to.have.lengthOf(2);
    expect(requestTimes).to.not.include(now - 11000);
  }).timeout(1e4);

  it('should delay when max requests reached', async () => {
    const now = Date.now();
    const requestTimes = [
      now - 500,
      now - 400,
      now - 300,
      now - 200,
      now - 100,
    ];

    const startTime = Date.now();
    await handleRateLimit(requestTimes, requestConfig);
    const duration = Date.now() - startTime;

    expect(duration).to.be.at.least(690); // allowing small margin of error
    expect(consoleLogCalls[0]).to.match(/Rate limiting: waiting \d+\.*\d*s/);
  }).timeout(1e4);

  it('should add minimum delay between requests', async () => {
    const now = Date.now();
    const requestTimes = [now - 500];

    const startTime = Date.now();
    await handleRateLimit(requestTimes, requestConfig);
    const duration = Date.now() - startTime;

    expect(duration).to.be.at.least(190); // allowing small margin of error
    expect(consoleLogCalls[0]).to.equal('Waiting 0.2s before next request');
  }).timeout(1e4);

  it('should log appropriate messages', async () => {
    // Test rate limit exceeded
    await handleRateLimit([], { ...requestConfig, hasReachedLimit: true });
    expect(consoleLogCalls[0]).to.equal('Rate limit exceeded, waiting 1s');

    const now = Date.now();

    // Test normal delay between requests
    await handleRateLimit([now - 1000], requestConfig);
    expect(consoleLogCalls[1]).to.equal('Waiting 0.2s before next request');

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

  it('fetches 101 records with pageSize 10', async () => {
    const pageSize = 10;
    const totalRecords = 101;
    const expectedRequests = 11; // Math.ceil(101/10)
    let actualRequests = 0;

    // Mock all pagination requests
    for (let page = 1; page <= expectedRequests; page++) {
      testServer
        .intercept({
          path: '/v1/libraries/test/entries',
          method: 'GET',
          query: {
            token: 'user-api-token',
            pageSize,
            fields: 'all',
            ...(page > 1 && { pageToken: page }),
          },
        })
        .reply(() => {
          actualRequests++;
          return {
            statusCode: 200,
            data: JSON.stringify(
              mockEntriesResponse(page, expectedRequests, pageSize)
            ),
            responseOptions: {
              headers: { 'Content-Type': 'application/json' },
            },
          };
        });
    }

    const { data } = await requestWithPagination(
      state,
      'GET',
      'libraries/test/entries',
      {
        throttleTime: 1000,
        maxRequests: 10,
        query: { pageSize, fields: 'all' },
      }
    );

    expect(actualRequests).to.equal(expectedRequests);
    expect(data.entries).to.have.lengthOf(totalRecords);
  }).timeout(6e4);

  it('should handle api rate limit exceeded', async () => {
    const pageSize = 10;
    mockRateLimitExceeded(testServer, '/v1/libraries/HyZV7AYk0/entries', {
      pageSize,
      totalRecords: 11,
      fields: 'all',
    });

    // Reducing throttleTime for faster test execution
    const testCongig = { throttleTime: 1000 };
    const { data } = await requestWithPagination(
      state,
      'GET',
      'libraries/HyZV7AYk0/entries',
      {
        query: { pageSize, fields: 'all' },
        ...testCongig,
      }
    );

    expect(data.entries).to.have.lengthOf(11);
    expect(data.nextPageToken).to.equal(undefined);
    expect(data.revision).to.be.greaterThanOrEqual(0);
  }).timeout(6e4);
});
