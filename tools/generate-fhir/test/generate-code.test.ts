import test from 'ava';
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

const generateProfile = (resourceType, props) => {
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

// Patient schema based on FHIR R4 spec (http://hl7.org/fhir/R4/patient.html).
const patientCode = generateProfile('Patient', {
  birthDate: {
    type: ['date'],
    isArray: false,
    desc: 'The date of birth for the individual',
  },
  identifier: {
    type: ['Identifier'],
    isArray: true,
    desc: 'An identifier for this patient',
  },
  managingOrganization: {
    type: ['Reference'],
    isArray: false,
    desc: 'Organization that is the custodian of the patient record',
  },
  generalPractitioner: {
    type: ['Reference'],
    isArray: true,
    desc: "Patient's nominated primary care provider",
  },
  maritalStatus: {
    type: ['CodeableConcept'],
    isArray: false,
    desc: 'Marital (civil) status of a patient',
    valueSet: 'http://hl7.org/fhir/ValueSet/marital-status',
  },
  deceased: {
    type: ['boolean', 'dateTime'],
    isArray: false,
    desc: 'Indicates if the individual is deceased or not',
    isComposite: true,
  },
  contact: {
    type: ['BackboneElement'],
    isArray: true,
    desc: 'A contact party (e.g. guardian, partner, friend) for the patient',
    typeDef: {
      customExt: {
        extension: { url: 'http://example.org/ext/custom' },
        type: 'string',
        desc: 'A custom extension for testing',
      },
    },
  },
});

test('patient: sets resourceType and spreads input props', t => {
  t.regex(patientCode, /resourceType: "Patient"/);
  t.regex(patientCode, /\.\.\.props/);
});

test('patient: does not generate dt calls for simple types', t => {
  t.notRegex(patientCode, /dt\.\w+\(.*birthDate/);
});

test('patient: generates dt.identifier', t => {
  t.regex(patientCode, /dt\.identifier\(props\.identifier\)/);
});

test('patient: generates dt.reference', t => {
  t.regex(patientCode, /dt\.reference\(props\.managingOrganization\)/);
});

test('patient: coerces Reference to array when isArray', t => {
  t.regex(patientCode, /Array\.isArray/);
  t.regex(patientCode, /dt\.reference\(props\.generalPractitioner\)/);
});

test('patient: generates dt.concept and dt.lookupValue for CodeableConcept', t => {
  t.regex(patientCode, /dt\.concept/);
  t.regex(patientCode, /dt\.lookupValue/);
  t.regex(patientCode, /marital-status/);
});

test('patient: generates typeDef mapping with nested extensions', t => {
  t.regex(patientCode, /dt\.addExtension/);
  t.regex(patientCode, /http:\/\/example\.org\/ext\/custom/);
});
