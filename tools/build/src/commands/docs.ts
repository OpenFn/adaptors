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

  // extract adaptor name and version
  const { name, version } = JSON.parse(
    await fs.readFile(`${root}/package.json`, 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      } else {
        // parse JSON string to JSON object
        return JSON.parse(data);
      }
    })
  );

  const str = await jsdoc2md.render({
    files: `${root}/src/**/*.js`,
    template: `${template}`,
  });

  const docsJson = {
    name: `${name}`,
    adaptor: `${lang}`,
    version: `${version}`,
    docs: `${JSON.stringify(str)}`,
  };

  const destinationDir = `${root}/docs`;
  const destination = `${destinationDir}/index.md`;
  await mkdir(destinationDir, { recursive: true });
  await writeFile(destination, str);
  await writeFile(`${destinationDir}/${lang}.json`, JSON.stringify(docsJson));

  console.log(`... done! `, destination);

  return;
};
