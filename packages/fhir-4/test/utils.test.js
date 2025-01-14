import { expect, assert } from 'chai';
import * as util from '../src/utils.js';

describe('identifier', () => {
  afterEach(() => {
    util.setSystemMap({});
  });

  it('should map an identifier from a string', () => {
    const result = util.identifier('abc');

    expect(result).to.eql({ value: 'abc' });
  });

  it('should map an identifier with a value key', () => {
    const result = util.identifier({ value: 'abc' });

    expect(result).to.eql({ value: 'abc' });
  });

  it('should map an identifier with a value/system pair', () => {
    const result = util.identifier({ value: 'abc', system: 'xyz' });
    expect(result).to.eql({ value: 'abc', system: 'xyz' });
  });

  it('should map an identifier with a mapped system', () => {
    util.setSystemMap({
      default: 'xyz',
    });
    const result = util.identifier({ value: 'abc', system: 'default' });
    expect(result).to.eql({ value: 'abc', system: 'xyz' });
  });

  it('should be compatible with util.value', () => {
    const result = util.identifier(util.value('abc', 'xyz'));

    expect(result).to.eql({ value: 'abc', system: 'xyz' });
  });

  it('should apply extra args to a string', () => {
    const result = util.identifier('abc', { use: 'usual' });

    expect(result).to.eql({ value: 'abc', use: 'usual' });
  });

  it('should apply extra args to an object', () => {
    const result = util.identifier({ value: 'abc' }, { use: 'usual' });

    expect(result).to.eql({ value: 'abc', use: 'usual' });
  });

  it('should prefer extra keys to value keys', () => {
    const result = util.identifier(
      { value: 'abc' },
      { value: 'def', use: 'usual' }
    );

    expect(result).to.eql({ value: 'def', use: 'usual' });
  });

  it('should allow arbitrary keys on a value object', () => {
    const result = util.identifier({ value: 'abc', use: 'usual' });

    expect(result).to.eql({ value: 'abc', use: 'usual' });
  });

  //it('should map an identifier from a string with a default system', () => {});
});
