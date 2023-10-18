import Koa from 'koa';
import https from 'https';
import sslify from 'koa-sslify';

const { default: enforceHttps } = sslify;

let app = new Koa();

app.use(enforceHttps());

let certOptions = null;
try {
  certOptions = {
    key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCmILtiAO4PasIM\nZLqjEbdqUuLXyTD6khvlcsgK6NK+X9RkJDOmKxUkXlrOMdDzhRsR68JbeXbFc1OV\n6n/KbXTjg1aLGpg/xUdsTpnxWFJ0tWnaN4vxle3LqGm41+J9tgrFjkLsEzXIT9BM\nDTMJMISfufqLM0oJYT2zaZrWV1Vgi4IJXyfhUzV3TJggqjOubF6nEXCm+piZTQSr\n+/LSrVF8jDX1K0b6cKMpyIO+ybBUtLtJYMXCLHVvcPd9jQkWOwL0OpyAJo9paRRl\nanmWIe5JGSCz4Kf4dfePuP1V2qz81cm03Zd+eaK/wgE6l2BCz8awQih941qtxBtQ\n6T1oisVHAgMBAAECggEAQncxEUZW+LMZXRUF+Q0zCWaNHJGBt5ayc4wHThoVixZT\nJxe21GJDTLA1e27B71RPXs2pDqkbpGb+R6oxI5/EVuxquS/UPxtidopCHCXeo5Qb\nfDOiGW+HWuaQGeTB2NL3H1BKJSKQb4rDR1I2m5QeU7t4aq4EDpmpsnjrepspbPzu\nlO3uA4A+GdwVgMafAFas/ng1tG+nGN8JB42OMrw15tROWkw0pQTyNgbyCtHaWa8o\nnnYXpCZp0bLQ1eZVkpRGxDgSwYhB2/43nSBaIs4Hqs1ZRYTMaCL5o2zAeUvsDNlU\nXpzsXJ0BsKdgJLOGZw/MgtCAHKCTKfH160+jTNgYaQKBgQDcHazviKZYNDtODOdf\n2Fjj7+/B6GNaoRZwJJgiofdqjSta/dE72dmapoTBg4hD1mCOl5spcOcdheSd1btD\nXTe3/PNHLdsef+Qywam7RKwTCLQeRcY9Mjv3GzPS5KYtF8fjMtd/iyX2fO+vLDTr\nDZfHS5L2ZmVQYpDpluMJz4BxHwKBgQDBNerFHrZtL/z2oZURnn8Y+Rc+biqjmxlL\nxYDmlGZxE4yuZn9Gzbj+KfKwIyue3fw0LUa5nqtYqblQpFFOcdWpEe8lYyLnmRK7\nbCujy2XthTnekNIsg5kEG419cyOlCCocB/qhskegeF93Z7e3HpNXxSLr4dsExvqC\ncUlkUS7e2QKBgQDS/Y8bPD1XJxoBwtS2RsdOFlwX3w39fZPoguthpydmd1MrsUiy\nuiuf1iZC6DXh8Mg1ZpVQr+yZnBJ8SLdr5xrVvh3kCMyU+7pd/M0ZuMXIqPseWXug\nhVp9jxGqAYpYhwcPfVib5WHKWA/YNeOzvB/U5VhF3/kViKWngv62FLTluQKBgQCD\nMa5R3XH4IE6/1aZYSWx6M6HB5aKUZ1u85MaLS5doDuNHBRhFpqmIBEnjqm4TOR7o\n+xl8Ly6gTNcl1/3Rq2Buplvh4jgwVPOwSlozpYh3yTArXeEpEs7TSDZCSe2ZQTr+\nv7hDFcCnSTVh6g6IjH12ask0rK9AxjASZQR11t5huQKBgQC7bL1ZmwNFtx3vs56n\nWhwPnha4vlXAvZzAo8M3p22Bvp/9tipAcY2FV/fWpoXX86NDqvCVM8aFQju4MXQA\nPP1rHSXYcA75MS44yWa0d/XjmrLphYjq/CfSpJVdq9GXTtnG3Jdy0TgptbzfPwcE\nm75mjjKkSa3QP9fYOaNuHLWCLQ==\n-----END PRIVATE KEY-----',
    cert: '-----BEGIN CERTIFICATE-----\nMIIEKTCCAxGgAwIBAgIUZbqkY7nJ0XK+iYc1IvkwIrXayZMwDQYJKoZIhvcNAQEL\nBQAwfjELMAkGA1UEBhMCVFoxDzANBgNVBAgMBkFydXNoYTEPMA0GA1UEBwwGQXJ1\nc2hhMQ8wDQYDVQQKDAZPcGVuRm4xCzAJBgNVBAsMAkZuMQ8wDQYDVQQDDAZPcGVu\nRm4xHjAcBgkqhkiG9w0BCQEWD2luZm9Ab3BlbmZuLm9yZzAeFw0yMzEwMTEwODA4\nNDNaFw0yNjAxMTMwODA4NDNaMIGsMQswCQYDVQQGEwJVUzEUMBIGA1UECAwLUmFu\nZG9tU3RhdGUxEzARBgNVBAcMClJhbmRvbUNpdHkxGzAZBgNVBAoMElJhbmRvbU9y\nZ2FuaXphdGlvbjEfMB0GA1UECwwWUmFuZG9tT3JnYW5pemF0aW9uVW5pdDEgMB4G\nCSqGSIb3DQEJARYRaGVsbG9AZXhhbXBsZS5jb20xEjAQBgNVBAMMCWxvY2FsaG9z\ndDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKYgu2IA7g9qwgxkuqMR\nt2pS4tfJMPqSG+VyyAro0r5f1GQkM6YrFSReWs4x0POFGxHrwlt5dsVzU5Xqf8pt\ndOODVosamD/FR2xOmfFYUnS1ado3i/GV7cuoabjX4n22CsWOQuwTNchP0EwNMwkw\nhJ+5+oszSglhPbNpmtZXVWCLgglfJ+FTNXdMmCCqM65sXqcRcKb6mJlNBKv78tKt\nUXyMNfUrRvpwoynIg77JsFS0u0lgxcIsdW9w932NCRY7AvQ6nIAmj2lpFGVqeZYh\n7kkZILPgp/h194+4/VXarPzVybTdl355or/CATqXYELPxrBCKH3jWq3EG1DpPWiK\nxUcCAwEAAaNwMG4wHwYDVR0jBBgwFoAUPiUL3c8fTCoGtazEiWAjcm5jT80wCQYD\nVR0TBAIwADALBgNVHQ8EBAMCBPAwFAYDVR0RBA0wC4IJbG9jYWxob3N0MB0GA1Ud\nDgQWBBQaYITNXu4/nRy69bBUTmUfBTwHbDANBgkqhkiG9w0BAQsFAAOCAQEAEmsG\n3lgL6/yxqn9JLoi3PA/bTsfdGEKEp5Mqh1ivqmfDiHkrb0owb46/ACySkyJl422k\nrvCyEBhOpIL7atPjD0u0s3D2kAPWI8gL3He9lvsgtqdw3fO7MR1GXehEpQq76p4e\nj3MJDUpOcolCPyiJKro66Mzin8EQ58yMblA5pv2B7Zum/+lCVpI88nlV8cdzvy2k\nfnL6CrfFOvlE2Bc49aBq4sGk4NkhEpfjInjX0hKexQautuIcAaNCg9Kc4RQoXHl7\n+qM0ICe8RKAnlewq36A38M9oqaCpEu/HWU82I4sHo6KglwCpm/aA3mJTWaHsHDbN\nY47fF2gnrQ6/qgmUmQ==\n-----END CERTIFICATE-----',
  };
} catch (err) {
  console.log('No certificate files found!');
}

let host = process.env.APP_URL || 'localhost';
let isLocal = host === 'localhost';
let enableHTTPSInLocal = Boolean(isLocal && certOptions);

let port = enableHTTPSInLocal ? 443 : process.env.PORT || 3434;
let protocol = isLocal && !certOptions ? 'http' : 'https';

let url = `${protocol}://${host}${isLocal ? `:${port}` : ''}`;

app.use(async ctx => {
  console.log('>>', ctx.url);
  if (ctx.url === '/form') {
    console.log(' * FORM');
    console.log(ctx.req.headers);
    console.log(ctx.req.body);
    ctx.response.status = 200;
  } else if (ctx.url === '/redirect') {
    console.log('redirecting!');
    ctx.response.status = 301;
    ctx.response.set({ Location: `${url}/foo` });
  } else {
    ctx.response.status = 200;
    ctx.response.body = 'ok';
  }
});

let callback = () => {
  console.log(`App start successfully at ${url}`);
};

if (enableHTTPSInLocal) {
  https.createServer(certOptions || {}, app.callback()).listen(port, callback);
} else {
  app.listen(port, callback);
}

export default app;
