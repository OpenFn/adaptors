import parseOperations from './parse-operations';
import parseTs from './parse-ts';

type magicMap = {
  [operation: string]: {
    [paramName: string]: string;
  };
};

const extractJsMagic = async (path: string) => {
  const operations = await parseOperations(path);
  return operations?.reduce((result: magicMap, fn) => {
    if (fn.params) {
      result[fn.name] = fn.params.reduce((params, p) => {
        if (p.magic) {
          params[p.name] = p.magic;
        }
        return params;
      }, {} as { [paramName: string]: string });
    }
    return result;
  }, {});
};

const extractTsMagic = async (path: string) => {
  const types = await parseTs(path);
  return types?.reduce((result: magicMap, iface) => {
    // TODO come back and look at typings
    // @ts-ignore
    const magicLookups = iface.type?.declaration?.children
      .filter((dec: any) => dec.kindString === 'Property')
      .reduce((acc: any, prop: any) => {
        if (prop.comment?.blockTags?.length) {
          const magic = prop.comment?.blockTags?.find(
            ({ tag }: any) => tag === '@magic'
          );
          if (magic) {
            acc[prop.name] = magic.content[0].text;
          }
        }
        return acc;
      }, {} as { [propName: string]: string });
    if (Object.keys(magicLookups).length) {
      result[iface.name] = magicLookups;
    }
    return result;
  }, {});
};

// Get a map of magic queries for the parameters of each operation in a file.
// This function will parse the jsdoc of the file at the provided path
// It will return a map of operations, and for each operation,
// a key/value pair of the parameter name and its magic query
const extractMagic = async (...paths: string[]) => {
  const result: magicMap = {};

  for (const p of paths) {
    const fn = p.endsWith('.ts') ? extractTsMagic : extractJsMagic;
    Object.assign(result, await fn(p));
  }

  return result;
};

export default extractMagic;
