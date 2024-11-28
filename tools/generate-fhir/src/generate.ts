import fs, { mkdir } from 'node:fs/promises';
import path from 'node:path';
import generatePackage from './generate-package';
import fetchSpec, { Meta } from './fetch-spec';
import generateSchema from './generate-schema';
import generateCode from './generate-code';
import withDisclaimer from './util/disclaimer';
import generateDTS from './generate-dts';
import generateTests from './generate-tests';

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

  const adaptorPath = path.resolve(`../../packages/${adaptorName}`);
  const pkgPath = path.resolve(adaptorPath, 'package.json');

  const readPkg = async () => {
    const pkgStr = await fs.readFile(pkgPath, 'utf8');
    return JSON.parse(pkgStr);
  };

  const writePkg = async (pkg: any) => {
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
  };

  const updateMeta = async (pkg: any, meta: Meta) => {
    Object.assign(pkg.fhir, meta);
    await writePkg(pkg);
    console.log('Update package metadata');
  };

  // Determine whether to setup the initial template and/or re-download the spec
  try {
    const pkg = await readPkg();

    if (respec || spec) {
      const meta = await fetchSpec(adaptorPath, spec ?? pkg.fhir.spec);
      updateMeta(pkg, meta);
    }
  } catch (error: any) {
    console.log(`Package ${adaptorName} does not exist: generating...`);
    // If the adaptor does not exist, generate the project boilerplate
    await generatePackage(adaptorPath, adaptorName, spec!);
    const meta = await fetchSpec(adaptorPath, spec);

    const pkg = await readPkg();
    pkg.fhir.spec = spec;
    pkg.fhir.adaptorGeneratedDate = new Date().toISOString();

    updateMeta(pkg, meta);

    // Unless the user said otherwise, generate test
    if (!('tests' in options)) {
      options.tests = true;
    }
    console.log(`Package ${adaptorName} generated!`);
  }

  // If mappings is passed in, copy it into the build
  if (options.mappings) {
    const mappingsPath = path.resolve('../../', options.mappings);
    console.log(`Importing mappings from `, mappingsPath);
    const src = await fs.readFile(mappingsPath, 'utf8');
    await fs.writeFile(path.resolve(adaptorPath, 'build/mappings.js'), src);
  }

  // Now generate from the spec

  const specPath = path.resolve(adaptorPath, 'spec', 'spec.json');
  try {
    await fs.access(specPath);
  } catch (e) {
    console.log('Error loading spec.json!');
    console.log(
      `You may need to redownload the spec with "pnpm generate-fhir ${adaptorName} --respec"`
    );
    console.log(e);
  }

  let mappings;
  try {
    const m = await import(path.resolve(adaptorPath, 'build/mappings.js'));
    mappings = m.default;
  } catch (e) {
    console.log('ERROR IMPORTING MAPPINGS');
    console.log(e);

    // TODO abort or continue?
    console.log('\n resuming generation with no mappings');
    mappings = {};
  }

  const schema = await generateSchema(specPath, mappings);
  const src = generateCode(schema, mappings);
  const dts = generateDTS(schema, mappings);

  await fs.writeFile(
    // TODO move to ./gen
    path.resolve(adaptorPath, 'src/builders.js'),
    withDisclaimer(src)
  );

  await fs.writeFile(
    // TODO move to ./gen
    path.resolve(adaptorPath, 'src/builders.d.ts'),
    withDisclaimer(dts)
  );

  if (options.tests) {
    await mkdir(path.resolve(adaptorPath, 'test'), { recursive: true });
    const tests = generateTests(schema, mappings);
    for (const p in tests) {
      await fs.writeFile(path.resolve(adaptorPath, p), tests[p]);
    }
  }
};

export default generateAdaptor;
