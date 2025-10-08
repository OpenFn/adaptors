import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';

import { request, get, post } from '../src/Adaptor.js';
import { requestWithPagination } from '../src/Utils.js';

const testServer = enableMockClient('https://test.et-mfr.com');
const state = {
  configuration: {
    baseUrl: 'https://test.et-mfr.com',
    username: 'hello',
    password: 'there',
  },
};

describe('request', () => {
  it('makes a post request to the right endpoint with options', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/api/Facility/ExportCSV',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })

      .reply(200, 'name,id\nItem 1,1');

    const finalState = await request(
      'POST',
      'Facility/ExportCSV',
      { name: 'Item 1' },
      { parseAs: 'text' }
    )(state);

    expect(finalState.data).to.eql('name,id\nItem 1,1');
    expect(finalState.data).to.be.a('string');
  });

  it('makes a post request to the right endpoint', async () => {
    // Setup a mock endpoint
    testServer
      .intercept({
        path: '/api/Facility/GetFacilities',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, [{ name: 'Item 1', id: 1 }]);

    const finalState = await request('POST', 'Facility/GetFacilities', {
      name: 'Item 1',
    })(state);

    expect(finalState.data).to.eql([{ name: 'Item 1', id: 1 }]);
    expect(finalState.data).to.be.an('array');
  });
});

describe('get', () => {
  it('makes a get request to the right endpoint', async () => {
    testServer
      .intercept({
        path: '/api/Location/Regions',
        method: 'GET',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, [
        { id: 1, isActive: true },
        { id: 2, isActive: true },
      ]);

    const finalState = await get('/Location/Regions')(state);

    expect(finalState.data).to.eql([
      { id: 1, isActive: true },
      { id: 2, isActive: true },
    ]);
    expect(finalState.data).to.have.length(2);
  });

  it('should get with a query option', async () => {
    testServer
      .intercept({
        path: '/api/Facility',
        method: 'GET',
        query: {
          id: '101',
        },
      })
      .reply(200, { name: 'Health Post', id: 101, isActive: true });

    const finalState = await get('Facility', {
      query: {
        id: '101',
      },
    })(state);

    expect(finalState.data).to.eql({
      name: 'Health Post',
      id: 101,
      isActive: true,
    });
    expect(finalState.data).to.have.property('name', 'Health Post');
    expect(finalState.data).to.have.property('id', 101);
    expect(finalState.data).to.have.property('isActive', true);
  });
});

describe('post', () => {
  const items = [...Array(200)].map((_item, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));
  it('should respect showPerPage when set', async () => {
    testServer
      .intercept({
        path: '/api/Facility/GetFacilities',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, items.slice(0, 2));

    const results = await post('Facility/GetFacilities', { showPerPage: 2 })(
      state
    );

    expect(results.data).to.eql(items.slice(0, 2));
    expect(results.data).to.have.length(2);
  });
  it('makes a post request to the right endpoint with options', async () => {
    testServer
      .intercept({
        path: '/api/Facility/ExportCSV',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })

      .reply(200, 'name,id\nItem 1,1');

    const finalState = await post(
      'Facility/ExportCSV',
      { name: 'Item 1' },
      { parseAs: 'text' }
    )(state);

    expect(finalState.data).to.eql('name,id\nItem 1,1');
    expect(finalState.data).to.be.a('string');
  });

  it('should paginate if showPerPage and is not set', async () => {
    //first call
    testServer
      .intercept({
        path: '/api/Facility/GetFacilities',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, {
        model: items.slice(0, 100),
      });
    //second call
    testServer
      .intercept({
        path: '/api/Facility/GetFacilities',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, {
        model: items.slice(100),
      });

    const finalState = await post(
      'Facility/GetFacilities',
      {},
      {
        defaultPageSize: 100,
        defaultLimit: 200,
      }
    )(state);

    expect(finalState.data).to.eql(items);
    expect(finalState.data).to.have.length(200);
  });

  it('should not paginate when other data is passed with showPerPage or perNumber', async () => {
    testServer
      .intercept({
        path: '/api/Facility/GetFacilities',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, items.slice(0, 1));

    const finalState = await post('Facility/GetFacilities', {
      name: 'Item 1',
      showPerPage: 2,
      pageNumber: 1,
    })(state);

    expect(finalState.data).to.eql(items.slice(0, 1));
    expect(finalState.data).to.have.length(1);
    expect(finalState.data[0]).to.have.property('name', 'Item 1');
  });
});

describe('requestWithPagination', () => {
  const items = [...Array(200)].map((_item, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));
  it('should respect showPerPage when set', async () => {
    testServer
      .intercept({
        path: '/api/Facility/GetFacilities',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, items.slice(0, 2));

    const results = await requestWithPagination(state, {
      resolvedPath: '/Facility/GetFacilities',
      resolvedBody: {
        showPerPage: 2,
        pageNumber: 1,
      },
    });

    expect(results).to.eql(items.slice(0, 2));
    expect(results).to.have.length(2);
  });

  it('should use default pageNumber if not set but showPerPage is set', async () => {
    let requestBody;
    testServer
      .intercept({
        path: '/api/Facility/GetFacilities',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, req => {
        requestBody = JSON.parse(req.body);

        return items.slice(0, 2);
      });

    const results = await requestWithPagination(state, {
      resolvedPath: 'Facility/GetFacilities',
      resolvedBody: {
        showPerPage: 2,
      },
    });

    expect(requestBody).to.have.property('pageNumber', 1);
    expect(results).to.eql(items.slice(0, 2));
    expect(results).to.have.length(2);
  });

  it('should not paginate when other data is passed with showPerPage or perNumber', async () => {
    testServer
      .intercept({
        path: '/api/Facility/GetFacilities',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, items.slice(0, 1));

    const results = await requestWithPagination(state, {
      resolvedPath: 'Facility/GetFacilities',
      resolvedBody: {
        showPerPage: 2,
        pageNumber: 1,
        name: 'Item 1',
      },
    });

    expect(results).to.eql(items.slice(0, 1));
    expect(results).to.have.length(1);
    expect(results[0]).to.have.property('name', 'Item 1');
  });

  it('should return response if result is not an array', async () => {
    testServer
      .intercept({
        path: '/api/Facility/ExportCSV',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, 'name,id\nItem 1,1\nItem 2,2');

    const results = await requestWithPagination(state, {
      resolvedPath: 'Facility/ExportCSV',
      resolvedBody: {
        showPerPage: 2,
        pageNumber: 1,
      },
      resolvedOptions: { parseAs: 'text' },
    });

    expect(results).to.eql('name,id\nItem 1,1\nItem 2,2');
    expect(results).to.be.a('string');
  });

  it('should paginate to fetch all results when showPerPage and pageNumber are not set', async () => {
    //first call
    testServer
      .intercept({
        path: '/api/Facility/GetFacilities',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, {
        model: items.slice(0, 100),
      });
    //second call
    testServer
      .intercept({
        path: '/api/Facility/GetFacilities',
        method: 'POST',
        headers: {
          Authorization: 'Basic aGVsbG86dGhlcmU=',
        },
      })
      .reply(200, {
        model: items.slice(100, 200),
      });

    const results = await requestWithPagination(state, {
      resolvedPath: 'Facility/GetFacilities',
      resolvedBody: {},
      resolvedOptions: {
        defaultPageSize: 100,
        defaultLimit: 200,
      },
    });

    expect(results).to.eql(items);
    expect(results).to.have.length(200);
  });
});
