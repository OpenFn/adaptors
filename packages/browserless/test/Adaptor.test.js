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
  it('should create PDFs via /pdf and normalize binary responses', async () => {
    const token1 = 'tk-json';
    testServer.intercept({ path: `/pdf?token=${token1}`, method: 'POST' }).reply(200, { pdf: 'ok' });
    const state1 = { configuration: { baseUrl: 'https://production-sfo.browserless.io', token: token1 } };
    const res1 = await createPDF('<p>Hello</p>')(state1);
    expect(res1.data).to.eql({ pdf: 'ok' });

    const token2 = 'tk-binary';
    const pdfBody = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n1 0 obj\n<<';
    testServer.intercept({ path: `/pdf?token=${token2}`, method: 'POST' }).reply(
      200,
      Buffer.from(pdfBody, 'binary'),
      { 'content-type': 'application/pdf' }
    );
    const state2 = { configuration: { baseUrl: 'https://production-sfo.browserless.io', token: token2 } };
    const res2 = await createPDF('<p>Binary</p>')(state2);

    expect(res2.data).to.have.property('pdf');
    const expected = Buffer.from(pdfBody, 'binary').toString('base64');
    expect(res2.data.pdf).to.eql(expected);
  });
});
