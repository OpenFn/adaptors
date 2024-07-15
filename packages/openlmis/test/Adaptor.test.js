import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { execute, request, post, get } from '../src/Adaptor.js';
import * as fixtures from './fixtures';

const baseUrl = 'https://test.openlmis.org';
const testServer = enableMockClient(baseUrl);

const configuration = {
  baseUrl,
  username: 'test',
  password: 'pass',
};

describe.skip('HTTP wrappers', () => {
  it('request() should expand references', async () => {
    testServer
      .intercept({
        path: '/api/programs',
        method: 'PATCH',
        body: JSON.stringify({
          name: 'Program Name',
        }),
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer abc',
          y: '1',
        },
      })
      .reply(200, {});

    const state = {
      configuration: {
        baseUrl,
        access_token: 'abc',
      },

      method: 'PATCH',
      path: '/api/programs',
      body: {
        name: 'Program Name',
      },
      options: {
        headers: { y: '1' },
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
    const finalState = await execute(
      get('/api/programs'
    ))(state);

    expect(finalState.data).to.eql(fixtures.programs);
    expect(finalState.data[0].id).to.eql(66);
    expect(finalState.response.statusCode).to.equal(200);
  });

  it('should get() at /programs with a query', async () => {
    testServer
      .intercept({
        path: '/api/programs',
        method: 'GET',
        query: {
          $top: 5,
        },
      })
      .reply(200, fixtures.programs);

    const state = {
      configuration,
    };

    // prettier-ignore
    const finalState = await execute(
      get('/api/programs', { query: { $top: 5 }})
    )(state);

    expect(finalState.data).to.eql(fixtures.programs);
    expect(finalState.response.statusCode).to.equal(200);
  });

  it.skip('should get() at /programs with a custom header', async () => {
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
      get('/api/programs', { headers: { 'foo': 'bar' }})
    )(state);

    expect(finalState.data).to.eql(fixtures.programs);
    expect(finalState.response.statusCode).to.equal(200);
  });

  it.skip('should handle a 404', async () => {
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

    const error = await get('/api/programs/22')(state).catch(error => {
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
      post('/api/programs', {
        name: 'Program Name',
      })
    )(state);

    expect(finalState.response.statusCode).to.eql(200);
  });

  it('throws an error when post() returns 403', async () => {
    testServer
      .intercept({
        path: '/api/programs',
        method: 'POST',
      })
      .reply(403, 'Forbidden');

    const state = {
      configuration,
    };

    const error = await post('/api/programs', {
      name: 'Program Name',
    })(state).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Forbidden');
    expect(error.statusCode).to.eql(403);
  });
});
