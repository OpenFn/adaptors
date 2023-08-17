import { expect } from 'chai';
import { MockAgent, setGlobalDispatcher } from 'undici';

import { request } from '../src/Utils.js';

const mockAgent = new MockAgent({ connections: 1 });
setGlobalDispatcher(mockAgent);

const client = mockAgent.get('https://us11.api.mailchimp.com');

describe.skip('request', () => {
  it.only('should include method', async () => {
    const state = {
      references: [],
      configuration: {
        apiKey: '00bba-us11',
        server: 'us11',
      },
    };

    const apiToken = `${Buffer.from(
      `openfn:${state.configuration.apiKey}`,
      'utf-8'
    ).toString('base64')}`;

    client
      .intercept({
        path: '/3.0',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${apiToken}`,
        },
      })
      .reply(200, {
        account_name: 'Open Function Group',
        email: 'taylor@openfn.org',
      });

    const resp = await request('GET', '/')(state);
    console.log(resp);
  });
  it('should include path', async () => {});
});
