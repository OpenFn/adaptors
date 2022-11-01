import jsdoc2md from 'jsdoc-to-markdown';
import fs from 'node:fs/promises';
import { writeFile, mkdir } from 'node:fs/promises';
import resolvePath from '../util/resolve-path';

export default async (lang: string) => {
  const root = resolvePath(lang);
  console.log();
  console.log(`Building docs`);
  console.log();

  const template = await fs.readFile(
    '../../tools/build/src/util/docs-template.hbs'
  );

  const str = await jsdoc2md.render({
    files: `${root}/src/**/*.js`,
    template: `${template}`,
  });

  const destinationDir = `${root}/docs`;
  const destination = `${destinationDir}/index.md`;
  await mkdir(destinationDir, { recursive: true });
  await writeFile(destination, str);

  console.log(`... done! `, destination);

  return;
};
