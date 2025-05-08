import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  getForms,
  getSubmissions,
  getDeploymentInfo,
} from '../src/Adaptor';
import { responseWithPagination } from './helper';
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

const mockSubmissions = (formId, submissions, query = {}) => {
  const { pageSize, ...otherOpts } = query;

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
      responseWithPagination(url, submissions, {
        pageSize,
        limit: otherOpts.limit,
        start: otherOpts.start,
      }),
      {
        ...jsonHeaders,
      }
    );
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

  it('should ignore pageSize if limit is set', async () => {
    const state = { configuration };

    const manyObjects = Array.from({ length: 1001 }, (_, i) => ({
      uid: String(i),
    }));
    mockSubmissions(formId, manyObjects, { limit: 100 });
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
