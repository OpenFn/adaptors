import { expect } from 'chai';
import { execute, sql, insert, upsert, upsertMany } from '../src/Adaptor.js';
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
          `SELECT order_id,location FROM ${state.data.tableName} where order_id= 22;`
      )
    )(state);

    expect(data.result).to.deep.equal([{ order_id: 22, location: 'New York' }]);
    expect(data.fields.length).to.equal(2);
  });
  it('should support prepared statements', async () => {
    const state = {
      configuration,
      data: { order_id: 123 },
    };

    const { data } = await execute(
      sql(`SELECT order_id,location FROM test_order where order_id = ?;`, {
        values: state => [state.data.order_id],
      })
    )(state);

    expect(data.result).to.deep.equal([
      { order_id: 123, location: 'New York' },
    ]);
    expect(data.fields.length).to.equal(2);
  });
  it('should safely handle sqli inputs', async () => {
    const state = {
      configuration,
      data: { order_id: 'DROP TABLE users; --' }, //TODO: If There is order_id of 0, it will be returned as a valid record??
    };

    const { data } = await execute(
      sql(`SELECT order_id,location FROM test_order where order_id = ?;`, {
        values: state => [state.data.order_id],
        writeSql: true,
      })
    )(state);

    expect(data.result).to.deep.equal([]);
    expect(data.fields.length).to.equal(2);
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

describe('upsert', () => {
  it('should safely handle sqli inputs', async () => {
    const state = {
      configuration,
      data: {
        name: 'Alice',
        address: "' OR '1'='1'; --",
      },
    };

    const { data } = await execute(upsert('users', state => state.data))(state);
    expect(data.result.affectedRows).to.eq(1);
    expect(data.fields).to.eq(undefined);
    const insertId = data.result.insertId;

    const { data: fetchData } = await execute(
      sql('SELECT name, address FROM users WHERE name = ? and id = ?', {
        values: ["Alice", insertId],
      })
    )(state);

    
    expect(fetchData.result).to.deep.equal([
      { name: 'Alice', address: "' OR '1'='1'; --" },
    ]);

    expect(fetchData.fields.length).to.equal(2);
    expect(fetchData.fields[0].name).to.equal("name");
    expect(fetchData.fields[1].name).to.equal("address");
  });
  it('should upsert a record', async () => {
    const state = {
      configuration,
      data: {
        order_id: 188,
        specimen_source: 'Blood',
        laterality: 'Right',
        clinical_history: 'Mild fever',
        frequency: 'Twice',
        number_of_repeats: 1,
        location: 'Manzese Hospital',
      },
    };

    const { data } = await execute(upsert('test_order', state => state.data))(
      state
    );

    expect(data.result).to.contain({
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 0,
    });
    expect(data.fields).to.eq(undefined);
  }).timeout(5e4);
});

describe('upsertMany', () => {
  it('should upsert multiple records', async () => {
    const state = {
      configuration,
      data: [
        {
          order_id: 1,
          specimen_source: 'Urine',
          laterality: 'right',
          clinical_history: 'Diabetic',
          frequency: 'Daily',
          number_of_repeats: 2,
          location: 'Los Angeles',
        },
        {
          order_id: 2,
          specimen_source: 'Blood',
          laterality: 'left',
          clinical_history: 'Hypertensive',
          frequency: 'Weekly',
          number_of_repeats: 1,
          location: 'Chicago',
        },
      ],
    };

    const { data } = await execute(
      upsertMany('test_order', state => state.data)
    )(state);

    expect(data.result).to.contain({
      fieldCount: 0,
      affectedRows: 2,
      insertId: 0,
      info: 'Records: 2  Duplicates: 2  Warnings: 0',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 0,
    });
    expect(data.fields).to.eq(undefined);
  }).timeout(5e4);
});
