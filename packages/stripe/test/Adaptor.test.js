import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  listCustomers,
  listInvoices,
  listPaymentIntents,
  listSubscriptions,
  getCustomer,
  getInvoice,
  getPaymentIntent,
  getSubscription,
  list,
  get,
} from '../src/Adaptor.js';

const testServer = enableMockClient('https://stripe.test.com');

const configuration = {
  baseUrl: 'https://stripe.test.com',
  apiKey: 'some_secret_api_key',
};

describe('list', () => {
  it('list all customers', async () => {
    testServer
      .intercept({
        path: '/v1/customers',
        method: 'GET',
      })

      .reply(200, {
        has_more: false,
        url: '/v1/customers',
        object: 'list',
        data: [
          { email: 'cs001@example.com', id: 'cus_001' },
          { email: 'cs002@example.com', id: 'cus_002' },
        ],
      });

    const state = {
      configuration,
    };

    const finalState = await list('/customers')(state);

    expect(finalState.data).to.eql({
      has_more: false,
      url: '/v1/customers',
      object: 'list',
      data: [
        { email: 'cs001@example.com', id: 'cus_001' },
        { email: 'cs002@example.com', id: 'cus_002' },
      ],
    });
  });
});

describe('get', () => {
  it('get a customer', async () => {
    testServer
      .intercept({
        path: '/v1/customers/cus_001',
        method: 'GET',
      })

      .reply(200, { email: 'cs001@example.com', id: 'cus_001' });

    const state = {
      configuration,
    };

    const finalState = await get('/customers/cus_001')(state);

    expect(finalState.data).to.eql({
      email: 'cs001@example.com',
      id: 'cus_001',
    });
    expect(finalState.data.email).to.eq('cs001@example.com');
  });
});

describe('listCustomers', () => {
  it('gets all customers', async () => {
    testServer
      .intercept({
        path: '/v1/customers',
        method: 'GET',
      })

      .reply(200, {
        has_more: false,
        url: '/v1/customers',
        object: 'list',
        data: [
          { email: 'cs001@example.com', id: 'cus_001' },
          { email: 'cs002@example.com', id: 'cus_002' },
        ],
      });

    const state = {
      configuration,
    };

    const finalState = await listCustomers()(state);

    expect(finalState.data).to.eql({
      has_more: false,
      url: '/v1/customers',
      object: 'list',
      data: [
        { email: 'cs001@example.com', id: 'cus_001' },
        { email: 'cs002@example.com', id: 'cus_002' },
      ],
    });
  });

  it('filters customers with email option', async () => {
    testServer
      .intercept({
        path: '/v1/customers',
        method: 'GET',
        query: {
          email: 'cs002@example.com',
        },
      })

      .reply(200, {
        has_more: false,
        url: '/v1/customers',
        object: 'list',
        data: [{ email: 'cs002@example.com', id: 'cus_002' }],
      });

    const state = {
      configuration,
    };

    const finalState = await listCustomers({ email: 'cs002@example.com' })(
      state
    );

    expect(finalState.data.data).to.eql([
      { email: 'cs002@example.com', id: 'cus_002' },
    ]);
  });
});

describe('get a single customer', () => {
  it('get a customer', async () => {
    testServer
      .intercept({
        path: '/v1/customers/cus_001',
        method: 'GET',
      })

      .reply(200, { email: 'cs001@example.com', id: 'cus_001' });

    const state = {
      configuration,
    };

    const finalState = await getCustomer('cus_001')(state);

    expect(finalState.data).to.eql({
      email: 'cs001@example.com',
      id: 'cus_001',
    });
    expect(finalState.data.email).to.eq('cs001@example.com');
  });
});

describe('listInvoices', () => {
  it('gets all invoices', async () => {
    testServer
      .intercept({
        path: '/v1/invoices',
        method: 'GET',
      })

      .reply(200, {
        has_more: false,
        url: '/v1/invoices',
        object: 'list',
        data: [
          { account_name: 'New business sandbox', id: 'in_001' },
          { account_name: 'New business sandbox', id: 'in_002' },
        ],
      });

    const state = {
      configuration,
    };

    const finalState = await listInvoices()(state);

    expect(finalState.data).to.eql({
      has_more: false,
      url: '/v1/invoices',
      object: 'list',
      data: [
        { account_name: 'New business sandbox', id: 'in_001' },
        { account_name: 'New business sandbox', id: 'in_002' },
      ],
    });
  });

  it('filters invoices with limit option', async () => {
    testServer
      .intercept({
        path: '/v1/invoices',
        method: 'GET',
        query: {
          limit: 1,
        },
      })

      .reply(200, {
        has_more: true,
        url: '/v1/invoices',
        object: 'list',
        data: [{ account_name: 'New business sandbox', id: 'in_001' }],
      });

    const state = {
      configuration,
    };

    const finalState = await listInvoices({ limit: 1 })(state);

    expect(finalState.data.data).to.eql([
      { account_name: 'New business sandbox', id: 'in_001' },
    ]);
    expect(finalState.data.has_more).to.be.true;
  });
});

