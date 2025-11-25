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

export function handleSetNull(options) {
  if (options?.setNull === false) {
    return false;
  }
  return options?.setNull || "'undefined'";
}

export function handleQueryOptions(state, query, options) {
  if (options?.writeSql === true) {
    console.log('Adding prepared SQL to state.queries array.');
    state.queries.push(query);
  }

  if (options?.execute === false) {
    console.log('Not executing query; options.execute === false');
    console.log('Query not executed.');
    return state;
  }
}
