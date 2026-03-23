import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import testData from './fixtures.json' with { type: 'json' };
import { request, post, get } from '../src/Adaptor.js';
import { encodeFormBody } from '../src/Utils.js';

const testServer = enableMockClient('https://fake.dagu.com');

const configuration = {
  baseUrl: 'https://fake.dagu.com',
  username: 'abcdefghijkl',
  password: '12154545'
}

/**
 * encodeFormBody is tested in isolation here to document WHY a manual
 * multipart serialiser is needed instead of native FormData.
 *
 * undici's commonRequest uses dispatcher.request() internally. That API does
 * not serialise FormData bodies — only the fetch() API does (via extractBody).
 * Passing native FormData to dispatcher.request() throws:
 *   "Cannot read properties of null (reading 'byteLength')"
 * because the dispatcher tries to read byteLength on a FormData object that
 * has no such property. Manually building a multipart string sidesteps this
 * entirely and keeps the boundary consistent between header and body.
 */
// Helper to consume a ReadableStream into a string
async function readStream(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? chunk : new TextDecoder().decode(chunk));
  }
  return chunks.join('');
}

/**
 * encodeFormBody is tested in isolation here to document WHY a manual
 * serialiser wrapper is needed instead of passing FormData directly to commonRequest.
 *
 * undici's commonRequest uses dispatcher.request() internally. That API does
 * not serialise FormData bodies — only the fetch() API does (via extractBody).
 * Passing native FormData to dispatcher.request() throws:
 *   "Cannot read properties of null (reading 'byteLength')"
 * because the dispatcher tries to read byteLength on a FormData object.
 *
 * Wrapping FormData in a Response triggers the same extractBody() serialisation
 * that fetch() uses. The resulting ReadableStream is an async iterable that
 * dispatcher.request() handles natively.
 */
describe('encodeFormBody', () => {
  it('returns a multipart/form-data content-type with a boundary', () => {
    const { contentType } = encodeFormBody({ key: 'value' });
    expect(contentType).to.match(/^multipart\/form-data; boundary=/);
  });

  it('includes each flat field as a named form part', async () => {
    const { body, contentType } = encodeFormBody({ start: 0, length: -1, draw: 1 });
    const boundary = contentType.split('boundary=')[1];
    const bodyStr = await readStream(body);

    expect(bodyStr).to.include(`--${boundary}`);
    expect(bodyStr).to.include('Content-Disposition: form-data; name="start"');
    expect(bodyStr).to.include('Content-Disposition: form-data; name="length"');
    expect(bodyStr).to.include('Content-Disposition: form-data; name="draw"');
    expect(bodyStr).to.include(`--${boundary}--`);
  });

  it('JSON-stringifies nested objects so they survive as form field values', async () => {
    const nested = { filter: [{ fieldName: 'patientName', operator: 'Eq', value: 'Lee Lee' }] };
    const { body } = encodeFormBody({ additionalParameters: nested });
    const bodyStr = await readStream(body);

    expect(bodyStr).to.include('name="additionalParameters"');
    expect(bodyStr).to.include(JSON.stringify(nested));
  });

  it('uses a unique boundary on each call', () => {
    const { contentType: ct1 } = encodeFormBody({ a: '1' });
    const { contentType: ct2 } = encodeFormBody({ a: '1' });
    expect(ct1).to.not.equal(ct2);
  });
});

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

  it('sends body as multipart/form-data when contentType is "form"', async () => {
    let capturedHeaders;

    testServer
      .intercept({
        path: '/Patient/Prescription/History',
        method: 'POST',
      })
      .reply(200, (req) => {
        capturedHeaders = req.headers;
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
    expect(capturedHeaders['content-type']).to.match(/^multipart\/form-data; boundary=/);
  });
});
