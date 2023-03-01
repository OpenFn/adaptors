import parseOperations from './parse-operations';
import parseTs from './parse-ts';

type LookupMap = {
  [operation: string]: {
    [paramName: string]: string;
  };
};

const extractJsLookups = async (path: string) => {
  const operations = await parseOperations(path);

  return operations?.reduce((result: LookupMap, fn) => {
    if (fn.params) {
      result[fn.name] = fn.params.reduce((params, p) => {
        if (p.lookup) {
          params[p.name] = p.lookup;
        }
        return params;
      }, {} as { [paramName: string]: string });
    }
    return result;
  }, {});
};

const extractTsLookups = async (path: string) => {
  const types = await parseTs(path);

  return types?.reduce((result: LookupMap, iface) => {
    // TODO come back and look at typings
    // @ts-ignore
    const lookups = iface.type?.declaration?.children
      .filter((dec: any) => dec.kindString === 'Property')
      .reduce((acc: any, prop: any) => {
        if (prop.comment?.blockTags?.length) {
          const lookup = prop.comment?.blockTags?.find(
            ({ tag }: any) => tag === '@lookup'
          );
          if (lookup) {
            acc[prop.name] = lookup.content[0].text;
          }
        }
        return acc;
      }, {} as { [propName: string]: string });
    if (Object.keys(lookups).length) {
      result[iface.name] = lookups;
    }
    return result;
  }, {});
};

// Get a map of lookup queries for the parameters of each operation in a file.
// This function will parse the jsdoc of the file at the provided path
// It will return a map of operations, and for each operation,
// a key/value pair of the parameter name and its lookup query
const extractLookups = async (...paths: string[]) => {
  const result: LookupMap = {};

  for (const p of paths) {
    const fn = p.endsWith('.ts') ? extractTsLookups : extractJsLookups;
    Object.assign(result, await fn(p));
  }

  return result;
};

export default extractLookups;
