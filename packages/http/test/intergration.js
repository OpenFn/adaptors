import { execute, get, post } from '../src';
import { expect } from 'chai';

import { httpServer, httpsServer } from './helpers/server';
import { ca } from './helpers/certs.js';

describe('Integration tests', () => {
  before(() => {
    const port = 8080;
    httpServer.listen(port, () => {
      console.log(`HTTP server is running on http://localhost:${port}/`);
    });

    const httpsPort = 443;
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
    const { response } = await execute(get('/'))(state);

    expect(response.body).to.eql('Hello, World!');
    expect(response.method).to.eql('GET');
  });

  it('can make a POST request', async () => {
    const state = {
      configuration: {
        baseUrl: `http://localhost:${httpServer.address().port}`,
      },
      data: {},
    };
    const { response } = await execute(
      post('/', {
        body: { name: 'Joe' },
      })
    )(state);

    expect(response.body).to.eql('Hello, World!');
    expect(response.method).to.eql('POST');
  });

  it('can follow redirects', async () => {
    const state = {
      configuration: {
        baseUrl: `http://localhost:${httpServer.address().port}`,
      },
      data: {},
    };

    const { response } = await execute(
      get('/redirect', {
        headers: { followAllRedirects: true },
      })
    )(state);

    expect(response.url).to.eql('/new-location-1');
  });

  it('should pass if certs are added to the request', async () => {
    const state = {
      configuration: {
        baseUrl: `https://localhost:${httpsServer.address().port}`,
        ca,
      },
      data: {},
    };

    const { response } = await execute(
      get('/', {
        tls: {
          ca,
          requestCert: false,
          rejectUnauthorized: true,
        },
      })
    )(state);

    expect(response.body).to.eql('Hello World');
  });

  it('should fail if certs are not  added to the request', async () => {
    const state = {
      configuration: {
        // Important!!
        // We have to use a different domain here to generate a fresh
        // unidici client inside the adatapor
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
