/**
 * Escapes a string for use in an SQL query.
 * @example <caption>Examples</caption>
 * util.escape('test string') // 'test string'
 * util.escape("O'Connor") // "O''Connor"
 * util.escape('string with "quotes"') // 'string with "quotes"'
 * util.escape('') // ''
 * util.escape(null) // null
 * util.escape(123) // '123'
 * util.escape(true) // 'true'
 * util.escape("'; DROP TABLE users; --") // "''; DROP TABLE users; --"
 * @param {string|number|boolean|null|undefined} stringExp - The value to escape.
 * @returns {string|null|undefined} The escaped string, or null/undefined if input was null/undefined.
 * @throws {Error} If the value is an unexpected type (object, array, function, etc.).
 */
export function escape(stringExp) {
  if (typeof stringExp === 'object' && stringExp !== null) {
    if (Array.isArray(stringExp)) {
      return stringExp.map(x => escape(x));
    }
    return Object.values(stringExp).map(x => escape(x));
  }

  if (stringExp === null || stringExp === undefined) {
    return stringExp;
  }

  if (typeof stringExp === 'number' || typeof stringExp === 'boolean') {
    return String(stringExp);
  }

  if (typeof stringExp !== 'string') {
    throw new Error(`Unexpected type for SQL value: ${typeof stringExp}`);
  }

  return stringExp.replace(/'/g, "''");
}

/**
 * Escapes a string for use in SQL LIKE patterns, preventing wildcard injection.
 * This should be used when the operator is LIKE or NOT LIKE.
 * @example <caption>Examples</caption>
 * util.escapeLike('test') // 'test'
 * util.escapeLike('100%') // '100[%]'
 * util.escapeLike('test_value') // 'test[_]value'
 * util.escapeLike('[admin]') // '[[[]admin]'
 * util.escapeLike("O'Connor%") // "O''Connor[%]"
 * @param {string} pattern - The pattern to escape.
 * @returns {string} The escaped pattern safe for use in LIKE clauses.
 */
export function escapeLike(pattern) {
  // Escape single quotes
  let escaped = escape(pattern);

  escaped = escaped.replace(/\[/g, '[[[]');
  escaped = escaped.replace(/%/g, '[%]');
  escaped = escaped.replace(/_/g, '[_]');

  return escaped;
}

/**
 * Escapes an SQL identifier (table or column name) to prevent SQL injection.
 * Uses bracket notation for SQL Server which is safer than validating patterns.
 * @example <caption>Examples</caption>
 * util.escapeIdentifier('users') // '[users]'
 * util.escapeIdentifier('first_name') // '[first_name]'
 * util.escapeIdentifier('user]table') // '[user]]table]'
 * util.escapeIdentifier('my.table') // '[my.table]'
 * @param {string} identifier - The identifier to escape.
 * @returns {string} The escaped identifier wrapped in brackets.
 * @throws {Error} If the identifier is not a string or is empty.
 */
export function escapeIdentifier(identifier) {
  if (typeof identifier !== 'string' || identifier.length === 0) {
    throw new Error('Identifier must be a non-empty string');
  }

  // Escape any closing brackets by doubling them, then wrap in brackets
  return `[${identifier.replace(/\]/g, ']]')}]`;
}

/**
 * List of allowed SQL operators to prevent SQL injection via operator field.
 * @private
 */
const ALLOWED_OPERATORS = [
  '=',
  '!=',
  '<>',
  '<',
  '>',
  '<=',
  '>=',
  'LIKE',
  'NOT LIKE',
  'IN',
  'NOT IN',
  'IS NULL',
  'IS NOT NULL',
];

/**
 * Validates and normalizes SQL operators to prevent SQL injection.
 * @example <caption>Examples</caption>
 * util.validateOperator('=') // '='
 * util.validateOperator('like') // 'LIKE'
 * util.validateOperator('>=') // '>='
 * util.validateOperator("' OR '1'='1") // throws Error
 * @param {string} operator - The operator to validate.
 * @returns {string} The validated and normalized operator.
 * @throws {Error} If the operator is not in the allowed list.
 */
export function validateOperator(operator) {
  if (typeof operator !== 'string') {
    throw new Error('Operator must be a non-empty string');
  }

  const normalized = operator.trim().toUpperCase();

  if (normalized.length === 0) {
    throw new Error('Operator must be a non-empty string');
  }

  if (!ALLOWED_OPERATORS.includes(normalized)) {
    throw new Error(
      `Invalid SQL operator: "${operator}". Allowed operators: ${ALLOWED_OPERATORS.join(
        ', '
      )}`
    );
  }

  return normalized;
}
