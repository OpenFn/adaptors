import { expect } from 'chai';
import {
  addExtension,
  findExtension,
  identifier,
  coding,
  concept,
  composite,
  reference
} from '../src/utils';

describe('findExtension()', () => {
  it('should find an extension with a matching url', () => {
    const resource = { extension: [{ url: 'a' }, { url: 'b' }, { url: 'c' }] };

    const result = findExtension(resource, 'b');
    expect(result).to.eql({ url: 'b' });
  });
  it('should return undefined if nothing found', () => {
    const resource = { extension: [{ url: 'a' }, { url: 'b' }, { url: 'c' }] };

    const result = findExtension(resource, 'z');
    expect(result).to.be.undefined;
  });
  it('should resolve a path and return the code', () => {
    const resource = {
      extension: [
        { url: 'a' },
        { url: 'b', codes: [11, 22, 33] },
        { url: 'c' },
      ],
    };

    const result = findExtension(resource, 'b', 'codes[2]');
    expect(result).to.eql(33);
  });
});

describe('identifier', () => {
  it('should map a string to an identifier with a system', () => {
    const result = identifier('bob', 'www');
    expect(result).to.eql({ value: 'bob', system: 'www' });
  });
  it('should map an object to an identifier with a system', () => {
    const result = identifier({ value: 'bob' }, 'www');
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

  it('should use the system map', () => {
    const result = identifier({ value: 'bob', system: 'UAN' });
    expect(result).to.eql({
      value: 'bob',
      system: 'http://moh.gov.et/fhir/hiv/identifier/UAN',
    });
  });

  // TODO is there some way to say if the provided system is an override or default?
});

describe('coding', () => {
  it('should create a simple coding', () => {
    const result = coding(123, 'www');

    expect(result).to.eql({ code: 123, system: 'www' });
  });
});

describe('address', () => {
  it('should create an address', () => {
    const result = coding(123, 'www');

    expect(result).to.eql({ code: 123, system: 'www' });
  });

  it('should create an address with residential-type extension', () => {
    const result = coding(123, 'www');

    expect(result).to.eql({ code: 123, system: 'www' });
  });
});

describe('codeableConcept', () => {
  it('should create a codeableConcept with 1 coding only', () => {
    const result = concept(coding(123, 'www'));

    expect(result).to.eql({ coding: [{ code: 123, system: 'www' }] });
  });

  it('should create a codeableConcept with 1 tuple-style coding only', () => {
    const result = concept([123, 'www']);

    expect(result).to.eql({ coding: [{ code: 123, system: 'www' }] });
  });

  it('should create a codeableConcept with a label and coding only', () => {
    const result = concept('example', coding(123, 'www'));

    expect(result).to.eql({
      text: 'example',
      coding: [{ code: 123, system: 'www' }],
    });
  });

  it('should create a codeableConcept with a label and tuple only', () => {
    const result = concept('example', [123, 'www']);

    expect(result).to.eql({
      text: 'example',
      coding: [{ code: 123, system: 'www' }],
    });
  });

  it('should create a codeableConcept with 2 codings', () => {
    const result = concept(coding(123, 'www'), coding(456, 'www'));

    expect(result).to.eql({
      coding: [
        { code: 123, system: 'www' },
        { code: 456, system: 'www' },
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
        { code: 123, system: 'www' },
        { code: 456, system: 'www' },
      ],
    });
  });
});

describe('addExtension', () => {
  it('should add an extension to a resource', () => {
    const resource = {
      extension: [{ url: 'xyz' }],
    };
    addExtension(resource, 'www', 'x');

    expect(resource.extension).to.eql([
      { url: 'xyz' },
      {
        url: 'www',
        valueString: 'x',
      },
    ]);
  });

  it('should add a new extensions array to a resource', () => {
    const resource = {};
    addExtension(resource, 'www', 'y');

    expect(resource.extension).to.eql([
      {
        url: 'www',
        valueString: 'y'
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

  it('should add datetime extension as a string', () => {
    const resource = {};
    addExtension(resource, 'www', '2001-01-01');

    expect(resource.extension).to.eql([
      {
        url: 'www',
        valueDateTime: '2001-01-01'
      },
    ]);
  });

  it('should add a Codeable Concept extension with the util helper', () => {
    const resource = {};
    addExtension(
      resource,
      'www',
      concept([
        'unscheduled',
        'http://moh.gov.et/fhir/hiv/CodeSystem/encounter-visit-type-code-system',
      ])
    );

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
  // should add a codeable concept with the helper
});

describe('reference', () => {
  it('should just return an existing reference', () => {
    const r = { reference: 'patient/a' };
    const result = reference(r);

    expect(result).to.eql(r);
  });

  it('should accept a string id', () => {
    const result = reference('x');

    expect(result).to.eql({ reference: 'x' });
  });

  it('should generate a reference to some resource', () => {
    const r = { id: 'x', resourceType: 'Thing' };
    const result = reference(r);

    expect(result).to.eql({ reference: 'Thing/x' });
  });

  it('should apply options', () => {
    const result = reference('x', {
      display: 'd',
      type: 't',
      identifier: 'i',
    });

    expect(result).to.eql({
      reference: 'x',
      display: 'd',
      type: 't',
      identifier: 'i',
    });
  });

  // this is the behaviour right now - should we change it?
  it('should apply options not in the spec', () => {
    const result = reference('x', { foo: 'bar' });

    expect(result).to.eql({ reference: 'x', foo: 'bar' });
  });

  it('should return an array of references', () => {
    const a = { reference: 'patient/a' };
    const b = { reference: 'patient/a' };

    const result = reference([a, b]);

    expect(result).to.eql([a, b]);
  })
});

describe('composite', () => {
  it('should add a string value', () => {
    const resource = {};

    composite(resource, 'value', 'xyz')

    expect(resource.valueString).to.eql('xyz')
  })

  it('should add a boolean value', () => {
    const resource = {};

    composite(resource, 'name', false)

    expect(resource.nameBoolean).to.be.false
  })

  it('should add a codeableConcept value', () => {
    const resource = {};

    composite(resource, 'value', concept(['a', 'b']))

    expect(resource.valueCodeableConcept).to.eql({
      "coding": [
        {
          "code": "a",
          "system": "b"
        }
      ]
    })
  })

  it('should add a period value', () => {
    const resource = {};

    composite(resource, 'value', { start: 'x', end: 'y' })

    expect(resource.valuePeriod).to.eql({
       start: 'x',
       end: 'y'
    })
  });

  it('should add a period value with only start', () => {
    const resource = {};

    composite(resource, 'value', { start: 'x' })

    expect(resource.valuePeriod).to.eql({
       start: 'x'
    })
  });

  it('should add a period value with only end', () => {
    const resource = {};

    composite(resource, 'value', { end: 'y' })

    expect(resource.valuePeriod).to.eql({
       end: 'y'
    })
  });

  it('should add a period value', () => {
    const resource = {};

    composite(resource, 'value', { start: 'x', end: 'y' })

    expect(resource.valuePeriod).to.eql({
       start: 'x',
       end: 'y'
    })
  });

  it('should add a datetime value', () => {
    const resource = {};

    composite(resource, 'value', '2020-09-19')

    expect(resource.valueDateTime).to.eql('2020-09-19')
  });

  it('should add a reference value', () => {
    const resource = {};

    composite(resource, 'value', { reference: 'r' })

    expect(resource.valueReference).to.eql({ reference: 'r' })
  })

  it('should add a reference value if passed a resource', () => {
    const resource = {};

    composite(resource, 'value', { id: 'x', resourceType: 'T', meta: {} })

    expect(resource.valueReference).to.eql({ reference: 'T/x' })
  })
})