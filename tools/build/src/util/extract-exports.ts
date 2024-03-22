
import * as acorn from 'acorn';


export default (source: string) => {
  const ast = acorn.parse(source, {
    sourceType: 'module',
    ecmaVersion: 10,
    locations: false,
  });

  const externalFunctions = ast.body
    .filter(i => i.type == 'ExportNamedDeclaration')
    .filter(i => i.specifiers.length > 0)
    .filter(i => i.source.value == '@openfn/language-common')
    .map(i =>
      i.specifiers.map(s => {
        return s.exported.name;
      })
    )
    .flat()
    .sort()

  return externalFunctions

}