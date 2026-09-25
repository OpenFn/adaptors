import { expect } from 'chai';
import xlsx from 'xlsx';

import {
  parse,
  sheetToJson,
  sheetToCsv,
  jsonToSheet,
} from '../src/Adaptor.js';
import { toBuf, toBase64, toText, localDateParts } from './helpers.js';

const state = { configuration: {}, data: {} };

describe('parse', () => {
  it('exposes the sheet names of an xlsx buffer', async () => {
    const finalState = await parse(toBuf('sample.xlsx'))(state);

    expect(finalState.data.sheetNames).to.eql(['People', 'Orders']);
  });

  it('does not put the workbook on state', async () => {
    const finalState = await parse(toBuf('sample.xlsx'))(state);

    expect(finalState.data).to.eql({ sheetNames: ['People', 'Orders'] });
  });

  it('decodes a base64 string without an explicit type', async () => {
    const finalState = await parse(toBase64('sample.xlsx'))(state);

    expect(finalState.data.sheetNames).to.eql(['People', 'Orders']);
  });

  it('decodes a base64 data URL', async () => {
    const dataUrl = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${toBase64(
      'sample.xlsx'
    )}`;

    const finalState = await parse(dataUrl)(state);

    expect(finalState.data.sheetNames).to.eql(['People', 'Orders']);
  });

  it('parses a raw csv string as text, not base64', async () => {
    const finalState = await parse(toText('sample.csv'))(state);

    expect(finalState.data.sheetNames).to.eql(['Sheet1']);
  });

  it('decodes base64 that has been wrapped across lines', async () => {
    const wrapped = toBase64('sample.xlsx').replace(/(.{76})/g, '$1\n');

    const finalState = await parse(wrapped)(state);

    expect(finalState.data.sheetNames).to.eql(['People', 'Orders']);
  });

  it('decodes a base64 csv, which has no file signature to detect', async () => {
    const encoded = Buffer.from(toText('sample.csv')).toString('base64');

    const finalState = await sheetToJson(encoded)(state);

    expect(finalState.data).to.have.length(3);
    expect(finalState.data[0].name).to.equal('Amara');
  });

  it('does not mistake delimited text for base64', async () => {
    // A separator is enough to rule out base64, whatever the string length
    const finalState = await sheetToJson('name,age\nAmara,34')(state);

    expect(finalState.data).to.eql([{ name: 'Amara', age: 34 }]);
  });

  it('decodes base64 when the type is declared explicitly', async () => {
    const finalState = await parse(toBase64('sample.xlsx'), {
      type: 'base64',
    })(state);

    expect(finalState.data.sheetNames).to.eql(['People', 'Orders']);
  });

  it('reads a non-base64 data URL as percent-encoded text', async () => {
    const finalState = await sheetToJson('data:text/csv,name%2Cage%0AAmara%2C34')(
      state
    );

    expect(finalState.data).to.eql([{ name: 'Amara', age: 34 }]);
  });

  it('honours an explicit type over the detected one', async () => {
    // "abcd" is valid base64, so it would otherwise be decoded
    const finalState = await sheetToJson('abcd\nefgh', { type: 'string' })(
      state
    );

    expect(finalState.data).to.eql([{ abcd: 'efgh' }]);
  });

  it('throws if the content is not a buffer or string', async () => {
    try {
      await parse(42)(state);
    } catch (e) {
      expect(e.message).to.match(/must be a Buffer, Uint8Array or string/);
      return;
    }
    expect.fail('should have thrown');
  });
});

describe('sheetToJson', () => {
  it('converts the first sheet into an array of objects', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'))(state);

    expect(finalState.data).to.have.length(3);
    expect(finalState.data[0].name).to.equal('Amara');
    expect(finalState.data[2].name).to.equal('Chidi');
  });

  it('returns numbers as numbers and dates as Date objects', async () => {
    // Guards against passing `raw: undefined` through to SheetJS, which it
    // reads as `raw: false` and answers with formatted strings.
    const finalState = await sheetToJson(toBuf('sample.xlsx'))(state);

    const [amara] = finalState.data;
    expect(amara.age).to.equal(34);
    expect(amara.dateOfBirth).to.be.an.instanceOf(Date);
    expect(localDateParts(amara.dateOfBirth)).to.eql([1991, 4, 12]);
  });

  it('returns each cell as formatted text when raw is false', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      raw: false,
    })(state);

    expect(finalState.data[0].age).to.equal('34');
    expect(finalState.data[0].dateOfBirth).to.equal('5/12/91');
  });

  it('selects a sheet by name', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      sheetName: 'Orders',
    })(state);

    expect(finalState.data).to.eql([
      { orderId: 'ORD-1', amount: 1250.5, orderedAt: finalState.data[0].orderedAt },
      { orderId: 'ORD-2', amount: 99, orderedAt: finalState.data[1].orderedAt },
    ]);
  });

  it('selects a sheet by index', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      sheetIndex: 1,
    })(state);

    expect(finalState.data[0].orderId).to.equal('ORD-1');
  });

  it('returns rows as arrays of cell values when header is 1', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      header: 1,
    })(state);

    expect(finalState.data[0]).to.eql(['name', 'age', 'dateOfBirth', 'notes']);
    expect(finalState.data[1][0]).to.equal('Amara');
  });

  it('reads only the requested range', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      header: 1,
      range: 'A1:A3',
    })(state);

    expect(finalState.data).to.eql([['name'], ['Amara'], ['Bukayo']]);
  });

  it('omits empty cells by default', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'))(state);

    // Bukayo has no value in the "notes" column
    expect(finalState.data[1]).to.not.have.property('notes');
  });

  it('fills empty cells when defval is set', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      defval: null,
    })(state);

    expect(finalState.data[1].notes).to.equal(null);
  });

  it('accepts raw file content without a separate parse step', async () => {
    const finalState = await sheetToJson(toBase64('sample.xlsx'), {
      sheetName: 'Orders',
    })(state);

    expect(finalState.data[0].orderId).to.equal('ORD-1');
  });

  it('accepts a csv string', async () => {
    const finalState = await sheetToJson(toText('sample.csv'))(state);

    expect(finalState.data).to.have.length(3);
    expect(finalState.data[0].name).to.equal('Amara');
    expect(finalState.data[0].age).to.equal(34);
  });

  it('resolves a lazy state reference to the file content', async () => {
    // $.data.fileContent compiles to a function, which expandReferences calls
    const lazy = s => s.data.fileContent;
    const withFile = { ...state, data: { fileContent: toBase64('sample.xlsx') } };

    const finalState = await sheetToJson(lazy, { sheetName: 'Orders' })(
      withFile
    );

    expect(finalState.data[0].orderId).to.equal('ORD-1');
  });

  it('throws when no file content is given', async () => {
    try {
      await sheetToJson(null, { sheetName: 'Orders' })(state);
    } catch (e) {
      expect(e.message).to.match(/must be a Buffer, Uint8Array or string/);
      return;
    }
    expect.fail('should have thrown');
  });

  it('throws and lists the available sheets for an unknown sheet name', async () => {
    try {
      await sheetToJson(toBuf('sample.xlsx'), { sheetName: 'Nope' })(state);
    } catch (e) {
      expect(e.message).to.equal(
        'sheetjs: no sheet named "Nope". Available sheets: People, Orders'
      );
      return;
    }
    expect.fail('should have thrown');
  });

  it('throws if the sheet index is out of range', async () => {
    try {
      await sheetToJson(toBuf('sample.xlsx'), { sheetIndex: 9 })(state);
    } catch (e) {
      expect(e.message).to.match(/no sheet at index 9.*2 sheet\(s\)/);
      return;
    }
    expect.fail('should have thrown');
  });
});

describe('sheetToCsv', () => {
  it('converts a named sheet into a csv string', async () => {
    const finalState = await sheetToCsv(toBuf('sample.xlsx'), {
      sheetName: 'Orders',
    })(state);

    expect(finalState.data).to.be.a('string');
    expect(finalState.data.split('\n')[0]).to.equal(
      'orderId,amount,orderedAt'
    );
    expect(finalState.data).to.include('ORD-1,1250.5');
  });

  it('converts the first sheet by default', async () => {
    const finalState = await sheetToCsv(toBuf('sample.xlsx'))(state);

    expect(finalState.data.split('\n')[0]).to.equal(
      'name,age,dateOfBirth,notes'
    );
  });

  it('uses a custom field separator', async () => {
    const finalState = await sheetToCsv(toBuf('sample.xlsx'), {
      sheetName: 'Orders',
      FS: ';',
    })(state);

    expect(finalState.data.split('\n')[0]).to.equal(
      'orderId;amount;orderedAt'
    );
  });

  it('converts a sheet given base64 content', async () => {
    const finalState = await sheetToCsv(toBase64('sample.xlsx'), {
      sheetName: 'Orders',
    })(state);

    expect(finalState.data).to.include('ORD-2,99');
  });
});

describe('jsonToSheet', () => {
  const records = [
    { id: 1, name: 'Amara' },
    { id: 2, name: 'Bukayo' },
  ];

  it('returns an xlsx buffer by default', async () => {
    const finalState = await jsonToSheet(records)(state);

    expect(finalState.data.buffer).to.be.an.instanceOf(Buffer);
    expect(finalState.data.bookType).to.equal('xlsx');
    expect(finalState.data.sheetName).to.equal('Sheet1');
  });

  it('returns a base64 string when output is base64', async () => {
    const finalState = await jsonToSheet(records, { output: 'base64' })(state);

    expect(finalState.data).to.not.have.property('buffer');
    expect(finalState.data.base64).to.be.a('string');
    // "UEsDBBQ" is the base64 prefix of the PK zip header
    expect(finalState.data.base64).to.match(/^UEsDBBQ/);
  });

  it('writes rows that can be read back out again', async () => {
    const written = await jsonToSheet(records, { sheetName: 'Export' })(state);

    const finalState = await sheetToJson(written.data.buffer)(state);

    expect(finalState.data).to.eql(records);
  });

  it('names the worksheet', async () => {
    const written = await jsonToSheet(records, { sheetName: 'Export' })(state);

    const finalState = await parse(written.data.buffer)(state);

    expect(finalState.data.sheetNames).to.eql(['Export']);
  });

  it('respects the column order given by header', async () => {
    const written = await jsonToSheet(records, {
      header: ['name', 'id'],
    })(state);

    const finalState = await sheetToJson(written.data.buffer, {
      header: 1,
    })(state);

    expect(finalState.data[0]).to.eql(['name', 'id']);
  });

  it('writes a csv file when bookType is csv', async () => {
    const finalState = await jsonToSheet(records, { bookType: 'csv' })(state);

    // SheetJS prefixes csv output with a UTF-8 BOM so that Excel opens it
    // with the right encoding, and does not add a trailing newline.
    expect(finalState.data.buffer.toString('utf8')).to.equal(
      '\ufeffid,name\n1,Amara\n2,Bukayo'
    );
  });

  it('throws if the data is not an array', async () => {
    try {
      await jsonToSheet({ id: 1 })(state);
    } catch (e) {
      expect(e.message).to.match(/expects an array of objects/);
      return;
    }
    expect.fail('should have thrown');
  });

  it('throws for an unsupported output format', async () => {
    try {
      await jsonToSheet(records, { output: 'stream' })(state);
    } catch (e) {
      expect(e.message).to.match(/unsupported output "stream"/);
      return;
    }
    expect.fail('should have thrown');
  });
});

describe('security and edge cases', () => {
  const toWorkbookBuffer = aoa => {
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(aoa), 'S');
    return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  };

  it('does not pollute Object.prototype via a __proto__ header', async () => {
    const buffer = toWorkbookBuffer([
      ['__proto__', 'constructor', 'polluted'],
      ['{"isAdmin":true}', 'x', 'y'],
    ]);

    const finalState = await sheetToJson(buffer)(state);

    // SheetJS defuses the dangerous keys, mangling them to `__proto___NaN`
    // and `constructor_NaN`, rather than assigning them onto the row
    expect({}.isAdmin).to.equal(undefined);
    expect({}.polluted).to.equal(undefined);
    expect(Object.hasOwn(finalState.data[0], '__proto__')).to.equal(false);
    expect(Object.hasOwn(finalState.data[0], 'constructor')).to.equal(false);
    expect(Object.getPrototypeOf(finalState.data[0])).to.equal(
      Object.prototype
    );
  });

  it('writes a formula-looking value to xlsx as text, not a formula', async () => {
    const written = await jsonToSheet([{ name: '=1+1' }])(state);

    const workbook = xlsx.read(written.data.buffer, { type: 'buffer' });
    const cell = workbook.Sheets.Sheet1.A2;

    expect(cell.t).to.equal('s'); // string cell
    expect(cell).to.not.have.property('f'); // no formula
  });

  it('writes a formula-looking value to csv verbatim', async () => {
    // Documents a real risk: csv has no cell types, so a spreadsheet app
    // opening this file will treat the value as a formula. Sanitise untrusted
    // data before writing csv that a person will open.
    const written = await jsonToSheet([{ name: '=1+1' }], {
      bookType: 'csv',
    })(state);

    expect(written.data.buffer.toString('utf8')).to.include('=1+1');
  });

  it('returns the cached value of a formula cell, without evaluating it', async () => {
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.aoa_to_sheet([['a'], [1]]);
    sheet.A2 = { t: 'n', f: 'SUM(1,2)', v: 3 };
    xlsx.utils.book_append_sheet(workbook, sheet, 'S');
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const finalState = await sheetToJson(buffer)(state);

    expect(finalState.data).to.eql([{ a: 3 }]);
  });

  it('suffixes duplicate column headers rather than dropping them', async () => {
    const buffer = toWorkbookBuffer([
      ['id', 'id', 'id'],
      [1, 2, 3],
    ]);

    const finalState = await sheetToJson(buffer)(state);

    expect(finalState.data).to.eql([{ id: 1, id_1: 2, id_2: 3 }]);
  });

  it('keeps columns that are missing from the first row', async () => {
    const records = [{ a: 1 }, { a: 2, b: 'kept' }, { c: 'kept too' }];

    const written = await jsonToSheet(records)(state);
    const finalState = await sheetToJson(written.data.buffer)(state);

    expect(finalState.data).to.eql(records);
  });

  it('round-trips non-ascii content', async () => {
    const records = [{ name: 'Zoë', ar: 'مرحبا', emoji: '👋', cn: '中文' }];

    const written = await jsonToSheet(records)(state);
    const finalState = await sheetToJson(written.data.buffer)(state);

    expect(finalState.data).to.eql(records);
  });

  it('writes a valid workbook for an empty array', async () => {
    const written = await jsonToSheet([])(state);

    const finalState = await parse(written.data.buffer)(state);
    expect(finalState.data.sheetNames).to.eql(['Sheet1']);
  });

  it('returns an empty array for a sheet with no rows', async () => {
    const buffer = toWorkbookBuffer([[]]);

    const finalState = await sheetToJson(buffer)(state);

    expect(finalState.data).to.eql([]);
  });

  it('throws if the sheet name is longer than 31 characters', async () => {
    try {
      await jsonToSheet([{ a: 1 }], { sheetName: 'x'.repeat(32) })(state);
    } catch (e) {
      expect(e.message).to.match(/cannot exceed 31 chars/);
      return;
    }
    expect.fail('should have thrown');
  });

  it('preserves Date cells when content comes from a lazy state reference', async () => {
    const withFile = { ...state, data: { fileContent: toBuf('sample.xlsx') } };

    const finalState = await sheetToJson(state => state.data.fileContent)(withFile);

    expect(finalState.data[0].dateOfBirth).to.be.an.instanceOf(Date);
    expect(localDateParts(finalState.data[0].dateOfBirth)).to.eql([1991, 4, 12]);
  });

  it('limits parsing with sheetRows', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      sheetRows: 2,
    })(state);

    // header row + 1 data row
    expect(finalState.data).to.have.length(1);
    expect(finalState.data[0].name).to.equal('Amara');
  });
});
