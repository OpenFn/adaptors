import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, get, post } from '../src/Adaptor.js';

const testServer = enableMockClient('https://cybaq.pesapal.com');

const configuration = {
  apiVersion: 'pesapalv3',
  baseUrl: 'https://cybaq.pesapal.com',
  access_token: 'someaccesstoken',
};

describe('request', () => {
  it('makes a post request to the right endpoint', async () => {
    testServer
      .intercept({
        path: `/${configuration.apiVersion}/api/URLSetup/RegisterIPN`,
        method: 'POST',
      })

      .reply(200, {
        status: '200',
        ipn_status_description: 'Active',
        ipn_status: 1,
      });

    const state = {
      configuration,
    };

    const finalState = await request('POST', 'URLSetup/RegisterIPN', {
      url: 'https://www.myapplication.com/ipn',
      ipn_notification_type: 'GET',
    })(state);

    expect(finalState.data).to.eql({
      status: '200',
      ipn_status_description: 'Active',
      ipn_status: 1,
    });
  });

  it('should get transaction status', async () => {
    testServer
      .intercept({
        path: `/${configuration.apiVersion}/api/GetTransactionStatus`,
        method: 'GET',
        query: {
          orderTrackingId: '123456',
        },
      })

      .reply(200, undefined, {
        headers: { 'Content-Length': '0' },
      });

    const state = {
      configuration,
    };

    const finalState = await request(
      'GET',
      'GetTransactionStatus',
      {},
      {
        query: {
          orderTrackingId: '123456',
        },
      }
    )(state);

    expect(finalState.data).to.eql(undefined);
  });
});

describe('get', () => {
  it('get registered IPN urls', async () => {
    testServer
      .intercept({
        path: `/${configuration.apiVersion}/api/URLSetup/GetIpnList`,
        method: 'GET',
      })

      .reply(200, [
        {
          status: '200',
          ipn_id: 'e32182ca-0983-4fa0-91bc-c3bb813ba750',
        },
      ]);

    const state = {
      configuration,
    };

    const finalState = await get('URLSetup/GetIpnList')(state);

    expect(finalState.data[0]).to.eql({
      status: '200',
      ipn_id: 'e32182ca-0983-4fa0-91bc-c3bb813ba750',
    });
  });
});

describe('post', () => {
  it('send order request', async () => {
    testServer
      .intercept({
        path: `/${configuration.apiVersion}/api/Transactions/SubmitOrderRequest`,
        method: 'POST',
      })

      .reply(200, {
        order_tracking_id: 'bb83d2bd-befb-413b-8f74-dbf77ae4be52',
        merchant_reference: 'TEST-05',
        redirect_url:
          'https://server.pesapal.com/pesapaliframe/PesapalIframe3/Index?OrderTrackingId=dbf77ae4be52',
        error: null,
        status: '200',
      });

    const state = {
      configuration,
    };

    const finalState = await post('Transactions/SubmitOrderRequest', {
      id: 'TEST-05',
      currency: 'KES',
      amount: '1',
      description: 'Testing',
      callback_url: 'https://www.myapplication.com/response-page',
      notification_id: 'fe078e53',
      billing_address: {
        email_address: 'john.doe@example.com',
        phone_number: '0712345678',
        country_code: '',
        first_name: 'Doe',
        middle_name: '',
        last_name: 'John',
        line_1: '',
        line_2: '',
        city: '',
        state: '',
        postal_code: '',
        zip_code: '',
      },
    })(state);

    expect(finalState.data.merchant_reference).to.eql('TEST-05');
  });
});
