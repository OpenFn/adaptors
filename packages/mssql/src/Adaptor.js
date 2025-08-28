import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { escape } from './util';
import { Connection, Request } from 'tedious';

/**
 * Creates a connection.
 * @example
 *  createConnection(state)
 * @function
 * @param {State} state - Runtime state.
 * @returns {State}
 */
function createConnection(state) {
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
    authentication: {
      options: { userName, password },
      type: 'default',
    },
    server,
    options: {
      port,
      database,
      encrypt,
      rowCollectionOnRequestCompletion: true,
      trustServerCertificate,
    },
  };

  const connection = new Connection(config);

  // Attempt to connect and execute queries if connection goes through
  return new Promise((resolve, reject) => {
    connection.on('connect', err => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve({ ...state, connection });
      }
    });
    // Initialize connection
    connection.connect();
  });
}

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for mssql.
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
      createConnection,
      ...operations,
      cleanupState
    )({ ...initialState, ...state });
  };
}

/**
 * Removes unserializable keys from the state.
 * @example
 *  cleanupState(state)
 * @function
 * @param {State} state
 * @returns {State}
 */
function cleanupState(state) {
  state?.connection?.close();
  delete state?.connection;
  return state;
}

/**
 * Sets the returned rows from a query as the first item in the state.references
 * array, leaving state.data unchanged between operations.
 * @function
 * @param {State} state
 * @param {array} rows - the array of rows returned from the sql query
 * @returns {State}
 */
function addRowsToRefs(state, rows) {
  return {
    ...state,
    references: [rows, ...state.references],
  };
}

/**
 * Returns a flatten object of the rows (array of arrays) with rowCount.
 * @function
 * @param {State} state
 * @param {array} rows - the array of rows returned from the sql query
 * @returns {State}
 */
function flattenRows(state, rows) {
  const obj = [];
  rows.forEach(row => obj.push({ column_name: row[0].value }));
  const data = { rowCount: rows.length, rows: obj };
  return { ...state, response: { body: data } };
}

function composeNextState(state, rows) {
  let rowObj = {};
  const flattenedRows = [];
  rows.forEach(row => {
    rowObj = row.reduce(
      (o, col) => Object.assign(o, { [col.metadata.colName]: col.value }),
      {}
    );
    flattenedRows.push(rowObj);
  });
  return { ...state, response: { rowCount: rows.length, rows: flattenedRows } };
}

function queryHandler(state, query, callback, options) {
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

    const request = new Request(query, (err, rowCount, rows) => {
      if (err) {
        if (err.name === 'AggregateError' && err.errors) {
          err.errors.map(error => console.error('Error: ', error.message));
        } else {
          console.error(err);
        }
        reject(err);
        return;
      } else {
        console.log(`Finished: ${rowCount} row(s).`);
        resolve(callback(state, rows));
      }
    });

    connection.execSql(request);
  });
}

/**
 * Execute an SQL statement
 * @public
 * @example
 * sql({ query, options })
 * @function
 * @param {object} params - Payload data for the message
 * @returns {Operation}
 */
