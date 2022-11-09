const { strict: assert } = require('node:assert');
const { fn } = require('@openfn/language-common');

it('Should import common as a CJS module with require()', () => {
  const result = fn(() => 42)();
  
  assert(result === 42);
});