import { build, Options } from 'tsup';
import resolvePath from '../util/resolve-path';

const config: Options = {
  format: ['esm', 'cjs'],
  target: 'node14',
  platform: 'node',
  clean: true,
};

export default (lang: string) => {
  const p = resolvePath(lang);
  console.log();
  console.log('Building JS');
  console.log();

  return build({
    entry: [`${p}/src/index.js`], // TODO what if it's typescript?
    outDir: `${p}/dist`,
    ...config,
  });
};
