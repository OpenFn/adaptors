import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import testData from './fixtures.json' assert { type: 'json' };
import { http } from '../src';

const testServer = enableMockClient('https://http-tests.openmrs.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  instanceUrl: 'https://http-tests.openmrs.org',
};

const state = {
  configuration,
  patient: testData.patient,
  encounter: testData.encounter,
};

describe('http.request', () => {
  it('should GET with a query', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah 1' },
        method: 'GET',
      })
      .reply(200, { results: testData.patientResults }, { ...jsonHeaders });

    const { data } = await http.request('GET', '/ws/rest/v1/patient', {
      query: { q: 'Sarah 1' },
    })(state);

    expect(data.results[0].display).to.eql(testData.patientResults[0].display);
  });

  it('should suppress 404 errors with the error map', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah 1' },
        method: 'GET',
      })
      .reply(404, {}, { ...jsonHeaders });

    const result = await http.request('GET', '/ws/rest/v1/patient', {
      query: { q: 'Sarah 1' },
      errors: { 404: false },
    })(state);

    expect(result.response.statusCode).to.equal(404);
  });

  it('should suppress all errors with the error map', async () => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah 1' },
        method: 'GET',
      })
      .reply(404, {}, { ...jsonHeaders });

    const result = await http.request('GET', '/ws/rest/v1/patient', {
      query: { q: 'Sarah 1' },
      errors: false,
    })(state);

    expect(result.response.statusCode).to.equal(404);
  });
});

describe('http.get', () => {
  beforeEach(() => {
    // Basic patient query interceptor
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        method: 'GET',
      })
      .reply(200, { results: testData.patientResults }, { ...jsonHeaders });

    // Patient query with params interceptor
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        query: { q: 'Sarah', startIndex: 1 },
        method: 'GET',
      })
      .reply(
        200,
        {
          results: testData.patientResults,
          links: [
            {
              rel: 'next',
              uri: 'https://fn.openmrs.org/ws/rest/v1/patient?q=Sarah&limit=1&startIndex=1',
              resourceAlias: null,
            },
          ],
        },
        { ...jsonHeaders }
      );
  });

  it('should make http request with the "GET" verb', async () => {
    const response = await http.get('/ws/rest/v1/patient')(state);
    expect(response.response.method).to.eql('GET');
  });

  it('should make a basic get request to openmrs', async () => {
    const { data } = await http.get('/ws/rest/v1/patient')(state);
    expect(data.results[0].display).to.eql(testData.patientResults[0].display);
  });

  it('should make a get request that includes query params', async () => {
    const options = {
      query: { q: 'Sarah', startIndex: 1 },
    };

    const { data } = await http.get('/ws/rest/v1/patient', options)(state);
    expect(data.results[0].display).to.eql(testData.patientResults[0].display);
  });
});

describe('http.post', () => {
  beforeEach(() => {
    // Basic patient query interceptor
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        method: 'POST',
        data: testData.newPatient,
      })
      .reply(200, { results: testData.patientResults }, { ...jsonHeaders });

    // Invalid request interceptor
    testServer
      .intercept({
        path: '/ws/rest/v1/wrong-url',
        method: 'POST',
        data: testData.newPatient,
      })
      .reply(404, { ...jsonHeaders });
  });

  it('should make http request with the "POST" verb', async () => {
    const response = await http.post(
      '/ws/rest/v1/patient',
      testData.newPatient
    )(state);
    expect(response.response.method).to.eql('POST');
  });

  it('should make a successful POST request to openmrs', async () => {
    const { data } = await http.post(
      '/ws/rest/v1/patient',
      testData.newPatient
    )(state);
    expect(data.results[0].display).to.eql(testData.patientResults[0].display);
  });

  it('should throw an error for an invalid request', async () => {
    try {
      await http.post('/ws/rest/v1/wrong-url', testData.newPatient)(state);
    } catch (e) {
      expect(e.statusCode).to.eql(404);
    }
  });
});

describe('http.put', () => {
  beforeEach(() => {
    testServer
      .intercept({
        path: '/ws/rest/v1/patient',
        method: 'PUT',
        data: testData.newPatient,
      })
      .reply(200, { results: testData.patientResults }, { ...jsonHeaders });
  });

  it('should make http request with the PUT verb', async () => {
    const response = await http.put(
      '/ws/rest/v1/patient',
      testData.newPatient
    )(state);
    expect(response.response.statusCode).to.eql(200);
    expect(response.response.method).to.eql('PUT');
  });
});

describe('http.delete', () => {
  beforeEach(() => {
    // Basic patient query interceptor
    testServer
      .intercept({
        path: '/ws/rest/v1/patient/abc',
        method: 'DELETE',
      })
      .reply(200, { ...jsonHeaders });

    // Invalid request interceptor
    testServer
      .intercept({
        path: '/ws/rest/v1/patient/non-existent',
        method: 'DELETE',
      })
      .reply(404, { ...jsonHeaders });
  });

  it('should make http request with the "DELETE" verb', async () => {
    const response = await http.delete('/ws/rest/v1/patient/abc')(state);
    expect(response.response.method).to.eql('DELETE');
  });

  it('should make a successful DELETE request to openmrs', async () => {
    const response = await http.delete('/ws/rest/v1/patient/abc')(state);
    expect(response.response.statusCode).to.eql(200);
  });

  it('should throw an error for an invalid request', async () => {
    try {
      await http.delete('/ws/rest/v1/patient/non-existent')(state);
    } catch (e) {
      expect(e.statusCode).to.eql(404);
    }
  });
});
