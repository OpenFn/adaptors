import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import testData from './fixtures.json' with { type: 'json' };
import { request, post, get } from '../src/Adaptor.js';

const testServer = enableMockClient('https://fake.dagu.com');

const configuration = {
  baseUrl: 'https://fake.dagu.com',
  username: 'abcdefghijkl',
  password: '12154545'
}

// Mock login before each test
beforeEach(() => {
  testServer
    .intercept({
      path: '/account/login',
      method: 'POST',
    })
    .reply(200, testData.login.response);
});



describe('request', () => {
  it('makes a successful POST request', async () => {
    testServer
      .intercept({
        path: '/DispensingUnit/Request/History',
        method: 'POST',
      })
      .reply(200, testData.request.response);

      const state = {
        configuration
      }


      const finalState = await request("POST", "DispensingUnit/Request/History", { "search": {} })(state);

      expect(finalState.data).to.eql(testData.request.response);
  });
  it('makes a successful GET request', async () => {
    testServer
      .intercept({
      path: '/DispensingUnit/Dashboard/StockOutReport',
      method: 'GET'
    })
    .reply(200, testData.stockOutReport.response);

    const state = {
      configuration
    }

    const finalState = await request('GET', 'DispensingUnit/Dashboard/StockOutReport')(state);

    expect(finalState.data).to.eql(testData.stockOutReport.response)
  })
});

describe('get', () => {
  it('successfully gets a stockout report', async () => {
    testServer
      .intercept({
        path: '/DispensingUnit/Dashboard/StockOutReport',
        method: 'GET'
      })
      .reply(200, testData.stockOutReport.response);

    const state = {
      configuration
    };

    const finalState = await get("DispensingUnit/Dashboard/StockOutReport")(state);

    expect(finalState.data).to.eql(testData.stockOutReport.response)
  })
});


describe('post', () => {
  it('successfuly gets the dispensing unit history', async () => {
    testServer
      .intercept({
        path: '/DispensingUnit/Request/History',
        method: 'POST',
      })
      .reply(200, testData.request.response);

      const state = {
        configuration
      }


      const finalState = await post("DispensingUnit/Request/History", { "search": {} })(state);

      expect(finalState.data).to.eql(testData.request.response);
});
})