export function sql(params) {
  return state => {
    const { connection } = state;

    try {
      const [resolvedParams] = expandReferences(state, params);
      const { query, options } = resolvedParams;

      console.log(`Preparing to execute sql statement: ${query}`);
      return queryHandler(state, query, composeNextState, options);
    } catch (e) {
      connection.close();
      throw e;
    }
  };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function handleValues(sqlString, nullString) {
  let sql = sqlString;
  if (nullString == false) {
    return sqlString;
  } else if (Array.isArray(nullString)) {
    nullString.forEach(ns => {
      const re = new RegExp(escapeRegExp(ns), 'g');
      sql = sql.replace(re, 'NULL');
    });
    return sql;
  } else if (typeof nullString === 'object') {
    throw 'setNull must be a string or an array of strings.';
  }
  const re = new RegExp(escapeRegExp(nullString), 'g');
  return sqlString.replace(re, 'NULL');
}

function handleOptions(options) {
  if (options && options.setNull === false) {
    return false;
  }
  return (options && options.setNull) || "'undefined'";
}

/**
 * Fetch a uuid key given a condition
 * @public
 * @example
 * findValue({
 *    uuid: 'id',
 *    relation: 'users',
 *    where: { first_name: 'Mama%', last_name: 'Cisse'},
 *    operator: { first_name: 'like', last_name: '='}
 *  })
 * @function
 * @param {object} filter - A filter object with the lookup table, a uuid and the condition
 * @param {string} filter.uuid - The uuid column to determine a matching/existing record
 * @param {string} filter.relation - The table to lookup the value in
 * @param {object} filter.where - The condition to use for the lookup. Values are automatically escaped for security.
 * @param {object} filter.operator - The operator to use for the lookup
 * @returns {Operation}
 */
export function findValue(filter) {
  return state => {
    const { connection } = state;

    const { uuid, relation, where, operator } = filter;
    const [whereData, operatorData] = expandReferences(state, where, operator);

    let conditionsArray = [];
    for (let key in whereData) {
      const escapedValue = escape(whereData[key]);
      conditionsArray.push(
        `${key} ${operatorData ? operatorData[key] : '='} '${escapedValue}'`
      );
    }

    const condition =
      conditionsArray.length > 0
        ? `where ${conditionsArray.join(' and ')}`
        : ''; // In a near future the 'and' can live in the filter.

    try {
      const body = `select ${uuid} from ${relation} ${condition}`;
      console.log('Preparing to execute sql statement');
      let returnValue = null;
      return new Promise((resolve, reject) => {
        console.log(`Executing query: ${body}`);

        const request = new Request(body, (err, rowCount, rows) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            if (rows.length > 0) {
              returnValue = rows[0][0].value;
            }
            if (returnValue === null) {
              console.log('No value found');
              resolve(undefined);
            }
            resolve(returnValue);
          }
        });
        connection.execSql(request);
      });
    } catch (e) {
      connection.close();
      throw e;
    }
  };
}

/**
 * Insert a record
 * @public
 * @example
 * insert(table, record, {setNull: ["'undefined'", "''"], logValues: false})
 * @function
 * @param {string} table - The target table
 * @param {object} record - Payload data for the record as a JS object
 * @param {object} options - Optional options argument
 * @returns {Operation}
 */
export function insert(table, record, options) {
  return state => {
    const { connection } = state;

    try {
      const [recordData] = expandReferences(state, record);

      const columns = Object.keys(recordData).sort();
      const values = columns.map(key => escape(recordData[key])).join("', '");

      const query = handleValues(
        `INSERT INTO ${table} (${columns.join(', ')}) VALUES ('${values}');`,
        handleOptions(options)
      );

      const safeQuery = `INSERT INTO ${table} (${columns.join(
        ', '
      )}) VALUES [--REDACTED--]];`;

      return new Promise(resolve => {
        const queryToLog = options && options.logValues ? query : safeQuery;
        console.log(`Executing insert via: ${queryToLog}`);

        resolve(queryHandler(state, query, addRowsToRefs, options));
      });
    } catch (e) {
      connection.close();
      throw e;
    }
  };
}

/**
 * Insert many records, using the keys of the first as the column template
 * @public
 * @example
 * insertMany(table, records, { setNull: false, writeSql: true, logValues: false })
 * @function
 * @param {string} table - The target table
 * @param {function} records - A function that takes state and returns an array of records
 * @param {object} options - Optional options argument
 * @returns {Operation}
 */
