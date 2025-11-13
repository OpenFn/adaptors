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
const findExternalFunctions = async (
  root: string,
  commonDefs?: string | object
) => {
  const externals: any[] = [];

  const fileSet = new FileSet();
  // This glob does not support conditionals
  // ts files are not supported right now
  await fileSet.add(`${root}/src/**/*.js`);

  let common: any[] = [];
  // try and load common's data
  // (common SHOULD be built first, so this should work)
  try {
    // Load common from a file (ie packages/common/docs/raw.json)
    if (typeof commonDefs === 'string') {
      const commonRaw = await readFile(
        // '../../packages/common/docs/raw.json'
        path.resolve(commonDefs),
        'utf8'
      );
      common = JSON.parse(commonRaw || '');
    } else if (commonDefs) {
      // use common defs as an object
      common = commonDefs as any;
    } else {
      // build docs for common
      common = await parse(`${root}/node_modules/@openfn/language-common`);
    }

    // TODO: use a cached value if it exists
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
        if (def) {
          externals.push({
            ...def,
            name: `${fn}()`,
            common: true,
            kind: 'external',
            source: '@openfn/language-common',
          });
        } else {
          console.warn(
            `WARNING: failed to find definition for common function ${fn}`
          );
        }
      }
    });
  }

  return externals;
};
