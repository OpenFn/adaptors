import path from 'node:path';

// Map a language name to an absolute folder in the monorepo
// ie, where is the package.json for that language
export default (lang: string) =>
  // need to resolve from repo base..
  path.resolve(`../../packages/${lang}`);
