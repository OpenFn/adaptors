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

import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
// @ts-ignore
import FileSet from 'file-set';
import { parse } from './parse';
import extractExports from './util/extract-exports';
import getNameAndVersion from './util/get-name-and-version';

export const installAndGen = async (specifier: string, cacheDir?: string) => {
  if (!specifier.startsWith('@openfn/language-')) {
    specifier = '@openfn/language-' + specifier;
  }
  const root = await preinstallAdaptor(specifier);
  console.log({ root });
  return gen(root);
};

const gen = async (root: string) => {
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

// Install node modules through npm - probably the easiest way, if a little inefficient?
// Oh, but major hurdle is that the modules include no source, and so have no docs
// So the only way this will work is to checkout the adaptors repo and the tag
export const preinstallAdaptor = async (
  specifier: string,
  targetDir?: string
): Promise<string> => {
  const { name, version } = getNameAndVersion(specifier);

  const packageSpec = version === 'latest' ? name : `${name}@${version}`;

  const installDir = targetDir || path.join(process.cwd(), '.adaptors');

  await mkdir(installDir, { recursive: true });

  return new Promise((resolve, reject) => {
    const args = [
      'install',
      packageSpec,
      '--omit=dev',
      '--no-package-lock',
      '--no-save',
      '--prefix',
      installDir,
    ];

    const npmProcess = spawn('npm', args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: installDir,
    });

    if (npmProcess.stdout) {
      npmProcess.stdout.on('data', data => {
        console.log(data.toString());
      });
    }

    if (npmProcess.stderr) {
      npmProcess.stderr.on('data', data => {
        console.error(data.toString());
      });
    }

    npmProcess.on('close', code => {
      if (code === 0) {
        // Return the path to the installed package
        const installedPath = path.join(installDir, 'node_modules', name);
        resolve(installedPath);
      } else {
        reject(new Error(`npm install failed with code ${code}`));
      }
    });

    npmProcess.on('error', error => {
      reject(new Error(`Failed to spawn npm process: ${error.message}`));
    });
  });
};
