import { MockAgent } from 'undici';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://graph.microsoft.com');

const fixtures = {
  accessToken: 'validAccessToken=',
  expiredToken: 'expiredAccessToken',
  invalidToken: 'invalidAccessToken',
  sitesResponse: {
    '@odata.context':
      'https://graph.microsoft.com/v1.0/$metadata#sites/$entity',
    createdDateTime: '2022-11-21T07:08:13.55Z',
    description: '',
    id: 'openfn.sharepoint.com,f47ac10b-58cc-4372-a567-0e02b2c3d479,df35c8e4-7e9e-4f5d-af19-4918c6412a94',
    lastModifiedDateTime: '2023-06-27T11:46:47Z',
    name: '',
    webUrl: 'https://openfn.sharepoint.com',
    displayName: 'Communication site',
    root: {},
    siteCollection: {
      hostname: 'openfn.sharepoint.com',
    },
  },
  driveResponse: {
    '@odata.context':
      'https://graph.microsoft.com/v1.0/$metadata#drives/$entity',
    createdDateTime: '2022-10-23T05:09:11Z',
    description: '',
    id: 'b!YXzpkoLwR06bxC8tNdg71m_tbJHRabRCidsOal0ceoPnhcvgl2T7T4CwSehkvqHN',
    lastModifiedDateTime: '2023-06-16T09:19:53Z',
    name: 'Documents',
    webUrl: 'https://openfnorg.sharepoint.com/Shared%20Documents',
    driveType: 'documentLibrary',
    createdBy: {
      user: {
        displayName: 'System Account',
      },
    },
    lastModifiedBy: {
      user: {
        email: 'aleksa@openfn.org',
        id: 'dcebd58e-c28c-449d-b02c-ba2ce7f1ae2a',
        displayName: 'aleksakrolls',
      },
    },
    owner: {
      group: {
        id: '528c63a4-0690-4a57-9d80-bf847dfde47f',
        displayName: 'Company Administrator',
      },
    },
    quota: {},
  },
  invalidRequestResponse: {
    // 400
    error: {
      code: 'invalidRequest',
      message: 'Invalid hostname for this tenancy',
      innerError: {
        date: '2023-06-27T15:38:19',
        'request-id': '18d9a4da-c897-4c07-b203-4d06f0490a65',
        'client-request-id': '672385d5-3ea8-f201-a4cb-a087f11d90e1',
      },
    },
  },
  expiredTokenResponse: {
    //401
    error: {
      code: 'InvalidAuthenticationToken',
      message: 'Access token has expired or is not yet valid.',
      innerError: {
        date: '2023-06-27T22:14:17',
        'request-id': 'd0e595aa-6b8a-4473-956a-9f889783460a',
        'client-request-id': 'd0e595aa-6b8a-4473-956a-9f889783460a',
      },
    },
  },
  invalidTokenResponse: {
    error: {
      code: 'InvalidAuthenticationToken',
      message: 'CompactToken parsing failed with error code: 80049217',
      innerError: {
        date: '2023-06-27T22:17:01',
        'request-id': '93fa1d83-8450-4fc4-a94f-e9d14991462d',
        'client-request-id': '93fa1d83-8450-4fc4-a94f-e9d14991462d',
      },
    },
  },
};

const headers = {
  'content-type': 'application/json',
  Authorization: `Bearer ${fixtures.accessToken}`,
};

const headersWithInvalidToken = {
  'content-type': 'application/json',
  Authorization: `Bearer ${fixtures.invalidToken}`,
};

const headersWithExpiredToken = {
  'content-type': 'application/json',
  Authorization: `Bearer ${fixtures.expiredToken}`,
};

export { fixtures };

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.sitesResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com',
    method: 'GET',
    headers: headersWithExpiredToken,
  })
  .reply(401, fixtures.expiredTokenResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com',
    method: 'GET',
    headers: headersWithInvalidToken,
  })
  .reply(401, fixtures.invalidTokenResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/root',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.sitesResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/noAccess',
    method: 'GET',
    headers: headers,
  })
  .reply(400, fixtures.invalidRequestResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/drive',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.driveResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/drives',
    method: 'GET',
    headers: headers,
  })
  .reply(200, {
    '@odata.context': 'https://graph.microsoft.com/v1.0/$metadata#drives',
    value: [fixtures.driveResponse],
  });

export default mockAgent;
