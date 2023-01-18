import { readFile } from 'node:fs/promises';
import jsdoc2md from 'jsdoc-to-markdown';

const parseOperations = async (path: string) => {
  // const text = await readFile(path, 'utf8');
  // console.log(text);
  const parsed = await jsdoc2md.getJsdocData({ files: [path] });
  return parsed.filter(
    ({ kind, undocumented }) => !undocumented && kind === 'function'
  );
};

export default parseOperations;
