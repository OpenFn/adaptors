import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, post, execute} from '../src/Adaptor.js';

// This creates a mock client which acts like a fake server.
// It enables pattern-matching on the request object and custom responses
// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
const baseUrl = 'https://fake.mojatax.server.com'
const testServer = enableMockClient(baseUrl);

const configuration = {
  baseUrl,
  clientId: 'someclientid',
  password: 'somepassword',
};

before(() => {
  testServer
    .intercept({
      path: '/api/v1/auth/clientLogin',
      method: 'POST',
    })
    .reply(200, {
      access_token: 'fake-token',
    })
    .persist();
});



describe('request', () => {
  it('makes a post request to the right endpoint', async () => {

    testServer
      .intercept({
        path: '/api/v1/client/CreateInvoice',
        method: 'POST',
 
      })
    
      .reply(200, { id: 7,"customerId": "102", "invoice_id": "PID092"});

    const state = {
      configuration,
 
    };

    const finalState = await request('POST', '/client/CreateInvoice',{
      "customerId": "102",
      "invoice_id": "PID092",
    } )(state);

    expect(finalState.data).to.eql({ id: 7,"customerId": "102", "invoice_id": "PID092", });
  });
});

describe('post', () => {
  it('posts to /CreateInvoice', async () => {

    testServer
      .intercept({
        path: `/api/v1/client/CreateInvoice`,
        method: 'POST',
      })

      .reply(201, (req) => {
        expect(JSON.parse(req.body)).to.haveOwnProperty('customerId');
      return { id: 7,"customerId": "102", }
      });

    const state = {
      configuration,
    };

    const { data } = await execute(
      post('CreateInvoice', {
        "customerId": "102",
        "invoice_id": "PID092",
      } )
    )(state);

    expect(data).to.haveOwnProperty('customerId');
    expect(data.customerId).to.equal('102');
  });
});
