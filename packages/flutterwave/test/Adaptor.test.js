import assert from 'assert';
import nock from 'nock';
import { initiatePayment } from '../src/Adaptor.js';

nock.disableNetConnect();

describe('Flutterwave Adaptor', () => {
  beforeEach(() => {
    nock('https://api.flutterwave.com')
      .post('/payments') // match the path your adaptor currently uses
      .reply(200, { status: 'success', message: 'Payment initiated' });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should initiate a payment successfully', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://api.flutterwave.com',
        secretKey: 'test_key',
      },
    };

    const result = await initiatePayment({
      amount: 100,
      currency: 'RWF',
    })(state);

    assert.equal(result, state);
  });
});
