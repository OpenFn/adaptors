import * as acorn from 'acorn';
// TODO: need to replace with import assertions soon
import { importAssertions } from 'acorn-import-assertions';

export default (source: string) => {
  const ast = acorn.Parser.extend(importAssertions).parse(source, {
    sourceType: 'module',
    ecmaVersion: 'latest',
    locations: false,
  });

  const externalFunctions = ast.body
    .filter(i => i.type == 'ExportNamedDeclaration')
    .filter((i: any) => i.specifiers.length > 0 && i.source?.value)
    .filter((i: any) => i.source.value == '@openfn/language-common')
    .map((i: any) =>
      i.specifiers.map(s => {
        return s.exported.name;
      })
    )
    .flat()
    .sort();

  return externalFunctions;
};
