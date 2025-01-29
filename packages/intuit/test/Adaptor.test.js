import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { http } from '../src/index.js';

const testServer = enableMockClient('https://intuit.server.com');

const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
const configuration = {
  access_token: 'sometokenvalue',
  baseUrl: 'https://intuit.server.com',
};

describe('http.get', () => {
  it('should GET an account', async () => {
    testServer
      .intercept({
        path: '/v3/company/9341453908059321/companyinfo/9341453908059321',
        method: 'GET',
      })
      .reply(
        200,
        { Account: { Name: 'Accounts Payable' } },
        { ...jsonHeaders }
      );
    const state = { configuration };

    const { data } = await http.get(
      '/v3/company/9341453908059321/companyinfo/9341453908059321'
    )(state);

    expect(data['Account']['Name']).to.eql('Accounts Payable');
  });
});

describe('http.post', () => {
  const testBodyData = {
    Name: 'MyJob_testing_1',
    AccountType: 'Accounts Receivable',
  };

  beforeEach(() => {
    testServer
      .intercept({
        path: '/v3/company/9341453908059321/account',
        method: 'POST',
        query: {
          minorversion: 40,
        },
      })
      .reply(
        200,
        { Account: { Name: 'MyJob_testing_1', Active: true } },
        { ...jsonHeaders }
      );
  });

  const state = { configuration };
  it('should successfully create an account', async () => {
    const { data } = await http.post('/v3/company/9341453908059321/account', {
      query: {
        minorversion: 40,
      },
      body: testBodyData,
    })(state);

    expect(data['Account']['Name']).to.eql('MyJob_testing_1');
  });

  it('should make a request with the "POST" method', async () => {
    const response = await http.post('/v3/company/9341453908059321/account', {
      query: {
        minorversion: 40,
      },
      body: testBodyData,
    })(state);
    expect(response.response.method).to.eql('POST');
  });
  it('should make a POST request with query parameters', async () => {
    const { data } = await http.post('/v3/company/9341453908059321/account', {
      query: {
        minorversion: 40,
      },
      body: testBodyData,
    })(state);

    expect(data['Account']['Active']).to.eql(true);
  });
});
