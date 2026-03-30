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

test.skip('should generate a single builder and profile', t => {
  const schema = {
    Patient: [
      {
        id: 'patient',
        type: 'Patient',
        url: 'https://ihir.openfn.org/patient',
        props: {
          id: {
            type: 'string',
            isArray: false,
            desc: 'Logical id of this artifact',
            isComposite: false,
          },
          name: {
            type: 'HumanName',
            isArray: true,
            desc: 'A name associated with the patient',
          },
        },
      },
    ],
  };

  const result = generateCode(schema, {});

  const { builders, profiles } = result;
  // find the import
  t.regex(builders, /import Patient_patient from "\.\/profiles\/patient";/i);
  // find the named export
  t.regex(builders, /export function patient\(type, props\)/);
  // trap the key mapping line
  t.regex(builders, /"patient": Patient_patient/);

  // Find the default export
  t.regex(profiles.patient, /export default function\(props\)/i);
  // Track the datatype import
  t.regex(profiles.patient, /import \* as util from ".\/utils\.js";/i);
  // Track the right resource type is being created
  t.regex(profiles.patient, /resourceType: "Patient"/i);
});

test.skip('should generate a simpler signature', t => {
  // eval the builder (will this work??)
});

test('sets resourceType', t => {
  const profiles = generateBuilder('Patient', {});
  const builder = compileBuilder(profiles);
  const result = builder({});
  t.is(result.resourceType, 'Patient');
});

test('spreads simple props through', t => {
  const code = generateBuilder('Patient', {
    birthDate: { type: ['date'], isArray: false, desc: 'date of birth' },
  });
  const builder = compileBuilder(code);
  const result = builder({ birthDate: '1990-01-01', customField: 42 });
  t.is(result.birthDate, '1990-01-01');
  t.is(result.customField, 42);
});

test('builds identifier', t => {
  const code = generateBuilder('Patient', {
    identifier: { type: ['Identifier'], isArray: true, desc: 'patient id' },
  });
  const builder = compileBuilder(code);
  const result = builder({ identifier: 'MRN-123' });
  t.true(Array.isArray(result.identifier));
  t.is(result.identifier[0].value, 'MRN-123');
});

test('builds single reference', t => {
  const code = generateBuilder('Patient', {
    managingOrganization: { type: ['Reference'], isArray: false, desc: 'org' },
  });
  const builder = compileBuilder(code);
  const result = builder({ managingOrganization: 'Organization/1' });
  t.deepEqual(result.managingOrganization, { reference: 'Organization/1' });
});

test('builds reference array', t => {
  const code = generateBuilder('Patient', {
    generalPractitioner: { type: ['Reference'], isArray: true, desc: 'gp' },
  });
  const builder = compileBuilder(code);
  const result = builder({
    generalPractitioner: ['Practitioner/1', 'Practitioner/2'],
  });
  t.true(Array.isArray(result.generalPractitioner));
  t.is(result.generalPractitioner.length, 2);
  t.is(result.generalPractitioner[0].reference, 'Practitioner/1');
});

test('builds CodeableConcept', t => {
  const code = generateBuilder('Patient', {
    maritalStatus: {
      type: ['CodeableConcept'],
      isArray: false,
      desc: 'marital status',
      valueSet: 'http://hl7.org/fhir/ValueSet/marital-status',
    },
  });
  const builder = compileBuilder(code);
  const result = builder({ maritalStatus: 'M' });
  t.truthy(result.maritalStatus);
  t.is(result.maritalStatus.coding[0].code, 'M');
});

test('builds composite value[x]', t => {
  const code = generateBuilder('Patient', {
    deceased: {
      type: ['boolean', 'dateTime'],
      isArray: false,
      desc: 'deceased',
      isComposite: true,
    },
  });
  const builder = compileBuilder(code);
  const result = builder({ deceased: true });
  t.is(result.deceasedBoolean, true);
  t.is(result.deceased, undefined);
});

test('builds typeDef with nested extension', t => {
  const code = generateBuilder('Patient', {
    contact: {
      type: ['BackboneElement'],
      isArray: true,
      desc: 'contact party',
      typeDef: {
        customExt: {
          extension: { url: 'http://example.org/ext/custom' },
          type: 'string',
          desc: 'custom ext',
        },
      },
    },
  });
  const builder = compileBuilder(code);
  const result = builder({ contact: [{ name: 'Smith', customExt: 'hello' }] });
  t.true(Array.isArray(result.contact));
  t.is(result.contact[0].extension[0].url, 'http://example.org/ext/custom');
  t.is(result.contact[0].extension[0].value, 'hello');
});

test('skips nil properties', t => {
  const code = generateBuilder('Patient', {
    identifier: { type: ['Identifier'], isArray: true, desc: 'id' },
    managingOrganization: { type: ['Reference'], isArray: false, desc: 'org' },
  });
  const builder = compileBuilder(code);
  const result = builder({});
  t.is(result.identifier, undefined);
  t.is(result.managingOrganization, undefined);
});
