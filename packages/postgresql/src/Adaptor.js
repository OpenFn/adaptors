import pg from 'pg';
import { format } from './util.js';
import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import {
  handleSetNull,
  handleValues,
  handleQueryOptions,
  findValueQuery,
} from './builders.js';

let client = null;

/**
 * State object
 * @typedef {Object} PostgresState
 * @property data - the parsed result rows
 * @property result - the result from a successful query
 * @property references - an array of all previous data objects used in the job
 * @private
 **/

/**
 * Execution options
 * @typedef {Object} ExecutionOptions
 * @property {boolean} [writeSql=false] - Specifies whether to log the generated SQL statement. Defaults to false.
 * @property {boolean} [execute=true] - Specifies whether to execute the SQL statement. Defaults to true.
 * @private
 */

/**
 * Shared options
 * @typedef {Object} GeneralOptions
 * @property {boolean} [execute=true] - Specifies whether to execute the SQL statement. Defaults to true.
 * @property {boolean} [writeSql=false] - Specifies whether to log the generated SQL statement. Defaults to false.
 * @property {boolean} [logValues=false] - Specifies whether to log the query values to the console. Defaults to false.
 * @property {string} [setNull] - A string value that specifies the behavior for inserting null values.
 * @private
 * */

/**
 * SQL Query Configuration
 * @typedef {Object} SqlQueryConfig
 * @property {string} name - Prepared statement name for repeated queries.
 * @property {string} text - SQL query text with optional placeholders for parameterized queries.
 * @property {Array} [values] - An array of values to be used with parameterized queries.
 * @property {string} [rowMode='array'] - Format of result rows ('array' or 'object').
 * @private
 */

/**
 * findValue filter object
 * @typedef {Object} FindValueFilter
 * @property {string} uuid - The uuid value to search for in the specified relation.
 * @property {string} relation - The name of the relation to search for the uuid value.
 * @property {object} where - An object that contains key-value pairs to filter the search results.
 * @property {object} operator - An object that contains key-value pairs to specify the type of comparison to perform on the where clause.
 * @private
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for postgresql.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
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
      newClient,
      ...operations,
      endClient
    )({ ...initialState, ...state }).catch(e => {
      endClient(state);
      console.error(e);
      throw e;
    });
  };
}

function newClient(state) {
  const {
    ca,
    ssl,
    key,
    host,
    port,
    user,
    cert,
    database,
    password,
    allowSelfSignedCert,
  } = state.configuration || {};

  // Allowing or blocking self signed certificate
  // https://node-postgres.com/features/ssl
  const sslOptions = ssl
    ? { rejectUnauthorized: !allowSelfSignedCert, cert, ca, key }
    : false;

  // setup client config
  const config = { host, port, database, user, password, ssl: sslOptions };

  // instantiate a new client
  client = new pg.Client(config);
  client.connect();
  return state;
}

function endClient(state) {
  client.end();
  return state;
}
async function queryHandler(query, values) {
  let result;
  if (values) {
    result = await client.query(query, values);
  } else {
    result = await client.query(query);
  }
  console.log(`${result.command} succeeded, rowCount: ${result.rowCount}`);
  return result;
}
export function setMockClient(mockClient) {
  client = mockClient;
}

/**
 * Execute an SQL statement
 * @public
 * @example <caption>Text-only Query</caption>
 * sql('SELECT * FROM users;');
 * @example <caption>Text-only Query with writeSql option</caption>
 * sql("select id from users where first_name = 'Mamadou'", { writeSql: true });
 * @example <caption>Parameterized Query</caption>
 * sql("INSERT INTO users(name, age) VALUES ($1, $2);", { values: ["Alice", 25]});
 * @example <caption>Format query with util.format</caption>
 * sql(util.format('INSERT INTO users(name, age) VALUES (%L, %L);', 'Alice', 25));
 * @example <caption> Prepared Statements</caption>
 * sql({
 *   // give the query a unique name
 *   name: "fetch-user",
 *   text: "SELECT * FROM user WHERE id = $1",
 *   values: [1],
 * });
 * @function
 * @param {string|SqlQueryConfig} sqlQuery - SQL query string or a query config object.
 * @param {ExecutionOptions} [options] - Execution options. (OpenFn only)
 * @state {PostgresState}
 * @returns {Operation}
 */
