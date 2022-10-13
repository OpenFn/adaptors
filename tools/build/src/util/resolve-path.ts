import path from 'node:path';

/**
 * Map a language name to an absolute folder in the monorepo.
 * ie, http => ../../packages/http
 */
export default (lang: string): string =>
  // need to resolve from repo base..
  path.resolve(`../../packages/${lang}`);
