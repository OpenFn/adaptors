import { expect } from 'chai';
import { describe, it } from 'mocha';
import { execute, sql } from '../src/index.js';
import configuration from '../tmp/creds.json' with { type: 'json' };

describe('sql', () => {
  it('should throw an error if table does not exist', async () => {
    const state = { configuration, data: { tableName: 'foo' } };
    try {
        await execute(sql(state => `select * from ${state.data.tableName};`, {
          writeSql: true,
        }))(state);
      } catch (error) {
        expect(error.code).to.eq('42P01');
        expect(error.message).to.eq('relation "foo" does not exist');
      }
  })

  it('should return a query result', async () => {
    const state = { configuration, data: { tableName: 'issues' } };
    const result = await execute(
      sql(state => `select * from ${state.data.tableName};`, {
        writeSql: true,
      })
    )(state);
    
    expect(result.data.length).to.eql(13)
    expect(result.queries.length).to.eql(1)
    expect(result.queries[0]).to.eql(`select * from issues;`)
  });
  
  it('should support prepared statements', async () => {
    const sku = Math.random().toString(36).substring(2);
    const state = { configuration, data: {  name: 'test', sku, price: 100.00 } };
    const result = await execute(
      sql(
        {text: `insert into products (name, sku, price) values ($1, $2, $3);`, values: [state.data.name, state.data.sku, state.data.price]},
        {
            writeSql: true,
        }
      )
    )(state);

    expect(result.data).to.eql([]);
    expect(result.queries.length).to.eql(1);
    expect(result.queries[0].text).to.eql(`insert into products (name, sku, price) values ($1, $2, $3);`);
    expect(result.queries[0].values).to.eql(['test', sku, 100]);

    })
})
