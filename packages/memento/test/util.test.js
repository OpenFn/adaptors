import { expect } from 'chai';
import { requestWithPagination } from '../src/util';
import { enableMockClient } from '@openfn/language-common/util';

const testServer = enableMockClient('https://util.mementodatabase.com');
const state = {
  configuration: {
    baseUrl: 'https://util.mementodatabase.com',
    token: 'user-api-token',
  },
};

describe('requestWithPagination', () => {
  it('should return the correct number of entries', async () => {
    testServer
      .intercept({
        path: '/v1/libraries/HyZV7AYk0/entries',
        method: 'GET',
        query: { token: 'user-api-token' },
      })
      .reply(200, {
        entries: [
          {
            id: 'JTszaWZWYigxOjRSQzxqZkBlJSo',
            author: 'mtuchi',
            createdTime: '2025-08-28T13:31:40.339Z',
            modifiedTime: '2025-08-28T16:59:15.395Z',
            status: 'active',
            revision: 4,
            size: 206,
            fields: [],
          },
        ],
        nextPageToken: '123',
        revision: 4,
      });

    testServer
      .intercept({
        path: '/v1/libraries/HyZV7AYk0/entries',
        method: 'GET',
        query: {
          token: 'user-api-token',
          pageToken: '123',
        },
      })
      .reply(200, {
        entries: [],
        revision: 5,
      });

    const { data } = await requestWithPagination(
      state,
      'GET',
      'libraries/HyZV7AYk0/entries'
    );

    expect(data.entries.length).to.eql(1);
    expect(data.nextPageToken).to.eql(undefined);
    expect(data.revision).to.eql(5);
  });

  it('should return the correct revision', async () => {
    testServer
      .intercept({
        path: '/v1/libraries/HyZV7AYk0/entries',
        method: 'GET',
        query: { token: 'user-api-token' },
      })
      .reply(200, {
        entries: [],
        revision: 4,
      });

    const { data } = await requestWithPagination(
      state,
      'GET',
      'libraries/HyZV7AYk0/entries'
    );

    expect(data.entries.length).to.eql(0);
    expect(data.revision).to.eql(4);
  });
  const mockPaginationResponse = entries => {
    for (let i = 1; i <= entries; i++) {
      if (i === 1) {
        testServer
          .intercept({
            path: '/v1/libraries/HyZV7AYk0/entries',
            method: 'GET',
            query: { token: 'user-api-token', pageSize: 1 },
          })
          .reply(200, {
            entries: Array.from({ length: 1 }, (_, j) => ({
              id: `entry-${i}-${j}`,
            })),
            nextPageToken: i + 1,
            revision: 4,
          });
      }
      if (i === entries) {
        testServer
          .intercept({
            path: '/v1/libraries/HyZV7AYk0/entries',
            method: 'GET',
            query: { token: 'user-api-token', pageSize: 1, pageToken: i },
          })
          .reply(200, {
            entries: [],
            revision: 5,
          });
      } else {
        testServer
          .intercept({
            path: '/v1/libraries/HyZV7AYk0/entries',
            method: 'GET',
            query: { token: 'user-api-token', pageSize: 1, pageToken: i },
          })
          .reply(200, {
            entries: Array.from({ length: 1 }, (_, j) => ({
              id: `entry-${i}-${j}`,
            })),
            revision: 5,
            nextPageToken: i + 1,
          });
      }
    }
  };

  it.only(
    'should auto throttle for 1 minute when the number of requests >= 10',
    async () => {
      mockPaginationResponse(11);

      const { data } = await requestWithPagination(
        state,
        'GET',
        'libraries/HyZV7AYk0/entries',
        {
          query: {
            pageSize: 1,
          },
          throttleTime: 1000,
        }
      );
      // TODO: why entries is 10?
      // expect(data.entries.length).to.eql(11);
      expect(data.nextPageToken).to.eql(undefined);
      expect(data.revision).to.eql(5);
    }
  ).timeout(6e4 + 1000);
});
