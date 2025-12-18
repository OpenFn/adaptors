import { expect } from 'chai';
import {
  escape,
  escapeLike,
  escapeIdentifier,
  validateOperator,
} from '../src/util.js';

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

    it('should handle numbers', () => {
      expect(escape(123)).to.eq('123');
      expect(escape(0)).to.eq('0');
      expect(escape(-42)).to.eq('-42');
      expect(escape(3.14)).to.eq('3.14');
    });

    it('should handle booleans', () => {
      expect(escape(true)).to.eq('true');
      expect(escape(false)).to.eq('false');
    });

    it('should handle arrays', () => {
      const input = ['test', "O'Connor", 123];
      const expected = ['test', "O''Connor", '123'];
      expect(escape(input)).to.deep.equal(expected);
    });

    it('should throw error for unexpected types', () => {
      expect(() => escape(Symbol('test'))).to.throw(
        'Unexpected type for SQL value: symbol'
      );
      expect(() => escape(() => {})).to.throw(
        'Unexpected type for SQL value: function'
      );
    });

    it('should NOT escape LIKE wildcards', () => {
      expect(escape('100%')).to.eq('100%');
      expect(escape('test_value')).to.eq('test_value');
    });
  });

  describe('escapeLike', () => {
    it('should escape LIKE wildcards', () => {
      expect(escapeLike('100%')).to.eq('100[%]');
      expect(escapeLike('test_value')).to.eq('test[_]value');
      expect(escapeLike('[admin]')).to.eq('[[[]admin]');
    });

    it('should escape both quotes and wildcards', () => {
      const input = "O'Connor%";
      const expected = "O''Connor[%]";
      expect(escapeLike(input)).to.eq(expected);
    });

    it('should prevent wildcard injection attacks', () => {
      expect(escapeLike('%')).to.eq('[%]');
      expect(escapeLike('_')).to.eq('[_]');
      expect(escapeLike('[a-z]')).to.eq('[[[]a-z]');
    });

    it('should escape complex patterns', () => {
      const input = "test%_[pattern]'s";
      const expected = "test[%][_][[[]pattern]''s";
      expect(escapeLike(input)).to.eq(expected);
    });

    it('should handle empty string', () => {
      expect(escapeLike('')).to.eq('');
    });

    it('should prevent injection via multiple wildcards', () => {
      expect(escapeLike('%%')).to.eq('[%][%]');
      expect(escapeLike('__')).to.eq('[_][_]');
      expect(escapeLike('%_%')).to.eq('[%][_][%]');
    });
  });

  describe('escapeIdentifier', () => {
    it('should wrap a simple identifier in brackets', () => {
      const input = 'users';
      const expected = '[users]';
      expect(escapeIdentifier(input)).to.eq(expected);
    });

    it('should escape a column name', () => {
      const input = 'first_name';
      const expected = '[first_name]';
      expect(escapeIdentifier(input)).to.eq(expected);
    });

    it('should handle identifiers with dots (schema.table)', () => {
      const input = 'dbo.users';
      const expected = '[dbo.users]';
      expect(escapeIdentifier(input)).to.eq(expected);
    });

    it('should escape closing brackets by doubling them', () => {
      const input = 'user]table';
      const expected = '[user]]table]';
      expect(escapeIdentifier(input)).to.eq(expected);
    });

    it('should prevent SQL injection via column name', () => {
      const input = 'id]; DROP TABLE users; --';
      const expected = '[id]]; DROP TABLE users; --]';
      expect(escapeIdentifier(input)).to.eq(expected);
    });

    it('should prevent SQL injection with UNION attack', () => {
      const input = 'id] UNION SELECT * FROM sensitive_data; --';
      const expected = '[id]] UNION SELECT * FROM sensitive_data; --]';
      expect(escapeIdentifier(input)).to.eq(expected);
    });

    it('should prevent malicious table name injection', () => {
      const input = "users; DELETE FROM users WHERE '1'='1";
      const expected = "[users; DELETE FROM users WHERE '1'='1]";
      expect(escapeIdentifier(input)).to.eq(expected);
    });

    it('should throw error for non-string input', () => {
      expect(() => escapeIdentifier(123)).to.throw(
        'Identifier must be a non-empty string'
      );
    });

    it('should throw error for empty string', () => {
      expect(() => escapeIdentifier('')).to.throw(
        'Identifier must be a non-empty string'
      );
    });

    it('should throw error for null', () => {
      expect(() => escapeIdentifier(null)).to.throw(
        'Identifier must be a non-empty string'
      );
    });
  });

  describe('validateOperator', () => {
    it('should accept basic comparison operators', () => {
      expect(validateOperator('=')).to.eq('=');
      expect(validateOperator('!=')).to.eq('!=');
      expect(validateOperator('<>')).to.eq('<>');
      expect(validateOperator('<')).to.eq('<');
      expect(validateOperator('>')).to.eq('>');
      expect(validateOperator('<=')).to.eq('<=');
      expect(validateOperator('>=')).to.eq('>=');
    });

    it('should normalize operators to uppercase', () => {
      expect(validateOperator('like')).to.eq('LIKE');
      expect(validateOperator('Like')).to.eq('LIKE');
      expect(validateOperator('LIKE')).to.eq('LIKE');
      expect(validateOperator('in')).to.eq('IN');
      expect(validateOperator('not in')).to.eq('NOT IN');
    });

    it('should handle whitespace around operators', () => {
      expect(validateOperator('  =  ')).to.eq('=');
      expect(validateOperator(' like ')).to.eq('LIKE');
      expect(validateOperator('  >=  ')).to.eq('>=');
    });

    it('should accept NULL operators', () => {
      expect(validateOperator('IS NULL')).to.eq('IS NULL');
      expect(validateOperator('is null')).to.eq('IS NULL');
      expect(validateOperator('IS NOT NULL')).to.eq('IS NOT NULL');
      expect(validateOperator('is not null')).to.eq('IS NOT NULL');
    });

    it('should reject SQL injection attempts via operator', () => {
      expect(() => validateOperator("= 'admin' OR '1'='1")).to.throw(
        'Invalid SQL operator'
      );

      expect(() => validateOperator('; DROP TABLE users; --')).to.throw(
        'Invalid SQL operator'
      );

      expect(() =>
        validateOperator('= 1 UNION SELECT * FROM passwords')
      ).to.throw('Invalid SQL operator');
    });

    it('should reject invalid operators', () => {
      expect(() => validateOperator('AND')).to.throw('Invalid SQL operator');
      expect(() => validateOperator('OR')).to.throw('Invalid SQL operator');
      expect(() => validateOperator('UNION')).to.throw('Invalid SQL operator');
      expect(() => validateOperator('SELECT')).to.throw('Invalid SQL operator');
    });

    it('should throw error for empty string', () => {
      expect(() => validateOperator('')).to.throw(
        'Operator must be a non-empty string'
      );
      expect(() => validateOperator('   ')).to.throw(
        'Operator must be a non-empty string'
      );
    });

    it('should throw error for non-string input', () => {
      expect(() => validateOperator(123)).to.throw(
        'Operator must be a non-empty string'
      );
      expect(() => validateOperator(null)).to.throw(
        'Operator must be a non-empty string'
      );
    });
  });
});
