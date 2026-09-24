// Usage: pnpm trust <adaptor>   e.g. pnpm trust common
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const REPO = 'OpenFn/adaptors';
const WORKFLOW = 'publish.yaml';

const [adaptor, ...extraArgs] = process.argv.slice(2);

if (!adaptor) {
  console.error('Usage: pnpm trust <adaptor>   e.g. pnpm trust common');
  process.exit(1);
}

const pkgPath = path.resolve('packages', adaptor, 'package.json');
if (!existsSync(pkgPath)) {
  console.error(`No adaptor found at packages/${adaptor}`);
  process.exit(1);
}

const { name } = JSON.parse(readFileSync(pkgPath, 'utf8'));

// npm trust requires the package to already be on the registry. Check first
// (this is an unauthenticated read, unlike everything below it) so an
// unpublished adaptor doesn't burn a 2FA prompt on a call that's bound to fail.
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

const existing = spawnSync('npm', ['trust', 'list', name, '--json'], {
  encoding: 'utf8',
});
const existingOutput = existing.stdout?.trim();
if (existingOutput) {
  const parsed = JSON.parse(existingOutput);
  if (parsed.error) {
    // e.g. the 2FA/OTP session has expired — this is a real failure, not
    // "no trust configured", so don't let it look like a clean skip.
    console.error();
    console.error(`Couldn't check trust status for ${name}:`);
    console.error(`  ${parsed.error.summary || parsed.error.code}`);
    if (parsed.error.authUrl) {
      console.error(`  ${parsed.error.authUrl}`);
    }
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

const { status } = spawnSync(
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
    ...extraArgs,
  ],
  // inherited stdio so that  npm can prompt for the OTP itself
  { stdio: 'inherit' },
);

if (status !== 0) {
  process.exit(status ?? 1);
}

// Lock the package to "require 2FA, disallow tokens" so ad-hoc publishes
// with a bypass-2FA token are no longer possible — only this trusted
// publisher (and an interactive, 2FA'd `npm publish`) can publish it.
console.log();
console.log(`Disallowing token publishes for ${name}`);

const { status: mfaStatus } = spawnSync(
  'npm',
  ['access', 'set', 'mfa=publish', name],
  { stdio: 'inherit' }
);

process.exit(mfaStatus ?? 1);
