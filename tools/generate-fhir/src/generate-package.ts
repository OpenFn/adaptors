/**
 * This file is responsible for creating the adaptor package boilerplate
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const fileMap = { package_json: 'package.json' };

const generatePackage = async (
  adaptorPath: string,
  monorepoPath: string,
  adaptorName: string,
  specPath?: string
) => {
  const templatePath = path.resolve(
    monorepoPath,
    `tools/generate-fhir/template`
  );

  console.log(`Creating new adaptor package: ${adaptorName}`);

  await fs.mkdir(adaptorPath, { recursive: true });

  if (!specPath) {
    throw new Error(
      `No spec path provided! Pass a path to the source spec, eg

  generate-fhir ${adaptorName} --spec path/to/spec.json

`
    );
  }

  await copyAndRename(templatePath, adaptorPath, adaptorName, specPath);

  console.log(`Package "${adaptorName}" created successfully`);
  console.log(`Reminder: Run "pnpm install" to install your packages`);
};

export default generatePackage;

const copyAndRename = async (
  source: string,
  target: string,
  adaptorName: string,
  specPath: string
) => {
  const items = await fs.readdir(source, { withFileTypes: true });

  const templated = {
    '{{NAME}}': adaptorName,
  };

  for (const item of items) {
    const sourcePath = path.join(source, item.name);

    const targetPath = path.join(
      target,
      fileMap[item.name] ?? item.name.replace('template', adaptorName)
    );

    if (item.isDirectory()) {
      await fs.mkdir(targetPath, { recursive: true });
      await copyAndRename(sourcePath, targetPath, adaptorName, specPath);
    } else if (item.isFile()) {
      let content;
      const ext = path.extname(item.name).toLowerCase();
      if (/(png|jpe?g|gif|svg|webp)$/.test(ext)) {
        content = await fs.readFile(sourcePath);
      } else {
        content = await fs.readFile(sourcePath, 'utf8');
        for (const template in templated) {
          content = content.replace(
            new RegExp(template, 'g'),
            templated[template]
          );
        }
      }
      await fs.writeFile(targetPath, content);
    }
  }
};

// TODO: generate stub datatype functions
const generateDatatypesTemplate = async () => {};
