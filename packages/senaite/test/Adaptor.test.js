import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { request } from '../src/Adaptor.js';
import testData from './fixtures.json' assert {type: 'json'};


const testServer = enableMockClient('https://fake.server.com');

const state = {
  configuration: {
    baseUrl: 'https://fake.server.com',
    username: 'hello',
    password: 'there',
    cookie: 'cookie'
  },
  data: {},
};

const options = {
  headers: { Cookie: state.configuration.cookie }
};

describe('request', () => {
  it('makes a request with the right verb and path', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/catalogs',
        method: 'GET',
        headers: {
          cookie: state.configuration.cookie
        },
      })
      .reply(200, testData.catalogs);


    const { data } = await request('GET', '/catalogs', options)(state);

    expect(data).to.eql(testData.catalogs);
  });

  it('throws an error if the service returns 403', async () => {
    testServer
      .intercept({
        path: '/noAccess',
        method: 'GET',
      })
      .reply(403);


    const error = await request('GET', '/noAccess', options)(state)
      .catch(error => error);


    expect(error.statusMessage).to.eql('Forbidden');
  });
});
