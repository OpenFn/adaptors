import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { request, stkPush, checkTransactionStatus, registerUrl, remitTax, buyGoods } from '../src/Adaptor.js';
import testData from './fixtures.json' assert {type: 'json'}

const testServer = enableMockClient('https://api.safaricom.co.ke');

let state = {
  configuration: {
    "short_code": 174379,
    "pass_key": "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
    "consumer_key": "GA2PNftcXvv2uC2VdgNjxXyvF8eZ4td6iBsL7N7N2ZFnXzf3",
    "consumer_secret": "zKjr2j0jjihCtzIwzGtgnV0YgP82jZf1hY9RW6HygntWG6AGuf4tAUe3E5tPtiyA",
  }
}


describe('STK push', () => {
  it('makes an STK push request', async () => {
    testServer
      .intercept({
        path: '/mpesa/stkpush/v1/processrequest',
        method: 'POST'
      })
      .reply(200, { ...testData.stkPush.response });


    const { data } = await stkPush({ ...testData.stkPush.request }, { headers: { Authorization: 'Bearer xyz' } })(state);
    expect(data).to.eql(testData.stkPush.response);
  });

  it('throws an error if the payload is invalid', async () => {
    testServer
      .intercept({
        path: '/mpesa/stkpush/v1/processrequest',
        method: 'POST',
      })
      .reply(400);

    const error = await stkPush({ Amount: 1 }, { headers: { Authorization: 'Bearer xyz' } })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Bad Request');
  });
});

describe('Check transaction status', () => {
  it('makes a successful status check', async () => {
    testServer
      .intercept({
        path: '/mpesa/transactionstatus/v1/query',
        method: 'POST'
      })
      .reply(200, { ...testData.checkTransactionStatus.response });


    const { data } = await checkTransactionStatus({ ...testData.checkTransactionStatus.request }, { headers: { Authorization: 'Bearer xyz' } })(state);
    expect(data).to.eql(testData.checkTransactionStatus.response);
  });

  it('throws an error if the check transaction payload is invalid', async () => {
    testServer
      .intercept({
        path: '/mpesa/transactionstatus/v1/query',
        method: 'POST',
      })
      .reply(400);

    const error = await checkTransactionStatus({ property: 'fake' }, { headers: { Authorization: 'Bearer xyz' } })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Bad Request');
  });
});

describe('Register URL', () => {
  it('Registers a URL successfully', async () => {
    testServer
      .intercept({
        path: '/mpesa/c2b/v1/registerurl',
        method: 'POST'
      })
      .reply(200, { ...testData.registerURL.response });


    const { data } = await registerUrl({ ...testData.registerURL.request }, { headers: { Authorization: 'Bearer xyz' } })(state);
    expect(data).to.eql(testData.registerURL.response);
  });

  it('throws an error if the payload is invalid', async () => {
    testServer
      .intercept({
        path: '/mpesa/c2b/v1/registerurl',
        method: 'POST',
      })
      .reply(400);

    const error = await registerUrl({ property: 'fake' }, { headers: { Authorization: 'Bearer xyz' } })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Bad Request');
  });
});

describe('Remit tax', () => {
  it('Sends a successfull remit-tax request', async () => {
    testServer
      .intercept({
        path: '/mpesa/b2b/v1/remittax',
        method: 'POST'
      })
      .reply(200, { ...testData.remitTax.response });


    const { data } = await remitTax({ ...testData.remitTax.request }, { headers: { Authorization: 'Bearer xyz' } })(state);
    expect(data).to.eql(testData.remitTax.response);
  });

  it('throws an error if the payload is invalid', async () => {
    testServer
      .intercept({
        path: '/mpesa/b2b/v1/remittax',
        method: 'POST',
      })
      .reply(400);

    const error = await remitTax({ property: 'fake' }, { headers: { Authorization: 'Bearer xyz' } })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Bad Request');
  });
});

describe('Buy goods', () => {
  it('Sends a successfull buy goods request', async () => {
    testServer
      .intercept({
        path: '/mpesa/b2b/v1/paymentrequest',
        method: 'POST'
      })
      .reply(200, { ...testData.buyGoods.response });


    const { data } = await buyGoods({ ...testData.buyGoods.request }, { headers: { Authorization: 'Bearer xyz' } })(state);
    expect(data).to.eql(testData.buyGoods.response);
  });

  it('throws an error if the payload is invalid', async () => {
    testServer
      .intercept({
        path: '/mpesa/b2b/v1/paymentrequest',
        method: 'POST',
      })
      .reply(400);

    const error = await buyGoods({ property: 'fake' }, { headers: { Authorization: 'Bearer xyz' } })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Bad Request');
  });
});

describe('Request', () => {
  it('Sends a successfull request with the right verb and URL', async () => {
    testServer
      .intercept({
        path: '/mpesa/c2b/v1/registerurl',
        method: 'POST'
      })
      .reply(200, { ...testData.request.response });


    const { response: { method, url } } = await request('POST', '/mpesa/c2b/v1/registerurl', { ...testData.request.request }, { headers: { Authorization: 'Bearer xyz' } })(state);

    expect(method).to.eql('POST');
    expect(url).to.include('registerurl');
  });

  it('throws an error if the payload is invalid', async () => {
    testServer
      .intercept({
        path: '/mpesa/c2b/v1/registerurl',
        method: 'POST',
      })
      .reply(400);

    const error = await request('POST', '/mpesa/c2b/v1/registerurl', {  }, { headers: { Authorization: 'Bearer xyz' } })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Bad Request');
  });
});
