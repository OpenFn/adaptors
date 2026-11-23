#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { appendFileSync, readFileSync, rmSync } from 'node:fs';

const summaryFile = 'pnpm-publish-summary.json';
const inActions = process.env.GITHUB_ACTIONS === 'true';

function dryRun() {
  rmSync(summaryFile, { force: true });
  try {
    const run = spawnSync(
      'pnpm',
      [
        'publish',
        '-r',
        '--dry-run',
        '--ignore-scripts',
        '--no-git-checks',
        '--report-summary',
        '--reporter=ndjson',
        '--loglevel=info',
        '--publish-branch',
        'main',
        '--access=public',
      ],
      { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
    );
    if (run.error) throw run.error;
    if (run.status !== 0) {
      const codes = [...new Set(run.stderr.match(/ERR_PNPM_[A-Z0-9_]+/g))];
      const detail = codes.length ? codes.join(', ') : run.signal ?? run.status;
      throw new Error(`pnpm dry run failed (${detail}).`);
    }

    const { publishedPackages } = JSON.parse(readFileSync(summaryFile, 'utf8'));
    if (
      !Array.isArray(publishedPackages) ||
      publishedPackages.some(
        pkg =>
          typeof pkg?.name !== 'string' ||
          !/^(?:@[a-z0-9._-]+\/)?[a-z0-9][a-z0-9._-]*$/.test(pkg.name) ||
          typeof pkg.version !== 'string' ||
          !/^\d+\.\d+\.\d+[a-zA-Z0-9.+-]*$/.test(pkg.version),
      ) ||
      new Set(publishedPackages.map(pkg => pkg.name)).size !== publishedPackages.length
    ) {
      throw new Error('pnpm returned an invalid publish summary.');
    }
    return { packages: publishedPackages, events: run.stderr };
  } finally {
    rmSync(summaryFile, { force: true });
  }
}

// Recursive publishing in the pinned pnpm version processes one package at a
// time. Its identity request and any OIDC warning precede the package marker.
function checkTrust(packages, events) {
  const results = new Map(
    packages.map(pkg => [
      `${pkg.name}@${pkg.version}`,
      { ...pkg, status: 'Unverified', detail: 'Missing pnpm publish event' },
    ]),
  );
  const errors = [];
  const { ACTIONS_ID_TOKEN_REQUEST_URL, ACTIONS_ID_TOKEN_REQUEST_TOKEN } = process.env;
  if (packages.length && (!ACTIONS_ID_TOKEN_REQUEST_URL || !ACTIONS_ID_TOKEN_REQUEST_TOKEN)) {
    const detail = 'GitHub OIDC credentials are unavailable. Check permissions: id-token: write.';
    for (const result of results.values()) result.detail = detail;
    return { results, errors };
  }

  let identityRequest;
  let skipped;
  const seen = new Set();
  for (const line of events.split('\n')) {
    if (!line.startsWith('{')) continue;
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      errors.push('Invalid NDJSON in pnpm publish output.');
      continue;
    }
    if (event?.name !== 'pnpm:global' || typeof event.message !== 'string') continue;
    const message = event.message;
    const request = /^GET (\S+) (\d{3}) \d+ms$/.exec(message);
    if (request) {
      const url = new URL(request[1]);
      const audience = url.searchParams.get('audience');
      url.searchParams.delete('audience');
      const identityUrl = ACTIONS_ID_TOKEN_REQUEST_URL
        ? new URL(ACTIONS_ID_TOKEN_REQUEST_URL)
        : undefined;
      if (identityUrl) {
        identityUrl.searchParams.delete('audience');
        // Normalize search parameter encoding on both URLs before comparison.
        if (url.href === identityUrl.href) {
          if (identityRequest) errors.push('Duplicate GitHub OIDC request before a package event.');
          identityRequest = { audience, status: request[2] };
        }
      }
      continue;
    }

    if (message.startsWith('Skipped OIDC:')) {
      if (skipped) errors.push('Multiple OIDC warnings before a package event.');
      skipped = message;
      continue;
    }

    const published = /^📦 (\S+) → (\S+)$/.exec(message);
    if (!published) continue;
    const [, candidate, registry] = published;
    const result = results.get(candidate);
    if (!result || seen.has(candidate)) {
      errors.push('Unexpected or duplicate package in pnpm publish output.');
    } else {
      seen.add(candidate);
      if (skipped) {
        const code = skipped.match(/ERR_PNPM_[A-Z0-9_]+/)?.[0] ?? 'OIDC skipped';
        const status = skipped.match(/status code (\d{3})\)/)?.[1];
        result.detail = status ? `${code} (HTTP ${status})` : code;
        if (code === 'ERR_PNPM_AUTH_TOKEN_EXCHANGE' && ['403', '404'].includes(status)) {
          result.status = 'Rejected';
        } else if (code === 'ERR_PNPM_AUTH_TOKEN_EXCHANGE' && /^(?:429|5\d{2})$/.test(status)) {
          result.detail += ' — npm registry unavailable or rate limited';
        }
      } else if (
        identityRequest?.status === '200' &&
        identityRequest.audience === `npm:${new URL(registry).hostname}`
      ) {
        result.status = 'Verified';
        result.detail = '';
      } else {
        result.detail = 'Missing successful GitHub OIDC request for the registry';
      }
    }
    identityRequest = undefined;
    skipped = undefined;
  }
  if (skipped || identityRequest) errors.push('Unmatched OIDC event in pnpm publish output.');
  return { results, errors };
}

