import { expect } from 'chai';
import { escape } from '../src/util';

describe('util', () => {
  describe('escape', () => {
    it('should escape a simple string', () => {
      const input = 'test string';
      const expected = 'test string';
      expect(escape(input)).to.eq(expected);
    });

    it('should escape a string with special characters', () => {
      const input = "O'Connor";
      const expected = "O''Connor";
      expect(escape(input)).to.eq(expected);
    });

    it('should escape a string with quotes', () => {
      const input = 'string with "quotes"';
      const expected = 'string with "quotes"';
      expect(escape(input)).to.eq(expected);
    });

    it('should handle empty string', () => {
      const input = '';
      const expected = '';
      expect(escape(input)).to.eq(expected);
    });

    it('should handle null value', () => {
      const input = null;
      const expected = null;
      expect(escape(input)).to.eq(expected);
    });

    it('should prevent SQL injection attempts', () => {
      const input = "'; DROP TABLE users; --";
      const expected = "''; DROP TABLE users; --";
      expect(escape(input)).to.eq(expected);
    });

    it('should handle SQL injection with multiple quotes', () => {
      const input = "'; SELECT * FROM users WHERE '1'='1";
      const expected = "''; SELECT * FROM users WHERE ''1''=''1";
      expect(escape(input)).to.eq(expected);
    });

    it('should escape malicious email input', () => {
      const input = "test@example.com'; DROP TABLE test_injection; --";
      const expected = "test@example.com''; DROP TABLE test_injection; --";
      expect(escape(input)).to.eq(expected);
    });
  });
});
