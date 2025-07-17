import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { Readable } from 'stream';

import { request, generatePDF, post } from '../src/Adaptor.js';

const testServer = enableMockClient('https://fake.server.com');

describe('request', () => {
  it('makes a post request to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/patients',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, { id: 7, fullName: 'Mamadou', gender: 'M' });

    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await request('POST', '/patients', {
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
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
    };

    const error = await request('POST', '/noAccess', { name: 'taylor' })(
      state
    ).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Forbidden');
  });
});

describe('generatePDF', () => {
  it('generates pdf as a base64 string', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        date: '2025-07-14',
        total: 215,
      },
    };

    const { data } = await generatePDF(
      state => state.data,
      data => `
      <html>
        <body>
          <h1>Sales Report</h1>
          <p>Date: ${data.date}</p>
          <p>Total Sales: $${data.total}</p>
        </body>
      </html>
    `
    )(state);
    expect(data).to.be.a('string');
    expect(data.length).to.be.greaterThan(100);
  });
  it('generates pdf as a stream', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        date: '2025-07-14',
        total: 215,
      },
    };

    const { data: pdfStream } = await generatePDF(
      state => state.data,
      data => `
      <html>
        <body>
          <h1>Sales Report</h1>
          <p>Date: ${data.date}</p>
          <p>Total Sales: $${data.total}</p>
        </body>
      </html>
    `,
      { format: 'stream' }
    )(state);

    expect(pdfStream).to.be.instanceOf(Readable);

    const chunks = [];
    for await (const chunk of pdfStream) {
      chunks.push(chunk);
    }

    const finalBuffer = Buffer.concat(chunks);

    expect(finalBuffer).to.be.instanceOf(Buffer);
    expect(finalBuffer.length).to.be.greaterThan(100);
  });
});

describe('post', () => {
  it('makes a post request to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/patients',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, { id: 7, fullName: 'Mamadou', gender: 'M' });

    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await post('/patients', {
      name: state.data.fullName,
      gender: state.data.gender,
    })(state);

    expect(finalState.data).to.eql({
      fullName: 'Mamadou',
      gender: 'M',
      id: 7,
    });
  });
});
