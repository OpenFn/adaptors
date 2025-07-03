/**
 * Escapes a string for use in an SQL query.
 * @example <caption>Examples</caption>
 * util.escape('test string') // 'test string'
 * util.escape("O'Connor") // "O''Connor"
 * util.escape('string with "quotes"') // 'string with "quotes"'
 * util.escape('') // ''
 * util.escape(null) // null
 * util.escape("'; DROP TABLE users; --") // "''; DROP TABLE users; --"
 * @param {string} stringExp - The string to escape.
 * @returns {string} The escaped string.
 */
export function escape(stringExp) {
  if (typeof stringExp === 'object' && stringExp !== null) {
    return Object.values(stringExp).map(x => escape(x));
  } else if (typeof stringExp !== 'string') {
    return stringExp;
  }

  return stringExp.replace(/\'/g, "''");
}
