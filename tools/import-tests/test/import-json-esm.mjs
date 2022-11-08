import { strict as assert } from 'node:assert';
import pkg from '@openfn/language-common/package.json';

it('Should import common as a CJS module with import', () => {
  assert(pkg.name == "@openfn/language-common");
});