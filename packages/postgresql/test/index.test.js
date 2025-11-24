import { expect } from 'chai';
import { setMockClient, sql } from '../src/index.js';

describe('sql', () => {
  const mockQueryResult = {
    command: 'SELECT',
    rowCount: 1,
    rows: [{ id: 1, name: 'foo' }],
  };

  afterEach(() => {
    setMockClient(null);
  });

  it('should throw an error if table does not exist', async () => {
    setMockClient({
      query: () => {
        throw new Error('relation "foo" does not exist');
      },
    });
    const state = { queries: [] };
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
        return mockQueryResult;
      },
    });
    const state = { queries: [], data: { tableName: 'foo' } };
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
    expect(result.queries[0]).to.eql('select * from foo;');
    expect(result.references.at(-1)).to.eql({ tableName: 'foo' });
  });
  it('should support prepared statements', async () => {
    setMockClient({
      query: () => {
        return mockQueryResult;
      },
    });
    const state = { queries: [], data: { name: 'tuchi wick' } };
    const result = await sql(
      {
        text: 'insert into users(name) values ($1);',
        values: [state.data.name],
      },
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

    expect(result.queries[0].text).to.eql(
      'insert into users(name) values ($1);'
    );
    expect(result.queries[0].values).to.eql(['tuchi wick']);
    expect(result.references.at(-1)).to.eql({ name: 'tuchi wick' });
  });
});
