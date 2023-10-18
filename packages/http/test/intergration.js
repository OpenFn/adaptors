import { execute, get } from '../src';
import { expect } from 'chai';

import { httpServer, httpsServer } from './helpers/server';

describe('Integration tests', () => {
  before(() => {
    const port = 8080;
    httpServer.listen(port, () => {
      console.log(`HTTP server is running on http://localhost:${port}/`);
    });
    // Listen on port 443 for HTTPS
    const httpsPort = 443;
    httpsServer.listen(httpsPort, () => {
      console.log(`HTTPS server is running on https://localhost:${httpsPort}/`);
    });
  });

  it.only('can follow redirects', async () => {
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

    console.log(finalState);

    expect(response.url).to.eql('/new-location-1');
  });
  after(() => {
    httpServer.close();
    httpsServer.close();
  });
});
