import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import process from 'node:process';

import updatePkg from './update-package';

export const cmd = yargs(hideBin(process.argv))
  .command(
    '$0 <lang...>',
    'Migrate one or more packages. Recommend you commit the adaptor before running this.'
  )
  .example('$0 http', 'Migrate the http adaptor to the new format')
  .demand('lang')
  .option('dry-run')
  .parse();

if (!cmd.tasks) {
  cmd.tasks = ['src', 'dts', 'docs', 'ast'];
}

if (cmd && cmd.lang) {
  updatePkg(cmd.lang, { dry: cmd.dryRun });
}