export function insertMany(table, records, options) {
  return state => {
    const { connection } = state;

    try {
      const [recordData] = expandReferences(state, records);

      // Note: we select the keys of the FIRST object as the canonical template.
      const columns = Object.keys(recordData[0]);

      const valueSets = recordData.map(
        x => `('${escape(Object.values(x)).join("', '")}')`
      );
      const query = handleValues(
        `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${valueSets.join(
          ', '
        )};`,
        handleOptions(options)
      );

      const safeQuery = `INSERT INTO ${table} (${columns.join(
        ', '
      )}) VALUES [--REDACTED--]];`;

      return new Promise(resolve => {
        const queryToLog = options && options.logValues ? query : safeQuery;
        console.log(`Executing insertMany via: ${queryToLog}`);

        resolve(queryHandler(state, query, addRowsToRefs, options));
      });
    } catch (e) {
      connection.close();
      throw e;
    }
  };
}

/**
 * Insert or update a record using SQL MERGE
 * @public
 * @example
 * upsert(table, uuid, record, { setNull: "'undefined'", logValues: false})
 * upsert(table, [uuid1, uuid2], record, { setNull: "'undefined'", logValues: false})
 * @function
 * @param {string} table - The target table
 * @param {string} uuid - The uuid column to determine a matching/existing record
 * @param {object} record - Payload data for the record as a JS object
 * @param {object} options - Optional options argument
 * @returns {Operation}
 */
export function upsert(table, uuid, record, options) {
  return state => {
    const { connection } = state;

    try {
      const [recordData] = expandReferences(state, record);
      const columns = Object.keys(recordData).sort();

      const selectValues = columns
        .map(key => `'${escape(recordData[key])}' AS ${key}`)
        .join(', ');

      const updateValues = columns
        .map(key => `[Target].${key}='${escape(recordData[key])}'`)
        .join(', ');

      const insertColumns = columns.join(', ');
      const insertValues = columns.map(key => `[Source].${key}`).join(', ');

      const constraint = [];
      if (Array.isArray(uuid)) {
        uuid.forEach(key => {
          constraint.push(`[Target].${key} = [Source].${key}`);
        });
      } else {
        constraint.push(`[Target].${uuid} = [Source].${uuid}`);
      }

      const query = handleValues(
        `MERGE ${table} AS [Target]
        USING (SELECT ${selectValues}) AS [Source] 
        ON ${constraint.join(' AND ')}
        WHEN MATCHED THEN
          UPDATE SET ${updateValues} 
        WHEN NOT MATCHED THEN
          INSERT (${insertColumns}) VALUES (${insertValues});`,
        handleOptions(options)
      );

      const safeQuery = `MERGE ${table} AS [Target]
        USING (SELECT [--REDACTED--]) 
        ON [Target].[--VALUE--] = [Source].[--VALUE--]
        WHEN MATCHED THEN
          UPDATE SET [--REDACTED--] 
        WHEN NOT MATCHED THEN
          INSERT (${insertColumns}) VALUES [--REDACTED--];`;

      return new Promise(resolve => {
        const queryToLog = options && options.logValues ? query : safeQuery;
        console.log(`Executing upsert via: ${queryToLog}`);

        resolve(queryHandler(state, query, addRowsToRefs, options));
      });
    } catch (e) {
      connection.close();
      throw e;
    }
  };
}

/**
 * Insert or update a record based on a logical condition using ON CONFLICT UPDATE
 * @public
 * @example
 * upsertIf(
 *   dataValue('name'),
 *   'users', // the DB table
 *   'uuid', // a DB column with a unique constraint
 *   { name: 'Elodie', id: 7 },
 *   { writeSql:true, execute: true, logValues: false }
 * )
 * @function
 * @param {string} logical - a data to check existing value for.
 * @param {string} table - The target table
 * @param {string} uuid - The uuid column to determine a matching/existing record
 * @param {object} record - Payload data for the record as a JS object or function
 * @param {object} options - Optional options argument
 * @returns {Operation}
 */
