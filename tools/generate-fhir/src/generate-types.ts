import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print, parse } from 'recast';

import { getBuilderName, getTypeName } from './util';
import { PropDef } from './generate-schema';
import { MappingSpec } from './types';

// Map some fhir types to js types
// TODO we should be able to take these from mappings
const typeMap = {
  date: 'string',
  dateTime: 'string',
  instant: 'string',
  uri: 'string',
  id: 'string',
  decimal: 'number',
  integer: 'number',
  unsignedInt: 'number',

  // TODO
  canonical: 'any',
};

// These type defs will all reference back to fhir4
const datatypes = {
  Identifier: 1,
};

export const generateType = (
  resourceName: string,
  schema: Schema,
  mappings: MappingSpec
) => {
  const props = [];

  // // find the superset of schema keys and mappings keys
  const allKeys = Object.keys(Object.assign({}, schema.props, mappings));

  // // Now for each key, build a type
  // // Note that mappings should overwrite schema if conflict
  for (const key of allKeys) {
    const s = schema.props[key] || {};
    const m = mappings[key] || {};

    if (m == false || m.type === false) {
      // Ignore this key if it's mapped out
      continue;
    }

    // TODO need to handle this stuff!
    // let type;
    // if (s.typeDef) {
    //   type = generateInlineType(s.typeDef);
    // } else {
    //   // TODO handle keys like deceased[x] in Patient
    //   if (key.includes('[x]')) {
    //     console.log(` >> Skipping typings for ${resourceName}.${key}`);
    //     continue;
    //   }

    // type = createTypeNode(m.type || s.type || 'any', m.values || s.values);
    // }
    // if (s.desc) {
    //   props.push(b.createJSDocComment(s.desc + '\n'));
    // }
    // props.push(b.createPropertySignature([], key, undefined, type));

    // simplified
    const type = createTypeNode(
      m.type || s.type || 'any',
      m.values || s.values
    );
    props.push(
      b.tsPropertySignature(b.identifier(key), b.tsTypeAnnotation(type), true)
    );
  }

  const t = b.exportDeclaration(
    false,
    b.tsTypeAliasDeclaration(
      b.identifier(`${resourceName}_Props`),
      b.tsTypeLiteral(props)
    )
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

// TODO maybe the sig is schema & mappings?
const createTypeNode = (incomingType: string, values?: string[]) => {
  const type = typeMap[incomingType] ?? incomingType;
  console.log(' >>> ', type);

  if (datatypes[type]) {
    // TODO why is this double wrapped??
    return b.tsTypeReference(
      b.tsQualifiedName(b.identifier('fhir'), b.identifier(type))
    );
  }
  return b.tsAnyKeyword();
  // if (values) {
  //   if (values.length > 1) {
  //     return b.createUnionTypeNode(values.map(v => b.createStringLiteral(v)));
  //   }
  //   if (values.length === 1) {
  //     // TODO an edge case, but for a single value
  //     return b.createStringLiteral(values[0]);
  //   }
  // }

  // if (type === 'string') {
  //   return b.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
  // }

  // if (type) {
  //   return b.createTypeReferenceNode(type);
  // }

  // return b.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
};