function reportTrust(results, errors) {
  const rows = [
    '## Packages to publish',
    '',
    '| Package | Version | OIDC exchange |',
    '| --- | --- | --- |',
  ];
  const guidance = [];
  for (const { name, version, status, detail } of results.values()) {
    const outcome = detail ? `${status} (${detail})` : status;
    console.log(`  ${name}@${version} — ${outcome}`);
    rows.push(`| ${name} | ${version} | ${outcome} |`);
    if (status === 'Rejected') {
      if (name.startsWith('@openfn/language-')) {
        const adaptor = name.slice('@openfn/language-'.length);
        guidance.push(
          `- ${name}: Ask a maintainer to run \`pnpm trust ${adaptor} <otp> --renew\` for an existing package, or \`pnpm publish:new ${adaptor} <otp>\` for its first release. Then rerun Publish.`,
        );
      } else {
        guidance.push(
          `- ${name}: Ask a maintainer to check [npm package settings](https://www.npmjs.com/package/${name}/access) for OpenFn/adaptors, publish.yaml, and permission to publish directly.`,
        );
      }
    }
  }
  if ([...results.values()].some(result => result.status === 'Unverified')) {
    guidance.push('- For unverified exchanges, check GitHub OIDC permissions and npm registry availability before retrying.');
  }
  if (!results.size) rows.splice(2, rows.length, 'No packages to publish.');
  if (errors.length) guidance.push(...errors.map(error => `- ${error}`));
  if (guidance.length) console.error(guidance.join('\n'));
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, [...rows, '', ...guidance, ''].join('\n'));
  }
}

function main() {
  const { packages, events } = dryRun();
  if (!inActions) {
    console.log(packages.length ? 'Packages to publish:' : 'No packages to publish.');
    for (const { name, version } of packages) console.log(`  ${name}@${version}`);
    return;
  }

  const { results, errors } = checkTrust(packages, events);
  reportTrust(results, errors);
  if (errors.length || [...results.values()].some(result => result.status !== 'Verified')) {
    throw new Error('Trusted-publishing preflight failed. See the release summary.');
  }

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `packages=${JSON.stringify(packages.map(pkg => pkg.name))}\n`);
  }
}

try {
  main();
} catch (error) {
  console.error(`Publish preflight: ${error.message}`);
  process.exitCode = 1;
}
