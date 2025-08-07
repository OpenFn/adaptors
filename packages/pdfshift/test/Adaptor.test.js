import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, generatePDF } from '../src/Adaptor.js';

const testServer = enableMockClient('https://fake.server.com');
const configuration = {
  baseUrl: 'https://fake.server.com',
  apiKey: 'some-api-key',
};

describe('request', () => {
  it('makes a post request to convert HTML string to pdf', async () => {
    const state = {
      configuration,
    };
    testServer
      .intercept({
        path: '/v3/convert/pdf',
        method: 'POST',
        headers: {
          'x-api-key': 'some-api-key',
        },
      })
      .reply(200, '%PDF-1.4\n%����\n1 0 obj\n<<');

    const finalState = await request(
      'POST',
      '/convert/pdf',
      {
        source: `<html>
          <body style="font-family: Arial, sans-serif; font-size: 14px;">
            <h1>Sales Report</h1>
            <p>Date: 2025-02-01</p>
            <p>Total Sales: $42</p>
          </body>
        </html>`,
        sandbox: true,
      },
      {
        parseAs: 'text',
      }
    )(state);

    expect(finalState.data).to.be.a('string');
    expect(finalState.data).to.eql('%PDF-1.4\n%����\n1 0 obj\n<<');
    expect(finalState.data).to.includes('%PDF-1.4');
  });
});

describe('generatePDF', () => {
  it('generates pdf as a base64 string', async () => {
    const state = {
      configuration,
    };
    testServer
      .intercept({
        path: '/v3/convert/pdf',
        method: 'POST',
        headers: {
          'x-api-key': 'some-api-key',
        },
      })
      .reply(200, 'JVBERi0xLjQKJeLjz9MKMSAwIG9');

    const { data } = await generatePDF(
      `
      <html>
        <body>
          <h1>Sales Report</h1>
          <p>Date: 2025-07-14 </p>
          <p>Total Sales: $215</p>
        </body>
      </html>
    `,
      {
        encode: true,
      }
    )(state);
    expect(data).to.be.a('string');
    expect(data).to.eql('JVBERi0xLjQKJeLjz9MKMSAwIG9');
    expect(data).to.includes('JVBERi0x');
  });
  it('generates pdf', async () => {
    const state = {
      configuration,
    };
    testServer
      .intercept({
        path: '/v3/convert/pdf',
        method: 'POST',
        headers: {
          'x-api-key': 'some-api-key',
        },
      })
      .reply(200, '%PDF-1.4\n%����\n1 0 obj\n<<');

    const { data } = await generatePDF(
      `
      <html>
        <body>
          <h1>Sales Report</h1>
          <p>Date: 2025-07-14 </p>
          <p>Total Sales: $215</p>
        </body>
      </html>
    `
    )(state);

    expect(data).to.be.a('string');
    expect(data).to.eql('%PDF-1.4\n%����\n1 0 obj\n<<');
    expect(data).to.includes('%PDF-1.4');
  });
  it('generates pdf as a base64 string from a url', async () => {
    const state = {
      configuration,
    };
    testServer
      .intercept({
        path: '/v3/convert/pdf',
        method: 'POST',
        headers: {
          'x-api-key': 'some-api-key',
        },
      })
      .reply(200, 'JVBERi0xLjQKJeLjz9MKMSAwIG9');

    const { data } = await generatePDF('https://www.example.com/', {
      encode: true,
    })(state);
    expect(data).to.be.a('string');
    expect(data).to.eql('JVBERi0xLjQKJeLjz9MKMSAwIG9');
    expect(data).to.includes('JVBERi0x');
  });
});
