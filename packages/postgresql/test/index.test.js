import { expect } from 'chai';
import { setMockClient, sql } from '../src/index.js';

describe('sql', () => {
  const initialState = {
    queries: [],
  };

  it('should throw an error if table does not exist', async () => {
    setMockClient({
      query: () => {
        throw new Error('relation "foo" does not exist');
      },
    });
    const state = { ...initialState };
    try {
      await sql(`select * from foo;`, {
        writeSql: true,
      })(state);
    } catch (error) {
      expect(error.message).to.eq('relation "foo" does not exist');
    }
  });
  it('should return a query result', async () => {
    setMockClient({
      query: () => {
        const mockResult = {
          command: 'SELECT',
          rowCount: 1,
          rows: [{ id: 1, name: 'foo' }],
        };
        return mockResult;
      },
    });
    const state = { ...initialState, data: { tableName: 'foo' } };
    const result = await sql(
      state => `select * from ${state.data.tableName};`,
      {
        writeSql: true,
      }
    )(state);
    expect(result.data).to.eql([
      {
        id: 1,
        name: 'foo',
      },
    ]);
    expect(result.queries).to.eql(['select * from foo;']);
    expect(result.references).to.eql([{ tableName: 'foo' }]);
  });
  it('should support prepared statements', async () => {
    setMockClient({
      query: () => {
        const mockResult = {
          command: 'SELECT',
          rowCount: 1,
          rows: [{ id: 1, name: 'foo' }],
        };
        return mockResult;
      },
    });
    const state = { ...initialState, data: { tableName: 'foo' } };
    const result = await sql(
      state => `select * from ${state.data.tableName};`,
      {
        writeSql: true,
        execute: true,
      }
    )(state);
    expect(result.data).to.eql([
      {
        id: 1,
        name: 'foo',
      },
    ]);
    expect(result.queries).to.eql(['select * from foo;']);
    expect(result.references).to.eql([{ tableName: 'foo' }]);
  });
});
