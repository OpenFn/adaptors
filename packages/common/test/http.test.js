import nock from 'nock';
import { expect } from 'chai';
import { options } from '../src/http';

describe('options', () => {
  it('options should return an object', () => {
    const opts = { a: 1, b: 2, c: 3 };

    const result = options(opts);

    expect(result).to.eql(opts);
  });

  it('options should return a default object', () => {
    const opts = {};

    const result = options();

    expect(result).to.eql(opts);
  });

  // options should not have extra iterable keys
  it('options should return an object with no keys', () => {
    const result = options();

    expect(Object.keys(result)).to.eql([]);
  });

  it('options should return an object with no keys', () => {
    const keys = [];
    const result = options();
    for (const key in result) {
      keys.push(key);
    }

    expect(keys).to.eql([]);
  });

  it('options.json() should basically work', () => {
    const opts = { a: 1 };

    const result = options(opts).json();
    expect(result).to.eql({
      a: 1,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('options.basic() should basically work', () => {
    const opts = { a: 1 };

    const result = options(opts).basic('u', 'p');

    expect(result).to.eql({
      a: 1,
      headers: {
        Authorization: 'Basic dTpw',
      },
    });
  });

  it('helpers can be chained', () => {
    const opts = { a: 1 };

    const result = options(opts).basic('u', 'p').json();

    expect(result).to.eql({
      a: 1,
      headers: {
        Authorization: 'Basic dTpw',
        'Content-Type': 'application/json',
      },
    });
  });
});
