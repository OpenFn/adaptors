import jsdoc from 'jsdoc-api';
import resolvePath from '../util/resolve-path';

export default (lang: string) => {
  const root = resolvePath(lang);
  console.log();
  console.log(`Building docs`);
  console.log();

  const destination = `${root}/docs`;
  // for some reason there is no async render API
  jsdoc.renderSync({
    files: `${root}/src`,
    destination,
    readme: `${root}/README.md`,
  });

  console.log(`... done! `, destination);

  return;
};
