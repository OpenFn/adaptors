import { expect } from 'chai';

import nock from 'nock';
import ClientFixtures, { fixtures } from './ClientFixtures';

import Adaptor from '../src';
const { execute, postData } = Adaptor;

describe('execute', () => {
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

  it('assigns references, data to the initialState', () => {
    let state = {};

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe('post', () => {
  before(() => {
    nock('https://fake.server.com').post('/api').reply(200, { foo: 'bar' });
  });

  it('calls the callback', () => {
    let state = {
      configuration: {
        username: 'hello',
        password: 'there',
      },
    };

    return execute(
      postData({
        url: 'https://fake.server.com/api',
        headers: null,
        body: { a: 1 },
      })
    )(state).then(state => {
      console.log(state);
      let status = state.data.status;
      let responseBody = state.data.data;
      // Check that the post made it's way to the request as a string.
      expect(status).to.eq(200);
      expect(responseBody).to.eql({ foo: 'bar' });
    });
  });
});
