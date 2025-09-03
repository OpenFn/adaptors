import fs, { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import jsdoc2md from 'jsdoc-to-markdown';
import FileSet from 'file-set';
import chokidar from 'chokidar';

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
    '../../tools/build/src/util/docs-template.hbs'
  );

  let templateData = await jsdoc2md.getTemplateData({
    // this glob seems to support conditional expressions
    files: `${root}/src/**/*.(js|ts)`,
    configure: [path.resolve('../../tools/build/jsdoc/config.json')],
    'no-cache': true,
  });

  // Filter items which are not marked as @public
  templateData = templateData.filter(
    data => data.kind === 'typedef' || data.access === 'public'
  );

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

  const fileSet = new FileSet();
  // This glob does not support conditionals
  // ts files are not supported right now
  await fileSet.add(`${root}/src/**/*.js`);
  let common: any[] = [];
  if (lang !== 'common') {
    // try and load common's data
    // (common SHOULD be built first, so this should work)
    try {
      const commonRaw = await readFile(
        path.resolve('../../packages/common/docs/raw.json'),
        'utf8'
      );
      common = JSON.parse(commonRaw || '');
    } catch (e) {
      console.warn(
        'WARNING: failed to load common docs. This may result in incorrect documentation'
      );
    }

    // Extract exports from common and add them to the template data as externals
    for (const f of fileSet.files) {
      const src = await fs.readFile(f, 'utf8');
      const exports = extractExports(src).map(e => {
        const isNamespace = common.find(data => data.scope === e);
        return {
          id: e,
          common: true,
          name: e,
          scope: 'global',
          kind: isNamespace ? 'external' : 'external-function',
        };
      });
      templateData.push(...exports);
    }
  }

  templateData.forEach(data => {
    if (data.namespace) {
      data.scope = data.namespace;
    }
    // all typedefs are global
    else if (data.kind === 'typedef') {
      data.scope = 'global';
    }
    // Set scope to be the file name
    else if (data.meta?.filename && !data.meta.filename.includes('Adaptor.')) {
      data.scope = data.meta.filename.split('.')[0];
    }
  });

  const helper = path.resolve('../../tools/build/src/util/hbs-helpers.js');
  const renderOpts = {
    template: `${template}`,
    helper,
    data: templateData,
    partial: [
      // TODO we should be able to automate this
      path.resolve('../../tools/build/src/partials/body.hbs'),
      path.resolve('../../tools/build/src/partials/description.hbs'),
      path.resolve('../../tools/build/src/partials/examples.hbs'),
      path.resolve('../../tools/build/src/partials/link.hbs'),
      path.resolve('../../tools/build/src/partials/sig-name.hbs'),
      path.resolve('../../tools/build/src/partials/state.hbs'),
    ],
    separators: true,
    'name-format': false,
    'no-gfm': false,
    'example-lang': 'js',
    'member-index-format': 'list',
  };

  console.log('rendering jsdocs...');
  const docs = await jsdoc2md.render(renderOpts);

  const readme = await fs.readFile(`${root}/README.md`, 'utf8', (err, data) =>
    err ? '### README' : data
  );

  const changelog = existsSync(`${root}/CHANGELOG.md`)
    ? await fs.readFile(`${root}/CHANGELOG.md`, 'utf8', data => data)
    : '### CHANGELOG';

  // Extract adaptor name and version
  const { name, version, badge } = JSON.parse(
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
