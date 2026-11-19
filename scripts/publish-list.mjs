#!/usr/bin/env node
// Pre-publish check. Runs a dry-run publish and:
//  1. logs every adaptor that would be published
//  2. in GitHub Actions, checks pnpm's own trusted publishing (OIDC) result
//     for each adaptor. A dry run still attempts the token exchange, but a
//     failure is only a "[WARN] Skipped OIDC: ERR_..." line (exit code 0), so
//     we read the output and fail if any adaptor couldn't authenticate.
//
// Locally there is no OIDC token, so this just lists the adaptors.
import { spawnSync } from 'node:child_process';
import { appendFileSync, readFileSync, rmSync } from 'node:fs';
import process from 'node:process';

const SUMMARY_FILE = 'pnpm-publish-summary.json';
const inActions = process.env.GITHUB_ACTIONS === 'true';

rmSync(SUMMARY_FILE, { force: true });
const run = spawnSync(
  'pnpm',
  [
    'publish',
    '-r',
    '--dry-run',
    '--no-git-checks',
    '--report-summary',
    '--publish-branch',
    'main',
    '--access=public',
  ],
  { encoding: 'utf8' },
);

// Show the raw pnpm output in the log
process.stdout.write(run.stdout ?? '');
process.stderr.write(run.stderr ?? '');

if (run.status !== 0) {
  console.error('\nDry-run publish failed');
  process.exit(1);
}

let packages = [];
try {
  packages = JSON.parse(readFileSync(SUMMARY_FILE, 'utf8')).publishedPackages;
} catch (e) {
  // pnpm doesn't write a summary when there is nothing to publish
}
rmSync(SUMMARY_FILE, { force: true });

if (!packages.length) {
  console.log('\nNo adaptors to publish.');
  process.exit(0);
}

console.log(`\n${packages.length} adaptor(s) will be published:`);
for (const { name, version } of packages) {
  console.log(`  ${name}@${version}`);
}

if (!inActions) {
  console.log('\nNot running in GitHub Actions: skipping trust check.');
  process.exit(0);
}

if (
  !process.env.ACTIONS_ID_TOKEN_REQUEST_URL ||
  !process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN
) {
  console.error(
    '\nNo GitHub OIDC token is available to this job. Check the workflow has `permissions: id-token: write`.',
  );
  process.exit(1);
}

// pnpm logs "[WARN] Skipped OIDC: <reason>" *before* the "📦 name@version"
// line of the package it relates to, so attach each warning to the next one.
const stripAnsi = s => s.replace(/\u001b\[[0-9;]*m/g, '');
const lines = stripAnsi(`${run.stdout}\n${run.stderr}`).split('\n');

const problems = []; // { name, reason }
let pending = null;
for (const line of lines) {
  const warn = line.match(/Skipped OIDC:\s*(.*)$/);
  if (warn) {
    pending = warn[1].trim();
    continue;
  }
  const pkg = line.match(/📦\s+(@?[^\s]+)@\S+\s+→/);
  if (pkg) {
    if (pending) problems.push({ name: pkg[1], reason: pending });
    pending = null;
  }
}
if (pending) problems.push({ name: '(unknown package)', reason: pending });

// Distinguish "npm rejected the trust" from "we never had a usable token"
const isTrust = p => p.reason.includes('ERR_PNPM_AUTH_TOKEN_EXCHANGE');
const trustProblems = problems.filter(isTrust);
const otherProblems = problems.filter(p => !isTrust(p));

if (process.env.GITHUB_STEP_SUMMARY) {
  const failed = new Set(problems.map(p => p.name));
  appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    [
      '## Adaptors to publish',
      '',
      '| Adaptor | Version | Trusted publishing |',
      '| --- | --- | --- |',
      ...packages.map(
        p =>
          `| ${p.name} | ${p.version} | ${failed.has(p.name) ? 'FAILED' : 'ok'} |`,
      ),
      '',
      'For any adaptors which fail to publish, try asking a maintainer to renew trust with `pnpm run trust --renew <adaptor> <opt>`',
    ].join('\n'),
  );
}

if (!problems.length) {
  console.log('\nTrusted publishing OK for all adaptors to be published.');
  process.exit(0);
}

console.error();
if (trustProblems.length) {
  console.error(
    `npm rejected the trusted publishing exchange for ${trustProblems.length} adaptor(s).`,
  );
  console.error(
    'Trust is missing, expired, or does not match this repo/workflow. Renew with:\n',
  );
  for (const { name } of trustProblems) {
    console.error(
      `  pnpm trust ${name.replace('@openfn/language-', '')} <otp> --renew`,
    );
  }
  console.error('\n(or `pnpm trust:all <otp>` for everything), then re-run.');
}
if (otherProblems.length) {
  console.error(
    '\nOIDC was skipped for another reason (this is NOT a trust problem, probably a token or workflow permission issue):',
  );
  for (const { name, reason } of otherProblems) {
    console.error(`  ${name}: ${reason}`);
  }
}
process.exit(1);
