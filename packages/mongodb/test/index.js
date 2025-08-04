import pkg from 'chai';
const { expect } = pkg;

import nock from 'nock';
import ClientFixtures, { fixtures } from './ClientFixtures';

import Adaptor from '../src';
const { execute, event, dataElement } = Adaptor;

describe('execute', () => {
  it.skip('executes each operation in sequence', done => {
    let state = {
      configuration: {
        username: 'hello',
        password: 'there',
        clusterHostname: 'demo.mongodb.net',
        protocol: 'mongodb+srv',
        options: { 'retryWrites': true, 'w': 'majority' }
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
