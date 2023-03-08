#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'node:path';
import { writeFile, stat } from 'node:fs/promises';

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
  console.log(`Generating metadata for ${adaptor}`);
  // import meta direct?
  // Or can we import { metadata } from root?
  const metadata = (await import(`${adaptorRoot}/src/meta/metadata.js`))
    .default;
  const result = await metadata(state.configuration);
  if (result) {
    console.log(`Done! Generated ${result.children.length} items`);
    result.created = new Date().toISOString();
    writeFile(
      path.resolve(`${adaptorRoot}/src/meta/data/metadata.json`),
      JSON.stringify(result, null, 2)
    );
  } else {
    console.error('Error: no data returned from function');
    process.exit(1);
  }
};

const populateMocks = async (adaptor, pathToState) => {
  console.log(`Populating mock data for ${adaptor}`);
  const adaptorRoot = findAdaptorRoot(adaptor);
  const state = await loadState(adaptorRoot, pathToState);
  // TODO check it exists
  const importPath = `${adaptorRoot}/src/meta/populate-mock-data.js`;
  const exists = await stat(importPath);
  if (exists) {
    const fn = (await import(importPath)).default;
    await fn(state);
    console.log('Done!');
  } else {
    console.error(`Error ${importPath} does not exist`);
  }
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
