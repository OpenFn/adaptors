import { MockAgent } from 'undici';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://graph.microsoft.com');

const accessToken = 'aGVsbG86dGhlcmU=';

const sitesResponse = {
  '@odata.context': 'https://graph.microsoft.com/v1.0/$metadata#sites/$entity',
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
};

const driveResponse = {};

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .reply(200, sitesResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/root',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .reply(200, sitesResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/drives',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .reply(200, {
    '@odata.context': 'https://graph.microsoft.com/v1.0/$metadata#drives',
    value: [
      {
        createdDateTime: '2022-10-23T05:09:11Z',
        description: '',
        id: 'b!AbCdEfGhIjKlMnOpQrStUvWxYz0123456789',
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
            email: 'adaptors@openfn.org',
            id: '9eae7d21-9c5e-4d42-915b-6c79df32e4d3',
            displayName: 'adaptors',
          },
        },
        owner: {
          group: {
            id: 'a3d13c02-90e8-4a6d-b9fa-5d951f2d0d7b',
            displayName: 'Company Administrator',
          },
        },
        quota: {},
      },
    ],
  });

mockPool
  .intercept({
    path: '/v1.0/sites/noAccess',
    method: 'GET',
  })
  .reply(400, {
    error: {
      code: 'invalidRequest',
      message: 'Invalid hostname for this tenancy',
      innerError: {
        date: '2023-06-27T15:38:19',
        'request-id': '18d9a4da-c897-4c07-b203-4d06f0490a65',
        'client-request-id': '672385d5-3ea8-f201-a4cb-a087f11d90e1',
      },
    },
  });

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/drives',
    method: 'GET',
  })
  .reply(500, {
    message: 'Server error',
    status: 'error',
    code: 500,
  });

export default mockAgent;
