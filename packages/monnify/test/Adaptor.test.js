import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import testData from './fixtures.json' with { type: 'json' };
import { request, post, get } from '../src/Adaptor.js';
import { requestWithPagination } from '../src/Utils.js';

const testServer = enableMockClient('https://fake.monnify.com');

const configuration = {
  'baseUrl': 'https://fake.monnify.com',
  'apiKey': 'MK_TEST_YRP3AJ7RQ2',
  'secretKey': 'JKML52W7XQ43C02VRFDNQ8KLAU459W8C'
}

beforeEach(() => {
  testServer
    .intercept({
      path: '/api/v1/auth/login',
      method: 'POST',
    })
    .reply(200, testData.login.response);
});

describe('request', () => {
  it('makes a successful GET request', async () => {
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          pageNo: 0,
          pageSize: 10,
          sourceAccountNumber: 4864192954
        }
      })
      .reply(200, testData.disbursements.response);

    const state = {
      configuration
    }

    const finalState = await request(
      'GET',
      '/api/v2/disbursements/search-transactions',
      {},
      {
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 0,
          pageSize: 10
        }
      }
    )(state);

    expect(finalState.data).to.eql(testData.disbursements.response);
  });

  it('makes a successful POST request', async () => {
    testServer
      .intercept({
        path: '/api/v1/transaction-notification/resend-failed-notifications',
        method: 'POST'
      })
      .reply(200, testData.notifications.response);

    const state = {
      configuration
    }

    const finalState = await request(
      'POST',
      '/api/v1/transaction-notification/resend-failed-notifications',
      {
        "startDate": "2021-01-16T13:56:39.492",
        "endDate": "2021-10-16T13:56:39.492"
      }
    )(state);

    expect(finalState.data).to.eql(testData.notifications.response)
  })
});


describe('get', () => {
  it('successfully gets disbursements', async () => {
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          pageNo: 0,
          pageSize: 10
        }
      })
      .reply(200, testData.disbursements.response);

    const state = {
      configuration: {
        ...configuration,
        access_token: 'test-token'
      }
    };

    const finalState = await get("/api/v2/disbursements/search-transactions", {
      query: {
        pageNo: 0,
        pageSize: 10
      }
    })(state);

    expect(finalState.data).to.eql(testData.disbursements.response)
  });

  it('respects pagination params', async () => {
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 0,
          offset: 0,
          pageSize: 10
        }
      }).reply(200, testData.disbursements.paginated_response);

    const state = {
      configuration
    };

    const finalState = await get("/api/v2/disbursements/search-transactions", {
      query: {
        sourceAccountNumber: 4864192954,
        pageNo: 0,
        offset: 0,
        pageSize: 10
      }
    })(state);

    expect(finalState.data).to.eql(testData.disbursements.paginated_response);
  });

});

describe('post', () => {
  it('successfully makes a post request', async () => {
    testServer
      .intercept({
        path: '/api/v1/transaction-notification/resend-failed-notifications',
        method: 'POST'
      })
      .reply(200, testData.disbursements.response);

    const state = {
      configuration
    };

    const finalState = await post("/api/v1/transaction-notification/resend-failed-notifications", {
      "startDate": "2021-01-16T13:56:39.492",
      "endDate": "2021-10-16T13:56:39.492"
    })(state);

    expect(finalState.data).to.eql(testData.disbursements.response)
  })
});

describe('pagination', () => {
  it('respects pagination params when provided', async () => {
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 1,
          pageSize: 2
        }
      })
      .reply(200, testData.pagination.page2);

    const state = {
      configuration
    };

    const finalState = await get('/api/v2/disbursements/search-transactions', {
      query: {
        sourceAccountNumber: 4864192954,
        pageNo: 1,
        pageSize: 2
      }
    })(state);

    expect(finalState.data).to.eql(testData.pagination.page2);
    expect(finalState.data.responseBody.content).to.have.lengthOf(2);
    expect(finalState.data.responseBody.content[0].id).to.equal(3);
  });

  it('fetches all pages when no pagination params provided', async () => {
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 0,
          pageSize: 100
        }
      })
      .reply(200, testData.pagination.page1);

    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 1,
          pageSize: 100
        }
      })
      .reply(200, testData.pagination.page2);

    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 2,
          pageSize: 100
        }
      })
      .reply(200, testData.pagination.page3);

    const state = {
      configuration: {
        ...configuration,
        access_token: 'test-token'
      }
    };

    const finalState = await get('/api/v2/disbursements/search-transactions', {
      query: {
        sourceAccountNumber: 4864192954
      }
    })(state);

    expect(finalState.data.responseBody.content).to.have.lengthOf(5);
    expect(finalState.data.responseBody.allPagesFetched).to.be.true;
    expect(finalState.data.responseBody.totalElements).to.equal(5);
    expect(finalState.data.responseBody.content[0].id).to.equal(1);
    expect(finalState.data.responseBody.content[4].id).to.equal(5);
  });

  it('validates pageSize does not exceed 1000', async () => {
    testServer
      .intercept({
        path: '/api/v2/disbursements/search-transactions',
        method: 'GET',
        query: {
          sourceAccountNumber: 4864192954,
          pageNo: 0,
          pageSize: 1000
        }
      })
      .reply(200, testData.pagination.page1);

    const state = {
      configuration
    };

    const finalState = await get('/api/v2/disbursements/search-transactions', {
      query: {
        sourceAccountNumber: 4864192954,
        pageNo: 0,
        pageSize: 1500
      }
    })(state);

    expect(finalState.data).to.eql(testData.pagination.page1);
  });
});

