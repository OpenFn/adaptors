/**
 * @file DuckDB Adaptor for OpenFN
 * @description OpenFN adaptor for DuckDB in-memory and cloud database operations
 * @author Aseidas Blauvelt <ablauvelt@verasolutions.org>
 * @organization Vera Solutions
 * @license LGPLv3
 */

import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { DuckDBInstance } from '@duckdb/node-api';
import { formatSqlValue, validateSqlIdentifier, validateWhereClause } from './Utils.js';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for DuckDB.
 * @example
 * execute(
 *   query('SELECT * FROM my_table'),
 *   insert('users', { name: 'John', age: 30 })
 * )(state)
 * @public
 * @function
 * @param {...Operation} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
    queries: [],
  };

  return state => {
    return commonExecute(
      createInstance,
      connect,
      ...operations,
      disconnect,
      cleanupState
    )({ ...initialState, ...state }).catch(e => {
      console.error('Error in DuckDB operations:', e);
      // Clean up any open connections on error
      const currentState = { ...initialState, ...state };
      if (currentState?.connection) {
        try {
          if (typeof currentState.connection.close === 'function') {
            currentState.connection.close();
          }
        } catch (cleanupError) {
          console.error('Error during connection cleanup:', cleanupError);
        }
      }
      // Re-throw the error to be handled by the calling code
      throw e;
    });
  };
}

/**
 * Creates a DuckDB instance
 * @example
 * createInstance(state)
 * @function
 * @param {State} state - Runtime state.
 * @returns {State}
 */
async function createInstance(state) {
  const { 
    database = ':memory:', 
    connectionString, 
    motherDuckToken,
    motherDuckDatabase,
    sessionHint 
  } = state.configuration;
  
  let databasePath = database;
  let config = {};
  
  // Handle MotherDuck connection strings
  if (connectionString) {
    databasePath = connectionString;
  } else if (motherDuckDatabase) {
    // Build MotherDuck connection string
    databasePath = `md:${motherDuckDatabase}`;
    
    // Add session hint for read scaling if provided
    if (sessionHint) {
      databasePath += `?session_hint=${sessionHint}`;
    }
  }
  
  // Configure MotherDuck token if provided
  if (motherDuckToken) {
    config.motherduck_token = motherDuckToken;
  }
  
  console.log(`Creating DuckDB instance: ${databasePath.includes('md:') ? 'MotherDuck database' : 'local database'}`);
  const instance = await DuckDBInstance.create(databasePath, config);
  
  return { ...state, instance };
}

/**
 * Connects to a DuckDB instance
 * @example
 * connect(state)
 * @function
 * @param {State} state - Runtime state.
 * @returns {State}
 */
async function connect(state) {
  const { instance } = state;
  console.log('Connecting to DuckDB instance...');
  const connection = await instance.connect();
  console.log('Connected successfully to DuckDB');
  
  return { ...state, connection };
}

/**
 * Disconnects from DuckDB
 * @example
 * disconnect(state)
 * @function
 * @param {State} state
 * @returns {State}
 */
function disconnect(state) {
  // DuckDB Neo client connections close automatically when they go out of scope
  // but we can explicitly close them if the methods exist
  try {
    if (state.connection && typeof state.connection.close === 'function') {
      state.connection.close();
    }
    if (state.instance && typeof state.instance.close === 'function') {
      state.instance.close();
    }
  } catch (error) {
    console.log('Note: Connection cleanup completed (connections auto-close)');
  }
  return state;
}

/**
 * Removes connection properties from state
 * @example
 * cleanupState(state)
 * @function
 * @param {State} state
 * @returns {State}
 */
function cleanupState(state) {
  delete state.connection;
  delete state.instance;
  return state;
}

/**
 * Helper function to handle query execution
 * @param {State} state - Runtime state
 * @param {string} sqlQuery - SQL query to execute
 * @param {object} options - Query options
 * @param {function} callback - Optional callback function
 * @returns {Promise}
 */
