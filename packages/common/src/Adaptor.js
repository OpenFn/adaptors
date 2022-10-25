import { curry, fromPairs } from 'lodash/fp';
import { JSONPath } from 'jsonpath-plus';
export * as beta from './beta';
export * as http from './http';
export * as dateFns from './dateFns';

/**
 * Execute a sequence of operations.
 * Main outer API for executing expressions.
 * @public
 * @example
 *  execute(
 *    create('foo'),
 *    delete('bar')
 *  )
 * @function
 * @param {Operations} operations - Operations to be performed.
 * @returns {Promise}
 */
export function execute(...operations) {
  return state => {
    const start = Promise.resolve(state);

    return operations.reduce((acc, operation) => {
      return acc.then(operation);
    }, start);
  };
}

/**
 * alias for "fn()"
 * @function
 * @param {Function} func is the function
 * @returns {<Operation>}
 */
export function alterState(func) {
  return fn(func);
}

/**
 * Creates a custom step (or operation) for more flexible job writing.
 * @public
 * @example
 * fn(state => {
 *   // do some things to state
 *   return state;
 * });
 * @function
 * @param {Function} func is the function
 * @returns {<Operation>}
 */
export function fn(func) {
  return state => {
    return func(state);
  };
}

/**
 * Picks out a single value from a JSON object.
 * If a JSONPath returns more than one value for the reference, the first
 * item will be returned.
 * @public
 * @example
 * jsonValue({ a:1 }, 'a')
 * @function
 * @param {object} obj - A valid JSON object.
 * @param {String} path - JSONPath referencing a point in given JSON object.
 * @returns {<Operation>}
 */
export function jsonValue(obj, path) {
  return JSONPath({ path, json: obj })[0];
}

/**
 * Picks out a single value from source data.
 * If a JSONPath returns more than one value for the reference, the first
 * item will be returned.
 * @public
 * @example
 * sourceValue('$.key')
 * @function
 * @param {String} path - JSONPath referencing a point in `state`.
 * @returns {<Operation>}
 */
export function sourceValue(path) {
  return state => {
    return JSONPath({ path, json: state })[0];
  };
}

/**
 * Picks out a value from source data.
 * Will return whatever JSONPath returns, which will always be an array.
 * If you need a single value use `sourceValue` instead.
 * @public
 * @example
 * source('$.key')
 * @function
 * @param {String} path - JSONPath referencing a point in `state`.
 * @returns {Array.<String|Object>}
 */
export function source(path) {
  return state => {
    return JSONPath({ path, json: state });
  };
}

/**
 * Ensures a path points at the data.
 * @public
 * @example
 * dataPath('key')
 * @function
 * @param {string} path - JSONPath referencing a point in `data`.
 * @returns {string}
 */
export function dataPath(path) {
  // Remove prepending `$.`, `$` or `.`, in order to ensure the root of the
  // path starts with `$.data.`
  const cleanPath = path.match(/^[\$\.]*(.+)/)[1];
  return '$.data.'.concat(cleanPath);
}

/**
 * Picks out a single value from the source data object—usually `state.data`.
 * If a JSONPath returns more than one value for the reference, the first
 * item will be returned.
 * @public
 * @example
 * dataValue('key')
 * @function
 * @param {String} path - JSONPath referencing a point in `data`.
 * @returns {<Operation>}
 */
export function dataValue(path) {
  return sourceValue(dataPath(path));
}

/**
 * Ensures a path points at references.
 * @public
 * @example
 * referencePath('key')
 * @function
 * @param {string} path - JSONPath referencing a point in `references`.
 * @returns {string}
 */
export function referencePath(path) {
  // Remove prepending `$.`, `$` or `.`, in order to ensure the root of the
  // path starts with `$.data.`
  const cleanPath = path.match(/^[\$\.]*(.+)/)[1];
  return '$.references'.concat(cleanPath);
}

/**
 * Picks out the last reference value from source data.
 * @public
 * @example
 * lastReferenceValue('key')
 * @function
 * @param {String} path - JSONPath referencing a point in `references`.
 * @returns {<Operation>}
 */
export function lastReferenceValue(path) {
  const lastReferencePath = referencePath('[0]'.concat('.', path));

  return sourceValue(lastReferencePath);
}