export function upsertIf(logical, table, uuid, record, options) {
  return state => {
    const { connection } = state;

    try {
      const [recordData] = expandReferences(state, record);
      const columns = Object.keys(recordData).sort();
      const [logicalData] = expandReferences(state, logical);

      return new Promise(resolve => {
        if (!logicalData) {
          console.log(`Skipping upsert for ${uuid}.`);
          resolve(state);
          return state;
        }
        const selectValues = columns
          .map(key => `'${escape(recordData[key])}' AS ${key}`)
          .join(', ');

        const updateValues = columns
          .map(key => `[Target].${key}='${escape(recordData[key])}'`)
          .join(', ');

        const insertColumns = columns.join(', ');
        const insertValues = columns.map(key => `[Source].${key}`).join(', ');

        const constraint = [];
        if (Array.isArray(uuid)) {
          uuid.forEach(key => {
            constraint.push(`[Target].${key} = [Source].${key}`);
          });
        } else {
          constraint.push(`[Target].${uuid} = [Source].${uuid}`);
        }

        const query = handleValues(
          `MERGE ${table} AS [Target]
          USING (SELECT ${selectValues}) AS [Source] 
          ON ${constraint.join(' AND ')}
          WHEN MATCHED THEN
            UPDATE SET ${updateValues} 
          WHEN NOT MATCHED THEN
            INSERT (${insertColumns}) VALUES (${insertValues});`,
          handleOptions(options)
        );

        const safeQuery = `MERGE ${table} AS [Target]
          USING (SELECT [--REDACTED--]) 
          ON [Target].[--VALUE--] = [Source].[--VALUE--]
          WHEN MATCHED THEN
            UPDATE SET [--REDACTED--] 
          WHEN NOT MATCHED THEN
            INSERT (${insertColumns}) VALUES [--REDACTED--];`;

        const queryToLog = options && options.logValues ? query : safeQuery;
        console.log(`Executing upsertIf via: ${queryToLog}`);

        resolve(queryHandler(state, query, addRowsToRefs, options));
      });
    } catch (e) {
      connection.close();
      throw e;
    }
  };
}

/**
 * Insert or update multiple records using ON CONFLICT UPDATE and excluded
 * @public
 * @example
 * upsertMany(
 *  'users', 'email', records, { logValues: false }
 * )
 * upsertMany(
 *  'users', ['email', 'phone'], records, { logValues: false }
 * )
 * @function
 * @param {string} table - The target table
 * @param {string} uuid - The uuid column to determine a matching/existing record
 * @param {function} records - A function that takes state and returns an array of records
 * @param {object} options - Optional options argument
 * @returns {Operation}
 */
export function upsertMany(table, uuid, records, options) {
  return state => {
    const { connection } = state;

    try {
      const [recordData] = expandReferences(state, records);

      return new Promise(resolve => {
        if (!recordData || recordData.length === 0) {
          console.log('No records provided; skipping upsert.');
          resolve(state);
        }

        // Note: we select the keys of the FIRST object as the canonical template.
        const columns = Object.keys(recordData[0]);

        const valueSets = recordData.map(
          x => `('${escape(Object.values(x)).join("', '")}')`
        );
        const insertColumns = columns.join(', ');
        const insertValues = columns.map(key => `[Source].${key}`).join(', ');

        const updateValues = columns
          .map(key => `[Target].${key}=[Source].${key}`)
          .join(', ');

        const constraint = [];
        if (Array.isArray(uuid)) {
          uuid.forEach(key => {
            constraint.push(`[Target].${key} = [Source].${key}`);
          });
        } else {
          constraint.push(`[Target].${uuid} = [Source].${uuid}`);
        }

        const query = handleValues(
          `MERGE ${table} AS [Target]
        USING (VALUES ${valueSets.join(', ')}) AS [Source] (${insertColumns})
        ON ${constraint.join(' AND ')}
        WHEN MATCHED THEN
          UPDATE SET ${updateValues}
        WHEN NOT MATCHED THEN
          INSERT (${insertColumns}) VALUES (${insertValues});`,
          handleOptions(options)
        );

        const safeQuery = `MERGE ${table} AS [Target]
        USING (VALUES [--REDACTED--]) AS [SOURCE] (${insertColumns})
        ON [Target].[--VALUE--] = [Source].[--VALUE--]
        WHEN MATCHED THEN
          UPDATE SET [--REDACTED--] 
        WHEN NOT MATCHED THEN
          INSERT (${insertColumns}) VALUES [--REDACTED--];`;

        const queryToLog = options && options.logValues ? query : safeQuery;
        console.log(`Executing upsertMany via: ${queryToLog}`);

        resolve(queryHandler(state, query, addRowsToRefs, options));
      });
    } catch (e) {
      connection.close();
      throw e;
    }
  };
}

