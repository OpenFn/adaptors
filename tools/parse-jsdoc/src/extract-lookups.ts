import parseOperations from './parse-operations';

type LookupMap = {
  [operation: string]: {
    [paramName: string]: string;
  };
};

// Get a map of lookup queries for the parameters of each operation in a file.
// This function will parse the jsdoc of the file at the provided path
// It will return a map of operations, and for each operation,
// a key/value pair of the parameter name and its lookup query
const extractLookups = async (path: string) => {
  const operations = await parseOperations(path);

  const result: LookupMap = operations.reduce((acc, fn) => {
    if (fn.params) {
      acc[fn.name] = fn.params.reduce((params, p) => {
        if (p.lookup) {
          params[p.name] = p.lookup;
        }
        return params;
      }, {} as { [paramName: string]: string });
    }
    return acc;
  }, {} as LookupMap);
  return result;
};

export default extractLookups;
