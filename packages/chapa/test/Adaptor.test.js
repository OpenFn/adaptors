import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { initTransaction } from '../src/Adaptor.js';

const testServer = enableMockClient('https://api.chapa.co');

describe('request', () => {
  it('should initialize transaction', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: 'v1/transaction/initialize',
        method: 'POST',
        headers: {
          Authorization: 'Bearer imasecret',
        },
      })
      // Set the reply from this endpoint
      // The body will be returned to state.data
      .reply(200, {
        message: 'Hosted Link',
        status: 'success',
        data: {
          checkout_url: 'https://checkout.chapa.co/checkout/payment/abc',
        },
      });

    const state = {
      configuration: {
        secretKey: 'imasecret',
      },
      data: {
        phone_number: '7563202939',
        amount: 20,
      },
    };

    const finalState = await initTransaction(state.data)(state);

    console.log(finalState);
    // expect(finalState.data).to.eql({
    //   fullName: 'Mamadou',
    //   gender: 'M',
    //   id: 7,
    // });
  });

  it.skip('throws an error if the service returns 403', async () => {
    testServer
      .intercept({
        path: '/api/noAccess',
        method: 'POST',
      })
      .reply(403);

    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await request('POST', 'noAccess', { name: 'taylor' })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Forbidden');
  });
});
