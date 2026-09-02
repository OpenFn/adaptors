#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const docsUrl =
  'https://github.com/OpenFn/adaptors/blob/main/README.md#changesets';

const git = (args, { cwd = rootDir, allowFailure = false } = {}) => {
  try {
    return execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', allowFailure ? 'ignore' : 'pipe'],
    });
  } catch (error) {
    if (allowFailure) return null;
    throw new Error(error.stderr?.trim() || error.message);
  }
};

const splitFiles = output => output.split('\0').filter(Boolean);

const resolveBase = cwd => {
  for (const ref of ['origin/main', 'main']) {
    if (
      git(['rev-parse', '--verify', '--quiet', `${ref}^{commit}`], {
        cwd,
        allowFailure: true,
      })
    ) {
      return ref;
    }
  }
  throw new Error('Could not find origin/main or main. Pass --base <ref>.');
};

const readPackage = async (directory, mergeBase, cwd) => {
  const packageFile = `packages/${directory}/package.json`;

  try {
    return JSON.parse(await fs.readFile(path.join(cwd, packageFile), 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(`Could not read ${packageFile}: ${error.message}`);
    }

    const contents = git(['show', `${mergeBase}:${packageFile}`], {
      cwd,
      allowFailure: true,
    });
    if (!contents) {
      throw new Error(`Could not find ${packageFile}.`);
    }
    return JSON.parse(contents);
  }
};

export const inspectRepository = async ({
  cwd = rootDir,
  baseRef,
} = {}) => {
  const base = baseRef ?? resolveBase(cwd);
  const mergeBase = git(['merge-base', base, 'HEAD'], { cwd }).trim();
  const untrackedFiles = splitFiles(
    git(['ls-files', '--others', '--exclude-standard', '-z'], { cwd })
  );
  const changedFiles = [
    ...splitFiles(
      git(['diff', '--name-only', '--no-renames', '-z', mergeBase, '--'], {
        cwd,
      })
    ),
    ...untrackedFiles,
  ];

  const pathsByDirectory = new Map();
  for (const file of new Set(changedFiles)) {
    const match = /^packages\/([^/]+)\//.exec(file);
    if (!match) continue;

    const paths = pathsByDirectory.get(match[1]) ?? [];
    paths.push(file);
    pathsByDirectory.set(match[1], paths);
  }

  const packagesByName = new Map();
  for (const [directory, files] of pathsByDirectory) {
    const packageJson = await readPackage(directory, mergeBase, cwd);
    if (!packageJson.name?.startsWith('@openfn/language-')) {
      throw new Error(
        `packages/${directory}/package.json has no OpenFn adaptor package name.`
      );
    }

    const paths = packagesByName.get(packageJson.name) ?? [];
    paths.push(...files);
    packagesByName.set(packageJson.name, paths);
  }
  const changedPackages = [...packagesByName]
    .map(([name, files]) => ({ name, paths: [...new Set(files)].sort() }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const changesetFiles = [
    ...splitFiles(
      git(
        [
          'diff',
          '--name-only',
          '-z',
          '--diff-filter=AM',
          mergeBase,
          '--',
          '.changeset/*.md',
        ],
        { cwd }
      )
    ),
    ...untrackedFiles.filter(file => /^\.changeset\/[^/]+\.md$/.test(file)),
  ]
    .filter(file => file !== '.changeset/README.md')
    .filter((file, index, files) => files.indexOf(file) === index)
    .sort();

  return { changedPackages, changesetFiles };
};

export const evaluateCoverage = async ({
  cwd = rootDir,
  baseRef,
  parser,
} = {}) => {
  const inspection = await inspectRepository({ cwd, baseRef });
  if (!inspection.changedPackages.length) {
    return { ...inspection, covered: [], missing: [], errors: [] };
  }

  const parse = parser ?? (await import('@changesets/parse')).default;
  const covered = new Set();
  const errors = [];

  for (const file of inspection.changesetFiles) {
    try {
      const changeset = parse(await fs.readFile(path.join(cwd, file), 'utf8'));
      if (!changeset.releases.length) {
        throw new Error('does not target any packages');
      }
      for (const release of changeset.releases) covered.add(release.name);
    } catch (error) {
      errors.push(`${file}: ${error.message}`);
    }
  }

  return {
    ...inspection,
    covered: [...covered].sort(),
    missing: inspection.changedPackages.filter(
      pkg => !covered.has(pkg.name)
    ),
    errors,
  };
};

const appendEnvironmentFile = async (environment, name, contents) => {
  if (environment[name]) {
    await fs.appendFile(environment[name], `${contents.trimEnd()}\n`);
  }
};

const packageList = packages =>
  packages.map(pkg => `- \`${pkg.name}\``).join('\n');

const reportNotRequired = async environment => {
  console.log('No adaptor packages changed; a changeset is not required.');
  await appendEnvironmentFile(
    environment,
    'GITHUB_STEP_SUMMARY',
    `## Changeset not required

No files under \`packages/*\` changed in this pull request.`
  );
};

const detect = async (baseRef, environment) => {
  const { changedPackages } = await inspectRepository({ baseRef });
  const required = changedPackages.length > 0;

  await appendEnvironmentFile(
    environment,
    'GITHUB_OUTPUT',
    `required=${required}
changed-packages=${JSON.stringify(changedPackages.map(pkg => pkg.name))}`
  );

  if (!required) return reportNotRequired(environment);

  console.log('Changeset coverage is required for:');
  changedPackages.forEach(pkg => console.log(`- ${pkg.name}`));
  await appendEnvironmentFile(
    environment,
    'GITHUB_STEP_SUMMARY',
    `## Changeset required

${packageList(changedPackages)}`
  );
};

const validate = async (baseRef, environment) => {
  const result = await evaluateCoverage({ baseRef });
  if (!result.changedPackages.length) {
    await reportNotRequired(environment);
    return true;
  }

  if (result.missing.length || result.errors.length) {
    const lines = ['Changeset coverage check failed.'];
    if (result.missing.length) {
      lines.push('', 'Missing changesets for:');
      for (const pkg of result.missing) {
        lines.push(`- ${pkg.name}`);
        pkg.paths.forEach(file => lines.push(`  - ${file}`));
      }
    }
    if (result.errors.length) {
      lines.push('', 'Invalid changesets:');
      result.errors.forEach(error => lines.push(`- ${error}`));
    }
    lines.push(
      '',
      "Run 'pnpm changeset' and commit the generated file.",
      "If no release is needed, ask a maintainer to apply the exact 'no changeset required' label.",
      `See ${docsUrl}.`
    );

    const message = lines.join('\n');
    console.error(message);
    if (environment.GITHUB_ACTIONS === 'true') {
      const annotation = message
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
      console.error(`::error title=Changeset required::${annotation}`);
    }
    await appendEnvironmentFile(
      environment,
      'GITHUB_STEP_SUMMARY',
      `## Changeset coverage failed

\`\`\`
${message}
\`\`\``
    );
    return false;
  }

  console.log('Changesets cover every changed adaptor package.');
  result.changedPackages.forEach(pkg => console.log(`- ${pkg.name}`));
  await appendEnvironmentFile(
    environment,
    'GITHUB_STEP_SUMMARY',
    `## Changeset coverage passed

${packageList(result.changedPackages)}`
  );
  return true;
};

const parseArguments = argv => {
  const mode = argv[0];
  if (!['detect', 'validate'].includes(mode)) {
    throw new Error(
      'Usage: node scripts/check-changesets.mjs <detect|validate> [--base <ref>]'
    );
  }

  if (argv.length === 1) return { mode };
  if (argv.length === 3 && argv[1] === '--base') {
    return { mode, baseRef: argv[2] };
  }
  throw new Error('Expected an optional --base <ref> argument.');
};

export const main = async (
  argv = process.argv.slice(2),
  environment = process.env
) => {
  const { mode, baseRef } = parseArguments(argv);
  if (mode === 'detect') {
    await detect(baseRef, environment);
    return true;
  }
  return validate(baseRef, environment);
};

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMain) {
  main()
    .then(success => {
      if (!success) process.exitCode = 1;
    })
    .catch(error => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
