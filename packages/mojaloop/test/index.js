import {
  execute,
  request,
  get,
  post,
  put,
  patch,
  del,
  getParties,
  createConsentRequest,
  getConsent,
  updateConsent,
  revokeConsent,
  createThirdPartyRequest,
  getThirdPartyRequest,
  authorizeThirdPartyRequest,
  getAccounts,
} from '../src/index.js';
import { enableMockClient } from '@openfn/language-common/util';
import { expect } from 'chai';

const testServer = enableMockClient('https://mojaloop.example.com');

describe('execute()', () => {
  it('executes each operation in sequence', () => {
    let state = {};
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    return execute(...operations)(state).then(finalState => {
      expect(finalState).to.eql({ counter: 3 });
    });
  });

  it('assigns references, data to the initialState', done => {
    let state = {};

    execute()(state)
      .then(finalState => {
        expect(finalState).to.eql({
          references: [],
          data: null,
        });
      })
      .then(done)
      .catch(done);
  });
});

describe('request()', () => {
  it('should make a GET request', async () => {
    testServer
      .intercept({ path: '/parties/MSISDN/123456789' })
      .reply(200, { party: { name: 'John Doe' } });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(
      request('GET', '/parties/MSISDN/123456789')
    )(state);

    expect(result.data).to.eql({ party: { name: 'John Doe' } });
  });

  it('should throw if no baseUrl is set and no url is provided', async () => {
    const state = {
      configuration: null,
    };
    let err;
    try {
      await execute(request('GET'))(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.eql('NO_URL');
  });

  it('should work with absolute URL when baseUrl is not set', async () => {
    testServer
      .intercept({ path: '/parties/MSISDN/123456789' })
      .reply(200, { party: { name: 'Jane Doe' } });

    const state = {
      configuration: null,
    };
    const result = await execute(
      request('GET', 'https://mojaloop.example.com/parties/MSISDN/123456789')
    )(state);
    expect(result.data).to.eql({ party: { name: 'Jane Doe' } });
  });

  it('should throw if baseUrl is not set and url is relative', async () => {
    const state = {
      configuration: null,
    };
    let err;
    try {
      await execute(request('GET', 'parties/MSISDN/123456789'))(state);
    } catch (e) {
      err = e;
    }
    expect(err.code).to.eql('UNEXPECTED_RELATIVE_URL');
  });
});

describe('get()', () => {
  it('should make a GET request', async () => {
    testServer
      .intercept({ path: '/parties/MSISDN/123456789' })
      .reply(200, { party: { name: 'John Doe' } });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(get('/parties/MSISDN/123456789'))(state);

    expect(result.data).to.eql({ party: { name: 'John Doe' } });
  });
});

describe('post()', () => {
  it('should make a POST request with body', async () => {
    testServer
      .intercept({
        path: '/consentRequests',
        method: 'POST',
      })
      .reply(201, { consentRequestId: '123', status: 'PENDING' });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(
      post('/consentRequests', {
        consentRequestId: '123',
        userId: 'user123',
      })
    )(state);

    expect(result.data).to.eql({ consentRequestId: '123', status: 'PENDING' });
  });
});

describe('put()', () => {
  it('should make a PUT request', async () => {
    testServer
      .intercept({
        path: '/consents/123',
        method: 'PUT',
      })
      .reply(200, { consentId: '123', status: 'ACTIVE' });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(
      put('/consents/123', {
        status: 'ACTIVE',
      })
    )(state);

    expect(result.data).to.eql({ consentId: '123', status: 'ACTIVE' });
  });
});

describe('patch()', () => {
  it('should make a PATCH request', async () => {
    testServer
      .intercept({
        path: '/consents/123',
        method: 'PATCH',
      })
      .reply(200, { consentId: '123', status: 'UPDATED' });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(
      patch('/consents/123', {
        status: 'UPDATED',
      })
    )(state);

    expect(result.data).to.eql({ consentId: '123', status: 'UPDATED' });
  });
});

describe('del()', () => {
  it('should make a DELETE request', async () => {
    testServer
      .intercept({
        path: '/consents/123',
        method: 'DELETE',
      })
      .reply(204);

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(del('/consents/123'))(state);

    expect(result.response.statusCode).to.eql(204);
  });
});

describe('getParties()', () => {
  it('should get party information', async () => {
    testServer
      .intercept({ path: '/parties/MSISDN/123456789' })
      .reply(200, {
        party: {
          partyIdInfo: {
            partyIdType: 'MSISDN',
            partyIdentifier: '123456789',
          },
          name: 'John Doe',
        },
      });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(getParties('MSISDN', '123456789'))(state);

    expect(result.data.party.name).to.eql('John Doe');
  });
});

describe('createConsentRequest()', () => {
  it('should create a consent request', async () => {
    testServer
      .intercept({
        path: '/consentRequests',
        method: 'POST',
      })
      .reply(201, { consentRequestId: '123', status: 'PENDING' });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(
      createConsentRequest({
        consentRequestId: '123',
        userId: 'user123',
        scopes: [{ accountId: 'acc123', actions: ['ACCOUNTS_TRANSFER'] }],
      })
    )(state);

    expect(result.data.consentRequestId).to.eql('123');
  });
});

describe('getConsent()', () => {
  it('should get consent details', async () => {
    testServer
      .intercept({ path: '/consents/consent123' })
      .reply(200, { consentId: 'consent123', status: 'ACTIVE' });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(getConsent('consent123'))(state);

    expect(result.data.consentId).to.eql('consent123');
  });
});

describe('updateConsent()', () => {
  it('should update a consent', async () => {
    testServer
      .intercept({
        path: '/consents/consent123',
        method: 'PUT',
      })
      .reply(200, { consentId: 'consent123', status: 'ACTIVE' });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(
      updateConsent('consent123', { status: 'ACTIVE' })
    )(state);

    expect(result.data.status).to.eql('ACTIVE');
  });
});

describe('revokeConsent()', () => {
  it('should revoke a consent', async () => {
    testServer
      .intercept({
        path: '/consents/consent123',
        method: 'DELETE',
      })
      .reply(204);

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(revokeConsent('consent123'))(state);

    expect(result.response.statusCode).to.eql(204);
  });
});

describe('createThirdPartyRequest()', () => {
  it('should create a third party transaction request', async () => {
    testServer
      .intercept({
        path: '/thirdpartyRequests/transactions',
        method: 'POST',
      })
      .reply(201, { transactionRequestId: 'txn123', status: 'PENDING' });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(
      createThirdPartyRequest({
        transactionRequestId: 'txn123',
        amountType: 'SEND',
        amount: { currency: 'USD', amount: '100' },
      })
    )(state);

    expect(result.data.transactionRequestId).to.eql('txn123');
  });
});

describe('getThirdPartyRequest()', () => {
  it('should get third party transaction request', async () => {
    testServer
      .intercept({ path: '/thirdpartyRequests/transactions/txn123' })
      .reply(200, { transactionRequestId: 'txn123', status: 'PENDING' });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(getThirdPartyRequest('txn123'))(state);

    expect(result.data.transactionRequestId).to.eql('txn123');
  });
});

describe('authorizeThirdPartyRequest()', () => {
  it('should authorize a third party transaction request', async () => {
    testServer
      .intercept({
        path: '/thirdpartyRequests/transactions/txn123',
        method: 'PUT',
      })
      .reply(200, { transactionRequestId: 'txn123', status: 'AUTHORIZED' });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(
      authorizeThirdPartyRequest('txn123', {
        authorizationResponse: { responseType: 'ACCEPTED' },
      })
    )(state);

    expect(result.data.status).to.eql('AUTHORIZED');
  });
});

describe('getAccounts()', () => {
  it('should get accounts by consent ID', async () => {
    testServer
      .intercept({ path: '/accounts/consent123' })
      .reply(200, { accounts: [{ accountId: 'acc123' }] });

    const state = {
      configuration: {
        baseUrl: 'https://mojaloop.example.com',
      },
    };

    const result = await execute(getAccounts('consent123'))(state);

    expect(result.data.accounts).to.be.an('array');
  });
});
