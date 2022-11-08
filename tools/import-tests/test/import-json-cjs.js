const { strict: assert } = require('node:assert');
const json = require('@openfn/language-common/package.json');

it('Should import common/package.json as a CJS module with require()', () => {
  assert(json.name == "@openfn/language-common");
});