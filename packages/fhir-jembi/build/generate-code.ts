import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print, parse } from 'recast';

import generateSchema from './generate-schema';
import generateDTS from './generate-dts';
import { StatementKind } from 'ast-types/gen/kinds';
import { getBuilderName, getTypeName } from './util';

const RESOURCE_NAME = 'resource';
const INPUT_NAME = 'props';

// TODO

const generateCode = (schema, mappings) => {
  const statements: n.Statement[] = [];

  // todo import the builder helpers
  statements.push(
    b.importDeclaration(
      [b.importSpecifier(b.identifier('builders'))],
      b.stringLiteral('./Utils.js')
    )
  );

  for (const type in mappings) {
    // generate a builder for each variant
    // statements.push(generateBuilder(type, schema[type], mappings[type]));
    // now generate an entry

    if (schema[type]) {
      statements.push(generateEntry(type, schema[type]));
      for (const variant of schema[type]) {
        const name = getTypeName(variant);
        statements.push(generateBuilder(name, variant, mappings[type]));
      }
    }
  }

  const program = b.program(statements);

  return print(program).code;
};

export default generateCode;

// TODO this isn't pretty but it works
// Note that I really need to standardize name builders for these things
const generateEntry = (resourceType: string, variants: Schema[]) => {
  const map = b.variableDeclaration('const', [
    b.variableDeclarator(
      b.identifier('mappings'),
      b.objectExpression(
        variants.map(schema =>
          b.objectProperty(
            b.stringLiteral(schema.id),
            b.identifier(
              `${getBuilderName(resourceType)}_${schema.id.replace(/-/g, '_')}`
            )
          )
        )
      )
    ),
  ]);

  // TODO handle errors for invalid types
  const mapper = parse(`
      return mappings[type](props)
    `);

  return b.exportDeclaration(
    false,
    b.functionDeclaration(
      b.identifier(getBuilderName(resourceType)),
      [b.identifier('type'), b.identifier(INPUT_NAME)],
      b.blockStatement([map, ...mapper.program.body])
    )
  );
};

const generateBuilder = (resourceName, schema, mappings) => {
  const body: StatementKind[] = [];

  body.push(initResource(schema.type));

  // this may be temporary
  const setDefaults = parse('Object.assign(resource, props);');
  body.push(...setDefaults.program.body);

  body.push(...mapProps(schema, mappings));

  body.push(addMeta(schema, mappings));

  body.push(returnResource());

  const fn = b.exportDeclaration(
    false,
    b.functionDeclaration(
      b.identifier(getBuilderName(resourceName)),
      [b.identifier(INPUT_NAME)],
      b.blockStatement(body)
    )
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
      switch (spec.type) {
        case 'string':
        case 'Reference':
        case 'Period':
          props.push(mapSimpleProp(key, mappings[key]));
          break;
        case 'Identifier':
          props.push(mapIdentifier(key, mappings[key] || {}, spec));
          break;
        default:
        // TODO: warn unused type
      }
    } else {
      console.log('WARNING: schema does not define property', key);
    }
  }

  return props;
};

// This runs a block of code only if the named property is in the input object
const ifPropInInput = (
  prop: string,
  statements: StatementKind[],
  alts?: StatementKind[]
) =>
  b.ifStatement(
    b.binaryExpression('in', b.stringLiteral(prop), b.identifier(INPUT_NAME)),
    b.blockStatement(statements),
    alts ? b.blockStatement(alts) : null
  );

// assigns SOMETHING to a prop on the input
const assignToInput = (prop: string, rhs) =>
  b.expressionStatement(
    b.assignmentExpression(
      '=',
      b.memberExpression(b.identifier(RESOURCE_NAME), b.identifier(prop)),
      rhs
    )
  );

// A simple prop will just take what's in the input and map it right across
// Mapping rules could add extra complications here, like aliasing and converting
const mapSimpleProp = (propName: string, mapping: Mapping) => {
  // This is the actual assignment
  const assignProp = assignToInput(
    propName,
    b.memberExpression(b.identifier(INPUT_NAME), b.identifier(propName))
  );

  let elseSatement;
  if (mapping?.defaults) {
    // generate an assignment statement using the mappings
    const parsed = parse(
      `${RESOURCE_NAME}.${propName} = ${JSON.stringify(mapping.defaults)};`,
      {}
    );
    elseSatement = parsed.program.body;
  }

  return ifPropInInput(propName, [assignProp], elseSatement);
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

const mapIdentifier = (name: string, mapping: Mapping, schema: Schema) => {
  const defaultSystem = schema.defaults?.system;

  const statements: StatementKind[] = [];

  const createIdentifier = b.callExpression(
    b.memberExpression(b.identifier('builders'), b.identifier('identifier')),
    [
      b.memberExpression(b.identifier(INPUT_NAME), b.identifier(name)),
      defaultSystem
        ? b.stringLiteral(defaultSystem)
        : b.identifier('undefined'),
    ]
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

const initResource = (resourceType: string) =>
  b.variableDeclaration('const', [
    b.variableDeclarator(
      b.identifier(RESOURCE_NAME),
      b.objectExpression([
        b.objectProperty(
          b.identifier('resourceType'),
          b.stringLiteral(resourceType)
        ),
      ])
    ),
  ]);

const returnResource = () => b.returnStatement(b.identifier(RESOURCE_NAME));
