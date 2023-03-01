import test from 'ava';
import path from 'node:path';
import extractLookups from '../src/extract-lookups';

test('should extract lookups for function parameters', async t => {
  const result = await extractLookups(
    path.resolve('test/fixtures/operation-const.js')
  );

  t.false(result.operation.x);
  t.is(result.operation.y, '$[*]');
});
