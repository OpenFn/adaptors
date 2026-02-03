import chai, { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { initiatePayment, createCustomer, createPaymentMethod } from '../src/Adaptor.js';
import { readFileSync } from 'fs';
const testData = JSON.parse(readFileSync(new URL('./fixtures.json', import.meta.url), 'utf8'));

const testServer = enableMockClient('https://developersandbox-api.flutterwave.com');

let state = {
  configuration: {
    baseUrl: 'https://developersandbox-api.flutterwave.com',
    secretKey: 'nw85KTmsZP0CWqh7FYoFEXzxk68AQQju',
  }
}


describe('Create Customer', () => {

  it('creates a customer successfully', async () => {
    testServer
      .intercept({
        path: '/customers',
        method: 'POST',
        headers: {
          'X-Trace-Id': 'unique-trace-id-12345',
          'X-Idempotency-Key': 'unique-idempotency-key-12345'
        },

      })
      .reply(201, testData.createCustomer.response);

    const { data } = await createCustomer(testData.createCustomer.request, {
      headers: {
        'X-Trace-Id': 'unique-trace-id-12345',
        'X-Idempotency-Key': 'unique-idempotency-key-12345'
      }
    })(state);

    expect(data.id).to.eql(testData.createCustomer.response.data.id);
  });

  it('throws an error for invalid input', async () => {
    try {
      await createCustomer(testData.errors.invalidCustomer.input, {
        headers: {
          'X-Trace-Id': 'unique-trace-id-12345',
          'X-Idempotency-Key': 'unique-idempotency-key-12345'
        }
      })(state);
      throw new Error('Expected error was not thrown');
    } catch (err) {
      expect(err.message).to.equal(testData.errors.invalidCustomer.message);
    }
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

    const { data } = await initiatePayment(testData.initiatePayment.request)(state);

    expect(data.id).to.eql(testData.initiatePayment.response.data.id);
  });

  it('throws an error for invalid input', async () => {
    try {
      await initiatePayment(testData.errors.invalidPayment.input)(state);
      throw new Error('Expected error was not thrown');
    } catch (err) {
      expect(err.message).to.equal(testData.errors.invalidPayment.message);
    }
  });
});

describe('Validation Logic', () => {
  it('throws an error for invalid customer input', async () => {
    try {
      await createCustomer(testData.errors.invalidCustomerArray.input)(state);
      throw new Error('Expected error was not thrown');
    } catch (err) {
      expect(err.message).to.equal(testData.errors.invalidCustomerArray.message);
    }

    try {
      await createCustomer(testData.errors.invalidCustomer.input)(state);
      throw new Error('Expected error was not thrown');
    } catch (err) {
      expect(err.message).to.equal(testData.errors.invalidCustomer.message);
    }
  });

  it('throws an error for invalid payment input', async () => {
    try {
      await initiatePayment(testData.errors.invalidPaymentArray.input)(state);
      throw new Error('Expected error was not thrown');
    } catch (err) {
      expect(err.message).to.equal(testData.errors.invalidPaymentArray.message);
    }

    try {
      await initiatePayment(testData.errors.invalidPayment.input)(state);
      throw new Error('Expected error was not thrown');
    } catch (err) {
      expect(err.message).to.equal(testData.errors.invalidPayment.message);
    }
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
          'X-Idempotency-Key': 'unique-idempotency-key-67890'
        },

      })
      .reply(201, testData.createPaymentMethod.response);

    const { data } = await createPaymentMethod(testData.createPaymentMethod.request, {
      headers: {
        'X-Trace-Id': 'unique-trace-id-67890',
        'X-Idempotency-Key': 'unique-idempotency-key-67890'
      }
    })(state);

    expect(data.id).to.eql(testData.createPaymentMethod.response.data.id);
  });
});

