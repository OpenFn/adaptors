// Note that I can build tyepscript types with typescripts own ast
// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#creating-and-printing-a-typescript-ast

import ts from 'typescript';
import { getBuilderName, getTypeName } from './util';
import { PropDef } from './generate-schema';

const b = ts.factory;

// for a given list of mappings, generate a signature for the builder
// a possible difficulty here is that this is sort of guessing?
// it's duplicating similar logic to work out types
// maybe
const generateDTS = (
  schema: Record<string, Schema[]>,
  mappings: MappingSpec = {}
) => {
  let contents: ts.Statement[] = [];

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

  for (const resourceType in schema) {
    for (const profile of schema[resourceType]) {
      const name = getTypeName(profile);
      const overrides = Object.assign(
        {},
        mappings.overrides?.[resourceType]?.any,
        mappings.overrides?.[resourceType]?.[profile.id]
      );
      const typedef = generateType(name, profile, overrides);
      contents.push(typedef);
    }

    contents.push(...generateEntryFuction(resourceType, schema[resourceType]));
  }

  return contents
    .map(n => printer.printNode(ts.EmitHint.Unspecified, n, resultFile))
    .join('\n\n');
};

// ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),

// TODO I really gonna need some utils here

// Map some fhir types to js types
// TODO we should be able to take these from mappings
const typeMap = {
  date: 'string',
  instant: 'string',
  uri: 'string',
  id: 'string',

  // TODO
  canonical: 'any',
};

// Ths generates an entry function which maps the variants
const generateEntryFuction = (resourceType: string, schemas: Schema[]) => {
  const result = [];

  const v = `${resourceType}_variants`;

  // ok not a real enum
  // TODO maybe we could use keys rather than duplicate the declaration?
  // An optimisation for later I think
  const strs = b.createTypeAliasDeclaration(
    [],
    v,
    [], // generics
    b.createUnionTypeNode(schemas.map(({ id }) => b.createStringLiteral(id)))
  );
  result.push(strs);

  // create the lookup table
  const lookupTableName = `${resourceType}__lookups`;
  const lookup = b.createTypeAliasDeclaration(
    [],
    lookupTableName,
    [],
    b.createTypeLiteralNode(
      schemas.map(({ id }) =>
        b.createPropertySignature(
          [],
          b.createStringLiteral(id),
          undefined,
          b.createIdentifier(`${resourceType}_${id}_Props`.replace(/-/g, '_'))
        )
      )
    )
  );
  result.push(lookup);

  const fn = b.createExportDeclaration(
    [],
    false,
    b.createFunctionDeclaration(
      [b.createModifier(ts.SyntaxKind.DeclareKeyword)],
      undefined,
      getBuilderName(resourceType),
      [b.createTypeParameterDeclaration([], 'T', b.createIdentifier(v))], // generics
      [
        b.createParameterDeclaration(
          [],
          undefined,
          'type',
          undefined,
          b.createTypeReferenceNode(v)
        ),
        b.createParameterDeclaration(
          [],
          undefined,
          'props',
          undefined,
          b.createIndexedAccessTypeNode(
            b.createIdentifier(lookupTableName),
            b.createIdentifier('T')
          )
        ),
      ], // params
      undefined,
      undefined // body
    )
  );

  result.push(fn);

  return result;
};

const createTypeNode = (incomingType: string) => {
  const type = typeMap[incomingType] ?? incomingType;

  if (type === 'string') {
    return b.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
  } else if (type) {
    return b.createTypeReferenceNode(type);
  } else {
    // Default to any
    return b.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
  }
};

const generateType = (resourceName: string, schema: Schema, mappings) => {
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

    let type;
    if (s.typeDef) {
      type = generateInlineType(s.typeDef);
    } else {
      // TODO handle keys like deceased[x] in Patient
      if (key.includes('[x]')) {
        console.log(` >> Skipping typings for ${resourceName}.${key}`);
        continue;
      }

      type = createTypeNode(m.type || s.type || 'any');
    }
    if (s.desc) {
      props.push(b.createJSDocComment(s.desc + '\n'));
    }
    props.push(b.createPropertySignature([], key, undefined, type));
  }

  const t = b.createTypeAliasDeclaration(
    [],
    `${resourceName}_Props`,
    [], // generics
    b.createTypeLiteralNode(props)
  );

  return t;
};

const generateInlineType = (typeDef: PropDef) => {
  const props: ts.TypeElement[] = [];
  for (let key in typeDef) {
    const useStringLiteral = /[\-\.\\\/\#\@\{\}\[\]]/.test(key);
    const { type, desc } = typeDef[key];

    const typeNode = createTypeNode(type);
    if (desc) {
      props.push(b.createJSDocComment(desc + '\n'));
    }
    props.push(
      b.createPropertySignature(
        [],
        useStringLiteral ? b.createStringLiteral(key) : key,
        undefined,
        typeNode
      )
    );
  }
  return b.createTypeLiteralNode(props);
};

// actually we don't need to generate the builder signature itself?
// we only care about the entry signature
const generateBuilder = (resourceName, schema, mappings) => {
  // TODO I think this needs an export
  const d = b.createFunctionDeclaration(
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
        b.createTypeReferenceNode(`${resourceName}_Props`)
      ),
    ], // params
    undefined,
    undefined // body
  );

  return d;
};

export default generateDTS;
