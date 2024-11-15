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
  respec?: string;

  /**  Path to a spec file. Required if this is the first time */
  spec?: string;
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

  // Determine whether to setup the intial template and/or re-download the spec
  try {
    const pkg = await readPkg();

    if (respec) {
      const meta = await fetchSpec(adaptorPath, spec ?? pkg.fhir.spec);
      updateMeta(pkg, meta);
    }
  } catch (error: any) {
    // If the adaptor does not exist, generate the project boilerplate
    await generatePackage(adaptorPath, adaptorName, spec!);
    const meta = await fetchSpec(adaptorPath, spec);

    const pkg = await readPkg();
    pkg.fhir.spec = spec;
    pkg.fhir.adaptorGeneratedDate = new Date().toISOString();

    updateMeta(pkg, meta);
  }

  // Now generate

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

  // TODO import mappings
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

  await mkdir(path.resolve(adaptorPath, 'test'), { recursive: true });
  // TODO only do this if a flag is passed
  // and actually, if the flag is passed, maybe clean /test/
  const tests = generateTests(schema, mappings);
  for (const p in tests) {
    await fs.writeFile(path.resolve(adaptorPath, p), tests[p]);
  }
};

export default generateAdaptor;
