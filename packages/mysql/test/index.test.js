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
      execute: async sql => {
        expect(sql).to.eql(
          "SELECT order_id,location FROM '\\' OR \\'1\\'=\\'1\\'; --';"
        );

        throw new Error(
          "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''' OR '1'='1'; --'' at line 1"
        );
      },
    });

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
      expect(err.message).to.contain('You have an error in your SQL syntax;');
    }
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
      execute: async (sql, values) => {
        // expect(sql).to.eql(
        //   'INSERT INTO `users` (`address`, `name`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `address` = values(`address`)'
        // );
        // expect(values).to.eql(['Ave Dela Casta', 'Alice']);
        return [{}, []];
      },
    });
    const fakeState = {
      configuration,
      data: { address: "' OR '1'='1'; --", name: 'Alice' },
    };

    const { data } = await execute(upsert('users', state => state.data))(
      fakeState
    );
    expect(data.result).to.eql({});
    expect(data.fields).to.eql([]);
  });
});
