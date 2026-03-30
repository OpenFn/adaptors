import { expect } from 'chai';
import https from 'https';
import Koa from 'koa';
import Router from '@koa/router';
import { koaBody } from 'koa-body';

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
router.post(
  '/form',
  koaBody({ multipart: true, urlencoded: false, json: false, text: false }),
  ctx => {
    if (!ctx.is('multipart/form-data')) {
      ctx.status = 500;
      return;
    }
    ctx.body = ctx.request.body;
  },
);
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

  it('should post formdata with a contenttype and return json', async () => {
    const state = {
      configuration: {
        baseUrl: `http://localhost:${httpServer.address().port}`,
      },
      data: {},
    };
    const { data, response } = await execute(
      post('/form', { name: 'Joe', age: '30' }, { contentType: 'form' }),
    )(state);

    expect(response.statusCode).to.eql(200);
    expect(data).to.eql({ name: 'Joe', age: '30' });
  });

  // This test exists because right now, users must pass the FormData content type
  // Maybe later, if we expose FormData to job code, we can do something better
  it('should fail when posting a raw FormData object without a content type', async () => {
    const form = new FormData();
    form.append('name', 'Joe');

    const state = {
      configuration: {
        baseUrl: `http://localhost:${httpServer.address().port}`,
      },
      data: {},
    };

    const error = await execute(post('/form', form))(state).catch(e => e);
    expect(error.statusCode).to.eql(500);
  });

  it('should return 500 when posting an empty body to /form', async () => {
    const state = {
      configuration: {
        baseUrl: `http://localhost:${httpServer.address().port}`,
      },
      data: {},
    };
    const error = await execute(post('/form', null))(state).catch(e => e);
    expect(error.statusCode).to.eql(500);
  });

  it('should return 500 when posting json to /form', async () => {
    const state = {
      configuration: {
        baseUrl: `http://localhost:${httpServer.address().port}`,
      },
      data: {},
    };
    const error = await execute(post('/form', { name: 'Joe' }))(state).catch(
      e => e,
    );
    expect(error.statusCode).to.eql(500);
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

    expect(error.message).to.include('unable to verify the first certificate');

    httpsServer.close();
  });

  after(() => {
    httpServer.close();
    httpsServer.close();
  });
});
