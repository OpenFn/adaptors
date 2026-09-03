import Adaptor from '../src/index.js';
import pkg from 'chai';
const { expect } = pkg;
import nock from 'nock';
import { enableMockClient } from '@openfn/language-common/util';
import { getNextPageParams } from '../src/Utils.js';

const { execute, getCases, alterState, get } = Adaptor;

const baseUrl = 'https://primero.example.com';
const testServer = enableMockClient(baseUrl);

const configuration = {
  url: baseUrl,
  user: 'admin',
  password: 'secret',
};

const baseState = {
  configuration,
  data: {},
  references: [],
};

const makePage = (items, page, total, per) => ({
  data: items,
  metadata: { total, per, page },
});

describe.skip('The execute() function', () => {
  it('executes each operation in sequence', done => {
    let state = {};
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', done => {
    let state = {};

    let finalState = execute()(state);

    execute()(state)
      .then(finalState => {
        expect(finalState).to.eql({
          references: [],
          data: null,
        });
      })
      .then(done)
      .catch(done);
  });
});

describe.skip('The getCases() function', () => {
  before(() => {
    nock('https://www.example.com').persist().get('/api/cases').reply(200, {
      httpStatus: 'OK',
      message: 'the response',
    });
    nock('https://www.example.com').persist().post('/api/login').reply(200, {
      httpStatus: 'OK',
      message: 'the response',
    });
  });

  it('prepares nextState properly', () => {
    let state = {
      configuration: {
        user: 'hello',
        password: 'there',
        url: 'https://www.example.com',
      },
      data: {
        triggering: 'event',
      },
    };

    return execute(
      alterState(state => {
        state.counter = 1;
        return state;
      }),
      getCases({}),
      alterState(state => {
        state.counter = 2;
        return state;
      })
    )(state).then(nextState => {
      const { data, references, counter } = nextState;
      expect(data).to.eql({ httpStatus: 'OK', message: 'the response' });
      expect(references).to.eql([{ triggering: 'event' }]);
      expect(counter).to.eql(2);
      console.log(nextState);
    });
  });
});

describe('getNextPageParams', () => {
  it('returns null when metadata is missing', () => {
    expect(getNextPageParams(null)).to.be.null;
    expect(getNextPageParams(undefined)).to.be.null;
  });

  it('returns null when total or page is missing', () => {
    expect(getNextPageParams({})).to.be.null;
    expect(getNextPageParams({ total: 10 })).to.be.null;
    expect(getNextPageParams({ page: 1 })).to.be.null;
  });

  it('returns null when all records fit on the first page', () => {
    expect(getNextPageParams({ total: 5, per: 1000, page: 1 })).to.be.null;
  });

  it('returns next page params when more pages exist', () => {
    const result = getNextPageParams({ total: 2500, per: 1000, page: 1 });
    expect(result).to.eql({ page: 2, per: 1000 });
  });

  it('respects the page size reported in metadata', () => {
    const result = getNextPageParams({ total: 25, per: 10, page: 1 });
    expect(result).to.eql({ page: 2, per: 10 });
  });

  it('returns null on the last page', () => {
    expect(getNextPageParams({ total: 2500, per: 1000, page: 3 })).to.be.null;
  });
});

