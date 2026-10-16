import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { listActivities } from '../src/Adaptor.js';

const testServer = enableMockClient('https://api.lemlist.com');

const configuration = { apiKey: 'test-key' };

// base64(':test-key')
const authHeader = 'Basic OnRlc3Qta2V5';

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
        query: { version: 'v2', type: 'emailsReplied', campaignId: 'cam_1' },
        headers: { Authorization: authHeader },
      })
      .reply(200, activities, {
        headers: { 'content-type': 'application/json' },
      });

    const state = { configuration };

    const finalState = await listActivities({
      type: 'emailsReplied',
      campaignId: 'cam_1',
    })(state);

    expect(finalState.data).to.eql(activities);
  });
});
