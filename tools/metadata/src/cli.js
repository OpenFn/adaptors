#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';

// config can be json or js
const loadState = async pathToState => {
  if (pathToState.endsWith('.json')) {
    const raw = fs.readFileSync(pathToState);
    return JSON.parse(raw);
  } else {
    const mod = await import(pathToState);
    return mod.default;
  }
};

const generate = async (adaptor, pathToState) => {
  const state = await loadState(path.resolve(pathToState));

  // import meta direct?
  // Or can we import { metadata } from root?
  console.log(path.resolve('../../packages', adaptor, 'src/meta/metadata.js'));
  const metadata = (
    await import(
      path.resolve('../../packages', adaptor, 'src/meta/metadata.js')
    )
  ).default;
  const result = await metadata(state.configuration);

  writeFile(
    path.resolve('../../packages', adaptor, 'src/meta/data/metadata.json'),
    JSON.stringify(result, null, 2)
  );
};

const populateMocks = async (adaptor, pathToState) => {
  const state = await loadState(path.resolve(pathToState));
  const pathToModule = path.resolve(
    '../../packages',
    adaptor,
    'src/meta/populate-mock-data.js'
  );
  // TODO check it exists
  const fn = (await import(pathToModule)).default;
  await fn(state);
};

/*
 * The CLI needs to:
 * a) run the metadata function for a given adaptor and config (and write to disk)
 * b) run the preload script to warm an adaptor cache
 * Is there more it can do to help create new metadata functions?
 */
yargs(hideBin(process.argv))
  .command({
    command: 'populate-mock <adaptor> <config>',
    desc: 'Populate the mock cache',
    handler: args => {
      populateMocks(args.adaptor, args.config);
    },
  })
  .command({
    command: 'metadata <adaptor> <config>',
    aliases: ['$0'],
    desc: 'Generate metadata from the salesforce sandbox (no cache)',
    handler: args => {
      generate(args.adaptor, args.config);
    },
  })
  .parse();
