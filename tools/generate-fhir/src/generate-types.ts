import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print, parse } from 'recast';
import _ from 'lodash';
import { getBuilderName, getInterfaceName, getTypeName } from './util';
import { PropDef } from './generate-schema';
import { MappingSpec } from './types';

// Map some fhir types to js types
// TODO we should be able to take these from mappings
const typeMap = {
  time: 'string',
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
  Resource: 'any',
};

export const generateType = (
  resourceName: string,
  schema: Schema,
  mappings: MappingSpec,
  fhirTypes: Record<string, true> = {},
) => {
  const props = [];

  // // find the superset of schema keys and mappings keys
  const allKeys = Object.keys(
    Object.assign({}, schema.props, mappings.overrides),
  ).sort();

  // // Now for each key, build a type
  // // Note that mappings should overwrite schema if conflict
  for (const key of allKeys) {
    const s = schema.props[key] || {};
    const m = mappings.overrides[key] || {};

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
    let t = m.type || s.type || 'any';
    if (!Array.isArray(t)) {
      t = [t];
    }
    // Map the simple types and remove duplicates
    t = _.uniq(t.map(incomingType => typeMap[incomingType] ?? incomingType));
    // Now map them to nodes
    const types = t.map(t =>
      createTypeNode(
        t in fhirTypes ? `FHIR.${t}` : t,
        s.isArray,
        m.values || s.values,
        mappings.typeShorthands?.[t]?.filter(s => !t.includes(s)),
      ),
    );
    if (types.length == 1) {
      props.push(
        b.tsPropertySignature(
          b.identifier(key),
          b.tsTypeAnnotation(types[0]),
          true,
        ),
      );
    } else {
      props.push(
        b.tsPropertySignature(
          b.identifier(key),
          b.tsTypeAnnotation(b.tsUnionType(types)),
          true,
        ),
      );
    }
  }
  props.push(
    b.tsIndexSignature(
      [
        b.identifier.from({
          name: 'key',
          typeAnnotation: b.tsTypeAnnotation(b.tsStringKeyword()),
        }),
      ],
      b.tsTypeAnnotation(b.tsAnyKeyword()),
    ),
  );

  const t = b.exportDeclaration(
    false,
    b.tsTypeAliasDeclaration(
      b.identifier(getInterfaceName(schema)),
      b.tsTypeLiteral(props),
    ),
  );

  return t;
};

const generateInlineType = (typeDef: PropDef) => {
  const props: ts.TypeElement[] = [];
  // Sort keys alphabetically for consistent ordering
  const sortedKeys = Object.keys(typeDef).sort();
  for (let key of sortedKeys) {
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

// TODO maybe the sig is schema & mappings?
const createTypeNode = (
  type: string,
  isArray: boolean,
  values?: string[],
  shorthands?: string[],
) => {
  let node;
  // TODO restore and adapt this for values
  // if (values) {
  //   if (values.length > 1) {
  //     return b.createUnionTypeNode(values.map(v => b.createStringLiteral(v)));
  //   }
  //   if (values.length === 1) {
  //     // TODO an edge case, but for a single value
  //     return b.createStringLiteral(values[0]);
  //   }
  // }
  if (type) {
    // TODO why is this double wrapped??
    node = b.tsTypeReference(b.identifier(type));
  } else {
    node = b.tsAnyKeyword();
  }
  if (shorthands && shorthands.length) {
    node = b.tsUnionType([
      ...shorthands.map(s => b.tsTypeReference(b.identifier(s))),
      node,
    ]);
    if (isArray) {
      node = b.tsTypeReference(
        b.identifier('MaybeArray'),
        b.tsTypeParameterInstantiation([node]),
      );
    }
  } else if (isArray) {
    node = b.tsArrayType(node);
  }
  return node;

  // if (type === 'string') {
  //   return b.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
  // }

  // if (type) {
  //   return b.createTypeReferenceNode(type);
  // }

  // return b.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
};
