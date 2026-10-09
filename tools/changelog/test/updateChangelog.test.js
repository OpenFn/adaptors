import assert from 'node:assert/strict';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { syncBuiltinESMExports } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { mock, test } from 'node:test';
import { format } from 'date-fns';
import { updateChangelog } from '../src/updateChangelog.js';

const airqoChangelog = fs.readFileSync(
  // Snapshot of packages/airqo/CHANGELOG.md at 0e2045d.
  new URL('./fixtures/airqo-released.md', import.meta.url)
);

function fixture(t, contents) {
  const originalCwd = process.cwd();
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'openfn-changelog-test-'));
  const cwd = path.join(root, 'tools', 'changelog');
  const packageDir = path.join(root, 'packages', 'fixture');
  const changelog = path.join(packageDir, 'CHANGELOG.md');
  fs.mkdirSync(cwd, { recursive: true });
  fs.mkdirSync(packageDir, { recursive: true });
  if (contents !== null) fs.writeFileSync(changelog, contents);
  process.chdir(cwd);

  const write = mock.method(fsPromises, 'writeFile');
  syncBuiltinESMExports();
  t.after(() => {
    write.mock.restore();
    syncBuiltinESMExports();
    process.chdir(originalCwd);
    assert.ok(path.resolve(root).startsWith(path.resolve(os.tmpdir()) + path.sep));
    assert.ok(path.basename(root).startsWith('openfn-changelog-test-'));
    fs.rmSync(root, { recursive: true, force: true });
  });
  return { changelog, write };
}

test('updateChangelog', async t => {
  await t.test('preserves the released AirQo changelog byte-for-byte', async t => {
    const { changelog, write } = fixture(t, airqoChangelog);
    await updateChangelog('fixture');
    assert.deepEqual(fs.readFileSync(changelog), airqoChangelog);
    assert.equal(write.mock.callCount(), 0);
  });

  await t.test('preserves a dated file without a final newline', async t => {
    const contents = '# Fixture\n\n## 1.0.0 - 01 January 2026\n\n- Existing change';
    const { changelog, write } = fixture(t, contents);
    await updateChangelog('fixture');
    assert.equal(fs.readFileSync(changelog, 'utf8'), contents);
    assert.equal(write.mock.callCount(), 0);
  });

  await t.test('preserves CRLF and blank lines when no heading changes', async t => {
    const contents = '# Fixture\r\n\r\n## 1.0.0 - 01 January 2026\r\n\r\n- Existing change\r\n\r\n';
    const { changelog, write } = fixture(t, contents);
    await updateChangelog('fixture');
    assert.equal(fs.readFileSync(changelog, 'utf8'), contents);
    assert.equal(write.mock.callCount(), 0);
  });

  await t.test('does not rewrite for an empty historical version list', async t => {
    const contents = '# Fixture\n\n## 1.0.0\n\n- Existing  change\n\n';
    const { changelog, write } = fixture(t, contents);
    await updateChangelog('fixture', { versions: [] });
    assert.equal(fs.readFileSync(changelog, 'utf8'), contents);
    assert.equal(write.mock.callCount(), 0);
  });

  await t.test('does not rewrite when historical versions do not match', async t => {
    const contents = '# Fixture\n\n## 1.0.0\n\n- Existing change\n\n';
    const { changelog, write } = fixture(t, contents);
    await updateChangelog('fixture', {
      versions: [{ version: '2.0.0', date: '2026-01-01T12:00:00Z' }],
    });
    assert.equal(fs.readFileSync(changelog, 'utf8'), contents);
    assert.equal(write.mock.callCount(), 0);
  });

  await t.test('adds the current date once and preserves older headings', async t => {
    const contents = '# Fixture\n\n## 1.1.0\n\n- New change\n\n## 1.0.0 - 01 January 2026\n\n- Old change\n';
    const { changelog, write } = fixture(t, contents);
    const expectedDates = [format(new Date(), 'dd MMMM yyyy')];
    await updateChangelog('fixture');
    expectedDates.push(format(new Date(), 'dd MMMM yyyy'));
    const updated = fs.readFileSync(changelog, 'utf8');
    assert.ok(expectedDates.some(date => updated.includes(`## 1.1.0 - ${date}`)));
    assert.ok(updated.includes('## 1.0.0 - 01 January 2026'));
    assert.equal(write.mock.callCount(), 1);

    write.mock.resetCalls();
    await updateChangelog('fixture');
    assert.equal(fs.readFileSync(changelog, 'utf8'), updated);
    assert.equal(write.mock.callCount(), 0);
  });

  await t.test('adds historical release dates to matching undated headings', async t => {
    const { changelog, write } = fixture(
      t, '# Fixture\n\n## 1.1.0\n\n- New change\n\n## 1.0.0\n\n- Old change\n'
    );
    await updateChangelog('fixture', {
      versions: [
        { version: '1.1.0', date: '2026-02-02T12:00:00' },
        { version: '1.0.0', date: '2026-01-01T12:00:00' },
      ],
    });
    const updated = fs.readFileSync(changelog, 'utf8');
    assert.ok(updated.includes('## 1.1.0 - 02 February 2026'));
    assert.ok(updated.includes('## 1.0.0 - 01 January 2026'));
    assert.equal(write.mock.callCount(), 1);
  });

  await t.test('updates an explicitly matched historical dated heading', async t => {
    const { changelog, write } = fixture(
      t, '# Fixture\n\n## 1.0.0 - 01 January 2026\n\n- Existing change\n'
    );
    await updateChangelog('fixture', {
      versions: [{ version: '1.0.0 - 01 January 2026', date: '2026-02-02T12:00:00' }],
    });
    assert.ok(fs.readFileSync(changelog, 'utf8').includes('## 1.0.0 - 02 February 2026'));
    assert.equal(write.mock.callCount(), 1);
  });

  await t.test('does not rewrite an identical explicit historical date', async t => {
    const contents = '# Fixture\n\n## 1.0.0 - 01 January 2026\n\n- Existing change\n\n';
    const { changelog, write } = fixture(t, contents);
    await updateChangelog('fixture', {
      versions: [{ version: '1.0.0 - 01 January 2026', date: '2026-01-01T12:00:00' }],
    });
    assert.equal(fs.readFileSync(changelog, 'utf8'), contents);
    assert.equal(write.mock.callCount(), 0);
  });

  await t.test('returns without creating a missing changelog', async t => {
    const { changelog, write } = fixture(t, null);
    await updateChangelog('fixture');
    assert.equal(fs.existsSync(changelog), false);
    assert.equal(write.mock.callCount(), 0);
  });
});
