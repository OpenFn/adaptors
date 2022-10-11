import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import run from './pipeline';

export const cmd = yargs(hideBin(process.argv))
  .command('run <lang> [tasks]', 'build an adaptor')
  .option('tasks', {
    array: true,
  })
  .parse();

if (!cmd.tasks) {
  // TODO add all tasks here
  cmd.tasks = ['src'];
}

run(cmd.lang, cmd.tasks);
