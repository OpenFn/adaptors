import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print } from 'recast';

import generateSchema from './generate-schema';
import generateDTS from './generate-dts';
import { StatementKind } from 'ast-types/gen/kinds';

const RESOURCE_NAME = 'resource';
const INPUT_NAME = 'props';

const generateCode = (schema, mappings) => {
  // build an ast
  // convert the the ast to source

  const fns = [];

  fns.push();

  const fn = generateBuilder('Encounter', schema, mappings);

  return print(fn).code;
};

export default generateCode;

const generateBuilder = (resourceName, schema, mappings) => {
  const body: StatementKind[] = [];

  body.push(initResource());

  body.push(...mapProps(schema, mappings));

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

  for (const key in mappings) {
    const spec = schema.props[key];
    if (spec) {
      if (spec.type === 'string') {
        props.push(mapSimpleProp(key));
      }
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

const initResource = () =>
  b.variableDeclaration('const', [
    b.variableDeclarator(b.identifier(RESOURCE_NAME), b.objectExpression([])),
  ]);

const returnResource = () => b.returnStatement(b.identifier(RESOURCE_NAME));
