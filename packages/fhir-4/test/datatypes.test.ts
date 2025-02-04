import { expect, assert } from 'chai';
import * as dt from '../src/datatypes';

describe('identifier', () => {
  afterEach(() => {
    dt.setSystemMap({});
  });

  it('should map an identifier from a string', () => {
    const result = dt.identifier('abc');

    expect(result).to.eql({ value: 'abc' });
  });

  it('should map an identifier with a value key', () => {
    const result = dt.identifier({ value: 'abc' });

    expect(result).to.eql({ value: 'abc' });
  });

  it('should map an identifier with a value/system pair', () => {
    const result = dt.identifier({ value: 'abc', system: 'xyz' });
    expect(result).to.eql({ value: 'abc', system: 'xyz' });
  });

  it('should map an identifier with a mapped system', () => {
    dt.setSystemMap({
      default: 'xyz',
    });
    const result = dt.identifier({ value: 'abc', system: 'default' });
    expect(result).to.eql({ value: 'abc', system: 'xyz' });
  });

  it('should be compatible with util.value', () => {
    const result = dt.identifier(dt.value('abc', 'xyz'));

    expect(result).to.eql({ value: 'abc', system: 'xyz' });
  });

  it('should add an extension', () => {
    const result = dt.identifier({ value: 'abc' }, { value: 'x', url: 'www' });

    expect(result.extension).to.eql([{ value: 'x', url: 'www' }]);
  });

  it('should allow arbitrary keys on a value object', () => {
    const result = dt.identifier({ value: 'abc', use: 'usual' });

    expect(result).to.eql({ value: 'abc', use: 'usual' });
  });

  //it('should map an identifier from a string with a default system', () => {});
});
