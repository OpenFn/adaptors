#!/usr/bin/env node

// Helper functions to load mock data
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import createBackend from './backend';
import metadata from './metadata';

// TODO need to run some validation on this stuff before the command runs
const state = {
  configuration: {
    loginUrl: 'https://login.salesforce.com/',
    username: process.env.OPENFN_SF_USER,
    password: process.env.OPENFN_SF_PW,
    securityToken: process.env.OPENFN_SF_TOKEN,
  },
};

// This will contact SF, pull down data and write it to ./mock
// Unit tests can then test against that
const generateGlobals = async () => {
  const helper = await createBackend(state.configuration);
  const globals = await helper.fetchGlobals();
  writeFile(
    path.resolve('./src/meta/data/globals.json'),
    JSON.stringify(globals)
  );
};

const generateSobject = async name => {
  const helper = await createBackend(state.configuration);
  const sobject = await helper.fetchSobject(name);

  writeFile(
    path.resolve(`./src/meta/data/sobject-${name}.json`),
    JSON.stringify(sobject)
  );
};

const generate = async () => {
  const result = await metadata(state.configuration);

  writeFile(
    path.resolve(`./src/meta/data/metadata.json`),
    JSON.stringify(result, null, 2)
  );
};

yargs(hideBin(process.argv))
  .command({
    command: 'metadata',
    aliases: ['$0'],
    desc: 'Generate metadata from the salesforce sandbox (no cache)',
    handler: () => {
      generate();
    },
  })
  .command({
    command: 'globals',
    desc: 'Generate globals data from the sandbox backend',
    handler: () => {
      generateGlobals();
    },
  })
  .command({
    command: 'sobject <name>',
    desc: 'Generate sobject data from the sandbox backend',
    handler: argv => {
      generateSobject(argv.name);
    },
  })
  .parse();
