import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import testData from './fixtures.json' with { type: 'json' };
import { request, post, get } from '../src/Adaptor.js';

const testServer = enableMockClient('https://fake.monnify.com');

const configuration = {
  'baseUrl': 'https://fake.monnify.com',
  'apiKey': 'MK_TEST_YRP3AJ7RQ2',
  'secretKey': 'JKML52W7XQ43C02VRFDNQ8KLAU459W8C'
}

beforeEach(() => {
  testServer
    .intercept({
      path: '/api/v1/auth/login',
      method: 'POST',
    })
    .reply(200, testData.login.response);
});

describe('request', () => {
  it('makes a successful GET request', async () => {
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          pageNo: 0,
          pageSize: 10,
          sourceAccountNumber: 4864192954
        }
      })
      .reply(200, testData.disbursements.response);

    const state = {
      configuration
    }

    const finalState = await request(
      'GET',
      '/api/v2/disbursements/search-transactions',
      {},
      {
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 0,
          pageSize: 10
        }
      }
    )(state);

    expect(finalState.data).to.eql(testData.disbursements.response);
  });

  it('makes a successful POST request', async () => {
    testServer
      .intercept({
        path: '/api/v1/transaction-notification/resend-failed-notifications',
        method: 'POST'
      })
      .reply(200, testData.notifications.response);

    const state = {
      configuration
    }

    const finalState = await request(
      'POST',
      '/api/v1/transaction-notification/resend-failed-notifications',
      {
        "startDate": "2021-01-16T13:56:39.492",
        "endDate": "2021-10-16T13:56:39.492"
      }
    )(state);

    expect(finalState.data).to.eql(testData.notifications.response)
  })
});


describe('get', () => {
  it('successfully gets disbursements', async () => {
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          pageNo: 0,
          pageSize: 10,
          sourceAccountNumber: 4864192954
        }
      })
      .reply(200, testData.disbursements.response);

    const state = {
      configuration
    };

    const finalState = await get("/api/v2/disbursements/search-transactions", {
      query: {
        sourceAccountNumber: 4864192954,
        pageNo: 0,
        pageSize: 10
      }
    })(state);

    expect(finalState.data).to.eql(testData.disbursements.response)
  })
});

describe('post', () => {
  it('successfully makes a post request', async () => {
    testServer
      .intercept({
        path: '/api/v1/transaction-notification/resend-failed-notifications',
        method: 'POST'
      })
      .reply(200, testData.disbursements.response);

    const state = {
      configuration
    };

    const finalState = await post("/api/v1/transaction-notification/resend-failed-notifications", {
      "startDate": "2021-01-16T13:56:39.492",
      "endDate": "2021-10-16T13:56:39.492"
    })(state);

    expect(finalState.data).to.eql(testData.disbursements.response)
  })
});