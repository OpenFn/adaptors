import { expect } from 'chai';
import { builders } from '../src/Utils';

const { identifier, addExtension, coding, concept } = builders;

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

describe('coding', () => {
  it('should create a simple coding', () => {
    const result = coding(123, 'www');

    expect(result).to.eql({ value: 123, system: 'www' });
  });
});

describe('codeableConcept', () => {
  it('should create a codeableConcept with 1 coding only', () => {
    const result = concept(coding(123, 'www'));

    expect(result).to.eql({ coding: [{ value: 123, system: 'www' }] });
  });

  it('should create a codeableConcept with a label and coding only', () => {
    const result = concept('example', coding(123, 'www'));

    expect(result).to.eql({
      text: 'example',
      coding: [{ value: 123, system: 'www' }],
    });
  });

  it('should create a codeableConcept with 2 codings', () => {
    const result = concept(coding(123, 'www'), coding(456, 'www'));

    expect(result).to.eql({
      coding: [
        { value: 123, system: 'www' },
        { value: 456, system: 'www' },
      ],
    });
  });

  it('should create a codeableConcept with 2 codings and a label', () => {
    const result = concept(
      'this is the thing',
      coding(123, 'www'),
      coding(456, 'www')
    );

    expect(result).to.eql({
      text: 'this is the thing',
      coding: [
        { value: 123, system: 'www' },
        { value: 456, system: 'www' },
      ],
    });
  });
});

describe('addExtension', () => {
  it('should add an extension to a resource', () => {
    const resource = {
      extension: [{ url: 'xyz' }],
    };
    addExtension(resource, 'www', {});

    expect(resource.extension).to.eql([
      { url: 'xyz' },
      {
        url: 'www',
        value: {},
      },
    ]);
  });

  it('should add a new extensions array to a resource', () => {
    const resource = {};
    addExtension(resource, 'www', {});

    expect(resource.extension).to.eql([
      {
        url: 'www',
        value: {},
      },
    ]);
  });

  it('should add a Codeable Concept extension', () => {
    const resource = {};
    addExtension(resource, 'www', {
      coding: [
        {
          system:
            'http://moh.gov.et/fhir/hiv/CodeSystem/encounter-visit-type-code-system',
          code: 'unscheduled',
        },
      ],
    });

    expect(resource.extension).to.eql([
      {
        url: 'www',
        valueCodeableConcept: {
          coding: [
            {
              system:
                'http://moh.gov.et/fhir/hiv/CodeSystem/encounter-visit-type-code-system',
              code: 'unscheduled',
            },
          ],
        },
      },
    ]);
  });

  // TODO need to unit test basically every extension type
});
