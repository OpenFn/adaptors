import { build, Options as TsupOptions } from 'tsup';
import resolvePath from '../util/resolve-path';
import type { Options } from '../pipeline';

const config: TsupOptions = {
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
    // do nothing
  }
  return {};
};

export default async (lang: string, options: Options = {}) => {
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
  console.log('build config:', overrides);

  return build({
    ...defaultBuildConfig,
    ...overrides,

    watch: options.watch,
  });
};
