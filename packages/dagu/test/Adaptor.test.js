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
      'Host': 'api.dagu.com',
    };

    await get('DispensingUnit/Dashboard/StockOutReport', {
      headers: customHeaders
    })(state);

    expect(loginHeaders['Host']).to.equal('api.dagu.com');
    expect(requestHeaders['Host']).to.equal('api.dagu.com');
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

  it('sends body as URL-encoded form when contentType is "form"', async () => {
    let capturedHeaders;
    let capturedBody;

    testServer
      .intercept({
        path: '/Patient/Prescription/History',
        method: 'POST',
      })
      .reply(200, (req) => {
        capturedHeaders = req.headers;
        capturedBody = req.body;
        return testData.request.response;
      });

    const state = { configuration };

    const finalState = await post(
      'Patient/Prescription/History',
      {
        start: 0,
        length: -1,
        draw: 1,
        additionalParameters: {
          filter: [{ fieldName: 'patientName', operator: 'Eq', value: 'Lee Lee' }],
        },
      },
      { contentType: 'form' }
    )(state);

    expect(finalState.data).to.eql(testData.request.response);
    expect(capturedHeaders['content-type']).to.equal('application/x-www-form-urlencoded');
    expect(capturedBody).to.include('start=0');
    expect(capturedBody).to.include('draw=1');
    // nested objects are JSON-stringified
    expect(capturedBody).to.include('additionalParameters=');
  });
});
