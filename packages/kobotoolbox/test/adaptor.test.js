import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  getForms,
  getSubmissions,
  getDeploymentInfo,
} from '../src/Adaptor';
import { responseWithPagination } from './helper';
import { DEFAULT_REQUEST_LIMIT, DEFAULT_LIMIT } from '../src/util';
const defaultLimit = DEFAULT_LIMIT;
const requestLimit = DEFAULT_REQUEST_LIMIT;

const testServer = enableMockClient('https://test.kobotoolbox.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  apiVersion: 'v2',
  baseUrl: 'https://test.kobotoolbox.org',
};

describe('getSubmissions', () => {
  const state = { configuration };
  const sampleResponse = [
    { uid: '1', name: 'Ruh' },
    { uid: '2', name: 'Shay' },
  ];
  let originalLog;
  let consoleOutput = [];
  beforeEach(() => {
    originalLog = console.warn;
    console.warn = (...args) => consoleOutput.push(...args);
  });

  it("Don't return more items than maximum page size", async () => {
    let requestCount = 0;
    const items = Array.from({ length: 4e4 }, (_, i) => ({
      uid: String(i),
    }));
    const totalRequests = Math.ceil(defaultLimit / requestLimit);

    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aXecHjmbATuF6iGFmvBLBX\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          requestCount++;
          const { query, origin, path } = req;
          const results = responseWithPagination(
            items,
            {
              limit: query.limit,
              start: query.start,
            },
            {
              url: `${origin}${path}`,
            }
          );
          return results;
        },
        {
          ...jsonHeaders,
        }
      )
      .times(totalRequests);
    const { data } = await execute(getSubmissions('aXecHjmbATuF6iGFmvBLBX'))(
      state
    );

    expect(requestCount).to.eql(3);
    expect(data.length).to.eql(3e4);
    expect(items.length).to.greaterThan(data.length);
  });

  it('should return 1 submission when limit=1', async () => {
    const limit = 1;
    const response = sampleResponse.slice(0, limit);
    const totalRequests = Math.ceil(response.length / DEFAULT_REQUEST_LIMIT);

    let requestCount = 0;
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aXecHjmbATuF6iGFmvBLBX\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          requestCount++;
          const { query, origin, path } = req;
          const results = responseWithPagination(
            sampleResponse,
            {
              limit: query.limit,
              start: query.start,
            },
            {
              url: `${origin}${path}`,
            }
          );
          return results;
        },
        {
          ...jsonHeaders,
        }
      )
      .times(totalRequests);

    const { data } = await execute(
      getSubmissions('aXecHjmbATuF6iGFmvBLBX', { limit })
    )(state);

    expect(data).to.eql(response);
    expect(requestCount).to.eql(1);
    expect(data.length).to.eql(1);
  });

  it('should be able to explicity get more items than the default max limit', async () => {
    const manyObjects = Array.from({ length: defaultLimit + 2 }, (_, i) => ({
      uid: String(i),
    }));

    const totalRequests = Math.ceil(manyObjects.length / requestLimit);

    let requestCount = 0;
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aXecHjmbATuF6iGFmvBLBX\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          requestCount++;
          const { query, origin, path } = req;
          return responseWithPagination(
            manyObjects,
            {
              limit: query.limit,
              start: query.start,
            },
            {
              url: `${origin}${path}`,
            }
          );
        },
        {
          ...jsonHeaders,
        }
      )
      .times(totalRequests);

    const { data } = await getSubmissions('aXecHjmbATuF6iGFmvBLBX', {
      limit: 4e4,
    })(state);

    expect(requestCount).to.eql(4);
    expect(data.length).to.eql(3e4 + 2);
    expect(data.length).to.greaterThan(defaultLimit);
  });
  it('should allow custom pageSize', async () => {
    const state = { configuration };
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      uid: String(i),
    }));
    const pageSize = 1;

    const totalRequests = Math.ceil(mockData.length / pageSize);

    let requestCount = 0;
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aXecHjmbATuF6iGFmvBLBX\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          requestCount++;
          const { query, origin, path } = req;
          return responseWithPagination(
            mockData,
            {
              limit: query.limit,
              start: query.start,
            },
            {
              url: `${origin}${path}`,
              defaultLimit: 1,
            }
          );
        },
        {
          ...jsonHeaders,
        }
      )
      .times(totalRequests);

    const { data } = await getSubmissions('aXecHjmbATuF6iGFmvBLBX', {
      pageSize,
    })(state);

    expect(data.length).to.eql(10);
    expect(requestCount).to.eql(10);
    expect(totalRequests).to.eql(10);
  });

  it('Return all items if limit is greater than the number of ite (ie, limit = Infinity)', async () => {
    const mockData = Array.from({ length: defaultLimit + 1 }, (_, i) => ({
      uid: String(i),
    }));

    const totalRequests = Math.ceil(mockData.length / requestLimit);
    let requestCount = 0;
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aXecHjmbATuF6iGFmvBLBX\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          requestCount++;
          const { query, origin, path } = req;
          return responseWithPagination(
            mockData,
            {
              limit: query.limit,
              start: query.start,
            },
            {
              url: `${origin}${path}`,
            }
          );
        },
        {
          ...jsonHeaders,
        }
      )
      .times(totalRequests);

    const { data } = await getSubmissions('aXecHjmbATuF6iGFmvBLBX', {
      limit: Infinity,
    })(state);

    expect(data.length).to.eql(3e4 + 1);
    expect(requestCount).to.eql(4);
  });

  afterEach(() => {
    console.warn = originalLog;
  });
});

describe('getForms', () => {
  beforeEach(() => {
    testServer
      .intercept({
        path: `/api/v2/assets/`,
        method: 'GET',
        query: { format: 'json', asset_type: 'survey' },
      })
      .reply(
        200,
        { results: [{ name: 'Feedback Survey Test', asset_type: 'survey' }] },
        { ...jsonHeaders }
      );
  });

  it('should get a list of forms', async () => {
    const state = { configuration };
    const { data } = await execute(getForms())(state);
    expect(data.results[0].name).to.eql('Feedback Survey Test');
  });
});

describe('getDeploymentInfo', () => {
  const formId = 'aXecHjmbATuF6iGFmvBLBX';

  beforeEach(() => {
    testServer
      .intercept({
        path: `/api/v2/assets/${formId}/deployment/`,
        method: 'GET',
        query: { format: 'json' },
      })
      .reply(
        200,
        { asset: { name: 'Feedback Survey Test', asset_type: 'survey' } },
        { ...jsonHeaders }
      );
  });

  it('should get a list of deployment', async () => {
    const state = { configuration };
    const { data } = await execute(getDeploymentInfo(formId))(state);
    expect(data.asset.name).to.eql('Feedback Survey Test');
  });
});

describe('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {};
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    let state = {};

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});
