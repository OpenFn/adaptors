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

// Keep this describe block at the start to make sure it runs without a stale access token existing in util.js 
describe('request with custom headers', () => {
  it('should pass custom headers through getAccessToken to login', async () => {
    let loginHeaders;
    let requestHeaders;

    testServer
      .intercept({
        path: '/account/login',
        method: 'POST',
      })
      .reply(200, (req) => {
        loginHeaders = req.headers;
        return testData.login.response;
      });

    testServer
      .intercept({
        path: '/DispensingUnit/Dashboard/StockOutReport',
        method: 'GET',
      })
      .reply(200, (req) => {
        requestHeaders = req.headers;
        return testData.stockOutReport.response;
      });

    const state = {
      configuration,
    };

    const customHeaders = {
      'x-trace-id': 'trace-123',
    };

    await get('DispensingUnit/Dashboard/StockOutReport', {
      headers: customHeaders
    })(state);

    expect(loginHeaders['x-trace-id']).to.equal('trace-123');
    expect(requestHeaders['x-trace-id']).to.equal('trace-123');
  });

  it('should handle requests without custom headers', async () => {
    testServer
      .intercept({
        path: '/DispensingUnit/Dashboard/StockOutReport',
        method: 'GET',
      })
      .reply(200, testData.stockOutReport.response);

    const state = {
      configuration,
    };

    const finalState = await get('DispensingUnit/Dashboard/StockOutReport')(state);

    expect(finalState.data).to.eql(testData.stockOutReport.response);
  });
});

describe('request', () => {
  beforeEach(() => {
    testServer
      .intercept({
        path: '/account/login',
        method: 'POST',
      })
      .reply(200, testData.login.response);
  });


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
  beforeEach(() => {
    testServer
      .intercept({
        path: '/account/login',
        method: 'POST',
      })
      .reply(200, testData.login.response);
  });

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
  beforeEach(() => {
    testServer
      .intercept({
        path: '/account/login',
        method: 'POST',
      })
      .reply(200, testData.login.response);
  });

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
  })
});
