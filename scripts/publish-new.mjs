#!/usr/bin/env node
// For a package's first release only — staged publishing (and trust) both
// require the package to already exist on npm, so this does a plain
// `pnpm publish`, tags it, and then hands it off to scripts/trust.mjs so
// every later release can go through the normal CI staged-publish flow.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { adaptor, otp, build } = yargs(hideBin(process.argv))
  .command(
    '$0 <adaptor> <otp>',
    "Publish a new adaptor's first release, tag it, and configure trust for future releases."
  )
  .positional('adaptor', {
    type: 'string',
    description: 'short adaptor name, e.g. common',
  })
  .positional('otp', {
    type: 'string',
    description: 'a one-time password from your authenticator',
  })
  .option('build', {
    type: 'boolean',
    default: true,
    description: 'build the adaptor first (use --no-build to skip)',
  })
  .example('$0 airqo 123456', 'publish @openfn/language-airqo for the first time')
  .demandCommand(0, 0)
  .strict()
  .parse();

const pkgPath = path.resolve('packages', adaptor, 'package.json');
if (!existsSync(pkgPath)) {
  console.error(`No adaptor found at packages/${adaptor}`);
  process.exit(1);
}

const { name, version } = JSON.parse(readFileSync(pkgPath, 'utf8'));

// This script is only for a package's first release. Anything already on
// npm should go through the normal publish flow in CI instead.
const published = spawnSync('npm', ['view', name, 'version'], {
  stdio: 'ignore',
});
if (published.status === 0) {
  console.error();
  console.error(
    `${name} is already published — this script is only for a package's first release.`
  );
  console.error(
    `Later releases go through CI once it's trusted; see "pnpm trust ${adaptor} <otp>".`
  );
  console.error();
  process.exit(1);
}

function run(command, args) {
  const display = args.map(arg => (arg === otp ? '***' : arg));
  console.log(`\n$ ${command} ${display.join(' ')}\n`);
  const { status } = spawnSync(command, args, { stdio: 'inherit' });
  if (status !== 0) {
    console.error(`\n${command} ${args[0]} failed for ${name}`);
    process.exit(status ?? 1);
  }
}

console.log(`Publishing ${name}@${version} for the first time`);

if (build) {
  run('pnpm', ['--filter', `./packages/${adaptor}`, 'build']);
} else {
  console.log('\nSkipping build (--no-build)');
}

run('pnpm', [
  '--filter',
  `./packages/${adaptor}`,
  'publish',
  '--access',
  'public',
  '--otp',
  otp,
]);

run('pnpm', ['changeset', 'tag']);
run('git', ['push', '--tags']);

run('node', ['scripts/trust.mjs', adaptor, otp]);

console.log(`\nDone. ${name}@${version} is published and trusted.`);
