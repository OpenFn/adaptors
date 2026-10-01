import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const fixtures = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');

export const toBuf = name => readFileSync(join(fixtures, name));

export const toBase64 = name => toBuf(name).toString('base64');

export const toText = name => readFileSync(join(fixtures, name), 'utf8');

// Excel stores a date as a timezone-less serial number, so the exact instant of
// the Date that SheetJS builds depends on the machine's timezone. The local
// calendar components are stable, so that's what we assert on.
export const localDateParts = date => [
  date.getFullYear(),
  date.getMonth(),
  date.getDate(),
];
