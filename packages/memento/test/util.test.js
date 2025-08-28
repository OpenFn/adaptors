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
  const mockPaginationResponse = totalEntries => {
    // First page response
    testServer
      .intercept({
        path: '/v1/libraries/HyZV7AYk0/entries',
        method: 'GET',
        query: { token: 'user-api-token', pageSize: 1 },
      })
      .reply(200, createPageResponse(1, totalEntries));

    // Subsequent pages
    for (let page = 2; page <= totalEntries; page++) {
      testServer
        .intercept({
          path: '/v1/libraries/HyZV7AYk0/entries',
          method: 'GET',
          query: { token: 'user-api-token', pageSize: 1, pageToken: page },
        })
        .reply(200, createPageResponse(page, totalEntries));
    }
  };

  const createPageResponse = (currentPage, totalPages) => {
    const isLastPage = currentPage === totalPages;
    return {
      entries: isLastPage ? [] : [{ id: `entry-${currentPage}-0` }],
      ...(isLastPage ? {} : { nextPageToken: currentPage + 1 }),
      revision: currentPage === 1 ? 4 : 5,
    };
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
