import test from 'ava';
import path from 'node:path';
import extractQueries from '../src/extract-lookups';

test('should extract queries', async t => {
  const result = await extractQueries(
    path.resolve('test/fixtures/operation-const.js')
  );

  t.false(result.operation.x);
  t.is(result.operation.y, '$[*]');
});