describe('requestWithPagination', () => {
  const configWithToken = {
    ...configuration,
    access_token: 'test-token'
  };

  describe('when pagination params are provided', () => {
    it('returns a single page when pageSize is provided', async () => {
      testServer
        .intercept({
          path: '/api/v2/disbursements/search-transactions',
          method: 'GET',
          query: {
            sourceAccountNumber: 4864192954,
            pageNo: 0,
            pageSize: 10
          }
        })
        .reply(200, testData.pagination.page1);

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/disbursements/search-transactions',
        {
          query: {
            sourceAccountNumber: 4864192954,
            pageSize: 10
          }
        }
      );

      expect(response.body).to.eql(testData.pagination.page1);
      expect(response.body.responseBody.content).to.have.lengthOf(2);
    });

    it('returns a single page when pageNo is provided', async () => {
      testServer
        .intercept({
          path: '/api/v2/disbursements/search-transactions',
          method: 'GET',
          query: {
            sourceAccountNumber: 4864192954,
            pageNo: 1,
            pageSize: 100
          }
        })
        .reply(200, testData.pagination.page2);

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/disbursements/search-transactions',
        {
          query: {
            sourceAccountNumber: 4864192954,
            pageNo: 1
          }
        }
      );

      expect(response.body).to.eql(testData.pagination.page2);
      expect(response.body.responseBody.content[0].id).to.equal(3);
    });

    it('returns a single page when both pageSize and pageNo are provided', async () => {
      testServer
        .intercept({
          path: '/api/v2/disbursements/search-transactions',
          method: 'GET',
          query: {
            sourceAccountNumber: 4864192954,
            pageNo: 1,
            pageSize: 2
          }
        })
        .reply(200, testData.pagination.page2);

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/disbursements/search-transactions',
        {
          query: {
            sourceAccountNumber: 4864192954,
            pageNo: 1,
            pageSize: 2
          }
        }
      );

      expect(response.body).to.eql(testData.pagination.page2);
    });
  });

  describe('when no pagination params are provided', () => {
    it('fetches all pages automatically', async () => {
      testServer
        .intercept({
          path: '/api/v2/disbursements/search-transactions',
          method: 'GET',
          query: {
            sourceAccountNumber: 4864192954,
            pageNo: 0,
            pageSize: 100
          }
        })
        .reply(200, testData.pagination.page1);

      testServer
        .intercept({
          path: '/api/v2/disbursements/search-transactions',
          method: 'GET',
          query: {
            sourceAccountNumber: 4864192954,
            pageNo: 1,
            pageSize: 100
          }
        })
        .reply(200, testData.pagination.page2);

      testServer
        .intercept({
          path: '/api/v2/disbursements/search-transactions',
          method: 'GET',
          query: {
            sourceAccountNumber: 4864192954,
            pageNo: 2,
            pageSize: 100
          }
        })
        .reply(200, testData.pagination.page3);

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/disbursements/search-transactions',
        {
          query: {
            sourceAccountNumber: 4864192954
          }
        }
      );

      expect(response.body.responseBody.content).to.have.lengthOf(5);
      expect(response.body.responseBody.allPagesFetched).to.be.true;
      expect(response.body.responseBody.totalElements).to.equal(5);
      expect(response.body.responseBody.content[0].id).to.equal(1);
      expect(response.body.responseBody.content[4].id).to.equal(5);
    });

    it('aggregates content from all pages correctly', async () => {
      testServer
        .intercept({
          path: '/api/v2/transactions',
          method: 'GET',
          query: {
            pageNo: 0,
            pageSize: 100
          }
        })
        .reply(200, {
          requestSuccessful: true,
          responseMessage: 'success',
          responseCode: '0',
          responseBody: {
            content: [{ id: 1 }, { id: 2 }],
            last: false
          }
        });

      testServer
        .intercept({
          path: '/api/v2/transactions',
          method: 'GET',
          query: {
            pageNo: 1,
            pageSize: 100
          }
        })
        .reply(200, {
          requestSuccessful: true,
          responseMessage: 'success',
          responseCode: '0',
          responseBody: {
            content: [{ id: 3 }, { id: 4 }],
            last: true
          }
        });

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/transactions',
        { query: {} }
      );

      expect(response.body.responseBody.content).to.deep.equal([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 }
      ]);
      expect(response.body.responseBody.totalElements).to.equal(4);
    });

    it('handles empty content arrays', async () => {
      testServer
        .intercept({
          path: '/api/v2/empty',
          method: 'GET',
          query: {
            pageNo: 0,
            pageSize: 100
          }
        })
        .reply(200, {
          requestSuccessful: true,
          responseMessage: 'success',
          responseCode: '0',
          responseBody: {
            content: [],
            last: true
          }
        });

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/empty',
        { query: {} }
      );

      expect(response.body.responseBody.content).to.have.lengthOf(0);
      expect(response.body.responseBody.totalElements).to.equal(0);
      expect(response.body.responseBody.allPagesFetched).to.be.true;
    });

    it('handles response without content array', async () => {
      testServer
        .intercept({
          path: '/api/v2/no-content',
          method: 'GET',
          query: {
            pageNo: 0,
            pageSize: 100
          }
        })
        .reply(200, {
          requestSuccessful: true,
          responseMessage: 'success',
          responseCode: '0',
          responseBody: {
            last: true
          }
        });

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/no-content',
        { query: {} }
      );

      expect(response.body.responseBody.content).to.have.lengthOf(0);
      expect(response.body.responseBody.totalElements).to.equal(0);
    });

    it('stops fetching when last page is reached', async () => {
      let requestCount = 0;

      testServer
        .intercept({
          path: '/api/v2/limited',
          method: 'GET',
          query: {
            pageNo: 0,
            pageSize: 100
          }
        })
        .reply(200, () => {
          requestCount++;
          return {
            requestSuccessful: true,
            responseMessage: 'success',
            responseCode: '0',
            responseBody: {
              content: [{ id: 1 }],
              last: true
            }
          };
        });

      await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/limited',
        { query: {} }
      );

      expect(requestCount).to.equal(1);
    });
  });

  describe('pageSize validation', () => {
    it('caps pageSize at 1000 when a larger value is provided', async () => {
      testServer
        .intercept({
          path: '/api/v2/large-page',
          method: 'GET',
          query: {
            pageNo: 0,
            pageSize: 1000
          }
        })
        .reply(200, {
          requestSuccessful: true,
          responseMessage: 'success',
          responseCode: '0',
          responseBody: {
            content: [{ id: 1 }],
            last: true
          }
        });

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/large-page',
        {
          query: {
            pageSize: 1500
          }
        }
      );

      expect(response.body.responseBody.content[0].id).to.equal(1);
    });

    it('uses pageSize as-is when it is 1000 or less', async () => {
      testServer
        .intercept({
          path: '/api/v2/valid-page',
          method: 'GET',
          query: {
            pageNo: 0,
            pageSize: 500
          }
        })
        .reply(200, {
          requestSuccessful: true,
          responseMessage: 'success',
          responseCode: '0',
          responseBody: {
            content: [{ id: 1 }],
            last: true
          }
        });

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/valid-page',
        {
          query: {
            pageSize: 500
          }
        }
      );

      expect(response.body.responseBody.content[0].id).to.equal(1);
    });
  });

  describe('default pageSize behavior', () => {
    it('uses default pageSize of 100 when not specified', async () => {
      testServer
        .intercept({
          path: '/api/v2/default-size',
          method: 'GET',
          query: {
            pageNo: 0,
            pageSize: 100
          }
        })
        .reply(200, {
          requestSuccessful: true,
          responseMessage: 'success',
          responseCode: '0',
          responseBody: {
            content: [{ id: 1 }],
            last: true
          }
        });

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/default-size',
        { query: {} }
      );

      expect(response.body.responseBody.content[0].id).to.equal(1);
    });
  });

  describe('response structure', () => {
    it('returns the expected structure for auto-paginated requests', async () => {
      testServer
        .intercept({
          path: '/api/v2/structure-test',
          method: 'GET',
          query: {
            pageNo: 0,
            pageSize: 100
          }
        })
        .reply(200, {
          requestSuccessful: true,
          responseMessage: 'success',
          responseCode: '0',
          responseBody: {
            content: [{ id: 1 }],
            last: true
          }
        });

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/structure-test',
        { query: {} }
      );

      expect(response.body).to.have.property('requestSuccessful', true);
      expect(response.body).to.have.property('responseMessage', 'success');
      expect(response.body).to.have.property('responseCode', '0');
      expect(response.body.responseBody).to.have.property('content');
      expect(response.body.responseBody).to.have.property('totalElements');
      expect(response.body.responseBody).to.have.property('allPagesFetched', true);
    });
  });

  describe('edge cases', () => {
    it('handles query parameters alongside pagination', async () => {
      testServer
        .intercept({
          path: '/api/v2/with-filters',
          method: 'GET',
          query: {
            status: 'SUCCESS',
            currency: 'NGN',
            pageNo: 0,
            pageSize: 100
          }
        })
        .reply(200, {
          requestSuccessful: true,
          responseMessage: 'success',
          responseCode: '0',
          responseBody: {
            content: [{ id: 1, status: 'SUCCESS' }],
            last: true
          }
        });

      const response = await requestWithPagination(
        configWithToken,
        'GET',
        '/api/v2/with-filters',
        {
          query: {
            status: 'SUCCESS',
            currency: 'NGN'
          }
        }
      );

      expect(response.body.responseBody.content[0].status).to.equal('SUCCESS');
    });
  });
});