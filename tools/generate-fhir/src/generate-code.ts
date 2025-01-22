import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print, parse } from 'recast';

import { StatementKind } from 'ast-types/gen/kinds';
import { getBuilderName, getTypeName, sortKeys } from './util';
import { Mapping, MappingSpec, Schema } from './types';
import { generateType } from './generate-types';

const RESOURCE_NAME = 'resource';
const INPUT_NAME = 'props';

const generateCode = (
  schema: Record<string, Schema[]>,
  mappings: MappingSpec = {},
  options: { simpleSignatures?: boolean } = {}
): { builders: string; profiles: Record<string, string> } => {
  const statements: n.Statement[] = [];

  const imports: n.Statement[] = [];

  const profiles = {};

  // generate a builder for each profile
  const orderedResources = Object.keys(schema).sort();
  for (const resourceType of orderedResources) {
    // Note that the schema has already applied include/exclude filters
    const sortedProfiles = sortKeys(schema[resourceType]) as Schema[];
    for (const profile of sortedProfiles) {
      // import this builder
      const name = getTypeName(profile);
      imports.push(
        b.importDeclaration(
          [b.importDefaultSpecifier(b.identifier(name))],
          b.stringLiteral(`./profiles/${profile.id}`)
        )
      );

      profiles[profile.id] = generateProfile(
        profile,
        mappings.overrides?.[resourceType] ?? {}
      );

      // Generate an entrypoint function
      statements.push(
        ...generateEntry(
          name,
          resourceType,
          schema[resourceType],
          options.simpleSignatures
        )
      );
    }
  }

  const program = b.program([...imports, ...statements]);

  const builders = print(program).code;

  return { builders, profiles };
};

const generateProfile = (profile: Schema, mappings: MappingSpec) => {
  const statements = [];

  const overrides = Object.assign({}, mappings.any, mappings[profile.id]);

  statements.push(
    b.importDeclaration(
      [b.importNamespaceSpecifier(b.identifier('dt'))],
      b.stringLiteral('../datatypes.js')
    )
  );
  statements.push(
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier('_'))],
      b.stringLiteral('lodash')
    )
  );
  statements.push(
    b.importDeclaration(
      [b.importDefaultSpecifier(b.identifier('fhir'))],
      b.stringLiteral('fhir/r4')
    )
  );

  const typedef = generateType(profile.type, profile, mappings);

  statements.push(typedef);

  const fn = generateBuilder(profile, overrides);

  statements.push(b.exportDefaultDeclaration(fn));

  // TODO export default

  const program = b.program(statements);
  return print(program).code;
};

export default generateCode;

// For each prop in the schema, generate a prop in jsdocs
const generateJsDocs = (schema: Schema[]) => {
  const props: string[] = [];

  // TODO for now, just generate for the first schema
  const profile = schema[0];

  for (const propName in profile.props) {
    const prop = profile.props[propName];
    // TODO do I need the typemap here?
    props.push(`[props.${propName}] {${prop.type}} - ${prop.desc}`);
  }

  return props.map(p => `  * @param ${p}`).join('\n');
};

const generateEntry = (
  name: string,
  resourceType: string,
  variants: Schema[],
  simpleSignatures?: boolean
) => {
  const declarations = [];

  const statements = [];
  const comment = parse(`/**
  * Create a FHIR ${resourceType} resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant.${
    simpleSignatures ? ' Optional.' : ''
  }
  * @param props {object} - Properties to apply to the resource
${generateJsDocs(variants)}
 */
`);

  const map = b.variableDeclaration('const', [
    b.variableDeclarator(
      b.identifier('mappings'),
      b.objectExpression(
        variants.map(schema =>
          b.objectProperty(b.stringLiteral(schema.id), b.identifier(name))
        )
      )
    ),
  ]);
  statements.push(map);

  // Generate the main tssignature
  // Also push an override for the simple interface
  const signature = b.exportDeclaration(
    false,
    b.tsDeclareFunction(b.identifier(getBuilderName(resourceType)), [
      b.tsParameterProperty(
        b.identifier.from({
          name: 'type',
          typeAnnotation: b.tsTypeAnnotation(b.tsStringKeyword()),
        })
      ),
      b.tsParameterProperty(
        // TODO need a full type for this. Where do we get it?
        b.identifier.from({
          name: 'props',
          typeAnnotation: b.tsTypeAnnotation(b.tsObjectKeyword()),
        })
      ),
    ])
  );
  declarations.push(signature);

  if (simpleSignatures) {
    // TODO how do we know the default type?
    const handleOptionalType = parse(`// Handle optional type parameter
  if (typeof type !== "string") {
    props = type;
    type = "${variants[0].id}";
  }`);
    statements.push(...handleOptionalType.program.body);

    const override = b.exportDeclaration(
      false,
      b.tsDeclareFunction(b.identifier(getBuilderName(resourceType)), [
        b.tsParameterProperty(
          // TODO need a full type for this. Where do we get it?
          b.identifier.from({
            name: 'props',
            typeAnnotation: b.tsTypeAnnotation(b.tsObjectKeyword()),
          })
        ),
      ])
    );

    declarations.push(override);
  }

  // TODO handle errors for invalid types
  const mapper = parse(`
return mappings[type](props)
`);
  statements.push(...mapper.program.body);

  const ex = b.exportDeclaration(
    false,
    b.functionDeclaration(
      b.identifier(getBuilderName(resourceType)),
      [b.identifier('type'), b.identifier(INPUT_NAME)],
      b.blockStatement(statements)
    )
  );

  ex.comments = comment.program.comments;
  ex.comments![0].leading = true;
  declarations.push(ex);

  return declarations;
};

