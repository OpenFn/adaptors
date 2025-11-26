import { expect } from 'chai';
import { setMockClient, sql, findValue } from '../src/index.js';

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
      query: (...args) => {
        console.log('query called with args:', args);
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

describe('findValue', () => {
  afterEach(() => {
    setMockClient(null);
  });

  it('should return uuid value when record exists', async () => {
    setMockClient({
      query: (...qstr) => {
        expect(qstr).to.eql([
          "select id from users where first_name = 'Mamadou'",
        ]);

        return {
          command: 'SELECT',
          rowCount: 1,
          rows: [{ id: '123e4567-e89b-12d3-a456-426614174000' }],
        };
      },
    });

    const state = { references: [] };
    const result = await findValue({
      uuid: 'id',
      relation: 'users',
      where: { first_name: 'Mamadou' },
    })(state);

    expect(result.data).to.equal('123e4567-e89b-12d3-a456-426614174000');
    expect(result.result).to.equal('123e4567-e89b-12d3-a456-426614174000');
    expect(result.references).to.have.lengthOf(1);
  });

  it('should return null when no record found', async () => {
    setMockClient({
      query: (...qstr) => {
        expect(qstr).to.eql([
          "select id from users where first_name = 'NonExistent'",
        ]);
        return {
          command: 'SELECT',
          rowCount: 0,
          rows: [],
        };
      },
    });

    const state = { references: [] };
    const result = await findValue({
      uuid: 'id',
      relation: 'users',
      where: { first_name: 'NonExistent' },
    })(state);

    expect(result.data).to.be.null;
    expect(result.result).to.be.null;
  });

  it('should support custom operators', async () => {
    setMockClient({
      query: (...qstr) => {
        expect(qstr).to.eql([
          "select id from users where age > '18' and name like 'John'",
        ]);
        return {
          command: 'SELECT',
          rowCount: 1,
          rows: [{ id: 'test-id' }],
        };
      },
    });

    const state = { references: [] };
    const result = await findValue({
      uuid: 'id',
      relation: 'users',
      where: { age: 18, name: 'John' },
      operator: { age: '>', name: 'like' },
    })(state);

    expect(result.data).to.equal('test-id');
    expect(result.result).to.equal('test-id');
  });

  it('should handle multiple where conditions with AND', async () => {
    setMockClient({
      query: (...qstr) => {
        expect(qstr).to.eql([
          "select id from users where first_name = 'Mamadou' and last_name = 'Diallo' and status = 'active'",
        ]);
        return {
          command: 'SELECT',
          rowCount: 1,
          rows: [{ id: 'multi-condition-id' }],
        };
      },
    });

    const state = { references: [] };
    const result = await findValue({
      uuid: 'id',
      relation: 'users',
      where: { first_name: 'Mamadou', last_name: 'Diallo', status: 'active' },
    })(state);

    expect(result.data).to.equal('multi-condition-id');
  });

  it('should expand references from state', async () => {
    setMockClient({
      query: (...qstr) => {
        expect(qstr).to.eql([
          "select user_id from employees where name = 'Alice'",
        ]);
        return {
          command: 'SELECT',
          rowCount: 1,
          rows: [{ user_id: 'resolved-id' }],
        };
      },
    });

    const initialState = {
      references: [],
      data: {
        tableName: 'employees',
        searchName: 'Alice',
      },
    };

    const result = await findValue(state => ({
      uuid: 'user_id',
      relation: state.data.tableName,
      where: { name: state.data.searchName },
    }))(initialState);

    expect(result.data).to.equal('resolved-id');
    expect(result.result).to.equal('resolved-id');
  });

  it('should generate correct SQL without where clause if no conditions', async () => {
    setMockClient({
      query: (...qstr) => {
        expect(qstr).to.eql(['select id from users ']); //TODO: Why the space at the end is crucial?
        return {
          command: 'SELECT',
          rowCount: 1,
          rows: [{ id: 'all-records-id' }],
        };
      },
    });

    const state = { references: [] };
    const result = await findValue({
      uuid: 'id',
      relation: 'users',
      where: {},
    })(state);

    expect(result.data).to.equal('all-records-id');
  });
});
