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
          props.push(mapSimpleProp(key));
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
const ifPropInInput = (prop: string, ...statements) =>
  b.ifStatement(
    b.binaryExpression('in', b.stringLiteral(prop), b.identifier(INPUT_NAME)),
    b.blockStatement(statements)
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

const mapSimpleProp = (propName: string, options = {}) => {
  // This is the actual assignment
  const assignProp = assignToInput(
    propName,
    b.memberExpression(b.identifier(INPUT_NAME), b.identifier(propName))
  );

  return ifPropInInput(propName, assignProp);
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

  const statements: n.Statement[] = [];

  const createIdentifier = b.callExpression(
    b.memberExpression(b.identifier('builders'), b.identifier('identifier')),
    [
      b.memberExpression(b.identifier(INPUT_NAME), b.identifier(name)),
      b.stringLiteral(defaultSystem),
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
  return ifPropInInput(name, ...statements);
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
