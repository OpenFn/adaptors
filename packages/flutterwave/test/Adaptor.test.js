import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import {
  initiatePayment,
  createCustomer,
  listCustomers,
  getCustomer,
  updateCustomer,
} from '../src/Adaptor.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const testData = require('./fixtures.json');

const testServer = enableMockClient('https://developersandbox-api.flutterwave.com');

let state = {
  configuration: {
    baseUrl: 'https://developersandbox-api.flutterwave.com',
    secretKey: 'nw85KTmsZP0CWqh7FYoFEXzxk68AQQju',
  }
}; // Added semicolon

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
});

describe('List Customers', () => {
  it('lists customers successfully', async () => {
    testServer
      .intercept({
        path: '/customers?from=2023-01-01&to=2023-12-31',
        method: 'GET'
      })
      .reply(200, testData.listCustomers.response);

      const { data } = await listCustomers(testData.listCustomers.request.query)(state);
      expect(data).to.eql(testData.listCustomers.response);
  });
});

describe('Get Customer', () => {
  it('gets a customer successfully', async () => {
    testServer
      .intercept({
        path: /\/customers\/123/,
        method: 'GET'
      })
      .reply(200, testData.getCustomer.response);

    const { data } = await getCustomer(testData.getCustomer.request.id)(state);
    expect(data).to.eql(testData.getCustomer.response);
  });
});

describe('Update Customer', () => {
  it('updates a customer successfully', async () => {
    testServer
    .intercept({
      path: /\/customers\/123/,
      method: 'PUT'
    })
    .reply(200, testData.updateCustomer.response);

    // Extract id from request which has { id, ...data }
    const { id, ...updateData } = testData.updateCustomer.request;
    const { data } = await updateCustomer(id, updateData)(state);
    expect(data).to.eql(testData.updateCustomer.response);
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
});

