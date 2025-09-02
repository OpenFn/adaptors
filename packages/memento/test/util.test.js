import { expect } from 'chai';
import { requestWithPagination } from '../src/util';
import { mockEntriesPagination, mockRateLimitExceeded } from './helpers';
import { enableMockClient } from '@openfn/language-common/util';

const testServer = enableMockClient('https://util.mementodatabase.com');
const state = {
  configuration: {
    baseUrl: 'https://util.mementodatabase.com',
    token: 'user-api-token',
  },
};

describe('requestWithPagination', () => {
  it('should auto fetch all entries', async () => {
    const pageSize = 10;
    mockEntriesPagination(testServer, '/v1/libraries/HyZV7AYk0/entries', {
      pageSize,
      totalPage: 11,
      fields: 'all',
    });

    const { data } = await requestWithPagination(
      state,
      'GET',
      'libraries/HyZV7AYk0/entries',
      {
        throttleTime: 1000,
        maxRequests: 10,
        query: { pageSize, fields: 'all' },
      }
    );

    expect(data.entries.length).to.eql(11);
    expect(data.nextPageToken).to.eql(undefined);
    expect(data.revision).to.be.greaterThanOrEqual(0);
  }).timeout(6e4);

  it('should auto throttle when throttleTime and maxRequests are set', async () => {
    const pageSize = 10;

    mockEntriesPagination(testServer, '/v1/libraries/HyZV7AYk0/entries', {
      pageSize,
      totalPage: 11,
      fields: 'all',
    });

    const { data } = await requestWithPagination(
      state,
      'GET',
      'libraries/HyZV7AYk0/entries',
      {
        query: {
          pageSize,
          fields: 'all',
        },
        throttleTime: 1000,
        maxRequests: 10,
      }
    );
    expect(data.entries.length).to.eql(11);
    expect(data.nextPageToken).to.eql(undefined);
  }).timeout(6e4 + 1000);
  it('should auto throttle when requests exceed limit', async () => {
    const pageSize = 10;

    mockRateLimitExceeded(testServer, '/v1/libraries/HyZV7AYk0/entries', {
      pageSize,
      totalPage: 11,
      fields: 'all',
    });
    const { data } = await requestWithPagination(
      state,
      'GET',
      'libraries/HyZV7AYk0/entries',
      {
        throttleTime: 1000,
        maxRequests: 10,
        snoozeTime: 100, //this will force rate limit exceeded
        query: {
          pageSize,
          fields: 'all',
        },
      }
    );
    expect(data.entries.length).to.eql(11);
    expect(data.nextPageToken).to.eql(undefined);
  }).timeout(6e4 + 1000);
});
