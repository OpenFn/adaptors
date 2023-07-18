const driveResponse = {
  '@odata.context': 'https://graph.microsoft.com/v1.0/$metadata#drives/$entity',
  createdDateTime: '2022-10-23T05:09:11Z',
  description: '',
  id: 'b!YXzpkoLwR06bxC8tNdg71m_',
  lastModifiedDateTime: '2023-06-16T09:19:53Z',
  name: 'Documents',
  webUrl: 'https://openfn.sharepoint.com/Shared%20Documents',
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
  webUrl: 'https://openfn.sharepoint.com/Shared%20Documents',
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

const itemWithDownloadUrl = {
  '@odata.context':
    "https://graph.microsoft.com/v1.0/$metadata#sites('openfn.sharepoint.com')/drive/items/$entity",
  '@microsoft.graph.downloadUrl':
    'https://openfn.sharepoint.com/_layouts/15/download.aspx?UniqueId=d97073d1-5ee7-4218-97cd-bd4167078516&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvb3BlbmZub3JnLnNoYXJlcG9pbnQuY29tQDNiMjRlYWRiLTczNmUtNDhkYi1iMTQzLTIzYjM5OGQwYmJkMSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2ODg1NDM1MzkiLCJleHAiOiIxNjg4NTQ3MTM5IiwiZW5kcG9pbnR1cmwiOiIyUWJ3dmlKbmFvYkFtOHBrTHdlNlJ4NmZzaXZwVXhjbzBqUDNvTjJFWlNFPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTIwIiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiIwajROcFJyQ2xrcVBqNGlVZ2l6VERBPT0iLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiT1RKbE9UZGpOakV0WmpBNE1pMDBaVFEzTFRsaVl6UXRNbVl5WkRNMVpEZ3pZbVEyIiwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggRXhwbG9yZXIiLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJ0aWQiOiIzYjI0ZWFkYi03MzZlLTQ4ZGItYjE0My0yM2IzOThkMGJiZDEiLCJ1cG4iOiJhbGVrc2FAb3BlbmZuLm9yZyIsInB1aWQiOiIxMDAzMjAwMTFDQzU1QUYyIiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDExY2M1NWFmMkBsaXZlLmNvbSIsInNjcCI6Im15ZmlsZXMucmVhZCBhbGxmaWxlcy5yZWFkIGFsbGZpbGVzLndyaXRlIGFsbHNpdGVzLnJlYWQgYWxsc2l0ZXMud3JpdGUgYWxscHJvZmlsZXMucmVhZCIsInR0IjoiMiIsImlwYWRkciI6IjIwLjE5MC4xOTAuMzIifQ.GW9275WR6EoqF-PRwDq0VpOr1toRYRMHXzO4o8pPm8o&ApiVersion=2.0',
  createdDateTime: '2023-06-15T08:58:44Z',
  eTag: '"{D97073D1-5EE7-4218-97CD-BD4167078516},4"',
  id: '01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW',
  lastModifiedDateTime: '2023-06-16T07:53:31Z',
  name: 'test.csv',
  webUrl:
    'https://openfn.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc=%7BD97073D1-5EE7-4218-97CD-BD4167078516%7D&file=test.csv&action=default&mobileredirect=true',
  cTag: '"c:{D97073D1-5EE7-4218-97CD-BD4167078516},1"',
  size: 10974,
  createdBy: {
    user: {
      email: 'adaptors@openfn.org',
      id: 'dcebd58e-c28c-449d-b02c-ba2ce7f1ae2a',
      displayName: 'adaptors',
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
    driveType: 'documentLibrary',
    driveId: 'b!YXzpkoLwR06bxC8tNdg71m_',
    id: '7AVZF2VMHE2I3O6OY301LUM6XOCKDTZKQC',
    path: '/drive/root:/test_csv_data',
    siteId: '92e97c61-f082-4e47-9bc4-2f2d35d83bd6',
  },
  file: {
    mimeType: 'application/vnd.ms-excel',
    hashes: {
      quickXorHash: 'WYHPQx/2bFNFU3A8v4yKEWinMqU=',
    },
  },
  fileSystemInfo: {
    createdDateTime: '2023-06-15T08:58:44Z',
    lastModifiedDateTime: '2023-06-16T07:53:31Z',
  },
  shared: {
    scope: 'users',
  },
};

const firstItem = {
  '@odata.etag': '"d97073d1-5ee7-4218-97cd-bd4167078516,2"',
  createdDateTime: '2023-06-15T08:58:44Z',
  eTag: '"d97073d1-5ee7-4218-97cd-bd4167078516,2"',
  id: '1',
  lastModifiedDateTime: '2023-06-16T07:53:31Z',
  webUrl:
    'https://openfn.sharepoint.com/Shared%20Documents/test_csv_data/test.csv',
  createdBy: {
    user: {
      email: 'adaptors@openfn.org',
      id: 'dcebd58e-c28c-449d-b02c-ba2ce7f1ae2a',
      displayName: 'adaptors',
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
    id: 'a8f21c4a-e00b-4bae-aab0-e4d236ef3b1b',
    siteId:
      'openfn.sharepoint.com,92e97c61-f082-4e47-9bc4-2f2d35d83bd6,916ced6f-69d1-42b4-89db-0e6a5d1c7a83',
  },
  contentType: {
    id: '0x010100517725BFCABB814FB696A80EE2A7FA51',
    name: 'Document',
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
      "https://graph.microsoft.com/v1.0/$metadata#sites('openfn.sharepoint.com')/lists",
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
        webUrl: 'https://openfn.sharepoint.com/Lists/Events',
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
  itemResponse: itemWithDownloadUrl,
  itemContent: 'a,b,c\n1,2,3\n4,5,6\n7,8,9',
  itemsResponse: {
    '@odata.context':
      "https://graph.microsoft.com/v1.0/$metadata#sites('openfn.sharepoint.com')/lists('Documents')/items",
    value: [
      {
        '@odata.etag': '"a8f21c4a-e00b-4bae-aab0-e4d236ef3b1b,1"',
        createdDateTime: '2023-06-15T09:34:36Z',
        eTag: '"a8f21c4a-e00b-4bae-aab0-e4d236ef3b1b,1"',
        id: '2',
        lastModifiedDateTime: '2023-06-15T09:34:36Z',
        webUrl:
          'https://openfn.sharepoint.com/Shared%20Documents/test_csv_data',
        createdBy: {
          user: {
            email: 'adaptors@openfn.org',
            id: 'dcebd58e-c28c-449d-b02c-ba2ce7f1ae2a',
            displayName: 'adaptors',
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
          id: '9c199edf-bdb3-42b0-a992-2802d86d4d18',
          siteId:
            'openfn.sharepoint.com,92e97c61-f082-4e47-9bc4-2f2d35d83bd6,916ced6f-69d1-42b4-89db-0e6a5d1c7a83',
        },
        contentType: {
          id: '0x0120006762BC4583376542ACBB009AF1B80536',
          name: 'Folder',
        },
      },
      firstItem,
      {
        '@odata.etag': '"a7ee19c6-ff80-4dbb-a16c-786e8584db83,0"',
        createdDateTime: '2023-06-16T08:59:38Z',
        eTag: '"a7ee19c6-ff80-4dbb-a16c-786e8584db83,0"',
        id: '3',
        lastModifiedDateTime: '2023-06-16T08:59:38Z',
        webUrl:
          'https://openfn.sharepoint.com/Shared%20Documents/test_csv_data/test1.csv',
        createdBy: {
          user: {
            email: 'adaptors@openfn.org',
            id: 'dcebd58e-c28c-449d-b02c-ba2ce7f1ae2a',
            displayName: 'adaptors',
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
          id: 'a8f21c4a-e00b-4bae-aab0-e4d236ef3b1b',
          siteId:
            'openfn.sharepoint.com,92e97c61-f082-4e47-9bc4-2f2d35d83bd6,916ced6f-69d1-42b4-89db-0e6a5d1c7a83',
        },
        contentType: {
          id: '0x010100517725BFCABB814FB696A80EE2A7FA51',
          name: 'Document',
        },
      },
    ],
  },
  itemWithOptions: {
    '@odata.context':
      "https://graph.microsoft.com/v1.0/$metadata#sites('openfn.sharepoint.com')/drive/items/$entity",
    '@microsoft.graph.downloadUrl':
      'https://openfn.sharepoint.com/_layouts/15/download.aspx?UniqueId=d97073d1-5ee7-4218-97cd-bd4167078516&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvb3BlbmZub3JnLnNoYXJlcG9pbnQuY29tQDNiMjRlYWRiLTczNmUtNDhkYi1iMTQzLTIzYjM5OGQwYmJkMSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2ODg1NDgyMTgiLCJleHAiOiIxNjg4NTUxODE4IiwiZW5kcG9pbnR1cmwiOiIyUWJ3dmlKbmFvYkFtOHBrTHdlNlJ4NmZzaXZwVXhjbzBqUDNvTjJFWlNFPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTIwIiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiI2MW1tK0FKc0NFU2R5ZWVTRm9CaVlRPT0iLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiT1RKbE9UZGpOakV0WmpBNE1pMDBaVFEzTFRsaVl6UXRNbVl5WkRNMVpEZ3pZbVEyIiwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggRXhwbG9yZXIiLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJ0aWQiOiIzYjI0ZWFkYi03MzZlLTQ4ZGItYjE0My0yM2IzOThkMGJiZDEiLCJ1cG4iOiJhbGVrc2FAb3BlbmZuLm9yZyIsInB1aWQiOiIxMDAzMjAwMTFDQzU1QUYyIiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDExY2M1NWFmMkBsaXZlLmNvbSIsInNjcCI6Im15ZmlsZXMucmVhZCBhbGxmaWxlcy5yZWFkIGFsbGZpbGVzLndyaXRlIGFsbHNpdGVzLnJlYWQgYWxsc2l0ZXMud3JpdGUgYWxscHJvZmlsZXMucmVhZCIsInR0IjoiMiIsImlwYWRkciI6IjIwLjE5MC4xOTAuMzUifQ.T-o2ieNljC7o8C5FzgAR2hFCvq99HBYszbHjbC4Pqis&ApiVersion=2.0',
    id: '01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW',
  },
};

export { fixtures };
