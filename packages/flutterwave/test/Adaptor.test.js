import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { initiatePayment, createCustomer } from '../src/Adaptor.js';
import testData from './fixtures.json' assert { type: 'json' };

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
        method: 'POST'
      })
      .reply(200, testData.createCustomer.response);

    const { data } = await createCustomer(testData.createCustomer.request)(state);
    expect(data).to.eql(testData.createCustomer.response);
  });

  it('throws an error for invalid input', async () => {
    await expect(createCustomer([])(state)).to.be.rejectedWith('Invalid input: customerData must be a single object.');
    await expect(createCustomer(null)(state)).to.be.rejectedWith('Invalid input: customerData must be a single object.');
  });
});

describe('Initiate Payment', () => {
  it('initiates a payment successfully', async () => {
    testServer
      .intercept({
        path: '/charges',
        method: 'POST'
      })
      .reply(200, testData.initiatePayment.response);

    const { data } = await initiatePayment(testData.initiatePayment.request)(state);
    expect(data).to.eql(testData.initiatePayment.response);
  });

  it('throws an error for invalid input', async () => {
    await expect(initiatePayment([])(state)).to.be.rejectedWith('Invalid input: paymentData must be a single object.');
    await expect(initiatePayment(null)(state)).to.be.rejectedWith('Invalid input: paymentData must be a single object.');
  });
});

