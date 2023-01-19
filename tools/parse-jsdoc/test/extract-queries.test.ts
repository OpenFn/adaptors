import test from 'ava';
import path from 'node:path';
import extractQueries from '../src/extract-lookups';

test('should extract queries', async t => {
  const result = await extractQueries(path.resolve('test/fixtures/example.js'));

  t.is(result.operation.y, '$[*]');
});
