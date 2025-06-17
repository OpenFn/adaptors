import SqlString from 'sqlstring';

/**
 * Escapes a string for use in an SQL query.
 * @param {string} input - The input string to escape.
 * @returns {string} - The escaped string.
 */
export function escape(input) {
  return SqlString.escape(input);
}
