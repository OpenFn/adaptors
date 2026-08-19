import { expect } from 'chai';
import { createHash } from 'node:crypto';
import { hash, sha256 } from '../../src/util/hash.js';

describe('util.hash', () => {
  it('hashes a string with sha256 by default', () => {
    expect(hash('abc')).to.eql(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    );
    expect(hash('')).to.eql(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
  });

  it('is deterministic', () => {
    expect(hash('hello')).to.eql(hash('hello'));
  });

  it('accepts other algorithms', () => {
    expect(hash('abc', 'sha512')).to.eql(
      createHash('sha512').update('abc').digest('hex'),
    );
    expect(hash('abc', 'sha3-256')).to.eql(
      createHash('sha3-256').update('abc').digest('hex'),
    );
  });

  it('forgives casing and punctuation in the algorithm name', () => {
    expect(hash('abc', 'SHA-256')).to.eql(hash('abc', 'sha256'));
    expect(hash('abc', 'sha_256')).to.eql(hash('abc', 'sha256'));
  });

  it('throws a helpful error for an unsupported algorithm', () => {
    expect(() => hash('abc', 'sha999')).to.throw(/unsupported algorithm/);
  });

  it('supports hex, base64 and base64url encodings', () => {
    expect(hash('abc', 'sha256', { encoding: 'base64' })).to.eql(
      createHash('sha256').update('abc').digest('base64'),
    );
    expect(hash('abc', 'sha256', { encoding: 'base64url' })).to.eql(
      createHash('sha256').update('abc').digest('base64url'),
    );
    expect(() => hash('abc', 'sha256', { encoding: 'rot13' })).to.throw(
      /unsupported encoding/,
    );
  });

  it('hashes objects independently of key order', () => {
    const a = { sender: 'M-PESA', amount: 5000, nested: { b: 2, a: 1 } };
    const b = { nested: { a: 1, b: 2 }, amount: 5000, sender: 'M-PESA' };
    expect(hash(a)).to.eql(hash(b));
  });

  it('respects insertion order when stable is false', () => {
    const a = { x: 1, y: 2 };
    const b = { y: 2, x: 1 };
    expect(hash(a, 'sha256', { stable: false })).to.not.eql(
      hash(b, 'sha256', { stable: false }),
    );
  });

  it('distinguishes different values', () => {
    expect(hash({ amount: 5000 })).to.not.eql(hash({ amount: 5001 }));
    expect(hash([1, 2])).to.not.eql(hash([2, 1]));
  });

  it('handles undefined like JSON.stringify', () => {
    expect(hash([undefined])).to.eql(hash([null]));
    expect(hash({ x: 1, y: undefined })).to.eql(hash({ x: 1 }));
  });

  it('hashes buffers and typed arrays', () => {
    expect(hash(Buffer.from('abc'))).to.eql(hash('abc'));
    expect(hash(new TextEncoder().encode('abc'))).to.eql(hash('abc'));
  });

  it('throws when data is missing', () => {
    expect(() => hash()).to.throw(/data is required/);
    expect(() => hash(null)).to.throw(/data is required/);
  });
});

describe('util.sha256', () => {
  it('is shorthand for util.hash(data, "sha256")', () => {
    expect(sha256('abc')).to.eql(hash('abc', 'sha256'));
    expect(sha256({ a: 1 })).to.eql(hash({ a: 1 }, 'sha256'));
  });
});
