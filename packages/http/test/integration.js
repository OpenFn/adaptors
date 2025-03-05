import { expect } from 'chai';
import http from 'http';
import https from 'https';

import { execute, get, post } from '../src';

import { ca, key, cert } from './helpers/certs';

const port = 8080;
const httpServer = http.createServer((req, res) => {
  switch (req.url) {
    case '/redirect':
      res.writeHead(301, { Location: `http://localhost:${port}/new-location` });
      res.end();
      break;
    case '/new-location':
      res.writeHead(302, {
        Location: `http://localhost:${port}/new-location-1`,
      });
      res.end();
      break;
    case '/new-location-1':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
      break;
    default:
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, World!');
      break;
  }
});

// Create an HTTPS server for handling the redirected request
const httpsPort = 1443;
const certOptions = { key, cert };
const httpsServer = https.createServer(certOptions || {}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, HTTPS World!');
});

describe('Integration tests', () => {
  before(() => {
    httpServer.listen(port, () => {
      console.log(`HTTP server is running on http://localhost:${port}/`);
    });

    httpsServer.listen(httpsPort, () => {
      console.log(`HTTPS server is running on https://localhost:${httpsPort}/`);
    });
  });

  it('can make a GET request', async () => {
    const state = {
      configuration: {
        baseUrl: `http://localhost:${httpServer.address().port}`,
      },
      data: {},
    };
    const { data, response } = await execute(get('/'))(state);

    expect(data).to.eql('Hello, World!');
    expect(response.method).to.eql('GET');
  });

  it('can make a POST request', async () => {
    const state = {
      configuration: {
        baseUrl: `http://localhost:${httpServer.address().port}`,
      },
      data: {},
    };
    const { data, response } = await execute(post('/', { name: 'Joe' }))(state);

    expect(data).to.eql('Hello, World!');
    expect(response.method).to.eql('POST');
  });

  it('can follow redirects', async () => {
    const state = {
      configuration: {
        baseUrl: `http://localhost:${httpServer.address().port}`,
      },
      data: {},
    };

    const { data } = await execute(
      get('/redirect', {
        headers: { followAllRedirects: true },
      })
    )(state);

    expect(data).to.eql({ ok: true });
  });

  it('should pass if certs are added to the request', async () => {
    const state = {
      configuration: {
        baseUrl: `https://localhost:${httpsServer.address().port}`,
        ca,
      },
      data: {},
    };

    const { data } = await execute(
      get('/', {
        tls: {
          ca,
          requestCert: false,
          rejectUnauthorized: true,
        },
      })
    )(state);

    expect(data).to.eql('Hello, HTTPS World!');
  });

  it('should fail if certs are not added to the request', async () => {
    const state = {
      configuration: {
        // Important!!
        // We have to use a different domain here to generate a fresh
        // unidici client inside the adaptor
        // Otherwise it'll just re-use the credentials from the previous calls
        baseUrl: `https://127.0.0.1:${httpsServer.address().port}`,
      },
      data: {},
    };
    const error = await execute(get('/no-certs'))(state).catch(e => e);

    expect(error.message).to.eq('unable to verify the first certificate');

    httpsServer.close();
  });

  after(() => {
    httpServer.close();
    httpsServer.close();
  });
});
