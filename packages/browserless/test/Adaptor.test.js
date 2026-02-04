import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, dataValue } from '../src/Adaptor.js';
import { convertHtmlToPdf, convertUrlToPdf } from '../src/Adaptor.js';
import { generatePdfFromHtml, generatePdfFromUrl } from '../src/Adaptor.js';

const testServer = enableMockClient('https://production-sfo.browserless.io');

describe('request', () => {
  it('makes a post request to convert HTML to PDF', async () => {
    testServer
      .intercept({
        path: '/convert',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
     
      .reply(200, { pdf: 'base64-pdf-string' });

    const state = {
      configuration: {
        baseUrl: 'https://production-sfo.browserless.io',
        username: 'hello',
        password: 'there',
      },
    };

    const finalState = await request('POST', 'convert', {
      html: '<p>Test PDF content</p>',
    })(state);

    expect(finalState.data).to.eql({ pdf: 'base64-pdf-string' });
  });

  it('throws an error if the service returns 403', async () => {
    testServer
      .intercept({
        path: '/noAccess',
        method: 'POST',
      })
      .reply(403);

    const state = {
      configuration: {
        baseUrl: 'https://production-sfo.browserless.io',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await request('POST', 'noAccess', { name: 'taylor' })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Forbidden');
  });
});

describe('Browserless convert', () => {
  it('converts HTML to PDF (base64) using convertHtmlToPdf', async () => {
    testServer
      .intercept({ path: '/convert', method: 'POST' })
      .reply(200, { pdf: 'base64-pdf-string' });

    const state = {
      configuration: { baseUrl: 'https://production-sfo.browserless.io', username: 'u', password: 'p' },
    };

    const finalState = await convertHtmlToPdf('<p>Hello</p>')(state);

    expect(finalState.data).to.eql({ pdf: 'base64-pdf-string' });
  });

  it('converts URL to PDF using convertUrlToPdf', async () => {
    testServer
      .intercept({ path: '/convert', method: 'POST' })
      .reply(200, { url: 'https://files.example.com/doc.pdf' });

    const state = {
      configuration: { baseUrl: 'https://production-sfo.browserless.io', username: 'u', password: 'p' },
    };

    const finalState = await convertUrlToPdf('https://example.com') (state);

    expect(finalState.data).to.eql({ url: 'https://files.example.com/doc.pdf' });
  });

  it('generates PDF via /pdf endpoint using token (html)', async () => {
    const token = 'tk-123';
    testServer.intercept({ path: `/pdf?token=${token}`, method: 'POST' }).reply(200, { pdf: 'ok' });

    const state = { configuration: { baseUrl: 'https://production-sfo.browserless.io', token } };

    const finalState = await generatePdfFromHtml('<p>Hello</p>')(state);

    expect(finalState.data).to.eql({ pdf: 'ok' });
  });

  it('generates PDF via /pdf endpoint using token (url)', async () => {
    const token = 'tk-xyz';
    testServer.intercept({ path: `/pdf?token=${token}`, method: 'POST' }).reply(200, { url: 'ok' });

    const state = { configuration: { baseUrl: 'https://production-sfo.browserless.io', token } };

    const finalState = await generatePdfFromUrl('https://example.com')(state);

    expect(finalState.data).to.eql({ url: 'ok' });
  });

  it('normalizes binary PDF response (Content-Type: application/pdf) to base64', async () => {
    const token = 'tk-binary';
    const pdfBody = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n1 0 obj\n<<';

    testServer.intercept({ path: `/pdf?token=${token}`, method: 'POST' }).reply(200, pdfBody, {
      'content-type': 'application/pdf',
    });

    const state = { configuration: { baseUrl: 'https://production-sfo.browserless.io', token } };

    const finalState = await generatePdfFromHtml('<p>Binary</p>')(state);

    expect(finalState.data).to.have.property('pdf');
    const expected = Buffer.from(pdfBody, 'binary').toString('base64');
    expect(finalState.data.pdf).to.eql(expected);
  });
});