/**
 * List the columns of a table in a database.
 * @public
 * @example
 * describeTable('clinic_visits')
 * @function
 * @param {string} tableName - The name of the table to describe
 * @param {object} options - Optional options argument
 * @returns {Operation}
 */
export function describeTable(tableName, options) {
  return state => {
    const { connection } = state;
    const [name] = expandReferences(state, tableName);

    try {
      const query = `SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = '${name}'
          ORDER BY ordinal_position`;

      console.log('Preparing to describe table via:', query);
      return queryHandler(state, query, flattenRows, options);
    } catch (e) {
      connection.close();
      throw e;
    }
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
 * @param {object} options - Optional options argument
 * @returns {Operation}
 */
export function insertTable(tableName, columns, options) {
  return state => {
    const { connection } = state;
    try {
      const [data] = expandReferences(state, columns);

      return new Promise(resolve => {
        if (!data || data.length === 0) {
          console.log('No columns provided; skipping table creation.');
          resolve(state);
          return state;
        }
        const structureData = data
          .map(
            x =>
              `${x.name} ${x.type} ${
                x.hasOwnProperty('default')
                  ? x.type.includes('varchar') || x.type.includes('text')
                    ? `DEFAULT '${x.default}'`
                    : `DEFAULT ${x.default}`
                  : ''
              } ${x.unique ? 'UNIQUE' : ''} ${
                x.identity ? 'PRIMARY KEY IDENTITY (1,1)' : ''
              } ${x.required ? 'NOT NULL' : ''}`
          )
          .join(', ');

        const query = `CREATE TABLE ${tableName} (
        ${structureData}
      );`;

        console.log('Preparing to create table via:', query);
        resolve(queryHandler(state, query, flattenRows, options));
      });
    } catch (e) {
      connection.close();
      throw e;
    }
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
 * @param {object} options - Optional options argument
 * @returns {Operation}
 */
export function modifyTable(tableName, columns, options) {
  return state => {
    const { connection } = state;

    try {
      const [data] = expandReferences(state, columns);

      return new Promise(resolve => {
        if (!data || data.length === 0) {
          console.log('No columns provided; skipping table modification.');
          resolve(state);
          return state;
        }
        const structureData = data
          .map(
            x =>
              `${x.name} ${x.type} ${
                x.hasOwnProperty('default')
                  ? x.type.includes('varchar') || x.type.includes('text')
                    ? `DEFAULT '${x.default}'`
                    : `DEFAULT ${x.default}`
                  : ''
              } ${x.unique ? 'UNIQUE' : ''} ${
                x.identity ? 'IDENTITY (1,1)' : ''
              } ${x.required ? 'NOT NULL' : ''}`
          )
          .join(', ');

        const query = `ALTER TABLE ${tableName} ADD ${structureData};`;

        console.log('Preparing to modify table via:', query);
        resolve(queryHandler(state, query, flattenRows, options));
      });
    } catch (e) {
      connection.close();
      throw e;
    }
  };
}

export {
  alterState,
  combine,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  cursor,
  merge,
  sourceValue,
  as,
} from '@openfn/language-common';