const generateBuilder = (schema, mappings) => {
  const body: StatementKind[] = [];

  body.push(initResource(schema.type));

  // this may be temporary
  // const setDefaults = parse('Object.assign(resource, props);');
  // body.push(...setDefaults.program.body);

  body.push(...mapProps(schema, mappings));

  body.push(addMeta(schema, mappings));

  body.push(returnResource());

  const fn = b.functionDeclaration(
    null,
    [
      b.identifier.from({
        name: INPUT_NAME,
        typeAnnotation: b.tsTypeAnnotation(
          b.tsTypeReference(
            b.identifier('Partial'),
            b.tsTypeParameterInstantiation([
              b.tsTypeReference(b.identifier(`${schema.type}_Props`)),
            ])
          )
        ),
      }),
    ],
    b.blockStatement(body)
  );

  return fn;
};

const mapProps = (schema, mappings) => {
  const props: StatementKind[] = [];

  for (const key in schema.props) {
    // skip this prop if the mappings is false (or its meta, which is special)
    if (mappings[key] === false || key === 'meta') {
      continue;
    }

    const spec = schema.props[key] as Schema;
    if (spec) {
      if (spec.isComposite) {
        // TODO a composite def may also have a typedef - how do we handle this?
        // maybe it's ok just to assign the top object hey?
        props.push(mapComposite(key, mappings[key], spec));
      } else if (spec.typeDef) {
        props.push(mapTypeDef(key, mappings[key], spec));
      } else {
        switch (spec.type) {
          case 'string':
          case 'Period':
            props.push(mapSimpleProp(key, mappings[key], spec));
            break;
          case 'Reference':
            props.push(mapReference(key, mappings[key], spec));
            break;
          case 'Identifier':
            props.push(mapIdentifier(key, mappings[key] || {}, spec));
            break;
          case 'CodeableConcept':
            props.push(mapCodeableConcept(key, mappings[key] || {}, spec));
            break;
          default:
            // console.warn(
            //   `WARNING: using simple mapping for ${schema.id}.${key}`
            // );
            props.push(mapSimpleProp(key, mappings[key], spec));
          // TODO: warn unused type
        }
      }
    } else {
      console.log('WARNING: schema does not define property', key);
    }
  }
  // now handle any mapped keys
  for (const key in mappings) {
    if (mappings[key]) {
      if (mappings[key].extension) {
        props.push(mapExtension(key, mappings[key]));
      }
      // TODO handle other types of mappings
    }
  }

  return props;
};

