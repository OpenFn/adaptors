import jsdoc2md from 'jsdoc-to-markdown';
import { writeFile, mkdir } from 'node:fs/promises';
import resolvePath from '../util/resolve-path';

export default async (lang: string) => {
  const root = resolvePath(lang);
  console.log();
  console.log(`Building docs`);
  console.log();

  // for some reason there is no async render API
  const str = await jsdoc2md.render({
    files: `${root}/src/**/*.js`,
    readme: `${root}/README.md`,
    //template: ? // TODO
  });

  const destinationDir = `${root}/docs`;
  const destination = `${destinationDir}/${lang}.md`;
  await mkdir(destinationDir, { recursive: true });
  await writeFile(destination, str);

  console.log(`... done! `, destination);

  return;
};
