import test from 'ava';
import path from 'node:path';
import extractQueries from '../src/extract-queries';

test.skip('should extract queries', async t => {
  const result = await extractQueries(path.resolve('test/fixtures/example.js'));

  t.is(result.operation.x, '$[*]');
});
