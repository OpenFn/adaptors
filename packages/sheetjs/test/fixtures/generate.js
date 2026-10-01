/**
 * Regenerates the binary test fixtures. Run with:
 *
 *   node test/fixtures/generate.js
 *
 * sample.xlsx has two sheets, a header row, string/number/date cells and a
 * deliberate empty cell (People.notes row 2) so that tests can exercise
 * `defval` and header handling.
 */
import xlsx from 'xlsx';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

const people = [
  {
    name: 'Amara',
    age: 34,
    dateOfBirth: new Date(Date.UTC(1991, 4, 12)),
    notes: 'returning patient',
  },
  { name: 'Bukayo', age: 22, dateOfBirth: new Date(Date.UTC(2003, 8, 5)) },
  {
    name: 'Chidi',
    age: 45,
    dateOfBirth: new Date(Date.UTC(1980, 0, 30)),
    notes: 'referral',
  },
];

const orders = [
  { orderId: 'ORD-1', amount: 1250.5, orderedAt: new Date(Date.UTC(2024, 0, 15)) },
  { orderId: 'ORD-2', amount: 99, orderedAt: new Date(Date.UTC(2024, 1, 2)) },
];

const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(
  workbook,
  xlsx.utils.json_to_sheet(people, {
    header: ['name', 'age', 'dateOfBirth', 'notes'],
    cellDates: true,
  }),
  'People'
);
xlsx.utils.book_append_sheet(
  workbook,
  xlsx.utils.json_to_sheet(orders, { cellDates: true }),
  'Orders'
);

writeFileSync(
  join(here, 'sample.xlsx'),
  xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })
);

writeFileSync(
  join(here, 'sample.csv'),
  'name,age,dateOfBirth,notes\nAmara,34,1991-05-12,returning patient\nBukayo,22,2003-09-05,\nChidi,45,1980-01-30,referral\n'
);

console.log('wrote sample.xlsx and sample.csv');
