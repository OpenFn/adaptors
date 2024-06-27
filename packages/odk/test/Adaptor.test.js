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
  it('it should fail if credentials are wrong', async () => {
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

  it('it should get form submissions', async () => {
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

// describe('Create Project', () => {
//   it('it should create a project', async () => {
//     testServer
//       .intercept({
//         path: '/v1/projects',
//         data: {
//           name: 'Project Name',
//         },
//         method: 'POST',
//       })
//       .reply(200, {
//         id: 1,
//         name: 'Default Project',
//         description: 'Description of this Project to show on Central.',
//         keyId: 3,
//         archived: false,
//       });

//     const state = {
//       configuration: {
//         baseUrl,
//         email: 'someusername',
//         password: 'somepassword',
//       },
//     };

//     const finalState = await post('/v1/projects', {
//       name: 'Project Name',
//     })(state);

//     expect(finalState.data).to.eql({
//       id: 1,
//       name: 'Default Project',
//       description: 'Description of this Project to show on Central.',
//       keyId: 3,
//       archived: false,
//     });
//   });

//   it('throws an error if creating project returns 403', async () => {
//     testServer
//       .intercept({
//         path: '/v1/projects',
//         method: 'POST',
//       })
//       .reply(403, 'Forbidden');

//     const state = {
//       configuration: {
//         baseUrl,
//         email: 'someusername',
//         password: 'somepassword',
//       },
//     };

//     const error = await post('/v1/projects', {
//       name: 'Project Name',
//     })(state).catch(error => {
//       return error;
//     });

//     expect(error.statusMessage).to.eql('Forbidden');
//     expect(error.statusCode).to.eql(403);
//   });
// });

// describe('getProjects', () => {
//   it('it should get projects', async () => {
//     testServer
//       .intercept({
//         path: '/v1/projects',
//         method: 'GET',
//       })
//       .reply(200, {
//         id: 1,
//         name: 'SomeName',
//         description: null,
//         archived: null,
//         keyId: null,
//         createdAt: '2024-04-25T18:33:28.727Z',
//         updatedAt: '2024-04-25T18:40:56.617Z',
//         deletedAt: null,
//         verbs: [],
//       });

//     const state = {
//       configuration: {
//         baseUrl,
//         email: 'someusername',
//         password: 'somepassword',
//       },
//     };

//     const finalState = await get('/v1/projects')(state);

//     expect(finalState.data).to.eql({
//       id: 1,
//       name: 'SomeName',
//       description: null,
//       archived: null,
//       keyId: null,
//       createdAt: '2024-04-25T18:33:28.727Z',
//       updatedAt: '2024-04-25T18:40:56.617Z',
//       deletedAt: null,
//       verbs: [],
//     });
//   });
// });

// describe('getForms', () => {
//   it('it should get project forms', async () => {
//     testServer
//       .intercept({
//         path: '/v1/projects/1/forms',
//         method: 'GET',
//       })
//       .reply(200, {
//         projectId: 1,
//         xmlFormId: 'test_form',
//         state: 'open',
//         enketoId: 'ABCD1234',
//         enketoOnceId: '12345abcd',
//         createdAt: '2024-04-25T18:42:50.367Z',
//         updatedAt: '2024-04-25T18:42:53.338Z',
//         keyId: null,
//         version: '2023120100',
//         hash: '12345abcd',
//         sha: '12345abcd',
//         sha256: '12345abcd',
//         draftToken: null,
//         publishedAt: '2024-04-25T18:42:53.336Z',
//         name: 'Test Form',
//       });

//     const state = {
//       configuration: {
//         baseUrl,
//         email: 'someusername',
//         password: 'somepassword',
//       },
//     };

//     const finalState = await getForms(1)(state);

//     expect(finalState.data.projectId).to.eql(1);
//     expect(finalState.data.xmlFormId).to.eql('test_form');
//   });
// });
