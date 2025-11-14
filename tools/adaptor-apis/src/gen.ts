/**
 * This is our new generator function
 *
 * It'll take a path to an adaptor on disk
 *
 * It'll run the doc build tool
 * (or maybe doc build will call this - the key is that the logic is shared)
 *
 * For now it'll return the verbatim raw output, plus a signature
 *
 * Later it'll massage the data a bit more
 *
 * One of the big jobs here is to also include common docs
 */

import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { eachLimit } from 'async-es';
// @ts-ignore
import FileSet from 'file-set';
import { parse } from './parse';
import extractExports from './util/extract-exports';
import getNameAndVersion from './util/get-name-and-version';
import { serialize } from 'node:v8';

const loadActualPackageJson = async (specifier: string) => {
  // call unpkg for a production package json
  const res = await fetch(
    `https://cdn.jsdelivr.net/npm/${specifier}/package.json`
  );
  if (res.status === 200) {
    return res.json();
  }
  throw new Error(`Fetch failed with status ${res.status}`);
};

export const installAndGen = async (specifier: string, cacheDir?: string) => {
  if (!specifier.startsWith('@openfn/language-')) {
    specifier = '@openfn/language-' + specifier;
  }

  console.log(' installing adaptor');
  const root = await preinstallAdaptor(specifier, cacheDir);
  const pkg = await loadActualPackageJson(specifier);
  console.log('✅ adaptor ready');

  // Difficulty: how do we know which version of common this package depends on?
  // The source build does not help us
  let commonDocs;
  const commonVersion = pkg.dependencies['@openfn/language-common'];
  if (commonVersion) {
    console.log(' Preparing common adaptor docs');
    const commonPath = await preinstallAdaptor(
      `@openfn/language-common@${commonVersion}`,
      cacheDir
    );
    commonDocs = await gen(commonPath, { serialize: true });
    console.log('✅ common ready');
  }
  return gen(root, { serialize: true, common: commonDocs });
};

const gen = async (root: string, { serialize = false, common }: any = {}) => {
  // first we parse the adaptor
  const functions = await parse(root);
  // now find all it's external exports
  // for any external @openfn export, build its docs
  // add all new functions

  let externals: any[] = [];
  if (!root.endsWith('common')) {
    externals = await findExternalFunctions(root, common);
    functions.push(...externals);
  }

  if (serialize) {
    await mkdir(`${root}/docs`, { recursive: true });
    await writeFile(`${root}/docs/raw.json`, JSON.stringify(functions));
  }

  return functions;
};

export default gen;

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
    const src = await readFile(f, 'utf8');

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

// Install node modules through npm - probably the easiest way, if a little inefficient?
// Oh, but major hurdle is that the modules include no source, and so have no docs
// So the only way this will work is to checkout the adaptors repo and the tag

// Recursively fetch all .js and .ts files from a GitHub directory
const fetchFilesList = async (
  specifier: string,
  dir: string,
  filterDir: string[] = []
): Promise<any[]> => {
  const url = `https://api.github.com/repos/openfn/adaptors/contents/${dir}?ref=${specifier}`;
  const res = await fetch(url);
  if (res.status !== 200) {
    // error!
    // Most likely means the adaptor doesn't exist or we don't have that tag in the monorepo
    console.warn(`WARNING: error ${res.status} fetching ${url}`);
    return [];
  }
  const items = await res.json();

  const files: any[] = [];

  for (const item of items) {
    if (item.type === 'file') {
      if (/(package.json|\.ts|\.js)$/.test(item.name)) {
        // exclude packages/adaptor name from all paths
        const parts = item.path.split('/');
        parts.shift();
        parts.shift();
        files.push({ url: item.download_url, path: parts.join('/') });
      }
    } else if (item.type === 'dir') {
      // If a filter is provided, only traverse if we match it
      if (
        !filterDir.length ||
        filterDir.find(folder => item.path.endsWith(folder))
      ) {
        const subFiles = await fetchFilesList(specifier, item.path);
        files.push(...subFiles);
      }
    }
  }

  return files;
};

const fetchFiles = async (files: string[], output: string) => {
  return eachLimit(files, 5, async f => {
    const res = await fetch(f.url);
    const src = await res.text();
    await mkdir(path.join(output, path.dirname(f.path)), { recursive: true });
    await writeFile(path.join(output, f.path), src);
  });
};

// New plan:
// call github and fetch the directory (with ref and tag)
// optionally cache files locally
// download all js and ts files in the listing
export const preinstallAdaptor = async (
  specifier: string,
  targetDir?: string
): Promise<string> => {
  const { name, version } = getNameAndVersion(specifier);
  const shortName = name.split('@openfn/language-')[1];

  const installDir = targetDir || path.join(process.cwd(), '.adaptors');
  const outputDir = `${installDir}/${shortName}@${version}`;
  await mkdir(installDir, { recursive: true });

  const files = await fetchFilesList(specifier, `packages/${shortName}`, [
    'src',
  ]);
  await fetchFiles(files, outputDir);

  return outputDir;
};
