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
const changesetsDocsUrl =
  'https://github.com/OpenFn/adaptors/blob/main/README.md#changesets';

const runGit = (args, { cwd = rootDir, allowFailure = false } = {}) => {
  try {
    return execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', allowFailure ? 'ignore' : 'pipe'],
    });
  } catch (error) {
    if (allowFailure) return null;

    const detail = error.stderr?.trim() || error.message;
    throw new Error(`git ${args.join(' ')} failed: ${detail}`);
  }
};

const normalizePath = file => file.split(path.sep).join('/');

export const parseNameStatus = output => {
  const tokens = output.split('\0');
  if (tokens.at(-1) === '') tokens.pop();

  const entries = [];
  for (let index = 0; index < tokens.length; ) {
    const status = tokens[index++];
    const pathCount = ['C', 'R'].includes(status[0]) ? 2 : 1;
    const paths = tokens.slice(index, index + pathCount);

    if (paths.length !== pathCount) {
      throw new Error(`Could not parse git diff entry with status "${status}".`);
    }

    entries.push({ status, paths: paths.map(normalizePath) });
    index += pathCount;
  }

  return entries;
};

export const findChangedAdaptorDirectories = entries => {
  const adaptors = new Map();

  for (const entry of entries) {
    const changedPaths =
      entry.status[0] === 'C' ? [entry.paths.at(-1)] : entry.paths;

    for (const file of changedPaths) {
      const match = /^packages\/([^/]+)(?:\/|$)/.exec(file);
      if (!match) continue;

      const directory = match[1];
      const paths = adaptors.get(directory) ?? new Set();
      paths.add(file);
      adaptors.set(directory, paths);
    }
  }

  return adaptors;
};

export const findChangesetFiles = entries => {
  const files = new Set();

  for (const entry of entries) {
    if (!['A', 'M'].includes(entry.status[0])) continue;

    const file = entry.paths.at(-1);
    if (
      /^\.changeset\/[^/]+\.md$/.test(file) &&
      path.posix.basename(file) !== 'README.md'
    ) {
      files.add(file);
    }
  }

  return [...files].sort();
};

const readJson = (contents, source) => {
  try {
    return JSON.parse(contents);
  } catch (error) {
    throw new Error(`Invalid JSON in ${source}: ${error.message}`);
  }
};

const readPackageAtBase = (directory, mergeBase, cwd) => {
  const packagePath = `packages/${directory}/package.json`;
  const contents = runGit(['show', `${mergeBase}:${packagePath}`], {
    cwd,
    allowFailure: true,
  });

  if (contents === null) {
    throw new Error(
      `Could not find ${packagePath} in the working tree or at ${mergeBase}.`
    );
  }

  return readJson(contents, `${mergeBase}:${packagePath}`);
};

const readPackage = async (directory, mergeBase, cwd) => {
  const packagePath = path.join(cwd, 'packages', directory, 'package.json');

  try {
    return readJson(
      await fs.readFile(packagePath, 'utf8'),
      normalizePath(path.relative(cwd, packagePath))
    );
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return readPackageAtBase(directory, mergeBase, cwd);
  }
};

