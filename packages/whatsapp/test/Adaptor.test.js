import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { request } from '../src/Adaptor.js';

const testServer = enableMockClient('https://fake.server.com');

describe('whatsapp request', () => {
  it('makes a POST request to the correct WhatsApp endpoint with Bearer token', async () => {
    testServer
      .intercept({
        path: '/v22.0/720348101158165/messages',
        method: 'POST',
        headers: {
          Authorization: 'Bearer test-token',
          'content-type': 'application/json',
        },
      })
      .reply(200, { messages: [{ id: 'wamid.HBgMNTI0NzU3MjQwNjA4FQIAERgSMzY3QzA2QzA2QzA2QzA2QzA2' }] });

    const configuration = {
      baseUrl: 'https://fake.server.com',
      apiToken: 'test-token',
      apiVersion: 'v22.0',
      phoneNumberId: '720348101158165',
    };

    const body = {
      to: '254712345678',
      body: 'Hello, world!',
    };

    const op = request('POST', 'messages', body);
    const result = await op({ configuration });
    expect(result.data).to.eql({ messages: [{ id: 'wamid.HBgMNTI0NzU3MjQwNjA4FQIAERgSMzY3QzA2QzA2QzA2QzA2QzA2' }] });
  });
});
