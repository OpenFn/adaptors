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

let db = generateData('bill bailey', 10)
  .concat(generateData('fran bailey', 10))
  .concat(generateData('sarah pascoe', 10))
  .concat(generateData('richard ayoade', 1));

const get = ({ q = '', limit = 1000, startIndex = 1 }) => {
  // note that start index i is 1 based
  // offset it here to match our array
  startIndex -= 1;

  const allResults = db.filter(d => d.display.includes(q));
  const filteredResults = allResults.slice(startIndex, startIndex + limit);
  const remainingResults = allResults.slice(startIndex + limit + 1);
  return {
    results: filteredResults,
    next: remainingResults.length && {
      limit: limit,
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
  it('should get all matching items if no limit', async () => {
    const response = await testServer.request({
      method: 'GET',
      path: '/ws/rest/v1/patient',
      query: {
        q: 'bill',
      },
    });
    expect(response.statusCode).to.equal(200);
    const { results: body } = await response.body.json();

    expect(body.length).to.equal(10);
    expect(body.every(item => item.uuid.includes('bill'))).to.equal(true);
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
    expect(response.body.results.length).to.eql(31);
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

  it('should get all items', async () => {
    const totalNumberOfBills = get({ q: 'bill' }).results.length;

    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      query: { q: 'bill' },
    });
    expect(data.length).to.eql(totalNumberOfBills);
    expect(data[0].display).to.eql('bill bailey 1');
  });

  it('should get some items', async () => {
    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      query: { q: 'bill' },
      limit: 5,
    });

    expect(data.length).to.eql(5);
    expect(data[0].display).to.eql('bill bailey 1');
  });

  it('should not return more items than exist', async () => {
    const totalNumberOfBills = get({ q: 'bill' }).results.length;
    const data = await requestWithPagination(state, '/ws/rest/v1/patient', {
      query: { q: 'bill' },
      limit: 20,
    });

    expect(data.length).to.eql(totalNumberOfBills);
    expect(data[0].display).to.eql('bill bailey 1');
  });

  it('should get all with a page size', async () => {
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
      limit: 5,
      _onrequest: r => {
        requests.push(r);
      },
    });

    expect(requests.length).to.eql(3);
    expect(data.length).to.eql(5);
  });
});
