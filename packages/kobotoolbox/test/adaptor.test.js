import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  getForms,
  getSubmissions,
  getDeploymentInfo,
} from '../src/Adaptor';
import { responseWithPagination } from './helper';
import { DEFAULT_REQUEST_LIMIT, DEFAULT_MAX_LIMIT } from '../src/util';
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

const mockSubmissions = (formId, submissions, opts = {}) => {
  const { pageSize, ...otherOpts } = opts;

  const path = `/api/v2/assets/${formId}/data/`;
  const url = `${configuration.baseUrl}${path}`;
  if (otherOpts.query && typeof otherOpts.query !== 'string') {
    otherOpts.query = JSON.stringify(otherOpts.query);
  }
  testServer
    .intercept({
      path,
      method: 'GET',
      query: {
        format: 'json',
        ...otherOpts,
      },
    })
    .reply(
      200,
      (req, res) => {
        const { query, origin } = req;
        const results = responseWithPagination(
          submissions,
          {
            limit: otherOpts.limit,
            start: otherOpts.start,
          },
          {
            url,
            defaulLimit: pageSize,
          }
        );
        return results;
      },
      {
        ...jsonHeaders,
      }
    );
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
  const formId = 'aXecHjmbATuF6iGFmvBLBX';

  it('should return submissions within default page limits', async () => {
    // const state = { configuration };

    let requestCount = 0;
    const totalRequests = Math.ceil(
      sampleResponse.length / DEFAULT_REQUEST_LIMIT
    );
    testServer
      .intercept({
        path: `/api/v2/assets/${formId}/data/`,
        query: {
          format: 'json',
        },
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
    const { data } = await execute(getSubmissions(formId))(state);
    expect(data).to.eql(sampleResponse);
    expect(requestCount).to.eql(totalRequests);
    expect(data.length).to.eql(sampleResponse.length);
  });

  it('should return submissions within specified limit', async () => {
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
    expect(requestCount).to.eql(totalRequests);
    expect(data.length).to.eql(response.length);
  });

  it('should not return more items than the default limit', async () => {
    const manyObjects = Array.from(
      { length: DEFAULT_MAX_LIMIT + 1 },
      (_, i) => ({
        uid: String(i),
      })
    );
    const response = manyObjects.slice(0, DEFAULT_MAX_LIMIT);
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
          console.log({ query, origin, path });
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
    const { data } = await getSubmissions('aXecHjmbATuF6iGFmvBLBX')(state);

    console.log({ requestCount, totalRequests });
    expect(data.length).to.eql(DEFAULT_MAX_LIMIT);
    expect(requestCount).to.eql(totalRequests);
  });

  it.only('should be able to explicity get more items than the default max limit', async () => {
    const manyObjects = Array.from(
      { length: DEFAULT_MAX_LIMIT + 2 },
      (_, i) => ({
        uid: String(i),
      })
    );

    const totalRequests = Math.ceil(manyObjects.length / DEFAULT_REQUEST_LIMIT);

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
          console.log({ query, origin, path });
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
      limit: DEFAULT_MAX_LIMIT + 2,
    })(state);
    expect(requestCount).to.eql(totalRequests);
    expect(data.length).to.eql(manyObjects.length);
  });
  // TODO should be able to explicity get more items than the default limit (ie, limit = DEFAULT_REQUEST_LIMIT + 2)
  // TODO should get ALL items if the item count exceeds the default limit (ie, limit = Infinity)

  // TODO: should use default page size
  it('should use default pageSize', async () => {
    const state = { configuration };
    const manyObjects = Array.from({ length: 1001 }, (_, i) => ({
      uid: String(i),
    }));
    mockSubmissions(formId, manyObjects);
    const { data } = await execute(getSubmissions(formId))(state);
    // How
    expect(data.length).to.eql(1001);
  });
  // TODO: should allow page size to be overridden

  it('should get a list of submissions with a query', async () => {
    const state = { configuration };
    const mockResponse = Array.from({ length: 10 }, (_, i) => ({
      uid: String(i),
    }));
    mockSubmissions(formId, mockResponse, {
      query: { _submission_time: { $gte: '2022-06-12T21:54:20' } },
    });
    const { data } = await execute(
      getSubmissions(formId, {
        query: { _submission_time: { $gte: '2022-06-12T21:54:20' } },
      })
    )(state);

    expect(data).to.eql(mockResponse);
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
