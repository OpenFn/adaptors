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

  const updated = updatePackage(JSON.parse(pkg));

  const result = JSON.stringify(updated, null, 2);

  if (!dry) {
    console.log('Writing to ', `${root}/package.json`);
    await fs.writeFile(`${root}/package.json`, result);
  } else {
    console.log(result);
  }
  return result;
};

export const updatePackage = (pkg: Record<string, any>) => {
  const { bundledDependencies, directories, ...updated } = pkg;

  updated.type = 'module';

  updated.files = ['dist/', 'types/', 'ast.json', 'configuration-schema.json'];

  // TODO is babel needed for mocha? ... yes hmm.
  ['dependencies', 'devDependencies'].forEach(depsKey => {
    const { esbuild, esdoc, babel, jsdoc, ...otherDeps } = pkg[depsKey];
    // TODO simple ast is needed for now but I'll port it soon
    // delete otherDeps['@openfn/simple-ast'];
    updated[depsKey] = otherDeps;
  });

  // For now we need to ensure esno is a dev dependency
  // so that we can hook into the build tool
  updated.devDependencies.esno = '^0.16.3';

  updated.scripts.clean = 'rm -rf dist types docs';
  updated.scripts.build = 'pnpm clean && build-adaptor http';
  updated.scripts.pack = 'pnpm pack --pack-destination ../../dist';
  delete updated.scripts.ast;
  delete updated.scripts.postversion;
  delete updated.scripts.version;

  // TODO check author, license

  return updated;
};
