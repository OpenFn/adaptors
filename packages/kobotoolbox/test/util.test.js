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

describe('responseWithPagination', () => {
  const items = [1, 2, 3];

  // TODO - test URL building in a set of separate tests

  // TODO - test defaults
  //      - if there less items then the default limit,returns all
  //      - if there are more items than the default limit, returns limit

  // TODO: for testing resposneWithPagination,
  // - Default start and default limit
  // - Is limit >= number of items
  // - Is limit < number of items
  // - What if user pass a limit that is > than maxLimit
  // - What if limit > number of items
  // - If limit is 1
  // Test limit maxPageSize
  it.only('start 0, limit 1 should return the first item', () => {
    const start = 0;
    const limit = 1;

    // responseWithPagination(items, query: { start, limit }, settings: { url, defaultLimit, maxLimit })

    const res = responseWithPagination('www', items, {
      limit,
      start,
      // defaultLimit
    });
    console.log(res);

    expect(res.results).to.eql([1]);
  });
  it('should return 2 items with limit 2', () => {
    const start = 0;
    const limit = 2;
    const { results } = responseWithPagination('www', items, {
      limit,
      start,
    });
    expect(results).to.eql([1, 2]);
  });

  // Test page size
  it('should return 2 items with start 1 and pageSize 2', () => {
    const start = 1;
    const pageSize = 2;
    const { results } = responseWithPagination('www', items, {
      pageSize,
      start,
    });
    expect(results).to.eql([2, 3]);
  });
  it('should return all items', () => {
    const start = 0;
    const pageSize = 3;
    const { next, results } = responseWithPagination('www', items, {
      pageSize,
      start,
    });

    expect(results).to.eql([1, 2, 3]);
  });
  it('should return all items if pageSize is greater', () => {
    const start = 0;
    const pageSize = 100;
    const { next, results } = responseWithPagination('www', items, {
      pageSize,
      start,
    });
    expect(results).to.eql([1, 2, 3]);
  });
  it('should return the correct next link', () => {
    const start = 1;
    const limit = 1;
    const { next, results } = responseWithPagination('www', items, {
      limit,
      start,
    });

    expect(next).to.eql('www?format=json&start=2&limit=1');
    expect(results).to.eql([1]);
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
    // Create an array of 10001 items to exceed default max
    const manyObjects = Array.from({ length: 10001 }, (_, i) => ({
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
            `${req.origin}${req.path}`,
            manyObjects,
            { limit: req.query.limit, start: req.query.start }
          );
        },
        { ...jsonHeaders }
      )
      .times(11); // Allow enough calls to reach max

    const state = { configuration };
    const data = await util.requestWithPagination(
      state,
      '/assets/aDReHdA7UuNBYsiCXQBr33/data/'
    );

    expect(data.length).to.eql(10000); // Should stop at 10000 items
    expect(callCount).to.be.lessThan(11); // Should not make all available calls
  });
  it('handles pagination by default', async () => {
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aDReHdA7UuNBYsiCXQBr43\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          return responseWithPagination(
            `${req.origin}${req.path}`,
            defaultObjects,
            {
              pageSize: req.query.limit,
              start: req.query.start,
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
