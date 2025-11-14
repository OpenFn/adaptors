import jsdoc2md from 'jsdoc-to-markdown';
import path from 'node:path';
import loadPkg from './util/load-pkg';

// does all the jsdoc to markdown parsing

// TODO public only is for legacy behaviour
// the main adaptor should be public only
// but right now, temporarily, the common stuff should include private
export const parse = async (rootDir: string) => {
  const pkg = loadPkg(rootDir);

  let templateData = await jsdoc2md.getTemplateData({
    files: `${rootDir}/src/**/*.(js|ts)`,
    configure: path.resolve(import.meta.dirname, '../jsdoc/config.json'),
    'no-cache': true,
  });

  // Filter items which are not marked as @public
  templateData = templateData.filter(
    (data: any) => data.kind === 'typedef' || data.access === 'public'
  );

  // sort template data
  templateData.sort(function (a: any, b: any) {
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

  templateData.forEach((data: any) => {
    data.source = pkg.name; // annotate the owning adaptor on each function
    data.version = pkg.version;

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

  return templateData;
};
