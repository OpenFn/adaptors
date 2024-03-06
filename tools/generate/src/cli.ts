import generateAdaptor from './generate-adaptor';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import process from 'node:process';

const generate = async (args: any) => {
  await generateAdaptor(args);
};

yargs(hideBin(process.argv))
  .command({
    command: 'generate <name>',
    describe: 'Generate a new adaptor',
    handler: args => {
      generate(args.name);
    },
  })
  .demand('name')
  .parse();
