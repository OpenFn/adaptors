export function version() {
  const pkgRaw = require('../package.json');
  const pkg = JSON.parse(pkgRaw);

  return state => ({
    ...state,
    version: pkg.version,
  });
}

export { combine, fn, log } from '@openfn/language-common';
