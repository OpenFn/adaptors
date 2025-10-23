import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { DuckDBInstance } from '@duckdb/node-api';
import _ from 'lodash';
import * as util from './Utils.js';
import { createMockConnection } from './mock.js';

let instance = null;
let connection = null;

/**
 * Execute a sequence of operations against MotherDuck cloud database.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for MotherDuck.
 * @example
 * execute(
 *   query('SELECT * FROM my_table'),
 *   insert('users', { name: 'John', age: 30 })
 * )(state)
 * @public
 * @function
 * @param {...Operation} operations - Operations to be performed.
 * @returns {Operation}
 * @state {Array} references - Array of previous operation results
 * @state {*} data - Data from the last operation
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return async state => {
    try {
      return await commonExecute(
        createConnection,
        ...operations,
        disconnect
      )({ ...initialState, ...state });
    } catch (error) {
      // Ensure we disconnect even if an operation fails
      disconnect(state);
      throw error;
    }
  };
}

/**
 * Creates and connects to a MotherDuck cloud database
 * @private
 * @function
 * @param {State} state - Runtime state.
 * @returns {State}
 */
async function createConnection(state) {
  const {
    token,
    database = 'my_db',
    sessionHint,
    testMode = false,
  } = state.configuration;

  // In test mode, create a mock connection
  if (testMode || process.env.NODE_ENV === 'test') {
    const { mockInstance, mockConnection } = createMockConnection();
    instance = mockInstance;
    connection = mockConnection;
    return state;
  }

  if (!token) {
    throw new Error(
      'MotherDuck token is required. Please provide a token in the configuration.'
    );
  }

  let databasePath = `md:${database}`;

  if (sessionHint) {
    databasePath += `?session_hint=${sessionHint}`;
  }

  const config = {
    motherduck_token: token,
  };

  console.log(`Connecting to MotherDuck cloud database: ${database}`);
  instance = await DuckDBInstance.create(databasePath, config);
  connection = await instance.connect();
  console.log('Connected successfully to MotherDuck');

  return state;
}

/**
 * Disconnects from MotherDuck
 * @private
 * @function
 * @param {State} state
 * @returns {State}
 */
function disconnect(state) {
  if (connection && typeof connection.close === 'function') {
    connection.close();
  }
  if (instance && typeof instance.close === 'function') {
    instance.close();
  }
  // Clear the connection references
  connection = null;
  instance = null;
  return state;
}

/**
 * Execute a SQL query against the MotherDuck database.
 * @public
 * @example <caption>Simple query</caption>
 * query('SELECT * FROM users WHERE age > 18')
 * @example <caption>Query with SQL logging</caption>
 * query('SELECT * FROM orders', { writeSql: true })
 * @function
 * @param {string} sqlQuery - SQL query string
 * @param {object} [options] - Query execution options
 * @param {boolean} [options.writeSql=false] - Include full SQL in response.query (default: false, hides query for security)
 * @returns {Operation}
 * @state {Array} data - Query results as array of row objects
 * @state {object} response - Metadata including rowCount, command, and query
 */
export function query(sqlQuery, options = {}) {
  return state => {
    // Expand function references to actual values
    const [resolvedQuery, resolvedOptions] = expandReferences(
      state,
      sqlQuery,
      options
    );

    return util.queryHandler(
      connection,
      state,
      resolvedQuery,
      resolvedOptions,
      composeNextState
    );
  };
}

/**
 * Insert one or more records into a MotherDuck table with automatic batching.
 * Large datasets are automatically split into batches for optimal performance.
 * @public
 * @example <caption>Insert a single record</caption>
 * insert('users', { name: 'John', age: 30, email: 'john@example.com' })
 * @example <caption>Insert multiple records</caption>
 * insert('users', [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 25 }
 * ])
 * @example <caption>Insert with custom batch size</caption>
 * insert('users', records, { batchSize: 500 })
 * @function
 * @param {string} table - Target table name
 * @param {object|Array} records - A single record object or array of records
 * @param {object} [options] - Insert options
 * @param {number} [options.batchSize=1000] - Number of records per batch
 * @returns {Operation}
 * @state {object} data - Metadata including recordsInserted and batches
 */
export function insert(table, records, options = {}) {
  return async state => {
    // Expand function references to actual values
    const [resolvedTable, resolvedRecords, resolvedOptions] = expandReferences(
      state,
      table,
      records,
      options
    );

    const batchSize = resolvedOptions.batchSize || 1000;

    // Normalize to array
    const recordsArray = Array.isArray(resolvedRecords)
      ? resolvedRecords
      : [resolvedRecords];

    if (!recordsArray || recordsArray.length === 0) {
      console.log('No records provided; skipping insert.');
      return {
        ...state,
        data: { recordsInserted: 0, batches: 0 },
      };
    }

    util.validateSqlIdentifier(resolvedTable);

    const totalRecords = recordsArray.length;
    console.log(
      `Preparing to insert ${totalRecords} record${
        totalRecords !== 1 ? 's' : ''
      } into:`,
      resolvedTable
    );

    // Split into chunks using lodash (even if just one chunk)
    const chunks = _.chunk(recordsArray, batchSize);

    if (chunks.length > 1) {
      console.log(
        `Large dataset detected. Splitting into ${chunks.length} batches of up to ${batchSize} records.`
      );
    }

    let currentState = state;
    let totalInserted = 0;

    // Process all chunks
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const batchNumber = i + 1;

      if (chunks.length > 1) {
        console.log(
          `Processing batch ${batchNumber}/${chunks.length}: ${chunk.length} records`
        );
      }

      const columns = Object.keys(chunk[0]);
      const columnsList = columns.join(', ');

      // Validate column names for security
      columns.forEach(col => util.validateSqlIdentifier(col));

      const valuesStrings = chunk.map(record => {
        const values = columns.map(key => util.formatSqlValue(record[key]));
        return `(${values.join(', ')})`;
      });

      const sqlQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES ${valuesStrings.join(
        ', '
      )}`;

      // Execute batch query
      currentState = await util.queryHandler(
        connection,
        currentState,
        sqlQuery,
        resolvedOptions,
        composeNextState
      );
      totalInserted += chunk.length;
    }

    if (chunks.length > 1) {
      console.log(
        `Successfully inserted ${totalInserted} records in ${chunks.length} batches.`
      );
    }

    return {
      ...currentState,
      data: { recordsInserted: totalInserted, batches: chunks.length },
    };
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

export { util };
