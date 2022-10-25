"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = execute;
exports.alterState = alterState;
exports.fn = fn;
exports.jsonValue = jsonValue;
exports.sourceValue = sourceValue;
exports.source = source;
exports.dataPath = dataPath;
exports.dataValue = dataValue;
exports.referencePath = referencePath;
exports.lastReferenceValue = lastReferenceValue;
exports.asData = asData;
exports.each = each;
exports.combine = combine;
exports.join = join;
exports.expandReferences = expandReferences;
exports.field = field;
exports.fields = fields;
exports.merge = merge;
exports.index = index;
exports.arrayToString = arrayToString;
exports.toArray = toArray;
exports.composeNextState = composeNextState;
exports.humanProper = humanProper;
exports.splitKeys = splitKeys;
exports.scrubEmojis = scrubEmojis;
exports.chunk = chunk;
exports.dedupArrayOfObjects = dedupArrayOfObjects;
exports.dateFns = exports.http = exports.beta = exports.map = void 0;

var _fp = require("lodash/fp");

var _jsonpathPlus = require("jsonpath-plus");

var _beta = _interopRequireWildcard(require("./beta"));

exports.beta = _beta;

var _http = _interopRequireWildcard(require("./http"));

exports.http = _http;

var _dateFns = _interopRequireWildcard(require("./dateFns"));

exports.dateFns = _dateFns;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
function execute(...operations) {
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


function alterState(func) {
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


function fn(func) {
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


function jsonValue(obj, path) {
  return (0, _jsonpathPlus.JSONPath)({
    path,
    json: obj
  })[0];
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


function sourceValue(path) {
  return state => {
    return (0, _jsonpathPlus.JSONPath)({
      path,
      json: state
    })[0];
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


function source(path) {
  return state => {
    return (0, _jsonpathPlus.JSONPath)({
      path,
      json: state
    });
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


function dataPath(path) {
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


function dataValue(path) {
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


function referencePath(path) {
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


function lastReferenceValue(path) {
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


const map = (0, _fp.curry)(function (path, operation, state) {
  switch (typeof path) {
    case 'string':
      source(path)(state).map(function (data) {
        return operation({
          data,
          references: state.references
        });
      });
      return state;

    case 'object':
      path.map(function (data) {
        return operation({
          data,
          references: state.references
        });
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

exports.map = map;

function asData(data, state) {
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


function each(dataSource, operation) {
  if (!dataSource) {
    throw new TypeError('dataSource argument for each operation is invalid.');
  }

  return state => {
    return asData(dataSource, state).reduce((state, data, index) => {
      if (state.then) {
        return state.then(state => {
          return operation({ ...state,
            data,
            index
          });
        });
      } else {
        return operation({ ...state,
          data,
          index
        });
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


function combine(...operations) {
  return state => {
    return operations.reduce((state, operation) => {
      if (state.then) {
        return state.then(state => {
          return { ...state,
            ...operation(state)
          };
        });
      } else {
        return { ...state,
          ...operation(state)
        };
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


function join(targetPath, sourcePath, targetKey) {
  return state => {
    return source(targetPath)(state).map(i => {
      return {
        [targetKey]: sourceValue(sourcePath)(state),
        ...i
      };
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


function expandReferences(value, skipFilter) {
  return state => {
    if (skipFilter && skipFilter(value)) return value;

    if (Array.isArray(value)) {
      return value.map(v => expandReferences(v)(state));
    }

    if (typeof value == 'object' && !!value) {
      return Object.keys(value).reduce((acc, key) => {
        return { ...acc,
          [key]: expandReferences(value[key])(state)
        };
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


function field(key, value) {
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


function fields(...fields) {
  return (0, _fp.fromPairs)(fields);
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


function merge(dataSource, fields) {
  return state => {
    const initialData = source(dataSource)(state);
    const additionalData = expandReferences(fields)(state);
    return initialData.reduce((acc, dataItem) => {
      return [...acc, { ...dataItem,
        ...additionalData
      }];
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


function index() {
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


function arrayToString(arr, separator) {
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


function toArray(arg) {
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


function composeNextState(state, response) {
  return { ...state,
    data: response,
    references: [...state.references, state.data]
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


function humanProper(str) {
  if (typeof str == 'string') {
    return str.replace(/[_-]/g, ' ').replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return str;
  }
}

function splitKeys(obj, keys) {
  return Object.keys(obj).reduce(([keep, split], key) => {
    const value = obj[key];

    if (keys.includes(key)) {
      return [keep, { ...split,
        [key]: value
      }];
    }

    return [{ ...keep,
      [key]: value
    }, split];
  }, [{}, {}]);
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


function scrubEmojis(text, replacementChars) {
  if (!text) return text;

  if (replacementChars == '') {
    console.warn('Removing characters from a string may create injection vulnerabilities;', "It's better to replace than remove.", 'See https://www.unicode.org/reports/tr36/#Deletion_of_Noncharacters');
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


function chunk(array, chunkSize) {
  const output = [];

  for (var i = 0, len = array.length; i < len; i += chunkSize) output.push(array.slice(i, i + chunkSize));

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


function dedupArrayOfObjects(array, uid) {
  return Array.from(new Set(array.map(a => a[uid]))).map(id => {
    return array.find(a => a[uid] === id);
  });
}