export function sql(sqlQuery, options) {
  return async state => {
    const [resolvedSqlQuery, resolvedOptions] = expandReferences(
      state,
      sqlQuery,
      options
    );
    handleQueryOptions(state, resolvedSqlQuery, resolvedOptions);
    const result = await queryHandler(
      resolvedSqlQuery,
      resolvedOptions?.values
    );
    const nextState = {
      ...composeNextState(state, result.rows),
      result,
    };
    return nextState;
  };
}

/**
 * Fetch a uuid key given a condition
 * @public
 * @example <caption>Find a user by first name</caption>
 * findValue({
 *    uuid: 'id',
 *    relation: 'users',
 *    where: { first_name: 'Mamadou' },
 *    operator: { first_name: 'like' }
 *  })
 * @function
 * @param {FindValueFilter} filter - A filter object with the lookup table, a uuid and the condition
 * @state {PostgresState}
 * @state data - the value of the found uuid
 * @returns {Operation}
 */
export function findValue(filter) {
  return async state => {
    const [resolvedFilter] = expandReferences(state, filter);
    const {
      uuid,
      relation,
      where: whereData,
      operator: operatorData,
    } = resolvedFilter;

    const queryStr = findValueQuery(uuid, relation, whereData, operatorData);

    console.log('Preparing to execute sql statement');
    let returnValue = null;

    const result = await queryHandler(queryStr);
    if (result.rows.length > 0) {
      returnValue = result.rows[0][uuid];
    }
    const nextState = {
      ...composeNextState(state, returnValue),
      result: returnValue,
    };
    return nextState;
  };
}

/**
 * Insert a record
 * @public
 * @example <caption>Insert a record</caption>
 * insert('users', { name: 'Elodie', id: 7 }, { setNull: "'NaN'", logValues: true });
 * @function
 * @param {string} table - The target table
 * @param {object} record - Payload data for the record as a JS object or function
 * @param {GeneralOptions} [options] - Shared options. (OpenFn only)
 * @state {PostgresState}
 * @returns {Operation}
 */
export function insert(table, record, options) {
  return async state => {
    const [resolvedTable, resolvedRecord, resolvedOptions] = expandReferences(
      state,
      table,
      record,
      options
    );

    const columns = Object.keys(resolvedRecord).sort();
    const columnsList = columns.join(', ');
    const values = columns.map(key => resolvedRecord[key]);

    const query = handleValues(
      format(
        `INSERT INTO ${resolvedTable} (${columnsList}) VALUES (%L);`,
        values
      ),
      handleSetNull(resolvedOptions)
    );

    const safeQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES [--REDACTED--]];`;

    const queryToLog = resolvedOptions?.logValues ? query : safeQuery;
    console.log('Preparing to insert via:', queryToLog);
    handleQueryOptions(state, query, resolvedOptions);
    const result = await queryHandler(query);
    const nextState = {
      ...composeNextState(state, result.rows),
      result,
    };
    return nextState;
  };
}

/**
 * Insert many records, using the keys of the first as the column template
 * @public
 * @example <caption>Insert many records</caption>
 * insertMany('users', state => state.data.recordArray, { setNull: "'undefined'", logValues: true });
 * @function
 * @param {string} table - The target table
 * @param {array} records - An array or a function that takes state and returns an array
 * @param {GeneralOptions} [options] - Shared options. (OpenFn only)
 * @state {PostgresState}
 * @returns {Operation}
 */
export function insertMany(table, records, options) {
  return async state => {
    const [resolvedTable, resolvedRecords, resolvedOptions] = expandReferences(
      state,
      table,
      records,
      options
    );

    if (!resolvedRecords || resolvedRecords.length === 0) {
      console.log('No records provided; skipping insert.');
      return state;
    }
    // Note: we select the keys of the FIRST object as the canonical template.
    const columns = Object.keys(resolvedRecords[0]);
    const columnsList = columns.join(', ');
    const valueSets = resolvedRecords.map(x => Object.values(x));

    const query = handleValues(
      format(
        `INSERT INTO ${resolvedTable} (${columnsList}) VALUES %L;`,
        valueSets
      ),
      handleSetNull(resolvedOptions)
    );

    const safeQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES [--REDACTED--]];`;

    const queryToLog = resolvedOptions?.logValues ? query : safeQuery;
    console.log('Preparing to insertMany via:', queryToLog);
    handleQueryOptions(state, query, resolvedOptions);
    const result = await queryHandler(query);
    const nextState = {
      ...composeNextState(state, result.rows),
      result,
    };
    return nextState;
  };
}

