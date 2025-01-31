// Note that I can build tyepscript types with typescripts own ast
// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#creating-and-printing-a-typescript-ast

import ts from 'typescript';
import { getBuilderName, getTypeName } from './util';
import { PropDef } from './generate-schema';

const b = ts.factory;

// TODO primitive types like boolean, decimal. are they quite right?
// TODO duplicates (are other globals, like dom globals). maybe we should namespace after all
export const generateDataTypes = (schema: Record<string, Schema[]>) => {
  const resultFile = ts.createSourceFile(
    'test.ts',
    '',
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ts.ScriptKind.TS
  );
  // tmp
  const statements: any[] = [];
  for (const resourceType in schema) {
    for (const profile of schema[resourceType]) {
      // skip primitives which we map to plain js
      if (profile.id in typeMap) {
        continue;
      }
      const ast = generateType(resourceType, profile, {}, profile.id);
      statements.push(ast);
    }
  }
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // needed to make the module register properly. Apparently.
  const imp = b.createImportDeclaration(
    [],
    [],
    undefined,
    b.createStringLiteral('.')
  );
  const mod = b.createModuleDeclaration(
    [b.createToken(ts.SyntaxKind.DeclareKeyword)],
    b.createIdentifier('global'),
    b.createModuleBlock(statements),
    ts.NodeFlags.GlobalAugmentation |
      // ts.NodeFlags.Ambient |
      ts.NodeFlags.ContextFlags
  );

  return printer.printList(
    ts.ListFormat.SourceFileStatements,
    [imp, mod],
    resultFile
  );
};

// for a given list of mappings, generate a signature for the builder
// a possible difficulty here is that this is sort of guessing?
// it's duplicating similar logic to work out types
// maybe
const generateDTS = (
  schema: Record<string, Schema[]>,
  mappings: MappingSpec = {},
  options: {
    simpleSignatures?: boolean;
  } = {}
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

    contents.push(
      ...generateEntryFuction(
        resourceType,
        schema[resourceType],
        options.simpleSignatures
      )
    );
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
  dateTime: 'string',
  instant: 'string',
  time: 'string',
  uri: 'string',
  id: 'string',
  decimal: 'number',
  integer: 'number',
  positiveInt: 'number',
  unsignedInt: 'number',
  string: 'string',
  boolean: 'boolean',

  // TODO
  canonical: 'any',
};

// Ths generates an entry function which maps the variants
const generateEntryFuction = (
  resourceType: string,
  schemas: Schema[],
  simpleSignatures?: boolean
) => {
  const result = [];

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

  if (simpleSignatures) {
    const defaultProfile = schemas[0].id;
    const defaultTypeName = `${resourceType}_${defaultProfile}_Props`.replace(
      /-/g,
      '_'
    );
    const fn2 = b.createExportDeclaration(
      [],
      false,
      b.createFunctionDeclaration(
        [b.createModifier(ts.SyntaxKind.DeclareKeyword)],
        undefined,
        getBuilderName(resourceType),
        [
          // generics
        ],
        [
          b.createParameterDeclaration(
            [],
            undefined,
            'props',
            undefined,
            b.createTypeReferenceNode(defaultTypeName)
          ),
        ], // params
        undefined,
        undefined // body
      )
    );

    result.push(fn2);
  }

  const fn = b.createExportDeclaration(
    [],
    false,
    b.createFunctionDeclaration(
      [b.createModifier(ts.SyntaxKind.DeclareKeyword)],
      undefined,
      getBuilderName(resourceType),
      [
        // generics
        b.createTypeParameterDeclaration(
          [],
          'T',
          b.createTypeOperatorNode(
            ts.SyntaxKind.KeyOfKeyword,
            b.createTypeReferenceNode(lookupTableName)
          )
        ),
      ],
      [
        b.createParameterDeclaration(
          [],
          undefined,
          'type',
          undefined,
          b.createTypeReferenceNode('T')
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

// TODO maybe the sig is schema & mappings?
const createTypeNode = (incomingType: string, values?: string[]) => {
  const type = typeMap[incomingType] ?? incomingType;

  if (values) {
    if (values.length > 1) {
      return b.createUnionTypeNode(values.map(v => b.createStringLiteral(v)));
    }
    if (values.length === 1) {
      // TODO an edge case, but for a single value
      return b.createStringLiteral(values[0]);
    }
  }

  if (type === 'string') {
    return b.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
  }

  if (type) {
    return b.createTypeReferenceNode(type);
  }

  return b.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
};

export const generateType = (
  resourceName: string,
  schema: Schema,
  mappings = {},
  typeName?: string
) => {
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

      type = createTypeNode(m.type || s.type || 'any', m.values || s.values);
    }
    if (s.desc) {
      props.push(b.createJSDocComment(s.desc + '\n'));
    }
    props.push(
      b.createPropertySignature(
        [],
        key,
        b.createToken(ts.SyntaxKind.QuestionToken),
        type
      )
    );
  }

  const t = b.createTypeAliasDeclaration(
    [],
    typeName || `${resourceName}_Props`,
    [], // generics
    b.createTypeLiteralNode(props)
  );

  return t;
};

const generateInlineType = (typeDef: PropDef) => {
  const props: ts.TypeElement[] = [];
  for (let key in typeDef) {
    const useStringLiteral = /[\-\.\\\/\#\@\{\}\[\]]/.test(key);
    const { type, desc, values } = typeDef[key];

    const typeNode = createTypeNode(type, values);
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

export default generateDTS;
