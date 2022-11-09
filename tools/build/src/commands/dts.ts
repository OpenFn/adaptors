import path from 'node:path';
import * as url from 'url';
import { exec } from 'node:child_process';

import resolvePath from '../util/resolve-path';

export default (lang: string) => {
  const root = resolvePath(lang);
  console.log();
  console.log('Building DTS');
  console.log();

  const args = [
    '--allowJs',
    '--declaration',
    '--emitDeclarationOnly',
    '--lib es2020',
    `--declarationDir ${root}/types`,
    `${root}/src/index.js`,
  ];
  // Need to run the command out of the build tool dir
  const cwd = path.dirname(url.fileURLToPath(import.meta.url));
  return new Promise<void>(resolve => {
    exec(
      'pnpm exec tsc ' + args.join(' '),
      {
        cwd,
      },
      (err, stdout) => {
        // Hide error reports (for now)
        // console.log(stdout);
        resolve();
      }
    );
  });
};
