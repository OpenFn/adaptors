import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, dataValue } from '../src/Adaptor.js';
import { convertHtmlToPdf, convertUrlToPdf } from '../src/Adaptor.js';
import { generatePdfFromHtml, generatePdfFromUrl } from '../src/Adaptor.js';

// This creates a mock client which acts like a fake server.
// It enables pattern-matching on the request object and custom responses
// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
const testServer = enableMockClient('https://production-sfo.browserless.io');

describe('request', () => {
  it('makes a post request to the right endpoint', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/patients',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      // Set the reply from this endpoint
      // The body will be returned to state.data
      .reply(200, { id: 7, fullName: 'Mamadou', gender: 'M' });

    const state = {
      configuration: {
        baseUrl: 'https://production-sfo.browserless.io',
        username: 'hello',
        password: 'there',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await request('POST', 'patients', {
      name: state.data.fullName,
      gender: state.data.gender,
    })(state);

    expect(finalState.data).to.eql({
      fullName: 'Mamadou',
      gender: 'M',
      id: 7,
    });
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

    const finalState = await convertHtmlToPdf('<p>Hello</p>') (state);

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
});
