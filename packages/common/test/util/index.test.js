import { expect } from 'chai';
import xlsx from 'xlsx';
import * as util from '../../src/util/index.js';
const { encode, decode, uuid, rowsToBuffer } = util;

describe('uuid', () => {
  it('should generate a uuid', () => {
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    expect(uuid()).to.match(uuidPattern);
  });
  it('should generate unique UUIDs', () => {
    const id1 = uuid();
    const id2 = uuid();

    expect(id1).not.eql(id2);
  });
});
const errorMsg =
  'The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object';

describe('encode', () => {
  it('should encode a string to Base64', () => {
    expect(encode('Hello World')).to.eql('SGVsbG8gV29ybGQ=');
  });
  it('should encode a string to Base64 while skipping the JSON stringification step', () => {
    expect(encode('Hello World', { parseJson: false })).to.eql(
      'SGVsbG8gV29ybGQ=',
    );
  });

  it('should encode an empty string to Base64', () => {
    expect(encode('')).to.eql('');
  });
  it('should encode emoji to Base64', () => {
    expect(encode('😀')).to.eql('8J+YgA==');
  });
  it('should throw an error if a function is passed', () => {
    expect(() => encode(() => {})).to.throw(errorMsg);
  });
  it('should encode a javascript object', () => {
    const obj = { name: 'Jane Doe' };
    expect(encode(obj)).to.eql('eyJuYW1lIjoiSmFuZSBEb2UifQ==');
  });
});

describe('decode', () => {
  it('should throw an error if the string is not a string', () => {
    expect(() => decode(123)).to.throw(errorMsg);
    expect(() => decode(true)).to.throw(errorMsg);
    expect(() => decode(null)).to.throw(errorMsg);
    expect(() => decode({})).to.throw(errorMsg);
    expect(() => decode(() => {})).to.throw(errorMsg);
  });
  it('should decode a Base64 string for emoji', () => {
    expect(decode('8J+YgA==')).to.eql('😀');
  });
  it('should decode a Base64 string back to its original string', () => {
    expect(decode('SGVsbG8gV29ybGQ=')).to.eql('Hello World');
  });
  it('should decode a Base64 string back to its original string without needing to JSON parse', () => {
    expect(decode('SGVsbG8gV29ybGQ=', { parseJson: false })).to.eql(
      'Hello World',
    );
  });

  it('should decode an empty Base64 string', () => {
    expect(decode('')).to.eql('');
  });
  it('should decode a JSON object into a standard javascript object', () => {
    const obj = { name: 'Jane Doe' };
    expect(decode('eyJuYW1lIjoiSmFuZSBEb2UifQ==')).to.eql(obj);
  });
});

describe('rowsToBuffer', () => {
  const rows = [
    { Name: 'Alice', Age: 30 },
    { Name: 'Bob', Age: 25 },
  ];

  it('should return a Buffer', () => {
    const result = rowsToBuffer(rows, {});
    expect(Buffer.isBuffer(result)).to.be.true;
  });

  it('should produce a valid xlsx workbook by default', () => {
    const result = rowsToBuffer(rows, {});
    const wb = xlsx.read(result, { type: 'buffer' });
    expect(wb.SheetNames).to.include('Sheet');
  });

  it('should use the provided wsName', () => {
    const result = rowsToBuffer(rows, { wsName: 'Patient Data' });
    const wb = xlsx.read(result, { type: 'buffer' });
    expect(wb.SheetNames).to.include('Patient Data');
  });

  it('should write correct row data into the worksheet', () => {
    const result = rowsToBuffer(rows, { wsName: 'Data' });
    const wb = xlsx.read(result, { type: 'buffer' });
    const ws = wb.Sheets['Data'];
    const parsed = xlsx.utils.sheet_to_json(ws);
    expect(parsed).to.eql(rows);
  });

  it('should support csv bookType', () => {
    const result = rowsToBuffer(rows, { bookType: 'csv' });
    expect(Buffer.isBuffer(result)).to.be.true;
    const text = result.toString();
    expect(text).to.include('Alice');
    expect(text).to.include('Bob');
  });

  it('should handle an empty rows array', () => {
    const result = rowsToBuffer([], { wsName: 'Empty' });
    const wb = xlsx.read(result, { type: 'buffer' });
    const ws = wb.Sheets['Empty'];
    const parsed = xlsx.utils.sheet_to_json(ws);
    expect(parsed).to.eql([]);
  });
});
