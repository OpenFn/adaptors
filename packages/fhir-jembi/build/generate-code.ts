import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print } from 'recast';

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

  body.push(initResource());

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

// mapIdentifier
// this needs to read identifier from the source (as string or concept)
// and call an Identifier helper
// needs to default the system if not provided
// TODO this needs to be robust if the incoming identifier is not an array
// although tbh I think i always will be?
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
    // If this is an array of identifiers, initialise a new array
    statements.push(assignToInput(name, b.arrayExpression([])));
    // Then map a new identifier object and add it to the array
    // Note that we only support one input identifier at the moment though
    // We really ought to be able to detect that that incoming object is an array
    // and map each one
    // Alternatively, builders.idenitifer should be smart enough that if it
    // is given an array, it'll return an array
    // That's probably nicer because it means less gnarly code gen
    statements.push(
      b.expressionStatement(
        b.callExpression(
          b.memberExpression(
            b.memberExpression(b.identifier(RESOURCE_NAME), b.identifier(name)),
            b.identifier('push')
          ),
          [createIdentifier]
        )
      )
    );
  } else {
    statements.push(assignToInput(name, createIdentifier));
  }
  return ifPropInInput(name, ...statements);
};

const initResource = () =>
  b.variableDeclaration('const', [
    b.variableDeclarator(b.identifier(RESOURCE_NAME), b.objectExpression([])),
  ]);

const returnResource = () => b.returnStatement(b.identifier(RESOURCE_NAME));
