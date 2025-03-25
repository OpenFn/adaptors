import Adaptor from '../src';
import { enableMockClient } from '@openfn/language-common/util';
import pkg from 'chai';
const { expect } = pkg;
import nock from 'nock';
import { http } from '../src';
import { request } from '../src/Utils';

const testServer = enableMockClient('https://demo-unicare-bih.primero.org');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configuration = {
  username: 'test',
  password: 'strongpassword',
  url: 'https://demo-unicare-bih.primero.org',
};

const { execute, getCases, alterState } = Adaptor;

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

describe('http.get', () => {
  it('should GET with a query', async () => {
    testServer
      .intercept({
        path: '/api/v2/cases',
        query: { remote: true },
        method: 'GET',
      })
      .reply(
        200,
        {
          data: [{ name: 'Edwine Edgemont', sex: 'female' }],
        },
        { ...jsonHeaders }
      );
    const state = { configuration };

    const response = await http.get('cases', {
      query: { remote: true },
    })(state);

    expect(response.response.headers['content-type']).to.eql(
      'application/json'
    );
  });

  it('should make a GET request', async () => {
    testServer
      .intercept({
        path: '/api/v2/cases',
        method: 'GET',
      })
      .reply(
        200,
        {
          data: [{ name: 'Edwine Edgemont', sex: 'female' }],
        },
        { ...jsonHeaders }
      );
    const state = { configuration };

    const { data } = await http.get('cases')(state);
    expect(data.data[0].name).to.eql('Edwine Edgemont');
  });
});

describe('http.post', () => {
  it('should make a POST request', async () => {
    testServer
      .intercept({
        path: '/api/v2/cases',
        method: 'POST',
        data: {
          data: {
            name: 'Edwine Edgemont',
            sex: 'female',
          },
        },
      })
      .reply(200, { data: { enabled: true, id: '123' } }, { ...jsonHeaders });
    const state = { configuration };

    const { data } = await http.post('cases', {
      name: 'Edwine Edgemont',
      sex: 'female',
    })(state);
    expect(data.data.enabled).to.eql(true);
  });
});

describe('http.patch', () => {
  it('should make a PATCH request', async () => {
    testServer
      .intercept({
        path: '/api/v2/cases/123',
        method: 'PATCH',
        data: {
          data: {
            name: 'Edwine Edgemont',
            sex: 'female',
          },
        },
      })
      .reply(200, { data: { enabled: true, id: '123' } }, { ...jsonHeaders });
    const state = { configuration };

    const { data } = await http.patch('cases/123', {
      name: 'Edwine Edgemont',
      sex: 'female',
    })(state);
    expect(data.data.enabled).to.eql(true);
  });
});
