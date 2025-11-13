/**
 * This is our new generator function
 *
 * It'll take a path to an adaptor on disk
 *
 * It'll run the doc build tool
 * (or maybe doc build will call this - the key is that the logic is sharead)
 *
 * For now it'll return the verbatim raw output, plus a signature
 *
 * Later it'll massage the data a bit more
 *
 * One of the big jobs here is to also include common docs
 */

import fs, { readFile } from 'node:fs/promises';
import path from 'node:path';
// @ts-ignore
import FileSet from 'file-set';
import { parse } from './parse';
import extractExports from './util/extract-exports';

export default async (root: string) => {
  // first we parse the adaptor
  const functions = await parse(root);
  // now find all it's external exports
  // for any external @openfn export, build its docs
  // add all new functions

  let externals: any[] = [];
  // TODO use package.json
  if (!root.endsWith('common')) {
    externals = await findExternalFunctions(root);
    functions.push(...externals);
  }

  return functions;
};

// TODO this is copied out of the old buildtools
// It's not perfect because it finds any old export from common
// and dumps it in the top namespace
// We really need a smart recursive parser which walks through index
// to find exports and use actual namespaces
// But that's for later: first pass is parity but in a standalone package
const findExternalFunctions = async (root: string) => {
  const externals: any[] = [];

  const fileSet = new FileSet();
  // This glob does not support conditionals
  // ts files are not supported right now
  await fileSet.add(`${root}/src/**/*.js`);

  let common: any[] = [];
  // try and load common's data
  // (common SHOULD be built first, so this should work)
  try {
    // TODO: how do we generalise this?
    // maybe parse(root/node_modules/@openfn/common)
    // Or use a cached value if it exists
    const commonRaw = await readFile(
      path.resolve('../../packages/common/docs/raw.json'),
      'utf8'
    );
    common = JSON.parse(commonRaw || '');
  } catch (e) {
    console.warn(
      'WARNING: failed to load common docs. This may result in incorrect documentation'
    );
  }

  // Extract exports from common and add them to the template data as externals
  const added: any = {}; // to dedupe
  for (const f of fileSet.files) {
    const src = await fs.readFile(f, 'utf8');

    extractExports(src).forEach(fn => {
      if (!added[fn]) {
        added[fn] = true;
        const def = common.find(thing => thing.name === fn);
        externals.push({
          ...def,
          name: `${fn}()`,
          common: true,
          kind: 'external',
          source: '@openfn/language-common',
        });
      }
    });
  }

  return externals;
};
