import test from 'ava';
import ts from 'typescript';
import { dedupe } from '../src/util';

const b = ts.factory;
const printer = ts.createPrinter();
const sourceFile = ts.createSourceFile('', '', ts.ScriptTarget.Latest);

const print = (types: ts.TypeNode[]) =>
  types.map(t => printer.printNode(ts.EmitHint.Unspecified, t, sourceFile));

const string = () => b.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
const boolean = () => b.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
const ref = (name: string) => b.createTypeReferenceNode(name);

test('removes repeated types', t => {
  const result = dedupe([string(), string(), boolean()]);
  t.deepEqual(print(result), ['string', 'boolean']);
});

test('keeps the first occurrence of each type', t => {
  const result = dedupe([boolean(), string(), boolean()]);
  t.deepEqual(print(result), ['boolean', 'string']);
});

test('treats separate nodes that print the same as duplicates', t => {
  const result = dedupe([ref('Coding'), ref('Coding')]);
  t.deepEqual(print(result), ['Coding']);
});

test('keeps distinct types', t => {
  const result = dedupe([
    string(),
    b.createArrayTypeNode(string()),
    ref('Coding'),
    ref('CodeableConcept'),
  ]);
  t.deepEqual(print(result), ['string', 'string[]', 'Coding', 'CodeableConcept']);
});

test('returns empty and single inputs unchanged', t => {
  t.deepEqual(dedupe([]), []);
  const only = string();
  t.deepEqual(dedupe([only]), [only]);
});
