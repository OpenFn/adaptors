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
  return fn;
};

const compileBuilder = (code: string) => {
  const dt: any = {
    identifier: mock(),
    reference: mock(),
    concept: mock(),
    coding: mock(),
    lookupValue: mock((_url: any, code: any) => code),
    mapSystems: mock(),
    ensureConceptText: mock(() => {}),
    composite: mock((obj: any, key: any, value: any) => {
      const suffix: any = {
        boolean: 'Boolean',
        string: 'String',
        number: 'Integer',
      };
      obj[key + (suffix[typeof value] || 'String')] = value;
    }),
    addExtension: mock((resource: any, url: any, value: any) => {
      resource.extension ??= [];
      resource.extension.push({ url, value });
    }),
  };

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
  return {
    builder: mod.exports.default,
    dt,
  };
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

test('sets resourceType', t => {
  const profile = {};
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({});
  t.is(result.resourceType, 'Patient');
});

test('spreads unknown props through', t => {
  const profile = {};
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({ birthDate: '1990-01-01', customField: 42 });
  t.is(result.birthDate, '1990-01-01');
  t.is(result.customField, 42);
});

test('isArray wraps a single value into an array', t => {
  const profile = {
    x: { type: ['Reference'], isArray: true },
  };
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({ x: 'Org/1' });
  t.deepEqual(result.x, ['Org/1']);
  t.is(dt.reference.calls, 1);
});

test('isArray keeps an existing array as-is', t => {
  const profile = {
    x: { type: ['Reference'], isArray: true },
  };
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({ x: ['Org/1', 'Org/2'] });
  t.true(Array.isArray(result.x));
  t.is(result.x.length, 2);
  t.is(dt.reference.calls, 1);
});

test('calls dt.identifier for Identifier type', t => {
  const profile = {
    identifier: { type: ['Identifier'] },
  };
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({ identifier: 'MRN-123' });
  t.is(result.identifier, 'MRN-123');
  t.is(dt.identifier.calls, 1);
});

test.serial('builds single reference', t => {
  const profile = {
    x: { type: ['Reference'] },
  };
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({ x: 'Organization/1' });
  t.is(result.x, 'Organization/1');
  t.is(dt.reference.calls, 1);
});

test('builds CodeableConcept', t => {
  const profile = {
    x: {
      type: ['CodeableConcept'],
      valueSet: 'http://hl7.org/fhir/ValueSet/marital-status',
    },
  };
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({ x: 'M' });
  t.is(result.x, 'M');
  t.is(dt.concept.calls, 1);
});

test('builds composite value[x]', t => {
  const profile = {
    deceased: { type: ['boolean'], isComposite: true },
  };
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({ deceased: true });
  t.is(result.deceasedBoolean, true);
  t.is(result.deceased, undefined);
  t.is(dt.composite.calls, 1);
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
  const { builder, dt } = compileBuilder(schema);
  const result = builder({ contact: [{ customExt: 'hello' }] });
  t.is(result.contact[0].extension[0].url, 'http://example.org/ext/custom');
  t.is(result.contact[0].extension[0].value, 'hello');
  t.is(dt.addExtension.calls, 1);
});

test('builds primitive sibling extension from underscored slice input', t => {
  const profile = {
    birthDate: {
      type: ['date'],
      isArray: false,
    },
    _birthDate: {
      type: [],
      isArray: false,
      isPrimitiveExtension: true,
      typeDef: {
        birthTime: {
          extension: {
            url: 'http://hl7.org/fhir/StructureDefinition/patient-birthTime',
          },
          type: 'dateTime',
        },
      },
    },
  };
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({
    birthDate: '10/07/1990',
    _birthTime: '10am',
  });

  t.is(result.birthDate, '10/07/1990');
  t.is(result._birthTime, undefined);
  t.is(
    result._birthDate.extension[0].url,
    'http://hl7.org/fhir/StructureDefinition/patient-birthTime',
  );
  t.is(result._birthDate.extension[0].value, '10am');
  t.is(dt.addExtension.calls, 1);
});

test('builds primitive sibling extension from underscored parent shorthand', t => {
  const profile = {
    birthDate: {
      type: ['date'],
      isArray: false,
    },
    _birthDate: {
      type: [],
      isArray: false,
      isPrimitiveExtension: true,
      typeDef: {
        text: {
          extension: {
            url: 'http://example.org/fhir/StructureDefinition/text',
          },
          type: 'string',
        },
      },
    },
  };
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({
    birthDate: '10/07/1990',
    _birthDate: '10 july',
  });

  t.is(result.birthDate, '10/07/1990');
  t.is(
    result._birthDate.extension[0].url,
    'http://example.org/fhir/StructureDefinition/text',
  );
  t.is(result._birthDate.extension[0].value, '10 july');
  t.is(dt.addExtension.calls, 1);
});

test('skips nil properties', t => {
  const profile = {
    x: { type: ['Reference'] },
  };
  const schema = generateBuilder('Patient', profile);
  const { builder, dt } = compileBuilder(schema);
  const result = builder({});
  t.is(result.x, undefined);
});