// This will generate a.b or a['z-y']
// allowing easy handling of property names that are not safe identifiers
const safelyRefProp = (objectName, propName) => {
  if (/[\-\.\\\/\#\@\{\}\[\]]/.test(propName)) {
    return b.memberExpression(b.identifier(objectName), b.literal(propName));
  }
  return b.memberExpression(b.identifier(objectName), b.identifier(propName));
};

// This runs a block of code only if the named property is in the input object
// TODO: don't use key in, use number || boolean || truthy
const ifPropInInput = (
  prop: string,
  statements: StatementKind[],
  alts?: StatementKind[],
  inputName = INPUT_NAME
) =>
  b.ifStatement(
    b.unaryExpression(
      '!',
      b.callExpression(
        b.memberExpression(b.identifier('_'), b.identifier('isNil')),
        [safelyRefProp(inputName, prop)]
      )
    ),
    b.blockStatement(statements),
    alts ? b.blockStatement(alts) : null
  );

// assigns SOMETHING to a prop on the input
const assignToInput = (prop: string, rhs) =>
  b.expressionStatement(
    b.assignmentExpression('=', safelyRefProp(RESOURCE_NAME, prop), rhs)
  );

// this generates a statement to add the default
const addDefaults = (propName: string, mapping: Mapping, schema: Schema) => {
  const defaults = mapping?.defaults ?? schema?.defaults;
  if (defaults) {
    // generate an assignment statement using the mappings
    const parsed = parse(
      `${RESOURCE_NAME}.${propName} = ${JSON.stringify(defaults)};`,
      {}
    );
    return parsed.program.body;
  }
};

// A simple prop will just take what's in the input and map it right across
// Mapping rules could add extra complications here, like aliasing and converting
const mapSimpleProp = (propName: string, mapping: Mapping, schema: Schema) => {
  if (propName === 'code') {
  }
  // This is the actual assignment
  const assignProp = assignToInput(
    propName,
    b.memberExpression(b.identifier(INPUT_NAME), b.identifier(propName))
  );

  const elseStatement = addDefaults(propName, mapping, schema);

  return ifPropInInput(propName, [assignProp], elseStatement);
};

// map a type def (ie, a nested object) property by property
// TODO this is designed to handle singletone and array types
// The array stuff adds a lot of complication and I need tests on both formats
const mapTypeDef = (propName: string, mapping: Mapping, schema: Schema) => {
  const statements: any[] = [];

  statements.push(
    b.variableDeclaration('let', [
      b.variableDeclarator(
        b.identifier('src'),
        b.memberExpression(b.identifier(INPUT_NAME), b.identifier(propName))
      ),
    ])
  );

  // Map the property name into an underscore var so it's always save
  // ie, what if hte prop is called `class` or `break` or `for`?
  const safePropName = `_${propName}`;

  if (schema.isArray) {
    // if this is an array type, we should force the input to be an array
    const ast = parse('if (!Array.isArray(src)) { src = [src]; }');
    statements.push(...ast.program.body);

    statements.push(
      b.expressionStatement(
        b.assignmentExpression(
          '=',
          b.memberExpression(
            b.identifier(RESOURCE_NAME),
            b.identifier(propName)
          ),
          b.arrayExpression([])
        )
      )
    );
  } else {
    statements.push(
      b.variableDeclaration('let', [
        b.variableDeclarator(
          b.identifier(safePropName),
          b.objectExpression([])
        ),
      ])
    );
  }

  const assignments: any[] = [];
  const inputName = schema.isArray ? 'item' : 'src';

  for (const prop in schema.typeDef) {
    const body: any[] = [];
    const alts = null;
    const spec = schema.typeDef[prop];

    const sourceValue = safelyRefProp(inputName, prop);

    if (spec.extension) {
      body.push(
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(
              b.identifier('dt'),
              b.identifier('addExtension')
            ),
            [
              b.identifier(safePropName),
              b.stringLiteral(spec.extension.url),
              sourceValue,
            ]
          )
        )
      );
    } else {
      body.push(
        b.expressionStatement(
          b.assignmentExpression(
            '=',
            b.memberExpression(b.identifier(safePropName), b.identifier(prop)),
            sourceValue
          )
        )
      );
    }

    assignments.push(ifPropInInput(prop, body, alts, inputName));
  }

  if (schema.hasSystem) {
    assignments.push(
      b.expressionStatement(
        b.assignmentExpression(
          '=',
          b.identifier(safePropName),
          b.callExpression(
            b.memberExpression(b.identifier('dt'), b.identifier('mapSystems')),
            [b.identifier(safePropName)]
          )
        )
      )
    );
  }

  if (schema.isArray) {
    assignments.splice(
      0,
      0,
      b.variableDeclaration('let', [
        b.variableDeclarator(
          b.identifier(safePropName),
          b.objectExpression([])
        ),
      ])
    );
    assignments.push(
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(
            b.memberExpression(
              b.identifier(RESOURCE_NAME),
              b.identifier(propName)
            ),
            b.identifier('push')
          ),
          [b.identifier(safePropName)]
        )
      )
    );
    statements.push(
      b.forOfStatement(
        b.variableDeclaration('let', [b.identifier('item')]),
        b.identifier('src'),
        b.blockStatement(assignments)
      )
    );
  } else {
    statements.push(...assignments);
    statements.push(
      b.expressionStatement(
        b.assignmentExpression(
          '=',
          b.memberExpression(
            b.identifier(RESOURCE_NAME),
            b.identifier(propName)
          ),
          b.identifier(safePropName)
        )
      )
    );
  }

  let elseStmnt;
  const d = addDefaults(propName, mapping, schema);
  if (d) {
    elseStmnt = d;
  }

  return ifPropInInput(propName, statements, elseStmnt);
};

