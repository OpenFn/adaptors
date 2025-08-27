import { expect } from 'chai';
import { afterEach } from 'mocha';

import { enableMockClient } from '@openfn/language-common/util';
import testData from './fixtures.json' assert { type: 'json' };
import { request, requestWithPagination } from '../src/Utils';

const testServer = enableMockClient('https://util-tests.openmrs.org');

const configuration = {
  username: 'test',
  password: 'strongpassword',
  instanceUrl: 'https://util-tests.openmrs.org',
};

const state = {
  configuration,
  patient: testData.patient,
  encounter: testData.encounter,
};

const generateData = (name, count) => {
  const [first] = name.split(' ');
  return new Array(count).fill({}).map((_d, idx) => ({
    uuid: `${first}-${idx + 1}`,
    display: `${name} ${idx + 1}`,
  }));
};

const MOCK_DEFAULT_LIMIT = 10;

const assertNoDuplicates = arr => {
  const ids = {};
  arr.forEach(d => {
    expect(ids[d.uuid]).to.be.undefined;
    ids[d.uuid] = true;
  });
};

// Note: tests assume all records have an "a" in them!
let db = generateData('bill bailey', 10)
  .concat(generateData('fran bailey', 10))
  .concat(generateData('sarah pascoe', 10))
  .concat(generateData('richard ayoade', 1));

// default server limit is 10
const get = ({ q = '', limit = MOCK_DEFAULT_LIMIT, startIndex = 1 }) => {
  // note that start index i is 1 based
  // offset it here to match our array
  startIndex -= 1;

  const allResults = db.filter(d => d.display.includes(q));
  const filteredResults = allResults.slice(startIndex, startIndex + limit);
  const remainingResults = allResults.slice(startIndex + limit);
  return {
    results: filteredResults,
    next: remainingResults.length && {
      max: limit,
      start: startIndex + limit,
    },
  };
};

// Set up a permanent mock server on /patient with a range of data
testServer
  .intercept({
    path: /\/ws\/rest\/v1\/patient/,
    method: 'GET',
  })
  .reply(args => {
    const data = {};
    const id = args.path.split('/patient/')[1];
    let statusCode = 200;

    if (id) {
      // If only one item, return it verbatim
      const match = db.find(d => d.uuid === id);
      // confirm the structure
      if (match) {
        Object.assign(data, match);
      } else {
        statusCode = 404;
        data.result = {};
      }
    } else {
      const { results, next } = get(args.query);

      const links = [];
      if (next) {
        links.push({
          rel: 'next',
          uri: '<ommitted>', // no need to include the full URI
        });
      }
      data.results = results;
      data.links = links;
    }

    return {
      statusCode,
      data,
      responseOptions: {
        headers: {
          'content-type': 'application/json',
        },
      },
    };
  })
  .persist();

