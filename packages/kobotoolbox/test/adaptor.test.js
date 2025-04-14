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

describe('getSubmissions', () => {
  const formId = 'aXecHjmbATuF6iGFmvBLBX';

  it('should get a list of submissions', async () => {
    testServer
      .intercept({
        path: `/api/v2/assets/${formId}/data`,
        method: 'GET',
        query: { format: 'json', limit: 1000 },
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
    expect(data[0]['First_Name_of_Patient']).to.eql('Kwothe');
  });

  it('should get a list of submissions with a query', async () => {
    testServer
      .intercept({
        path: `/api/v2/assets/${formId}/data`,
        method: 'GET',
        query: {
          format: 'json',
          limit: 1000,
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
    expect(data[0]['First_Name_of_Patient']).to.eql('Kwothe');
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
        path: `/api/v2/assets/${formId}/deployment`,
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
