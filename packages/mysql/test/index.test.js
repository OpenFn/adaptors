import { expect } from 'chai';
import { execute, sql, setMockConnection } from '../src/Adaptor.js';

describe('sql', () => {
  it('should log and return the query when execute is false', async () => {
    setMockConnection({
      query: () => {},
      release: () => {},
    });
    const fakeState = {
      configuration: {
        host: 'localhost',
        port: 3306,
        database: 'test',
        user: 'root',
        password: 'password',
      },
      data: { tableName: 'users' },
    };

    const result = await execute(
      sql(state => `SELECT Name, FROM ${state.data.tableName};`, {
        writeSql: true,
        execute: false,
      })
    )(fakeState);

    expect(result.queries).to.include('SELECT Name, FROM users;');
  });
});