describe('mock server', () => {
  it('should get a patient by id', async () => {
    const response = await testServer.request({
      method: 'GET',
      path: '/ws/rest/v1/patient/bill-1',
    });
    expect(response.statusCode).to.equal(200);

    const result = await response.body.json();

    expect(result).to.eql({ uuid: 'bill-1', display: 'bill bailey 1' });
  });

  it("should return 404 for a patient that doesn't exist", async () => {
    const response = await testServer.request({
      method: 'GET',
      path: '/ws/rest/v1/patient/romesh-1',
    });
    expect(response.statusCode).to.equal(404);
  });

  it('should get all matching items within default limit', async () => {
    const response = await testServer.request({
      method: 'GET',
      path: '/ws/rest/v1/patient',
      query: {
        q: 'a',
      },
    });
    expect(response.statusCode).to.equal(200);
    const { results: body } = await response.body.json();

    expect(body.length).to.equal(MOCK_DEFAULT_LIMIT);
    expect(body.every(item => item.display.includes('a'))).to.equal(true);
  });

  it('should get matching items with custom limit', async () => {
    const response = await testServer.request({
      method: 'GET',
      path: '/ws/rest/v1/patient',
      query: {
        q: 'a',
        limit: 100,
      },
    });
    expect(response.statusCode).to.equal(200);
    const { results: body } = await response.body.json();

    expect(body.length).to.equal(db.length);
    expect(body.every(item => item.display.includes('a'))).to.equal(true);
  });

  it('should get all matching items #2', async () => {
    const response = await testServer.request({
      method: 'GET',
      path: '/ws/rest/v1/patient',
      query: {
        q: 'ayoade',
      },
    });
    expect(response.statusCode).to.equal(200);
    const { results: body } = await response.body.json();
    expect(body.length).to.equal(1);
    expect(body[0].uuid).to.equal('richard-1');
  });

  it('should get 1 matching item with limit', async () => {
    const response = await testServer.request({
      method: 'GET',
      path: '/ws/rest/v1/patient',
      query: {
        q: 'bill',
        limit: 1,
      },
    });
    expect(response.statusCode).to.equal(200);
    const { results: body, links } = await response.body.json();
    expect(body.length).to.equal(1);
    expect(body[0].uuid).to.equal('bill-1');
    expect(links.length).to.equal(1);
  });

  it('should get 3 matching items with limit', async () => {
    const response = await testServer.request({
      method: 'GET',
      path: '/ws/rest/v1/patient',
      query: {
        q: 'bill',
        limit: 3,
      },
    });
    expect(response.statusCode).to.equal(200);
    const { results: body } = await response.body.json();
    expect(body.length).to.equal(3);
    expect(body[0].uuid).to.equal('bill-1');
    expect(body[1].uuid).to.equal('bill-2');
    expect(body[2].uuid).to.equal('bill-3');
  });

  it('should get all items one at a time', async () => {
    let lastBody;
    const items = [];
    let startIndex = 1;
    do {
      const response = await testServer.request({
        method: 'GET',
        path: '/ws/rest/v1/patient',
        query: {
          q: 'a',
          limit: 1,
          startIndex,
        },
      });
      lastBody = await response.body.json();
      expect(response.statusCode).to.equal(200);
      items.push(...lastBody.results);
      startIndex += 1;
    } while (lastBody.links.length);

    expect(items.length).to.equal(db.length);
    assertNoDuplicates(items);
  });

  it('should get all matching items from startIndex', async () => {
    const response = await testServer.request({
      method: 'GET',
      path: '/ws/rest/v1/patient',
      query: {
        q: 'bailey',
        startIndex: 11,
      },
    });
    expect(response.statusCode).to.equal(200);
    const { results: body } = await response.body.json();
    expect(body.length).to.equal(10);
    expect(body.every(item => item.uuid.includes('fran'))).to.equal(true);
  });

  it('should get a fixed page (start index + limit)', async () => {
    const response = await testServer.request({
      method: 'GET',
      path: '/ws/rest/v1/patient',
      query: {
        q: 'bailey',
        limit: 2,
        startIndex: 10,
      },
    });
    expect(response.statusCode).to.equal(200);
    const { results: body } = await response.body.json();
    expect(body.length).to.equal(2);
    expect(body[0].uuid).to.equal('bill-10');
    expect(body[1].uuid).to.equal('fran-1');
  });
});

describe('request()', () => {
  it('should throw if no baseUrl provided', async () => {
    let err;
    try {
      await request({}, 'GET', '/ws/rest/v1/patient');
    } catch (e) {
      err = e;
    }

    expect(err.message).to.match(/INVALID_CREDENTIALS/);
  });

  it('should GET with no query parameters', async () => {
    // This will actually give a 400 from real openmrs, but it's fine
    const response = await request(state, 'GET', '/ws/rest/v1/patient');

    expect(response.statusCode).to.eql(200);
    expect(response.url).to.match(/\/patient$/);

    // We don't really care about the result data here
    // It should just return within the default limit
    expect(response.body.results.length).to.eql(MOCK_DEFAULT_LIMIT);
  });

  it('should GET with a query', async () => {
    const response = await request(state, 'GET', '/ws/rest/v1/patient', {
      query: { q: 'bill' },
    });

    expect(response.statusCode).to.eql(200);
    expect(response.url).to.match(/\?q=bill$/);
    expect(response.body.results.length).to.eql(10);
    expect(response.body.results[0].display).to.eql('bill bailey 1');
  });

  it('should GET with a query and limit', async () => {
    const response = await request(state, 'GET', '/ws/rest/v1/patient', {
      query: { q: 'bill', limit: 1 },
    });

    expect(response.statusCode).to.eql(200);
    expect(response.url).to.match(/\?q=bill&limit=1$/);
    expect(response.body.results.length).to.eql(1);
    expect(response.body.results[0].display).to.eql('bill bailey 1');

    // Should include a next link
    expect(response.body.links.length).to.eql(1);
    expect(response.body.links[0].rel).to.eql('next');
  });

  it('should GET with a query and startIndex', async () => {
    const response = await request(state, 'GET', '/ws/rest/v1/patient', {
      query: { q: 'bill', startIndex: 10 },
    });

    expect(response.statusCode).to.eql(200);
    expect(response.url).to.match(/\?q=bill&startIndex=10$/);
    expect(response.body.results.length).to.eql(1);
    expect(response.body.results[0].display).to.eql('bill bailey 10');

    // Should not include a next link
    expect(response.body.links.length).to.eql(0);
  });

  it('should include Accept-Language header when language option is provided', async () => {
    const requests = [];
    const response = await request(state, 'GET', '/ws/rest/v1/patient', {
      query: { q: 'bill' },
      language: 'fr-FR',
      _onrequest: r => {
        requests.push(r);
      },
    });

    expect(response.statusCode).to.eql(200);
    expect(requests.length).to.eql(1);

    const requestInfo = requests[0];
    expect(requestInfo.headers).to.include({
      'Accept-Language': 'fr-FR',
    });
  });

  it('should not include Accept-Language header when language option is not provided', async () => {
    const requests = [];
    const response = await request(state, 'GET', '/ws/rest/v1/patient', {
      query: { q: 'bill' },
      _onrequest: r => {
        requests.push(r);
      },
    });

    expect(response.statusCode).to.eql(200);
    expect(requests.length).to.eql(1);

    const requestInfo = requests[0];
    expect(requestInfo.headers).to.not.have.property('Accept-Language');
  });

  it('should preserve existing headers when adding Accept-Language', async () => {
    const requests = [];
    const response = await request(state, 'GET', '/ws/rest/v1/patient', {
      query: { q: 'bill' },
      language: 'de-DE',
      headers: {
        'X-Custom-Header': 'custom-value',
        'content-type': 'application/json',
      },
      _onrequest: r => {
        requests.push(r);
      },
    });

    expect(response.statusCode).to.eql(200);
    expect(requests.length).to.eql(1);

    const requestInfo = requests[0];
    expect(requestInfo.headers).to.include({
      'Accept-Language': 'de-DE',
      'X-Custom-Header': 'custom-value',
      'content-type': 'application/json',
    });
  });
});

