// Note that I can build tyepscript types with typescripts own ast
// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#creating-and-printing-a-typescript-ast

import ts from 'typescript';

const b = ts.factory;

// for a given list of mappings, generate a signature for the builder
// a possible difficulty here is that this is sort of guessing?
// it's duplicating similar logic to work out types
// maybe
const generateDTS = (schema, mappings) => {
  const typedef = generateType('Encounter', schema, mappings);
  const fn = generateBuilder('Encounter', schema, mappings);

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const resultFile = ts.createSourceFile(
    'test.ts',
    '',
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ts.ScriptKind.TS
  );

  const contents = [typedef, fn]
    .map(n => printer.printNode(ts.EmitHint.Unspecified, n, resultFile))
    .join('\n\n');

  return contents;
};

// ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),

// TODO I really gonna need some utils here

const generateType = (resourceName, schema, mappings) => {
  const props = [];

  for (const key in mappings) {
    let type;
    const s = schema.props[key];
    if (s.type === 'string') {
      type = b.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    } else {
      type = b.createTypeReferenceNode(s.type);
    }
    // console.log(type);

    props.push(b.createPropertySignature([], key, undefined, type));
  }

  const t = b.createTypeAliasDeclaration(
    [],
    `${resourceName}Props`,
    [], // generics
    b.createTypeLiteralNode(props)
  );

  return t;
};

const generateBuilder = (resourceName, schema, mappings) => {
  // TODO all I really need now is for this to be a declare statement,
  // rather than an actual function
  // Would it be easier at this point to string template it?
  const d = b.createFunctionDeclaration(
    [],
    undefined,
    `create${resourceName}`,
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
    b.createBlock([])
  );

  return d;
};

export default generateDTS;
