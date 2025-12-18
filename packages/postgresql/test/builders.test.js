import { expect } from 'chai';
import { findValueQuery } from '../src/builders.js';

describe('findValueQuery', () => {
  it('should return a query with default operator =', async () => {
    const queryStr = findValueQuery('id', 'users', { first_name: 'Mamadou' });
    expect(queryStr).to.eql(
      "select id from users where first_name = 'Mamadou'"
    );
  });
  it('should return a query with passed operator', async () => {
    const queryStr = findValueQuery(
      'id',
      'users',
      { first_name: 'Mamadou' },
      { first_name: 'like' }
    );
    expect(queryStr).to.eql(
      "select id from users where first_name like 'Mamadou'"
    );
  });
  it('should escape sqli inputs', async () => {
    const uuid = 'id';
    const relation = 'users';
    const where = { username: "john'; DROP TABLE users; --" };
    const operator = {};

    const query = findValueQuery(uuid, relation, where, operator);

    // Check if the dangerous input is safely handled
    expect(query).match(
      /select id from users where username = 'john''; DROP TABLE users; --'/
    );
  });

  it('should format query correctly with different operators', () => {
    const uuid = 'id';
    const relation = 'products';
    const where = { price: 100 };
    const operator = { price: '<=' };

    const query = findValueQuery(uuid, relation, where, operator);

    expect(query).to.eq("select id from products where price <= '100'");
  });
});
