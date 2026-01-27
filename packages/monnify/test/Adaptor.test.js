import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import testData from './fixtures.json' with { type: 'json' };
import { request, post, get, list } from '../src/Adaptor.js';

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
        body: {
          "startDate": "2021-01-16T13:56:39.492",
          "endDate": "2021-10-16T13:56:39.492"
        }
      }
    )(state);

    expect(finalState.data).to.eql(testData.notifications.response)
  })
});


describe('get', () => {
  it('successfully gets wallet balance', async () => {
    testServer
      .intercept({
        path: 'api/v2/disbursements/wallet-balance',
        method: 'GET'
      })
      .reply(200, testData.walletBalance);

    const state = {
      configuration: {
        ...configuration,
        access_token: 'test-token'
      }
    };

    const finalState = await get("api/v2/disbursements/wallet-balance")(state);

    expect(finalState.data).to.eql(testData.walletBalance)
  });

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

describe('List', () => {
  it('respects pagination params when provided', async () => {
    const pageNo = 1;
    const pageSize = 2;
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo,
          pageSize
        }
      })
      .reply(200, testData.pagination.page2);

    const state = {
      configuration
    };

    const finalState = await list('/api/v2/disbursements/search-transactions', {
        sourceAccountNumber: 4864192954,
        pageNo,
        pageSize
    })(state);

    expect(finalState.data.length).to.eql(pageSize);
  });

  it('fetches all pages when no pagination params provided', async () => {
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 0,
          pageSize: 100
        }
      })
      .reply(200, testData.pagination.page1);

    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 1,
          pageSize: 100
        }
      })
      .reply(200, testData.pagination.page2);

    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 2,
          pageSize: 100
        }
      })
      .reply(200, testData.pagination.page3);

    const state = {
      configuration: {
        ...configuration,
        access_token: 'test-token'
      }
    };

    const finalState = await list('/api/v2/disbursements/search-transactions', {
        sourceAccountNumber: 4864192954
    })(state);

    expect(finalState.data.length).to.eql(5);
  });

  it('validates pageSize does not exceed 1000', async () => {
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 0,
          pageSize: 1000
        }
      })
      .reply(200, testData.pagination.page1);

    const state = {
      configuration
    };

    const finalState = await list('/api/v2/disbursements/search-transactions', {
        sourceAccountNumber: 4864192954,
        pageNo: 0,
        pageSize: 1500
    })(state);

    expect(finalState.data.length).to.eql(testData.pagination.page1.responseBody.content.length);
  });
});