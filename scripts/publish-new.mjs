// Usage: pnpm publish:new <adaptor> <otp> [--no-build]
//
// For a package's first release only — staged publishing (and trust) both
// require the package to already exist on npm, so this does a plain
// `pnpm publish`, tags it, and then hands it off to scripts/trust.mjs so
// every later release can go through the normal CI staged-publish flow.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const rawArgs = process.argv.slice(2);
const otp = rawArgs.pop();
const noBuild = rawArgs.includes('--no-build');
const [adaptor] = rawArgs.filter(arg => arg !== '--no-build');

if (!adaptor) {
  console.error('Usage: pnpm publish:new <adaptor> <otp> [--no-build]');
  process.exit(1);
}
if (!otp) {
  console.error('Usage: pnpm publish:new <adaptor> <otp> [--no-build]');
  console.error('A one-time password from your authenticator is required.');
  process.exit(1);
}

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
    `${name} is already published — this script is only for a package's first release.`,
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

if (!noBuild) {
  run('pnpm', ['build']);
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
