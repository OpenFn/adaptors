import fs from 'node:fs/promises';
import path from 'node:path';
import generatePackage from './generate-package';

const generateAdaptor = async (
  adaptorName: string,
  specPath: string,
  base?: string
) => {
  const adaptorPath = path.resolve(`../../packages/${adaptorName}`);

  try {
    await fs.stat(adaptorPath);
  } catch (error: any) {
    // If the adaptor does not exist, generate the project boilerplate
    await generatePackage(adaptorPath, adaptorName, specPath);
  }

  // Now generate
};

export default generateAdaptor;
