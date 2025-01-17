import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { sendSMS } from '../src/Adaptor.js';

// This creates a mock client which acts like a fake server.
// It enables pattern-matching on the request object and custom responses
// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
const testServer = enableMockClient('https://smsc.hubtel.com');

describe('sendSMS', () => {
  it('uses the correct auth and data format to send an SMS via hubtel', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: 'v1/messages/send',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic YWJjOnVuZGVmaW5lZA==',
        },
      })
      // Set the reply from this endpoint
      // The body will be returned to state.data
      .reply(200, {
        message: 'Message sent',
        responseCode: '0000',
        data: {
          rate: 0.03,
          messageId: '00edeeaf-fa91-4953-8338-5916acb153ab',
          status: 0,
          networkId: '',
        },
      });

    const state = {
      configuration: {
        baseUrl: 'https://smsc.hubtel.com/v1',
        clientId: 'abc',
        secret: '123',
      },
      data: {
        from: 'test-openfn',
        to: '233538675309',
        content: 'hi there!',
      },
    };

    const finalState = await sendSMS({
      from: 'testopenfn',
      to: '233538675309',
      content: 'hi there!',
    })(state);

    console.log(finalState);

    expect(finalState.data).to.eql({
      message: 'Message sent',
      responseCode: '0000',
      data: {
        rate: 0.03,
        messageId: '00edeeaf-fa91-4953-8338-5916acb153ab',
        status: 0,
        networkId: '',
      },
    });
  });
});
