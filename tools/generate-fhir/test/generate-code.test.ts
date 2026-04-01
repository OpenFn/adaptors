import test from 'ava';
import _ from 'lodash';
import { transformSync } from 'esbuild';
import generateCode from '../src/generate-code';

const mock = (impl: Function = (v: any) => v) => {
  const fn: any = (...args: any[]) => {
    fn.calls++;
    return impl(...args);
  };
  fn.calls = 0;
  fn.reset = () => { fn.calls = 0; };
  return fn;
};

const dt: any = {
  identifier: mock(),
  reference: mock(),
  concept: mock(),
  coding: mock(),
  lookupValue: mock((_url: any, code: any) => code),
  mapSystems: mock(),
  ensureConceptText: mock(() => {}),
  composite: mock((obj: any, key: any, value: any) => {
    const suffix: any = { boolean: 'Boolean', string: 'String', number: 'Integer' };
    obj[key + (suffix[typeof value] || 'String')] = value;
  }),
  addExtension: mock((resource: any, url: any, value: any) => {
    resource.extension ??= [];
    resource.extension.push({ url, value });
  }),
};

test.afterEach(() => {
  Object.values(dt).forEach((fn: any) => fn.reset?.());
});

const run = test.serial;

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

const generateBuilder = (resourceType: any, props: any) => {
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
  const { profiles } = generateCode(schema as any, {});
  return profiles[resourceType];
};

run('sets resourceType', t => {
  const profile = {};
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({});
  t.is(result.resourceType, 'Patient');
});

run('spreads unknown props through', t => {
  const profile = {};
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ birthDate: '1990-01-01', customField: 42 });
  t.is(result.birthDate, '1990-01-01');
  t.is(result.customField, 42);
});

run('isArray wraps a single value into an array', t => {
  const profile = {
    x: { type: ['Reference'], isArray: true },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ x: 'Org/1' });
  t.deepEqual(result.x, ['Org/1']);
  t.is(dt.reference.calls, 1);
});

run('isArray keeps an existing array as-is', t => {
  const profile = {
    x: { type: ['Reference'], isArray: true },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ x: ['Org/1', 'Org/2'] });
  t.true(Array.isArray(result.x));
  t.is(result.x.length, 2);
  t.is(dt.reference.calls, 1);
});

run('calls dt.identifier for Identifier type', t => {
  const profile = {
    identifier: { type: ['Identifier'] },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ identifier: 'MRN-123' });
  t.is(result.identifier, 'MRN-123');
  t.is(dt.identifier.calls, 1);
});

run('builds single reference', t => {
  const profile = {
    x: { type: ['Reference'] },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ x: 'Organization/1' });
  t.is(result.x, 'Organization/1');
  t.is(dt.reference.calls, 1);
});

run('builds CodeableConcept', t => {
  const profile = {
    x: {
      type: ['CodeableConcept'],
      valueSet: 'http://hl7.org/fhir/ValueSet/marital-status',
    },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ x: 'M' });
  t.is(result.x, 'M');
  t.is(dt.concept.calls, 1);
});

run('builds composite value[x]', t => {
  const profile = {
    deceased: { type: ['boolean'], isComposite: true },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({ deceased: true });
  t.is(result.deceasedBoolean, true);
  t.is(result.deceased, undefined);
  t.is(dt.composite.calls, 1);
});

run('builds typeDef with nested extension', t => {
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
  t.is(dt.addExtension.calls, 1);
});

run('skips nil properties', t => {
  const profile = {
    x: { type: ['Reference'] },
  };
  const schema = generateBuilder('Patient', profile);
  const builder = compileBuilder(schema);
  const result = builder({});
  t.is(result.x, undefined);
});
