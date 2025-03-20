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

test('should generate a single builder and profile', t => {
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

test('should generate a simpler signature', t => {
  // eval the builder (will this work??)
});
