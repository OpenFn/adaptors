import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Map a language name to an absolute folder in the monorepo.
 * ie, http => ../../packages/http
 */
export default (lang: string): string =>
  // Adjusting the base directory to the monorepo root
  path.resolve(__dirname, `../../../../packages/${lang}`);
