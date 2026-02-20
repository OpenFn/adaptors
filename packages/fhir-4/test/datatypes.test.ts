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
    // Note that this can be done through an IG adaptor
    // or by a user in job code
    b.setValues(
      'abc',
      {
        PI: {
          code: 'PI',
          display: 'Personal ID Number',
          system: 'https://www/fhir/CodeSystem/SzPersonIdentificationsCS',
        },
      },
      'default',
    );

    const result = b.identifier({ type: 'PI' }, [], { type: 'abc' });

    expect(result).to.eql({
      type: {
        coding: [
          {
            code: 'PI',
            display: 'Personal ID Number',
            system: 'https://www/fhir/CodeSystem/SzPersonIdentificationsCS',
          },
        ],
      },
    });
  });

  it.skip('should map a type value', () => {
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

describe.only('coding', () => {
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

  // This is convenient to pass into datatype builders
  it('should accept a coding object', () => {
    const obj = {
      system: 'https://fake.loinc.org',
      version: '1',
      code: '1234',
      display: 'a thing',
      userSelected: false,
    };
    const result = b.coding(obj);

    expect(result).to.eql(obj);
  });

  // This is convenient to pass into datatype builders
  it('should accept a coding tuple', () => {
    const result = b.coding(['1234', 'https://fake.loinc.org']);

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

describe('composite', () => {
  it('should identify valid datetime strings as DateTime', () => {
    const obj = {};
    b.composite(obj, 'value', '2022-06-29');
    expect(obj).to.have.property('valueDateTime', '2022-06-29');
  });

  it('should identify full ISO datetime strings as DateTime', () => {
    const obj = {};
    b.composite(obj, 'value', '2022-08-14T14:43:47.000Z');
    expect(obj).to.have.property('valueDateTime', '2022-08-14T14:43:47.000Z');
  });

  it('should identify datetime with timezone as DateTime', () => {
    const obj = {};
    b.composite(obj, 'value', '2022-08-14T14:43:47+02:00');
    expect(obj).to.have.property('valueDateTime', '2022-08-14T14:43:47+02:00');
  });

  it('should NOT identify phone numbers as DateTime', () => {
    const obj = {};
    b.composite(obj, 'value', '+260759205190');
    expect(obj).to.have.property('valueString', '+260759205190');
    expect(obj).to.not.have.property('valueDateTime');
  });

  it('should NOT identify international phone numbers as DateTime', () => {
    const obj = {};
    b.composite(obj, 'value', '+1234567890123');
    expect(obj).to.have.property('valueString', '+1234567890123');
    expect(obj).to.not.have.property('valueDateTime');
  });

  it('should NOT identify numbers starting with valid year patterns as DateTime', () => {
    const obj = {};
    b.composite(obj, 'value', '2607592051901234');
    expect(obj).to.have.property('valueString', '2607592051901234');
    expect(obj).to.not.have.property('valueDateTime');
  });

  it('should identify partial dates as DateTime', () => {
    const obj = {};
    b.composite(obj, 'value', '2022-08');
    expect(obj).to.have.property('valueDateTime', '2022-08');
  });

  it('should identify years as DateTime', () => {
    const obj = {};
    b.composite(obj, 'value', '2022');
    expect(obj).to.have.property('valueDateTime', '2022');
  });

  it('should handle boolean values correctly', () => {
    const obj = {};
    b.composite(obj, 'value', true);
    expect(obj).to.have.property('valueBoolean', true);
  });

  it('should handle numeric values correctly', () => {
    const obj = {};
    b.composite(obj, 'value', 42);
    expect(obj).to.have.property('valueInteger', 42);
  });

  it('should handle regular strings correctly', () => {
    const obj = {};
    b.composite(obj, 'value', 'hello world');
    expect(obj).to.have.property('valueString', 'hello world');
  });
});
