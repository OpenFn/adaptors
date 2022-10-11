#!./node_modules/.bin/tsm

// The shebang above does work, but it requires every package to have
// tsm installed as a dev dependency
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import run from './pipeline';

export const cmd = yargs(hideBin(process.argv))
  .command('$0 <lang> [tasks]', 'build an adaptor')
  .demand('lang')
  .option('tasks', {
    array: true,
  })
  .parse();

if (!cmd.tasks) {
  // TODO add all tasks here
  cmd.tasks = ['src'];
}

run(cmd.lang, cmd.tasks);
