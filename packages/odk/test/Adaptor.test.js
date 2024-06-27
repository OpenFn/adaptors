import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { execute, get, post, getSubmissions } from '../src/Adaptor.js';

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

    expect(finalState.data).to.eql(fixtures.submissions);
  });

  // TODO this isn't handled well yet
  it.skip('it handles project not found', async () => {
    testServer
      .intercept({
        path: '/v1/projects/1/forms/test_form.svc/Submissions',
        method: 'GET',
      })
      .reply(404, fixtures.submissions);

    const state = {
      configuration,
    };

    // prettier-ignore
    const finalState = await execute(
      getSubmissions(1, 'test_form')
    )(state);

    expect(finalState.data).to.eql(fixtures.submissions);
  });
});

describe('HTTP wrappers', () => {
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

  it.skip('should handle a 404', () => {});

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
