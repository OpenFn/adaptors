import { build } from 'tsup';
import resolvePath from '../util/resolve-path';

const compilerOptions = {
  // Enabling allowJs will break common's doc build
  // because of export { del as delete } in http
  //allowJs: true,
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
