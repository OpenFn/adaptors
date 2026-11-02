import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { upsertLead } from '../src/index.js';

const testServer = enableMockClient('https://api.copper.com');

const configuration = {
  accessToken: 'test-token',
  userEmail: 'user@example.com',
};

describe('upsertLead', () => {
  it('upserts a lead matched on email and writes it to state.data', async () => {
    const properties = {
      name: 'Ada Lovelace',
      email: { email: 'ada@example.com', category: 'work' },
    };

    let sentBody;
    testServer
      .intercept({
        path: '/developer_api/v1/leads/upsert',
        method: 'PUT',
        headers: {
          'X-PW-AccessToken': 'test-token',
          'X-PW-Application': 'developer_api',
          'X-PW-UserEmail': 'user@example.com',
        },
      })
      .reply(
        200,
        ({ body }) => {
          sentBody = JSON.parse(body);
          return { id: 123, ...properties };
        },
        { headers: { 'content-type': 'application/json' } }
      );

    const finalState = await upsertLead(properties)({ configuration });

    expect(sentBody).to.eql({
      properties,
      match: { field_name: 'email', field_value: 'ada@example.com' },
    });
    expect(finalState.data).to.eql({ id: 123, ...properties });
  });

  it('falls back to the default base url when baseUrl is empty', async () => {
    testServer
      .intercept({ path: '/developer_api/v1/leads/upsert', method: 'PUT' })
      .reply(200, { id: 456 }, { headers: { 'content-type': 'application/json' } });

    const finalState = await upsertLead({
      name: 'Grace Hopper',
      email: { email: 'grace@example.com', category: 'work' },
    })({ configuration: { ...configuration, baseUrl: '' } });

    expect(finalState.data).to.eql({ id: 456 });
  });

  it('throws with the response body from Copper on error', async () => {
    const copperError = { success: false, status: 422, message: 'Multiple leads matched' };

    testServer
      .intercept({ path: '/developer_api/v1/leads/upsert', method: 'PUT' })
      .reply(422, copperError, { headers: { 'content-type': 'application/json' } });

    const error = await upsertLead({
      name: 'Ada Lovelace',
      email: { email: 'ada@example.com', category: 'work' },
    })({ configuration }).catch(e => e);

    expect(error.statusCode).to.equal(422);
    expect(error.body).to.eql(copperError);
  });
});
