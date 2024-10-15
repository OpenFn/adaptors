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

describe('execute', () => {
  it('executes each operation in sequence', async () => {
    const state = {
      configuration,
    };
    const operations = [
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

    const finalState = await execute(...operations)(state);

    expect(finalState).to.eql({ counter: 3 });
  });

  it('assigns references and data to the initialState', async () => {
    const state = {
      configuration,
    };

    const finalState = await execute()(state);

    expect(finalState).to.eql({
      configuration: {
        baseUrl: 'https://fake.mojatax.server.com',
        clientId: 'someclientid',
        password: 'somepassword',
        access_token: 'fake-token',
      },
      references: [],
      data: null,
    });
  });
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
  it('should create an invoice', async () => {
    testServer
      .intercept({
        path: `/api/v1/client/CreateInvoice`,
        method: 'POST',
      })

      .reply(201, () => {
      return { id: 7,"customerId": "102", }
      });

    const state = {
      configuration,
    };

    const { data } = await execute(
      post('CreateInvoice',{
        "customerId": "102",
        "invoice_id": "PID092",
      } )
    )(state);

    expect(data).to.haveOwnProperty('customerId');
    expect(data.customerId).to.equal('102');
  });
});
