import { build } from 'tsup';
import resolvePath from '../util/resolve-path';

// TODO shoudl't the src config use this too?
// Maybe only if it's compiling from ts?
const compilerOptions = {
  allowJs: true,
  declaration: true,
  emitDeclarationOnly: true,
  esModuleInterop: true,
  isolatedModules: true,
  module: 'es2020',
  moduleResolution: 'node',
  noImplicitAny: false,
  preserveConstEnums: true,
  removeComments: false,
  resolveJsonModule: true,
  sourceMap: false,
  strictNullChecks: false,
  target: 'ES2020',
};

export default (lang: string) => {
  const root = resolvePath(lang);
  console.log();
  console.log('Building DTS');
  console.log();

  // const { compilerOptions } = getBaseConfig(root);
  return build({
    entry: [`${root}/src/index.js`],
    outDir: `${root}/types`,
    clean: true,
    // We can emit dts only with tsup
    dts: {
      only: true,
      compilerOptions,
    },
  });
};
