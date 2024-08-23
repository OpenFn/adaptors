import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print } from 'recast';

import generateSchema from './generate-schema';
import generateDTS from './generate-dts';
import { StatementKind } from 'ast-types/gen/kinds';

const RESOURCE_NAME = 'resource';
const INPUT_NAME = 'props';

const generateCode = (schema, mappings) => {
  const fns = [];

  for (const type in mappings) {
    fns.push(generateBuilder(type, schema[type], mappings[type]));
  }

  const program = b.program(fns);

  return print(program).code;
};

export default generateCode;

const generateBuilder = (resourceName, schema, mappings) => {
  const body: StatementKind[] = [];

  body.push(initResource());

  body.push(...mapProps(schema, mappings));

  body.push(addMeta(schema, mappings));

  body.push(returnResource());

  const fn = b.functionDeclaration(
    b.identifier(`create${resourceName}`),
    [b.identifier(INPUT_NAME)],
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

    const spec = schema.props[key];
    if (spec) {
      if (spec.type === 'string') {
        props.push(mapSimpleProp(key));
      }
      // TODO map other types
    } else {
      console.log('WARNING: schema does not define property', key);
    }
  }

  return props;
};

const mapSimpleProp = (propName, options = {}) => {
  return b.expressionStatement(
    b.assignmentExpression(
      '=',
      b.memberExpression(b.identifier(RESOURCE_NAME), b.identifier(propName)),
      b.memberExpression(b.identifier(INPUT_NAME), b.identifier(propName))
    )
  );
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

const initResource = () =>
  b.variableDeclaration('const', [
    b.variableDeclarator(b.identifier(RESOURCE_NAME), b.objectExpression([])),
  ]);

const returnResource = () => b.returnStatement(b.identifier(RESOURCE_NAME));
