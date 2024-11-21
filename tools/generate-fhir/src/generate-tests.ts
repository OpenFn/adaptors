// first generate super simple stub test for each type
import { print, parse } from 'recast';
import { namedTypes as n, builders as b, ASTNode } from 'ast-types';

import { MappingSpec, ProfileSpec, Schema } from './types';
import { getBuilderName, shouldIgnoreProfile, sortKeys } from './util';

type FilePath = string;
type Content = string;

type TestSpec = Record<FilePath, Content>;

const generate = (
  schema: Record<string, Schema[]>,
  mappings: MappingSpec = {}
) => {
  // test gen won't clean up after itself
  // Tests are really only support to be a one-time template
  // We expect tests to be modified after generation

  const files: TestSpec = {};

  const orderedResources = Object.keys(schema).sort();
  for (const resourceType of orderedResources) {
    const sortedProfiles = sortKeys(schema[resourceType]);

    const testPath = `test/${resourceType}.test.js`;
    const statements: n.Statement[] = [];

    statements.push(
      b.importDeclaration(
        [
          b.importSpecifier(b.identifier('expect')),
          b.importSpecifier(b.identifier('assert')),
        ],
        b.stringLiteral('chai')
      )
    );

    statements.push(
      b.importDeclaration(
        [b.importNamespaceSpecifier(b.identifier('builders'))],
        b.stringLiteral('../src/builders.js')
      )
    );

    for (const profile of sortedProfiles) {
      if (shouldIgnoreProfile(profile, mappings)) {
        continue;
      }
      const tests: n.Statement[] = [];

      tests.push(createTestStub(profile));

      // TODO for each example in the spec, generate a skipped test

      // create a describe block
      const describe = createDescribeBlock(profile.id, tests);
      statements.push(describe);
    }

    files[testPath] = print(b.program(statements)).code;
  }
  return files;
};

const createDescribeBlock = (profileId: string, tests: n.Statement[]) =>
  b.expressionStatement(
    b.callExpression(b.identifier('describe'), [
      b.stringLiteral(profileId),
      b.arrowFunctionExpression([], b.blockStatement(tests)),
    ])
  );

const createTestStub = (profile: Schema) => {
  const createResource = b.variableDeclaration('const', [
    b.variableDeclarator(
      b.identifier('resource'),
      b.callExpression(
        b.memberExpression(
          b.identifier('builders'),
          b.identifier(getBuilderName(profile.type))
        ),
        [b.stringLiteral(profile.id), b.objectExpression([])]
      )
    ),
  ]);
  const assertResource = b.expressionStatement(
    b.callExpression(
      b.memberExpression(b.identifier('assert'), b.identifier('isOk')),
      [b.identifier('resource')]
    )
  );
  return b.expressionStatement(
    b.callExpression(b.identifier('it'), [
      b.stringLiteral(`should create a simple ${profile.id}`),
      b.arrowFunctionExpression(
        [],
        b.blockStatement([createResource, assertResource])
      ),
    ])
  );
};

export default generate;
