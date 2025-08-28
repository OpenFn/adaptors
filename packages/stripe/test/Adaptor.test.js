import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { list, get } from '../src/Adaptor.js';

const testServer = enableMockClient('https://stripe.test.com');

const configuration = {
  baseUrl: 'https://stripe.test.com',
  apiKey: 'some_secret_api_key',
};

describe('list', () => {
  it('list all customers', async () => {
    testServer
      .intercept({
        path: '/v1/customers',
        method: 'GET',
      })

      .reply(200, {
        has_more: false,
        url: '/v1/customers',
        object: 'list',
        data: [
          { email: 'cs001@example.com', id: 'cus_001' },
          { email: 'cs002@example.com', id: 'cus_002' },
        ],
      });

    const state = {
      configuration,
    };

    const finalState = await list('customers')(state);

    expect(finalState.data).to.eql({
      has_more: false,
      url: '/v1/customers',
      object: 'list',
      data: [
        { email: 'cs001@example.com', id: 'cus_001' },
        { email: 'cs002@example.com', id: 'cus_002' },
      ],
    });
  });
  it('returns an empty data array when no subscriptions exist', async () => {
    testServer
      .intercept({
        path: '/v1/subscriptions',
        method: 'GET',
      })

      .reply(200, {
        object: 'list',
        data: [],
        has_more: false,
        url: '/v1/subscriptions',
      });

    const state = {
      configuration,
    };

    const finalState = await list('subscriptions')(state);

    expect(finalState.data).to.eql({
      object: 'list',
      data: [],
      has_more: false,
      url: '/v1/subscriptions',
    });

    expect(finalState.data.data).to.eql([]);
  });
});

describe('get', () => {
  it('get a customer', async () => {
    testServer
      .intercept({
        path: '/v1/customers/cus_001',
        method: 'GET',
      })

      .reply(200, { email: 'cs001@example.com', id: 'cus_001' });

    const state = {
      configuration,
    };

    const finalState = await get('customers', 'cus_001')(state);

    expect(finalState.data).to.eql({
      email: 'cs001@example.com',
      id: 'cus_001',
    });
    expect(finalState.data.email).to.eq('cs001@example.com');
  });
});
