import chai from 'chai';
const { expect } = chai;
import { enableMockClient } from '@openfn/language-common/util';
import { request } from '../src/Utils';

import { http } from '../src';

import {
  getSubmissions,
  getForms,
  getDeploymentInfo,
  execute,
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
  baseURL: 'https://test.kobotoolbox.org',
};

const defaultObjects = [
  { uid: '1' },
  { uid: '2' },
  { uid: '3' },
  { uid: '4' },
  { uid: '5' },
  { uid: '6' },
];

const paginatedResponse = (
  url,
  limit = 30000,
  start = 0,
  objects = defaultObjects
) => {
  const s = parseInt(start);
  const l = parseInt(limit);
  const results = objects.slice(s, s + l);
  if (objects.length > s + l) {
    const next = `${url}/?format=json&start=${s + l}&limit=${l}`;

    return {
      next,
      results,
    };
  } else {
    return { results };
  }
};

describe('paginatedResponse', () => {
  const items = [1, 2, 3];
  it('should return the first item', () => {
    const start = 0;
    const limit = 1;
    const { next, results } = paginatedResponse('www', limit, start, items);
    expect(results).to.eql([1]);
  });
  it('should return 2 items with limit 2', () => {
    const start = 0;
    const limit = 2;
    const { next, results } = paginatedResponse('www', limit, start, items);
    expect(results).to.eql([1, 2]);
  });
  it('should return 2 items with start 1 and limit 2', () => {
    const start = 1;
    const limit = 2;
    const { next, results } = paginatedResponse('www', limit, start, items);
    expect(results).to.eql([2, 3]);
  });
  it('should return all items', () => {
    const start = 0;
    const limit = 3;
    const { next, results } = paginatedResponse('www', limit, start, items);
    expect(results).to.eql([1, 2, 3]);
  });
  it('should return all items if limit is greater', () => {
    const start = 0;
    const limit = 100;
    const { next, results } = paginatedResponse('www', limit, start, items);
    expect(results).to.eql([1, 2, 3]);
  });
  it('should return the correct next link', () => {
    const start = 1;
    const limit = 1;
    const { next, results } = paginatedResponse('www', limit, start, items);
    expect(next).to.eql('www/?format=json&start=2&limit=1');
    expect(results).to.eql([2]);
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

describe('request', () => {
  it('handles pagination if paginate is true', async () => {
    let callCount = 0;
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aDReHdA7UuNBYsiCXQBr43\/data\//,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          callCount++;
          return paginatedResponse(
            `${req.origin}${req.path}`,
            req.query.limit,
            req.query.start
          );
        },
        { ...jsonHeaders }
      )
      .times(6);
    const state = { configuration };
    const { results } = await request(
      state,
      'GET',
      '/assets/aDReHdA7UuNBYsiCXQBr43/data/',
      {
        paginate: true,
        query: { start: 0, limit: 1 },
      }
    );

    expect(callCount).to.eql(6);
    expect(results).to.eql(defaultObjects);
  });
  it('does not handle pagination if paginate is false', async () => {
    let callCount = 0;
    testServer
      .intercept({
        path: /\/api\/v2\/assets\/aDReHdA7UuNBYsiCXQBr43\/data\//,
        method: 'GET',
      })
      .reply(
        200,
        req => {
          callCount++;
          return paginatedResponse(
            `${req.origin}${req.path}`,
            req.query.limit,
            req.query.start
          );
        },
        { ...jsonHeaders }
      )
      .times(1);
    const state = { configuration };
    const { body } = await request(
      state,
      'GET',
      '/assets/aDReHdA7UuNBYsiCXQBr43/data/',
      {
        paginate: false,
      }
    );

    expect(callCount).to.eql(1);
    expect(body.results).to.eql(defaultObjects);
  });
});

describe('http.get', () => {
  it('should GET with a query', async () => {
    testServer
      .intercept({
        path: '/api/v2/assets/',
        query: { format: 'json' },
        method: 'GET',
      })
      .reply(
        200,
        {
          results: [{ name: 'Feedback Survey Test', asset_type: 'survey' }],
        },
        { ...jsonHeaders }
      );
    const state = { configuration };

    const response = await http.get('/assets/')(state);
    expect(response.response.headers['content-type']).to.eql(
      'application/json'
    );
  });
});

describe('http.get', () => {
  it('should make a GET request', async () => {
    testServer
      .intercept({
        path: '/api/v2/assets/',
        query: { format: 'json' },
        method: 'GET',
      })
      .reply(
        200,
        { results: [{ name: 'Feedback Survey Test', asset_type: 'survey' }] },
        { ...jsonHeaders }
      );
    const state = { configuration };

    const { data } = await http.get('/assets/')(state);

    expect(data.results[0].name).to.eql('Feedback Survey Test');
  });
});

describe('http.post', () => {
  it('should make a POST request', async () => {
    testServer
      .intercept({
        path: '/api/v2/assets/',
        query: { format: 'json' },
        method: 'POST',
        data: {
          name: 'Feedback Survey Test',
          asset_type: 'survey',
        },
      })
      .reply(
        200,
        { name: 'Feedback Survey Test', asset_type: 'survey' },
        { ...jsonHeaders }
      );
    const state = { configuration };

    const { data } = await http.post('/assets/', {
      name: 'Feedback Survey Test',
      asset_type: 'survey',
    })(state);

    expect(data.name).to.eql('Feedback Survey Test');
  });
});

describe('getSubmissions', () => {
  const formId = 'aXecHjmbATuF6iGFmvBLBX';

  it('should get a list of submissions', async () => {
    testServer
      .intercept({
        path: `/api/v2/assets/${formId}/data/`,
        method: 'GET',
        query: { format: 'json' },
      })
      .reply(
        200,
        {
          results: [
            { First_Name_of_Patient: 'Kwothe', Last_Name_of_Patient: 'Ruh' },
          ],
        },
        { ...jsonHeaders }
      );
    const state = { configuration };
    const { response } = await execute(getSubmissions(formId))(state);
    expect(response.results[0]['First_Name_of_Patient']).to.eql('Kwothe');
  });

  it('should get a list of submissions with a query', async () => {
    testServer
      .intercept({
        path: `/api/v2/assets/${formId}/data/`,
        method: 'GET',
        query: {
          format: 'json',
          query: '{"_submission_time":{"$gte":"2022-06-12T21:54:20"}}',
        },
      })
      .reply(
        200,
        {
          results: [
            { First_Name_of_Patient: 'Kwothe', Last_Name_of_Patient: 'Ruh' },
          ],
        },
        { ...jsonHeaders }
      );
    const state = { configuration };
    const { response } = await execute(
      getSubmissions(formId, {
        query: { _submission_time: { $gte: '2022-06-12T21:54:20' } },
      })
    )(state);
    expect(response.results[0]['First_Name_of_Patient']).to.eql('Kwothe');
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
