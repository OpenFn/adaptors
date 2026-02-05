// Note that I can build typescript types with typescript's own ast
// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#creating-and-printing-a-typescript-ast

import ts from 'typescript';
import { getBuilderName, getTypeName } from './util';
import { PropDef } from './generate-schema';
import { MappingSpec } from './types';

const b = ts.factory;

// TODO primitive types like boolean, decimal. are they quite right?
// TODO duplicates (are other globals, like dom globals). maybe we should namespace after all
export const generateDataTypes = (
  schema: Record<string, Schema[]>,
  mappings: MappingSpec,
) => {
  const resultFile = ts.createSourceFile(
    'test.ts',
    '',
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ts.ScriptKind.TS,
  );
  const index: Record<string, true> = {};
  const statements: ts.NodeArray<ts.Node> = [];
  for (const resourceType in schema) {
    for (const profile of schema[resourceType]) {
      // skip primitives which we map to plain js
      if (profile.id in typeMap) {
        continue;
      }
      index[profile.id] = true;
      const ast = generateInterface(
        resourceType,
        profile,
        {},
        mappings.typeShorthands,
        profile.id,
      );
      statements.push(ast);
    }
  }
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // // needed to make the module register properly. Apparently.
  // const imp = b.createImportDeclaration(
  //   [],
  //   [],
  //   undefined,
  //   b.createStringLiteral('.')
  // );
  // const mod = b.createModuleDeclaration(
  //   [b.createToken(ts.SyntaxKind.DeclareKeyword)],
  //   b.createIdentifier('FHIR'),
  //   b.createModuleBlock(statements),
  //   ts.NodeFlags.GlobalAugmentation |
  //     // ts.NodeFlags.Ambient |
  //     ts.NodeFlags.ContextFlags
  // );

  const src = printer.printList(
    ts.ListFormat.SourceFileStatements,
    // statements.map(s => b.createExportDeclaration([], [], false, )),
    statements,
    resultFile,
  );

  return { src, index };
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
  } = {},
) => {
  let contents: ts.Statement[] = [];

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const resultFile = ts.createSourceFile(
    'test.ts',
    '',
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ts.ScriptKind.TS,
  );

  // Add an explicit import of globals.d.ts
  contents.push(
    b.createImportDeclaration(
      [],
      undefined,
      b.createStringLiteral('./globals'),
    ),
  );

  for (const resourceType in schema) {
    for (const profile of schema[resourceType]) {
      const name = getTypeName(profile);
      const overrides = Object.assign(
        {},
        mappings.overrides?.[resourceType]?.any,
        mappings.overrides?.[resourceType]?.[profile.id],
      );
      const typedef = generateType(
        name,
        profile,
        overrides,
        mappings.typeShorthands,
      );
      contents.push(typedef);
    }

    contents.push(
      ...generateEntryFuction(
        resourceType,
        schema[resourceType],
        options.simpleSignatures,
      ),
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
  simpleSignatures?: boolean,
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
          b.createIdentifier(`${resourceType}_${id}_Props`.replace(/-/g, '_')),
        ),
      ),
    ),
  );
  result.push(lookup);

  if (simpleSignatures) {
    const defaultProfile = schemas[0].id;
    const defaultTypeName = `${resourceType}_${defaultProfile}_Props`.replace(
      /-/g,
      '_',
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
            b.createTypeReferenceNode(defaultTypeName),
          ),
        ], // params
        undefined,
        undefined, // body
      ),
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
            b.createTypeReferenceNode(lookupTableName),
          ),
        ),
      ],
      [
        b.createParameterDeclaration(
          [],
          undefined,
          'type',
          undefined,
          b.createTypeReferenceNode('T'),
        ),
        b.createParameterDeclaration(
          [],
          undefined,
          'props',
          undefined,
          b.createIndexedAccessTypeNode(
            b.createIdentifier(lookupTableName),
            b.createIdentifier('T'),
          ),
        ),
      ], // params
      undefined,
      undefined, // body
    ),
  );

  result.push(fn);

  return result;
};