describe('get', () => {
  it('paginates automatically until all records are fetched', async () => {
    const items1 = [{ id: '1' }, { id: '2' }];
    const items2 = [{ id: '3' }];

    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, makePage(items1, 1, 1003, 1000));
    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, makePage(items2, 2, 1003, 1000));

    const finalState = await get('cases')(baseState);

    expect(finalState.data).to.eql([...items1, ...items2]);
  });

  it('uses per as the page size and paginates through all pages', async () => {
    const items1 = [{ id: '1' }, { id: '2' }];
    const items2 = [{ id: '3' }, { id: '4' }];

    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, makePage(items1, 1, 4, 2));
    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, makePage(items2, 2, 4, 2));

    const finalState = await get('cases', { per: 2 })(baseState);

    expect(finalState.data).to.eql([...items1, ...items2]);
  });

  it('stops once the limit is reached and does not send it to the API', async () => {
    const items1 = [{ id: '1' }, { id: '2' }];

    testServer
      .intercept({
        path: /\/api\/v2\/cases/,
        method: 'GET',
      })
      .reply(200, req => {
        expect(req.path).to.not.include('limit');
        return makePage(items1, 1, 100, 2);
      });

    const finalState = await get('cases', { per: 2, limit: 1 })(baseState);

    expect(finalState.data).to.eql([{ id: '1' }]);
  });

  it('returns a single item when fetching by id', async () => {
    const item = { id: '123a', name: 'Edwine' };

    testServer
      .intercept({ path: /\/api\/v2\/cases\/123a/, method: 'GET' })
      .reply(200, { data: item });

    const finalState = await get('cases/123a')(baseState);

    expect(finalState.data).to.eql(item);
  });

  it('does not paginate when fetching a single item by id', async () => {
    const item = { id: '123a', name: 'Edwine' };


    testServer
      .intercept({ path: /\/api\/v2\/cases\/123a/, method: 'GET' })
      .reply(200, { data: item });

    const finalState = await get('cases/123a', { per: 2 })(baseState);

    expect(finalState.data).to.eql(item);
  });

  it('returns exactly limit items when limit is smaller than a full page span', async () => {
    const page1 = [1, 2, 3, 4, 5].map(id => ({ id: `${id}` }));
    const page2 = [6, 7, 8, 9, 10].map(id => ({ id: `${id}` }));

    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, makePage(page1, 1, 20, 5));
    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, makePage(page2, 2, 20, 5));

    const finalState = await get('cases', { per: 5, limit: 6 })(baseState);

    expect(finalState.data).to.eql([...page1, { id: '6' }]);
    expect(finalState.data).to.have.length(6);
  });

  it('caps per to limit when limit is smaller than per', async () => {
    const page1 = [1, 2, 3].map(id => ({ id: `${id}` }));

    let sentQuery;
    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, req => {
        sentQuery = req.query;
        return makePage(page1, 1, 20, 3);
      });

    const finalState = await get('cases', { per: 5, limit: 3 })(baseState);

    expect(sentQuery.per).to.eql(3);
    expect(finalState.data).to.eql(page1);
  });

  it('shrinks per on the final page but keeps the page number from metadata', async () => {
    const page1 = [1, 2, 3, 4, 5].map(id => ({ id: `${id}` }));
    const page2 = [6, 7, 8, 9, 10].map(id => ({ id: `${id}` }));
    const page3 = [11, 12].map(id => ({ id: `${id}` }));

    const sentQueries = [];
    const record = body => req => {
      sentQueries.push(req.query);
      return body;
    };

    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, record(makePage(page1, 1, 20, 5)));
    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, record(makePage(page2, 2, 20, 5)));
    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, record(makePage(page3, 3, 20, 2)));

    const finalState = await get('cases', { per: 5, limit: 12 })(baseState);

    expect(finalState.data).to.eql([...page1, ...page2, ...page3]);
    expect(finalState.data).to.have.length(12);
    expect(sentQueries[2]).to.include({ page: 3, per: 2 });
  });

  it('shrinks per to the remaining count on the final page regardless of alignment', async () => {
    const page1 = [1, 2, 3, 4, 5].map(id => ({ id: `${id}` }));
    const page2 = [6, 7, 8, 9, 10].map(id => ({ id: `${id}` }));
    const page3 = [11, 12, 13].map(id => ({ id: `${id}` }));

    const sentQueries = [];
    const record = body => req => {
      sentQueries.push(req.query);
      return body;
    };

    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, record(makePage(page1, 1, 20, 5)));
    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, record(makePage(page2, 2, 20, 5)));
    testServer
      .intercept({ path: /\/api\/v2\/cases/, method: 'GET' })
      .reply(200, record(makePage(page3, 3, 20, 3)));

    const finalState = await get('cases', { per: 5, limit: 13 })(baseState);

    expect(finalState.data).to.have.length(13);
    expect(finalState.data).to.eql([...page1, ...page2, ...page3]);
    expect(sentQueries[2]).to.include({ page: 3, per: 3 });
  });
});
