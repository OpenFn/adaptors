import generateAdaptor from './generate';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import process from 'node:process';
import promptForBranchChange from './prompt-branch-change';
import generate from './generate';

const run = async (args: any) => {
  const name = args.name.startsWith('fhir-') ? args.name : `fhir-${args.name}`;

  await promptForBranchChange(name);
  await generate(name, args.spec);
};

yargs(hideBin(process.argv))
  .command({
    command: 'generate <name> <spec> [base]',
    describe: 'Generate a new FHIR adaptor',
    handler: args => {
      run(args);
    },
  })
  .demand('name')
  .parse();
