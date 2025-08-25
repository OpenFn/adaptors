import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { get, post, request } from '../src/http.js';

const testServer = enableMockClient('https://api.stripe.test.com');

const configuration = {
  baseUrl: 'https://api.stripe.test.com',
  apiKey: 'some_secret_api_key',
};

describe('request', () => {
  it('make a request to get all customers', async () => {
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

    const finalState = await request('GET', 'customers')(state);

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
});

describe('get', () => {
  it('get all customers', async () => {
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

    const finalState = await get('customers')(state);

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
});

describe('post', () => {
  it('create a new payment intent', async () => {
    testServer
      .intercept({
        path: '/v1/payment_intents',
        method: 'POST',
        query: {
          amount: 10000,
          currency: 'aed',
        },
      })

      .reply(200, {
        currency: 'aed',
        id: 'pi_004',
      });

    const state = {
      configuration,
    };

    const finalState = await post('/payment_intents', null, {
      query: {
        amount: 10000,
        currency: 'aed',
      },
    })(state);

    expect(finalState.data).to.eql({
      currency: 'aed',
      id: 'pi_004',
    });
  });
});
