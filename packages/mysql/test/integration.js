import { expect } from 'chai';
import { execute, sql, insert } from '../src/Adaptor.js';
import configuration from '../tmp/creds.json' with { type: 'json' };

describe('sql', () => {
  it('should fetch data from the database', async () => {
    const state = {
      configuration,
      data: { tableName: 'test_order' },
    };

    const { data } = await execute(
      sql(
        state =>
          `SELECT order_id,location FROM ${state.data.tableName} limit 1;`
      )
    )(state);

    expect(data.result).to.deep.equal([{ order_id: 0, location: 'New York' }]);
    expect(data.fields.length).to.equal(2);
  });
  it('should support prepared statements', async () => {
    const state = {
      configuration,
      data: { tableName: 'test_order', order_id: 0 },
    };

    const { data } = await execute(
      sql(`SELECT order_id,location FROM ?? where order_id = ?;`, {
        values: state => [state.data.tableName, state.data.order_id],
      })
    )(state);

    expect(data.result).to.deep.equal([{ order_id: 0, location: 'New York' }]);
    expect(data.fields.length).to.equal(2);
  });
  it('should escape sqli inputs', async () => {
    const state = {
      configuration,
      data: { tableName: "' OR '1'='1'; --" },
    };

    try {
      await execute(
        sql(`SELECT order_id,location FROM ?;`, {
          values: state => [state.data.tableName],
          writeSql: true,
        })
      )(state);
    } catch (err) {
      console.log('Caught error as expected:', err.message);
      expect(err.message).to.contain('You have an error in your SQL syntax;');
    }
  });
});

describe('insert', () => {
  it('should insert a record', async () => {
    const state = {
      configuration,
      data: {
        order_id: Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, '0'),
        specimen_source: 'Blood',
        laterality: 'left',
        clinical_history: 'No known allergies',
        frequency: 'Once',
        number_of_repeats: 1,
        location: 'New York',
      },
    };

    const { data } = await execute(insert('test_order', state => state.data))(
      state
    );
    expect(data.result).to.eql({
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 0,
    });
    expect(data.fields).to.eql(undefined);
  });
});
