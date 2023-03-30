import { build, Options } from 'tsup';
import resolvePath from '../util/resolve-path';

const config: Options = {
  format: ['esm', 'cjs'],
  target: 'node14',
  platform: 'node',
  clean: true,
  splitting: false,
};

const fetchConfig = async (adaptorPath: string) => {
  try {
    const fn = await import(`${adaptorPath}/build.config.js`);
    if (fn) {
      return fn.default(adaptorPath);
    }
  } catch (e) {
    console.log(e);
  }
  return {};
};

export default async (lang: string) => {
  const p = resolvePath(lang);
  console.log();
  console.log('Building JS');
  console.log();

  const defaultBuildConfig = {
    entry: [`${p}/src/index.js`],
    outDir: `${p}/dist`,
    ...config,
  };

  const overrides = await fetchConfig(p);
  console.log(overrides);

  return build({
    ...defaultBuildConfig,
    ...overrides,
  });
};
