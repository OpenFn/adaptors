import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print, parse } from 'recast';

import { StatementKind } from 'ast-types/gen/kinds';
import { getBuilderName, getTypeName } from './util';

const RESOURCE_NAME = 'resource';
const INPUT_NAME = 'props';

const generateCode = (schema, mappings) => {
  const statements: n.Statement[] = [];

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
  // const setDefaults = parse('Object.assign(resource, props);');
  // body.push(...setDefaults.program.body);

  body.push(...mapProps(schema, mappings));

  body.push(addMeta(schema, mappings));

  body.push(returnResource());

  const fn = b.functionDeclaration(
    b.identifier(getBuilderName(resourceName)),
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

    const spec = schema.props[key] as Schema;
    if (spec) {
      if (spec.typeDef) {
        props.push(mapTypeDef(key, spec));
      } else {
        switch (spec.type) {
          case 'string':
          case 'Reference':
          case 'Period':
            props.push(mapSimpleProp(key, mappings[key]));
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
            props.push(mapSimpleProp(key, mappings[key]));
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

// This runs a block of code only if the named property is in the input object
// TODO: don't use key in, use number || boolean || truthy
const ifPropInInput = (
  prop: string,
  statements: StatementKind[],
  alts?: StatementKind[],
  inputName = INPUT_NAME
) =>
  b.ifStatement(
    b.binaryExpression('in', b.stringLiteral(prop), b.identifier(inputName)),
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

// map a type def (ie, a nested object) property by property
// TODO this is designed to handle singletone and array types
// The array stuff adds a lot of complication and I need tests on both formats
const mapTypeDef = (propName: string, schema: Schema) => {
  const statements: any[] = [];

  statements.push(
    b.variableDeclaration('let', [
      b.variableDeclarator(
        b.identifier('src'),
        b.memberExpression(b.identifier(INPUT_NAME), b.identifier(propName))
      ),
    ])
  );

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
      b.variableDeclaration('const', [
        b.variableDeclarator(b.identifier(propName), b.objectExpression([])),
      ])
    );
  }

  const assignments: any[] = [];
  const inputName = schema.isArray ? 'item' : 'src';

  for (const prop in schema.typeDef) {
    const body: any[] = [];
    const spec = schema.typeDef[prop];

    const sourceValue = b.memberExpression(
      b.identifier(inputName),
      b.identifier(prop)
    );

    if (spec.extension) {
      body.push(
        b.expressionStatement(
          b.callExpression(
            b.memberExpression(
              b.identifier('builders'),
              b.identifier('addExtension')
            ),
            [
              b.identifier(propName),
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
            b.memberExpression(b.identifier(propName), b.identifier(prop)),
            sourceValue
          )
        )
      );
    }
    assignments.push(ifPropInInput(prop, body, undefined, inputName));
  }
  if (schema.isArray) {
    assignments.splice(
      0,
      0,
      b.variableDeclaration('const', [
        b.variableDeclarator(b.identifier(propName), b.objectExpression([])),
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
          [b.identifier(propName)]
        )
      )
    );
    statements.push(
      b.forOfStatement(
        b.variableDeclaration('const', [b.identifier('item')]),
        b.identifier('src'),
        b.blockStatement(assignments)
      )
    );
  } else {
    statements.push(...assignments);
  }

  return ifPropInInput(propName, statements);
};

const mapCodeableConcept = (
  propName: string,
  mapping: Mapping,
  _schema: Schema
) => {
  // TODO maybe if the schema says this is an array, we can
  // massage the input or throw warnings
  // otherwise I think this is just a simple mapping tbh

  return mapSimpleProp(propName, mapping);
};

// Map a property of the input to some extension
// This will add a new object to the Extexsion array
const mapExtension = (propName: string, mapping: Mapping) => {
  const callBuilder = b.expressionStatement(
    b.callExpression(
      b.memberExpression(
        b.identifier('builders'),
        b.identifier('addExtension')
      ),
      [
        b.identifier(RESOURCE_NAME),
        b.stringLiteral(mapping.extension),
        b.memberExpression(b.identifier(INPUT_NAME), b.identifier(propName)),
      ]
    )
  );

  return ifPropInInput(propName, [callBuilder]);
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
