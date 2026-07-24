import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  findChangedAdaptorDirectories,
  findChangesetFiles,
  findMissingPackages,
  inspectRepository,
  parseChangesetTargets,
  parseNameStatus,
} from './check-changesets.mjs';

const runGit = (cwd, ...args) =>
  execFileSync('git', args, { cwd, encoding: 'utf8' });

const write = async (cwd, file, contents) => {
  const target = path.join(cwd, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, contents);
};

const packageJson = name => JSON.stringify({ name }, null, 2);

const createRepository = async () => {
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'changeset-check-'));
  runGit(cwd, 'init', '--initial-branch=main');
  runGit(cwd, 'config', 'user.name', 'Changeset Test');
  runGit(cwd, 'config', 'user.email', 'changeset@example.com');

  await write(
    cwd,
    '.changeset/config.json',
    JSON.stringify({ baseBranch: 'main' })
  );
  await write(
    cwd,
    'packages/common/package.json',
    packageJson('@openfn/language-common')
  );
  await write(
    cwd,
    'packages/gmail/package.json',
    packageJson('@openfn/language-gmail')
  );
  await write(cwd, 'README.md', '# Test repository\n');

  runGit(cwd, 'add', '.');
  runGit(cwd, 'commit', '-m', 'Initial commit');
  runGit(cwd, 'switch', '-c', 'feature');

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

test('parses deleted and renamed files from a name-status diff', () => {
  const entries = parseNameStatus(
    'D\0packages/common/src/old.js\0R100\0packages/gmail/src/old.js\0packages/gmail/src/new.js\0'
  );

  assert.deepEqual(entries, [
    { status: 'D', paths: ['packages/common/src/old.js'] },
    {
      status: 'R100',
      paths: ['packages/gmail/src/old.js', 'packages/gmail/src/new.js'],
    },
  ]);

  const directories = findChangedAdaptorDirectories(entries);
  assert.deepEqual([...directories.keys()], ['common', 'gmail']);
});

test('only treats the destination of a copied file as changed', () => {
  const entries = parseNameStatus(
    'C100\0packages/common/src/source.js\0packages/gmail/src/copy.js\0'
  );

  const directories = findChangedAdaptorDirectories(entries);

  assert.deepEqual([...directories.keys()], ['gmail']);
});

test('ignores repository files and the changeset README', () => {
  const entries = [
    { status: 'M', paths: ['README.md'] },
    { status: 'M', paths: ['.changeset/README.md'] },
    { status: 'A', paths: ['.changeset/valid.md'] },
  ];

  assert.equal(findChangedAdaptorDirectories(entries).size, 0);
  assert.deepEqual(findChangesetFiles(entries), ['.changeset/valid.md']);
});

test('repository-only changes do not require a changeset', async () =>
  withRepository(async cwd => {
    await write(cwd, 'README.md', '# Updated repository\n');

    const inspection = await inspectRepository({ cwd, baseRef: 'main' });

    assert.deepEqual(inspection.changedPackages, []);
  }));

test('detects one changed adaptor without a changeset', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const value = 1;\n');

    const inspection = await inspectRepository({ cwd, baseRef: 'main' });
    const parsed = await parseChangesetTargets(inspection.changesetFiles, {
      cwd,
    });

    assert.deepEqual(
      findMissingPackages(inspection.changedPackages, parsed.targets).map(
        pkg => pkg.name
      ),
      ['@openfn/language-common']
    );
  }));

test('passes when one changed adaptor is targeted', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const value = 1;\n');
    await write(
      cwd,
      '.changeset/common.md',
      changeset([['@openfn/language-common', 'patch']])
    );

    const inspection = await inspectRepository({ cwd, baseRef: 'main' });
    const parsed = await parseChangesetTargets(inspection.changesetFiles, {
      cwd,
    });

    assert.deepEqual(
      findMissingPackages(inspection.changedPackages, parsed.targets),
      []
    );
  }));

test('fails when only one of two changed adaptors is targeted', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const common = 1;\n');
    await write(cwd, 'packages/gmail/index.js', 'export const gmail = 1;\n');
    await write(
      cwd,
      '.changeset/gmail.md',
      changeset([['@openfn/language-gmail', 'minor']])
    );

    const inspection = await inspectRepository({ cwd, baseRef: 'main' });
    const parsed = await parseChangesetTargets(inspection.changesetFiles, {
      cwd,
    });

    assert.deepEqual(
      findMissingPackages(inspection.changedPackages, parsed.targets).map(
        pkg => pkg.name
      ),
      ['@openfn/language-common']
    );
  }));

test('passes when one changeset targets two changed adaptors', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const common = 1;\n');
    await write(cwd, 'packages/gmail/index.js', 'export const gmail = 1;\n');
    await write(
      cwd,
      '.changeset/both.md',
      changeset([
        ['@openfn/language-common', 'patch'],
        ['@openfn/language-gmail', 'minor'],
      ])
    );

    const inspection = await inspectRepository({ cwd, baseRef: 'main' });
    const parsed = await parseChangesetTargets(inspection.changesetFiles, {
      cwd,
    });

    assert.deepEqual(
      findMissingPackages(inspection.changedPackages, parsed.targets),
      []
    );
  }));

test('passes when separate changesets target two changed adaptors', async () =>
  withRepository(async cwd => {
    await write(cwd, 'packages/common/index.js', 'export const common = 1;\n');
    await write(cwd, 'packages/gmail/index.js', 'export const gmail = 1;\n');
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

    const inspection = await inspectRepository({ cwd, baseRef: 'main' });
    const parsed = await parseChangesetTargets(inspection.changesetFiles, {
      cwd,
    });

    assert.deepEqual(
      findMissingPackages(inspection.changedPackages, parsed.targets),
      []
    );
  }));

test('an unrelated target does not cover a changed adaptor', () => {
  const changedPackages = [
    {
      name: '@openfn/language-common',
      directories: ['common'],
      paths: ['packages/common/index.js'],
    },
  ];

  assert.deepEqual(
    findMissingPackages(
      changedPackages,
      new Set(['@openfn/language-gmail'])
    ),
    changedPackages
  );
});

test('reports empty and malformed changesets', async () =>
  withRepository(async cwd => {
    await write(cwd, '.changeset/empty.md', '---\n---\n');
    await write(cwd, '.changeset/malformed.md', '---\ninvalid: [\n---\n');

    const parsed = await parseChangesetTargets(
      ['.changeset/empty.md', '.changeset/malformed.md'],
      { cwd }
    );

    assert.deepEqual(
      parsed.errors.map(error => error.file),
      ['.changeset/empty.md', '.changeset/malformed.md']
    );
  }));

test('resolves added and deleted package names from the correct revision', async () =>
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

    const inspection = await inspectRepository({ cwd, baseRef: 'main' });

    assert.deepEqual(
      inspection.changedPackages.map(pkg => pkg.name),
      ['@openfn/language-common', '@openfn/language-new']
    );
  }));
