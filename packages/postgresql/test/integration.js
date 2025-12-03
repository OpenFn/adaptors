import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  execute,
  sql,
  util,
  fn,
  findValue,
  insert,
  insertMany,
  upsert,
  upsertIf,
  upsertMany,
  describeTable,
  insertTable,
  modifyTable,
} from '../src/index.js';
import configuration from '../tmp/creds.json' with { type: 'json' };

describe('sql', () => {
  it('should throw an error if table does not exist', async () => {
    const state = { configuration, data: { tableName: 'foo' } };
    try {
      await execute(
        sql(state => `select * from ${state.data.tableName};`, {
          writeSql: true,
        })
      )(state);
    } catch (error) {
      expect(error.code).to.eq('42P01');
      expect(error.message).to.eq('relation "foo" does not exist');
    }
  });

  it('should return a query result', async () => {
    const state = { configuration, data: { tableName: 'issues' } };
    const result = await execute(
      sql(state => `select * from ${state.data.tableName} limit 1;`, {
        writeSql: true,
      })
    )(state);

    expect(result.data.length).to.eql(13);
    expect(result.queries.length).to.eql(1);
    expect(result.queries[0]).to.eql(`select * from issues limit 1;`);
  }).timeout(1e5);

  it('should support prepared statements', async () => {
    const sku = Math.random().toString(36).substring(2);
    const state = { configuration, data: { name: 'test', sku, price: 100.0 } };
    const result = await execute(
      sql(
        {
          text: `insert into products (name, sku, price) values ($1, $2, $3);`,
          values: [state.data.name, state.data.sku, state.data.price],
        },
        {
          writeSql: true,
        }
      )
    )(state);

    expect(result.data).to.eql([]);
    expect(result.queries.length).to.eql(1);
    expect(result.queries[0].text).to.eql(
      `insert into products (name, sku, price) values ($1, $2, $3);`
    );
    expect(result.queries[0].values).to.eql(['test', sku, 100]);
  });
});

describe('util.format', () => {
  it('should safely escape table names', async () => {
    const state = {
      configuration,
      data: { userInput: 'users; DROP TABLE users; --' },
    };

    try {
      await execute(
        fn(state => {
          state.queryString = util.format(
            'select * from %I',
            state.data.userInput
          );
          return state;
        }),
        sql(state => state.queryString)
      )(state);
    } catch (error) {
      expect(error.code).to.eq('42P01');
      expect(error.message).to.eq(
        'relation "users; DROP TABLE users; --" does not exist'
      );
    }
  });
});

describe('findValue', () => {
  it('should find a value ', async () => {
    const state = { configuration, references: [] };

    const result = await execute(
      findValue({
        uuid: 'name',
        relation: 'products',
        where: { id: 3 },
      })
    )(state);
    expect(result.data).to.eq('test');
  });
  it('should throw error if unexpected query is executed', async () => {
    const state = { configuration, references: [] };

    await execute(
      findValue({
        uuid: 'id',
        relation: 'wrong_table', // Wrong table!
        where: { name: 'test' },
      })
    )(state).catch(error => {
      expect(error.code).to.eq('42P01');
      expect(error.message).to.include('relation "wrong_table" does not exist');
    });
  });
});

describe('insert', () => {
  it('should insert a record to a table', async () => {
    const sku = Math.random().toString(36).substring(2);
    const state = {
      configuration,
      data: { name: 'Blue Birkin', sku, price: 4000.0 },
    };
    const result = await execute(
      insert(
        'products',
        state => ({
          name: state.data.name,
          sku: state.data.sku,
          price: state.data.price,
        }),
        {
          writeSql: true,
          logValues: true,
        }
      )
    )(state);

    expect(result.data).to.eql([]);
    expect(result.queries.length).to.eql(1);
    expect(result.queries[0]).to.eql(
      `INSERT INTO products (name, price, sku) VALUES ('Blue Birkin','4000','${sku}');`
    );
  });
});

