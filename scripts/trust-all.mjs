#!/usr/bin/env node
// Runs scripts/trust.mjs for every published adaptor in the workspace.
// See https://docs.npmjs.com/cli/v11/commands/npm-trust#bulk-usage
import { spawn, spawnSync } from 'node:child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .command(
    '$0 <otp>',
    'Configure npm trusted publishing for every published adaptor in the workspace.'
  )
  .positional('otp', {
    type: 'string',
    description: 'a one-time password from your authenticator',
  })
  .option('from', {
    type: 'string',
    description:
      'skip ahead to this adaptor (by short name) in the sorted list, e.g. to resume a run',
  })
  .option('concurrency', {
    alias: 'c',
    type: 'number',
    default: 10,
    description: 'how many adaptors to process in parallel',
  })
  .option('renew', {
    type: 'boolean',
    default: false,
    description: 'revoke and re-add trust for adaptors that are already trusted',
  })
  .example('$0 123456', 'trust every published adaptor')
  .example('$0 123456 --from http', 'resume starting at http')
  .demandCommand(0, 0)
  .strict()
  .parse();

// A single OTP is short-lived and this run covers every adaptor in the
// workspace (well over 100, each needing up to 3 authenticated calls), so
// it will outlast any one code. trust.mjs exits 2 specifically when the OTP
// was the problem — when that happens we just ask for a fresh one and
// retry the same package, rather than failing the whole run.
let otp = argv.otp;

// Deliberately not using node:readline here — repeated question() calls on
// a shared interface lost input in testing, seemingly once the underlying
// stream had already delivered everything it had. Shelling out to `read`
// per-prompt sidesteps that.
function askOtp(prompt) {
  process.stdout.write(prompt);
  const result = spawnSync(
    'bash',
    ['-c', 'read -r line && printf "%s" "$line"'],
    { stdio: ['inherit', 'pipe', 'inherit'] }
  );
  process.stdout.write('\n');
  return result.stdout.toString().trim();
}

const list = spawnSync(
  'pnpm',
  ['-r', 'list', '--depth', '-1', '--filter', './packages/**', '--json'],
  { encoding: 'utf8' }
);
if (list.status !== 0) {
  console.error('Failed to list workspace packages');
  console.error(list.stderr);
  process.exit(1);
}

let packages = JSON.parse(list.stdout)
  .map(pkg => pkg.name.replace('@openfn/language-', ''))
  .sort();

if (argv.from) {
  const startIndex = packages.indexOf(argv.from);
  if (startIndex === -1) {
    console.error(`--from ${argv.from}: no such adaptor in the workspace`);
    process.exit(1);
  }
  packages = packages.slice(startIndex);
}

console.log(`Configuring trust for ${packages.length} adaptors...\n`);

// trust.mjs exits 0 both when it configures trust and when it skips
// (already trusted / not yet published). This only tracks real (non-OTP)
// failures.
const failed = [];
let done = 0;

// Runs trust.mjs asynchronously, buffering output so parallel runs don't
// interleave; the whole block is printed when the package finishes.
function runTrust(adaptor, otpUsed) {
  return new Promise(resolve => {
    const args = ['scripts/trust.mjs', adaptor, otpUsed];
    if (argv.renew) args.push('--renew');
    const child = spawn('node', args);
    let out = '';
    child.stdout.on('data', d => (out += d));
    child.stderr.on('data', d => (out += d));
    child.on('close', status => resolve({ status, out }));
  });
}

async function processAdaptor(adaptor) {
  while (true) {
    const otpUsed = otp;
    const { status, out } = await runTrust(adaptor, otpUsed);

    if (status === 2) {
      // Another worker may already have refreshed the OTP while we ran.
      if (otp === otpUsed) {
        otp = askOtp('\nOTP expired. Enter a fresh one to keep going: ');
      }
      continue; // retry this same package
    }

    done++;
    console.log(`\n[${done}/${packages.length}] ${adaptor}${out}`);
    if (status !== 0) failed.push(adaptor);
    return;
  }
}

// Worker pool: keeps `concurrency` adaptors in flight at all times.
const queue = [...packages];
const workers = Array.from(
  { length: Math.max(1, Math.min(argv.concurrency, packages.length)) },
  async () => {
    while (queue.length) {
      await processAdaptor(queue.shift());
    }
  }
);
await Promise.all(workers);

console.log(
  `\nDone. ${packages.length - failed.length}/${packages.length} ok.`
);
if (failed.length) {
  console.log(`Failed: ${failed.sort().join(', ')}`);
  process.exit(1);
}
