import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { format } from 'date-fns';
import { updateChangelog } from '../src/updateChangelog.js';

const fixturesDir = new URL('./fixtures/', import.meta.url);
const oldDate = new Date('2000-01-01T00:00:00Z');

test('updateChangelog', async t => {
  let packagesDir;
  t.beforeEach(() => {
    packagesDir = fs.mkdtempSync(path.join(os.tmpdir(), 'openfn-changelog-test-'));
    fs.cpSync(fixturesDir, packagesDir, { recursive: true });
  });
  t.afterEach(() => {
    assert.equal(path.dirname(packagesDir), path.resolve(os.tmpdir()));
    assert.ok(path.basename(packagesDir).startsWith('openfn-changelog-test-'));
    fs.rmSync(packagesDir, { recursive: true, force: true });
  });

  const noOps = [
    ['preserves the released AirQo changelog', 'airqo', null],
    ['preserves a dated file without a final newline', 'no-newline', null],
    ['preserves CRLF and blank lines', 'crlf', null],
    ['preserves an empty historical version list', 'undated', { versions: [] }],
    ['preserves unmatched historical versions', 'undated', {
      versions: [{ version: '2.0.0', date: '2026-01-01T12:00:00' }],
    }],
    ['preserves an identical explicit historical date', 'dated', {
      versions: [{ version: '1.0.0 - 01 January 2026', date: '2026-01-01T12:00:00' }],
    }],
  ];
  for (const [name, adaptor, versions] of noOps) {
    await t.test(name, async () => {
      const changelog = path.join(packagesDir, adaptor, 'CHANGELOG.md');
      const original = fs.readFileSync(changelog);
      fs.utimesSync(changelog, oldDate, oldDate);
      const mtime = fs.statSync(changelog).mtimeMs;
      await updateChangelog(adaptor, versions, packagesDir);
      assert.deepEqual(fs.readFileSync(changelog), original);
      assert.equal(fs.statSync(changelog).mtimeMs, mtime);
    });
  }

  await t.test('adds the current date once and preserves older headings', async () => {
    const changelog = path.join(packagesDir, 'latest', 'CHANGELOG.md');
    const expectedDates = [format(new Date(), 'dd MMMM yyyy')];
    await updateChangelog('latest', null, packagesDir);
    expectedDates.push(format(new Date(), 'dd MMMM yyyy'));
    const updated = fs.readFileSync(changelog, 'utf8');
    assert.ok(expectedDates.some(date => updated.includes(`## 1.1.0 - ${date}`)));
    assert.ok(updated.includes('## 1.0.0 - 01 January 2026'));

    fs.utimesSync(changelog, oldDate, oldDate);
    const mtime = fs.statSync(changelog).mtimeMs;
    await updateChangelog('latest', null, packagesDir);
    assert.equal(fs.readFileSync(changelog, 'utf8'), updated);
    assert.equal(fs.statSync(changelog).mtimeMs, mtime);
  });

  await t.test('adds historical dates to matching undated headings', async () => {
    await updateChangelog('historical', {
      versions: [
        { version: '1.1.0', date: '2026-02-02T12:00:00' },
        { version: '1.0.0', date: '2026-01-01T12:00:00' },
      ],
    }, packagesDir);
    const updated = fs.readFileSync(path.join(packagesDir, 'historical', 'CHANGELOG.md'), 'utf8');
    assert.ok(updated.includes('## 1.1.0 - 02 February 2026'));
    assert.ok(updated.includes('## 1.0.0 - 01 January 2026'));
  });

  await t.test('updates an explicitly matched historical dated heading', async () => {
    await updateChangelog('dated', {
      versions: [{ version: '1.0.0 - 01 January 2026', date: '2026-02-02T12:00:00' }],
    }, packagesDir);
    const updated = fs.readFileSync(path.join(packagesDir, 'dated', 'CHANGELOG.md'), 'utf8');
    assert.ok(updated.includes('## 1.0.0 - 02 February 2026'));
  });

  await t.test('does not create a missing changelog', async () => {
    await updateChangelog('missing', null, packagesDir);
    assert.equal(fs.existsSync(path.join(packagesDir, 'missing', 'CHANGELOG.md')), false);
  });
});