async function queryHandler(state, sqlQuery, options = {}, callback) {
  const { connection } = state;
  
  if (!connection) {
    throw new Error('No active DuckDB connection found. Ensure you are running within an execute() block.');
  }
  
  try {
    if (options.writeSql) {
      console.log('Adding prepared SQL to state.queries array.');
      state.queries.push(sqlQuery);
    }

    if (options.execute === false) {
      console.log('Not executing query; options.execute === false');
      return composeNextState(state, 'Query not executed.');
    }

    console.log('Executing DuckDB query:', sqlQuery.substring(0, 100) + (sqlQuery.length > 100 ? '...' : ''));
    const result = await connection.runAndReadAll(sqlQuery);
    const rows = result.getRowObjects();
    
    console.log(`Query succeeded, returned ${rows.length} rows`);
    
    const nextState = {
      ...composeNextState(state, rows),
      response: {
        rows,
        rowCount: rows.length,
        command: sqlQuery.trim().split(' ')[0].toUpperCase(),
        query: options.writeSql ? sqlQuery : '[query hidden]'
      },
    };
    
    if (callback) return callback(nextState);
    return nextState;
  } catch (error) {
    const errorMessage = `DuckDB query failed: ${error.message}`;
    console.error(errorMessage);
    console.error('Failed query:', sqlQuery.substring(0, 200) + (sqlQuery.length > 200 ? '...' : ''));
    
    // Create a more informative error
    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    enhancedError.query = sqlQuery;
    
    throw enhancedError;
  }
}

/**
 * Execute a SQL statement
 * @public
 * @example
 * query('SELECT * FROM users WHERE age > 18')
 * @function
 * @param {string} sqlQuery - The SQL query as a string or function
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 * @state {object} - Returns query results in state.data and response metadata in state.response
 */
export function query(sqlQuery, options, callback) {
  return state => {
    const [resolvedSqlQuery, resolvedOptions] = expandReferences(
      state,
      sqlQuery,
      options
    );
    
    console.log('Preparing to execute SQL statement');
    return queryHandler(state, resolvedSqlQuery, resolvedOptions, callback);
  };
}

/**
 * Insert a record into a table
 * @public
 * @example
 * insert('users', { name: 'John', age: 30, email: 'john@example.com' })
 * @function
 * @param {string} table - The target table name
 * @param {object} record - Data object to insert
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 * @state {object} - Returns insert result in state.data and response metadata in state.response
 */
