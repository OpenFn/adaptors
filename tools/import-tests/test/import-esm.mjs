import { strict as assert } from 'node:assert';
import { fn } from '@openfn/language-common';

it('Should import common as an ESM module with import', () => {
  const result = fn(() => 42)();
  
  assert(result === 42);
});