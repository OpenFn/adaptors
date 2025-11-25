import pg from 'pg';
import format from 'pg-format';
import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { handleOptions, handleValues, processQueryOptions } from './util.js';

let client = null;
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
async function queryHandler(query) {
  const response = await client.query(query);
  console.log(`${response.command} succeeded, rowCount: ${response.rowCount}`);
  return response;
}
export function setMockClient(mockClient) {
  client = mockClient;
}

/**
 * Execute an SQL statement
 * @public
 * @example
 * sql(state => `select(*) from ${state.data.tableName};`, { writeSql: true })
 * @function
 * @param {object} sqlQuery - The query config object.
 * @param {string} sqlQuery.text - The SQL query as a string.
 * @param {object} [sqlQuery.values] - Optional values argument
 * @param {object} [options] - Optional options argument
 * @param {boolean} [options.writeSql] - A boolean value that specifies whether to log the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute] - A boolean value that specifies whether to execute the generated SQL statement. Defaults to false.
 * @returns {Operation}
 */
export function sql(sqlQuery, options) {
  return async state => {
    const [resolvedSqlQuery, resolvedOptions] = expandReferences(
      state,
      sqlQuery,
      options
    );
    processQueryOptions(state, resolvedSqlQuery, resolvedOptions);
    const response = await queryHandler(resolvedSqlQuery);
    return { ...composeNextState(state, response.rows), response };
  };
}

/**
 * Fetch a uuid key given a condition
 * @public
 * @example
 * findValue({
 *    uuid: 'id',
 *    relation: 'users',
 *    where: { first_name: 'Mamadou' },
 *    operator: { first_name: 'like' }
 *  })
 * @function
 * @param {object} [filter] - A filter object with the lookup table, a uuid and the condition
 * @param {string} [filter.uuid] - The uuid value to search for in the specified relation.
 * @param {string} [filter.relation] - The name of the relation to search for the uuid value.
 * @param {object} [filter.where] - An object that contains key-value pairs to filter the search results.
 * @param {object} [filter.operator] - An object that contains key-value pairs to specify the type of comparison to perform on the where clause.
 * @returns {value}
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

    let conditionsArray = [];
    for (let key in whereData)
      conditionsArray.push(
        `${key} ${operatorData ? operatorData[key] : '='} '${whereData[key]}'`
      );

    const condition =
      conditionsArray.length > 0
        ? `where ${conditionsArray.join(' and ')}`
        : ''; // In a near future the 'and' can live in the filter.

    const body = `select ${uuid} from ${relation} ${condition}`;

    console.log('Preparing to execute sql statement');
    let returnValue = null;

    const response = await queryHandler(body);
    if (response.rows.length > 0) {
      returnValue = response.rows[0][uuid];
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
 * @example
 * insert('users', { name: 'Elodie', id: 7 }, { setNull: "'NaN'", logValues: true });
 * @function
 * @param {string} table - The target table
 * @param {object} record - Payload data for the record as a JS object or function
 * @param {object} [options] - Optional options argument
 * @param {string} [options.setNull] - A string value that specifies the behavior for inserting null values.
 * @param {boolean} [options.logValues] - A boolean value that specifies whether to log the inserted values to the console. Defaults to false.
 * @param {boolean} [options.writeSql] - A boolean value that specifies whether to log the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute] - A boolean value that specifies whether to execute the generated SQL statement. Defaults to false.
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
      handleOptions(resolvedOptions)
    );

    const safeQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES [--REDACTED--]];`;

    const queryToLog = resolvedOptions?.logValues ? query : safeQuery;
    console.log('Preparing to insert via:', queryToLog);
    processQueryOptions(state, query, resolvedOptions);
    const response = await queryHandler(query);
    return { ...composeNextState(state, response.rows), response };
  };
}

/**
 * Insert many records, using the keys of the first as the column template
 * @public
 * @example
 * insertMany('users', state => state.data.recordArray, { setNull: "'undefined'", logValues: true });
 * @function
 * @param {string} table - The target table
 * @param {array} records - An array or a function that takes state and returns an array
 * @param {object} [options] - Optional options argument
 * @param {string} [options.setNull] - A string value that specifies the behavior for inserting null values.
 * @param {boolean} [options.logValues] - A boolean value that specifies whether to log the inserted values to the console. Defaults to false.
 * @param {boolean} [options.writeSql] - A boolean value that specifies whether to log the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute] - A boolean value that specifies whether to execute the generated SQL statement. Defaults to false.
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
      handleOptions(resolvedOptions)
    );

    const safeQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES [--REDACTED--]];`;

    const queryToLog = resolvedOptions?.logValues ? query : safeQuery;
    console.log('Preparing to insertMany via:', queryToLog);
    processQueryOptions(state, query, resolvedOptions);
    const response = await queryHandler(query);
    return { ...composeNextState(state, response.rows), response };
  };
}

/**
 * Insert or update a record using ON CONFLICT UPDATE
 * @public
 * @example
 * upsert(
 *   'users', // the DB table
 *   'ON CONSTRAINT users_pkey', // a DB column with a unique constraint OR a CONSTRAINT NAME
 *   { name: 'Elodie', id: 7 },
 *   { setNull: ["''", "'undefined'"], writeSql:true, execute: true, logValues: true }
 * )
 * @function
 * @param {string} table - The target table
 * @param {string} uuid - The uuid column to determine a matching/existing record
 * @param {object} record - Payload data for the record as a JS object or function
 * @param {object} [options] - Optional options argument
 * @param {string} [options.setNull] - A string value that specifies the behavior for inserting null values.
 * @param {boolean} [options.writeSql] - A boolean value that specifies whether to log the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute] - A boolean value that specifies whether to execute the generated SQL statement. Defaults to false.
 * @param {boolean} [options.logValues] - A boolean value that specifies whether to log the inserted values to the console. Defaults to false.
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
      handleOptions(resolvedOptions)
    );

    const safeQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES [--REDACTED--]
        ON CONFLICT ${conflict}
        DO UPDATE SET ${updateValues};`;

    const queryToLog = resolvedOptions?.logValues ? query : safeQuery;
    console.log('Preparing to upsert via:', queryToLog);
    processQueryOptions(state, query, resolvedOptions);
    const response = await queryHandler(query);
    return { ...composeNextState(state, response.rows), response };
  };
}

/**
 * Insert or update a record based on a logical condition using ON CONFLICT UPDATE
 * @public
 * @example
 * upsertIf(
 *   dataValue('name'),
 *   'users', // the DB table
 *   'ON CONSTRAINT users_pkey', // a DB column with a unique constraint OR a CONSTRAINT NAME
 *   { name: 'Elodie', id: 7 },
 *   { writeSql:true, execute: true }
 * )
 * @function
 * @param {string} logical - a data to check existing value for.
 * @param {string} table - The target table
 * @param {string} uuid - The uuid column to determine a matching/existing record
 * @param {object} record - Payload data for the record as a JS object or function
 * @param {object} [options] - Optional options argument
 * @param {string} [options.setNull] - A string value that specifies the behavior for inserting null values.
 * @param {boolean} [options.writeSql] - A boolean value that specifies whether to log the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute] - A boolean value that specifies whether to execute the generated SQL statement. Defaults to false.
 * @param {boolean} [options.logValues] - A boolean value that specifies whether to log the inserted values to the console. Defaults to false.
 * @returns {Operation}
 */
