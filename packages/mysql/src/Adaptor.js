import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import mysql from 'mysql2/promise';
import knex from 'knex';

let connection;
let knexInstance = knex({ client: 'mysql2' });

async function connect(state) {
  if (connection) {
    return state;
  }
  const { host, port, database, password, user } = state.configuration || {};

  try {
    connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
      port,
    });
    console.log('Connected to database...');
  } catch (error) {
    console.log(error);
    throw new Error('Unable to connect to database.');
  }
  return state;
}

async function disconnect(state) {
  if (connection) {
    await connection.end();
    console.log('Disconected from database...');
    connection = null;
  }
  knexInstance.destroy();
  return state;
}

export function setMockConnection(mockConnection) {
  connection = mockConnection;
}

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for mysql.
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */

export function execute(...operations) {
  const initialState = {
    queries: [],
  };

  return state => {
    return commonExecute(
      connect,
      ...operations,
      disconnect
    )({ ...initialState, ...state });
  };
}

/**
 * Execute a SQL statement. Take care when inserting values from state directly into a query,
 * as this can be a vector for injection attacks. See [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
 * for guidelines
 * @example
 * sql(state => `select * from ${state.data.tableName};`, { writeSql: true })
 * @example <caption>Prepared statements</caption>
 * sql(state => `select * from ?? where id = ?;`, {
 *   values: state => [state.data.tableName, state.data.id],
 * });
 * @function
 * @public
 * @param {string|function} sqlQuery - The SQL query as a string or a function that returns a string using state.
 * @param {object} [options] - Optional options argument.
 * @param {boolean} [options.writeSql = false] - If true, logs the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute = true] - If false, does not execute the SQL, just logs it and adds to state.queries. Defaults to true.
 * @returns {Operation}
 */

export function sql(sqlQuery, options = {}) {
  return async state => {
    const [resolvedSqlQuery, resolvedOptions] = expandReferences(
      state,
      sqlQuery,
      options
    );

    const { writeSql = false, execute = true, values } = resolvedOptions;

    if (writeSql) {
      console.log('Prepared SQL:', resolvedSqlQuery);
      if (values) {
        state.queries.push({ sql: resolvedSqlQuery, values });
      } else {
        state.queries.push(resolvedSqlQuery);
      }
    }

    if (!execute) {
      console.log('Execution skipped, execute is false.');
      return {
        ...state,
        queries: [...state.queries, resolvedSqlQuery],
      };
    }

    try {
      const [result, fields] = await connection.execute(
        resolvedSqlQuery,
        values
      );
      console.log('Query executed successfully.');
      return composeNextState(state, {
        result,
        fields,
      });
    } catch (err) {
      console.log('Error executing query.');
      throw err;
    }
  };
}

/**
 * Insert a record
 * @example <caption>Insert a record into a table</caption>
 * insert("users", { name: "one", email: "one@openfn.org" });
 * @function
 * @public
 * @param {string} table - The target table
 * @param {object} fields - A fields object
 * @returns {Operation}
 */
export function insert(table, fields) {
  return async state => {
    const [resolvedTable, resolvedFields] = expandReferences(
      state,
      table,
      fields
    );
    const keys = Object.keys(resolvedFields);
    const values = Object.values(resolvedFields);

    const placeholders = keys.map(() => '?').join(', ');
    const columns = keys.map(() => '??').join(', ');

    const sqlString = mysql.format(
      `INSERT INTO ?? (${columns}) VALUES (${placeholders})`,
      [resolvedTable, ...keys]
    );

    try {
      const [result, fields] = await connection.execute(sqlString, values);
      console.log('Success...');
      return composeNextState(state, {
        result,
        fields,
      });
    } catch (err) {
      console.log('Error inserting record.');
      throw err;
    }
  };
}

/**
 * Insert or Update a record if matched
 * @example <caption>Upsert a record into a table</caption>
 * upsert("users", { name: "Tuchi Dev" });
 * @function
 * @public
 * @param {string} table - The target table
 * @param {object} fields - A fields object
 * @returns {Operation}
 */
export function upsert(table, fields) {
  return async state => {
    const [resolvedTable, resolvedFields] = expandReferences(
      state,
      table,
      fields
    );

    const insertQuery = knexInstance(resolvedTable).insert(resolvedFields);
    const insertString = insertQuery.toString();

    const updateParts = Object.keys(resolvedFields).map(
      key => `${knexInstance.ref(key)} = VALUES(${knexInstance.ref(key)})`
    );
    const updateClause = updateParts.join(', ');

    const upsertString = `${insertString} ON DUPLICATE KEY UPDATE ${updateClause}`;

    console.log('Executing MySQL query: ' + upsertString);
    try {
      const [result, fields] = await connection.execute(upsertString);
      console.log('Success...');
      return composeNextState(state, { result, fields });
    } catch (err) {
      console.log("That's an error.");
      throw err;
    }
  };
}

/**
 * Insert or update multiple records using ON DUPLICATE KEY
 * @public
 * @example <caption>Upsert multiple records into a table</caption>
 * upsertMany(
 *   "users", // the DB table
 *   [
 *     { name: "one", email: "one@openfn.org" },
 *     { name: "two", email: "two@openfn.org" },
 *   ]
 * );
 * @function
 * @public
 * @param {string} table - The target table
 * @param {array} data - An array of objects or a function that returns an array
 * @returns {Operation}
 */
export function upsertMany(table, data) {
  return async state => {
    const [resolvedTable, resolvedData] = expandReferences(state, table, data);
    if (!resolvedData || resolvedData.length === 0) {
      console.log('No records provided; skipping upsert.');
      return state;
    }

    const columns = Object.keys(resolvedData[0]);

    const insertQuery = knexInstance(resolvedTable).insert(resolvedData);
    const insertString = insertQuery.toString();

    const updateParts = columns.map(
      c => `${knexInstance.ref(c)} = VALUES(${knexInstance.ref(c)})`
    );
    const updateClause = updateParts.join(', ');

    const upsertString = `${insertString} ON DUPLICATE KEY UPDATE ${updateClause}`;

    try {
      const [result, fields] = await connection.execute(upsertString);
      console.log('Success...');
      return composeNextState(state, { result, fields });
    } catch (err) {
      console.log("That's an error.");
      throw err;
    }
  };
}

export {
  fn,
  fnIf,
  each,
  merge,
  field,
  fields,
  assert,
  cursor,
  dateFns,
  combine,
  dataPath,
  dataValue,
  alterState,
  sourceValue,
  arrayToString,
  lastReferenceValue,
  as,
} from '@openfn/language-common';
