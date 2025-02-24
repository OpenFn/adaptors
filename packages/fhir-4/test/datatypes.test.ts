import { expect, assert } from 'chai';
import * as b from '../src/datatypes';

afterEach(() => {
  b.setSystemMap({})({});
});

describe('identifier', () => {
  it('should map an identifier from a string', () => {
    const result = b.identifier('abc');

    expect(result).to.eql({ value: 'abc' });
  });

  it('should map an identifier with a value key', () => {
    const result = b.identifier({ value: 'abc' });

    expect(result).to.eql({ value: 'abc' });
  });

  it('should map an identifier with a value/system pair', () => {
    const result = b.identifier({ value: 'abc', system: 'xyz' });
    expect(result).to.eql({ value: 'abc', system: 'xyz' });
  });

  it('should map an identifier with a mapped system', () => {
    b.setSystemMap({
      default: 'xyz',
    })({});
    const result = b.identifier({ value: 'abc', system: 'default' });
    expect(result).to.eql({ value: 'abc', system: 'xyz' });
  });

  // not so helpful?
  it('should be compatible with util.value', () => {
    const result = b.identifier(b.value('abc', 'xyz'));

    expect(result).to.eql({ value: 'abc', system: 'xyz' });
  });

  it('should add an extension', () => {
    const result = b.identifier({ value: 'abc' }, { value: 'x', url: 'www' });

    expect(result.extension).to.eql([{ valueString: 'x', url: 'www' }]);
  });

  it('should allow arbitrary keys on a value object', () => {
    const result = b.identifier({ value: 'abc', use: 'usual' });

    expect(result).to.eql({ value: 'abc', use: 'usual' });
  });

  it('should pass identifier.type into datatypes.concept()', () => {
    const result = b.identifier({ type: ['abc', 'www'] });

    expect(result).to.eql({
      type: { coding: [{ code: 'abc', system: 'www' }] },
    });
  });

  //it('should map an identifier from a string with a default system', () => {});
});

describe('coding', () => {
  it('should create a simple coding', () => {
    const result = b.coding('1234', 'https://fake.loinc.org');

    expect(result).to.eql({ code: '1234', system: 'https://fake.loinc.org' });
  });

  it('should add extra properties', () => {
    const result = b.coding('1234', 'https://fake.loinc.org', {
      display: 'foobar',
    });

    expect(result).to.eql({
      code: '1234',
      system: 'https://fake.loinc.org',
      display: 'foobar',
    });
  });

  it('should map a system', () => {
    b.setSystemMap({
      loinc: 'https://fake.loinc.org',
    })({});

    const result = b.coding('1234', 'loinc');

    expect(result).to.eql({ code: '1234', system: 'https://fake.loinc.org' });
  });

  it('should use a shorthand', () => {
    const result = b.c('1234', 'https://fake.loinc.org');

    expect(result).to.eql({ code: '1234', system: 'https://fake.loinc.org' });
  });
});

// TODO I have changed this and so the generator will also need an update
describe('concept', () => {
  it('should just return a concept if one is passed', () => {
    const c = {
      coding: [{ code: '1234', system: 'https://fake.loinc.org' }],
    };

    const result = b.concept(c);

    expect(result).to.eql(c);
  });
  it('should create a codeable concept from a single tuple', () => {
    // the double array here is horrible
    const result = b.concept(['1234', 'https://fake.loinc.org']);

    expect(result).to.eql({
      coding: [{ code: '1234', system: 'https://fake.loinc.org' }],
    });
  });

  it('should create a codeable concept from a pair of tuples', () => {
    // the double array here is horrible
    const result = b.concept([
      ['1234', 'https://fake.loinc.org'],
      ['5678', 'https://fake.loinc.org'],
    ]);

    expect(result).to.eql({
      coding: [
        { code: '1234', system: 'https://fake.loinc.org' },
        { code: '5678', system: 'https://fake.loinc.org' },
      ],
    });
  });

  it('should create a codeable concept from a single tuple with extras', () => {
    // the double array here is horrible
    const result = b.concept([
      '1234',
      'https://fake.loinc.org',
      { text: 'abc' },
    ]);

    expect(result).to.eql({
      coding: [
        {
          code: '1234',
          system: 'https://fake.loinc.org',
          text: 'abc',
        },
      ],
    });
  });

  it('should create a codeable concept with text', () => {
    // the double array here is horrible
    const result = b.concept(['1234', 'https://fake.loinc.org'], {
      text: 'hello',
    });

    expect(result).to.eql({
      coding: [
        {
          code: '1234',
          system: 'https://fake.loinc.org',
        },
      ],
      text: 'hello',
    });
  });

  it('should create a codeable concept from an object', () => {
    // the double array here is horrible
    const result = b.concept({
      code: '1234',
      system: 'https://fake.loinc.org',
    });

    expect(result).to.eql({
      coding: [{ code: '1234', system: 'https://fake.loinc.org' }],
    });
  });

  it('should create a codeable concept from a pair of objects', () => {
    // the double array here is horrible
    const result = b.concept([
      {
        code: '1234',
        system: 'https://fake.loinc.org',
      },
      {
        code: '5678',
        system: 'https://fake.loinc.org',
      },
    ]);

    expect(result).to.eql({
      coding: [
        { code: '1234', system: 'https://fake.loinc.org' },
        { code: '5678', system: 'https://fake.loinc.org' },
      ],
    });
  });

  it('should create a codeable concept from mixed codings', () => {
    // the double array here is horrible
    const result = b.concept([
      {
        code: '1234',
        system: 'https://fake.loinc.org',
      },
      ['5678', 'https://fake.loinc.org'],
    ]);

    expect(result).to.eql({
      coding: [
        { code: '1234', system: 'https://fake.loinc.org' },
        { code: '5678', system: 'https://fake.loinc.org' },
      ],
    });
  });
});
