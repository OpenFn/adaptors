import parseOperations from './parse-operations';

const extractLookups = async (path: string) => {
  const operations = await parseOperations(path);

  const result = operations.reduce((acc, fn) => {
    acc[fn.name] = fn.params.reduce((params, p) => {
      // if (param.)
      //   params[p.name] =
      // }
      // return params;
    }, {});

    return acc;
  });

  return operations;
};

export default extractLookups;
