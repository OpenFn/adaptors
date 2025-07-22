import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { request, get, post, put } from '../src/Adaptor.js';
import testData from './fixtures.json' assert { type: 'json' };

const baseUrl = 'https://ebm.zata.rw'
const testServer = enableMockClient(baseUrl);

const configuration = {
  baseUrl,
  apiToken: 'test-token',
  apiVersion: 'v1'
}

describe('request', () => {
  it('makes a GET request to the correct Zata endpoint with Bearer token', async () => {
    testServer
      .intercept({
        path: '/v1/test',
        method: 'GET',
        headers: {
          Authorization: 'Bearer test-token',
          'content-type': 'application/json',
        },
      })
      .reply(200, testData.test.body);


    const operation = request('GET', 'test');
    const result = await operation({ configuration });
    expect(result.data).to.eql(testData.test.body);
  });
});


describe('get', () => {
  it('makes a GET request to the correct Zata endpoint with Bearer token', async () => {
    testServer
      .intercept({
        path: '/v1/test',
        method: 'GET',
        headers: {
          Authorization: 'Bearer test-token',
          'content-type': 'application/json',
        },
      })
      .reply(200, testData.test.body);

    const operation = get('test');
    const result = await operation({ configuration });
    expect(result.data).to.eql(testData.test.body);
  });
})


describe('post', () => {
  it('makes a POST request to the correct Zata endpoint', async () => {
    testServer
      .intercept({
        path: '/v1/product',
        method: 'POST',
        headers: {
          Authorization: 'Bearer test-token',
          'content-type': 'application/json',
        },
      })
      .reply(200, testData.createProduct.response);

    const operation = post('product', { body: testData.createProduct.body });
    const result = await operation({ configuration });
    expect(result.data).to.eql(testData.createProduct.response);
  });
})

describe('put', () => {
  it('makes a PUT request to the correct Zata endpoint', async () => {
    testServer
      .intercept({
        path: '/v1/product',
        method: 'PUT',
        headers: {
          Authorization: 'Bearer test-token',
          'content-type': 'application/json',
        },
      })
      .reply(200, testData.createProduct.response);


    const operation = put('product', { body: testData.createProduct.body });
    const result = await operation({ configuration });
    expect(result.data).to.eql(testData.createProduct.response);
  });
})
