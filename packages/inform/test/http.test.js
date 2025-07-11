import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, get } from '../src/http';

const testServer = enableMockClient('https://inform.server.com');

const configuration = {
  apiVersion: 'v1',
  baseUrl: 'https://inform.server.com',
  access_token: 'someaccesstoken',
};

const jsonHeaders = {
  headers: {
    'content-type': 'application/json',
  },
};

describe('request', () => {
  it('should get forms with a query', async () => {
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/forms`,
        method: 'GET',
        query: {
          public: true,
          page: 1,
          page_size: 5,
        },
      })

      .reply(
        200,
        {
          public: true,
          formid: 2,
        },
        jsonHeaders
      );

    const state = {
      configuration,
    };

    const finalState = await request('GET', 'forms', {
      query: {
        public: true,
        page: 1,
        page_size: 5,
      },
    })(state);

    expect(finalState.data).to.deep.eql({ public: true, formid: 2 });
  });
});

describe('get', () => {
  it('should get a single form', async () => {
    testServer
      .intercept({
        path: `/api/${configuration.apiVersion}/forms/6225`,
        method: 'GET',
      })

      .reply(
        200,
        {
          public: true,
          formid: 2,
        },
        jsonHeaders
      );

    const state = {
      configuration,
    };

    const finalState = await get('forms/6225')(state);

    expect(finalState.data).to.deep.eql({ public: true, formid: 2 });
  });
});
