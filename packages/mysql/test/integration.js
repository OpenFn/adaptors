import { expect } from 'chai';
import { execute, sql } from '../src/Adaptor.js';
import configuration from './tmp/creds.json' with { type: 'json' };

describe('sql', () => {
  it('should fetch data from the database', async () => {
    const state = {
      configuration,
      data: { tableName: 'users' },
    };

    const result = await execute(
      sql(state => `SELECT Name, FROM ${state.data.tableName};`)
    )(state);

    expect(result.response.body).to.deep.equal([
      { Name: 'Alice' },
      { Name: 'Bob' },
    ]);
  });
});