export function insert(table, record, options, callback) {
  return state => {
    const [resolvedTable, resolvedRecord, resolvedOptions] = expandReferences(
      state,
      table,
      record,
      options
    );
    
    try {
      // Validate table name for security
      validateSqlIdentifier(resolvedTable);
      
      const columns = Object.keys(resolvedRecord);
      columns.forEach(col => validateSqlIdentifier(col));
      const columnsList = columns.join(', ');
      
      const values = columns.map(key => formatSqlValue(resolvedRecord[key]));
      
      const sqlQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES (${values.join(', ')})`;
      
      console.log('Preparing to insert into:', resolvedTable);
      return queryHandler(state, sqlQuery, resolvedOptions, callback);
    } catch (error) {
      console.error('Insert operation failed:', error);
      throw error;
    }
  };
}

/**
 * Insert multiple records into a table
 * @public
 * @example
 * insertMany('users', [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 25 }
 * ])
 * @function
 * @param {string} table - The target table name
 * @param {array} records - Array of data objects to insert
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function insertMany(table, records, options, callback) {
  // Maximum records per batch to prevent memory issues
  const MAX_BATCH_SIZE = 1000;
  
  return async state => {
    const [resolvedTable, resolvedRecords, resolvedOptions] = expandReferences(
      state,
      table,
      records,
      options
    );
    
    try {
      if (!resolvedRecords || resolvedRecords.length === 0) {
        console.log('No records provided; skipping insert.');
        const nextState = { ...state, data: 'No records to insert' };
        if (callback) return callback(nextState);
        return nextState;
      }
      
      // Validate table name for security
      validateSqlIdentifier(resolvedTable);
      
      const totalRecords = resolvedRecords.length;
      console.log(`Preparing to insert ${totalRecords} records into:`, resolvedTable);
      
      // If records exceed max batch size, split into chunks
      if (totalRecords > MAX_BATCH_SIZE) {
        console.log(`Large dataset detected. Splitting into batches of ${MAX_BATCH_SIZE} records.`);
        
        let currentState = state;
        let totalInserted = 0;
        
        // Process in chunks
        for (let i = 0; i < totalRecords; i += MAX_BATCH_SIZE) {
          const batchNumber = Math.floor(i / MAX_BATCH_SIZE) + 1;
          const chunk = resolvedRecords.slice(i, i + MAX_BATCH_SIZE);
          const batchSize = chunk.length;
          
          console.log(`Processing batch ${batchNumber}: records ${i + 1} to ${i + batchSize}`);
          
          const columns = Object.keys(chunk[0]);
          const columnsList = columns.join(', ');
          
          // Validate column names for security
          columns.forEach(col => validateSqlIdentifier(col));
          
          const valuesStrings = chunk.map(record => {
            const values = columns.map(key => formatSqlValue(record[key]));
            return `(${values.join(', ')})`;
          });
          
          const sqlQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES ${valuesStrings.join(', ')}`;
          
          // Execute batch query
          currentState = await queryHandler(currentState, sqlQuery, resolvedOptions);
          totalInserted += batchSize;
        }
        
        console.log(`Successfully inserted ${totalInserted} records in ${Math.ceil(totalRecords / MAX_BATCH_SIZE)} batches.`);
        const finalState = { ...currentState, data: { recordsInserted: totalInserted, batches: Math.ceil(totalRecords / MAX_BATCH_SIZE) } };
        
        if (callback) return callback(finalState);
        return finalState;
        
      } else {
        // Process as single batch if under limit
        const columns = Object.keys(resolvedRecords[0]);
        const columnsList = columns.join(', ');
        
        // Validate column names for security
        columns.forEach(col => validateSqlIdentifier(col));
        
        const valuesStrings = resolvedRecords.map(record => {
          const values = columns.map(key => formatSqlValue(record[key]));
          return `(${values.join(', ')})`;
        });
        
        const sqlQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES ${valuesStrings.join(', ')}`;
        
        return queryHandler(state, sqlQuery, resolvedOptions, callback);
      }
    } catch (error) {
      console.error('Insert many operation failed:', error);
      throw error;
    }
  };
}

/**
 * Update records in a table
 * @public
 * @example
 * update('users', { age: 31 }, 'WHERE name = "John"')
 * @function
 * @param {string} table - The target table name
 * @param {object} changes - Object with fields to update
 * @param {string} whereClause - WHERE clause for the update
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function update(table, changes, whereClause, options, callback) {
  return state => {
    const [resolvedTable, resolvedChanges, resolvedWhere, resolvedOptions] = expandReferences(
      state,
      table,
      changes,
      whereClause,
      options
    );
    
    try {
      // Validate table name for security
      validateSqlIdentifier(resolvedTable);
      
      // Validate WHERE clause for security
      const validatedWhere = validateWhereClause(resolvedWhere);
      
      const setPairs = Object.keys(resolvedChanges).map(key => {
        validateSqlIdentifier(key);
        const value = resolvedChanges[key];
        return `${key} = ${formatSqlValue(value)}`;
      });
      
      const setClause = setPairs.join(', ');
      const sqlQuery = `UPDATE ${resolvedTable} SET ${setClause} ${validatedWhere}`;
      
      console.log('Preparing to update table:', resolvedTable);
      return queryHandler(state, sqlQuery, resolvedOptions, callback);
    } catch (error) {
      console.error('Update operation failed:', error);
      throw error;
    }
  };
}

/**
 * Delete records from a table
 * @public
 * @example
 * remove('users', 'WHERE age < 18')
 * @function
 * @param {string} table - The target table name
 * @param {string} whereClause - WHERE clause for the deletion
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function remove(table, whereClause, options, callback) {
  return state => {
    const [resolvedTable, resolvedWhere, resolvedOptions] = expandReferences(
      state,
      table,
      whereClause,
      options
    );
    
    try {
      // Validate table name for security
      validateSqlIdentifier(resolvedTable);
      
      // Validate WHERE clause for security
      const validatedWhere = validateWhereClause(resolvedWhere);
      
      const sqlQuery = `DELETE FROM ${resolvedTable} ${validatedWhere}`;
      
      console.log('Preparing to delete from table:', resolvedTable);
      return queryHandler(state, sqlQuery, resolvedOptions, callback);
    } catch (error) {
      console.error('Delete operation failed:', error);
      throw error;
    }
  };
}

/**
 * Create a table in the database
 * @public
 * @example
 * createTable('users', [
 *   { name: 'id', type: 'INTEGER PRIMARY KEY' },
 *   { name: 'name', type: 'VARCHAR(100)', required: true },
 *   { name: 'age', type: 'INTEGER' }
 * ])
 * @function
 * @param {string} tableName - The name of the table to create
 * @param {array} columns - Array of column definitions
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function createTable(tableName, columns, options, callback) {
  return state => {
    const [resolvedTableName, resolvedColumns, resolvedOptions] = expandReferences(
      state,
      tableName,
      columns,
      options
    );
    
    try {
      if (!resolvedColumns || resolvedColumns.length === 0) {
        console.log('No columns provided; skipping table creation.');
        const nextState = { ...state, data: 'No columns provided for table creation' };
        if (callback) return callback(nextState);
        return nextState;
      }
      
      const columnDefinitions = resolvedColumns.map(col => {
        let definition = `${col.name} ${col.type}`;
        if (col.required) definition += ' NOT NULL';
        if (col.unique) definition += ' UNIQUE';
        if (col.default !== undefined) {
          if (typeof col.default === 'string') {
            definition += ` DEFAULT '${col.default}'`;
          } else {
            definition += ` DEFAULT ${col.default}`;
          }
        }
        return definition;
      }).join(', ');
      
      const sqlQuery = `CREATE TABLE ${resolvedTableName} (${columnDefinitions})`;
      
      console.log('Preparing to create table:', resolvedTableName);
      return queryHandler(state, sqlQuery, resolvedOptions, callback);
    } catch (error) {
      console.error('Create table operation failed:', error);
      throw error;
    }
  };
}

/**
 * Drop a table from the database
 * @public
 * @example
 * dropTable('old_users')
 * @function
 * @param {string} tableName - The name of the table to drop
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function dropTable(tableName, options, callback) {
  return state => {
    const [resolvedTableName, resolvedOptions] = expandReferences(
      state,
      tableName,
      options
    );
    
    try {
      const ifExists = resolvedOptions?.ifExists ? 'IF EXISTS ' : '';
      const sqlQuery = `DROP TABLE ${ifExists}${resolvedTableName}`;
      
      console.log('Preparing to drop table:', resolvedTableName);
      return queryHandler(state, sqlQuery, resolvedOptions, callback);
    } catch (error) {
      console.error('Drop table operation failed:', error);
      throw error;
    }
  };
}

/**
 * Describe a table structure
 * @public
 * @example
 * describeTable('users')
 * @function
 * @param {string} tableName - The name of the table to describe
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function describeTable(tableName, options, callback) {
  return state => {
    const [resolvedTableName, resolvedOptions] = expandReferences(
      state,
      tableName,
      options
    );
    
    try {
      const sqlQuery = `DESCRIBE ${resolvedTableName}`;
      
      console.log('Preparing to describe table:', resolvedTableName);
      return queryHandler(state, sqlQuery, resolvedOptions, callback);
    } catch (error) {
      console.error('Describe table operation failed:', error);
      throw error;
    }
  };
}

/**
 * Connect to a shared MotherDuck database
 * @public
 * @example
 * connectToMotherDuck('my_database', 'your_token', { sessionHint: 'readonly' })
 * @function
 * @param {string} database - MotherDuck database name
 * @param {string} token - MotherDuck authentication token
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function connectToMotherDuck(database, token, options = {}, callback) {
  return state => {
    const [resolvedDatabase, resolvedToken, resolvedOptions] = expandReferences(
      state,
      database,
      token,
      options
    );
    
    try {
      // Update configuration with MotherDuck settings
      const updatedConfiguration = {
        ...state.configuration,
        motherDuckDatabase: resolvedDatabase,
        motherDuckToken: resolvedToken,
        sessionHint: resolvedOptions.sessionHint
      };
      
      const nextState = {
        ...state,
        configuration: updatedConfiguration
      };
      
      console.log('Configured MotherDuck connection successfully');
      
      if (callback) return callback(nextState);
      return nextState;
    } catch (error) {
      console.error('MotherDuck connection configuration failed:', error);
      throw error;
    }
  };
}

/**
 * List all databases available in MotherDuck
 * @public
 * @example
 * listDatabases()
 * @function
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function listDatabases(options, callback) {
  return state => {
    const [resolvedOptions] = expandReferences(state, options);
    
    try {
      const sqlQuery = "SHOW DATABASES";
      
      console.log('Preparing to list databases');
      return queryHandler(state, sqlQuery, resolvedOptions, callback);
    } catch (error) {
      console.error('List databases operation failed:', error);
      throw error;
    }
  };
}

/**
 * List all tables in the current database
 * @public
 * @example
 * listTables()
 * @function
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function listTables(options, callback) {
  return state => {
    const [resolvedOptions] = expandReferences(state, options);
    
    try {
      const sqlQuery = "SHOW TABLES";
      
      console.log('Preparing to list tables');
      return queryHandler(state, sqlQuery, resolvedOptions, callback);
    } catch (error) {
      console.error('List tables operation failed:', error);
      throw error;
    }
  };
}

/**
 * Attach a database (useful for MotherDuck to local file operations)
 * @public
 * @example
 * attachDatabase('local_file.db', 'local_db')
 * @function
 * @param {string} database - Database path or connection string
 * @param {string} alias - Alias for the attached database
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function attachDatabase(database, alias, options, callback) {
  return state => {
    const [resolvedDatabase, resolvedAlias, resolvedOptions] = expandReferences(
      state,
      database,
      alias,
      options
    );
    
    try {
      const sqlQuery = `ATTACH '${resolvedDatabase}' AS ${resolvedAlias}`;
      
      console.log('Preparing to attach database:', resolvedDatabase, 'as', resolvedAlias);
      return queryHandler(state, sqlQuery, resolvedOptions, callback);
    } catch (error) {
      console.error('Attach database operation failed:', error);
      throw error;
    }
  };
}

/**
 * Detach a database
 * @public
 * @example
 * detachDatabase('local_db')
 * @function
 * @param {string} alias - Alias of the database to detach
 * @param {object} [options] - Optional options argument
 * @param {function} [callback] - Optional callback function
 * @returns {Operation}
 */
export function detachDatabase(alias, options, callback) {
  return state => {
    const [resolvedAlias, resolvedOptions] = expandReferences(
      state,
      alias,
      options
    );
    
    try {
      const sqlQuery = `DETACH ${resolvedAlias}`;
      
      console.log('Preparing to detach database:', resolvedAlias);
      return queryHandler(state, sqlQuery, resolvedOptions, callback);
    } catch (error) {
      console.error('Detach database operation failed:', error);
      throw error;
    }
  };
}

export {
  alterState,
  arrayToString,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  sourceValue,
  as,
} from '@openfn/language-common';
