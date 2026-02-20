import { namedTypes as n, builders as b, ASTNode } from 'ast-types';
import { print, parse } from 'recast';

export type ValueSets = {
  [url: string]: Record<string, unknown>;
};

// Build this out as a string because the code is so trivial
export default (valueSets: ValueSets) => {
  const statements = ["import { builders } from '@openfn/language-fhir-4';"];

  for (const url in valueSets) {
    const values = JSON.stringify(valueSets[url]);

    // TODO make this prettier
    const template = `builders.setValues(
      '${url}',
      ${values},
      'default'
    )`;
    statements.push(template);
  }

  return statements.join('\n\n');
};
