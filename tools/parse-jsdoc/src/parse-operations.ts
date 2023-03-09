import { readFile } from 'node:fs/promises';
import jsdoc2md from 'jsdoc-to-markdown';
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'url';

type JSDocResult = {
  kind: string;
  undocumented?: boolean;
  comment: string; // the raw comment
  meta: object; // metadata (line numnber, file name)
  name: string;
  description: string;
  longname: string;
  params: JSDocParam[];
  returns: JSDocReturn[];
  scope: string; // global or local?
};

type JSDocParam = {
  name: string;
  description: string;
  type: {
    names: string[];
  };
  magic?: string; // from @magic extension
};

type JSDocReturn = {
  type: {
    names: string[];
  };
};

const dirname = path.dirname(fileURLToPath(import.meta.url));

const parseOperations = async (pathToSource: string) => {
  const parsed = (await jsdoc2md.getJsdocData({
    files: [pathToSource],
    'no-cache': true,
    configure: path.resolve(dirname, '../jsdoc/jsdoc.conf.json'),
  })) as JSDocResult[];

  return parsed.filter(({ returns, undocumented }) => !undocumented && returns);
};

export default parseOperations;
