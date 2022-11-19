import { expect } from 'chai';

import nock from 'nock';
import { fixtures } from './ClientFixtures';

import { execute /*, get*/ } from '../src';

describe.skip('execute', () => {
  // TODO: determine how to get CI to test against a local DB.
  before(() => {
    nock('some-host-url.compute-1.amazonaws.com')
      .persist()
      .get('/api/fake')
      .reply(200, {
        httpStatus: 'OK',
        message: 'the response',
      });
  });
  it('executes each operation in sequence', done => {
    let state = {
      configuration: {
        host: 'some-host-url.compute-1.amazonaws.com',
        port: '5432',
        database: 'wouldntyouliketoknow',
        user: 'me',
        password: 'noway',
        ssl: true,
      },
    };
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
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});

describe.skip('get', () => {
  before(() => {
    nock('https://play.http.org')
      .get('/demo/api/events')
      .reply(200, { foo: 'bar' });
  });

  it('calls the callback', () => {
    let state = {
      configuration: {
        username: 'hello',
        password: 'there',
        host: 'https://play.http.org/demo',
      },
    };

    return execute(
      get('api/events', {
        callback: (response, state) => {
          return { ...state, references: [response] };
        },
        username: null,
      })
    )(state).then(state => {
      let lastReference = state.references[0];

      // Check that the eventData made it's way to the request as a string.
      expect(lastReference).to.eql({ foo: 'bar' });
    });
  });
});
