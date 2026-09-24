#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const REPO = 'OpenFn/adaptors';
const WORKFLOW = 'publish.yaml';

const { adaptor, otp, dryRun } = yargs(hideBin(process.argv))
  .command(
    '$0 <adaptor> <otp>',
    'Configure npm trusted publishing for an adaptor, and disallow token publishes for it.'
  )
  .positional('adaptor', {
    type: 'string',
    description: 'short adaptor name, e.g. common',
  })
  .positional('otp', {
    type: 'string',
    description: 'a one-time password from your authenticator',
  })
  .option('dry-run', {
    type: 'boolean',
    default: false,
    description: "show what would happen, don't configure anything",
  })
  .example('$0 common 123456', 'trust @openfn/language-common')
  .demandCommand(0, 0)
  .strict()
  .parse();

const pkgPath = path.resolve('packages', adaptor, 'package.json');
if (!existsSync(pkgPath)) {
  console.error(`No adaptor found at packages/${adaptor}`);
  process.exit(1);
}

const { name } = JSON.parse(readFileSync(pkgPath, 'utf8'));

// npm trust requires the package to already be on the registry. Check first
// (this is an unauthenticated read) so an unpublished adaptor doesn't burn
// the OTP on a call that's bound to fail.
const published = spawnSync('npm', ['view', name, 'version'], {
  stdio: 'ignore',
});
if (published.status !== 0) {
  console.log();
  console.log(`${name} isn't published on npm yet, so it can't be trusted.`);
  console.log(`Publish it first, then run this again.`);
  console.log();
  process.exit(0);
}

function otpRejected(result) {
  if (result.status === 0) return false;
  try {
    const parsed = JSON.parse(result.stdout?.trim() || 'null');
    return parsed?.error?.code === 'EOTP';
  } catch {
    return false;
  }
}

function failOtp(step) {
  console.error();
  console.error(`Your OTP was rejected running ${step} (wrong or expired).`);
  console.error(`Get a fresh one from your authenticator and try again.`);
  console.error();
  process.exit(1);
}

// Read-only, so this needs structured output to give a friendly skip
// message — the --otp is passed straight through, no interactive prompt.
const existing = spawnSync(
  'npm',
  ['trust', 'list', name, '--json', `--otp=${otp}`],
  { encoding: 'utf8' }
);
if (otpRejected(existing)) {
  failOtp('trust list');
}
const existingOutput = existing.stdout?.trim();
if (existingOutput) {
  const parsed = JSON.parse(existingOutput);
  if (parsed.error) {
    console.error();
    console.error(`Couldn't check trust status for ${name}:`);
    console.error(`  ${parsed.error.summary || parsed.error.code}`);
    console.error();
    process.exit(1);
  }
  const { id, repository, file } = parsed;
  console.log();
  console.log(`${name} is already trusted (id ${id}, ${repository}/${file})`);
  console.log();
  console.log(`You can revoke it with:`);
  console.log();
  console.log(`  npm trust revoke ${name} --id ${id}`);
  console.log();
  process.exit(0);
}

console.log();
console.log(`Configuring trusted publishing for ${name}`);
console.log(`  repo: ${REPO}, workflow: .github/workflows/${WORKFLOW}\n`);

const trustResult = spawnSync(
  'npm',
  [
    'trust',
    'github',
    name,
    '--repo',
    REPO,
    '--file',
    WORKFLOW,
    '--allow-publish',
    '--yes',
    '--json',
    `--otp=${otp}`,
    ...(dryRun ? ['--dry-run'] : []),
  ],
  { encoding: 'utf8' }
);
if (otpRejected(trustResult)) {
  failOtp('trust github');
}
if (trustResult.status !== 0) {
  console.error(
    trustResult.stderr || `Failed to configure trust for ${name}`
  );
  process.exit(trustResult.status ?? 1);
}
console.log(`Trusted: ${REPO}/${WORKFLOW} can publish ${name}`);

if (dryRun) {
  console.log();
  console.log('Dry run: not touching the mfa setting.');
  process.exit(0);
}

// Lock the package to "require 2FA, disallow tokens" so ad-hoc publishes
// with a bypass-2FA token are no longer possible — only this trusted
// publisher (and an interactive, 2FA'd `npm publish`) can publish it.
console.log();
console.log(`Disallowing token publishes for ${name}`);

const mfaResult = spawnSync(
  'npm',
  ['access', 'set', 'mfa=publish', name, '--json', `--otp=${otp}`],
  { encoding: 'utf8' }
);
if (otpRejected(mfaResult)) {
  failOtp('access set mfa=publish');
}
if (mfaResult.status !== 0) {
  console.error(
    mfaResult.stderr || `Failed to disallow token publishes for ${name}`
  );
  process.exit(mfaResult.status ?? 1);
}

console.log(`Done.`);
