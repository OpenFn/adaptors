#!../../node_modules/.bin/tsx
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import process from 'node:process';
import gen, { installAndGen } from './gen';

export const cmd = yargs(hideBin(process.argv))
  .command(
    '$0 adaptor [--dir]',
    'Generate docs metadata for a single adaptor. Optionally include a version'
  )
  .example('$0 common', 'Build for latest common')
  .example('$0 http@6.0.0', 'Build for http v6.0.0')
  .demand('adaptor')
  .option('dir', {
    description: 'Specifiy which folder to install to',
  })
  .parse();

installAndGen(cmd.adaptor, cmd.dir).then(() => {
  console.log('✅ Done!');
});