const mapCodeableConcept = (
  propName: string,
  mapping: Mapping,
  schema: Schema
) => {
  // TODO maybe if the schema says this is an array, we can
  // massage the input or throw warnings
  // otherwise I think this is just a simple mapping tbh

  return mapSimpleProp(propName, mapping, schema);
};

// Map a property of the input to some extension
// This will add a new object to the Extexsion array
const mapExtension = (propName: string, mapping: Mapping) => {
  const callBuilder = b.expressionStatement(
    b.callExpression(
      b.memberExpression(b.identifier('dt'), b.identifier('addExtension')),
      [
        b.identifier(RESOURCE_NAME),
        b.stringLiteral(mapping.extension),
        b.memberExpression(b.identifier(INPUT_NAME), b.identifier(propName)),
      ]
    )
  );

  return ifPropInInput(propName, [callBuilder]);
};

const mapReference = (propName: string, _mapping: Mapping, schema: Schema) => {
  const statements: StatementKind[] = [];

  if (schema.isArray) {
    const mexp = `${INPUT_NAME}.${propName}`; // ie resource.identifier
    const ast = parse(`if (!Array.isArray(${mexp})) { ${mexp} = [${mexp}]; }`);
    statements.push(ast.program.body[0]);
  }

  const callBuilder = b.callExpression(
    b.memberExpression(b.identifier('dt'), b.identifier('reference')),
    [b.memberExpression(b.identifier(INPUT_NAME), b.identifier(propName))]
  );

  statements.push(assignToInput(propName, callBuilder));

  return ifPropInInput(propName, statements);
};

const mapComposite = (propName: string, _mapping: Mapping, _schema: Schema) => {
  const callBuilder = b.callExpression(
    b.memberExpression(b.identifier('dt'), b.identifier('composite')),
    // util.composite(resource, 'x'', input.x)
    [
      b.identifier(RESOURCE_NAME),
      b.stringLiteral(propName),
      b.memberExpression(b.identifier(INPUT_NAME), b.identifier(propName)),
    ]
  );

  return ifPropInInput(propName, [b.expressionStatement(callBuilder)]);
};

// this will ensure a meta prop on the data
const addMeta = (schema, _mapping) => {
  return b.expressionStatement(
    b.assignmentExpression(
      '=',
      b.memberExpression(b.identifier(RESOURCE_NAME), b.identifier('meta')),
      b.objectExpression([
        b.objectProperty(
          b.identifier('profile'),
          b.arrayExpression([b.stringLiteral(schema.url)])
        ),
      ])
    )
  );
};

const mapIdentifier = (name: string, _mapping: Mapping, schema: Schema) => {
  const defaultSystem = schema.defaults?.system;

  const statements: StatementKind[] = [];

  const createIdentifier = b.callExpression(
    b.memberExpression(b.identifier('dt'), b.identifier('identifier')),
    [
      b.memberExpression(b.identifier(INPUT_NAME), b.identifier(name)),
      defaultSystem && b.stringLiteral(defaultSystem),
    ].filter(ast => ast)
  );
  if (schema.isArray) {
    // if this is an array type, we should force the input to be an array
    // TODO it's probably a bit naughty to mutate the input data?

    const mexp = `${INPUT_NAME}.${name}`; // ie resource.identifier
    const ast = parse(`if (!Array.isArray(${mexp})) { ${mexp} = [${mexp}]; }`);
    statements.push(ast.program.body[0]);
  }

  statements.push(assignToInput(name, createIdentifier));
  return ifPropInInput(name, statements);
};

const initResource = (resourceType: string) => {
  const rt = b.objectProperty(
    b.identifier('resourceType'),
    b.stringLiteral(resourceType)
  );

  const t = `<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>${resourceType}</b></p></div>`;
  const text = b.objectProperty(
    b.identifier('text'),
    b.objectExpression([
      b.objectProperty(b.identifier('status'), b.stringLiteral('generated')),
      b.objectProperty(b.identifier('div'), b.stringLiteral(t)),
    ])
  );

  return b.variableDeclaration('const', [
    b.variableDeclarator(
      b.identifier(RESOURCE_NAME),
      b.objectExpression([rt, text])
    ),
  ]);
};

const returnResource = () => b.returnStatement(b.identifier(RESOURCE_NAME));
