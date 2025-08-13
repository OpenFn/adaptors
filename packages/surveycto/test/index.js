import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { execute, request, fetchSubmissions, jsonToCSVBuffer } from '../src';
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
