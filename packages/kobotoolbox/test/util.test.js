import { enableMockClient } from '@openfn/language-common/util';
import { expect } from 'chai';
import * as util from '../src/util';
import { responseWithPagination } from './helper';

const testServer = enableMockClient('https://util-test.kobotoolbox.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const configuration = {
  username: 'test',
  password: 'strongpassword',
  apiVersion: 'v2',
  baseUrl: 'https://util-test.kobotoolbox.org',
};

const defaultObjects = [
  { uid: '1' },
  { uid: '2' },
  { uid: '3' },
  { uid: '4' },
  { uid: '5' },
  { uid: '6' },
];

// TODO - test URL building in a set of separate tests
describe('responseWithPagination', () => {
  const items = [1, 2, 3];

  it('use the default limit if no limit is passed', () => {
    const { results } = responseWithPagination(
      items,
      {},
      { url: 'www', pageLimit: 1 }
    );

    expect(results).to.eql([1]);
    expect(results.length).to.eql(1);
  });
  it('use the user limit, not the default limit', () => {
    const { results } = responseWithPagination(
      items,
      { limit: 2 },
      { url: 'www' }
    );
    expect(results).to.eql([1, 2]);
    expect(results.length).to.eql(2);
  });

  it('pagination values are included when additional items exist', () => {
    const limit = 2;
    const { next, previous } = responseWithPagination(
      items,
      {
        limit,
      },
      { url: 'www' }
    );

    expect(next).to.eql('www?format=json&start=2&limit=2');
    expect(previous).to.eql(null);
  });

  it('should return first 100 items when pageLimit=100 for dataset of 1001 items', async () => {
    const pageLimit = 100;
    const { results, next, previous } = responseWithPagination(
      Array.from({ length: 1001 }, (_, i) => ({
        uid: String(i),
      })),
      {},
      { url: 'www', pageLimit }
    );
    expect(results.length).to.eql(pageLimit);
    expect(next).to.eql(
      `www?format=json&start=${pageLimit}&limit=${pageLimit}`
    );
    expect(previous).to.eql(null);
  });

  it('should return 2 items with start 1 and pageLimit 2', () => {
    const start = 1;
    const pageLimit = 2;
    const { results, next, previous } = responseWithPagination(
      items,
      {
        start,
      },
      { url: 'www', pageLimit }
    );

    expect(results).to.eql([2, 3]);
    expect(next).to.eql(null);
    expect(previous).to.eql(`www?format=json&start=1&limit=${pageLimit}`);
  });
  it('should return all items if items do not exceed default limit', () => {
    const limit = 3;
    const { results } = responseWithPagination(
      items,
      { limit },
      { url: 'www' }
    );

    expect(results).to.eql([1, 2, 3]);
    expect(results.length).to.eql(3);
    expect(results.length).to.lessThanOrEqual(limit);
  });
  it('should return first pageLimit items with next link when exceeding defaultLimit', async () => {
    const defaultLimit = 3;
    const pageLimit = 1;
    const { results, next, count } = responseWithPagination(
      Array.from({ length: defaultLimit + 1 }, (_, i) => ({
        uid: String(i),
      })),
      {},
      { url: 'www', pageLimit, defaultLimit }
    );

    expect(count).to.eql(4);
    expect(results.length).to.eql(1);
    expect(count).to.greaterThan(defaultLimit);
    expect(results.length).to.eql(pageLimit);
    expect(next).to.eql(`www?format=json&start=1&limit=1`);
  });
});

describe('request', () => {
  it('should make GET a request', async () => {
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aUe2eV8pHK9DUEUxT9rCcs\/data\/?/,
        method: 'GET',
      })
      .reply(
        200,
        {
          count: 1,
          next: null,
          previous: null,
          results: [{ name: 'Feedback Survey Test', asset_type: 'survey' }],
        },
        jsonHeaders
      );
    const state = { configuration };
    const response = await util.request(
      state,
      'GET',
      '/assets/aUe2eV8pHK9DUEUxT9rCcs/data/'
    );

    expect(response.method).to.eq('GET');
    expect(response.statusCode).to.eq(200);
    expect(response.statusMessage).to.eq('OK');
    expect(response.body.count).to.eq(response.body.results.length);
  });
});
describe('requestWithPagination', () => {
  it('should return only 1 item when limit=1 is specified', async () => {
    let requestCount = 0;
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aDReHdA7UuNBYsiCXQBr23\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          requestCount++;
          return responseWithPagination(
            defaultObjects,
            { limit: req.query.limit, start: req.query.start },
            { url: `${req.origin}${req.path}` }
          );
        },
        { ...jsonHeaders }
      )
      .times(1);
    const state = { configuration };
    const data = await util.requestWithPagination(
      state,
      '/assets/aDReHdA7UuNBYsiCXQBr23/data/',
      {
        limit: 1,
      }
    );

    expect(requestCount).to.eql(1);
    expect(data).to.eql([{ uid: '1' }]);
  });
  it('should return all 6 items by making 6 separate API requests with pageSize=1', async () => {
    let requestCount = 0;
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aDReHdA7UuNBYsiCXQBr43\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          requestCount++;
          const response = responseWithPagination(
            defaultObjects,
            { start: req.query.start, limit: req.query.limit },
            {
              url: `${req.origin}${req.path}`,
              pageLimit: 1,
            }
          );

          return response;
        },
        { ...jsonHeaders }
      )
      .times(6);

    const state = { configuration };
    const data = await util.requestWithPagination(
      state,
      '/assets/aDReHdA7UuNBYsiCXQBr43/data/',
      {
        pageSize: 1,
      }
    );

    expect(data.length).to.eql(6);
    expect(requestCount).to.eql(6);
    expect(data).to.eql(defaultObjects);
  });
  it('should return defaultLimit items and stop pagination, even when more items are available', async () => {
    let requestCount = 0;
    const defaultLimit = 3;
    const defaulLimit = 1;
    const mockData = Array.from({ length: defaultLimit + 1 }, (_, i) => ({
      uid: String(i),
    }));

    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aDReHdA7UuNBYsiCXQBr33\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          requestCount++;
          return responseWithPagination(
            mockData,
            { limit: req.query.limit, start: req.query.start },
            { url: `${req.origin}${req.path}` }
          );
        },
        { ...jsonHeaders }
      )
      .times(3);

    const state = { configuration };
    const data = await util.requestWithPagination(
      state,
      '/assets/aDReHdA7UuNBYsiCXQBr33/data/',
      {
        limit: defaultLimit,
        pageSize: defaulLimit,
      }
    );

    expect(data.length).to.eql(3);
    expect(requestCount).to.eql(3);
    expect(mockData.length).to.greaterThan(data.length);
  });
});
