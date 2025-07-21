import { expect } from 'chai';
import { execute, sql } from '../src/Adaptor';

describe.skip('execute', () => {
  it('executes each operation in sequence', done => {
    let state = {
      configuration: {},
      connection: {
        end: () => {},
        connect: () => {},
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
    let state = {
      connection: {
        connect: () => {},
        end: () => {},
      },
    };

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({});
    });
  });
});

describe('sql', () => {
  it('should log and return the query when execute is false', async () => {
    const fakeState = {
      connection: { query: () => {} },
      data: { tableName: 'users' },
    };

    const result = await sql(
      state => `SELECT Name, FROM ${state.data.tableName};`,
      { writeSql: true, execute: false }
    )(fakeState);

    expect(result.queries).to.include('SELECT Name, FROM users;');
  });
});
