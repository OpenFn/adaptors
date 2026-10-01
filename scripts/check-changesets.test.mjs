import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  evaluateCoverage,
  inspectRepository,
} from './check-changesets.mjs';

const git = (cwd, ...args) =>
  execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

const write = async (cwd, file, contents) => {
  const target = path.join(cwd, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, contents);
};

const packageJson = name => JSON.stringify({ name }, null, 2);

const createRepository = async () => {
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'changeset-check-'));
  git(cwd, 'init', '--initial-branch=main');
  git(cwd, 'config', 'user.name', 'Changeset Test');
  git(cwd, 'config', 'user.email', 'changeset@example.com');

  await write(
    cwd,
    'packages/common/package.json',
    packageJson('@openfn/language-common')
  );
  await write(cwd, 'packages/common/index.js', 'export const common = 1;\n');
  await write(
    cwd,
    'packages/gmail/package.json',
    packageJson('@openfn/language-gmail')
  );
  await write(cwd, 'packages/gmail/index.js', 'export const gmail = 1;\n');
  await write(cwd, 'README.md', '# Test repository\n');

  git(cwd, 'add', '.');
  git(cwd, 'commit', '-m', 'Initial commit');
  git(cwd, 'switch', '-c', 'feature');
  return cwd;
};

const withRepository = async callback => {
  const cwd = await createRepository();
  try {
    await callback(cwd);
  } finally {
    await fs.rm(cwd, { recursive: true, force: true });
  }
};

const changeset = releases => {
  const frontmatter = releases
    .map(([name, type]) => `'${name}': ${type}`)
    .join('\n');
  return `---\n${frontmatter}\n---\n\nTest change.\n`;
};

const packageNames = result => result.changedPackages.map(pkg => pkg.name);
const missingNames = result => result.missing.map(pkg => pkg.name);

test('repository-only changes need no changeset', async () =>
  withRepository(async cwd => {
    await write(cwd, 'README.md', '# Updated repository\n');
    const result = await evaluateCoverage({ cwd, baseRef: 'main' });

    assert.deepEqual(result.changedPackages, []);
    assert.deepEqual(result.missing, []);
  }));

test('ignores the changeset README', async () =>
  withRepository(async cwd => {
    await write(cwd, '.changeset/README.md', 'Documentation only.\n');
    const result = await inspectRepository({ cwd, baseRef: 'main' });

    assert.deepEqual(result.changesetFiles, []);
  }));

test('reports a changed adaptor without a changeset', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const common = 2;\n');
    const result = await evaluateCoverage({ cwd, baseRef: 'main' });

    assert.deepEqual(missingNames(result), ['@openfn/language-common']);
  }));

test('accepts a changeset targeting the changed adaptor', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const common = 2;\n');
    await write(
      cwd,
      '.changeset/common.md',
      changeset([['@openfn/language-common', 'patch']])
    );
    const result = await evaluateCoverage({ cwd, baseRef: 'main' });

    assert.deepEqual(result.missing, []);
  }));

test('reports partial coverage across two adaptors', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const common = 2;\n');
    await write(cwd, 'packages/gmail/index.js', 'export const gmail = 2;\n');
    await write(
      cwd,
      '.changeset/gmail.md',
      changeset([['@openfn/language-gmail', 'minor']])
    );
    const result = await evaluateCoverage({ cwd, baseRef: 'main' });

    assert.deepEqual(missingNames(result), ['@openfn/language-common']);
  }));

test('accepts one changeset targeting two adaptors', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const common = 2;\n');
    await write(cwd, 'packages/gmail/index.js', 'export const gmail = 2;\n');
    await write(
      cwd,
      '.changeset/both.md',
      changeset([
        ['@openfn/language-common', 'patch'],
        ['@openfn/language-gmail', 'minor'],
      ])
    );
    const result = await evaluateCoverage({ cwd, baseRef: 'main' });

    assert.deepEqual(result.missing, []);
  }));

test('accepts separate changesets targeting two adaptors', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const common = 2;\n');
    await write(cwd, 'packages/gmail/index.js', 'export const gmail = 2;\n');
    await write(
      cwd,
      '.changeset/common.md',
      changeset([['@openfn/language-common', 'patch']])
    );
    await write(
      cwd,
      '.changeset/gmail.md',
      changeset([['@openfn/language-gmail', 'minor']])
    );
    const result = await evaluateCoverage({ cwd, baseRef: 'main' });

    assert.deepEqual(result.missing, []);
  }));

test('an unrelated changeset does not cover a changed adaptor', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const common = 2;\n');
    await write(
      cwd,
      '.changeset/gmail.md',
      changeset([['@openfn/language-gmail', 'patch']])
    );
    const result = await evaluateCoverage({ cwd, baseRef: 'main' });

    assert.deepEqual(missingNames(result), ['@openfn/language-common']);
  }));

test('reports empty and malformed changesets', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const common = 2;\n');
    await write(cwd, '.changeset/empty.md', '---\n---\n');
    await write(cwd, '.changeset/malformed.md', '---\ninvalid: [\n---\n');
    const result = await evaluateCoverage({ cwd, baseRef: 'main' });

    assert.equal(result.errors.length, 2);
  }));

test('detects both adaptors in a cross-adaptor rename', async () =>
  withRepository(async cwd => {
    git(
      cwd,
      'mv',
      'packages/common/index.js',
      'packages/gmail/from-common.js'
    );
    const result = await inspectRepository({ cwd, baseRef: 'main' });

    assert.deepEqual(packageNames(result), [
      '@openfn/language-common',
      '@openfn/language-gmail',
    ]);
  }));

test('resolves added and deleted package names', async () =>
  withRepository(async cwd => {
    await fs.rm(path.join(cwd, 'packages/common'), {
      recursive: true,
      force: true,
    });
    await write(
      cwd,
      'packages/new/package.json',
      packageJson('@openfn/language-new')
    );
    await write(cwd, 'packages/new/index.js', 'export const value = 1;\n');
    const result = await inspectRepository({ cwd, baseRef: 'main' });

    assert.deepEqual(packageNames(result), [
      '@openfn/language-common',
      '@openfn/language-new',
    ]);
  }));
