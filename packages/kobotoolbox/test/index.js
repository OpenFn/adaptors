import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { request, paginateRequest } from '../src/util';
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
  baseUrl: 'https://test.kobotoolbox.org',
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
  pageSize = 30000,
  start = 0,
  objects = defaultObjects
) => {
  const s = parseInt(start);
  const l = parseInt(pageSize);
  const results = objects.slice(s, s + l);
  const count = objects.length;
  const previous = `${url}?format=json&start=${s}&pageSize=${l}`;
  let next = null;
  if (count > s + l) {
    next = `${url}?format=json&start=${s + l}&pageSize=${l}`;

    return {
      next,
      count,
      previous,
      results,
    };
  } else {
    return { results, count, previous, next };
  }
};

describe('paginatedResponse', () => {
  const items = [1, 2, 3];
  it('should return the first item', () => {
    const start = 0;
    const pageSize = 1;
    const { next, results } = paginatedResponse('www', pageSize, start, items);
    expect(results).to.eql([1]);
  });
  it('should return 2 items with pageSize 2', () => {
    const start = 0;
    const pageSize = 2;
    const { next, results } = paginatedResponse('www', pageSize, start, items);
    expect(results).to.eql([1, 2]);
  });
  it('should return 2 items with start 1 and pageSize 2', () => {
    const start = 1;
    const pageSize = 2;
    const { next, results } = paginatedResponse('www', pageSize, start, items);
    expect(results).to.eql([2, 3]);
  });
  it('should return all items', () => {
    const start = 0;
    const pageSize = 3;
    const { next, results } = paginatedResponse('www', pageSize, start, items);
    expect(results).to.eql([1, 2, 3]);
  });
  it('should return all items if pageSize is greater', () => {
    const start = 0;
    const pageSize = 100;
    const { next, results } = paginatedResponse('www', pageSize, start, items);
    expect(results).to.eql([1, 2, 3]);
  });
  it('should return the correct next link', () => {
    const start = 1;
    const pageSize = 1;
    const { next, results } = paginatedResponse('www', pageSize, start, items);
    expect(next).to.eql('www?format=json&start=2&pageSize=1');
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

describe('pagenateRequest', () => {
  it('handles pagination by default', async () => {
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
    const { body } = await paginateRequest(
      state,
      'GET',
      '/assets/aDReHdA7UuNBYsiCXQBr43/data/',
      {
        pageSize: 1,
      }
    );

    expect(callCount).to.eql(6);
    expect(body.results).to.eql(defaultObjects);
  });
  it('does not handle pagination if limit is set', async () => {
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
    const { body } = await paginateRequest(
      state,
      'GET',
      '/assets/aDReHdA7UuNBYsiCXQBr43/data/',
      {
        limit: 1,
      }
    );

    expect(callCount).to.eql(1);
    expect(body.count).to.eql(6);
    expect(body.previous).to.contain('?format=json&start=0&pageSize=1');
    expect(body.next).to.contain('?format=json&start=1&pageSize=1');
    expect(body.results).to.eql([{ uid: '1' }]);
  });
});

describe('http.get', () => {
  it('should GET with a query', async () => {
    testServer
      .intercept({
        path: '/api/v2/assets/',
        query: { format: 'json', metadata: 'on' },
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

    const { response, data } = await http.get('/assets/', {
      query: { metadata: 'on' },
    })(state);
    expect(data.results[0].name).to.eql('Feedback Survey Test');
    expect(response.headers['content-type']).to.eql('application/json');
  });

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
        query: { format: 'json', limit: 1000, start: 0 },
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
    const { data } = await execute(getSubmissions(formId))(state);
    expect(data.results[0]['First_Name_of_Patient']).to.eql('Kwothe');
  });

  it('should get a list of submissions with a query', async () => {
    testServer
      .intercept({
        path: `/api/v2/assets/${formId}/data/`,
        method: 'GET',
        query: {
          format: 'json',
          limit: 1000,
          start: 0,
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
    const { data } = await execute(
      getSubmissions(formId, {
        query: { _submission_time: { $gte: '2022-06-12T21:54:20' } },
      })
    )(state);
    expect(data.results[0]['First_Name_of_Patient']).to.eql('Kwothe');
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
