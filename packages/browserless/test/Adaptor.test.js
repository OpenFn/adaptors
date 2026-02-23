import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { request, createPDF } from '../src/Adaptor.js';

const testServer = enableMockClient('https://production-sfo.browserless.io');

describe('request', () => {
  it('should handle success and error scenarios', async () => {
    testServer.intercept({ path: '/convert', method: 'POST' }).reply(200, { pdf: 'base64-pdf-string' });
    const state = { configuration: { baseUrl: 'https://production-sfo.browserless.io' } };
    const success = await request('POST', 'convert', { html: '<p>Test PDF content</p>' })(state);
    expect(success.data).to.eql({ pdf: 'base64-pdf-string' });

    testServer.intercept({ path: '/noAccess', method: 'POST' }).reply(403);
    const error = await request('POST', 'noAccess', { name: 'taylor' })(state).catch(e => e);
    expect(error.statusMessage).to.eql('Forbidden');
  });
});

describe('createPDF', () => {
  it('should create a PDF via /pdf and return base64 string', async () => {
    const token = 'tk-json';
    testServer.intercept({ path: `/pdf?token=${token}`, method: 'POST' }).reply(200, { pdf: 'ok' });
    const state = { configuration: { baseUrl: 'https://production-sfo.browserless.io', token } };
    const res = await createPDF('<p>Hello</p>')(state);
    expect(res.data).to.eql('ok');
  });
});
