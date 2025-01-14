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

test('should generate a single builder function', () => {
  const schema = {};
});
