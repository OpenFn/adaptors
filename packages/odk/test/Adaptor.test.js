import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { execute, request, get, post, getSubmissions } from '../src/Adaptor.js';

import * as fixtures from './fixtures';

// For the full mock API see
// https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions
const baseUrl = 'https://odk.server.com';
const testServer = enableMockClient(baseUrl);

const configuration = {
  baseUrl,
  email: 'a@b.com',
  password: 'pass',
};

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
      path: '/v1/sessions',
      method: 'POST',
    })
    .reply(req => {
      // Ensure credentials are correct and throw the appropriate response
      const creds = JSON.parse(req.body);
      if (
        creds.email !== configuration.email ||
        creds.password !== configuration.password
      ) {
        return mockResponse(401, {
          message: 'Could not authenticate with the provided credentials.',
          code: 401,
        });
      }
      return mockResponse(200, {
        token: 'fake-token',
      });
    })
    .persist();
});

describe('getSubmissions', () => {
  it('should fail if credentials are wrong', async () => {
    testServer
      .intercept({
        path: '/v1/projects/1/forms/test_form.svc/Submissions',
        method: 'GET',
      })
      .reply(200, fixtures.submissions);

    const state = {
      configuration: {
        ...configuration,
        password: 'wrooooon',
      },
    };

    let error;
    try {
      await execute(getSubmissions(1, 'test_form'))(state);
    } catch (e) {
      error = e;
    }

    expect(error.statusCode).to.eql(401);
    expect(error.statusMessage).to.eql('Unauthorized');
    expect(error.body.message).to.eql(
      'Could not authenticate with the provided credentials.'
    );
  });

  it('should get form submissions', async () => {
    testServer
      .intercept({
        path: '/v1/projects/1/forms/test_form.svc/Submissions',
        method: 'GET',
      })
      .reply(200, fixtures.submissions);

    const state = {
      configuration,
    };

    // prettier-ignore
    const finalState = await execute(
      getSubmissions(1, 'test_form')
    )(state);

    expect(finalState.data).to.eql(fixtures.submissions.value);
  });

  it('should expand references', async () => {
    testServer
      .intercept({
        path: '/v1/projects/1/forms/test_form.svc/Submissions',
        method: 'GET',
      })
      .reply(200, fixtures.submissions);

    const state = {
      configuration,
    };

    // prettier-ignore
    const finalState = await execute(
      getSubmissions(() => 1, () => 'test_form')
    )(state);

    expect(finalState.data).to.eql(fixtures.submissions.value);
  });

  it('it handles project not found', async () => {
    testServer
      .intercept({
        path: '/v1/projects/1/forms/test_form.svc/Submissions',
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
            'Content-Type': 'application/json',
          },
        }
      );

    const state = {
      configuration,
    };

    // prettier-ignore
    const error = await execute(
      getSubmissions(1, 'test_form')
    )(state).catch(e => e);

    expect(error.statusCode).to.eql(404);
    expect(error.statusMessage).to.eql('Not Found');
    expect(error.body.message).to.eql(
      'Could not find the resource you were looking for.'
    );
  });
});

describe('HTTP wrappers', () => {
  it('request() should expand references', async () => {
    testServer
      .intercept({
        path: '/v1/projects',
        method: 'PATCH',
        body: JSON.stringify({
          name: 'Project Name',
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
      path: '/v1/projects',
      body: {
        name: 'Project Name',
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

  it('should get /projects', async () => {
    testServer
      .intercept({
        path: '/v1/projects',
        method: 'GET',
      })
      .reply(200, fixtures.projects);

    const state = {
      configuration,
    };

    // prettier-ignore
    const finalState = await execute(
      get('/v1/projects'
    ))(state);

    expect(finalState.data).to.eql(fixtures.projects);
    expect(finalState.response.statusCode).to.equal(200);
  });

  it('should get() at /projects with a query', async () => {
    testServer
      .intercept({
        path: '/v1/projects',
        method: 'GET',
        query: {
          $top: 5,
        },
      })
      .reply(200, fixtures.projects);

    const state = {
      configuration,
    };

    // prettier-ignore
    const finalState = await execute(
      get('/v1/projects', { query: { $top: 5 }})
    )(state);

    expect(finalState.data).to.eql(fixtures.projects);
    expect(finalState.response.statusCode).to.equal(200);
  });

  it('should get() at /projects with a custom header', async () => {
    testServer
      .intercept({
        path: '/v1/projects',
        method: 'GET',
        headers: {
          foo: 'bar',
        },
      })
      .reply(200, fixtures.projects);

    const state = {
      configuration,
    };

    // prettier-ignore
    const finalState = await execute(
      get('/v1/projects', { headers: { 'foo': 'bar' }})
    )(state);

    expect(finalState.data).to.eql(fixtures.projects);
    expect(finalState.response.statusCode).to.equal(200);
  });

  it('should handle a 404', async () => {
    testServer
      .intercept({
        path: '/v1/projects/22',
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

    const error = await get('/v1/projects/22')(state).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Not Found');
    expect(error.statusCode).to.eql(404);
    expect(error.body.message).to.eql(
      'Could not find the resource you were looking for.'
    );
  });

  it('should post() to /projects', async () => {
    testServer
      .intercept({
        path: '/v1/projects',
        method: 'POST',
      })
      .reply(200, {});

    const state = {
      configuration,
    };

    const finalState = await execute(
      post('/v1/projects', {
        name: 'Project Name',
      })
    )(state);

    expect(finalState.response.statusCode).to.eql(200);
  });

  it('throws an error when post() returns 403', async () => {
    testServer
      .intercept({
        path: '/v1/projects',
        method: 'POST',
      })
      .reply(403, 'Forbidden');

    const state = {
      configuration,
    };

    const error = await post('/v1/projects', {
      name: 'Project Name',
    })(state).catch(error => {
      return error;
    });

    expect(error.statusMessage).to.eql('Forbidden');
    expect(error.statusCode).to.eql(403);
  });
});
