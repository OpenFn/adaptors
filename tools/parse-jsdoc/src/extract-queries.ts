import parseOperations from './parse-operations';

const extractLookups = async (path: string) => {
  const operations = parseOperations(path);
  return operations;
};
