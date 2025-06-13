import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import sql from 'mssql';
import {
  createConnection,
  cleanupState,
  addRowsToRefs,
  flattenRows,
  composeNextState,
  queryHandler,
  escapeQuote,
  handleOptions,
  handleValues,
} from './util';

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
 * Execute an SQL statement
 * @public
 * @example
 * query('SELECT * FROM users', { logValues: true })
 * @function
 * @param {string} query - The SQL query to execute
 * @param {object} options - Optional options argument
 * @returns {Operation}
 */
export function query(query, options) {
  return state => {
    const { connection } = state;

    try {
      const [resolvedQuery, resolvedOptions] = expandReferences(
        state,
        query,
        options
      );

      console.log(`Preparing to execute sql statement: ${resolvedQuery}`);
      return queryHandler(
        state,
        resolvedQuery,
        composeNextState,
        resolvedOptions
      );
    } catch (e) {
      // Don't try to close the connection here as it's a pool
      throw e;
    }
  };
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
 * @returns {Operation}
 */
export function findValue(filter) {
  return state => {
    const { connection } = state;

    const { uuid, relation, where, operator } = filter;
    const [whereData, operatorData] = expandReferences(state, where, operator);

    try {
      const request = connection.request();
      let conditionsArray = [];
      let params = {};

      for (let key in whereData) {
        const paramName = `@${key}`;
        conditionsArray.push(
          `${key} ${operatorData ? operatorData[key] : '='} ${paramName}`
        );
        params[paramName] = whereData[key];
      }

      const condition =
        conditionsArray.length > 0
          ? `WHERE ${conditionsArray.join(' AND ')}`
          : '';

      const query = sql`
        SELECT ${uuid} 
        FROM ${relation} 
        ${condition}
      `;

      console.log('Preparing to execute sql statement');
      return request.query(query).then(result => {
        if (result.recordset.length > 0) {
          return result.recordset[0][uuid];
        }
        return undefined;
      });
    } catch (e) {
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
      const [resolvedRecord] = expandReferences(state, record);
      const columns = Object.keys(resolvedRecord).sort();
      const values = columns.map(key => resolvedRecord[key]);

      const query = sql`
        INSERT INTO ${table} (${columns.join(', ')})
        VALUES (${values})
      `;

      const safeQuery = `INSERT INTO ${table} (${columns.join(
        ', '
      )}) VALUES [--REDACTED--]`;

      return new Promise((resolve, reject) => {
        const queryToLog = options && options.logValues ? query : safeQuery;
        console.log(`Executing insert via: ${queryToLog}`);

        resolve(queryHandler(state, query, addRowsToRefs, options));
      });
    } catch (e) {
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
      const [resolvedRecords] = expandReferences(state, records);
      const columns = Object.keys(resolvedRecords[0]);
      const values = resolvedRecords.map(record =>
        columns.map(col => record[col])
      );

      const query = sql`
        INSERT INTO ${table} (${columns.join(', ')})
        VALUES ${values}
      `;

      const safeQuery = `INSERT INTO ${table} (${columns.join(
        ', '
      )}) VALUES [--REDACTED--]`;

      return new Promise((resolve, reject) => {
        const queryToLog = options && options.logValues ? query : safeQuery;
        console.log(`Executing insertMany via: ${queryToLog}`);

        resolve(queryHandler(state, query, addRowsToRefs, options));
      });
    } catch (e) {
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
      const [resolvedRecord] = expandReferences(state, record);
      const columns = Object.keys(resolvedRecord).sort();
      const values = columns.map(key => resolvedRecord[key]);

      const sourceColumns = columns.map(col => `[Source].${col}`).join(', ');
      const updateSet = columns
        .map(col => `[Target].${col} = [Source].${col}`)
        .join(', ');

      const constraint = Array.isArray(uuid)
        ? uuid.map(key => `[Target].${key} = [Source].${key}`).join(' AND ')
        : `[Target].${uuid} = [Source].${uuid}`;

      const query = sql`
        MERGE ${table} AS [Target]
        USING (SELECT ${values} AS ${columns.join(', ')}) AS [Source]
        ON ${constraint}
        WHEN MATCHED THEN
          UPDATE SET ${updateSet}
        WHEN NOT MATCHED THEN
          INSERT (${columns.join(', ')}) VALUES (${sourceColumns})
      `;

      const safeQuery = `MERGE ${table} AS [Target] USING (SELECT [--REDACTED--]) AS [Source] ON [Target].[--VALUE--] = [Source].[--VALUE--] WHEN MATCHED THEN UPDATE SET [--REDACTED--] WHEN NOT MATCHED THEN INSERT (${columns.join(
        ', '
      )}) VALUES [--REDACTED--]`;

      return new Promise((resolve, reject) => {
        const queryToLog = options && options.logValues ? query : safeQuery;
        console.log(`Executing upsert via: ${queryToLog}`);

        resolve(queryHandler(state, query, addRowsToRefs, options));
      });
    } catch (e) {
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
      const [resolvedRecord, resolvedLogical] = expandReferences(
        state,
        record,
        logical
      );

      return new Promise((resolve, reject) => {
        if (!resolvedLogical) {
          console.log(`Skipping upsert for ${uuid}.`);
          resolve(state);
          return state;
        }

        const columns = Object.keys(resolvedRecord).sort();
        const values = columns.map(key => resolvedRecord[key]);

        const sourceColumns = columns.map(col => `[Source].${col}`).join(', ');
        const updateSet = columns
          .map(col => `[Target].${col} = [Source].${col}`)
          .join(', ');

        const constraint = Array.isArray(uuid)
          ? uuid.map(key => `[Target].${key} = [Source].${key}`).join(' AND ')
          : `[Target].${uuid} = [Source].${uuid}`;

        const query = sql`
          MERGE ${table} AS [Target]
          USING (SELECT ${values} AS ${columns.join(', ')}) AS [Source]
          ON ${constraint}
          WHEN MATCHED THEN
            UPDATE SET ${updateSet}
          WHEN NOT MATCHED THEN
            INSERT (${columns.join(', ')}) VALUES (${sourceColumns})
        `;

        const safeQuery = `MERGE ${table} AS [Target] USING (SELECT [--REDACTED--]) AS [Source] ON [Target].[--VALUE--] = [Source].[--VALUE--] WHEN MATCHED THEN UPDATE SET [--REDACTED--] WHEN NOT MATCHED THEN INSERT (${columns.join(
          ', '
        )}) VALUES [--REDACTED--]`;

        const queryToLog = options && options.logValues ? query : safeQuery;
        console.log(`Executing upsertIf via: ${queryToLog}`);

        resolve(queryHandler(state, query, addRowsToRefs, options));
      });
    } catch (e) {
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
      const [resolvedRecords] = expandReferences(state, records);

      return new Promise((resolve, reject) => {
        if (!resolvedRecords || resolvedRecords.length === 0) {
          console.log('No records provided; skipping upsert.');
          resolve(state);
        }

        const columns = Object.keys(resolvedRecords[0]);
        const values = resolvedRecords.map(record =>
          columns.map(col => record[col])
        );

        const sourceColumns = columns.map(col => `[Source].${col}`).join(', ');
        const updateSet = columns
          .map(col => `[Target].${col} = [Source].${col}`)
          .join(', ');

        const constraint = Array.isArray(uuid)
          ? uuid.map(key => `[Target].${key} = [Source].${key}`).join(' AND ')
          : `[Target].${uuid} = [Source].${uuid}`;

        const query = sql`
          MERGE ${table} AS [Target]
          USING (VALUES ${values}) AS [Source] (${columns.join(', ')})
          ON ${constraint}
          WHEN MATCHED THEN
            UPDATE SET ${updateSet}
          WHEN NOT MATCHED THEN
            INSERT (${columns.join(', ')}) VALUES (${sourceColumns})
        `;

        const safeQuery = `MERGE ${table} AS [Target] USING (VALUES [--REDACTED--]) AS [Source] (${columns.join(
          ', '
        )}) ON [Target].[--VALUE--] = [Source].[--VALUE--] WHEN MATCHED THEN UPDATE SET [--REDACTED--] WHEN NOT MATCHED THEN INSERT (${columns.join(
          ', '
        )}) VALUES [--REDACTED--]`;

        const queryToLog = options && options.logValues ? query : safeQuery;
        console.log(`Executing upsertMany via: ${queryToLog}`);

        resolve(queryHandler(state, query, addRowsToRefs, options));
      });
    } catch (e) {
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
    const [resolvedTableName] = expandReferences(state, tableName);

    try {
      const query = sql`
        SELECT column_name
        FROM information_schema.columns 
        WHERE table_name = ${resolvedTableName}
        ORDER BY ordinal_position
      `;

      console.log('Preparing to describe table via:', query);
      return queryHandler(state, query, flattenRows, options);
    } catch (e) {
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

      return new Promise((resolve, reject) => {
        if (!data || data.length === 0) {
          console.log('No columns provided; skipping table creation.');
          resolve(state);
          return state;
        }

        const structureData = data
          .map(x => {
            const columnDef = [
              x.name,
              x.type,
              x.hasOwnProperty('default')
                ? x.type.includes('varchar') || x.type.includes('text')
                  ? `DEFAULT '${x.default}'`
                  : `DEFAULT ${x.default}`
                : '',
              x.unique ? 'UNIQUE' : '',
              x.identity ? 'PRIMARY KEY IDENTITY (1,1)' : '',
              x.required ? 'NOT NULL' : '',
            ]
              .filter(Boolean)
              .join(' ');
            return columnDef;
          })
          .join(', ');

        const query = sql`
          CREATE TABLE ${tableName} (
            ${structureData}
          )
        `;

        console.log('Preparing to create table via:', query);
        resolve(queryHandler(state, query, flattenRows, options));
      });
    } catch (e) {
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

      return new Promise((resolve, reject) => {
        if (!data || data.length === 0) {
          console.log('No columns provided; skipping table modification.');
          resolve(state);
          return state;
        }

        const structureData = data
          .map(x => {
            const columnDef = [
              x.name,
              x.type,
              x.hasOwnProperty('default')
                ? x.type.includes('varchar') || x.type.includes('text')
                  ? `DEFAULT '${x.default}'`
                  : `DEFAULT ${x.default}`
                : '',
              x.unique ? 'UNIQUE' : '',
              x.identity ? 'IDENTITY (1,1)' : '',
              x.required ? 'NOT NULL' : '',
            ]
              .filter(Boolean)
              .join(' ');
            return columnDef;
          })
          .join(', ');

        const query = sql`
          ALTER TABLE ${tableName} ADD ${structureData}
        `;

        console.log('Preparing to modify table via:', query);
        resolve(queryHandler(state, query, flattenRows, options));
      });
    } catch (e) {
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
  http,
  lastReferenceValue,
  cursor,
  merge,
  sourceValue,
} from '@openfn/language-common';
