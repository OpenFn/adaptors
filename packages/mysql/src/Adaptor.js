import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import mysql from 'mysql';
import squel from 'squel';

/**
 * Execute a SQL statement. Take care when inserting values from state directly into a query,
 * as this can be a vector for injection attacks. See [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
 * for guidelines
 * @example
 * sql(state => `select * from ${state.data.tableName};`, { writeSql: true })
 * @function
 * @public
 * @param {string|function} sqlQuery - The SQL query as a string or a function that returns a string using state.
 * @param {object} [options] - Optional options argument.
 * @param {boolean} [options.writeSql = false] - If true, logs the generated SQL statement. Defaults to false.
 * @param {boolean} [options.execute = true] - If false, does not execute the SQL, just logs it and adds to state.queries. Defaults to true.
 * @returns {Operation}
 */

export function sql(sqlQuery, options = {}) {
  return state => {
    const { connection } = state;
    const [resolvedSqlQuery, resolvedOptions] = expandReferences(
      state,
      sqlQuery,
      options
    );

    const { writeSql = false, execute = true } = resolvedOptions;
    if (writeSql) {
      console.log('Prepared SQL:', resolvedSqlQuery);
    }

    if (!execute) {
      return {
        ...state,
        queries: [...(state.queries || []), resolvedSqlQuery],
      };
    }

    return new Promise((resolve, reject) => {
      connection.query(resolvedSqlQuery, (err, results, fields) => {
        if (err) {
          console.log('Error executing query. Disconnecting from database.');
          connection.end();
          return reject(err);
        }
        resolve({ ...state, response: { body: results, fields } });
      });
    });
  };
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
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(
      connect,
      ...operations,
      disconnect,
      cleanupState
    )({ ...initialState, ...state });
  };
}

function connect(state) {
  const { host, port, database, password, user } = state.configuration;

  var connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port,
  });

  connection.connect();
  console.log(`Preparing to query "` + database + `"...`);
  return { ...state, connection: connection };
}

function disconnect(state) {
  state.connection.end();
  return state;
}

function cleanupState(state) {
  delete state.connection;
  return state;
}

/**
 * Insert a record
 * @example <caption>Insert a record into the `users` table</caption>
 * insert("users", { name: (state) => state.data.name });
 * @function
 * @public
 * @param {string} table - The target table
 * @param {object} fields - A fields object
 * @returns {Operation}
 */
export function insert(table, fields) {
  return state => {
    let { connection } = state;

    const [valuesObj] = expandReferences(state, fields);

    const squelMysql = squel.useFlavour('mysql');

    var sqlParams = squelMysql
      .insert({
        autoQuoteFieldNames: true,
      })
      .into(table)
      .setFields(valuesObj)
      .toParam();

    const sql = sqlParams.text;
    const inserts = sqlParams.values;
    const sqlString = mysql.format(sql, inserts);

    console.log(`Executing MySQL query: ${sqlString}`);

    return new Promise((resolve, reject) => {
      // execute a query on our database

      // TODO: figure out how to escape the string.

      connection.query(sqlString, function (err, results, fields) {
        if (err) {
          reject(err);
          // Disconnect if there's an error.
          console.log('There is an error. Disconnecting from database.');
          connection.end();
        } else {
          console.log('Success...');
          console.log(results);
          console.log(fields);
          resolve(results);
        }
      });
    }).then(data => {
      const nextState = { ...state, response: { body: data } };
      return nextState;
    });
  };
}

/**
 * Insert or Update a record if matched
 * @example <caption>Upsert a record</caption>
 * upsert("table", { name: (state) => state.data.name });
 * @function
 * @public
 * @param {string} table - The target table
 * @param {object} fields - A fields object
 * @returns {Operation}
 */
export function upsert(table, fields) {
  return state => {
    let { connection } = state;

    const [valuesObj] = expandReferences(state, fields);

    const squelMysql = squel.useFlavour('mysql');

    var insertParams = squelMysql
      .insert({
        autoQuoteFieldNames: true,
      })
      .into(table)
      .setFields(valuesObj)
      .toParam();

    var sql = insertParams.text;
    var inserts = insertParams.values;
    const insertString = mysql.format(sql, inserts);

    var updateParams = squelMysql
      .update({
        autoQuoteFieldNames: true,
      })
      .table('')
      .setFields(valuesObj)
      .toParam();

    var sql = updateParams.text;
    var inserts = updateParams.values;
    const updateString = mysql.format(sql, inserts);

    const upsertString =
      insertString + ` ON DUPLICATE KEY UPDATE ` + updateString.slice(10);

    console.log('Executing MySQL query: ' + upsertString);

    return new Promise((resolve, reject) => {
      // execute a query on our database

      // TODO: figure out how to escape the string.

      connection.query(upsertString, function (err, results, fields) {
        if (err) {
          reject(err);
          // Disconnect if there's an error.
          console.log("That's an error. Disconnecting from database.");
          connection.end();
        } else {
          console.log('Success...');
          console.log(results);
          console.log(fields);
          resolve(results);
        }
      });
    }).then(data => {
      const nextState = { ...state, response: { body: data } };
      return nextState;
    });
  };
}

/**
 * Insert or update multiple records using ON DUPLICATE KEY
 * @public
 * @example <caption>Upsert multiple records</caption>
 * upsertMany(
 *   'users', // the DB table
 *   [
 *     { name: 'one', email: 'one@openfn.org' },
 *     { name: 'two', email: 'two@openfn.org' },
 *   ]
 * )
 * @function
 * @public
 * @param {string} table - The target table
 * @param {array} data - An array of objects or a function that returns an array
 * @returns {Operation}
 */
export function upsertMany(table, data) {
  return function (state) {
    return new Promise(function (resolve, reject) {
      const [rows] = expandReferences(state, data);

      if (!rows || rows.length === 0) {
        console.log('No records provided; skipping upsert.');
        resolve(state);
      }

      const squelMysql = squel.useFlavour('mysql');
      const columns = Object.keys(rows[0]);

      let upsertSql = squelMysql.insert().into(table).setFieldsRows(rows);
      columns.map(c => {
        upsertSql = upsertSql.onDupUpdate(`${c}=values(${c})`);
      });

      const upsertString = upsertSql.toString();

      let { connection } = state;
      connection.query(upsertString, function (err, results, fields) {
        if (err) {
          reject(err); // Disconnect if there's an error.

          console.log("That's an error. Disconnecting from database.");
          connection.end();
        } else {
          console.log('Success...');
          console.log(results);
          console.log(fields);
          resolve(results);
        }
      });
    }).then(function (data) {
      const nextState = { ...state, response: { body: data } };
      return nextState;
    });
  };
}

export {
  fn,
  fnIf,
  each,
  merge,
  field,
  fields,
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
