import { expect } from 'chai';
import xlsx from 'xlsx';

import {
  sheetToJson,
  sheetToCsv,
  jsonToSheet,
  xlsx as exportedXlsx,
} from '../src/index.js';
import { toBuf, toText, localDateParts } from './helpers.js';

const state = { configuration: {}, data: {} };

const toWorkbookBuffer = aoa => {
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(aoa), 'S');
  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
};

const people = [
  {
    name: 'Amara',
    age: 34,
    dateOfBirth: 33370.125,
    notes: 'returning patient',
  },
  { name: 'Bukayo', age: 22, dateOfBirth: 37869.125 },
  { name: 'Chidi', age: 45, dateOfBirth: 29250.125, notes: 'referral' },
];

const orders = [
  { orderId: 'ORD-1', amount: 1250.5, orderedAt: 45306.125 },
  { orderId: 'ORD-2', amount: 99, orderedAt: 45324.125 },
];

const expectError = async (operation, message) => {
  try {
    await operation(state);
  } catch (e) {
    if (message instanceof RegExp) {
      expect(e.message).to.match(message);
    } else {
      expect(e.message).to.equal(message);
    }
    return;
  }
  expect.fail('should have thrown');
};

describe('sheetToJson', () => {
  it('converts the first sheet into an array of objects', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'))(state);

    expect(finalState.data).to.deep.equal(people);
  });

  it('returns dates as Date objects when cellDates is true', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      cellDates: true,
    })(state);

    const { dateOfBirth } = finalState.data[0];
    expect(dateOfBirth).to.be.an.instanceOf(Date);
    expect(localDateParts(dateOfBirth)).to.deep.equal([1991, 4, 12]);
  });

  it('selects a sheet by name', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      sheetName: 'Orders',
    })(state);

    expect(finalState.data).to.deep.equal(orders);
  });

  it('selects a sheet by index', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      sheetIndex: 1,
    })(state);

    expect(finalState.data).to.deep.equal(orders);
  });

  it('resolves a lazy state reference to the file content', async () => {
    const withFile = { ...state, data: { fileContent: toBuf('sample.xlsx') } };

    const finalState = await sheetToJson(s => s.data.fileContent, {
      sheetName: 'Orders',
    })(withFile);

    expect(finalState.data).to.deep.equal(orders);
  });

  it('throws and lists the available sheets for an unknown sheet name', async () => {
    await expectError(
      sheetToJson(toBuf('sample.xlsx'), { sheetName: 'Nope' }),
      'sheetjs: no sheet named "Nope". Available sheets: People, Orders'
    );
  });

  it('throws if the sheet index is out of range', async () => {
    await expectError(
      sheetToJson(toBuf('sample.xlsx'), { sheetIndex: 9 }),
      'sheetjs: no sheet at index 9. This workbook has 2 sheet(s): People, Orders'
    );
  });
});

