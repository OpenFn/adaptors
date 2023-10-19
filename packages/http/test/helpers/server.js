import http from 'http';
import https from 'https';
import koa from 'koa';
import sslify from 'koa-sslify';

import { key, cert } from './certs.js';

let app = new koa();
app.use(sslify.default());

app.use(async ctx => {
  ctx.body = 'Hello World';
});

const port = 8080;
const httpServer = http.createServer((req, res) => {
  switch (req.url) {
    case '/redirect':
      console.log('redirecting to /new-location');
      res.writeHead(301, { Location: `http://localhost:${port}/new-location` });
      res.end();
      break;
    case '/new-location':
      console.log('redirecting to /new-location-1');
      res.writeHead(302, {
        Location: `http://localhost:${port}/new-location-1`,
      });
      res.end();
      break;
    case '/new-location-1':
      console.log('Done redirecting');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ url: req.url, res: 'Done redirecting!' }));
      break;
    default:
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, World!');
      break;
  }
});

// Create an HTTPS server for handling the redirected request
const certOptions = { key, cert };
const httpsServer = https.createServer(certOptions || {}, app.callback());

export { httpServer, httpsServer };
