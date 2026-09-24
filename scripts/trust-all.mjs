// Usage: pnpm trust:all
//
// Runs scripts/trust.mjs for every published adaptor in the workspace.
// See https://docs.npmjs.com/cli/v11/commands/npm-trust#bulk-usage
import { spawnSync } from 'node:child_process';

const DELAY_MS = 2000;

const list = spawnSync(
  'pnpm',
  ['-r', 'list', '--depth', '-1', '--filter', './packages/**', '--json'],
  { encoding: 'utf8' },
);
if (list.status !== 0) {
  console.error('Failed to list workspace packages');
  console.error(list.stderr);
  process.exit(1);
}

const packages = JSON.parse(list.stdout)
  .map(pkg => pkg.name.replace('@openfn/language-', ''))
  .sort();

console.log(`Configuring trust for ${packages.length} adaptors...\n`);

// trust.mjs exits 0 both when it configures trust and when it skips
// (already trusted / not yet published) — see its own output above for
// which happened to each package. This only tracks real failures.
const failed = [];

for (const [i, adaptor] of packages.entries()) {
  console.log(`\n[${i + 1}/${packages.length}] ${adaptor}`);
  const { status } = spawnSync('node', ['scripts/trust.mjs', adaptor], {
    stdio: 'inherit',
  });

  if (status !== 0) {
    failed.push(adaptor);
  }

  if (i < packages.length - 1) {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
  }
}

console.log(
  `\nDone. ${packages.length - failed.length}/${packages.length} ok.`,
);
if (failed.length) {
  console.log(`Failed: ${failed.join(', ')}`);
  process.exit(1);
}
