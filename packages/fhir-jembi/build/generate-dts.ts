// Note that I can build tyepscript types with typescripts own ast
// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#creating-and-printing-a-typescript-ast

import ts from 'typescript';
import { getBuilderName } from './util';

const b = ts.factory;

// for a given list of mappings, generate a signature for the builder
// a possible difficulty here is that this is sort of guessing?
// it's duplicating similar logic to work out types
// maybe
const generateDTS = (schema, mappings) => {
  let contents = [];

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const resultFile = ts.createSourceFile(
    'test.ts',
    '',
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ts.ScriptKind.TS
  );

  // Add an explicit import of globals.d.ts
  contents.push(
    b.createImportDeclaration([], undefined, b.createStringLiteral('./globals'))
  );

  for (const type in mappings) {
    const typedef = generateType(type, schema[type], mappings[type]);
    const fn = generateBuilder(type, schema[type], mappings[type]);
    contents.push(typedef, fn);
  }

  return contents
    .map(n => printer.printNode(ts.EmitHint.Unspecified, n, resultFile))
    .join('\n\n');
};

// ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),

// TODO I really gonna need some utils here

// Map some fhir types to js types
const typeMap = {
  date: 'string',
  instant: 'string',
};

const generateType = (resourceName, schema, mappings) => {
  const props = [];

  // find the superset of schema keys and mappings keys
  const allKeys = Object.keys(Object.assign({}, schema.props, mappings));

  // Now for each key, build a type
  // Note that mappings should overwrite schema if conflict
  for (const key of allKeys) {
    const s = schema.props[key] || {};
    const m = mappings[key] || {};

    if (m == false || m.type === false) {
      // Ignore this key if it's mapped out
      continue;
    }

    // TODO handle keys like deceased[x] in Patient
    if (key.includes('[x]')) {
      console.log(` >> Skipping typings for `, key);
      continue;
    }

    let type = m.type || s.type || 'any';
    type = typeMap[type] ?? type;

    if (type === 'string') {
      type = b.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    } else {
      type = b.createTypeReferenceNode(type);
    }
    // console.log(type);

    props.push(b.createPropertySignature([], key, undefined, type));
  }

  const t = b.createExportDeclaration(
    [],
    false,
    b.createTypeAliasDeclaration(
      [],
      `${resourceName}Props`,
      [], // generics
      b.createTypeLiteralNode(props)
    )
  );

  return t;
};

const generateBuilder = (resourceName, schema, mappings) => {
  // TODO I think this needs an export
  const d = b.createExportDeclaration(
    [],
    false,
    b.createFunctionDeclaration(
      [b.createModifier(ts.SyntaxKind.DeclareKeyword)],
      undefined,
      getBuilderName(resourceName),
      [], // generics
      [
        b.createParameterDeclaration(
          [],
          undefined,
          'props',
          undefined,
          //b.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
          b.createTypeReferenceNode(`${resourceName}Props`)
        ),
      ], // params
      undefined,
      undefined // body
    )
  );

  return d;
};

export default generateDTS;
