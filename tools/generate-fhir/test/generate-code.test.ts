import test from 'ava';
import _ from 'lodash';
import { transformSync } from 'esbuild';
import generateCode from '../src/generate-code';

/**
 * I'm thinking its about time to add unit tests here
 * but won't it be a bit of a nightmare?
 * We generate quite a lot of code per schema
 *
 * We can either:
 * 1) test whole generated code files
 * 2) test partial string matches within a code file
 * 3) test for particular AST structures within the generated code
 *
 * They all seem kind of awful. And is this going to slow me down, like a lot?
 * Aren't we better off using unit tests within each adaptor to test the resulting logic
 * Rather than testing the builders themselves?
 *
 * Well, I would like some unit tests here, but I'd also like them to be lightweight
 *
 * 4) generate code, eval it, and then actually run it
 *
 * That would test the result of the code, rather than the content of it
 */

const dt = {
  identifier: (id, system?) => {
    const make = i => {
      const o = typeof i === 'string' ? { value: i } : { ...i };
      if (system) o.system = system;
      return o;
    };
    return Array.isArray(id) ? id.map(make) : make(id);
  },
  reference: ref => {
    const make = r => (typeof r === 'string' ? { reference: r } : r);
    return Array.isArray(ref) ? ref.map(make) : make(ref);
  },
  lookupValue: (_url, code) => code,
  ensureConceptText: () => {},
  composite: (obj, key, value) => {
    const suffix = { boolean: 'Boolean', string: 'String', number: 'Integer' };
    obj[key + (suffix[typeof value] || 'String')] = value;
  },
  addExtension: (resource, url, value) => {
    resource.extension ??= [];
    resource.extension.push({ url, value });
  },
  concept: codings => {
    const arr = Array.isArray(codings) ? codings : [codings];
    return { coding: arr.map(c => (typeof c === 'string' ? { code: c } : c)) };
  },
  coding: src => (typeof src === 'string' ? { code: src } : src),
};

const compileBuilder = (code: string) => {
  const { code: cjs } = transformSync(code, { loader: 'ts', format: 'cjs' });
  const mod = { exports: {} as any };
  const mockRequire = (path: string) => {
    if (path === 'lodash') return _;
    if (path.includes('datatypes')) return dt;
    return {};
  };
  new Function('require', 'module', 'exports', cjs)(
    mockRequire,
    mod,
    mod.exports,
  );
  return mod.exports.default;
};

const generateBuilder = (resourceType, props) => {
  const schema = {
    [resourceType]: [
      {
        id: resourceType,
        type: resourceType,
        url: `https://test.openfn.org/${resourceType.toLowerCase()}`,
        props,
      },
    ],
  };
  const { profiles } = generateCode(schema, {});
  return profiles[resourceType];
};

test('sets resourceType', t => {
  const profile = {};
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({});
  t.is(result.resourceType, 'Patient');
});

test('spreads unknown props through', t => {
  const profile = {};
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ birthDate: '1990-01-01', customField: 42 });
  t.is(result.birthDate, '1990-01-01');
  t.is(result.customField, 42);
});

test('isArray wraps a single value into an array', t => {
  const profile = {
    x: { type: ['Reference'], isArray: true },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ x: 'Org/1' });
  t.deepEqual(result.x, [{ reference: 'Org/1' }]);
});

test('isArray keeps an existing array as-is', t => {
  const profile = {
    x: { type: ['Reference'], isArray: true },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ x: ['Org/1', 'Org/2'] });
  t.true(Array.isArray(result.x));
  t.is(result.x.length, 2);
});

test('builds identifier', t => {
  const profile = {
    identifier: { type: ['Identifier'] },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);

  const calls: any[] = [];
  const orig = dt.identifier;
  dt.identifier = (...args) => {
    calls.push(args);
    return 'MOCK';
  };

  const result = builder({ identifier: 'MRN-123' });
  dt.identifier = orig;

  t.is(calls.length, 1);
  t.deepEqual(calls[0], ['MRN-123']);
  t.is(result.identifier, 'MOCK');
});

test('builds single reference', t => {
  const profile = {
    x: { type: ['Reference'] },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ x: 'Organization/1' });
  t.deepEqual(result.x, { reference: 'Organization/1' });
});

test('builds CodeableConcept', t => {
  const profile = {
    x: {
      type: ['CodeableConcept'],
      valueSet: 'http://hl7.org/fhir/ValueSet/marital-status',
    },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ x: 'M' });
  t.is(result.x.coding[0].code, 'M');
});

test('builds composite value[x]', t => {
  const profile = {
    deceased: { type: ['boolean', 'dateTime'], isComposite: true },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ deceased: true });
  t.is(result.deceasedBoolean, true);
  t.is(result.deceased, undefined);
});

test('builds typeDef with nested extension', t => {
  const profile = {
    contact: {
      type: ['BackboneElement'],
      isArray: true,
      typeDef: {
        customExt: {
          extension: { url: 'http://example.org/ext/custom' },
          type: 'string',
        },
      },
    },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ contact: [{ customExt: 'hello' }] });
  t.is(result.contact[0].extension[0].url, 'http://example.org/ext/custom');
  t.is(result.contact[0].extension[0].value, 'hello');
});

test('skips nil properties', t => {
  const profile = {
    x: { type: ['Reference'] },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({});
  t.is(result.x, undefined);
});
