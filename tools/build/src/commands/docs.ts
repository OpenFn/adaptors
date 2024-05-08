import fs, { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import jsdoc2md from 'jsdoc-to-markdown';
import FileSet from 'file-set'
import resolvePath from '../util/resolve-path';
import extractExports from '../util/extract-exports';

export default async (lang: string) => {
  const root = resolvePath(lang);
  console.log();
  console.log(`Building docs`);
  console.log();

  const glob = `${root}/src/**/*.js`;

  const template = await fs.readFile(
    '../../tools/build/src/util/docs-template.hbs'
  );
  /* get template data */
  const templateData = jsdoc2md.getTemplateDataSync({
    files: glob,
  });

  // sort template data
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  templateData.sort(function (a, b) {
    const nameA = a.longname.toUpperCase(); // ignore upper and lowercase
    const nameB = b.longname.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  const fileSet = new FileSet()
  await fileSet.add([glob])

  // Extract exports from common and add them to the template data as externals
  for (const f of fileSet.files) {
    const src = await fs.readFile(f, 'utf8')
    const exports = extractExports(src).map((e) => ({
      id: e,
      common: true,
      name: e,
      scope: 'global',
      kind: "external"
    }))
    templateData.push(...exports)
  }

  const helper = path.resolve('../../tools/build/src/util/hbs-helpers.js');
  const renderOpts = {
    template: `${template}`,
    helper,
    data: templateData,
    partial: [
      // TODO we should be able to automate this
      path.resolve('../../tools/build/src/partials/body.hbs'),
      path.resolve('../../tools/build/src/partials/description.hbs'),
      path.resolve('../../tools/build/src/partials/link.hbs'),
      path.resolve('../../tools/build/src/partials/members.hbs'),
    ],
    separators: true,
    'name-format': false,
    'no-gfm': false,
    'example-lang': 'js',
    'member-index-format': 'list',
  };
  
  console.log('rendering jsdocs...');
  const docs = jsdoc2md.renderSync(renderOpts);

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

  const docsJson = {
    name: `${lang}`,
    adaptor: `${name}`,
    version: `${version}`,
    docs: `${JSON.stringify(docs)}`,
    readme: `${JSON.stringify(readme)}`,
    changelog: `${JSON.stringify(changelog)}`,
    functions: functions.sort(),
    'configuration-schema': configurationSchema
  };

  const destinationDir = `${root}/docs`;
  const destination = `${destinationDir}/index.md`;
  await mkdir(destinationDir, { recursive: true });
  await writeFile(destination, docs);
  await writeFile(`${destinationDir}/${lang}.json`, JSON.stringify(docsJson));

  console.log(`... done! `, destination);
  console.log()

  return;
};
