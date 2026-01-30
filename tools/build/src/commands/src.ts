import { build, Options as TsupOptions } from 'tsup';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
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
  const configPath = path.join(adaptorPath, 'build.config.js');
  if (!fs.existsSync(configPath)) {
    return {};
  }

  try {
    const fn = await import(pathToFileURL(configPath).toString());
    if (fn) {
      return fn.default(adaptorPath);
    }
  } catch (e) {
    // do nothing
    console.log('Error loading build config:', e);
  }
  return {};
};

export default async (lang: string, options: Options = {}) => {
  const p = resolvePath(lang);
  console.log();
  console.log('Building JS');
  console.log();

  const defaultBuildConfig = {
    // Ensure forward slashes for globs on Windows
    entry: [path.join(p, 'src/index.js').split(path.sep).join(path.posix.sep)],
    outDir: path.join(p, 'dist'),
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
