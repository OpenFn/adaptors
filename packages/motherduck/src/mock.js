/**
 * Mock MotherDuck connection for testing purposes
 * @returns {object} Mock instance and connection
 */
/**
 * Simple in-memory table storage for mock
 */
const mockTables = {};

/**
 * Parse SELECT query to extract column values and aliases
 */
function parseSelectLiterals(sql) {
  const result = {};

  // Match SELECT ... patterns like: SELECT 'value' as alias, number as alias2
  // Need to handle cases with or without FROM
  const selectMatch = sql.match(/SELECT\s+(.+?)(?:\s+FROM|\s*$)/is);
  if (!selectMatch) return result;

  const selectClause = selectMatch[1].trim();

  // Split by commas (but not commas inside quotes or parentheses)
  const columns = [];
  let current = '';
  let inQuotes = false;
  let parenDepth = 0;

  for (let i = 0; i < selectClause.length; i++) {
    const char = selectClause[i];
    if (char === "'" && (i === 0 || selectClause[i-1] !== '\\')) {
      inQuotes = !inQuotes;
    }
    if (!inQuotes) {
      if (char === '(') parenDepth++;
      if (char === ')') parenDepth--;
      if (char === ',' && parenDepth === 0) {
        columns.push(current.trim());
        current = '';
        continue;
      }
    }
    current += char;
  }
  if (current.trim()) columns.push(current.trim());

  // Parse each column
  columns.forEach(col => {
    // Match: 'literal' AS alias (case insensitive, handle various whitespace)
    const stringMatch = col.match(/'([^']*)'\s+(?:as\s+)?(\w+)/i);
    // Match: number AS alias
    const numberMatch = col.match(/^(\d+)\s+(?:as\s+)?(\w+)/i);
    // Match: function() AS alias
    const funcMatch = col.match(/^(\w+)\s*\([^)]*\)\s+(?:as\s+)?(\w+)/i);

    if (stringMatch) {
      result[stringMatch[2]] = stringMatch[1];
    } else if (numberMatch) {
      result[numberMatch[2]] = parseInt(numberMatch[1]);
    } else if (funcMatch) {
      // Handle functions like COUNT(*), current_database()
      const funcName = funcMatch[1].toLowerCase();
      const alias = funcMatch[2];

      if (funcName === 'count') {
        result[alias] = mockTables[Object.keys(mockTables)[0]]?.length || 0;
      } else if (funcName === 'current_database') {
        result[alias] = 'my_db';
      }
    }
  });

  return result;
}

export function createMockConnection() {
  const mockConnection = {
    runAndReadAll: async (sql) => {
      // Check for obvious SQL syntax errors
      if (/SELECT\s+FROM/i.test(sql) || /WHERE\s+INVALID/i.test(sql)) {
        throw new Error('Parser Error: syntax error at or near "FROM"');
      }

      // Parse SQL to return appropriate mock data
      let mockData = [];

      // Handle CREATE TABLE
      if (/CREATE TABLE/i.test(sql)) {
        const tableMatch = sql.match(/CREATE TABLE\s+(\w+)/i);
        if (tableMatch) {
          const tableName = tableMatch[1];
          mockTables[tableName] = [];
        }
        mockData = [{ success: true }];
      }

      // Handle INSERT
      else if (/INSERT INTO/i.test(sql)) {
        const tableMatch = sql.match(/INSERT INTO\s+(\w+)/i);
        const valuesMatch = sql.match(/VALUES\s+(.+)/is);

        if (tableMatch && valuesMatch) {
          const tableName = tableMatch[1];
          if (!mockTables[tableName]) mockTables[tableName] = [];

          // Parse column names
          const columnsMatch = sql.match(/\(([^)]+)\)\s+VALUES/i);
          const columns = columnsMatch ? columnsMatch[1].split(',').map(c => c.trim()) : [];

          // Parse values - handle multiple value sets
          const valuesSets = valuesMatch[1].match(/\([^)]+\)/g) || [];

          valuesSets.forEach(valueSet => {
            const values = valueSet.slice(1, -1).split(',').map(v => {
              // eslint-disable-next-line no-param-reassign
              v = v.trim();
              // Remove quotes from strings
              if (v.startsWith("'") && v.endsWith("'")) {
                return v.slice(1, -1).replace(/''/g, "'");
              }
              // Handle NULL
              if (v === 'NULL') return null;
              // Handle booleans
              if (v === 'TRUE') return true;
              if (v === 'FALSE') return false;
              // Handle numbers
              if (/^\d+$/.test(v)) return parseInt(v);
              return v;
            });

            const row = {};
            columns.forEach((col, idx) => {
              row[col] = values[idx];
            });
            mockTables[tableName].push(row);
          });
        }
        mockData = [{ success: true }];
      }

      // Handle SELECT
      else if (/SELECT/i.test(sql)) {
        // Check if it's a SELECT from a table
        const fromMatch = sql.match(/FROM\s+(\w+)/i);

        if (fromMatch) {
          const tableName = fromMatch[1];
          const tableData = mockTables[tableName] || [];

          // Handle COUNT(*)
          if (/COUNT\s*\(\s*\*\s*\)/i.test(sql)) {
            // Try to extract alias: COUNT(*) as alias
            const aliasMatch = sql.match(/COUNT\s*\(\s*\*\s*\)\s+(?:as\s+)?(\w+)/i);
            const alias = aliasMatch ? aliasMatch[1] : 'count';
            mockData = [{ [alias]: tableData.length }];
          }
          // Handle SELECT *
          else if (/SELECT\s+\*/i.test(sql)) {
            mockData = [...tableData];
          }
          // Handle specific columns
          else {
            const selectMatch = sql.match(/SELECT\s+(.+?)\s+FROM/is);
            if (selectMatch) {
              const columns = selectMatch[1].split(',').map(c => c.trim());
              mockData = tableData.map(row => {
                const newRow = {};
                columns.forEach(col => {
                  if (row[col] !== undefined) {
                    newRow[col] = row[col];
                  }
                });
                return newRow;
              });
            }
          }
        }
        // Handle SELECT with literals (no FROM clause)
        else {
          const literals = parseSelectLiterals(sql);
          // If parsing returned empty object, try to extract any result
          if (Object.keys(literals).length === 0) {
            // Fallback: just return empty data
            mockData = [];
          } else {
            mockData = [literals];
          }
        }
      }

      // Handle UPDATE
      else if (/UPDATE/i.test(sql)) {
        mockData = [{ success: true }];
      }

      // Handle DELETE
      else if (/DELETE/i.test(sql)) {
        mockData = [{ success: true }];
      }

      // Handle DROP TABLE
      else if (/DROP TABLE/i.test(sql)) {
        const tableMatch = sql.match(/DROP TABLE\s+(?:IF EXISTS\s+)?(\w+)/i);
        if (tableMatch) {
          delete mockTables[tableMatch[1]];
        }
        mockData = [{ success: true }];
      }

      // Default fallback
      else {
        mockData = [{ result: 'mock_data' }];
      }

      return {
        getRowObjects: () => mockData
      };
    },
    close: () => {
      // Clear tables on close
      Object.keys(mockTables).forEach(key => delete mockTables[key]);
    }
  };

  const mockInstance = {
    connect: async () => mockConnection,
    close: () => {
      // Clear tables on instance close
      Object.keys(mockTables).forEach(key => delete mockTables[key]);
    }
  };

  return { mockInstance, mockConnection };
}
