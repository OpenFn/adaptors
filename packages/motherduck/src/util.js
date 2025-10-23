/**
 * Validate SQL identifier (table names, column names, etc.)
 * @public
 * @function
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
 * @public
 * @function
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
 * @public
 * @function
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
 * Convert BigInt and DECIMAL values to regular numbers for JSON serialization
 * @private
 * @function
 * @param {any} obj - Object to convert
 * @returns {any} - Object with BigInt and DECIMAL values converted to numbers
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
    // Check if this is a DuckDB DECIMAL object
    if (obj.width !== undefined && obj.scale !== undefined && obj.value !== undefined) {
      // Convert DECIMAL to number: value / 10^scale
      const scale = Number(obj.scale);
      const value = typeof obj.value === 'bigint' ? Number(obj.value) : obj.value;
      return value / Math.pow(10, scale);
    }

    const converted = {};
    for (const [key, value] of Object.entries(obj)) {
      converted[key] = convertBigIntToNumber(value);
    }
    return converted;
  }

  return obj;
}

/**
 * Helper function to handle query execution
 * @private
 * @function
 * @param {object} connection - Active database connection
 * @param {object} state - Runtime state
 * @param {string} sqlQuery - SQL query to execute
 * @param {object} options - Query options
 * @param {Function} composeNextState - State composition function
 * @returns {Promise}
 */
export async function queryHandler(connection, state, sqlQuery, options, composeNextState) {
  if (!connection) {
    throw new Error('No active MotherDuck connection found. Ensure you are running within an execute() block.');
  }

  try {
    const result = await connection.runAndReadAll(sqlQuery);
    const rawRows = result.getRowObjects();

    // Convert BigInt values to regular numbers for JSON serialization
    const rows = convertBigIntToNumber(rawRows);

    const nextState = {
      ...composeNextState(state, rows),
      response: {
        rows,
        rowCount: rows.length,
        command: sqlQuery.trim().split(' ')[0].toUpperCase(),
        query: options.writeSql ? sqlQuery : '[query hidden]'
      },
    };

    return nextState;
  } catch (error) {
    const errorMessage = `MotherDuck query failed: ${error.message}`;
    console.error(errorMessage);
    console.error('Failed query:', sqlQuery.substring(0, 200) + (sqlQuery.length > 200 ? '...' : ''));

    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    enhancedError.query = sqlQuery;

    throw enhancedError;
  }
}