// note that this is kinda duplicated from generate-types
// because we use two different ast libraries
// TODO maybe the sig is schema & mappings?
const createTypeNode = (
  incomingType: string,
  isArray?: boolean,
  values?: string[],
  shorthands?: string[],
) => {
  let node;
  const type = typeMap[incomingType] ?? incomingType;

  if (values && values.length) {
    if (values.length > 1) {
      node = b.createUnionTypeNode(values.map(v => b.createStringLiteral(v)));
    } else if (values.length === 1) {
      // TODO an edge case, but for a single value
      node = b.createStringLiteral(values[0]);
    }
  }

  // if (type === 'string') {
  //   return b.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
  // }
  // console.log('>>', fhirTypes, y);
  // if (type in fhirTypes) {
  //   return b.createTypeReferenceNode(`JAM`);
  // }
  if (type) {
    node = b.createTypeReferenceNode(type);
  } else {
    node = b.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
  }
  if (shorthands?.length) {
    node = b.createUnionTypeNode(
      shorthands.map(s => b.createTypeReferenceNode(s)).concat(node),
    );
  } else if (isArray && !values) {
    node = b.createArrayTypeNode(node);
  }
  return node;
};

export const generateType = (
  resourceName: string,
  schema: Schema,
  mappingOverrides = {},
  typeShorthands: MappingSpec['typeShorthands'] = {},
  typeName?: string,
  includeExport = false,
) => {
  const props = [];

  // find the superset of schema keys and mappings keys
  const allKeys = Object.keys(
    Object.assign({}, schema.props, mappingOverrides),
  ).sort();

  // Now for each key, build a type
  // Note that mappings should overwrite schema if conflict
  for (const key of allKeys) {
    const s = schema.props[key] || {};
    const m = mappingOverrides[key] || {};

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

      let t = m.type || s.type || 'any';
      if (!Array.isArray(t)) {
        t = [t];
      }
      const types = t.map(t =>
        createTypeNode(t, s.isArray, m.values || s.values, typeShorthands[t]),
      );
      if (types.length === 1) {
        type = types[0];
      } else {
        type = b.createUnionTypeNode(types);
      }
    }
    if (s.desc) {
      props.push(b.createJSDocComment(s.desc + '\n'));
    }
    props.push(
      b.createPropertySignature(
        [],
        key,
        b.createToken(ts.SyntaxKind.QuestionToken),
        type,
      ),
    );
  }

  const t = b.createTypeAliasDeclaration(
    includeExport ? [b.createToken(ts.SyntaxKind.ExportKeyword)] : [],
    typeName || `${resourceName}_Props`,
    [], // generics
    b.createTypeLiteralNode(props),
  );

  return t;
};

// This generates a top-level datatype interface
// TODO it's almost a duplication of generateType - what can we re-use?
export const generateInterface = (
  resourceName: string,
  schema: Schema,
  mappingOverrides = {},
  typeShorthands: MappingSpec['typeShorthands'] = {},
  typeName?: string,
) => {
  const props = [];

  // find the superset of schema keys and mappings keys
  const allKeys = Object.keys(
    Object.assign({}, schema.props, mappingOverrides),
  ).sort();

  // Now for each key, build a type
  // Note that mappings should overwrite schema if conflict
  for (const key of allKeys) {
    const s = schema.props[key] || {};
    const m = mappingOverrides[key] || {};

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

      let t = m.type || s.type || 'any';
      if (!Array.isArray(t)) {
        t = [t];
      }
      const types = t.map(t =>
        createTypeNode(t, s.isArray, m.values || s.values, typeShorthands[t]),
      );
      if (types.length === 1) {
        type = types[0];
      } else {
        type = b.createUnionTypeNode(types);
      }
    }
    const propSig = b.createPropertySignature(
      [],
      key,
      b.createToken(ts.SyntaxKind.QuestionToken),
      type,
    );
    if (s.desc) {
      ts.addSyntheticLeadingComment(
        propSig,
        ts.SyntaxKind.MultiLineCommentTrivia,
        `* ${s.desc} `,
        true,
      );
    }
    props.push(propSig);
  }

  const t = b.createInterfaceDeclaration(
    [b.createToken(ts.SyntaxKind.ExportKeyword)],
    typeName,
    [], // generics,
    [], // heritage clauses
    props.filter((p): p is ts.TypeElement => ts.isPropertySignature(p)),
  );

  return t;
};

const generateInlineType = (typeDef: PropDef) => {
  const props: ts.TypeElement[] = [];
  for (let key in typeDef) {
    const useStringLiteral = /[\-\.\\\/\#\@\{\}\[\]]/.test(key);
    const { type, desc, values, isArray } = typeDef[key];

    const typeNode = createTypeNode(type, isArray, values);
    if (desc) {
      props.push(b.createJSDocComment(desc + '\n'));
    }
    props.push(
      b.createPropertySignature(
        [],
        useStringLiteral ? b.createStringLiteral(key) : key,
        undefined,
        typeNode,
      ),
    );
  }
  return b.createTypeLiteralNode(props);
};

export default generateDTS;
