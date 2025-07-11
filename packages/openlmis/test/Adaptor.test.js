import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { execute, request, post, get } from '../src/Adaptor.js';
import * as fixtures from './fixtures';

const username = 'test';
const password = 'pass';
const clientId = 'user-client';
const clientSecret = 'changeme';
const baseUrl = 'https://test.openlmis.org';
const testServer = enableMockClient(baseUrl);

const configuration = { baseUrl, username, password, clientId, clientSecret };

const mockResponse = (status, body) => ({
  statusCode: status,
  responseOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  data: body,
});

// Set up a fake auth endpoint
before(() => {
  testServer
    .intercept({
      path: '/api/oauth/token',
      query: { grant_type: 'password', username, password },
      method: 'POST',
    })
    .reply(req => {
      // Ensure credentials are correct and throw the appropriate response
      const creds = req.query;

      const ensureCreds =
        creds.username !== configuration.username ||
        creds.password !== configuration.password;

      return ensureCreds
        ? mockResponse(401, {
            message: 'Could not authenticate with the provided credentials.',
            code: 401,
          })
        : mockResponse(200, {
            access_token: 'a3117bbd-5cd5-483c-8d24-d7ffb72e4eaa',
            token_type: 'bearer',
            expires_in: 1800,
            scope: 'read write',
            referenceDataUserId: 'a337ec45-31a0-4f2b-9b2e-a105c4b669bb',
            username: 'administrator',
          });
    })
    .persist();
});

describe('HTTP wrappers', () => {
  it('request() should expand references', async () => {
    testServer
      .intercept({
        path: '/api/programs',
        method: 'POST',
        body: JSON.stringify({
          name: 'Program Name',
        }),
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer abc',
        },
      })
      .reply(200, {});

    const state = {
      configuration: {
        baseUrl,
        access_token: 'abc',
      },

      method: 'POST',
      path: '/programs',
      body: {
        name: 'Program Name',
      },
    };

    const finalState = await request(
      s => s.method,
      s => s.path,
      s => s.body,
      s => s.options
    )(state);

    expect(finalState.response.statusCode).to.eql(200);
  });

  it('should get /programs', async () => {
    testServer
      .intercept({
        path: '/api/programs',
        method: 'GET',
      })
      .reply(200, fixtures.programs);

    const state = {
      configuration,
    };

    // prettier-ignore
    const finalState = await execute(get('programs'))(state);

    expect(finalState.data).to.eql(fixtures.programs);
    expect(finalState.response.statusCode).to.equal(200);
  });

  it('should get() at /programs with a query', async () => {
    testServer
      .intercept({
        path: '/api/programs',
        method: 'GET',
        query: {
          page: 5,
        },
      })
      .reply(200, fixtures.programs);

    const state = {
      configuration,
    };

    // prettier-ignore
    const finalState = await execute(
      get('programs', { query: { page: 5 }})
    )(state);

    expect(finalState.data).to.eql(fixtures.programs);
    expect(finalState.response.statusCode).to.equal(200);
  });

  it('should get() at /programs with a custom header', async () => {
    testServer
      .intercept({
        path: '/api/programs',
        method: 'GET',
        headers: {
          foo: 'bar',
        },
      })
      .reply(200, fixtures.programs);

    const state = {
      configuration,
    };

    // prettier-ignore
    const finalState = await execute(
      get('programs', { headers: { 'foo': 'bar' }})
    )(state);

    expect(finalState.data).to.eql(fixtures.programs);
    expect(finalState.response.statusCode).to.equal(200);
  });

  it('should handle a 404', async () => {
    testServer
      .intercept({
        path: '/api/programs/22',
        method: 'GET',
      })
      .reply(
        404,
        {
          message: 'Could not find the resource you were looking for.',
          code: 404,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );

    const state = {
      configuration,
    };

    const error = await get('programs/22')(state).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Not Found');
    expect(error.statusCode).to.eql(404);
    expect(error.body.message).to.eql(
      'Could not find the resource you were looking for.'
    );
  });

  it('should post() to /programs', async () => {
    testServer
      .intercept({
        path: '/api/programs',
        method: 'POST',
      })
      .reply(200, {});

    const state = {
      configuration,
    };

    const finalState = await execute(
      post('/programs', {
        name: 'Program Name',
        code: 'fine',
      })
    )(state);

    expect(finalState.response.statusCode).to.eql(200);
  });

  it('throws an error when post() returns 400', async () => {
    testServer
      .intercept({
        path: '/api/programs',
        method: 'POST',
      })
      .reply(400, 'Bad Request', {
        headers: {
          'content-type': 'text',
        },
      });

    const state = {
      configuration,
    };

    const error = await post('programs', {
      name: 'Program Name',
    })(state).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Bad Request');
    expect(error.message).to.eql(
      'POST to https://test.openlmis.org/api/programs returned 400: Bad Request'
    );
    expect(error.statusCode).to.eql(400);
  });

  it('throw an error when url origin does not match baseUrl', async () => {
    const state = {
      configuration,
    };

    const error = await post('https://example.com/programs', {
      name: 'Program Name',
    })(state).catch(error => {
      return error;
    });

    expect(error.code).to.eql('UNEXPECTED_ABSOLUTE_URL');
  });
});
