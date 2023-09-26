import { expect } from 'chai';
import { execute, query } from '../src/Adaptor.js';

import pkg from 'hive-driver';
const { HiveOperation } = pkg;

describe('execute', () => {
  it.skip('executes each operation in sequence', done => {
    const state = {
      configuration: {
        host: 'localhost',
        username: 'admin',
        password: 'admin',
        port: '10000',
      },
    };
    const operations = [
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
    const state = {};

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });
});

describe.skip('query', () => {
  it('Execute SQL statement', async () => {
    const state = {
      configuration: {
        host: 'localhost',
        username: 'admin',
        password: 'admin',
        port: '10000',
      },
    };
    await query('select * from table', { runAsync: true })(state).then(
      result => {
        expect(result).instanceOf(HiveOperation);
      }
    );
  });
});
