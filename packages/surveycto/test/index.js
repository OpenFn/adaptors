import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  execute,
  request,
  fetchSubmissions,
  jsonToCSVBuffer,
  listDatasets,
  listRecords,
  getDataset,
  getRecord,
  uploadCsvRecords,
  upsertDataset,
  upsertRecord,
  deleteDataset,
  deleteRecord,
  purgeDataset,
} from '../src';
import { convertDate, dateRegex } from '../src/Utils';

const baseUrl = 'https://test.surveycto.com';
const mock = enableMockClient(baseUrl);

describe('request', () => {
  it('throws if an absolute URL is passed', async () => {
    // happily the request won't actually be made, so we don't need to mock anything here
    let err;
    try {
      await execute(request('https://www.blah.com/a/b/c'))({});
    } catch (e) {
      err = e;
    }
    expect(err.code).to.equal('UNEXPECTED_ABSOLUTE_URL');
  });
});

describe('fetchSubmissions', () => {
  it('should not blow up if 0 records returned', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
      },
    };

    mock
      .intercept({
        path: /\/api\/v1\/forms\/data\/wide\/json\/my\-form/,
        method: 'GET',
      })
      .reply(200, [], {
        headers: { 'content-type': 'application/json' },
      });

    const result = await fetchSubmissions('my-form')(state);
    expect(result.data).to.eql([]);
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('listDatasets', () => {
  it('should list all datasets', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets/,
        method: 'GET',
      })
      .reply(
        200,
        {
          total: 1,
          data: [
            {
              id: 'new_dataset',
              title: 'New dataset',
              discriminator: 'DATA',
              groupId: 1,
            },
          ],
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await listDatasets()(state);
    expect(result.data.data).to.eql([
      {
        id: 'new_dataset',
        title: 'New dataset',
        discriminator: 'DATA',
        groupId: 1,
      },
    ]);
    expect(result.response.statusCode).to.eql(200);
  });

  it('should list datasets with options', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets/,
        method: 'GET',
        query: { limit: '2' },
      })
      .reply(
        200,
        {
          total: 3,
          limit: 2,
          data: [
            {
              id: 'new_dataset',
              title: 'New dataset',
              discriminator: 'DATA',
              groupId: 1,
            },
            {
              id: 'enumerators_dataset',
              title: 'Enumerators Dataset',
              discriminator: 'ENUMERATORS',
              groupId: 1,
            },
          ],
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await listDatasets()(state);
    expect(result.data.data.length).to.eql(2);
    expect(result.data.limit).to.eql(2);
  });
});

describe('listRecords', () => {
  it('should list all records', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/records/,
        method: 'GET',
      })
      .reply(
        200,
        {
          total: 1,
          data: [
            {
              recordId: '2',
              values: {
                id: '2',
                name: 'Triayuio8gtvgu7gt',
                users: 'All users',
              },
            },
          ],
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await listRecords('new_dataset')(state);
    expect(result.data.data).to.eql([
      {
        recordId: '2',
        values: {
          id: '2',
          name: 'Triayuio8gtvgu7gt',
          users: 'All users',
        },
      },
    ]);
    expect(result.response.statusCode).to.eql(200);
  });

  it('should list records with options', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/records/,
        method: 'GET',
        query: { limit: '2' },
      })
      .reply(
        200,
        {
          total: 3,
          limit: 2,
          data: [
            {
              recordId: '2',
              values: {
                id: '2',
                name: 'Triayuio8gtvgu7gt',
                users: 'All users',
              },
            },
            {
              recordId: '3',
              values: {
                id: '3',
                name: 'Trialaalaytsedfguihgytrc',
                users: 'All users here',
              },
            },
          ],
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await listRecords('new_dataset')(state);
    expect(result.data.data.length).to.eql(2);
    expect(result.data.limit).to.eql(2);
  });
});