describe('requestWithPagination', () => {
  it('should get a single item', async () => {
    const data = await requestWithPagination(
      state,
      '/ws/rest/v1/patient/bill-1',
      {}
    );
    expect(data.length).to.equal(1);
    expect(data[0]).to.eql({ uuid: 'bill-1', display: 'bill bailey 1' });
  });

  it('should get all matching items by default', async () => {
    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      query: { q: 'a' },
    });

    assertNoDuplicates(data);

    expect(data.length).to.eql(db.length);
  });

  it('should not download extra pages if limit is set', async () => {
    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      query: { q: 'a' },
      limit: 20,
    });

    expect(data.length).to.eql(20);
  });

  it('should get some items with max', async () => {
    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      query: { q: 'bill' },
      max: 5,
    });

    expect(data.length).to.eql(5);
    expect(data[0].display).to.eql('bill bailey 1');
  });

  it('should not return more items than exist', async () => {
    const totalNumberOfBills = get({ q: 'bill' }).results.length;
    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      query: { q: 'bill' },
      max: 20,
    });

    expect(data.length).to.eql(totalNumberOfBills);
    expect(data[0].display).to.eql('bill bailey 1');
  });

  it('should get all with multiple pages and a page size', async () => {
    const totalNumberOfBills = get({ q: 'bill' }).results.length;

    const requests = [];

    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      query: { q: 'bill' },
      pageSize: 2,
      _onrequest: r => {
        requests.push(r);
      },
    });

    expect(requests.length).to.eql(5);
    expect(data.length).to.eql(totalNumberOfBills);
    expect(data[0].display).to.eql('bill bailey 1');
  });

  it('should get some with a page size', async () => {
    const requests = [];
    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      query: { q: 'bill' },
      pageSize: 2,
      max: 5,
      _onrequest: r => {
        requests.push(r);
      },
    });

    expect(requests.length).to.eql(3);
    expect(data.length).to.eql(5);
  });

  it('should warn if the default max limit is hit', async () => {
    const oldDb = db;
    const warn = console.warn;

    // Note that there are more than the default max number of items
    db = new Array(1e4 + 100).fill(1).map((i, uuid) => ({
      uuid,
      display: 'a',
    }));

    const logs = [];
    console.warn = msg => {
      logs.push(msg);
    };

    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      q: 'a',
      // important to use default max
      pageSize: 5e3,
    });

    expect(data.length).to.equal(1e4);

    expect(logs.length).to.equal(1);
    expect(logs[0]).to.match(
      /default maximum number of items has been reached/i
    );

    // Restore the database for the next test
    db = oldDb;
    console.warn = warn;
  });

  it('should not warn if the a custom max limit is hit', async () => {
    const oldDb = db;
    const warn = console.warn;

    // Note that there are more than the default max number of items
    db = new Array(1e4 + 100).fill(1).map((i, uuid) => ({
      uuid,
      display: 'a',
    }));

    const logs = [];
    console.warn = msg => {
      logs.push(msg);
    };

    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      q: 'a',
      // important to use default max
      pageSize: 5e3,
      max: 1e4,
    });

    expect(data.length).to.equal(1e4);

    expect(logs.length).to.equal(0);

    // Restore the database for the next test
    db = oldDb;
    console.warn = warn;
  });
});
