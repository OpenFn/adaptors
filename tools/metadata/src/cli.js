#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';

const findAdaptorRoot = adaptor => {
  const cwd = process.cwd();
  // if we run from root, cwd is tools/metadata
  // if we run from an adaptor dir, cwd is tools/adaptor
  const repoRoot = path.resolve(cwd, '../../');
  if (!repoRoot.endsWith('adaptors')) {
    throw new Error(
      `adaptors repo root not found!\n\nRun this command from the adaptors repo root or packages/${adaptor}`
    );
  }

  const adaptorRoot = `${repoRoot}/packages/${adaptor}`;

  return adaptorRoot;
};

// config can be json or js
const loadState = async (adaptorRoot, pathToState) => {
  const p = path.isAbsolute(pathToState)
    ? pathToState
    : path.resolve(adaptorRoot, pathToState);
  if (p.endsWith('.json')) {
    const raw = fs.readFileSync(p);
    return JSON.parse(raw);
  } else {
    const mod = await import(p);
    return mod.default;
  }
};

const generate = async (adaptor, pathToState) => {
  const adaptorRoot = findAdaptorRoot(adaptor);
  const state = await loadState(adaptorRoot, pathToState);

  // import meta direct?
  // Or can we import { metadata } from root?
  const metadata = (await import(`${adaptorRoot}/src/meta/metadata.js`))
    .default;
  const result = await metadata(state.configuration);

  writeFile(
    path.resolve(`${adaptorRoot}/src/meta/data/metadata.json`),
    JSON.stringify(result, null, 2)
  );
};

const populateMocks = async (adaptor, pathToState) => {
  const adaptorRoot = findAdaptorRoot(adaptor);
  const state = await loadState(adaptorRoot, pathToState);
  // TODO check it exists
  const fn = (await import(`${adaptorRoot}/src/meta/populate-mock-data.js`))
    .default;
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
    command: 'generate <adaptor> <config>',
    aliases: ['$0'],
    desc: 'Generate metadata from the salesforce sandbox (no cache)',
    handler: args => {
      generate(args.adaptor, args.config);
    },
  })
  .parse();
