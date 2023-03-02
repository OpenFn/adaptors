import test from 'ava';
import path from 'node:path';
import parseOperations from '../src/parse-operations';

test('should parse a single operation (as a function)', async t => {
  const result = await parseOperations(
    path.resolve('test/fixtures/operation-function.js')
  );

  t.assert(result.length === 1);

  const [fn] = result;
  t.is(fn.name, 'operation');
  t.is(fn.description, 'A test operation');
  t.assert(fn.params.length === 2);
  t.assert(fn.returns.length === 1);
});

test('should parse a single operation (as a const)', async t => {
  const result = await parseOperations(
    path.resolve('test/fixtures/operation-const.js')
  );

  t.assert(result.length === 1);

  const [fn] = result;
  t.is(fn.name, 'operation');
  t.is(fn.description, 'A test operation');
  t.assert(fn.params.length === 2);
  t.assert(fn.returns.length === 1);
});

test('should parse a parameter', async t => {
  const result = await parseOperations(
    path.resolve('test/fixtures/operation-function.js')
  );

  const [x, _y] = result[0].params;
  t.is(x.name, 'x');
  t.is(x.description, 'the input value');
});

test('should parse a parameter with a lookup', async t => {
  const result = await parseOperations(
    path.resolve('test/fixtures/operation-function.js')
  );

  const [_x, y] = result[0].params;
  t.is(y.name, 'y');
  t.is(y.description, 'the other input value');
  t.is(y.lookup, '$[*]');
});
