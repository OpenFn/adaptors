import fs from 'node:fs/promises';
import path from 'node:path';
import _ from 'lodash';
import resolvePath from './resolve-path';

type Options = {
  dry?: boolean;
};

export default async (langs: string[] | string, opts: Options = {}) => {
  if (langs[0] == 'all') {
    langs = await fs.readdir(path.resolve('../../packages'));
  }
  for (const l of langs) {
    await migrate(l, opts);
  }
};

const migrate = async (lang: string, { dry }: Options = {}) => {
  console.log('\nMigrating package.json for ', lang);
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
  const { bundleDependencies, bundledDependencies, directories, ...updated } =
    pkg;

  updated.repository = {
    type: 'git',
    url: 'https://github.com/openfn/adaptors.git',
  };
  updated.main = 'dist/index.cjs';
  updated.type = 'module';
  updated.exports = {
    '.': {
      import: './dist/index.js',
      require: './dist/index.cjs',
    },
    './package.json': './package.json',
  };
  updated.types = 'types/index.d.ts';

  updated.files = ['dist/', 'types/', 'ast.json', 'configuration-schema.json'];

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

  // Update dev dependencies (do this with _.defaults so we don't override existing values)
  _.defaults(updated.devDependencies, {
    '@openfn/buildtools': 'workspace:^1.0.1',
    '@openfn/simple-ast': '0.4.1',
  });

  updated.scripts.clean = 'rimraf dist types docs';
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
