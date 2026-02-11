import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import testData from './fixtures.json' with { type: 'json' };
import { http } from '../src/index.js';


const testServer = enableMockClient('https://fake.openelis-global.org');

const state = {
  configuration: {
    baseUrl: 'https://fake.openelis-global.org',
    username: 'hello',
    password: 'there',
  },
};


describe('request', () => {
  it('should return an object of metrics', async () => {
    testServer
      .intercept({
        path: 'api/OpenELIS-Global/rest/home-dashboard/metrics',
        method: 'GET',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, testData.get.metrics);

    const finalState = await http.request('GET', 'home-dashboard/metrics')(state);

    expect(finalState.data).to.eql(testData.get.metrics);

  });

  it('should successfully update a patient', async () => {
    testServer
      .intercept({
        path: 'api/OpenELIS-Global/rest/PatientManagement',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200);

    const finalState = await http.request('POST', 'PatientManagement', testData.post.createPatient.payload)(state);

    expect(finalState.response.statusCode).to.eql(200);
  });
});


describe('get', () => {
  it('should return an object of metrics', async () => {
    testServer
      .intercept({
        path: 'api/OpenELIS-Global/rest/home-dashboard/metrics',
        method: 'GET',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, testData.get.metrics);

    const finalState = await http.get('home-dashboard/metrics')(state);

    expect(finalState.data).to.eql(testData.get.metrics);

  });

  it('should return all orders ready for validation', async () => {
    testServer
      .intercept({
        path: 'api/OpenELIS-Global/rest/home-dashboard/ORDERS_READY_FOR_VALIDATION',
        method: 'GET',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, testData.get.ordersReadyForValidation);

    const finalState = await http.get('home-dashboard/ORDERS_READY_FOR_VALIDATION')(state);

    expect(finalState.data).to.eql(testData.get.ordersReadyForValidation);

  });
});

describe('post', () => {
  it('makes a post request to the right endpoint with options', async () => {
    testServer
      .intercept({
        path: 'api/OpenELIS-Global/rest/LogbookResults',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200);

    const finalState = await http.post('LogbookResults')(state);
    expect(finalState.response.statusCode).to.eql(200);

  });
});