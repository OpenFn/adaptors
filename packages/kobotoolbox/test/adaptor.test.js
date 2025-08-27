import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  getForms,
  getSubmissions,
  getDeploymentInfo,
} from '../src/Adaptor';
import { responseWithPagination } from './helper';
import { DEFAULT_PAGE_SIZE, DEFAULT_LIMIT } from '../src/util';
const defaultLimit = DEFAULT_LIMIT;
const pageLimit = DEFAULT_PAGE_SIZE;

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
  const sampleData = [
    { uid: '1', name: 'Bob' },
    { uid: '4', name: 'Anuh' },
    { uid: '3', name: 'Charlie' },
  ];

  let originalLog;
  let consoleOutput = [];
  beforeEach(() => {
    originalLog = console.warn;
    console.warn = (...args) => consoleOutput.push(...args);
  });

  it('should auto page to the correct limit when start is passed', async () => {
    const mockData = Array.from({ length: 20 }, (_, i) => ({
      uid: `${i + 1}`,
      name: `User ${i + 1}`,
    }));

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
            mockData,
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
      .times(6);

    const { data } = await getSubmissions('aXecHjmbATuF6iGFmvBLBX', {
      start: 2,
      limit: 12,
      pageSize: 2,
    })(state);

    expect(data.length).to.eql(12);
    expect(requestCount).to.eql(6);
    expect(data[0]).to.eql({ uid: '3', name: 'User 3' });
  });

  it('should start from the specified index', async () => {
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aXecHjmbATuF6iGFmvBLBX\/data/,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          const { query, origin, path } = req;
          const results = responseWithPagination(
            sampleData,
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
      );
    const { data } = await getSubmissions('aXecHjmbATuF6iGFmvBLBX', {
      start: 2,
    })(state);
    expect(data[0].uid).to.eql('3');
  });
  it('should not return more items than the default limit', async () => {
    let requestCount = 0;
    const items = Array.from({ length: 4e4 }, (_, i) => ({
      uid: String(i),
    }));

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
      .times(3);

    const { data } = await execute(getSubmissions('aXecHjmbATuF6iGFmvBLBX'))(
      state
    );

    expect(requestCount).to.eql(3);
    expect(data.length).to.eql(3e4);
    expect(items.length).to.greaterThan(data.length);
  });

  it('should only return 1 item if the limit is 1', async () => {
    const limit = 1;
    const mockData = sampleData.slice(0, limit);

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
            sampleData,
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
      .times(1);

    const { data } = await execute(
      getSubmissions('aXecHjmbATuF6iGFmvBLBX', { limit })
    )(state);

    expect(data).to.eql(mockData);
    expect(requestCount).to.eql(1);
    expect(data.length).to.eql(1);
  });

  it('should be able to explicity get more items than the default max limit', async () => {
    const manyObjects = Array.from({ length: defaultLimit + 2 }, (_, i) => ({
      uid: String(i),
    }));

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
      .times(4);

    const { data } = await getSubmissions('aXecHjmbATuF6iGFmvBLBX', {
      limit: 4e4,
    })(state);

    expect(requestCount).to.eql(4);
    expect(data.length).to.eql(3e4 + 2);
    expect(data.length).to.greaterThan(defaultLimit);
  });
  it('should allow custom pageSize', async () => {
    const state = { configuration };
    const pageSize = 1;
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      uid: String(i),
    }));

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
      .times(10);

    const { data } = await getSubmissions('aXecHjmbATuF6iGFmvBLBX', {
      pageSize,
    })(state);

    expect(data.length).to.eql(10);
    expect(requestCount).to.eql(10);
  });

  it('should return all items if limit is Infinity', async () => {
    const mockData = Array.from({ length: defaultLimit + 1 }, (_, i) => ({
      uid: String(i),
    }));

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
      .times(4);

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
