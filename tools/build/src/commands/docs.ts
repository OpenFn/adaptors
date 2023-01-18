import jsdoc2md from 'jsdoc-to-markdown';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
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

  const readme = await fs.readFile(`${root}/README.md`, 'utf8', (err, data) =>
    err ? '### README' : data
  );

  const changelog = existsSync(`${root}/CHANGELOG.md`)
    ? await fs.readFile(`${root}/CHANGELOG.md`, 'utf8', data => data)
    : '### CHANGELOG';

  // Extract adaptor name and version
  const { name, version } = JSON.parse(
    await fs.readFile(`${root}/package.json`, 'utf8', data => data)
  );

  // Extract functions name from ast.json
  const functions = existsSync(`${root}/ast.json`)
    ? JSON.parse(
        await fs.readFile(`${root}/ast.json`, 'utf8', data => data)
      ).operations.map(op => op.name)
    : [];

  // configuration-schema
  const configurationSchema = existsSync(`${root}/configuration-schema.json`)
    ? JSON.parse(
        await fs.readFile(
          `${root}/configuration-schema.json`,
          'utf8',
          data => data
        )
      )
    : 'No Configuration Schema';

  const str = await jsdoc2md.render({
    files: `${root}/src/**/*.js`,
    template: `${template}`,
  });

  const docsJson = {
    name: `${lang}`,
    adaptor: `${name}`,
    version: `${version}`,
    docs: `${JSON.stringify(str)}`,
    readme: `${JSON.stringify(readme)}`,
    changelog: `${JSON.stringify(changelog)}`,
    functions: functions,
    'configuration-schema': configurationSchema,
  };

  const destinationDir = `${root}/docs`;
  const destination = `${destinationDir}/index.md`;
  await mkdir(destinationDir, { recursive: true });
  await writeFile(destination, str);
  await writeFile(`${destinationDir}/${lang}.json`, JSON.stringify(docsJson));

  console.log(`... done! `, destination);

  return;
};
