import sql from 'mssql';

/**
 * Creates a connection.
 * @example
 *  createConnection(state)
 * @function
 * @param {State} state - Runtime state.
 * @returns {State}
 */
export function createConnection(state) {
  const {
    server,
    userName,
    password,
    database,
    port = 1433,
    encrypt = true,
    trustServerCertificate = true,
  } = state.configuration;

  if (!server) {
    throw new Error('server missing from configuration.');
  }

  const config = {
    user: userName,
    password,
    server,
    port,
    database,
    options: {
      encrypt,
      trustServerCertificate,
    },
  };

  return sql
    .connect(config)
    .then(pool => {
      return { ...state, connection: pool };
    })
    .catch(err => {
      console.error('Error connecting to database:', err);
      throw err;
    });
}

/**
 * Removes unserializable keys from the state.
 * @example
 *  cleanupState(state)
 * @function
 * @param {State} state
 * @returns {State}
 */
export function cleanupState(state) {
  if (state.connection) {
    // The connection is a pool, so we need to close it properly
    state.connection.close();
  }
  delete state.connection;
  return state;
}

/**
 * Returns a flatten object of the rows with rowCount.
 * @function
 * @param {State} state
 * @param {array} rows - the array of rows returned from the sql query
 * @returns {State}
 */
export function flattenRows(state, rows) {
  const data = { rowCount: rows.length, rows };
  return { ...state, response: { body: data } };
}

/**
 * Composes the next state with the query results.
 * @function
 * @param {State} state
 * @param {array} rows - the array of rows returned from the sql query
 * @returns {State}
 */
export function composeNextState(state, rows) {
  const data = { rowCount: rows.length, rows };
  return { ...state, response: { body: data } };
}

/**
 * Adds rows to the references array.
 * @function
 * @param {State} state
 * @param {array} rows - the array of rows returned from the sql query
 * @returns {State}
 */
export function addRowsToRefs(state, rows) {
  state.references.push(rows);
  return state;
}

/**
 * Handles query execution with options.
 * @function
 * @param {State} state
 * @param {string} query - SQL query to execute
 * @param {function} callback - Function to handle query results
 * @param {object} options - Optional options
 * @returns {Promise}
 */
export function queryHandler(state, query, callback, options) {
  const { connection } = state;

  return new Promise((resolve, reject) => {
    if (options) {
      if (options.writeSql) {
        console.log('Adding prepared SQL to state.queries array.');
        state.queries.push(query);
      }

      if (options.execute === false) {
        console.log('Not executing query; options.execute === false');
        resolve(state);
        return state;
      }
    }

    connection
      .request()
      .query(query)
      .then(result => {
        console.log(`Finished: ${result.rowsAffected} row(s).`);
        resolve(callback(state, result.recordset));
      })
      .catch(err => {
        console.error('Error executing query:', err);
        reject(err);
      });
  });
}

/**
 * Handles null values in SQL queries.
 * @function
 * @param {string} sqlString - SQL query string
 * @param {string|array} nullString - String or array of strings to replace with NULL
 * @returns {string}
 */
export function handleValues(sqlString, nullString) {
  if (nullString === false) {
    return sqlString;
  }

  if (Array.isArray(nullString)) {
    return nullString.reduce((sql, ns) => {
      return sql.replace(new RegExp(escapeRegExp(ns), 'g'), 'NULL');
    }, sqlString);
  }

  if (typeof nullString === 'object') {
    throw new Error('setNull must be a string or an array of strings.');
  }

  return sqlString.replace(new RegExp(escapeRegExp(nullString), 'g'), 'NULL');
}

/**
 * Handles options for SQL queries.
 * @function
 * @param {object} options - Query options
 * @returns {string|boolean}
 */
export function handleOptions(options) {
  if (options && options.setNull === false) {
    return false;
  }
  return (options && options.setNull) || "'undefined'";
}

/**
 * Escapes special characters in a string for use in a regular expression.
 * @function
 * @param {string} string - String to escape
 * @returns {string}
 */
export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Escapes single quotes in a string for SQL.
 * @function
 * @param {string|object} stringExp - String or object to escape
 * @returns {string|array}
 */
export function escapeQuote(stringExp) {
  if (typeof stringExp === 'object' && stringExp !== null) {
    return Object.values(stringExp).map(x => escapeQuote(x));
  }

  if (typeof stringExp !== 'string') {
    return stringExp;
  }

  return stringExp.replace(/'/g, "''");
}
