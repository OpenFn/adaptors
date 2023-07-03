import { MockAgent } from 'undici';

const mockAgent = new MockAgent();

const mockPool = mockAgent.get('https://graph.microsoft.com');

const driveResponse = {
  '@odata.context': 'https://graph.microsoft.com/v1.0/$metadata#drives/$entity',
  createdDateTime: '2022-10-23T05:09:11Z',
  description: '',
  id: 'b!YXzpkoLwR06bxC8tNdg71m_',
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
      id: 'dcebd58e-c28c-449d-b02c-ba2ce7f1ae2a',
      displayName: 'adaptors',
    },
  },
  owner: {
    group: {
      id: '528c63a4-0690-4a57-9d80-bf847dfde47f',
      displayName: 'Company Administrator',
    },
  },
  quota: {},
};

const sharedDocumentList = {
  '@odata.etag': '"e0cb85e7-6497-4ffb-80b0-49e864bea1cd,4"',
  createdDateTime: '2022-10-23T05:09:11Z',
  description: '',
  eTag: '"e0cb85e7-6497-4ffb-80b0-49e864bea1cd,4"',
  id: 'e0cb85e7-6497-4ffb-80b0-49e864bea1cd',
  lastModifiedDateTime: '2023-06-16T09:19:53Z',
  name: 'Shared Documents',
  webUrl: 'https://openfnorg.sharepoint.com/Shared%20Documents',
  displayName: 'Documents',
  createdBy: {
    user: {
      displayName: 'System Account',
    },
  },
  lastModifiedBy: {
    user: {
      email: 'adaptors@openfn.org',
      id: 'dcebd58e-c28c-449d-b02c-ba2ce7f1ae2a',
      displayName: 'adaptors',
    },
  },
  parentReference: {
    siteId: 'openfn.sharepoint.com, 92e97c61-f082, 916ced6f-69d1',
  },
  list: {
    contentTypesEnabled: false,
    hidden: false,
    template: 'documentLibrary',
  },
};
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
  driveResponse: driveResponse,
  drivesResponse: {
    '@odata.context': 'https://graph.microsoft.com/v1.0/$metadata#drives',
    value: [driveResponse],
  },
  userDrives: {
    '@odata.context': 'https://graph.microsoft.com/v1.0/$metadata#drives',
    value: [
      {
        createdDateTime: '2022-10-23T05:06:55Z',
        description: 'Profile Pictures for all users will be stored here.',
        id: 'b!_sTvrBlmSYBUErg35Bye',
        lastModifiedDateTime: '2023-06-15T09:19:24Z',
        name: 'User Photos',
        webUrl: 'https://openfnorg-my.sharepoint.com/User%20Photos',
        driveType: 'documentLibrary',
        createdBy: {
          user: {
            displayName: 'System Account',
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
      {
        createdDateTime: '2022-10-23T05:06:55Z',
        description:
          'Use this Picture Library to store logos for Organizations.',
        id: 'asb!McSqXeNJR0eVUAisYAoR8nOT_t',
        lastModifiedDateTime: '2022-10-23T05:06:55Z',
        name: 'Organization Logos',
        webUrl: 'https://openfnorg-my.sharepoint.com/Organization%20Logos',
        driveType: 'documentLibrary',
        createdBy: {
          user: {
            displayName: 'System Account',
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
    ],
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
  sharedDocumentList: sharedDocumentList,
  listsResponse: {
    '@odata.context':
      "https://graph.microsoft.com/v1.0/$metadata#sites('openfnorg.sharepoint.com')/lists",
    value: [
      sharedDocumentList,
      {
        '@odata.etag': '"48843b4f-cb5e-482b-800a-d1d59a572467,5"',
        createdDateTime: '2023-06-15T09:25:25Z',
        description: 'SharePointHome OrgLinks List',
        eTag: '"48843b4f-cb5e-482b-800a-d1d59a572467,5"',
        id: '48843b4f-cb5e-482b-800a-d1d59a572467',
        lastModifiedDateTime: '2023-06-16T08:09:14Z',
        name: 'SharePointHomeOrgLinks',
        webUrl: 'https://openfn.sharepoint.com/Lists/SharePointHomeOrgLinks',
        displayName: 'SharePointHomeOrgLinks',
        createdBy: {
          user: {
            displayName: 'System Account',
          },
        },
        lastModifiedBy: {
          user: {
            email: 'adaptors@openfn.org',
            id: 'dcebd58e-c28c-449d-b02c-ba2ce7f1ae2a',
            displayName: 'adaptors',
          },
        },
        parentReference: {
          siteId: 'openfn.sharepoint.com, 92e97c61-f082, 916ced6f-69d1',
        },
        list: {
          contentTypesEnabled: false,
          hidden: true,
          template: 'genericList',
        },
      },
      {
        '@odata.etag': '"f1c7150a-9a8e-41ff-9e94-e84820c16a30,0"',
        createdDateTime: '2022-10-23T05:09:12Z',
        description: '',
        eTag: '"f1c7150a-9a8e-41ff-9e94-e84820c16a30,0"',
        id: 'f1c7150a-9a8e-41ff-9e94-e84820c16a30',
        lastModifiedDateTime: '2023-06-16T06:42:05Z',
        name: 'Events',
        webUrl: 'https://openfnorg.sharepoint.com/Lists/Events',
        displayName: 'Events',
        createdBy: {
          user: {
            displayName: 'System Account',
          },
        },
        parentReference: {
          siteId: 'openfn.sharepoint.com, 92e97c61-f082, 916ced6f-69d1',
        },
        list: {
          contentTypesEnabled: true,
          hidden: false,
          template: 'events',
        },
      },
    ],
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
    path: '/v1.0/drives/b!YXzpkoLwR06bxC8tNdg71m_',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.driveResponse);

mockPool
  .intercept({
    path: '/v1.0/me/drives',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.userDrives);

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/drives',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.drivesResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/lists',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.listsResponse);

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/lists/e0cb85e7-6497-4ffb-80b0-49e864bea1cd',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.sharedDocumentList);

mockPool
  .intercept({
    path: '/v1.0/sites/openfn.sharepoint.com/lists/Documents',
    method: 'GET',
    headers: headers,
  })
  .reply(200, fixtures.sharedDocumentList);

export default mockAgent;
