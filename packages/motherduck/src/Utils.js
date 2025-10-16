/**
 * Validate SQL identifier (table names, column names, etc.)
 * @param {string} identifier - SQL identifier to validate
 * @returns {string} - Validated identifier
 * @throws {Error} - If identifier contains dangerous characters
 */
export function validateSqlIdentifier(identifier) {
  if (typeof identifier !== 'string') {
    throw new Error('SQL identifier must be a string');
  }
  
  // Allow alphanumeric, underscores, and dots (for schema.table references)
  // Removed $ from allowed characters for better security
  if (!/^[a-zA-Z_][a-zA-Z0-9_.]*$/.test(identifier)) {
    throw new Error(`Invalid SQL identifier: ${identifier}. Only alphanumeric characters, underscores, and dots are allowed.`);
  }
  
  // Additional check for common SQL injection patterns
  const upperIdentifier = identifier.toUpperCase();
  const dangerousPatterns = [
    'DROP',
    'DELETE',
    'INSERT',
    'UPDATE',
    'ALTER',
    'CREATE',
    'EXEC',
    'UNION',
    'SELECT',
    '--',
    '/*',
    '*/',
    ';'
  ];
  
  for (const pattern of dangerousPatterns) {
    if (upperIdentifier.includes(pattern)) {
      throw new Error(`SQL identifier contains forbidden pattern: ${pattern}`);
    }
  }
  
  return identifier;
}

/**
 * Escape SQL string values to prevent SQL injection
 * @param {string} value - String value to escape
 * @returns {string} - Escaped string value
 */
export function escapeSqlString(value) {
  if (typeof value !== 'string') {
    return value;
  }
  return value.replace(/'/g, "''");
}

/**
 * Format a value for SQL insertion
 * @param {any} value - Value to format
 * @returns {string} - Formatted SQL value
 */
export function formatSqlValue(value) {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  if (typeof value === 'string') {
    return `'${escapeSqlString(value)}'`;
  }
  if (typeof value === 'boolean') {
    return value ? 'TRUE' : 'FALSE';
  }
  return value.toString();
}

/**
 * Build a WHERE clause from an object
 * @param {object} conditions - Object with column-value pairs
 * @param {object} operators - Optional operators for each column
 * @returns {string} - WHERE clause string
 */
export function buildWhereClause(conditions, operators = {}) {
  if (!conditions || Object.keys(conditions).length === 0) {
    return '';
  }
  
  const clauses = Object.entries(conditions).map(([column, value]) => {
    const operator = operators[column] || '=';
    const formattedValue = formatSqlValue(value);
    return `${column} ${operator} ${formattedValue}`;
  });
  
  return `WHERE ${clauses.join(' AND ')}`;
}

/**
 * Validate a WHERE clause to prevent SQL injection
 * @param {string} whereClause - WHERE clause to validate
 * @returns {string} - Validated WHERE clause
 * @throws {Error} - If WHERE clause contains dangerous patterns
 */
export function validateWhereClause(whereClause) {
  if (!whereClause || typeof whereClause !== 'string') {
    return whereClause || '';
  }
  
  // Ensure it starts with WHERE (case-insensitive)
  const trimmed = whereClause.trim();
  if (!trimmed.toUpperCase().startsWith('WHERE')) {
    throw new Error('WHERE clause must start with WHERE keyword');
  }
  
  // Check for dangerous SQL keywords that shouldn't be in WHERE clauses
  const dangerousKeywords = [
    '--', // Comment start
    '/*', // Comment start
    '*/', // Comment end
    'EXEC', // Execute
    'EXECUTE', // Execute
    'DROP', // Drop tables/databases
    'CREATE', // Create tables/databases
    'ALTER', // Alter tables
    'INSERT', // Insert data (shouldn't be in WHERE)
    'UPDATE', // Update (shouldn't be in WHERE)
    'DELETE', // Delete (shouldn't be in WHERE)
    'GRANT', // Permission changes
    'REVOKE', // Permission changes
    'UNION', // Union attacks
    'INTO', // Into operations
    'SCRIPT', // Script injection
    'JAVASCRIPT', // JS injection
    'VBSCRIPT', // VB injection
    'ONLOAD', // Event handlers
    'ONCLICK', // Event handlers
    'ONERROR', // Event handlers
    'XP_', // Extended procedures
    'SP_', // Stored procedures
    'BACKUP', // Backup operations
    'RESTORE', // Restore operations
    'SHUTDOWN', // Shutdown operations
  ];
  
  const upperClause = trimmed.toUpperCase();
  for (const keyword of dangerousKeywords) {
    if (upperClause.includes(keyword.toUpperCase())) {
      throw new Error(`WHERE clause contains forbidden keyword: ${keyword}`);
    }
  }
  
  // Check for statement terminator (semicolon) - allow only if clearly within string literals
  if (trimmed.includes(';')) {
    // Simple check: if there's a semicolon followed by more SQL keywords, it's likely an injection
    const afterSemicolon = trimmed.split(';')[1];
    if (afterSemicolon && afterSemicolon.trim().length > 0) {
      const suspiciousKeywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'CREATE', 'ALTER', 'EXEC'];
      const afterUpper = afterSemicolon.toUpperCase();
      for (const keyword of suspiciousKeywords) {
        if (afterUpper.includes(keyword)) {
          throw new Error('WHERE clause contains potential SQL injection');
        }
      }
    }
  }
  
  // Check for balanced parentheses
  let parenCount = 0;
  for (const char of trimmed) {
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (parenCount < 0) {
      throw new Error('WHERE clause has unbalanced parentheses');
    }
  }
  if (parenCount !== 0) {
    throw new Error('WHERE clause has unbalanced parentheses');
  }
  
  // Check for balanced quotes (single quotes only, as they're SQL standard)
  // Single quotes should be even (they come in pairs, or are escaped as '')
  const unescapedSingles = trimmed.replace(/''/g, '').match(/'/g) || [];
  if (unescapedSingles.length % 2 !== 0) {
    throw new Error('WHERE clause has unbalanced quotes');
  }
  
  return trimmed;
}

/**
 * Convert BigInt values to regular numbers for JSON serialization
 * @param {any} obj - Object to convert
 * @returns {any} - Object with BigInt values converted to numbers
 */
export function convertBigIntToNumber(obj) {
  if (typeof obj === 'bigint') {
    // Convert BigInt to number, but check for safe integer range
    if (obj <= Number.MAX_SAFE_INTEGER && obj >= Number.MIN_SAFE_INTEGER) {
      return Number(obj);
    } else {
      // For very large numbers, convert to string to avoid precision loss
      return obj.toString();
    }
  }
  
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToNumber);
  }
  
  if (obj !== null && typeof obj === 'object') {
    const converted = {};
    for (const [key, value] of Object.entries(obj)) {
      converted[key] = convertBigIntToNumber(value);
    }
    return converted;
  }
  
  return obj;
}
