import { strict as assert } from 'node:assert';
import pkg from '@openfn/language-common/package.json' assert { type: 'json' };

it('Should import common/package.json as an ES module with import', () => {
  assert(pkg.name == "@openfn/language-common");
});