describe('get an invoice', () => {
  it('get an invoice', async () => {
    testServer
      .intercept({
        path: '/v1/invoices/in_001',
        method: 'GET',
      })

      .reply(200, { account_name: 'New business sandbox', id: 'in_001' });

    const state = {
      configuration,
    };

    const finalState = await getInvoice('in_001')(state);

    expect(finalState.data).to.eql({
      account_name: 'New business sandbox',
      id: 'in_001',
    });
    expect(finalState.data.id).to.eq('in_001');
  });
});

describe('listPaymentIntents', () => {
  it('gets all payment intents', async () => {
    testServer
      .intercept({
        path: '/v1/payment_intents',
        method: 'GET',
      })

      .reply(200, {
        has_more: false,
        url: '/v1/payment_intents',
        object: 'list',
        data: [
          { currency: 'eur', id: 'pi_001' },
          { currency: 'usd', id: 'pi_002' },
        ],
      });

    const state = {
      configuration,
    };

    const finalState = await listPaymentIntents()(state);

    expect(finalState.data).to.eql({
      has_more: false,
      url: '/v1/payment_intents',
      object: 'list',
      data: [
        { currency: 'eur', id: 'pi_001' },
        { currency: 'usd', id: 'pi_002' },
      ],
    });
  });

  it('filters payment intents  with limit option', async () => {
    testServer
      .intercept({
        path: '/v1/payment_intents',
        method: 'GET',
        query: {
          limit: 1,
        },
      })

      .reply(200, {
        has_more: true,
        url: '/v1/payment_intents',
        object: 'list',
        data: [{ currency: 'usd', id: 'pi_002' }],
      });

    const state = {
      configuration,
    };

    const finalState = await listPaymentIntents({ limit: 1 })(state);

    expect(finalState.data.data).to.eql([{ currency: 'usd', id: 'pi_002' }]);
    expect(finalState.data.has_more).to.be.true;
  });
});

describe('get a payment intent', () => {
  it('get a payment intent', async () => {
    testServer
      .intercept({
        path: '/v1/payment_intents/pi_001',
        method: 'GET',
      })

      .reply(200, { currency: 'eur', id: 'pi_001' });

    const state = {
      configuration,
    };

    const finalState = await getPaymentIntent('pi_001')(state);

    expect(finalState.data).to.eql({ currency: 'eur', id: 'pi_001' });
    expect(finalState.data.id).to.eq('pi_001');
  });
});

describe('listSubscriptions', () => {
  it('gets all subscriptions', async () => {
    testServer
      .intercept({
        path: '/v1/subscriptions',
        method: 'GET',
      })

      .reply(200, {
        has_more: false,
        url: '/v1/subscriptions',
        object: 'list',
        data: [
          { collection_method: 'charge_automatically', id: 'sub_001' },
          { collection_method: 'send_invoice', id: 'sub_002' },
        ],
      });

    const state = {
      configuration,
    };

    const finalState = await listSubscriptions()(state);

    expect(finalState.data).to.eql({
      has_more: false,
      url: '/v1/subscriptions',
      object: 'list',
      data: [
        { collection_method: 'charge_automatically', id: 'sub_001' },
        { collection_method: 'send_invoice', id: 'sub_002' },
      ],
    });
  });

  it('filters subscriptions with limit option', async () => {
    testServer
      .intercept({
        path: '/v1/subscriptions',
        method: 'GET',
        query: {
          limit: 1,
        },
      })

      .reply(200, {
        has_more: true,
        url: '/v1/subscriptions',
        object: 'list',
        data: [{ collection_method: 'charge_automatically', id: 'sub_001' }],
      });

    const state = {
      configuration,
    };

    const finalState = await listSubscriptions({ limit: 1 })(state);

    expect(finalState.data.data).to.eql([
      { collection_method: 'charge_automatically', id: 'sub_001' },
    ]);
    expect(finalState.data.has_more).to.be.true;
  });
});

describe('get subscription', () => {
  it('lists a single subscription', async () => {
    testServer
      .intercept({
        path: '/v1/subscriptions/sub_002',
        method: 'GET',
      })

      .reply(200, { collection_method: 'send_invoice', id: 'sub_002' });

    const state = {
      configuration,
    };

    const finalState = await getSubscription('sub_002')(state);

    expect(finalState.data).to.eql({
      collection_method: 'send_invoice',
      id: 'sub_002',
    });
    expect(finalState.data.id).to.eq('sub_002');
  });
});
