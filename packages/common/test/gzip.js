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
const a = await request('GET', url('healthcheck'));
console.log({ a: a.headers });
assert(a.statusCode === 200);
assert.deepEqual(a.body, { ok: true });

const b = await request('GET', url('data'));
console.log({ b: b.headers });
assert(b.statusCode === 200);
assert.deepEqual(b.body, data);

console.log('All OK!');
// process.exit(0);

function setupServer(port = 3000) {
  return new Promise(resolve => {
    const app = new Koa();

    // Enable gzip compression
    app.use(
      compress({
        threshold: 0, // Compress responses of any size
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
        ctx = false; // force compression off
        res.type = 'application/json';
        res.body = { ok: true };
        return;
      }

      if (req.method === 'GET' && req.url === '/data') {
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
