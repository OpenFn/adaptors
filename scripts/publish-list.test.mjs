import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./publish-list.mjs', import.meta.url));
const identity = 'https://oidc.example.test/token?api-version=1';
const registry = 'https://registry.npmjs.org/';
const adaptor = { name: '@openfn/language-http', version: '1.2.3' };
const tool = { name: '@openfn/buildtools', version: '2.0.0' };
const request = `GET ${identity}&audience=npm%3Aregistry.npmjs.org 200 2ms`;
const marker = ({ name, version }) => `📦 ${name}@${version} → ${registry}`;
const rejected = status =>
  `Skipped OIDC: ERR_PNPM_AUTH_TOKEN_EXCHANGE: Failure (status code ${status})`;

function run(t, options = {}) {
  const cwd = mkdtempSync(join(tmpdir(), 'publish-list-'));
  t.after(() => rmSync(cwd, { force: true, recursive: true }));
  const output = join(cwd, 'output');
  const jobSummary = join(cwd, 'run-summary');
  const { packages = [adaptor, tool], messages = [], summary, local, missingCredentials } = options;
  const pnpm = join(cwd, 'pnpm');
  writeFileSync(pnpm, `#!${process.execPath}
const fs = require('node:fs');
if (!process.argv.includes('--dry-run') || !process.argv.includes('--ignore-scripts')) {
  process.exit(9);
}
const summary = ${JSON.stringify(summary ?? JSON.stringify({ publishedPackages: packages }))};
if (summary !== 'missing') fs.writeFileSync('pnpm-publish-summary.json', summary);
for (const message of ${JSON.stringify(messages)}) {
  console.error(JSON.stringify({ name: 'pnpm:global', message }));
}
`, { mode: 0o700 });
  const result = spawnSync(process.execPath, [script], {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      PATH: `${cwd}${delimiter}${process.env.PATH}`,
      GITHUB_ACTIONS: local ? '' : 'true',
      ACTIONS_ID_TOKEN_REQUEST_URL: identity,
      ACTIONS_ID_TOKEN_REQUEST_TOKEN: missingCredentials ? '' : 'fixture-value',
      GITHUB_OUTPUT: output,
      GITHUB_STEP_SUMMARY: jobSummary,
    },
  });
  assert.ifError(result.error);
  assert.equal(existsSync(join(cwd, 'pnpm-publish-summary.json')), false);
  return {
    ...result,
    output: existsSync(output) ? readFileSync(output, 'utf8') : '',
    jobSummary: existsSync(jobSummary) ? readFileSync(jobSummary, 'utf8') : '',
  };
}

test('exports exactly the healthy package names including workspace tools', t => {
  const result = run(t, { messages: [request, marker(adaptor), request, marker(tool)] });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.output, `packages=${JSON.stringify([adaptor.name, tool.name])}\n`);
  assert.match(result.jobSummary, /@openfn\/language-http \| 1.2.3 \| Verified/);
  assert.match(result.jobSummary, /@openfn\/buildtools \| 2.0.0 \| Verified/);
});

test('reports all rejections and exports no package names', t => {
  const result = run(t, {
    messages: [request, rejected(404), marker(adaptor), request, rejected(403), marker(tool)],
  });
  assert.equal(result.status, 1);
  assert.equal(result.output, '');
  assert.match(result.jobSummary, /@openfn\/language-http \| 1.2.3 \| Rejected.*404/);
  assert.match(result.jobSummary, /@openfn\/buildtools \| 2.0.0 \| Rejected.*403/);
  assert.match(result.stderr, /pnpm trust http <otp> --renew/);
  assert.match(result.stderr, /pnpm publish:new http <otp>/);
  assert.match(result.stderr, /npm package settings/);
});

test('reports a healthy package alongside a registry outage', t => {
  const result = run(t, { messages: [request, marker(adaptor), request, rejected(503), marker(tool)] });
  assert.equal(result.status, 1);
  assert.equal(result.output, '');
  assert.match(result.jobSummary, /@openfn\/language-http \| 1.2.3 \| Verified/);
  assert.match(result.jobSummary, /@openfn\/buildtools \| 2.0.0 \| Unverified.*registry unavailable/);
  assert.doesNotMatch(result.stderr, /pnpm trust/);
});

test('requires GitHub OIDC credentials and evidence of an exchange attempt', t => {
  const missing = run(t, { missingCredentials: true });
  assert.equal(missing.status, 1);
  assert.match(missing.jobSummary, /credentials are unavailable/);
  const noAttempt = run(t, { messages: [marker(adaptor), marker(tool)] });
  assert.equal(noAttempt.status, 1);
  assert.match(noAttempt.jobSummary, /Missing successful GitHub OIDC request/);
  assert.equal(noAttempt.output, '');
});

test('fails with malformed, missing, or inconsistent pnpm output', t => {
  for (const summary of ['{', 'missing', '{}', '{"publishedPackages":[{}]}']) {
    const result = run(t, { summary });
    assert.equal(result.status, 1);
    assert.equal(result.output, '');
  }
  const unmatched = run(t, { packages: [], messages: [rejected(404)] });
  assert.equal(unmatched.status, 1);
  assert.match(unmatched.stderr, /Unmatched OIDC event/);
  const duplicate = run(t, { packages: [adaptor], messages: [request, marker(adaptor), marker(adaptor)] });
  assert.equal(duplicate.status, 1);
  assert.match(duplicate.stderr, /Unexpected or duplicate package/);
});

test('treats an empty summary as a successful no-op', t => {
  const result = run(t, { packages: [], missingCredentials: true });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.output, 'packages=[]\n');
  assert.match(result.jobSummary, /No packages to publish/);
});

test('lists packages locally without OIDC events or workflow output', t => {
  const result = run(t, { local: true });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /@openfn\/language-http@1.2.3/);
  assert.equal(result.output, '');
});
