import generate from '@openfn/simple-ast';
import resolvePath from '../util/resolve-path';
import type { Options } from '../pipeline';

export default (lang: string, options: Options) => {
  const root = resolvePath(lang);
  console.log();
  console.log(`Building AST`);
  console.log();

  return new Promise<void>((resolve, reject) => {
    try {
      const dest = `${root}/ast.json`;

      // TODO adaptor.js is a problem
      const result = generate(`${root}/src/Adaptor.js`, dest);

      console.log('... done!', dest);

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};
