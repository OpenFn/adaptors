import * as acorn from 'acorn';

export default (source: string) => {
  const ast = acorn.parse(source, {
    sourceType: 'module',
    ecmaVersion: 'latest',
    locations: false,
  });

  const externalFunctions = ast.body
    .filter(i => i.type == 'ExportNamedDeclaration')
    .filter((i: any) => i.specifiers.length > 0 && i.source?.value)
    .filter((i: any) => i.source.value?.startsWith('@openfn/language-common'))
    .map((i: any) =>
      // extract a name for each export
      // watch out for patterns like `export {} from common/util
      i.specifiers?.map(s => {
        let namespace = i.source.value.split('/');
        // remove @openfn
        namespace.shift();
        // remove @language;
        namespace.shift();
        if (namespace.length) {
          return namespace.concat(s.exported.name).join('.');
        }
        return s.exported.name;
      })
    )
    .flat()
    .sort();

  return externalFunctions;
};
