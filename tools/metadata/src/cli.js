#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';

const generate = async (adaptor, pathToState) => {
  // config can be json or js
  let state;
  if (pathToState.endsWith('.json')) {
    const raw = fs.readFileSync(pathToState);
    state = JSON.parse(raw);
  } else {
    state = (await import(pathToState)).default;
  }

  // import meta direct?
  // Or can we import { metadata } from root?
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

/*
 * The CLI needs to:
 * a) run the metadata function for a given adaptor and config (and write to disk)
 * b) run the preload script to warm an adaptor cache
 * Is there more it can do to help create new metadata functions?
 */
yargs(hideBin(process.argv))
  // .command({
  //   command: 'populate-mock',
  //   desc: 'Populate the mock cache',
  //   handler: () => {
  //     populateMocks();
  //   },
  // })
  .command({
    command: 'metadata <adaptor> <config>',
    aliases: ['$0'],
    desc: 'Generate metadata from the salesforce sandbox (no cache)',
    handler: args => {
      generate(args.adaptor, args.config);
    },
  })
  .parse();
