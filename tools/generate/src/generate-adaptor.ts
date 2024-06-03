import fs from 'node:fs/promises';
import path from 'node:path';

const generateAdaptor = async (adaptorName: string) => {
  const templatePath = path.resolve(`template`);

  const adaptorPath = path.resolve(`../../packages/${adaptorName}`);

  try {
    await fs.stat(adaptorPath);
    console.error(`The adaptor path "${adaptorPath}" already exists`);
    process.exit(1);
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.error(`An error occurred: ${error.message}`);
      process.exit(1);
    }
  }

  await fs.mkdir(adaptorPath, { recursive: true });

  console.log(`Creating new adaptor: ${adaptorName}`);
  await copyAndRename(templatePath, adaptorPath, adaptorName);
  console.log(`Adaptor "${adaptorName}" created successfully.`);
  console.log();
  console.log('Next steps:');
  console.log(
    `  Update Adaptor.js and Utils.js to enable access to the backing datasource`
  );
  console.log(`  Change the assets 🖼️  for your new adaptor "${adaptorName}"`);
  console.log(`  Review unit tests`);
  console.log(
    `  Consider updating the changelog to reflect the state of the first release`
  );
  console.log();
  console.log(`Reminder: Run "pnpm install" to install your packages`);
};

const fileMap = { package_json: 'package.json' };

const copyAndRename = async (
  source: string,
  target: string,
  adaptorName: string
) => {
  const items = await fs.readdir(source, { withFileTypes: true });

  for (const item of items) {
    const sourcePath = path.join(source, item.name);

    const targetPath = path.join(
      target,
      fileMap[item.name] ?? item.name.replace('template', adaptorName)
    );

    if (item.isDirectory()) {
      await fs.mkdir(targetPath, { recursive: true });
      await copyAndRename(sourcePath, targetPath, adaptorName);
    } else if (item.isFile()) {
      let content;
      const ext = path.extname(item.name).toLowerCase();
      if (/(png|jpe?g|gif|svg|webp)$/.test(ext)) {
        content = await fs.readFile(sourcePath);
      } else {
        content = await fs.readFile(sourcePath, 'utf8');
        content = content.replace(/{{TEMPLATE}}/g, adaptorName);
      }
      await fs.writeFile(targetPath, content);
    }
  }
};

export default generateAdaptor;
