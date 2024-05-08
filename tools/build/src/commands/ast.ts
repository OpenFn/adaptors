import { exec } from 'node:child_process';
import resolvePath from '../util/resolve-path';
import type { Options } from '../pipeline';

export default (lang: string, options: Options) => {
  const root = resolvePath(lang);
  console.log();
  console.log(`Building AST`);
  console.log();

  return new Promise<void>((resolve, reject) => {
    const dest = `${root}/ast.json`;

    // TODO adaptor.js is a problem
    // I think I'll move simple-ast in here, give it nice exports,
    // and enable it to parse from index
    const cmd = `pnpm exec simple-ast  --adaptor ${root}/src/Adaptor.js --output ${dest}`;
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error('AST build failed!', dest);
        console.error(err);
        return reject();
      }
      if (stdout) {
        console.log(stdout);
      }
      console.log('... done!', dest);
      resolve();
    });
  });
};
