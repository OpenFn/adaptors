import { expect } from 'chai';
import { util } from '../src/index.js';

describe('util.format', () => {
  it('should escape identifiers and literals', async () => {
    const sqlStr = util.format(
      'select * from %I where %I = %L;',
      'foo',
      'bar',
      'baz'
    );
    expect(sqlStr).to.eql("select * from foo where bar = 'baz';");
  });

  it('should safely escape table names', async () => {
    const state = { data: { userInput: 'users; DROP TABLE users; --' } };
    const sqlStr = util.format('select * from %I', state.data.userInput);
    expect(sqlStr).to.eql('select * from "users; DROP TABLE users; --"');
  });

  it('should escape column names', async () => {
    const state = { data: { col: 'id; DROP TABLE users;' } };
    const sqlStr = util.format('select %I from users;', state.data.col);
    expect(sqlStr).to.eql('select "id; DROP TABLE users;" from users;');
  });

  it('should escape both columns and values', async () => {
    const state = {
      data: {
        col: 'name); DELETE FROM users; --',
        value: `' OR 1=1; --`,
        table: `users; DROP TABLE orders; --`,
      },
    };
    const sqlStr = util.format(
      'SELECT * FROM %I WHERE %I = %L',
      state.data.table,
      state.data.col,
      state.data.value
    );
    expect(sqlStr).to.eql(
      `SELECT * FROM "users; DROP TABLE orders; --" WHERE "name); DELETE FROM users; --" = ''' OR 1=1; --'`
    );
  });
});
