import { enableMockClient } from '@openfn/language-common/util';
import { expect } from 'chai';
import * as util from '../src/util';
import { responseWithPagination } from './helper';

const DEFAULT_LIMIT = util.DEFAULT_REQUEST_LIMIT;
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

  it('use default limit and default start', () => {
    const { results, next, previous, requestCount } = responseWithPagination(
      items,
      {},
      { url: 'www' }
    );

    expect(next).to.eql(null);
    expect(previous).to.eql(null);
    expect(results).to.eql(items);
    expect(requestCount).to.eql(1);
    expect(results.length).to.eql(3);
  });
  it('limit is greater than maxLimit', () => {
    const start = 0;
    const limit = 4e3;
    const { results, next, previous } = responseWithPagination(
      items,
      {
        limit,
        start,
      },
      { url: 'www' }
    );

    expect(results).to.eql(items);
    expect(next).to.eql(null);
    expect(previous).to.eql(null);
  });
  it('limit is greater than number of items', () => {
    const start = 0;
    const limit = 1000;
    const { results, next, previous } = responseWithPagination(
      items,
      {
        limit,
        start,
      },
      { url: 'www' }
    );

    expect(results).to.eql(items);
    expect(next).to.eql(null);
    expect(previous).to.eql(null);
  });
  it('limit is less than number of items', () => {
    const start = 0;
    const limit = 1;
    const { results, next, previous } = responseWithPagination(
      items,
      {
        limit,
        start,
      },
      { url: 'www' }
    );

    expect(results).to.eql([1]);
    expect(next).to.eql('www?format=json&start=1&limit=1');
    expect(previous).to.eql(null);
  });

  it('should return 2 items with limit 2', () => {
    const start = 0;
    const limit = 2;
    const { results, next, previous } = responseWithPagination(
      items,
      {
        limit,
        start,
      },
      { url: 'www' }
    );

    expect(results).to.eql([1, 2]);
    expect(next).to.eql('www?format=json&start=2&limit=2');
    expect(previous).to.eql(null);
  });

  it('should return 2 items with start 1 and defaultLimit 2', () => {
    const start = 1;
    const defaultLimit = 2;
    const { results, next, previous } = responseWithPagination(
      items,
      {
        start,
      },
      { url: 'www', defaultLimit }
    );

    expect(results).to.eql([2, 3]);
    expect(next).to.eql('www?format=json&start=3&limit=2');
    expect(previous).to.eql(`www?format=json&limit=${DEFAULT_LIMIT}`);
  });
  it('should return all items', () => {
    const { results, next, previous, requestCount } = responseWithPagination(
      items,
      {},
      { url: 'www' }
    );

    expect(results).to.eql([1, 2, 3]);
    expect(next).to.eql(null);
    expect(previous).to.eql(null);
    expect(results.length).to.eql(3);
    expect(requestCount).to.eql(1);
  });
  it('should return all items within maxLimit', () => {
    const { results, next, previous, requestCount, count } =
      responseWithPagination(
        Array.from({ length: DEFAULT_LIMIT + 1 }, (_, i) => ({
          uid: String(i),
        })),
        {},
        { url: 'www' }
      );

    expect(count).to.eql(DEFAULT_LIMIT + 1);
    expect(results.length).to.eql(DEFAULT_LIMIT);
    expect(next).to.eql(
      `www?format=json&start=${DEFAULT_LIMIT}&limit=${DEFAULT_LIMIT}`
    );
    expect(previous).to.eql(null);
    expect(requestCount).to.eql(1);
  });
  it('should return all items within maxLimit if defaultLimit is set', () => {
    const start = 0;
    const defaultLimit = 100;
    const { results, next, previous, requestCount } = responseWithPagination(
      Array.from({ length: 1001 }, (_, i) => ({
        uid: String(i),
      })),
      { start },
      { url: 'www', defaultLimit }
    );
    console.log({ requestCount, next, previous });
    expect(results.length).to.eql(1001);
    expect(next).to.eql(null);
    expect(previous).to.eql(`www?format=json&start=1000&limit=${defaultLimit}`);
    expect(requestCount).to.eql(11);
  });
  it('should return the correct next link', () => {
    const start = 1;
    const limit = 1;
    const { next, results } = responseWithPagination(
      items,
      {
        limit,
        start,
      },
      { url: 'www' }
    );

    expect(next).to.eql('www?format=json&start=2&limit=1');
    expect(results).to.eql([2]);
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
  it('stops fetching when default maximum items reached', async () => {
    let callCount = 0;
    const manyObjects = Array.from({ length: DEFAULT_LIMIT + 1 }, (_, i) => ({
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
          callCount++;
          return responseWithPagination(
            manyObjects,
            { limit: req.query.limit, start: req.query.start },
            { url: `${req.origin}${req.path}` }
          );
        },
        { ...jsonHeaders }
      );

    const state = { configuration };
    const data = await util.requestWithPagination(
      state,
      '/assets/aDReHdA7UuNBYsiCXQBr33/data/'
    );

    expect(data.length).to.eql(DEFAULT_LIMIT);
    expect(callCount).to.eql(1);
  });
  it.only('handles pagination by default', async () => {
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aDReHdA7UuNBYsiCXQBr43\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          console.log(req.query);
          return responseWithPagination(
            defaultObjects,
            {},
            {
              url: `${req.origin}${req.path}`,
              defaultLimit: 1,
            }
          );
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
    expect(data).to.eql(defaultObjects);
  });
  it('does not handle pagination if limit is set', async () => {
    let callCount = 0;
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aDReHdA7UuNBYsiCXQBr23\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          callCount++;
          return responseWithPagination(
            `${req.origin}${req.path}`,
            defaultObjects,
            { limit: req.query.limit, start: req.query.start }
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

    expect(callCount).to.eql(1);
    expect(data).to.eql([{ uid: '1' }]);
  });
});
