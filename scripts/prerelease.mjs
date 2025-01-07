import util from 'node:util';
import c_p from 'node:child_process';
import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import deprecate from './deprecate.mjs';

const exec = util.promisify(c_p.exec);

async function updatePackage(packageName, suffix) {
  const name = packageName.substr('@openfn/langauge-'.length);

  const pkgPath = path.resolve(`packages/${name}/package.json`);
  let pkg = await readFile(pkgPath, 'utf8');
  const pkgJson = JSON.parse(pkg);
  pkgJson.version = `${pkgJson.version}-${suffix}`;

  console.log(`Updated version of ${name} to ${pkgJson.version}`);

  writeFile(pkgPath, JSON.stringify(pkgJson, null, 2));
}

async function prerelease() {
  console.log('Generating changesets');

  // Run changeset version to process all the active
  // changesets and get the net version numbes
  await exec('pnpm changeset version');

  console.log(`generating pnpm report`);
  // Publish with dry-run just to get the report
  await exec(
    `pnpm publish \
      -r \
      --report-summary \
      --publish-branch main \
      --no-git-checks \
      --dry-run`
  );

  console.log('Updating versions');

  // For each package in the report,
  // update the version to include the commit hash
  const hash = process.env.GITHUB_SHA?.substring(0, 8) ?? 'local';

  const { default: report } = await import('../pnpm-publish-summary.json', {
    assert: { type: 'json' },
  });

  for (const pkg of report.publishedPackages) {
    updatePackage(pkg.name, `next-${hash}`);
  }

  // deprecate the current @next tagged stuff
  // (We have to do this before publish or we'll
  // deprecate the wrong thing)
  try {
    await deprecate(report);
    console.log('Deprecated old versions');
  } catch (e) {
    console.error('Error deprecating old adaptor versions!');
    console.error(e);
  }

  await exec('pnpm install');
  await exec('pnpm build');

  console.log('Publishing to npm');

  await exec(`pnpm publish \
    -r \
    --report-summary \
    --publish-branch main \
    --access=public \
    --no-git-checks \
    --tag next`);

  console.log('done!');
}

prerelease();
