import { expect } from 'chai';
import {
  execute,
  sql,
  insert,
  upsert,
  setMockConnection,
} from '../src/Adaptor.js';

const configuration = {
  host: 'localhost',
  port: 3306,
  database: 'test',
  user: 'root',
  password: 'password',
};
describe('sql', () => {
  it('should log and return the query when execute is false', async () => {
    setMockConnection({
      execute: (sqlStr, values) => {
        expect(sqlStr).to.eql('SELECT Name, FROM users;');
        expect(values).to.eql(undefined);
        return [{ Name: 'New John' }];
      },
      end: () => {},
    });
    const fakeState = {
      configuration,
      data: { tableName: 'users' },
    };

    const result = await execute(
      sql(state => `SELECT Name, FROM ${state.data.tableName};`, {
        writeSql: true,
      })
    )(fakeState);

    expect(result.queries).to.include('SELECT Name, FROM users;');
    expect(result.data.result).to.eql({ Name: 'New John' });
  });
  it('shoudld escape sqli inputs', async () => {
    setMockConnection({
      end: () => {},
      execute: async (sql, values) => {
        console.log({ sql });
        expect(sql).to.eql(
          'SELECT order_id,location FROM test_order where order_id = ?;'
        );
        expect(values).to.eql(["' OR '1'='1'; --"]);

        return [[], [{ name: 'order_id' }, { name: 'location' }]];
      },
    });

    const state = {
      configuration,
      data: { tableName: "' OR '1'='1'; --" },
    };

    const { data } = await execute(
      sql(`SELECT order_id,location FROM test_order where order_id = ?;`, {
        values: state => [state.data.tableName],
        writeSql: true,
      })
    )(state);

    expect(data.result).to.deep.equal([]);
    expect(data.fields.length).to.equal(2);
  });
});

describe('insert', () => {
  it('should insert a record', async () => {
    setMockConnection({
      end: () => {},
      execute: async (sql, values) => {
        expect(sql).to.eql(
          'INSERT INTO `users` (`address`, `name`) VALUES (?, ?)'
        );
        expect(values).to.eql(['Ave Dela Casta', 'Alice']);
        return [{}, []];
      },
    });
    const fakeState = {
      configuration,
      data: { address: 'Ave Dela Casta', name: 'Alice' },
    };

    const { data } = await execute(insert('users', state => state.data))(
      fakeState
    );
    expect(data.result).to.eql({});
    expect(data.fields).to.eql([]);
  });
});

describe('upsert', () => {
  it('should upsert a record', async () => {
    setMockConnection({
      end: () => {},
      execute: async sql => {
        expect(sql).to.eql(
          "insert into `users` (`address`, `name`) values ('\\' OR \\'1\\'=\\'1\\'; --', 'Alice') ON DUPLICATE KEY UPDATE `address` = VALUES(`address`), `name` = VALUES(`name`)"
        );
        return [
          {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 2,
            info: '',
            serverStatus: 2,
            warningStatus: 0,
            changedRows: 0,
          },
        ];
      },
    });
    const fakeState = {
      configuration,
      data: { address: "' OR '1'='1'; --", name: 'Alice' },
    };

    const { data } = await execute(upsert('users', state => state.data))(
      fakeState
    );
    expect(data.result.affectedRows).to.eql(1);
    expect(data.fields).to.eql(undefined);
  });
});