describe('insertMany', () => {
  it('should insert multiple records to a table', async () => {
    const sku = Math.random().toString(36).substring(2);
    const state = {
      configuration,
      data: [{ name: 'Red Birkin', sku, price: 5000.0 }],
    };
    const result = await execute(
      insertMany('products', state => state.data, {
        writeSql: true,
      })
    )(state);

    expect(result.data).to.eql([]);
    expect(result.queries.length).to.eql(1);
    expect(result.queries[0]).to.eql(
      `INSERT INTO products (name, sku, price) VALUES ('Red Birkin', '${sku}', '5000');`
    );
  });
});

describe('upsert', () => {
  it('should upsert a row', async () => {
    const state = {
      configuration,
      data: {
        name: 'Elodie',
        sku: '123',
        price: 2500.0,
      },
    };
    const result = await execute(
      upsert('products', 'sku', state => ({
        name: state.data.name,
        sku: state.data.sku,
        price: state.data.price,
      }))
    )(state);

    expect(result.data).to.eql([]);
  });
});

describe('upsertIf', () => {
  it('should upsert a row conditionally', async () => {
    const state = {
      configuration,
      data: {
        name: 'Elodie',
        sku: '123',
        price: 3000.0,
      },
    };
    const result = await execute(
      upsertIf(
        state => state.data.sku,
        'products',
        'sku',
        state => ({
          name: state.data.name,
          sku: state.data.sku,
          price: state.data.price,
        })
      )
    )(state);

    expect(result.data).to.eql([]);
  });
});

describe('upsertMany', () => {
  it('should upsert multiple rows', async () => {
    const state = {
      configuration,
      data: [
        { name: 'Red Birkin', sku: '123', price: 5000.0 },
        { name: 'Blue Birkin', sku: '456', price: 4000.0 },
      ],
    };

    const result = await execute(
      upsertMany('products', 'sku', state => state.data, {
        writeSql: true,
      })
    )(state);

    expect(result.data).to.eql([]);
    expect(result.result.rowCount).to.eql(2);
    expect(result.queries.length).to.eql(1);
    expect(result.queries[0]).to.eql(
      "INSERT INTO products (name, sku, price) VALUES ('Red Birkin', '123', '5000'), ('Blue Birkin', '456', '4000')\n" +
        '        ON CONFLICT (sku)\n' +
        '        DO UPDATE SET name=excluded.name, sku=excluded.sku, price=excluded.price;'
    );
  });
});

describe('describeTable', () => {
  it('should describe a table', async () => {
    const state = { configuration, data: { tableName: 'products' } };
    const result = await execute(
      describeTable(state.data.tableName, { writeSql: true })
    )(state);

    expect(result.result.rowCount).to.eql(1);
    expect(result.data.length).to.eql(5);
    expect(result.data[0]).to.eql({
      column_name: 'id',
      udt_name: 'int4',
      is_nullable: 'NO',
    });
    expect(result.queries.length).to.eql(1);
    expect(result.queries[0]).to.eql(
      'SELECT column_name, udt_name, is_nullable\n' +
        '        FROM information_schema.columns\n' +
        "        WHERE table_name='products';"
    );
  });
});

describe('insertTable', () => {
  it('should insert a table', async () => {
    const state = {
      configuration,
      data: [
        {
          name: 'summmary',
          type: 'text',
          required: true,
          unique: false,
          identity: false,
        },
        {
          name: 'sku',
          type: 'varchar',
          required: true,
          unique: false,
          identity: false,
        },
        {
          name: 'price',
          type: 'numeric',
          required: true,
          unique: false,
          identity: false,
        },
      ],
    };

    const result = await execute(
      insertTable('test_table', state => state.data, {
        writeSql: true,
      })
    )(state);

    
    expect(result.data).to.eql([]);
  });
});

describe('modifyTable', () => {
  it('should modify a table', async () => {
    const state = {
      configuration,
      data: [
        {
          name: 'name',
          type: 'varchar',
          required: true,
          unique: false,
          identity: false,
        },
      ],
    };

    const result = await execute(
      modifyTable('test_table', state => state.data, {
        writeSql: true,
      }),
      sql("ALTER TABLE test_table DROP COLUMN name;") // Clean up after test
    )(state);
    expect(result.queries.length).to.eql(1);
    expect(result.queries[0]).to.eql('ALTER TABLE test_table ADD COLUMN name varchar   NOT NULL;')
    
  });
});