describe('getRecord', () => {
  it('should list a single record', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/record/,
        method: 'GET',
        query: { recordId: '2' },
      })
      .reply(
        200,
        {
          recordId: '2',
          values: {
            name: 'Triayuio8gtvgu7gt',
            id: '2',
            users: 'All users',
          },
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await getRecord('new_dataset', 2)(state);
    expect(result.data).to.eql({
      recordId: '2',
      values: {
        name: 'Triayuio8gtvgu7gt',
        id: '2',
        users: 'All users',
      },
    });
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('getDataset', () => {
  it('should list a single dataset', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset/,
        method: 'GET',
      })
      .reply(
        200,
        {
          id: 'new_dataset',
          title: 'New dataset',
          discriminator: 'DATA',
          groupId: 1,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await getDataset('new_dataset')(state);
    expect(result.data).to.eql({
      id: 'new_dataset',
      title: 'New dataset',
      discriminator: 'DATA',
      groupId: 1,
    });
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('upsertDataset', () => {
  it('should make a get then update if an item is found', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset/,
        method: 'GET',
      })
      .reply(
        200,
        {
          id: 'new_dataset',
          title: 'New dataset',
          discriminator: 'DATA',
          groupId: 1,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );
    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset/,
        method: 'PUT',
      })
      .reply(
        200,
        {
          id: 'new_dataset',
          title: 'Updated dataset',
          discriminator: 'DATA',
          groupId: 1,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );
    const result = await upsertDataset('new_dataset', {
      id: 'new_dataset',
      title: 'Updated dataset',
      discriminator: 'DATA',
      groupId: 1,
    })(state);

    expect(result.data).to.eql({
      id: 'new_dataset',
      title: 'Updated dataset',
      discriminator: 'DATA',
      groupId: 1,
    });
    expect(result.response.statusCode).to.eql(200);
  });

  it('should make a get then a create if nothing is found', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/enumerator_dataset/,
        method: 'GET',
      })
      .reply(
        403,
        {},
        {
          headers: { 'content-type': 'application/json' },
        }
      );
    mock
      .intercept({
        path: /\/api\/v2\/datasets/,
        method: 'POST',
      })
      .reply(
        200,
        {
          id: 'enumerator_dataset',
          title: 'Enumerator Dataset',
          discriminator: 'ENUMERATORS',
          groupId: 1,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );
    const result = await upsertDataset('enumerator_dataset', {
      id: 'enumerator_dataset',
      title: 'Enumerator Dataset',
      discriminator: 'ENUMERATORS',
      allowOfflineUpdates: false,
    })(state);

    expect(result.data).to.eql({
      id: 'enumerator_dataset',
      title: 'Enumerator Dataset',
      discriminator: 'ENUMERATORS',
      groupId: 1,
    });
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('upsertRecords', () => {
  it('should upsert a dataset records', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/record/,
        method: 'PATCH',
        query: { recordId: '2' },
      })
      .reply(
        200,
        {
          name: 'Trial updateses',
          id: '2',
          users: 'All users',
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await upsertRecord('new_dataset', 2, {
      id: '2',
      name: 'Trial updateses',
      users: 'All users',
    })(state);
    expect(result.data).to.eql({
      name: 'Trial updateses',
      id: '2',
      users: 'All users',
    });
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('deleteDataset', () => {
  it('should delete a dataset', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset/,
        method: 'DELETE',
      })
      .reply(
        200,
        {
          success: true,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await deleteDataset('new_dataset')(state);
    expect(result.data).to.eql({
      success: true,
    });
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('deleteRecord', () => {
  it('should delete a dataset record', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/record/,
        method: 'DELETE',
        query: { recordId: '2' },
      })
      .reply(
        200,
        {
          success: true,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await deleteRecord('new_dataset', 2)(state);
    expect(result.data).to.eql({
      success: true,
    });
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('uploadCsvRecords', () => {
  it('should upload csv records', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/records\/upload/,
        method: 'POST',
      })
      .reply(
        200,
        {
          columnsAdded: 0,
          rowsAdded: 2,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await uploadCsvRecords('new_dataset', [
      {
        id: '4',
        name: 'Trial update',
        users: 'All users',
      },
      {
        id: '5',
        name: 'Trials',
        users: 'All users here',
      },
    ])(state);
    expect(result.data.rowsAdded).to.eql(2);
    expect(result.response.statusCode).to.eql(200);
  });

  it('should upload csv records with uploadMode option', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/records\/upload/,
        method: 'POST',
      })
      .reply(
        200,
        {
          columnsAdded: 0,
          rowsAdded: 0,
          rowsUpdated: 2,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await uploadCsvRecords(
      'new_dataset',
      [
        {
          id: '4',
          name: 'Trial update',
          users: 'All users',
        },
        {
          id: '5',
          name: 'Trials',
          users: 'All users here',
        },
      ],
      {
        uploadMode: 'MERGE',
        joiningField: 'id',
      }
    )(state);
    expect(result.data.rowsUpdated).to.eql(2);
    expect(result.data.rowsAdded).to.eql(0);
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('purgeDataset', () => {
  it('should delete a dataset', async () => {
    const state = {
      configuration: {
        user: 'u',
        password: 'p',
        servername: 'test',
        apiVersion: 'v2',
      },
    };

    mock
      .intercept({
        path: /\/api\/v2\/datasets\/new_dataset\/purge/,
        method: 'POST',
      })
      .reply(
        200,
        {
          success: true,
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      );

    const result = await purgeDataset('new_dataset')(state);
    expect(result.data).to.eql({
      success: true,
    });
    expect(result.response.statusCode).to.eql(200);
  });
});

describe('jsonToCSVBuffer', () => {
  it('should convert plain JSON into a buffer', async () => {
    const state = {};
    const rows = [
      {
        lastName: 'Rothfuss',
        firstName: 'Patrick',
        book: 'The Name of the Wind',
      },
      {
        lastName: 'Martin',
        firstName: 'George',
        book: 'A Game of Thrones',
      },
    ];

    const result = await jsonToCSVBuffer(rows)(state);
    expect(result.data).to.be.instanceOf(Buffer);
    expect(result.data.length).to.equal(96);
  });
});

describe('convert date', () => {
  it('should convert an ISO string', () => {
    const date = '2024-04-23T12:00:43.092Z';
    const result = convertDate(date);
    expect(result).to.eql('Apr 23, 2024 12:00:43 PM');
  });
  it('should convert Date.toString()', () => {
    const date = new Date('2024-04-23T12:00:43.092Z').toString();
    const result = convertDate(date);
    expect(result).to.eql('Apr 23, 2024 12:00:43 PM');
  });
  it('should convert a date Object', () => {
    const date = new Date('2024-04-23T12:00:43.092Z');
    const result = convertDate(date);
    expect(result).to.eql('Apr 23, 2024 12:00:43 PM');
  });
  it('should convert an epoch time', () => {
    const date = new Date('2024-04-23T12:00:43.092Z').getTime();
    const result = convertDate(date);
    expect(result).to.eql('Apr 23, 2024 12:00:43 PM');
  });
  it('should convert a unix time', () => {
    const date = Math.floor(
      new Date('2024-04-23T12:00:43.092Z').getTime() / 1000
    );
    const result = convertDate(date);
    expect(result).to.eql('Apr 23, 2024 12:00:43 PM');
  });
});

describe('date regex', () => {
  const match = [
    'Oct 13, 2015 10:53:04 AM',
    'Oct 13, 2015 10:53:04 PM',
    'Oct 01, 2015 10:53:04 PM',
    'Oct 13, 2015 10:53 PM', // regex will match this but I don't know if that's right?
    'Feb 29, 1994 01:00:04 PM',
    'Feb 29, 1994 00:00:00 AM',
    // nonsense dates will still pass the regex
    'feb 00, 3001 33:33:33 AM',
    'bob 99, 3001 99:99:99 PM',
  ];
  match.forEach(m => {
    it(`should match ${m}`, () => {
      expect(dateRegex.test(m)).to.eql(true);
    });
  });

  const fail = [
    'Oct 13, 2015 10:53:04 BC',
    'today',
    'mtuchi',
    'October 13, 2015 10:53:04 PM',
    'O 1, 2015 10:53:04 PM',
    'Oct 13, 2015 10:53:04',
    'Oct 13, 2015',
    'Oct 13 2015',
    'Oct 13, 2015 10:53:04 A',
    '10:53:04 PM',
    new Date().toISOString(),
  ];
  fail.forEach(m => {
    it(`should not match ${m}`, () => {
      expect(dateRegex.test(m)).to.eql(false);
    });
  });
});
