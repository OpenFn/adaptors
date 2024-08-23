import { expect } from 'chai';
import { builders } from '../src/Utils';

const { identifier } = builders;

describe('identifier', () => {
  it('should map a string to an identifier with a system', () => {
    const result = identifier('bob', 'www');
    expect(result).to.eql({ value: 'bob', system: 'www' });
  });
  it('should map an object to an identifier with a system', () => {
    const result = identifier({ value: 'bob' }, 'www');
    expect(result).to.eql({ value: 'bob', system: 'www' });
  });
  it('should accept a full identifier input and override the system', () => {
    const result = identifier({ value: 'bob', system: 'xyz' }, 'www');
    expect(result).to.eql({ value: 'bob', system: 'www' });
  });
  it('should just return the identifier if no system is specified', () => {
    const result = identifier({ value: 'bob', system: 'xyz' });
    expect(result).to.eql({ value: 'bob', system: 'xyz' });
  });
  it('should return an array of identifiers if given an array of strings', () => {
    const result = identifier(['bob', 'bobbi'], 'abc');
    expect(result).to.eql([
      { value: 'bob', system: 'abc' },
      { value: 'bobbi', system: 'abc' },
    ]);
  });
  it('should return an array of identifiers if given an array of identifiers', () => {
    const result = identifier([{ value: 'a' }, { value: 'b' }], 'abc');
    expect(result).to.eql([
      { value: 'a', system: 'abc' },
      { value: 'b', system: 'abc' },
    ]);
  });
  it('should still override systems if given an array return an array of identifiers if given an array of identifiers', () => {
    const result = identifier(
      [
        { value: 'a', system: 'xyz' },
        { value: 'b', system: '123' },
      ],
      'abc'
    );
    expect(result).to.eql([
      { value: 'a', system: 'abc' },
      { value: 'b', system: 'abc' },
    ]);
  });
  // TODO is there some way to say if the provided system is an override or default?
});