/**
 * Scopes an array of data based on a JSONPath.
 * Useful when the source data has `n` items you would like to map to
 * an operation.
 * The operation will receive a slice of the data based of each item
 * of the JSONPath provided.
 * @public
 * @example
 * map("$.[*]",
 *   create("SObject",
 *     field("FirstName", sourceValue("$.firstName"))
 *   )
 * )
 * @function
 * @param {string} path - JSONPath referencing a point in `state.data`.
 * @param {function} operation - The operation needed to be repeated.
 * @param {State} state - Runtime state.
 * @returns {<State>}
 */
export const map = curry(function (path, operation, state) {
  switch (typeof path) {
    case 'string':
      source(path)(state).map(function (data) {
        return operation({ data, references: state.references });
      });
      return state;

    case 'object':
      path.map(function (data) {
        return operation({ data, references: state.references });
      });
      return state;
  }
});

/**
 * Simple switcher allowing other expressions to use either a JSONPath or
 * object literals as a data source.
 * - JSONPath referencing a point in `state`
 * - Object Literal of the data itself.
 * - Function to be called with state.
 * @public
 * @example
 * asData('$.key'| key | callback)
 * @function
 * @param {String|object|function} data
 * @param {object} state - The current state.
 * @returns {array}
 */
export function asData(data, state) {
  switch (typeof data) {
    case 'string':
      return source(data)(state);
    case 'object':
      return data;
    case 'function':
      return data(state);
  }
}

/**
 * Scopes an array of data based on a JSONPath.
 * Useful when the source data has `n` items you would like to map to
 * an operation.
 * The operation will receive a slice of the data based of each item
 * of the JSONPath provided.
 *
 * It also ensures the results of an operation make their way back into
 * the state's references.
 * @public
 * @example
 * each("$.[*]",
 *   create("SObject",
 *     field("FirstName", sourceValue("$.firstName"))
 *   )
 * )
 * @function
 * @param {DataSource} dataSource - JSONPath referencing a point in `state`.
 * @param {Operation} operation - The operation needed to be repeated.
 * @returns {<Operation>}
 */
export function each(dataSource, operation) {
  if (!dataSource) {
    throw new TypeError('dataSource argument for each operation is invalid.');
  }

  return state => {
    return asData(dataSource, state).reduce((state, data, index) => {
      if (state.then) {
        return state.then(state => {
          return operation({ ...state, data, index });
        });
      } else {
        return operation({ ...state, data, index });
      }
    }, state);
  };
}

/**
 * Combines two operations into one
 * @public
 * @example
 * combine(
 *   create('foo'),
 *   delete('bar')
 * )
 * @function
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function combine(...operations) {
  return state => {
    return operations.reduce((state, operation) => {
      if (state.then) {
        return state.then(state => {
          return { ...state, ...operation(state) };
        });
      } else {
        return { ...state, ...operation(state) };
      }
    }, state);
  };
}

/**
 * Adds data from a target object
 * @public
 * @example
 * join('$.key','$.data','newKey')
 * @function
 * @param {String} targetPath - Target path
 * @param {String} sourcePath - Source path
 * @param {String} targetKey - Target Key
 * @returns {<Operation>}
 */
export function join(targetPath, sourcePath, targetKey) {
  return state => {
    return source(targetPath)(state).map(i => {
      return { [targetKey]: sourceValue(sourcePath)(state), ...i };
    });
  };
}

/**
 * Recursively resolves objects that have resolvable values (functions).
 * @public
 * @function
 * @param {object} value - data
 * @param {Function} [skipFilter] - a function which returns true if a value should be skipped
 * @returns {<Operation>}
 */
export function expandReferences(value, skipFilter) {
  return state => {
    if (skipFilter && skipFilter(value)) return value;

    if (Array.isArray(value)) {
      return value.map(v => expandReferences(v)(state));
    }

    if (typeof value == 'object' && !!value) {
      return Object.keys(value).reduce((acc, key) => {
        return { ...acc, [key]: expandReferences(value[key])(state) };
      }, {});
    }

    if (typeof value == 'function') {
      return expandReferences(value(state))(state);
    }
    return value;
  };
}

/**
 * Returns a key, value pair in an array.
 * @public
 * @example
 * field('destination_field_name__c', 'value')
 * @function
 * @param {string} key - Name of the field
 * @param {Value} value - The value itself or a sourceable operation.
 * @returns {<Field>}
 */
export function field(key, value) {
  return [key, value];
}

/**
 * Zips key value pairs into an object.
 * @public
 * @example
 *  fields(list_of_fields)
 * @function
 * @param {Fields} fields - a list of fields
 * @returns {Object}
 */
export function fields(...fields) {
  return fromPairs(fields);
}

