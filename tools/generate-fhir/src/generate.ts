import { writeFile, mkdir, access, readFile } from 'node:fs/promises';
import { exec } from 'node:child_process';
import path from 'node:path';
import generatePackage from './generate-package';
import fetchSpec, { Meta } from './fetch-spec';
import generateSchema from './generate-schema';
import generateCode from './generate-code';
import withDisclaimer from './util/disclaimer';
import generateDTS from './generate-dts';
import generateTests from './generate-tests';

import toolPkg from '../package.json' assert { type: 'json' };

export type Options = {
  /** The base fhir package to import datatypes and functions from, ie, @openfn/language-fhir-4 */
  base?: string;

  /** Redownload the spec file */
  respec?: boolean;

  /** Path to a spec file. Required if this is the first time */
  spec?: string;

  /** Path to a mappings file (relative to monorepo root). This will be copied into build/mappings in the new generator */
  mappings?: string;

  /** Should we generate tests? */
  tests?: boolean;
};

const generateAdaptor = async (adaptorName: string, options: Options = {}) => {
  const { base, respec, spec } = options;
  const dir = path.dirname(import.meta.url.replace('file://', ''));
  const monoRepoRoot = path.resolve(dir, `../../../`);
  const adaptorPath = path.resolve(monoRepoRoot, 'packages', adaptorName);
  const pkgPath = path.resolve(adaptorPath, 'package.json');

  const readPkg = async () => {
    const pkgStr = await readFile(pkgPath, 'utf8');
    return JSON.parse(pkgStr);
  };

  const writePkg = async (pkg: any) => {
    await writeFile(pkgPath, JSON.stringify(pkg, null, 2));
  };

  const loadMappings = async () => {
    try {
      const m = await import(path.resolve(adaptorPath, 'build/mappings.js'));
      return m.default;
    } catch (e) {
      console.log('ERROR IMPORTING MAPPINGS');
      console.log(e);

      // TODO abort or continue?
      console.log('\n resuming generation with no mappings');
      return {};
    }
  };

  const updateMeta = async (pkg: any, meta: Meta) => {
    Object.assign(pkg.fhir, meta);
    await writePkg(pkg);
    console.log('Update package metadata');
  };

  // If mappings is passed in, copy it into the build
  if (options.mappings) {
    const mappingsPath = path.resolve(monoRepoRoot, options.mappings);
    console.log(`Importing mappings from `, mappingsPath);
    const src = await readFile(mappingsPath, 'utf8');
    await writeFile(path.resolve(adaptorPath, 'build/mappings.js'), src);
  }

  let mappings;
  let meta;

  // Determine whether to setup the initial template and/or re-download the spec
  try {
    const pkg = await readPkg();
    mappings = await loadMappings();
    if (respec || spec) {
      meta = await fetchSpec(adaptorPath, spec ?? pkg.fhir.specUrl, mappings);
    }
  } catch (error: any) {
    console.log(`Package ${adaptorName} does not exist: generating...`);
    // If the adaptor does not exist, generate the project boilerplate
    await generatePackage(adaptorPath, monoRepoRoot, adaptorName, spec!);
    mappings = await loadMappings();
    meta = await fetchSpec(adaptorPath, spec, mappings);

    // Unless the user said otherwise, generate test
    if (!('tests' in options)) {
      options.tests = true;
    }
    console.log(`Package ${adaptorName} generated!`);
  }

  // Now generate from the spec
  const specPath = path.resolve(adaptorPath, 'spec', 'spec.json');
  try {
    await access(specPath);
  } catch (e) {
    console.log('Error loading spec.json!');
    console.log(
      `You may need to redownload the spec with "pnpm generate-fhir ${adaptorName} --respec"`
    );
    console.log(e);
  }

  const schema = await generateSchema(specPath, mappings);
  console.log('Generating code');
  const src = generateCode(schema, mappings);
  console.log('Generating DTS');
  const dts = generateDTS(schema, mappings);

  const srcPath = path.resolve(adaptorPath, 'src/builders.js');
  console.log('Writing source to ', srcPath);
  await writeFile(
    // TODO move to ./gen
    srcPath,
    withDisclaimer(src)
  );

  if (options.tests) {
    console.log('Generating tests');
    await mkdir(path.resolve(adaptorPath, 'test'), { recursive: true });
    const tests = generateTests(schema, mappings);
    for (const p in tests) {
      await writeFile(path.resolve(adaptorPath, p), tests[p]);
    }
  }

  console.log('Writing types to ./types');
  await mkdir(path.resolve(adaptorPath, 'types'), { recursive: true });

  console.log('Generating DTS with tsc');
  const tscArgs = [
    '--allowJs',
    '--declaration',
    '--emitDeclarationOnly',
    '--lib es2020',
    `--declarationDir ${path.resolve(adaptorPath, 'types')}`,
  ];

  // Finally, update package json metadata
  const pkg = await readPkg();
  updateMeta(pkg, {
    ...meta,
    adaptorGeneratedDate: new Date().toISOString(),
    generatorVersion: toolPkg.version,
  });

  const pathToEntry = path.resolve(adaptorPath, 'src', 'index.ts');
  // Now build typings for index and utils
  exec(
    `pnpm exec tsc ${tscArgs.join(' ')} ${pathToEntry}`,
    {},
    (err, stderr) => {
      // TODO ignore tsc output for now
      // if (err) {
      //   console.log('tsc build failed!');
      //   console.log(stderr);
      // } else {
      setTimeout(async () => {
        console.log('Writing builders.d.ts');
        // Overwrite builders.d.ts because typescript makes a mess of it
        await writeFile(
          path.resolve(adaptorPath, 'types/builders.d.ts'),
          withDisclaimer(dts)
        );
      }, 500);
      // }
    }
  );
};

export default generateAdaptor;
