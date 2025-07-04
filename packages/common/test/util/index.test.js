import { expect } from 'chai';
import { encode, decode, uuid } from '../../src/util';

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
      'SGVsbG8gV29ybGQ='
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
      'Hello World'
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

