import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { request, get, post } from '../src/Adaptor.js';
import testData from './fixtures.json' assert {type: 'json'};

const testServer = enableMockClient('https://fake.server.com');

const state = {
  configuration: {
    baseUrl: 'https://fake.server.com',
    username: 'hello',
    password: 'there',
    cookie: 'cookie'
  },
  data: {},
};

const options = {
  headers: { Cookie: state.configuration.cookie, 'Content-Type': 'text/html' }
};

describe('GET', () => {
  it('makes a GET request to the right endpoint', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/products/abcd',
        method: 'GET',
        headers: {
          cookie: state.configuration.cookie
        }
      })
      .reply(200, testData.newProduct);


    const { data } = await get('/products/abcd', options)(state);

    expect(data).to.eql(testData.newProduct);
  });

  it('should parse pagination options', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/products',
        method: 'GET',
        headers: {
          cookie: state.configuration.cookie
        },
        query: {
          max: 10
        }
      })
      .reply(200, testData.products);


    const { data } = await get('/products', { ...options, query: { max: 10 } })(state);

    expect(data.length).to.eql(10);
  });

  it('throws an error if the service returns 404', async () => {
    testServer
      .intercept({
        path: '/products/fake',
        method: 'GET',
      })
      .reply(404);

    const error = await get('/products/fake', options)(state)
      .catch(error => error);

    expect(error.statusMessage).to.eql('Not Found');
  });
});


describe('POST', () => {
  it('Should make a  POST request to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/products/xyz',
        method: 'POST',
      })
      .reply(200, testData.newProduct);

    const { data } = await post('/products/xyz', testData.newProduct, options)(state);
    expect(data).to.eql(testData.newProduct);
  });

  it('Should throw when a  POST request has validation errors', async () => {
    testServer
      .intercept({
        path: '/products',
        method: 'POST',
      })
      .reply(400, { message: 'POST to https://fake.server.com/products returned 400: Bad Request' });

    const error = await post('/products', testData.newProduct, options)(state)
      .catch(error => error);
    expect(error.statusCode).to.eql(400);
  });
});

describe('REQUEST', () => {
  it('should make a request with the right verb to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/products/xyz',
        method: 'DELETE',
      })
      .reply(200, { message: 'success' });

    const { data: { message } } = await request('DELETE', '/products/xyz', options)(state);
    expect(message).to.eql('success');
  });
  it('should parse a request with a body and options', async () => {
    testServer
      .intercept({
        path: '/products/xyz',
        method: 'POST',
      })
      .reply(200, testData.newProduct);

    const { data } = await request('POST', '/products/xyz', { ...options, body: testData.newProduct })(state);
    expect(data).to.eql(testData.newProduct);
  });
});