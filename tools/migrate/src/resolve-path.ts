// TODO duplicated from the buildtool
// Would like a good way to share code between tools as pure ts, without a build...
import path from 'node:path';

/**
 * Map a language name to an absolute folder in the monorepo.
 * ie, http => ../../packages/http
 */
export default (lang: string): string =>
  // need to resolve from repo base..
  path.resolve(`../../packages/${lang}`);
