import fs from 'node:fs/promises';
import path from 'node:path';
import generatePackage from './generate-package';
import fetchSpec, { Meta } from './fetch-spec';

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
};

export default generateAdaptor;
