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

const existing = spawnSync('npm', ['trust', 'list', name, '--json'], {
  encoding: 'utf8',
});
if (existing.stdout?.trim()) {
  const { id, repository, file } = JSON.parse(existing.stdout);
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

process.exit(status ?? 1);