/**
 * Insert or update a record using ON CONFLICT UPDATE
 * @public
 * @example <caption>Insert or update a record</caption>
 * upsert(
 *   "users", // the DB table
 *   "ON CONSTRAINT users_pkey", // a DB column with a unique constraint OR a CONSTRAINT NAME
 *   { name: "Elodie", id: 7 },
 *   {
 *     setNull: ["''", "'undefined'"],
 *     writeSql: true,
 *     logValues: true,
 *   }
 * );
 * @function
 * @param {string} table - The target table
 * @param {string} uuid - The uuid column to determine a matching/existing record
 * @param {object} record - Payload data for the record as a JS object or function
 * @param {GeneralOptions} [options] - Shared options. (OpenFn only)
 * @state {PostgresState}
 * @returns {Operation}
 */
export function upsert(table, uuid, record, options) {
  return async state => {
    const [resolvedTable, resolvedUuid, resolvedRecord, resolvedOptions] =
      expandReferences(state, table, uuid, record, options);

    const columns = Object.keys(resolvedRecord).sort();
    const columnsList = columns.join(', ');
    const values = columns.map(key => resolvedRecord[key]);
    const conflict =
      resolvedUuid.split(' ').length > 1 ? resolvedUuid : `(${resolvedUuid})`;

    const updateValues = columns
      .map(key => {
        return `${key}=excluded.${key}`;
      })
      .join(', ');

    const insertValues = format(
      `INSERT INTO ${resolvedTable} (${columnsList}) VALUES (%L)`,
      values
    );

    const query = handleValues(
      `${insertValues}
        ON CONFLICT ${conflict}
        DO UPDATE SET ${updateValues};`,
      handleSetNull(resolvedOptions)
    );

    const safeQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES [--REDACTED--]
        ON CONFLICT ${conflict}
        DO UPDATE SET ${updateValues};`;

    const queryToLog = resolvedOptions?.logValues ? query : safeQuery;
    console.log('Preparing to upsert via:', queryToLog);
    handleQueryOptions(state, query, resolvedOptions);
    const result = await queryHandler(query);
    const nextState = {
      ...composeNextState(state, result.rows),
      result,
    };
    return nextState;
  };
}

/**
 * Insert or update a record based on a logical condition using ON CONFLICT UPDATE
 * @public
 * @example <caption>Insert or update a record conditionally</caption>
 * upsertIf(
 *   $.data.name,
 *   "users", // the DB table
 *   "ON CONSTRAINT users_pkey", // a DB column with a unique constraint OR a CONSTRAINT NAME
 *   { name: "Elodie", id: 7 },
 *   { writeSql: true }
 * );
 * @function
 * @param {string} logical - a data to check existing value for.
 * @param {string} table - The target table
 * @param {string} uuid - The uuid column to determine a matching/existing record
 * @param {object} record - Payload data for the record as a JS object or function
 * @param {GeneralOptions} [options] - Shared options. (OpenFn only)
 * @state {PostgresState}
 * @returns {Operation}
 */
export function upsertIf(logical, table, uuid, record, options) {
  return async state => {
    const [
      resolvedLogic,
      resolvedTable,
      resolvedUuid,
      resolvedRecord,
      resolvedOptions,
    ] = expandReferences(state, logical, table, uuid, record, options);

    if (!resolvedLogic) {
      console.log(`Skipping upsert for ${resolvedUuid}.`);
      return state;
    }
    const columns = Object.keys(resolvedRecord).sort();
    const columnsList = columns.join(', ');
    const values = columns.map(key => resolvedRecord[key]);
    const conflict =
      resolvedUuid.split(' ').length > 1 ? resolvedUuid : `(${resolvedUuid})`;

    const updateValues = columns
      .map(key => {
        return `${key}=excluded.${key}`;
      })
      .join(', ');

    const insertValues = format(
      `INSERT INTO ${resolvedTable} (${columnsList}) VALUES (%L)`,
      values
    );

    const query = handleValues(
      `${insertValues}
        ON CONFLICT ${conflict}
        DO UPDATE SET ${updateValues};`,
      handleSetNull(resolvedOptions)
    );

    const safeQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES [--REDACTED--]
        ON CONFLICT ${conflict}
        DO UPDATE SET ${updateValues};`;

    const queryToLog = resolvedOptions?.logValues ? query : safeQuery;
    console.log('Preparing to upsert via:', queryToLog);

    handleQueryOptions(state, query, resolvedOptions);
    const result = await queryHandler(query);
    const nextState = {
      ...composeNextState(state, result.rows),
      result,
    };
    return nextState;
  };
}

