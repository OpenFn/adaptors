import { enableMockClient } from '@openfn/language-common/util';
import { expect } from 'chai';
import { http } from '../src';

const testServer = enableMockClient('https://http-test.kobotoolbox.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  apiVersion: 'v2',
  baseUrl: 'https://http-test.kobotoolbox.org',
};
describe('http.get', () => {
  it('should GET with a query', async () => {
    testServer
      .intercept({
        path: '/api/v2/assets/',
        query: { format: 'json', metadata: 'on' },
        method: 'GET',
      })
      .reply(
        200,
        {
          results: [{ name: 'Feedback Survey Test', asset_type: 'survey' }],
        },
        { ...jsonHeaders }
      );
    const state = { configuration };

    const { response, data } = await http.get('/assets/', {
      query: { metadata: 'on' },
    })(state);
    expect(data.results[0].name).to.eql('Feedback Survey Test');
    expect(response.headers['content-type']).to.eql('application/json');
  });

  it('should make a GET request', async () => {
    testServer
      .intercept({
        path: '/api/v2/assets/',
        query: { format: 'json' },
        method: 'GET',
      })
      .reply(
        200,
        { results: [{ name: 'Feedback Survey Test', asset_type: 'survey' }] },
        { ...jsonHeaders }
      );
    const state = { configuration };

    const { data } = await http.get('/assets/')(state);

    expect(data.results[0].name).to.eql('Feedback Survey Test');
  });
});

describe('http.post', () => {
  it('should make a POST request', async () => {
    testServer
      .intercept({
        path: '/api/v2/assets/',
        query: { format: 'json' },
        method: 'POST',
        data: {
          name: 'Feedback Survey Test',
          asset_type: 'survey',
        },
      })
      .reply(
        200,
        { name: 'Feedback Survey Test', asset_type: 'survey' },
        { ...jsonHeaders }
      );
    const state = { configuration };

    const { data } = await http.post('/assets/', {
      name: 'Feedback Survey Test',
      asset_type: 'survey',
    })(state);

    expect(data.name).to.eql('Feedback Survey Test');
  });
});
