import { writeFile, mkdir, access, readFile, rm } from 'node:fs/promises';
import { exec } from 'node:child_process';
import path from 'node:path';
import dts from 'rollup-plugin-dts';
import { rollup } from 'rollup';

import generatePackage from './generate-package';
import fetchSpec, { Meta } from './fetch-spec';
import generateSchema from './generate-schema';
import generateCode from './generate-code';
import withDisclaimer from './util/disclaimer';
import generateDTS, { generateDataTypes } from './generate-dts';
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

  /**
   * Allow simple builders. This means that for builders with only a single profile,
   * a simpler signature can be used. Only works with base languages right now. Default to false.
   * */
  simpleBuilders?: boolean;
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
      try {
        meta = await fetchSpec(adaptorPath, spec ?? pkg.fhir.specUrl, mappings);
      } catch (e) {
        process.exit(1);
      }
    }
    if (pkg.fhir.options) {
      Object.assign(options, pkg.fhir.options);
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

  // Load options which may have been saved to the package
  const { simpleBuilders } = options;

  // Now generate from the spec
  const specPath = path.resolve(adaptorPath, 'spec', 'spec.json');
  try {
    await access(specPath);
  } catch (e) {
    console.log('Error loading spec.json!');
    console.log(
      `You may need to redownload the spec with "pnpm generate-fhir ${adaptorName} --respec"`,
    );
    console.log(e);
  }

  let fhirTypes = {};
  if (base) {
    // if a base adaptor is provided, we need to load the base type definitions from there
    // TODO need to generate this list based on the base adaptor
    // may need to cross-reference to only use types that are NOT defined in the IG
    fhirTypes = {
      Age: 1,
      Address: 1,
      Attachment: 1,
      Annotation: 1,
      BackboneElement: 1,
      Coding: 1,
      CodeableConcept: 1,
      ContactPoint: 1,
      Duration: 1,
      Extension: 1,
      HumanName: 1,
      Identifier: 1,
      Meta: 1,
      Narrative: 1,
      Reference: 1,
      Range: 1,
      Ratio: 1,
      Period: 1,
      Quantity: 1,
      Dosage: 1,
      Timing: 1,
      SampledData: 1,
    };
  } else {
    try {
      await access(specPath);
      console.log('Generating datatype schemas');
      const dtSpecPath = path.resolve(adaptorPath, 'spec', 'spec-types.json');
      // Note: when generating datatypes we ignore the user's mappings and generate everything
      // maybe we need to take a different mappings object?
      const dtSchema = await generateSchema(dtSpecPath);
      const { src, index } = generateDataTypes(dtSchema, mappings);
      fhirTypes = index;
      const dtsPath = path.resolve(adaptorPath, 'src/fhir.ts');
      console.log('Writing datatype schemas to ', dtsPath);
      await writeFile(dtsPath, withDisclaimer(src));
    } catch (e) {
      console.log('Skipping datatype generation');
    }
  }

  console.log('Generating resource schemas');
  const schema = await generateSchema(specPath, mappings);

  console.log('Generating code');
  const src = generateCode(schema, mappings, {
    simpleSignatures: simpleBuilders,
    fhirTypes,
    base,
  });

  const srcPath = path.resolve(adaptorPath, 'src/builders.ts');
  console.log('Writing source to ', srcPath);
  await writeFile(srcPath, withDisclaimer(src.builders));
  await mkdir(path.resolve(adaptorPath, 'src/profiles'), { recursive: true });
  for (const profile in src.profiles) {
    await writeFile(
      path.resolve(adaptorPath, 'src/profiles', `${profile}.ts`),
      withDisclaimer(src.profiles[profile]),
    );
  }

  if (options.tests) {
    console.log('Generating tests');
    await mkdir(path.resolve(adaptorPath, 'test/resources'), {
      recursive: true,
    });
    const tests = generateTests(schema, mappings, {
      simpleSignatures: simpleBuilders,
      name: adaptorName,
    });
    for (const p in tests) {
      await writeFile(path.resolve(adaptorPath, p), tests[p]);
    }
  }

  // Finally, update package json metadata
  const pkg = await readPkg();
  updateMeta(pkg, {
    ...meta,
    adaptorGeneratedDate: new Date().toISOString(),
    generatorVersion: toolPkg.version,
    options: ['simpleBuilders']
      .filter(o => o in options)
      .reduce((acc: any, o: string) => {
        acc[o] = options[o];
        return acc;
      }, {}),
  });

  // If base provided, ensure there's a dependency
  if (base) {
    const baseName = `@openfn/language-${base}`;
    if (!pkg.dependencies[baseName]) {
      pkg.dependencies[baseName] = 'workspace:*';
      await writePkg(pkg);
    }
  }

  console.log('Writing types to ./types');
  await mkdir(path.resolve(adaptorPath, 'types'), { recursive: true });

  console.log('Generating DTS with tsc');
  const tscArgs = [
    '--allowJs',
    '--declaration',
    '--emitDeclarationOnly',
    '--skipLibCheck',
    '--lib es2020',
    `--declarationDir ${path.resolve(adaptorPath, 'types')}`,
  ];

  const pathToEntry = path.resolve(adaptorPath, 'src', 'index.ts');

  // Now build typings for index and utils
  exec(
    `pnpm exec tsc ${tscArgs.join(' ')} ${pathToEntry}`,
    {},
    async (err, stderr) => {
      // errors are usually bogus - except when they're not!!
      // See https://github.com/OpenFn/adaptors/issues/1522 for even more vaguery
      // if (err) {
      //   console.log('>', err);
      // }
      // if (stderr) {
      //   console.log('>', stderr);
      // }
      console.log('Bundling DTS files');
      const bundle = await rollup({
        // Only bundle builders and profile together
        // If we bundle everything into one file, then everything gets exported globally
        input: path.resolve(adaptorPath, 'types', 'builders.d.ts'),
        plugins: [dts()],
      });
      const dtsBundle = await bundle.generate({
        format: 'es',
      });

      await writeFile(
        path.resolve(adaptorPath, 'types', 'builders.d.ts'),
        withDisclaimer(dtsBundle.output[0].code),
      );

      // finally remove the profiles and core fhir types
      await rm(path.resolve(adaptorPath, 'types', 'profiles'), {
        recursive: true,
        force: true,
      });
      await rm(path.resolve(adaptorPath, 'types', 'fhir.d.ts'), {
        force: true,
      });
      await rm(path.resolve(adaptorPath, 'types', 'datatypes.d.ts'), {
        force: true,
      });
    },
  );
};

export default generateAdaptor;
