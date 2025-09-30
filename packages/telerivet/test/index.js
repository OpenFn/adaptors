import pkg from 'chai';
const { expect } = pkg;

import Adaptor from '../src/index.js';
const { execute, event } = Adaptor;

import request from 'superagent';
import superagentMock from 'superagent-mock';
import ClientFixtures, { fixtures } from './ClientFixtures.js';

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
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});

describe('event', () => {
  let mockRequest;

  before(() => {
    mockRequest = superagentMock(request, ClientFixtures);
  });

  it.skip('posts to API and returns state', () => {
    let state = {
      configuration: {
        username: 'hello',
        password: 'there',
        apiUrl: 'https://play.telerivet.org/demo',
      },
    };

    return execute(event(fixtures.event.requestBody))(state).then(state => {
      let lastReference = state.references[0];

      // Check that the eventData made it's way to the request as a string.
      expect(lastReference.params).to.eql(
        JSON.stringify(fixtures.event.requestBody)
      );
    });
  });

  after(() => {
    mockRequest.unset();
  });
});