/**
 * Merges fields into each item in an array.
 * @public
 * @example
 * merge(
 *   "$.books[*]",
 *   fields(
 *     field( "publisher", sourceValue("$.publisher") )
 *   )
 * )
 * @function
 * @param {DataSource} dataSource
 * @param {Object} fields - Group of fields to merge in.
 * @returns {DataSource}
 */
export function merge(dataSource, fields) {
  return state => {
    const initialData = source(dataSource)(state);
    const additionalData = expandReferences(fields)(state);

    return initialData.reduce((acc, dataItem) => {
      return [...acc, { ...dataItem, ...additionalData }];
    }, []);
  };
}

/**
 * Returns the index of the current array being iterated.
 * To be used with `each` as a data source.
 * @public
 * @example
 * index()
 * @function
 * @returns {<DataSource>}
 */
export function index() {
  return state => {
    return state.index;
  };
}

/**
 * Turns an array into a string, separated by X.
 * @public
 * @example
 * field("destination_string__c", function(state) {
 *   return arrayToString(dataValue("path_of_array")(state), ', ')
 * })
 * @function
 * @param {array} arr - Array of toString'able primatives.
 * @param {string} separator - Separator string.
 * @returns {string}
 */
export function arrayToString(arr, separator) {
  return Array.apply(null, arr).join(separator);
}

/**
 * Ensures primitive data types are wrapped in an array.
 * Does not affect array objects.
 * @public
 * @example
 * each(function(state) {
 *   return toArray( dataValue("path_of_array")(state) )
 * }, ...)
 * @function
 * @param {any} arg - Data required to be in an array
 * @returns {array}
 */
export function toArray(arg) {
  return new Array().concat(arg);
}

/**
 * Prepares next state
 * @public
 * @example
 * composeNextState(state, response)
 * @function
 * @param {State} state - state
 * @param {Object} response - Response to be added
 * @returns {State}
 */
export function composeNextState(state, response) {
  return {
    ...state,
    data: response,
    references: [...state.references, state.data],
  };
}

/**
 * Substitutes underscores for spaces and proper-cases a string
 * @public
 * @example
 * field("destination_string__c", humanProper(state.data.path_to_string))
 * @function
 * @param {string} str - String that needs converting
 * @returns {string}
 */
export function humanProper(str) {
  if (typeof str == 'string') {
    return str.replace(/[_-]/g, ' ').replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return str;
  }
}

export function splitKeys(obj, keys) {
  return Object.keys(obj).reduce(
    ([keep, split], key) => {
      const value = obj[key];

      if (keys.includes(key)) {
        return [keep, { ...split, [key]: value }];
      }

      return [{ ...keep, [key]: value }, split];
    },
    [{}, {}]
  );
}

/**
 * Replaces emojis in a string.
 * @public
 * @example
 * scrubEmojis('Dove🕊️⭐ 29')
 * @function
 * @param {string} text - String that needs to be cleaned
 * @param {string} replacementChars - Characters that replace the emojis
 * @returns {string}
 */
export function scrubEmojis(text, replacementChars) {
  if (!text) return text;
  if (replacementChars == '') {
    console.warn(
      'Removing characters from a string may create injection vulnerabilities;',
      "It's better to replace than remove.",
      'See https://www.unicode.org/reports/tr36/#Deletion_of_Noncharacters'
    );
  } else if (!replacementChars) replacementChars = '\uFFFD';

  const emojisPattern = /(\uFE0F|\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

  return text.replace(emojisPattern, replacementChars);
}

/**
 * Chunks an array into an array of arrays, each with no more than a certain size.
 * @public
 * @example
 * chunk([1,2,3,4,5], 2)
 * @function
 * @param {Object} array - Array to be chunked
 * @param {Integer} chunkSize - The maxiumum size of each chunks
 * @returns {Object}
 */
export function chunk(array, chunkSize) {
  const output = [];
  for (var i = 0, len = array.length; i < len; i += chunkSize)
    output.push(array.slice(i, i + chunkSize));
  return output;
}

/**
 * Deduplicates an array of objects by a unique attribute
 * @public
 * @example
 * dedupArrayOfObjects([{a:1}, {b:2}, {a:1, b:2}], 'a')
 * @function
 * @param {Object} array - Array of objects to be deduplicated
 * @param {Integer} uid - The attribute name on which to deduplicate
 * @returns {Object}
 */
export function dedupArrayOfObjects(array, uid) {
  return Array.from(new Set(array.map(a => a[uid]))).map(id => {
    return array.find(a => a[uid] === id);
  });
}
