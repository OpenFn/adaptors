import fs from 'node:fs/promises';
import path from 'node:path';

const generateAdaptor = async (adaptorName: string) => {
  const templatePath = path.resolve(`template`);

  const adaptorPath = path.resolve(`../../packages/${adaptorName}`);

  await fs.mkdir(adaptorPath, { recursive: true });
  await copyAndRename(templatePath, adaptorPath, adaptorName);
};

const copyAndRename = async (
  source: string,
  target: string,
  adaptorName: string
) => {
  const items = await fs.readdir(source, { withFileTypes: true });
  // console.log({items: await items});

  for (const item of items) {
    const sourcePath = path.join(source, item.name);

    const targetPath = path.join(
      target,
      item.name.replace('template', adaptorName)
    );

    if (item.isDirectory()) {
      await fs.mkdir(targetPath, { recursive: true });
      await copyAndRename(sourcePath, targetPath, adaptorName);
    } else if (item.isFile()) {
      let content = await fs.readFile(sourcePath, 'utf8');
      content = content.replace(/template/g, adaptorName);
      await fs.writeFile(targetPath, content);
    }
  }
};

export default generateAdaptor;
