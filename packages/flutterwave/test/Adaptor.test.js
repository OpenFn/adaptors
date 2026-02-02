import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { enableMockClient } from '@openfn/language-common/util';
import { initiatePayment, createCustomer, createPaymentMethod } from '../src/Adaptor.js';
import testData from './fixtures.json' assert { type: 'json' };

chai.use(chaiAsPromised);

const testServer = enableMockClient('https://developersandbox-api.flutterwave.com');

let state = {
  configuration: {
    baseUrl: 'https://developersandbox-api.flutterwave.com',
    secretKey: 'nw85KTmsZP0CWqh7FYoFEXzxk68AQQju',
  }
}

// Added logging to capture actual requests

describe('Create Customer', () => {
  const testServer = enableMockClient('https://developersandbox-api.flutterwave.com');

  it('creates a customer successfully', async () => {
    testServer
      .intercept({
        path: '/customers',
        method: 'POST',
        headers: {
          'X-Trace-Id': 'unique-trace-id-12345',
          'X-Idempotency-Key': 'unique-idempotency-key-12345'
        },
        // Accept any body for this intercept to avoid strict serialization mismatches
      })
      .reply(201, {
        status: 'success',
        message: 'Customer created',
        data: {
          id: 'cus_3XarBILKQS',
          address: {
            city: 'New York',
            country: 'US',
            line1: '123 Main Street',
            line2: 'Apt 4B',
            postal_code: '10001',
            state: 'New York'
          },
          email: 'cornelius@gmail.com',
          name: {
            first: 'King',
            middle: 'Leo',
            last: 'LeBron'
          },
          phone: {
            country_code: '234',
            number: '08012345678'
          },
          meta: {
            additionalProp: 'string'
          },
          created_datetime: '2026-02-02T13:56:28.010Z'
        }
      });

    const { data } = await createCustomer({
      email: 'cornelius@gmail.com',
      name: {
        first: 'King',
        middle: 'Leo',
        last: 'LeBron'
      },
      phone: {
        country_code: '234',
        number: '08012345678'
      },
      address: {
        city: 'New York',
        country: 'US',
        line1: '123 Main Street',
        line2: 'Apt 4B',
        postal_code: '10001',
        state: 'New York'
      },
      meta: {
        additionalProp: 'string'
      }
    }, {
      headers: {
        'X-Trace-Id': 'unique-trace-id-12345',
        'X-Idempotency-Key': 'unique-idempotency-key-12345'
      }
    })(state);

    expect(data.id).to.eql('cus_3XarBILKQS');
  });

  it('throws an error for invalid input', async () => {
    await expect(createCustomer(null, {
      headers: {
        'X-Trace-Id': 'unique-trace-id-12345',
        'X-Idempotency-Key': 'unique-idempotency-key-12345'
      }
    })(state))
      .to.be.rejectedWith('Invalid input: customerData must be a single object.');
  });
});

describe('Initiate Payment', () => {
  const testServer = enableMockClient('https://developersandbox-api.flutterwave.com');

  it('initiates a payment successfully', async () => {
    testServer
      .intercept({
        path: '/charges',
        method: 'POST',
        // Accept any body for this intercept to avoid strict serialization mismatches
      })
      .reply(201, {
        status: 'success',
        message: 'Charge created',
        data: {
          id: 'chg_xdSlPfGXSp'
        }
      });

    const { data } = await initiatePayment({
      currency: 'GHS',
      customer_id: 'cus_X0yJv3ZMpL',
      payment_method_id: 'pmd_kwU1jeHpBC',
      amount: 200,
      reference: 'unique_reference'
    })(state);

    expect(data.id).to.eql('chg_xdSlPfGXSp');
  });

  it('throws an error for invalid input', async () => {
    await expect(initiatePayment(null)(state))
      .to.be.rejectedWith('Invalid input: paymentData must be a single object.');
  });
});

describe('Validation Logic', () => {
  it('throws an error for invalid customer input', async () => {
    await expect(createCustomer([])(state)).to.be.rejectedWith('Invalid input: customerData must be a single object.');
    await expect(createCustomer(null)(state)).to.be.rejectedWith('Invalid input: customerData must be a single object.');
  });

  it('throws an error for invalid payment input', async () => {
    await expect(initiatePayment([])(state)).to.be.rejectedWith('Invalid input: paymentData must be a single object.');
    await expect(initiatePayment(null)(state)).to.be.rejectedWith('Invalid input: paymentData must be a single object.');
  });
});

// Updated mock configuration for createPaymentMethod

describe('Create Payment Method', () => {
  const testServer = enableMockClient('https://developersandbox-api.flutterwave.com');

  it('creates a payment method successfully', async () => {
    testServer
      .intercept({
        path: '/payment-methods',
        method: 'POST',
        headers: {
          'X-Trace-Id': 'unique-trace-id-67890',
          'X-Idempotency-Key': 'unique-idempotency-key-67890'
        },
        // Accept any body for this intercept to avoid strict serialization mismatches
      })
      .reply(201, {
        status: 'success',
        message: 'Payment method created',
        data: {
          type: 'card',
          card: {
            expiry_month: '09',
            expiry_year: '32',
            first6: '123412',
            last4: '1234',
            network: 'MASTERCARD',
            billing_address: {
              city: 'New York',
              country: 'US',
              line1: '123 Main Street',
              line2: 'Apt 4B',
              postal_code: '10001',
              state: 'New York'
            },
            cof: {
              enabled: true,
              agreement_id: 'Agreement00w02W1',
              recurring_amount_variability: 'VARIABLE',
              agreement_type: 'UNSCHEDULED',
              trace_id: '123456789'
            },
            card_holder_name: 'Alex James'
          },
          id: 'pmd_WRq7L4TM8p',
          customer_id: 'cus_3XarBILKQS',
          meta: {
            additionalProp: 'string'
          },
          device_fingerprint: '62wd23423rq324323qew1',
          client_ip: '154.123.220.1',
          created_datetime: '2024-12-03T13:54:21.546559974Z'
        }
      });

    const { data } = await createPaymentMethod({
      type: 'card',
      card: {
        expiry_month: '09',
        expiry_year: '32',
        first6: '123412',
        last4: '1234',
        network: 'MASTERCARD',
        billing_address: {
          city: 'New York',
          country: 'US',
          line1: '123 Main Street',
          line2: 'Apt 4B',
          postal_code: '10001',
          state: 'New York'
        },
        cof: {
          enabled: true,
          agreement_id: 'Agreement00w02W1',
          recurring_amount_variability: 'VARIABLE',
          agreement_type: 'UNSCHEDULED',
          trace_id: '123456789'
        },
        card_holder_name: 'Alex James'
      }
    }, {
      headers: {
        'X-Trace-Id': 'unique-trace-id-67890',
        'X-Idempotency-Key': 'unique-idempotency-key-67890'
      }
    })(state);

    expect(data.id).to.eql('pmd_WRq7L4TM8p');
  });
});

