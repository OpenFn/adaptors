import chai, { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import {
  initiatePayment,
  createCustomer,
  createPaymentMethod,
} from '../src/Adaptor.js';
import testData from './fixtures.json' with { type: 'json' };

const testServer = enableMockClient(
  'https://developersandbox-api.flutterwave.com',
);

let state = {
  configuration: {
    baseUrl: 'https://developersandbox-api.flutterwave.com',
    secretKey: 'nw85KTmsZP0CWqh7FYoFEXzxk68AQQju',
  },
};

describe('Create Customer', () => {
  it('creates a customer successfully', async () => {
    testServer
      .intercept({
        path: '/customers',
        method: 'POST',
        headers: {
          'X-Trace-Id': 'unique-trace-id-12345',
          'X-Idempotency-Key': 'unique-idempotency-key-12345',
        },
      })
      .reply(201, testData.createCustomer.response);

    const { data } = await createCustomer(testData.createCustomer.request, {
      headers: {
        'X-Trace-Id': 'unique-trace-id-12345',
        'X-Idempotency-Key': 'unique-idempotency-key-12345',
      },
    })(state);

    expect(data.id).to.eql(testData.createCustomer.response.data.id);
  });
});

describe('Initiate Payment', () => {
  it('initiates a payment successfully', async () => {
    testServer
      .intercept({
        path: '/charges',
        method: 'POST',
      })
      .reply(201, testData.initiatePayment.response);

    const { data } = await initiatePayment(testData.initiatePayment.request)(
      state,
    );

    expect(data.id).to.eql(testData.initiatePayment.response.data.id);
  });
});

describe('Create Payment Method', () => {
  it('creates a payment method successfully', async () => {
    testServer
      .intercept({
        path: '/payment-methods',
        method: 'POST',
        headers: {
          'X-Trace-Id': 'unique-trace-id-67890',
          'X-Idempotency-Key': 'unique-idempotency-key-67890',
        },
      })
      .reply(201, testData.createPaymentMethod.response);

    const { data } = await createPaymentMethod(
      testData.createPaymentMethod.request,
      {
        headers: {
          'X-Trace-Id': 'unique-trace-id-67890',
          'X-Idempotency-Key': 'unique-idempotency-key-67890',
        },
      },
    )(state);

    expect(data.id).to.eql(testData.createPaymentMethod.response.data.id);
  });
});
