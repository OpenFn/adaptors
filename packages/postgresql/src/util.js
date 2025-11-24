import { composeNextState } from '@openfn/language-common';
// function connect(state) {
//   client.connect();
//   return state;
// }

// function disconnect(state) {
//   client.end();
//   return state;
// }
export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function handleValues(sqlString, nullString) {
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

export function handleOptions(options) {
  if (options && options.setNull === false) {
    return false;
  }
  return (options && options.setNull) || "'undefined'";
}

export function queryHandler(state, query, options, client) {
  return new Promise((resolve, reject) => {
    if (options?.writeSql) {
      console.log('Adding prepared SQL to state.queries array.');
      state.queries.push(query);
    }

    if (options?.execute === false) {
      console.log('Not executing query; options.execute === false');
      resolve('Query not executed.');
      return state;
    }

    client.query(query, (err, result) => {
      if (err) {
        reject(err);
        client.end();
      } else {
        console.log(
          `${result.command} succeeded, rowCount: ${result.rowCount}`
        );
        resolve(result);
      }
    });
  }).then(response => {
    const nextState = {
      ...composeNextState(state, response.rows),
      response,
    };

    return nextState;
  });
}
