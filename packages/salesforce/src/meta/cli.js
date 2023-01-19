#!/usr/bin/env node

// Helper functions to load mock data
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createMock } from '@openfn/metadata';

import createHelper from './helper';
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

const populateMocks = async () => {
  const helper = await createHelper(state.configuration);
  const mock = createMock(helper);
  await mock.getGlobals();
  await mock.getFields('vera__Attendance__c');
  await mock.getFields('Asset');
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
    command: 'populate-mock',
    desc: 'Populate the mock cache',
    handler: () => {
      populateMocks();
    },
  })
  .command({
    command: 'metadata',
    aliases: ['$0'],
    desc: 'Generate metadata from the salesforce sandbox (no cache)',
    handler: () => {
      generate();
    },
  })
  .parse();
