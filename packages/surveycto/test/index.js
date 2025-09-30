import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import {
  fetchSubmissions,
  jsonToCSVBuffer,
  uploadCsvRecords,
  upsertDataset,
  upsertRecord,
  list,
} from '../src/index.js';
import { convertDate, dateRegex, requestWithPagination } from '../src/Utils.js';

const baseUrl = 'https://test.surveycto.com';
const mock = enableMockClient(baseUrl);

const state = {
  configuration: {
    user: 'u',
    password: 'p',
    servername: 'test',
    apiVersion: 'v2',
  },
};

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

describe('list', () => {
  it('should list datasets with the default limit', async () => {
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: {
          limit: 1000,
        },
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

    const result = await list('datasets')(state);

    expect(result.data.results).to.eql([
      {
        id: 'new_dataset',
        title: 'New dataset',
        discriminator: 'DATA',
        groupId: 1,
      },
    ]);
  });

  it('should list datasets with a limit', async () => {
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 1 },
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

    const result = await list('datasets', {
      limit: 1,
    })(state);
    expect(result.data.results.length).to.eql(1);
    expect(result.data.total).to.eql(1);
  });

  it('should list all records', async () => {
    mock
      .intercept({
        path: '/api/v2/datasets/new_dataset/records',
        method: 'GET',
        query: { limit: 1000 },
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

    const result = await list('datasets/new_dataset/records')(state);
    expect(result.data.results).to.eql([
      {
        recordId: '2',
        values: {
          id: '2',
          name: 'Triayuio8gtvgu7gt',
          users: 'All users',
        },
      },
    ]);
  });

  it('should list records with a limit', async () => {
    mock
      .intercept({
        path: '/api/v2/datasets/new_dataset/records',
        method: 'GET',
        query: { limit: '2' },
      })
      .reply(
        200,
        {
          total: 2,
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

    const result = await list('datasets/new_dataset/records', {
      limit: 2,
    })(state);
    expect(result.data.results.length).to.eql(2);
    expect(result.data.total).to.eql(2);
  });
});

describe('upsertDataset', () => {
  it('should make a get then update if an item is found', async () => {
    mock
      .intercept({
        path: '/api/v2/datasets/new_dataset',
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
        path: '/api/v2/datasets/new_dataset',
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
    const result = await upsertDataset({
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
    mock
      .intercept({
        path: '/api/v2/datasets/enumerator_dataset',
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
        path: '/api/v2/datasets',
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
    const result = await upsertDataset({
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
    mock
      .intercept({
        path: '/api/v2/datasets/new_dataset/record',
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

    const result = await upsertRecord('new_dataset', {
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

describe('uploadCsvRecords', () => {
  it('should upload csv records', async () => {
    mock
      .intercept({
        path: ' /api/v2/datasets/new_dataset/records/upload',
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
    let capturedBody;
    mock
      .intercept({
        path: '/api/v2/datasets/new_dataset/records/upload',
        method: 'POST',
      })
      .reply(
        200,
        function ({ body }) {
          capturedBody = body;
          return {
            columnsAdded: 0,
            rowsAdded: 0,
            rowsUpdated: 2,
          };
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
    expect(capturedBody).to.exist;
    if (typeof capturedBody.get === 'function') {
      const file = capturedBody.get('file');
      expect(file).to.exist;
      expect(file.name).to.equal('data.csv');
      expect(file.type).to.equal('text/csv');
    }
    expect(result.data.rowsUpdated).to.eql(2);
    expect(result.data.rowsAdded).to.eql(0);
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

describe('request with pagination', () => {
  const items = [...Array(2000)].map((_item, index) => ({ id: index + 1 }));

  it('should fetch all pages and combine results', async () => {
    // First page
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 1000 },
      })
      .reply(200, {
        data: items.slice(0, 1000),
        nextCursor: items[1999].id.toString(),
      });

    // Second page
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 1000, cursor: items[1999].id.toString() },
      })
      .reply(200, {
        data: items.slice(1000, 2000),
        nextCursor: null,
      });

    const result = await requestWithPagination(state, '/datasets');

    expect(result.data.results).to.eql(items);
    expect(result.data.total).to.equal(2000);
    expect(result.data.nextCursor).to.be.null;
  });
  it('should respect a user limit', async () => {
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 10 },
      })
      .reply(200, {
        data: items.slice(0, 10),
        nextCursor: items[9].id.toString(),
      });

    const result = await requestWithPagination(state, '/datasets', {
      limit: 10,
    });
    expect(result.data.results).to.eql(items.slice(0, 10));
    expect(result.data.total).to.equal(10);
    expect(result.data.nextCursor).to.eql('10');
  });

  it('should respect a user limit with pagesize', async () => {
    // first call
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 5 },
      })
      .reply(200, {
        data: items.slice(0, 5),
        nextCursor: items[4].id.toString(),
      });

    // second call
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 5, cursor: items[4].id.toString() },
      })
      .reply(200, {
        data: items.slice(5, 10),
        nextCursor: null,
      });

    const result = await requestWithPagination(state, '/datasets', {
      limit: 10,
      pageSize: 5,
    });
    expect(result.data.results).to.eql(items.slice(0, 10));
    expect(result.data.total).to.equal(10);
    expect(result.data.nextCursor).to.eql(null);
  });

  it('should respect limit where pageSize is more than limit', async () => {
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 10 },
      })
      .reply(200, {
        data: items.slice(0, 10),
        nextCursor: items[9].id.toString(),
      });

    const result = await requestWithPagination(state, '/datasets', {
      limit: 10,
      pageSize: 20,
    });
    expect(result.data.results).to.eql(items.slice(0, 10));
    expect(result.data.total).to.equal(10);
    expect(result.data.nextCursor).to.eql('10');
  });

  it('should ignore defaultLimit if limit is set', async () => {
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 50 },
      })
      .reply(200, {
        data: items.slice(0, 50),
        nextCursor: items[49].id.toString(),
      });

    const result = await requestWithPagination(state, '/datasets', {
      limit: 50,
      pageSize: 1000,
      defaultLimit: 40,
    });
    expect(result.data.results).to.eql(items.slice(0, 50));
    expect(result.data.total).to.equal(50);
    expect(result.data.nextCursor).to.eql('50');
  });

  it('should use defaultLimit if limit is not set', async () => {
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 40 },
      })
      .reply(200, {
        data: items.slice(0, 40),
        nextCursor: items[39].id.toString(),
      });

    const result = await requestWithPagination(state, '/datasets', {
      pageSize: 1000,
      defaultLimit: 40,
    });
    expect(result.data.results).to.eql(items.slice(0, 40));
    expect(result.data.total).to.equal(40);
    expect(result.data.nextCursor).to.eql('40');
  });
  it('should not allow pageSize to be more than 1000', async () => {
    // first call
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 1000 },
      })
      .reply(200, {
        data: items.slice(0, 1000),
        nextCursor: items[999].id.toString(),
      });
    // second call
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 1000, cursor: items[999].id.toString() },
      })
      .reply(200, {
        data: items.slice(1000, 2000),
        nextCursor: null,
      });

    const result = await requestWithPagination(state, '/datasets', {
      limit: 2000,
      pageSize: 2000,
    });
    expect(result.data.results).to.eql(items.slice(0, 2000));
    expect(result.data.total).to.equal(2000);
    expect(result.data.nextCursor).to.eql(null);
  });

  it('should respect pageSize if the final page is not a full page', async () => {
    // First page
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 20 },
      })
      .reply(200, {
        data: items.slice(0, 20),
        nextCursor: items[19].id.toString(),
      });

    // Second page
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 1, cursor: items[19].id.toString() },
      })
      .reply(200, {
        data: items.slice(20, 21),
        nextCursor: items[20].id.toString(),
      });

    const result = await requestWithPagination(state, '/datasets', {
      limit: 21,
      pageSize: 20,
    });

    expect(result.data.results).to.eql(items.slice(0, 21));
    expect(result.data.total).to.equal(21);
    expect(result.data.nextCursor).to.eql('21');
  });
  it('should return empty array if no data', async () => {
    mock
      .intercept({
        path: '/api/v2/datasets',
        method: 'GET',
        query: { limit: 2 },
      })
      .reply(200, {
        data: [],
        nextCursor: null,
      });

    const result = await requestWithPagination(state, '/datasets', {
      limit: 2,
    });
    expect(result.data.results).to.eql([]);
    expect(result.data.total).to.equal(0);
    expect(result.data.nextCursor).to.be.null;
  });
});
