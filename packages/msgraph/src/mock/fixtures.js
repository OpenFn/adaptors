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
    path: '/drive/root:/Sample%20Data',
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

const itemsResponse = {
  '@odata.context':
    "https://graph.microsoft.com/v1.0/$metadata#sites('openfn.sharepoint.com')/lists('Documents')/items",
  value: [
    {
      '@odata.etag': '"a8f21c4a-e00b-4bae-aab0-e4d236ef3b1b,1"',
      createdDateTime: '2023-06-15T09:34:36Z',
      eTag: '"a8f21c4a-e00b-4bae-aab0-e4d236ef3b1b,1"',
      id: '2',
      lastModifiedDateTime: '2023-06-15T09:34:36Z',
      webUrl: 'https://openfn.sharepoint.com/Shared%20Documents/Sample%20Data',
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
    {
      '@odata.etag': '"d97073d1-5ee7-4218-97cd-bd4167078516,2"',
      createdDateTime: '2023-06-15T08:58:44Z',
      eTag: '"d97073d1-5ee7-4218-97cd-bd4167078516,2"',
      id: '1',
      lastModifiedDateTime: '2023-06-16T07:53:31Z',
      webUrl:
        'https://openfn.sharepoint.com/Shared%20Documents/Sample%20Data/test.csv',
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
    {
      '@odata.etag': '"a7ee19c6-ff80-4dbb-a16c-786e8584db83,0"',
      createdDateTime: '2023-06-16T08:59:38Z',
      eTag: '"a7ee19c6-ff80-4dbb-a16c-786e8584db83,0"',
      id: '3',
      lastModifiedDateTime: '2023-06-16T08:59:38Z',
      webUrl:
        'https://openfn.sharepoint.com/Shared%20Documents/Sample%20Data/test.csv',
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
};

const fixtures = {
  accessToken: 'validAccessToken=',
  expiredToken: 'expiredAccessToken',
  invalidToken: 'invalidAccessToken',
  driveResponse: driveResponse,
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
  itemWithDownloadUrl: itemWithDownloadUrl,
  itemResponse: {
    '@odata.context':
      "https://graph.microsoft.com/v1.0/$metadata#drives('b%21YXzpkoLwR06bxC8tNdg71m_tbJHRabRCidsOal0ceoPnhcvgl2T7T4CwSehkvqHN')/items/$entity",
    createdDateTime: '2023-06-15T09:34:36Z',
    eTag: '"{A8F21C4A-E00B-4BAE-AAB0-E4D236EF3B1B},3"',
    id: '01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3',
    lastModifiedDateTime: '2023-07-13T07:33:29Z',
    name: 'Sample Data',
    webUrl:
      'https://openfn.sharepoint.com/Shared%20Documents/BC%20Actuals%20Export',
    cTag: '"c:{A8F21C4A-E00B-4BAE-AAB0-E4D236EF3B1B},0"',
    size: 70245,
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
      driveId:
        'b!YXzpkoLwR06bxC8tNdg71m_tbJHRabRCidsOal0ceoPnhcvgl2T7T4CwSehkvqHN',
      id: '01LUM6XOF6Y2GOVW7725BZO354PWSELRRZ',
      path: '/drives/b!YXzpkoLwR06bxC8tNdg71m_tbJHRabRCidsOal0ceoPnhcvgl2T7T4CwSehkvqHN/root:',
      siteId: '92e97c61-f082-4e47-9bc4-2f2d35d83bd6',
    },
    fileSystemInfo: {
      createdDateTime: '2023-06-15T09:34:36Z',
      lastModifiedDateTime: '2023-07-13T07:33:29Z',
    },
    folder: {
      childCount: 3,
    },
    shared: {
      scope: 'users',
    },
  },
  itemContent: 'a,b,c\n1,2,3\n4,5,6\n7,8,9',
  itemsResponse: itemsResponse,
  submitXlsResponse: {
    '@odata.context':
      "https://graph.microsoft.com/v1.0/$metadata#sites('openfn.sharepoint.com')/drive/items/$entity",
    '@microsoft.graph.downloadUrl':
      'https://openfn.sharepoint.com/_layouts/15/download.aspx?UniqueId=bdff7734-5f46-4619-92e3-fc21cfa2766e&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvb3BlbmZub3JnLnNoYXJlcG9pbnQuY29tQDNiMjRlYWRiLTczNmUtNDhkYi1iMTQzLTIzYjM5OGQwYmJkMSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2OTUxMDg1NTEiLCJleHAiOiIxNjk1MTEyMTUxIiwiZW5kcG9pbnR1cmwiOiJOQmt3U1NmUUwrSmwxbnJ4ZzNYQjFuNmZLMDdoZk1kazM0TXlsY3MzeWpnPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTIwIiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJCWEd6aWs1b2ZrRzNhWU80ZWcxMnRBPT0iLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiT1RKbE9UZGpOakV0WmpBNE1pMDBaVFEzTFRsaVl6UXRNbVl5WkRNMVpEZ3pZbVEyIiwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggRXhwbG9yZXIiLCJnaXZlbl9uYW1lIjoiTXR1Y2hpIiwiZmFtaWx5X25hbWUiOiJFdmFuY2UiLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJ0aWQiOiIzYjI0ZWFkYi03MzZlLTQ4ZGItYjE0My0yM2IzOThkMGJiZDEiLCJ1cG4iOiJtdHVjaGlAb3BlbmZuLm9yZyIsInB1aWQiOiIxMDAzMjAwMkMxNDY2RUYzIiwiY2FjaGVrZXkiOiIwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDJjMTQ2NmVmM0BsaXZlLmNvbSIsInNjcCI6Im15ZmlsZXMucmVhZCBhbGxzaXRlcy5yZWFkIGFsbHNpdGVzLndyaXRlIGFsbHByb2ZpbGVzLnJlYWQiLCJ0dCI6IjIiLCJpcGFkZHIiOiIyMC4xOTAuMTkwLjMyIn0.YdxTQHIQ51P3-qzELCCQDj1hK1NOIs5CNpCumkXCvTw&ApiVersion=2.0',
    createdDateTime: '2023-09-19T07:29:12Z',
    eTag: '"{BDFF7734-5F46-4619-92E3-FC21CFA2766E},1"',
    id: '01LUM6XOBUO7732RS7DFDJFY74EHH2E5TO',
    lastModifiedDateTime: '2023-09-19T07:29:12Z',
    name: '2023_09_19T07_29_09_369Z.xls',
    webUrl:
      'https://openfn.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc=%7BBDFF7734-5F46-4619-92E3-FC21CFA2766E%7D&file=2023_09_19T07_29_09_369Z.xls&action=default&mobileredirect=true',
    cTag: '"c:{BDFF7734-5F46-4619-92E3-FC21CFA2766E},1"',
    size: 16723,
    createdBy: {
      application: {
        id: 'de8bc8b5-d9f9-48b1-a8ad-b748da725064',
        displayName: 'Graph Explorer',
      },
      user: {
        id: '4ebe0c0b-8287-4ec6-b696-c8d19dd80cd1',
        displayName: 'Mtuchi',
      },
    },
    lastModifiedBy: {
      application: {
        id: 'de8bc8b5-d9f9-48b1-a8ad-b748da725064',
        displayName: 'Graph Explorer',
      },
      user: {
        id: '4ebe0c0b-8287-4ec6-b696-c8d19dd80cd1',
        displayName: 'Mtuchi',
      },
    },
    parentReference: {
      driveType: 'documentLibrary',
      driveId:
        'b!YXzpkoLwR06bxC8tNdg71m_tbJHRabRCidsOal0ceoPnhcvgl2T7T4CwSehkvqHN',
      id: '01LUM6XOGVJ2OK2Z5RJRAKU3WAK2MTC5XD',
      path: '/drive/root:/BC Exception Reports',
      siteId: '92e97c61-f082-4e47-9bc4-2f2d35d83bd6',
    },
    file: {
      mimeType: 'application/vnd.ms-excel',
      hashes: {
        quickXorHash: 'hLOXP3xQXS0NN1JeRe+JqtTjogM=',
      },
    },
    fileSystemInfo: {
      createdDateTime: '2023-09-19T07:29:12Z',
      lastModifiedDateTime: '2023-09-19T07:29:12Z',
    },
    shared: {
      scope: 'users',
    },
  },
};

export { fixtures };