/**
 * Insert or update multiple records using ON CONFLICT UPDATE and excluded
 * @public
 * @example <caption>Insert or update multiple records</caption>
 * upsertMany(
 *   'users', // the DB table
 *   'email', // a DB column with a unique constraint OR a CONSTRAINT NAME
 *   [
 *     { name: 'one', email: 'one@openfn.org' },
 *     { name: 'two', email: 'two@openfn.org' },
 *   ]
 * )
 * @function
 * @param {string} table - The target table
 * @param {string} uuid - The uuid column to determine a matching/existing record
 * @param {array} data - An array of objects or a function that returns an array
 * @param {GeneralOptions} [options] - Shared options. (OpenFn only)
 * @state {PostgresState}
 * @returns {Operation}
 */
export function upsertMany(table, uuid, data, options) {
  return async state => {
    const [resolvedTable, resolvedUuid, resolvedData, resolvedOptions] =
      expandReferences(state, table, uuid, data, options);

    if (!resolvedData || resolvedData.length === 0) {
      console.log('No records provided; skipping upsert.');
      return state;
    }

    const columns = Object.keys(resolvedData[0]);
    const columnsList = columns.join(', ');
    const values = resolvedData.map(x => Object.values(x));
    const conflict =
      resolvedUuid.split(' ').length > 1 ? resolvedUuid : `(${resolvedUuid})`;

    const updateValues = columns
      .map(key => {
        return `${key}=excluded.${key}`;
      })
      .join(', ');

    const insertValues = format(
      `INSERT INTO ${resolvedTable} (${columnsList}) VALUES %L`,
      values
    );

    const query = handleValues(
      `${insertValues}
        ON CONFLICT ${conflict}
        DO UPDATE SET ${updateValues};`,
      handleSetNull(resolvedOptions)
    );

    const safeQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES [--REDACTED--]
        ON CONFLICT ${conflict}
        DO UPDATE SET ${updateValues};`;

    const queryToLog = resolvedOptions?.logValues ? query : safeQuery;
    console.log('Preparing to upsert via:', queryToLog);
    handleQueryOptions(state, query, resolvedOptions);
    const result = await queryHandler(query);
    const nextState = {
      ...composeNextState(state, result.rows),
      result,
    };
    return nextState;
  };
}

/**
 * List the columns of a table in a database.
 * @public
 * @example <caption>Describe a table</caption>
 * describeTable('clinic_visits')
 * @function
 * @param {string} tableName - The name of the table to describe
 * @param {ExecutionOptions} [options] - Execution options. (OpenFn only)
 * @state {PostgresState}
 * @returns {Operation}
 */
export function describeTable(tableName, options) {
  return async state => {
    const [resolvedTableName, resolvedOptions] = expandReferences(
      state,
      tableName,
      options
    );

    const query = `SELECT column_name, udt_name, is_nullable
        FROM information_schema.columns
        WHERE table_name='${resolvedTableName}';`;

    console.log('Preparing to describe table via:', query);
    handleQueryOptions(state, query, resolvedOptions);
    const result = await queryHandler(query);
    const nextState = {
      ...composeNextState(state, result.rows),
      result,
    };
    return nextState;
  };
}

/**
 * Create a table in database when given an array of columns and a table_name.
 * @public
 * @example
 * insertTable('table_name', state => state.data.map(
 *   column => ({
 *     name: column.name,
 *     type: column.type,
 *     required: true, // optional
 *     unique: false, // optional - to be set to true for unique constraint
 *   })
 * ));
 * @function
 * @param {string} tableName - The name of the table to create
 * @param {array} columns - An array of form columns
 * @param {ExecutionOptions} [options] - Execution options. (OpenFn only)
 * @state {PostgresState}
 * @returns {Operation}
 */
export function insertTable(tableName, columns, options) {
  return async state => {
    const [resolvedTableName, resolvedColumns, resolvedOptions] =
      expandReferences(state, tableName, columns, options);

    if (!resolvedColumns || resolvedColumns.length === 0) {
      console.log('No columns provided; skipping table creation.');
      return state;
    }
    const structureData = resolvedColumns
      .map(
        x =>
          `${x.name} ${x.type} ${
            x.hasOwnProperty('default')
              ? x.type.includes('varchar') ||
                x.type.includes('text') ||
                x.type.includes('BIT')
                ? `DEFAULT '${x.default}'`
                : `DEFAULT ${x.default}`
              : ''
          } ${x.unique ? 'UNIQUE' : ''} ${
            x.identity ? 'GENERATED BY DEFAULT AS IDENTITY' : ''
          } ${x.required ? 'NOT NULL' : ''}`
      )
      .join(', ');

    const query = `CREATE TABLE ${resolvedTableName} (
        ${structureData}
      );`;

    console.log('Preparing to create table via:', query);

    handleQueryOptions(state, query, resolvedOptions);
    const result = await queryHandler(query);
    const nextState = {
      ...composeNextState(state, result.rows),
      result,
    };
    return nextState;
  };
}

/**
 * Alter an existing table in the database.
 * @public
 * @example
 * modifyTable('table_name', state => state.data.map(
 *   newColumn => ({
 *     name: newColumn.name,
 *     type: newColumn.type,
 *     required: true, // optional
 *     unique: false, // optional - to be set to true for unique constraint
 *   })
 * ));
 * @function
 * @param {string} tableName - The name of the table to alter
 * @param {array} columns - An array of form columns
 * @param {ExecutionOptions} [options] - Execution options. (OpenFn only)
 * @state {PostgresState}
 * @returns {Operation}
 */
export function modifyTable(tableName, columns, options) {
  return async state => {
    const [resolvedTableName, resolvedColumns, resolvedOptions] =
      expandReferences(state, tableName, columns, options);

    if (!resolvedColumns || resolvedColumns.length === 0) {
      console.log('No columns provided; skipping table modification.');
      return state;
    }
    const structureData = resolvedColumns
      .map(
        x =>
          `ADD COLUMN ${x.name} ${x.type} ${
            x.hasOwnProperty('default')
              ? x.type.includes('varchar') ||
                x.type.includes('text') ||
                x.type.includes('BIT')
                ? `DEFAULT '${x.default}'`
                : `DEFAULT ${x.default}`
              : ''
          } ${x.identity ? 'GENERATED BY DEFAULT AS IDENTITY' : ''} ${
            x.required ? 'NOT NULL' : ''
          }`
      )
      .join(', ');

    const query = `ALTER TABLE ${resolvedTableName} ${structureData};`;

    console.log('Preparing to modify table via:', query);
    handleQueryOptions(state, query, resolvedOptions);
    const result = await queryHandler(query);
    const nextState = {
      ...composeNextState(state, result.rows),
      result,
    };
    return nextState;
  };
}

export {
  alterState,
  arrayToString,
  combine,
  dataPath,
  dataValue,
  dateFns,
  cursor,
  assert,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  merge,
  sourceValue,
  as,
} from '@openfn/language-common';
