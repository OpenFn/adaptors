import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print, parse } from 'recast';

import generateSchema from './generate-schema';
import generateDTS from './generate-dts';
import { StatementKind } from 'ast-types/gen/kinds';

const RESOURCE_NAME = 'resource';
const INPUT_NAME = 'props';

// TODO

type Mapping = {
  // mapping rules for a particular key
  // defaults, fn, etc
  defaults?: Record<string, any>;
};

// Schema to describe a particular prop
type Schema = {
  type: string;
  isArray: boolean;
  defaults: Record<string, any>;
};

const generateCode = (schema, mappings) => {
  const statements: n.Statement[] = [];

  // todo import the builder helpers
  statements.push(
    b.importDeclaration(
      [b.importSpecifier(b.identifier('builders'))],
      // TODO this path is wrong
      b.stringLiteral('../src/Utils.js')
    )
  );

  for (const type in mappings) {
    statements.push(generateBuilder(type, schema[type], mappings[type]));
  }

  const program = b.program(statements);

  return print(program).code;
};

export default generateCode;

const generateBuilder = (resourceName, schema, mappings) => {
  const body: StatementKind[] = [];

  body.push(initResource(resourceName));

  body.push(...mapProps(schema, mappings));

  body.push(addMeta(schema, mappings));

  body.push(returnResource());

  const fn = b.exportDeclaration(
    false,
    b.functionDeclaration(
      b.identifier(`create${resourceName}`),
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
