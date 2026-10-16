import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { listActivities } from '../src/Adaptor.js';

const testServer = enableMockClient('https://api.lemlist.com');

const configuration = { apiKey: 'test-key' };

// base64(':test-key')
const authHeader = 'Basic OnRlc3Qta2V5';

const jsonHeaders = { headers: { 'content-type': 'application/json' } };

const makeActivities = (n, start = 0) =>
  Array.from({ length: n }, (_, i) => ({
    _id: `act_${start + i}`,
    type: 'emailsReplied',
  }));

describe('listActivities', () => {
  it('fetches v2 activities with filters and writes them to state.data', async () => {
    const activities = [
      {
        _id: 'act_1',
        type: 'emailsReplied',
        campaignId: 'cam_1',
        leadEmail: 'lead@example.com',
        leadFirstName: 'Ada',
        leadLastName: 'Lovelace',
        leadCompanyName: 'Analytical Engines',
      },
    ];

    testServer
      .intercept({
        path: '/api/activities',
        method: 'GET',
        query: {
          version: 'v2',
          type: 'emailsReplied',
          campaignId: 'cam_1',
          limit: 100,
          offset: 0,
        },
        headers: { Authorization: authHeader },
      })
      .reply(200, activities, jsonHeaders);

    const state = { configuration };

    const finalState = await listActivities({
      type: 'emailsReplied',
      campaignId: 'cam_1',
    })(state);

    expect(finalState.data).to.eql(activities);
  });

  it('fetches every page until a short page is returned', async () => {
    const page1 = makeActivities(100, 0);
    const page2 = makeActivities(30, 100);

    testServer
      .intercept({
        path: '/api/activities',
        method: 'GET',
        query: { version: 'v2', limit: 100, offset: 0 },
      })
      .reply(200, page1, jsonHeaders);
    testServer
      .intercept({
        path: '/api/activities',
        method: 'GET',
        query: { version: 'v2', limit: 100, offset: 100 },
      })
      .reply(200, page2, jsonHeaders);

    const finalState = await listActivities()({ configuration });

    expect(finalState.data).to.have.lengthOf(130);
    expect(finalState.data[129]._id).to.equal('act_129');
  });

  it('fetches a single page when limit is set', async () => {
    const page = makeActivities(10);

    testServer
      .intercept({
        path: '/api/activities',
        method: 'GET',
        query: { version: 'v2', limit: 10 },
      })
      .reply(200, page, jsonHeaders);

    const finalState = await listActivities({ limit: 10 })({ configuration });

    expect(finalState.data).to.eql(page);
  });

  it('drops filters which resolve to undefined, null or empty string', async () => {
    testServer
      .intercept({
        path: '/api/activities',
        method: 'GET',
        query: { version: 'v2', type: 'emailsReplied', limit: 100, offset: 0 },
      })
      .reply(200, [], jsonHeaders);

    const finalState = await listActivities($ => ({
      type: 'emailsReplied',
      campaignId: $.campaignId,
      leadId: null,
      minDate: '',
    }))({ configuration });

    expect(finalState.data).to.eql([]);
  });

  it('falls back to the default base url when baseUrl is empty', async () => {
    testServer
      .intercept({
        path: '/api/activities',
        method: 'GET',
        query: { version: 'v2', limit: 5 },
      })
      .reply(200, [], jsonHeaders);

    const finalState = await listActivities({ limit: 5 })({
      configuration: { ...configuration, baseUrl: '' },
    });

    expect(finalState.data).to.eql([]);
  });
});
