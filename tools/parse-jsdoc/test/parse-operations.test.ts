import test from 'ava';
import path from 'node:path';
import parseOperations from '../src/parse-operations';

test('should parse a single operation', async t => {
  const result = await parseOperations(path.resolve('test/example.js'));

  t.assert(result.length === 1);

  const [fn] = result;
  t.is(fn.name, 'operation');
  t.is(fn.description, 'A test operation');
  t.assert(fn.params.length === 1);
  t.assert(fn.returns.length === 1);
});

// it.skip('should parse a parameter', () => {
//   const result = parseOperations(path.resolve('test/example.js'));

//   expect(result).toHaveLength(1);
// });

// import chai, { expect } from 'chai';
// import path from 'node:path';
// import { describe, it } from 'node:test';
// import parseOperations from '../src/parse-operations';

// describe('parseOperations', () => {
//   it('should parse a single operation', async () => {
//     const result = await parseOperations(path.resolve('test/example.js'));

//     expect(result).to.have.lengthOf(1);
//     const [fn] = result;
//     expect(fn.name).to.equal('operation');
//     expect(fn.description).to.equal('A test operation');
//     expect(fn.params).to.have.lengthOf(1);
//     expect(fn.returns).to.have.lengthOf(1);
//   });

//   // it.skip('should parse a parameter', () => {
//   //   const result = parseOperations(path.resolve('test/example.js'));

//   //   expect(result).toHaveLength(1);
//   // });
// });
