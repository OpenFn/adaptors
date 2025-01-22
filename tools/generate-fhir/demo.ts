import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print, parse } from 'recast';
import tsParser from 'recast/parsers/typescript';

const ast = parse('function x(y: string);', {
  parser: tsParser,
  //locations: false, // doesn't work
  tokens: false,
});

// Ths is unreadable :(
console.log(JSON.stringify(ast, null, 2));

// function render(node) => {
//   console.log(node)

// }