export const resolveChangedPackages = async (
  adaptorDirectories,
  mergeBase,
  { cwd = rootDir } = {}
) => {
  const packagesByName = new Map();

  for (const [directory, changedPaths] of adaptorDirectories) {
    const packageJson = await readPackage(directory, mergeBase, cwd);

    if (
      typeof packageJson.name !== 'string' ||
      !packageJson.name.startsWith('@openfn/language-')
    ) {
      throw new Error(
        `packages/${directory}/package.json does not define an OpenFn adaptor package name.`
      );
    }

    const existing = packagesByName.get(packageJson.name) ?? {
      name: packageJson.name,
      directories: new Set(),
      paths: new Set(),
    };
    existing.directories.add(directory);
    for (const file of changedPaths) existing.paths.add(file);
    packagesByName.set(packageJson.name, existing);
  }

  return [...packagesByName.values()]
    .map(pkg => ({
      name: pkg.name,
      directories: [...pkg.directories].sort(),
      paths: [...pkg.paths].sort(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

const getDefaultBaseRef = async cwd => {
  let baseBranch = 'main';

  try {
    const config = readJson(
      await fs.readFile(path.join(cwd, '.changeset', 'config.json'), 'utf8'),
      '.changeset/config.json'
    );
    if (typeof config.baseBranch === 'string') {
      baseBranch = config.baseBranch;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  for (const candidate of [`origin/${baseBranch}`, baseBranch]) {
    const commit = runGit(
      ['rev-parse', '--verify', '--quiet', `${candidate}^{commit}`],
      { cwd, allowFailure: true }
    );
    if (commit !== null) return candidate;
  }

  throw new Error(
    `Could not resolve origin/${baseBranch} or ${baseBranch}. Pass --base <ref>.`
  );
};

const getUntrackedEntries = cwd => {
  const output = runGit(
    ['ls-files', '--others', '--exclude-standard', '-z'],
    { cwd }
  );

  return output
    .split('\0')
    .filter(Boolean)
    .map(file => ({ status: 'A', paths: [normalizePath(file)] }));
};

export const inspectRepository = async ({
  cwd = rootDir,
  baseRef,
} = {}) => {
  const resolvedBase = baseRef ?? (await getDefaultBaseRef(cwd));
  const mergeBase = runGit(['merge-base', resolvedBase, 'HEAD'], {
    cwd,
  }).trim();

  if (!mergeBase) {
    throw new Error(`Could not find a merge base for ${resolvedBase} and HEAD.`);
  }

  const entries = [
    ...parseNameStatus(
      runGit(
        [
          'diff',
          '--name-status',
          '-z',
          '--find-renames',
          '--find-copies',
          mergeBase,
          '--',
        ],
        { cwd }
      )
    ),
    ...getUntrackedEntries(cwd),
  ];
  const adaptorDirectories = findChangedAdaptorDirectories(entries);
  const changedPackages = await resolveChangedPackages(
    adaptorDirectories,
    mergeBase,
    { cwd }
  );

  return {
    baseRef: resolvedBase,
    mergeBase,
    entries,
    changedPackages,
    changesetFiles: findChangesetFiles(entries),
  };
};

export const parseChangesetTargets = async (
  files,
  { cwd = rootDir, parser } = {}
) => {
  const parse = parser ?? (await import('@changesets/parse')).default;
  const targets = new Set();
  const parsedFiles = [];
  const errors = [];

  for (const file of files) {
    try {
      const changeset = parse(await fs.readFile(path.join(cwd, file), 'utf8'));

      if (!changeset.releases.length) {
        throw new Error('the changeset does not target any packages');
      }

      const releases = changeset.releases.map(release => release.name).sort();
      for (const name of releases) targets.add(name);
      parsedFiles.push({ file, releases });
    } catch (error) {
      errors.push({ file, message: error.message });
    }
  }

  return { targets, parsedFiles, errors };
};

export const findMissingPackages = (changedPackages, targets) =>
  changedPackages.filter(pkg => !targets.has(pkg.name));

const appendFileFromEnvironment = async (variable, contents, environment) => {
  const file = environment[variable];
  if (file) await fs.appendFile(file, `${contents.trimEnd()}\n`);
};

const appendSummary = (contents, environment) =>
  appendFileFromEnvironment('GITHUB_STEP_SUMMARY', contents, environment);

const writeOutputs = (values, environment) =>
  appendFileFromEnvironment(
    'GITHUB_OUTPUT',
    Object.entries(values)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n'),
    environment
  );

const formatPackageList = packages =>
  packages.map(pkg => `- \`${pkg.name}\``).join('\n');

const printNoChangesetRequired = async environment => {
  console.log('No adaptor packages changed; a changeset is not required.');
  await appendSummary(
    `## Changeset not required

No files under \`packages/*\` changed in this pull request.`,
    environment
  );
};

const runDetect = async (inspection, environment) => {
  const required = inspection.changedPackages.length > 0;

  await writeOutputs(
    {
      required: String(required),
      'changed-packages': JSON.stringify(
        inspection.changedPackages.map(pkg => pkg.name)
      ),
    },
    environment
  );

  if (!required) {
    await printNoChangesetRequired(environment);
    return;
  }

  console.log('Changeset coverage is required for:');
  for (const pkg of inspection.changedPackages) console.log(`- ${pkg.name}`);

  await appendSummary(
    `## Changeset required

The following adaptor packages changed:

${formatPackageList(inspection.changedPackages)}`,
    environment
  );
};

const formatFailure = (missingPackages, errors) => {
  const lines = ['Changeset coverage check failed.', ''];

  if (missingPackages.length) {
    lines.push('Missing changesets for:');
    for (const pkg of missingPackages) {
      lines.push(`- ${pkg.name}`);
      for (const file of pkg.paths) lines.push(`  - ${file}`);
    }
    lines.push('');
  }

  if (errors.length) {
    lines.push('Invalid changeset files:');
    for (const error of errors) {
      lines.push(`- ${error.file}: ${error.message}`);
    }
    lines.push('');
  }

  lines.push("Run 'pnpm changeset' and commit the generated file.");
  lines.push(
    "If no release is needed, ask a maintainer to apply the exact 'no changeset required' label."
  );
  lines.push(`See ${changesetsDocsUrl}.`);

  return lines.join('\n');
};

const formatFailureSummary = (missingPackages, errors) => {
  const lines = ['## Changeset coverage failed', ''];

  if (missingPackages.length) {
    lines.push('### Missing adaptor packages', '');
    for (const pkg of missingPackages) {
      lines.push(`- \`${pkg.name}\``);
      for (const file of pkg.paths) lines.push(`  - \`${file}\``);
    }
    lines.push('');
  }

  if (errors.length) {
    lines.push('### Invalid changeset files', '');
    for (const error of errors) {
      lines.push(`- \`${error.file}\`: ${error.message}`);
    }
    lines.push('');
  }

  lines.push(
    'Run `pnpm changeset`, commit the generated file, and push it.',
    '',
    'If the change does not need a release, ask a maintainer to apply the exact `no changeset required` label.',
    '',
    `See the [Changesets documentation](${changesetsDocsUrl}) for details.`
  );

  return lines.join('\n');
};

const escapeWorkflowCommand = value =>
  value.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');

const runValidate = async (inspection, environment) => {
  if (!inspection.changedPackages.length) {
    await printNoChangesetRequired(environment);
    return true;
  }

  const parsed = await parseChangesetTargets(inspection.changesetFiles);
  const missingPackages = findMissingPackages(
    inspection.changedPackages,
    parsed.targets
  );

  if (missingPackages.length || parsed.errors.length) {
    const failure = formatFailure(missingPackages, parsed.errors);
    console.error(failure);

    if (environment.GITHUB_ACTIONS === 'true') {
      console.error(
        `::error title=Changeset required::${escapeWorkflowCommand(failure)}`
      );
    }

    await appendSummary(
      formatFailureSummary(missingPackages, parsed.errors),
      environment
    );
    return false;
  }

  console.log('Changesets cover every changed adaptor package.');
  for (const pkg of inspection.changedPackages) console.log(`- ${pkg.name}`);

  const changesetList = parsed.parsedFiles
    .map(item => `- \`${item.file}\``)
    .join('\n');
  await appendSummary(
    `## Changeset coverage passed

Covered adaptor packages:

${formatPackageList(inspection.changedPackages)}

Changeset files:

${changesetList}`,
    environment
  );
  return true;
};

const parseArguments = argv => {
  const [mode, ...args] = argv;
  if (!['detect', 'validate'].includes(mode)) {
    throw new Error(
      'Usage: node scripts/check-changesets.mjs <detect|validate> [--base <ref>]'
    );
  }

  let baseRef;
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] !== '--base' || !args[index + 1]) {
      throw new Error(`Unknown or incomplete argument: ${args[index]}`);
    }
    baseRef = args[++index];
  }

  return { mode, baseRef };
};

export const main = async (
  argv = process.argv.slice(2),
  environment = process.env
) => {
  const { mode, baseRef } = parseArguments(argv);
  const inspection = await inspectRepository({ baseRef });

  if (mode === 'detect') {
    await runDetect(inspection, environment);
    return true;
  }

  return runValidate(inspection, environment);
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
