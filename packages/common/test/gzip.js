/**
 * Testing gzip compression in the basic request handler
 */
import assert from 'node:assert';
import Koa from 'koa';
import compress from 'koa-compress';
import zlib from 'zlib';
import { request } from '../src/util/http.js';

const { Z_SYNC_FLUSH } = zlib.constants;

const data = {
  message: 'Hello, World!',
  timestamp: new Date().toISOString(),
  data: {
    items: [1, 2, 3, 4, 5],
    nested: {
      key: 'value',
    },
  },
};

await setupServer();

const url = strings => 'http://localhost:3000/' + strings;

// Using the http helper, make some requests

// basic request with no compression
const a = await request('GET', url('healthcheck'));
assert(a.statusCode === 200);
assert.notEqual(a.headers['transfer-encoding'], 'chunked');
assert.deepEqual(a.body, { ok: true });

// request with compression
const opts = {
  headers: {
    'Accept-Encoding': 'gzip',
  },
};
const b = await request('GET', url('data'), opts);
//assert.equal(b.headers[('content-encoding', 'gzip')]); // undici actually removes this header, so we have no way to know if the content was zipped!
assert.equal(b.headers['transfer-encoding'], 'chunked');
assert(b.statusCode === 200);
assert.deepEqual(b.body, data);

console.log('All OK!');
process.exit(0);

function setupServer(port = 3000) {
  return new Promise(resolve => {
    const app = new Koa();

    // Enable gzip compression
    app.use(
      compress({
        threshold: 0,
        gzip: {
          flush: Z_SYNC_FLUSH,
        },
        deflate: {
          flush: Z_SYNC_FLUSH,
        },
        br: false, // Disable brotli
      })
    );

    // Route handler
    app.use(async ctx => {
      const { request: req, response: res } = ctx;
      if (req.method === 'GET' && req.url === '/healthcheck') {
        ctx.compress = false; // force compression off (seems to not work?)
        res.type = 'application/json';
        res.body = { ok: true };
        return;
      }

      if (req.method === 'GET' && req.url === '/data') {
        ctx.compress = true; // force compression on
        res.type = 'application/json';
        res.body = data;
        return;
      }

      res.status = 404;
      res.body = { error: 'Not found' };
    });

    app.listen(port, () => {
      console.log('listening');
      resolve();
    });
  });
}
