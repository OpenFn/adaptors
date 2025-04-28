import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  getForms,
  getSubmissions,
  getDeploymentInfo,
} from '../src/Adaptor';

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

const responseWithPagination = (url, objects, query) => {
  const { pageSize, start, limit } = query;

  const startIndex =
    start !== undefined ? Math.max(0, parseInt(start) || 0) : undefined;
  const pageLimit =
    pageSize !== undefined ? Math.max(1, parseInt(pageSize) || 0) : undefined;
  const totalLimit = limit ? Math.max(1, parseInt(limit)) : null;

  const totalCount = objects.length;

  let results;
  if (totalLimit) {
    results = objects.slice(0, totalLimit);
  } else if (startIndex !== undefined && pageLimit !== undefined) {
    results = objects.slice(startIndex, startIndex + pageLimit);
  } else {
    results = objects;
  }

  const baseUrl = `${url}?format=json`;
  const previous =
    startIndex !== undefined && pageLimit !== undefined
      ? `${baseUrl}&start=${startIndex}&limit=${pageLimit}`
      : null;

  let next = null;
  if (totalLimit && startIndex + totalLimit < totalCount) {
    next = `${baseUrl}&start=${
      startIndex ? startIndex + totalLimit : totalLimit
    }&limit=${totalLimit}`;
  } else if (
    !totalLimit &&
    startIndex !== undefined &&
    pageLimit !== undefined &&
    totalCount > startIndex + pageLimit
  ) {
    next = `${baseUrl}&start=${startIndex + pageLimit}&limit=${pageLimit}`;
  }

  return {
    count: totalCount,
    next,
    previous,
    results,
  };
};

const mockSubmissions = (formId, submissions, query = {}) => {
  const { pageSize, max, ...otherOpts } = query;

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
    .reply(200, responseWithPagination(url, submissions, query), {
      ...jsonHeaders,
    });
};

describe('getSubmissions', () => {
  let originalLog;
  let consoleOutput = [];
  beforeEach(() => {
    originalLog = console.warn;
    console.warn = (...args) => consoleOutput.push(...args);
  });
  const formId = 'aXecHjmbATuF6iGFmvBLBX';

  it('should get a list of submissions with default limit', async () => {
    const state = { configuration };
    const sampleResponse = [
      { uid: '1', name: 'Ruh' },
      { uid: '2', name: 'Shay' },
    ];
    mockSubmissions(formId, sampleResponse);
    const { data } = await execute(getSubmissions(formId))(state);
    expect(data).to.eql(sampleResponse);
  });

  it('should get a list of submissions with a limit', async () => {
    const state = { configuration };
    const sampleResponse = [
      { uid: '1', name: 'Ruh' },
      { uid: '2', name: 'Shay' },
    ];
    mockSubmissions(formId, sampleResponse, { limit: 1 });
    const { data } = await execute(getSubmissions(formId, { limit: 1 }))(state);

    expect(data).to.eql([{ uid: '1', name: 'Ruh' }]);
  });
  it('should ignore max|pageSize if limit is set', async () => {
    const state = { configuration };

    const manyObjects = Array.from({ length: 1001 }, (_, i) => ({
      uid: String(i),
    }));
    mockSubmissions(formId, manyObjects, { limit: 100, pageSize: 10 });
    const { data } = await execute(
      getSubmissions(formId, { limit: 100, pageSize: 10 })
    )(state);

    expect(consoleOutput).to.eql([
      'Warning: ignoring option pageSize as "limit" is set',
    ]);
    expect(data.length).to.eql(100);
  });

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