export function upsertIf(logical, table, uuid, record, options, callback) {
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
      handleOptions(resolvedOptions)
    );

    const safeQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES [--REDACTED--]
        ON CONFLICT ${conflict}
        DO UPDATE SET ${updateValues};`;

    const queryToLog = resolvedOptions?.logValues ? query : safeQuery;
    console.log('Preparing to upsert via:', queryToLog);

    processQueryOptions(state, query, resolvedOptions);
    const response = await queryHandler(query);
    return { ...composeNextState(state, response.rows), response };
  };
}

/**
 * Insert or update multiple records using ON CONFLICT UPDATE and excluded
 * @public
 * @example
 * upsertMany(
 *   'users', // the DB table
 *   'email', // a DB column with a unique constraint OR a CONSTRAINT NAME
 *   [
 *     { name: 'one', email: 'one@openfn.org' },
 *     { name: 'two', email: 'two@openfn.org' },
 *   ]
 *  { logValues: true }
 * )
 * @function
 * @param {string} table - The target table
 * @param {string} uuid - The uuid column to determine a matching/existing record
 * @param {array} data - An array of objects or a function that returns an array
 * @param {object} [options] - Optional options argument
 * @param {string} [options.setNull] - A string value that specifies the behavior for inserting null values.
 * @param {boolean} [options.writeSql] - A boolean value that specifies whether to log the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute] - A boolean value that specifies whether to execute the generated SQL statement. Defaults to false.
 * @param {boolean} [options.logValues] - A boolean value that specifies whether to log the inserted values to the console. Defaults to false.
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
      handleOptions(resolvedOptions)
    );

    const safeQuery = `INSERT INTO ${resolvedTable} (${columnsList}) VALUES [--REDACTED--]
        ON CONFLICT ${conflict}
        DO UPDATE SET ${updateValues};`;

    const queryToLog = resolvedOptions?.logValues ? query : safeQuery;
    console.log('Preparing to upsert via:', queryToLog);
    processQueryOptions(state, query, resolvedOptions);
    const response = await queryHandler(query);
    return { ...composeNextState(state, response.rows), response };
  };
}

/**
 * List the columns of a table in a database.
 * @public
 * @example
 * describeTable('clinic_visits')
 * @function
 * @param {string} tableName - The name of the table to describe
 * @param {object} [options] - Optional options argument
 * @param {boolean} [options.writeSql] - A boolean value that specifies whether to log the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute] - A boolean value that specifies whether to execute the generated SQL statement. Defaults to false.
 * @param {function} callback - (Optional) callback function
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
    processQueryOptions(state, query, resolvedOptions);
    const response = await queryHandler(query);
    return { ...composeNextState(state, response.rows), response };
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
 * @param {object} [options] - Optional options argument
 * @param {boolean} [options.writeSql] - A boolean value that specifies whether to log the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute] - A boolean value that specifies whether to execute the generated SQL statement. Defaults to false.
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

    processQueryOptions(state, query, resolvedOptions);
    const response = await queryHandler(query);
    return { ...composeNextState(state, response.rows), response };
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
 * @param {object} [options] - Optional options argument
 * @param {boolean} [options.writeSql] - A boolean value that specifies whether to log the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute] - A boolean value that specifies whether to execute the generated SQL statement. Defaults to false.
 * @returns {Operation}
 */
export function modifyTable(tableName, columns, options) {
  return async state => {
    const [resolvedTableName, resolvedColumns, resolvedOptions] =
      expandReferences(state, tableName, columns, options);

    if (!resolvedColumns || resolvedColumns.length === 0) {
      console.log('No columns provided; skipping table modification.');
      resolve(state);
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
    processQueryOptions(state, query, resolvedOptions);
    const response = await queryHandler(query);
    return { ...composeNextState(state, response.rows), response };
  };
}

/**
 * Expose the pg-format utility library
 * @public
 * @function
 * @example
 * util.format('Hello %s', 'world')
 */
export const util = { format };

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
