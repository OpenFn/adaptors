import generate from '@openfn/simple-ast';
import resolvePath from '../util/resolve-path';
import type { Options } from '../pipeline';
import fs from 'fs';

export default (lang: string, options: Options) => {
  const root = resolvePath(lang);
  console.log();
  console.log(`Building AST`);
  console.log();

  return new Promise<void>((resolve, reject) => {
    try {
      const dest = `${root}/ast.json`;

      const tsPath = `${root}/src/Adaptor.ts`;
      const jsPath = `${root}/src/Adaptor.js`;
      const adaptorPath = fs.existsSync(tsPath) ? tsPath : jsPath;

      const result = generate(adaptorPath, dest);

      console.log('... done!', dest);

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};
