import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { request, get, post } from '../src/Adaptor.js';

const testServer = enableMockClient('https://fake.server.com');

// Base state factory — pass config overrides (e.g. { apiPath: 'api/v2' })
const makeState = (configOverrides = {}) => ({
  configuration: {
    baseUrl: 'https://fake.server.com',
    apiKey: 'test-api-key',
    ...configOverrides,
  },
  data: {},
});

describe('request', () => {
  it('makes a POST request to the right endpoint', async () => {
    testServer
      .intercept({ path: '/api/v1/sample', method: 'POST' })
      .reply(200, { code: 1, msg: 'success', data: { id: '7', barcode: 'BC001' } });

    const finalState = await request('POST', 'sample', {
      disease: 'disease-id-1',
      barcode: 'BC001',
    })(makeState());

    expect(finalState.data).to.eql({ code: 1, msg: 'success', data: { id: '7', barcode: 'BC001' } });
  });

  it('makes a GET request to the right endpoint', async () => {
    testServer
      .intercept({ path: '/api/v1/disease', method: 'GET' })
      .reply(200, { code: 1, msg: 'success', data: [{ id: '1', name: 'Cholera' }], total: 1 });

    const finalState = await request('GET', 'disease', null)(makeState());

    expect(finalState.data).to.eql({ code: 1, msg: 'success', data: [{ id: '1', name: 'Cholera' }], total: 1 });
  });

  it('sends a Bearer Authorization header', async () => {
    testServer
      .intercept({
        path: '/api/v1/disease',
        method: 'GET',
        headers: { authorization: 'Bearer test-api-key' },
      })
      .reply(200, { code: 1, msg: 'success', data: [] });

    const finalState = await request('GET', 'disease', null)(makeState());

    expect(finalState.data).to.eql({ code: 1, msg: 'success', data: [] });
  });

  it('sends the body as URL-encoded form data', async () => {
    let capturedBody;

    testServer
      .intercept({ path: '/api/v1/sample', method: 'POST' })
      .reply(200, req => {
        capturedBody = req.body;
        return { code: 1, msg: 'success' };
      });

    await request('POST', 'sample', { disease: 'disease-1', barcode: 'BC002' })(makeState());

    expect(capturedBody).to.eql('disease=disease-1&barcode=BC002');
  });

  it('prefixes the path with the default apiPath api/v1', async () => {
    testServer
      .intercept({ path: '/api/v1/area', method: 'GET' })
      .reply(200, { code: 1, msg: 'success', data: [], total: 0 });

    const finalState = await request('GET', 'area', null)(makeState());

    expect(finalState.data).to.eql({ code: 1, msg: 'success', data: [], total: 0 });
  });

  it('uses a custom apiPath from configuration', async () => {
    testServer
      .intercept({ path: '/api/v2/disease', method: 'GET' })
      .reply(200, { code: 1, msg: 'success', data: [], total: 0 });

    const finalState = await request(
      'GET',
      'disease',
      null,
    )(makeState({ apiPath: 'api/v2' }));

    expect(finalState.data).to.eql({ code: 1, msg: 'success', data: [], total: 0 });
  });

  it('appends previous data to state.references', async () => {
    testServer
      .intercept({ path: '/api/v1/disease', method: 'GET' })
      .reply(200, { code: 1, msg: 'success', data: [{ id: '1' }] });

    const state = { ...makeState(), data: { existing: true } };
    const finalState = await request('GET', 'disease', null)(state);

    expect(finalState.references).to.have.length(1);
    expect(finalState.references[0]).to.eql({ existing: true });
  });

  it('sets state.response without the body property', async () => {
    testServer
      .intercept({ path: '/api/v1/disease', method: 'GET' })
      .reply(200, { code: 1, msg: 'success', data: [] });

    const finalState = await request('GET', 'disease', null)(makeState());

    expect(finalState.response).to.exist;
    expect(finalState.response.body).to.be.undefined;
  });

  it('throws an error if the service returns 403', async () => {
    testServer
      .intercept({ path: '/api/v1/sample', method: 'POST' })
      .reply(403);

    const error = await request('POST', 'sample', { disease: 'disease-1' })(
      makeState(),
    ).catch(e => e);

    expect(error.statusMessage).to.eql('Forbidden');
  });
});

describe('get', () => {
  it('makes a GET request', async () => {
    testServer
      .intercept({ path: '/api/v1/indicator', method: 'GET' })
      .reply(200, { code: 1, msg: 'success', data: [{ id: 'abc', name: 'Taux de létalité' }], total: 1 });

    const finalState = await get('indicator')(makeState());

    expect(finalState.data).to.eql({ code: 1, msg: 'success', data: [{ id: 'abc', name: 'Taux de létalité' }], total: 1 });
  });
});

describe('post', () => {
  it('makes a POST request', async () => {
    testServer
      .intercept({ path: '/api/v1/sample', method: 'POST' })
      .reply(200, { code: 1, msg: 'success', data: { id: '99', barcode: 'BC099' } });

    const finalState = await post('sample', { disease: 'disease-1', barcode: 'BC099' })(makeState());

    expect(finalState.data).to.eql({ code: 1, msg: 'success', data: { id: '99', barcode: 'BC099' } });
  });
});
