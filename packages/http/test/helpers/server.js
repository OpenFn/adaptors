import http from 'http';
import https from 'https';

// Listen on port 8080
const port = 8080;
// Create an HTTP server to listen for incoming requests
const httpServer = http.createServer((req, res) => {
  // Handle the redirect logic here
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
const httpsServer = https.createServer((req, res) => {
  // Handle the redirected request here
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('This is the HTTPS server handling the redirected request.');
});

export { httpServer, httpsServer };
