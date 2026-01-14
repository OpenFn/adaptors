import fs, { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import jsdoc2md from 'jsdoc-to-markdown';
import FileSet from 'file-set';
import chokidar from 'chokidar';
import parse from '@openfn/adaptor-apis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import resolvePath from '../util/resolve-path';
import extractExports from '../util/extract-exports';

import { Options } from '../pipeline';

export default async (lang: string, options: Options = {}) => {
  if (options.watch) {
    const root = resolvePath(lang);
    const glob = `${root}/src/**/*.(js|ts)`;
    const watcher = chokidar.watch(glob, {
      persistent: true,
    });
    watcher.on('change', () => {
      // change may fire before the write has fully finished
      setTimeout(() => {
        build(lang);
      }, 500);
    });

    console.log('Watching for changes:', glob);
  } else {
    return build(lang);
  }
};

const build = async (lang: string) => {
  const root = resolvePath(lang);
  console.log();
  console.log(`Building docs`);
  console.log();

  const template = await readFile(
    path.join(__dirname, '../util/docs-template.hbs'),
    'utf8'
  );

  // TODO: if I change the structure of parse - and I probably will -
  // we'll need to convert it here to be compatible with jsdoc2md
  const templateData = await parse(root);

  // adaptor-apis will include version metadata, but we don't want that here
  templateData.forEach((data: any) => {
    delete data.version;
  });

  const helper = path.join(__dirname, '../util/hbs-helpers.js');
  const renderOpts = {
    template: `${template}`,
    helper,
    data: templateData,
    partial: [
      // TODO we should be able to automate this
      path.join(__dirname, '../partials/body.hbs'),
      path.join(__dirname, '../partials/description.hbs'),
      path.join(__dirname, '../partials/examples.hbs'),
      path.join(__dirname, '../partials/link.hbs'),
      path.join(__dirname, '../partials/sig-name.hbs'),
      path.join(__dirname, '../partials/state.hbs'),
    ],
    separators: true,
    'name-format': false,
    'no-gfm': false,
    'example-lang': 'js',
    'member-index-format': 'list',
  };

  console.log('rendering jsdocs...');
  const docs = await jsdoc2md.render(renderOpts);

  let readme = '### README';
  try {
    readme = await fs.readFile(`${root}/README.md`, 'utf8');
  } catch (e) {
    // ignore
  }

  const changelog = existsSync(`${root}/CHANGELOG.md`)
    ? await fs.readFile(`${root}/CHANGELOG.md`, 'utf8')
    : '### CHANGELOG';

  // Extract adaptor name and version
  const { name, version, badge } = JSON.parse(
    await fs.readFile(`${root}/package.json`, 'utf8')
  );

  // Extract functions name from ast.json
  const functions = existsSync(`${root}/ast.json`)
    ? JSON.parse(await fs.readFile(`${root}/ast.json`, 'utf8')).operations.map(
        (op: any) => op.name
      )
    : [];

  // configuration-schema
  const configurationSchema = existsSync(`${root}/configuration-schema.json`)
    ? JSON.parse(
        await fs.readFile(`${root}/configuration-schema.json`, 'utf8')
      )
    : 'No Configuration Schema';

  const docsJson = {
    name: `${lang}`,
    badge,
    adaptor: `${name}`,
    version: `${version}`,
    docs: `${JSON.stringify(docs)}`,
    readme: `${JSON.stringify(readme)}`,
    changelog: `${JSON.stringify(changelog)}`,
    functions: functions.sort(),
    'configuration-schema': configurationSchema,
  };

  const destinationDir = `${root}/docs`;
  const destination = `${destinationDir}/index.md`;
  await mkdir(destinationDir, { recursive: true });
  await writeFile(destination, docs);
  await writeFile(`${destinationDir}/${lang}.json`, JSON.stringify(docsJson));

  await writeFile(
    `${destinationDir}/raw.json`,
    JSON.stringify(templateData, null, 2)
  );

  console.log(`... done! `, destination);
  console.log();

  return;
};