describe('content detection', () => {
  const rows = [{ name: 'Amara', age: 34 }];
  const xlsxBase64 = toWorkbookBuffer([
    ['name', 'age'],
    ['Amara', 34],
  ]).toString('base64');

  it('decodes a base64 string', async () => {
    const finalState = await sheetToJson(xlsxBase64)(state);

    expect(finalState.data).to.deep.equal(rows);
  });

  it('decodes a base64 data URL', async () => {
    const dataUrl = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${xlsxBase64}`;

    const finalState = await sheetToJson(dataUrl)(state);

    expect(finalState.data).to.deep.equal(rows);
  });

  it('decodes base64 that has been wrapped across lines', async () => {
    const wrapped = xlsxBase64.replace(/(.{76})/g, '$1\n');

    const finalState = await sheetToJson(wrapped)(state);

    expect(finalState.data).to.deep.equal(rows);
  });

  it('decodes base64 wrapped at 64 columns with CRLF line endings', async () => {
    const wrapped = xlsxBase64.replace(/(.{64})/g, '$1\r\n');

    const finalState = await sheetToJson(wrapped)(state);

    expect(finalState.data).to.deep.equal(rows);
  });

  it('decodes a base64 csv, which has no file signature to detect', async () => {
    const encoded = Buffer.from('name,age\nAmara,34').toString('base64');

    const finalState = await sheetToJson(encoded)(state);

    expect(finalState.data).to.deep.equal(rows);
  });

  it('reads a csv string as text', async () => {
    const finalState = await sheetToJson(toText('sample.csv'))(state);

    expect(finalState.data).to.deep.equal([
      {
        name: 'Amara',
        age: 34,
        dateOfBirth: 33370,
        notes: 'returning patient',
      },
      { name: 'Bukayo', age: 22, dateOfBirth: 37869 },
      { name: 'Chidi', age: 45, dateOfBirth: 29250, notes: 'referral' },
    ]);
  });

  it('reads a single-column csv as text, even when it is valid base64', async () => {
    // "nameJohnJane" passes the base64 round-trip once newlines are stripped
    const finalState = await sheetToJson('name\nJohn\nJane')(state);

    expect(finalState.data).to.deep.equal([{ name: 'John' }, { name: 'Jane' }]);
  });

  it('reads a single-column csv with CRLF line endings as text', async () => {
    const finalState = await sheetToJson('name\r\nJohn\r\nJane\r\n')(state);

    expect(finalState.data).to.deep.equal([{ name: 'John' }, { name: 'Jane' }]);
  });

  it('reads a non-base64 data URL as percent-encoded text', async () => {
    const finalState = await sheetToJson(
      'data:text/csv,name%2Cage%0AAmara%2C34'
    )(state);

    expect(finalState.data).to.deep.equal(rows);
  });

  it('decodes base64 when the type is declared explicitly', async () => {
    const finalState = await sheetToJson(xlsxBase64, { type: 'base64' })(state);

    expect(finalState.data).to.deep.equal(rows);
  });

  it('honors an explicit type over the detected one', async () => {
    // "abcd" is valid base64, so it would otherwise be decoded
    const finalState = await sheetToJson('abcd\nefgh', { type: 'string' })(
      state
    );

    expect(finalState.data).to.deep.equal([{ abcd: 'efgh' }]);
  });

  it('throws for invalid content when base64 is declared explicitly', async () => {
    await expectError(
      sheetToJson('!!!not base64!!!', { type: 'base64' }),
      'sheetjs: invalid base64 content'
    );
  });

  it('throws for invalid content in a base64 data URL', async () => {
    await expectError(
      sheetToJson('data:text/csv;base64,!!!not base64!!!'),
      'sheetjs: invalid base64 content'
    );
  });

  it('throws for a data URL with no comma separator', async () => {
    await expectError(
      sheetToJson('data:text/csv'),
      'sheetjs: malformed data URL; expected a comma separator'
    );
  });

  it('throws for malformed percent-encoding in a data URL', async () => {
    await expectError(
      sheetToJson('data:text/csv,bad%ZZ'),
      'sheetjs: malformed data URL; content is not valid percent-encoded text'
    );
  });

  it('throws if the content is not a buffer or string', async () => {
    await expectError(
      sheetToJson(42),
      'sheetjs: file content must be a Buffer or string. Wrap binary data in Buffer.from() first'
    );
  });

  it('rejects a Uint8Array and suggests Buffer.from()', async () => {
    await expectError(
      sheetToJson(new Uint8Array(toBuf('sample.xlsx'))),
      /Buffer\.from\(\)/
    );
  });

  it('rejects an ArrayBuffer and suggests Buffer.from()', async () => {
    const { buffer, byteOffset, byteLength } = toBuf('sample.xlsx');

    await expectError(
      sheetToJson(buffer.slice(byteOffset, byteOffset + byteLength)),
      /Buffer\.from\(\)/
    );
  });
});

describe('sheetToCsv', () => {
  it('converts the first sheet into a csv string', async () => {
    const buffer = toWorkbookBuffer([
      ['name', 'age'],
      ['Amara', 34],
    ]);

    const finalState = await sheetToCsv(buffer)(state);

    expect(finalState.data).to.equal('name,age\nAmara,34');
  });

  it('selects a sheet by name', async () => {
    const finalState = await sheetToCsv(toBuf('sample.xlsx'), {
      sheetName: 'Orders',
    })(state);

    expect(finalState.data).to.equal(
      'orderId,amount,orderedAt\nORD-1,1250.5,1/15/24\nORD-2,99,2/2/24'
    );
  });

});

describe('jsonToSheet', () => {
  const records = [
    { id: 1, name: 'Amara' },
    { id: 2, name: 'Bukayo' },
  ];

  it('returns an xlsx buffer by default', async () => {
    const finalState = await jsonToSheet(records)(state);

    const { buffer, ...rest } = finalState.data;
    expect(buffer).to.be.an.instanceOf(Buffer);
    expect(rest).to.deep.equal({ bookType: 'xlsx', sheetName: 'Sheet1' });
  });

  it('returns a base64 string when output is base64', async () => {
    const finalState = await jsonToSheet(records, { output: 'base64' })(state);

    const { base64, ...rest } = finalState.data;
    // "UEsDBBQ" is the base64 prefix of the PK zip header
    expect(base64).to.match(/^UEsDBBQ/);
    expect(rest).to.deep.equal({ bookType: 'xlsx', sheetName: 'Sheet1' });
  });

  it('writes the rows to a sheet named by sheetName', async () => {
    const written = await jsonToSheet(records, { sheetName: 'Export' })(state);

    const finalState = await sheetToJson(written.data.buffer, {
      sheetName: 'Export',
    })(state);

    expect(finalState.data).to.deep.equal(records);
  });

  it('writes a csv file when bookType is csv', async () => {
    const finalState = await jsonToSheet(records, { bookType: 'csv' })(state);

    // SheetJS prefixes csv output with a UTF-8 BOM
    expect(finalState.data.buffer.toString('utf8')).to.equal(
      '﻿id,name\n1,Amara\n2,Bukayo'
    );
  });

  it('throws if the data is not an array', async () => {
    await expectError(
      jsonToSheet({ id: 1 }),
      'sheetjs: jsonToSheet expects an array of objects'
    );
  });

  it('throws if an item is a primitive', async () => {
    await expectError(
      jsonToSheet(['a', 'b', 'c']),
      'sheetjs: jsonToSheet expects an array of objects, but item 0 is a string'
    );
  });

  it('throws if an item is null', async () => {
    await expectError(
      jsonToSheet([{ a: 1 }, null]),
      'sheetjs: jsonToSheet expects an array of objects, but item 1 is null'
    );
  });

  it('throws if an item is an array', async () => {
    await expectError(
      jsonToSheet([['id', 'name']]),
      'sheetjs: jsonToSheet expects an array of objects, but item 0 is an array'
    );
  });

  it('throws for an unsupported output format', async () => {
    await expectError(
      jsonToSheet(records, { output: 'stream' }),
      'sheetjs: unsupported output "stream". Use "buffer" or "base64"'
    );
  });
});

describe('option forwarding', () => {
  it('sheetToJson sends parse options to the parser', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      sheetRows: 2,
    })(state);

    expect(finalState.data).to.deep.equal([people[0]]);
  });

  it('sheetToJson sends array output options to the conversion', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      sheetName: 'Orders',
      header: 1,
    })(state);

    expect(finalState.data).to.deep.equal([
      ['orderId', 'amount', 'orderedAt'],
      ['ORD-1', 1250.5, 45306.125],
      ['ORD-2', 99, 45324.125],
    ]);
  });

  it('sheetToJson sends skipHidden to the conversion', async () => {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.aoa_to_sheet([
      ['name'],
      ['Amara'],
      ['Hidden'],
      ['Zuri'],
    ]);
    worksheet['!rows'] = [undefined, undefined, { hidden: true }];
    xlsx.utils.book_append_sheet(workbook, worksheet, 'S');
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // SheetJS only reads hidden rows from xlsx with cellStyles
    const finalState = await sheetToJson(buffer, {
      cellStyles: true,
      skipHidden: true,
    })(state);

    expect(finalState.data).to.deep.equal([{ name: 'Amara' }, { name: 'Zuri' }]);
  });

  it('sheetToJson sends FS to the parser', async () => {
    const finalState = await sheetToJson('name#age\nAmara#34', {
      type: 'string',
      FS: '#',
    })(state);

    expect(finalState.data).to.deep.equal([{ name: 'Amara', age: 34 }]);
  });

  it('sheetToJson sends dateNF to the parser', async () => {
    const finalState = await sheetToJson(toBuf('sample.xlsx'), {
      sheetName: 'Orders',
      raw: false,
      dateNF: 'yyyy-mm-dd',
    })(state);

    expect(finalState.data).to.deep.equal([
      { orderId: 'ORD-1', amount: '1250.5', orderedAt: '2024-01-15' },
      { orderId: 'ORD-2', amount: '99', orderedAt: '2024-02-02' },
    ]);
  });

  it('sheetToCsv sends FS to the csv output', async () => {
    const finalState = await sheetToCsv(toBuf('sample.xlsx'), {
      sheetName: 'Orders',
      FS: ';',
    })(state);

    expect(finalState.data).to.equal(
      'orderId;amount;orderedAt\nORD-1;1250.5;1/15/24\nORD-2;99;2/2/24'
    );
  });

  it('jsonToSheet sends array of objects options to the sheet', async () => {
    const written = await jsonToSheet([{ id: 1, name: 'Amara' }], {
      header: ['name', 'id'],
    })(state);

    const finalState = await sheetToJson(written.data.buffer, { header: 1 })(
      state
    );

    expect(finalState.data).to.deep.equal([
      ['name', 'id'],
      ['Amara', 1],
    ]);
  });

  it('jsonToSheet sends write options to the writer', async () => {
    const finalState = await jsonToSheet([{ name: 'Amara' }], {
      Props: { Title: 'Export' },
    })(state);

    const workbook = xlsx.read(finalState.data.buffer, { type: 'buffer' });
    expect(workbook.Props.Title).to.equal('Export');
  });
});

describe('xlsx', () => {
  it('exports the full SheetJS library', () => {
    expect(exportedXlsx.read).to.equal(xlsx.read);
    expect(exportedXlsx.utils).to.equal(xlsx.utils);
  });
});
