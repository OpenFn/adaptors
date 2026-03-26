import { expect } from 'chai';
import https from 'https';
import Koa from 'koa';
import Router from '@koa/router';

import { execute, get, post } from '../src/index.js';

import { ca, key, cert } from './helpers/certs.js';

const router = new Router();
router.get('/redirect', ctx => {
  ctx.status = 301;
  ctx.redirect(`http://localhost:${httpServer.address().port}/new-location`);
});
router.get('/new-location', ctx => {
  ctx.redirect(`http://localhost:${httpServer.address().port}/new-location-1`);
});
router.get('/new-location-1', ctx => {
  ctx.body = { ok: true };
});
router.all('(.*)', ctx => {
  ctx.type = 'text/plain';
  ctx.body = 'Hello, World!';
});

const app = new Koa();
app.use(router.routes());
const httpServer = app.listen(8080);

// Create an HTTPS server for handling the redirected request
const httpsApp = new Koa();
httpsApp.use(async ctx => {
  ctx.type = 'text/plain';
  ctx.body = 'Hello, HTTPS World!';
});
const httpsServer = https.createServer({ key, cert }, httpsApp.callback());

describe('Integration tests', () => {
  before(done => {
    httpsServer.listen(1443, done);
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
      }),
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
      }),
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
