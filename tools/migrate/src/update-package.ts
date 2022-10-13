import fs from 'node:fs/promises';
import resolvePath from './resolve-path';

type Options = {
  dry?: boolean;
};

// Update package json
export default async (lang: string, { dry }: Options = {}) => {
  console.log('Migrating package.json for ', lang);
  const root = resolvePath(lang);

  // load the package json for a language
  const pkg = await fs.readFile(`${root}/package.json`, 'utf8');

  const updated = updatePackage(JSON.parse(pkg), lang);

  const result = JSON.stringify(updated, null, 2);

  if (!dry) {
    console.log('Writing to ', `${root}/package.json`);
    await fs.writeFile(`${root}/package.json`, result);
  } else {
    console.log(result);
  }
  return result;
};

export const updatePackage = (pkg: Record<string, any>, lang: string) => {
  const { bundledDependencies, directories, ...updated } = pkg;

  updated.repository = {
    type: 'git',
    url: 'https://github.com/openfn/adaptors.git',
  };

  updated.type = 'module';
  updated.main = 'dist/index.cjs';
  updated.types = 'types/index.d.ts';

  updated.files = ['dist/', 'types/', 'ast.json', 'configuration-schema.json'];

  // TODO is babel needed for mocha? ... yes hmm.
  ['dependencies', 'devDependencies'].forEach(depsKey => {
    const { esbuild, esdoc, babel, jsdoc, ...otherDeps } = pkg[depsKey];

    // TODO simple ast is needed for now but I'll port it soon
    // delete otherDeps['@openfn/simple-ast'];

    // Filter out @babel stuff
    updated[depsKey] = {};
    const keys = Object.keys(otherDeps);
    keys
      .filter(k => !k.startsWith('@babel/'))
      .map(k => {
        updated[depsKey][k] = otherDeps[k];
      });
  });

  // For now we need to ensure esno is a dev dependency
  // so that we can hook into the build tool
  updated.devDependencies.esno = '^0.16.3';
  updated.devDependencies.rimraf = '^3.0.2';
  updated.devDependencies['@openfn/buildtools'] = 'workspace:^1.0.0';

  updated.scripts.clean = 'rm -rf dist types docs';
  updated.scripts.build = `pnpm clean && build-adaptor ${lang}`;
  updated.scripts.pack = 'pnpm pack --pack-destination ../../dist';
  delete updated.scripts.ast;
  delete updated.scripts.postversion;
  delete updated.scripts.version;

  // remove babel from mocha tests
  updated.scripts.test = updated.scripts.test.replace(
    '--require @babel/register',
    '--experimental-specifier-resolution=node --no-warnings'
  );
  if (updated.scripts['test:watch']) {
    updated.scripts['test:watch'] = updated.scripts['test:watch'].replace(
      '--require @babel/register',
      '--experimental-specifier-resolution=node --no-warnings'
    );
  }

  // TODO check author, license

  return updated;
};
