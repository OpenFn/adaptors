#!./node_modules/.bin/esno
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import process from 'node:process';

import run from './pipeline';

export const cmd = yargs(hideBin(process.argv))
  .command(
    '$0 <lang> [tasks]',
    'Build an adaptor. You must pass in the adaptor name, and you may pass a list of build steps.'
  )
  .example('$0 http', 'build everything for http')
  .example('$0 http src ast', 'run src and ast builds for http')
  .demand('lang')
  .option('tasks', {
    array: true,
    description: 'src, ast, docs, dts',
  })
  .option('watch', {
    boolean: true,
    description:
      'watch for changes and rebuild (only really works for src and docs)',
  })
  .parse();

if (!cmd.tasks) {
  cmd.tasks = ['src', 'dts', 'docs', 'ast'];
}

run(cmd.lang, cmd.tasks, { watch: cmd.watch });
