import { JSONPath } from 'jsonpath-plus';
import { parse } from 'csv-parse';
import { Readable } from 'node:stream';

import { request } from 'undici';
import dateFns from 'date-fns';
import _ from 'lodash';

import { expandReferences, parseDate } from './util';

const schemaCache = {};

/**
 * Lodash utility library.
 * All lodash v4.17 functions are available on the `_` namespace, eg,
 * `_.map`, `_.cloneDeep`, etc.
 *
 * @see https://lodash.com/docs/
 * @public
 * @function
 * @alias lodash
 * @example <caption>Split an array into chunks of 2 items each</caption>
 * fn(state => {
 *   const items = [1, 2, 3, 4, 5];
 *   const chunks = lodash.chunk(items, 2);
 *   return { ...state, chunks };
 * });
 */
export { _ };

/**
 * Execute a sequence of operations.
 * Main outer API for executing expressions.
 * @public
 * @example
 *  execute(
 *    create('foo'),
 *    delete('bar')
 *  )
 * @private
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
 * @returns {Operation}
 */
export function alterState(func) {
  return fn(func);
}

/**
 * Creates a custom step (or operation) for more flexible job writing.
 * @public
 * @function
 * @example
 * fn(state => {
 *   // do some things to state
 *   return state;
 * });
 * @param {Function} func is the function
 * @returns {Operation}
 */
export function fn(func) {
  return state => {
    return func(state);
  };
}

/**
 * Execute a function only when the condition returns true
 * @public
 * @function
 * @example
 * fnIf((state) => state?.data?.name, get("https://example.com"));
 * @param {Boolean} condition - The condition that returns true
 * @param {Operation} operation - The operation needed to be executed.
 * @returns {Operation}
 */
export function fnIf(condition, operation) {
  return state => {
    const [resolvedCondition] = expandReferences(state, condition);

    return resolvedCondition ? operation(state) : state;
  };
}

/**
 * Picks out a single value from a JSON object.
 * If a JSONPath returns more than one value for the reference, the first
 * item will be returned.
 * @public
 * @function
 * @example
 * jsonValue({ a:1 }, 'a')
 * @param {object} obj - A valid JSON object.
 * @param {String} path - JSONPath referencing a point in given JSON object.
 * @returns {Operation}
 */
export function jsonValue(obj, path) {
  return JSONPath({ path, json: obj })[0];
}

/**
 * Picks out a single value from source data.
 * If a JSONPath returns more than one value for the reference, the first
 * item will be returned.
 * @public
 * @function
 * @example
 * sourceValue('$.key')
 * @param {String} path - JSONPath referencing a point in `state`.
 * @returns {Operation}
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
 * @function
 * @example
 * source('$.key')
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
 * @function
 * @example
 * dataPath('key')
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
 * @function
 * @example
 * dataValue('key')
 * @param {String} path - JSONPath referencing a point in `data`.
 * @returns {Operation}
 */
export function dataValue(path) {
  return sourceValue(dataPath(path));
}

/**
 * Ensures a path points at references.
 * @public
 * @function
 * @example
 * referencePath('key')
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
 * @function
 * @example
 * lastReferenceValue('key')
 * @param {String} path - JSONPath referencing a point in `references`.
 * @returns {Operation}
 */
export function lastReferenceValue(path) {
  const lastReferencePath = referencePath('[0]'.concat('.', path));

  return sourceValue(lastReferencePath);
}

/**
 * Iterates over a collection of items and returns a new array of mapped values,
 * like Javascript's `Array.map()` function.
 *
 * Each item in the source array will be passed into the callback function. The returned value
 * will be added to the new array. The callback is passed the original item, the current index
 * in the source array (ie, the nth item number), and the state object.
 *
 * Writes a new array to `state.data` with transformed values.c array.
 * @public
 * @function
 * @example <caption> Transform an array of items in state</caption>
 * map($.items', (data, index, state) => {
 *   return {
 *     id: index + 1,
 *     name: data.name,
 *     createdAt: state.cursor,
 *   };
 * });
 * @example <caption>Map items asynchronously (e.g. fetch extra info)</caption>
 * map($.items, async (data, index, state) => {
 *   const userInfo = await fetchUserInfo(data.userId);
 *   return {
 *     id: index + 1,
 *     name: data.name,
 *     extra: userInfo,
 *   };
 * });
 * @param {string|Array} path - An array of items or a a JSONPath string which points to an array of items.
 * @param {function} callback - The mapping function, invoked with `(data, index, state)` for each item in the array.
 * @returns {State}
 */
export const map = function (path, callback) {
  return async state => {
    const results = [];
    const values = typeof path === 'string' ? source(path)(state) : path;

    let index = 0;
    for (const item of values) {
      const value = await callback(item, index++, state);
      results.push(value);
    }

    return { ...state, data: results };
  };
};

/**
 * Simple switcher allowing other expressions to use either a JSONPath or
 * object literals as a data source.
 * - JSONPath referencing a point in `state`
 * - Object Literal of the data itself.
 * - Function to be called with state.
 * @public
 * @function
 * @example
 * asData('$.key'| key | callback)
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
 * Iterates over an array of items and invokes an operation upon each one, where the state
 * object is _scoped_ so that state.data is the item under iteration.
 * The rest of the state object is untouched and can be referenced as usual.
 * You can pass an array directly, or use lazy state or a JSONPath string to
 * reference a slice of state.
 * @public
 * @function
 * @example <caption>Using lazy state ($) to iterate over items in state.data and pass each into an "insert" operation</caption>
 * each(
 *   $.data,
 *   // Inside the callback operation, `$.data` is scoped to the item under iteration
 *   insert("patient", {
 *     patient_name: $.data.properties.case_name,
 *     patient_id: $.data.case_id,
 *   })
 * );
 * @example <caption>Iterate over items in state.data and pass each one into an "insert" operation</caption>
 * each(
 *   $.data,
 *   insert("patient", (state) => ({
 *     patient_id: state.data.case_id,
 *     ...state.data
 *   }))
 * );
 * @example <caption>Using JSON path to iterate over items in state.data and pass each one into an "insert" operation</caption>
 * each(
 *   "$.data[*]",
 *   insert("patient", (state) => ({
 *     patient_name: state.data.properties.case_name,
 *     patient_id: state.data.case_id,
 *   }))
 * );
 * @param {DataSource} dataSource - JSONPath referencing a point in `state`.
 * @param {Operation} operation - The operation needed to be repeated.
 * @returns {Operation}
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
 * @function
 * @example
 * combine(
 *   create('foo'),
 *   delete('bar')
 * )
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
 * @function
 * @example
 * join('$.key','$.data','newKey')
 * @param {String} targetPath - Target path
 * @param {String} sourcePath - Source path
 * @param {String} targetKey - Target Key
 * @returns {Operation}
 */
export function join(targetPath, sourcePath, targetKey) {
  return state => {
    return source(targetPath)(state).map(i => {
      return { [targetKey]: sourceValue(sourcePath)(state), ...i };
    });
  };
}

/**
 * Returns a key, value pair in an array.
 * @public
 * @function
 * @example
 * field('destination_field_name__c', 'value')
 * @param {string} key - Name of the field
 * @param {Value} value - The value itself or a sourceable operation.
 * @returns {Field}
 */
export function field(key, value) {
  return [key, value];
}

/**
 * Zips key value pairs into an object.
 * @public
 * @function
 * @example
 *  fields(list_of_fields)
 * @param {Fields} fields - a list of fields
 * @returns {Object}
 */
export function fields(...fields) {
  return _.fromPairs(fields);
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
 * @public
 * @param {DataSource} dataSource
 * @param {Object} fields - Group of fields to merge in.
 * @returns {DataSource}
 */
export function merge(dataSource, fields) {
  return state => {
    const initialData = source(dataSource)(state);
    const [additionalData] = expandReferences(state, fields);

    return initialData.reduce((acc, dataItem) => {
      return [...acc, { ...dataItem, ...additionalData }];
    }, []);
  };
}

/**
 * Groups an array of objects by a specified key path.
 * @public
 * @example
 * const users = [
 *   { name: 'Alice', age: 25, city: 'New York' },
 *   { name: 'Bob', age: 30, city: 'San Francisco' },
 *   { name: 'Charlie', age: 25, city: 'New York' },
 *   { name: 'David', age: 30, city: 'San Francisco' }
 * ];
 * group(users, 'city');
 * // state is { data: { 'New York': [/Alice, Charlie/], 'San Francisco': [ /Bob, David / ] }
 * @function
 * @public
 * @param {Object[]} arrayOfObjects - The array of objects to be grouped.
 * @param {string} keyPath - The key path to group by.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function group(arrayOfObjects, keyPath, callback = s => s) {
  return state => {
    const [resolvedArray, resolvedKeyPath] = expandReferences(
      state,
      arrayOfObjects,
      keyPath
    );
    const results = _.groupBy(resolvedArray, item =>
      _.get(item, resolvedKeyPath)
    );
    return callback({ ...state, data: _.omit(results, [undefined]) });
  };
}

/**
 * Returns the index of the current array being iterated.
 * To be used with `each` as a data source.
 * @public
 * @function
 * @example
 * index()
 * @returns {DataSource}
 */
export function index() {
  return state => {
    return state.index;
  };
}

/**
 * Turns an array into a string, separated by X.
 * @public
 * @function
 * @example
 * field("destination_string__c", function(state) {
 *   return arrayToString(dataValue("path_of_array")(state), ', ')
 * })
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
 * @function
 * @example
 * each(function(state) {
 *   return toArray( dataValue("path_of_array")(state) )
 * }, ...)
 * @param {any} arg - Data required to be in an array
 * @returns {array}
 */
export function toArray(arg) {
  return new Array().concat(arg);
}

/**
 * Prepares next state
 * @public
 * @function
 * @example
 * composeNextState(state, response)
 * @param {State} state - state
 * @param {Object} response - Response to be added
 * @returns {State}
 */
export function composeNextState(state, response) {
  if (!state.references) {
    state.references = [];
  }
  return {
    ...state,
    data: response,
    references: [...state.references, state.data],
  };
}

/**
 * Substitutes underscores for spaces and proper-cases a string
 * @public
 * @function
 * @example
 * field("destination_string__c", humanProper(state.data.path_to_string))
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

/**
 * Splits an object into two objects based on a list of keys.
 * The first object contains the keys that are not in the list,
 * and the second contains the keys that are.
 * @public
 * @function
 * @param {Object} obj - The object to split.
 * @param {string[]} keys - List of keys to split on.
 * @returns {Object[]} - Tuple of objects, first object contains keys not in list, second contains keys that are.
 */
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
 * @function
 * @example
 * scrubEmojis('Dove🕊️⭐ 29')
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
  }

  const newChars =
    replacementChars || replacementChars == '' ? replacementChars : '\uFFFD';

  const emojisPattern =
    /(\uFE0F|\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

  return text.replace(emojisPattern, newChars);
}

/**
 * Chunks an array into an array of arrays, each with no more than a certain size.
 * @public
 * @function
 * @example
 * chunk([1,2,3,4,5], 2)
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

const getParser = (csvData, options) => {
  if (typeof csvData === 'string') {
    return parse(csvData, options);
  }

  let stream = csvData;
  if (csvData instanceof ReadableStream) {
    stream = Readable.from(csvData);
  }
  return stream.pipe(parse(options));
};

/**
 * Takes a CSV file string or stream and parsing options as input, and returns a promise that
 * resolves to the parsed CSV data as an array of objects.
 * Options for `parsingOptions` include:
 * - `delimiter` {string/Buffer/[string/Buffer]} - Defines the character(s) used to delineate the fields inside a record. Default: `','`
 * - `quote` {string/Buffer/[string/Buffer]} - Defines the characters used to surround a field. Default: `'"'`
 * - `escape` {Buffer/string/null/boolean} - Set the escape character as one character/byte only. Default: `"`
 * - `columns` {boolean / array / function} - Generates record in the form of object literals. Default: `true`
 * - `bom` {boolean} - Strips the {@link https://en.wikipedia.org/wiki/Byte_order_mark byte order mark (BOM)} from the input string or buffer. Default: `true`
 * - `trim` {boolean} - Ignore whitespace characters immediately around the `delimiter`. Default: `true`
 * - `ltrim` {boolean} - Ignore whitespace characters from the left side of a CSV field. Default: `true`
 * - `rtrim` {boolean} - Ignore whitespace characters from the right side of a CSV field. Default: `true`
 * - `chunkSize` {number} - The size of each chunk of CSV data. Default: `Infinity`
 * - `skip_empty_lines` {boolean} - Ignore empty lines in the CSV file. Default: `true`
 * @public
 * @function
 * @param {String | Stream} csvData - A CSV string or a readable stream
 * @param {Object} [parsingOptions] - Optional. Parsing options for converting CSV to JSON.
 * @param {function} [callback] - (Optional) callback function. If used it will be called state and an array of rows.
 * @returns {Operation} The function returns a Promise that resolves to the result of parsing a CSV `stringOrStream`.
 */
export function parseCsv(csvData, parsingOptions = {}, callback) {
  const defaultOptions = {
    delimiter: ',',
    quote: '"',
    escape: '"',
    columns: true,
    bom: true,
    trim: true,
    ltrim: true,
    rtrim: true,
    chunkSize: Infinity,
    skip_empty_lines: true,
  };

  return async state => {
    const [resolvedCsvData, resolvedParsingOptions] = expandReferences(
      state,
      csvData,
      parsingOptions
    );

    const filteredOptions = Object.fromEntries(
      Object.entries(resolvedParsingOptions).filter(
        ([key]) => key in defaultOptions
      )
    );

    const options = { ...defaultOptions, ...filteredOptions };

    if (options.chunkSize < 1) {
      throw new Error('chunkSize must be at least 1');
    }

    let buffer = [];

    const parser = getParser(resolvedCsvData, options);

    const flushBuffer = async currentState => {
      const nextState = callback
        ? await callback(currentState, buffer)
        : composeNextState(currentState, buffer);

      buffer = [];

      return [nextState, buffer];
    };

    let result = state;
    for await (const record of parser) {
      buffer.push(record);
      if (buffer.length === options.chunkSize) {
        const [nextState, nextBuffer] = await flushBuffer(result);
        result = nextState;
        buffer = nextBuffer;
      }
    }
    if (buffer.length) {
      [result] = await flushBuffer(result);
    }
    return result;
  };
}

const ajvVersions = {};

// We need to import different versions of AJV depending on the schema
// version - which is handled by this function
const getAjvVersion = async schema => {
  if (/^https?:\/\/json-schema.org\/draft\/2019/.test(schema)) {
    if (!ajvVersions['2019']) {
      const Ajv = (await import('ajv/dist/2019.js')).default;
      ajvVersions['2019'] = new Ajv();
    }
    return ajvVersions['2019'];
  }
  if (/^https?:\/\/json-schema.org\/draft\/2020/.test(schema)) {
    if (!ajvVersions['2020']) {
      const Ajv = (await import('ajv/dist/2020.js')).default;
      ajvVersions['2020'] = new Ajv();
    }
    return ajvVersions['2020'];
  }

  if (!ajvVersions['default']) {
    const Ajv = (await import('ajv')).default;
    ajvVersions['default'] = new Ajv();
  }

  return ajvVersions['default'];
};

/**
 * Validate against a JSON schema. Any erors are written to an array at `state.validationErrors`.
 * Schema can be passed directly, loaded as a JSON path from state, or loaded from a URL
 * Data can be passed directly or loaded as a JSON path from state.
 * By default, schema is loaded from `state.schema` and data from `state.data`.
 * @pubic
 * @function
 * @param {string|object} schema - The schema, path or URL to validate against
 * @param {string|object} data - The data or path to validate
 * @example <caption>Validate `state.data` with `state.schema`</caption>
 * validate()
 * @example <caption>Validate form data at `state.form` with a schema from a URL</caption>
 * validate("https://www.example.com/schema/record", "form")
 * @example <caption>Validate the each item in `state.records` with a schema from a URL</caption>
 * each("records[*]", validate("https://www.example.com/schema/record"))
 * @returns {Operation}
 */
export function validate(schema = 'schema', data = 'data') {
  return async state => {
    if (!state.validationErrors) {
      state.validationErrors = [];
    }

    const resolvedData = resolveData();
    const resolvedSchema = await resolveSchema();
    // TODO: warn if the schema doesn't have an id? Does it matter? Maybe, if you're using multiple id-less schemas
    const schemaId = resolvedSchema.$id || 'schema';
    if (!schemaCache[schemaId]) {
      const ajv = await getAjvVersion(resolvedSchema.$schema);
      schemaCache[schemaId] = ajv.compile(resolvedSchema);
    }

    const validate = schemaCache[schemaId];

    if (!validate(resolvedData)) {
      state.validationErrors.push({
        data: state.data,
        errors: validate.errors,
      });
    }
    return state;

    // Schema can be a url, jsonpath or object; or a function resolving to any of these
    async function resolveSchema() {
      // TODO hmm, I don't really want to expand schema if it's an object
      const [schemaOrUrl] = expandReferences(state, schema);

      if (typeof schemaOrUrl === 'string') {
        try {
          // Check if the schema is a URL - in which case we fetch it
          const url = new URL(schemaOrUrl);
          const response = await request(url);
          return response.body.json();
        } catch (e) {
          if (e instanceof TypeError) {
            // URL throws a TypeError if it's not a valid url, so we'll treat the string as a json path instead
            return JSONPath({ path: schemaOrUrl, json: state })[0];
          } else {
            // error fetching the url
            console.error('Error fetching schema from ', schemaOrUrl);
            console.error(e);
          }
        }
      }
      // schema is an object
      return schemaOrUrl;
    }

    // data can be a jsonpath or object; or function resolving to any of these
    function resolveData() {
      const [d] = expandReferences(state, data);

      if (typeof d === 'string') {
        return JSONPath({ path: d, json: state })[0];
      }
      return d;
    }
  };
}

let cursorStart = undefined;
let cursorKey = 'cursor';

/**
 * Sets a cursor property on state.
 * Supports natural language dates like `now`, `today`, `yesterday`, `n hours ago`, `n days ago`, and `start`,
 * which will be converted relative to the environment (ie, the Lightning or CLI locale). Custom timezones
 * are not yet supported.
 * You can provide a formatter to customise the final cursor value, which is useful for normalising
 * different inputs. The custom formatter runs after natural language date conversion.
 * See the usage guide at {@link https://docs.openfn.org/documentation/jobs/job-writing-guide#using-cursors}
 * @public
 * @function
 * @example <caption>Use a cursor from state if present, or else use the default value</caption>
 * cursor($.cursor, { defaultValue: 'today' })
 * @example <caption>Use a pagination cursor</caption>
 * cursor(22)
 * @param {any} value - the cursor value. Usually an ISO date, natural language date, or page number
 * @param {object} options - options to control the cursor.
 * @param {string} options.key - set the cursor key. Will persist through the whole run.
 * @param {any} options.defaultValue - the value to use if value is falsy
 * @param {Function} options.format - custom formatter for the final cursor value
 * @returns {Operation}
 */
export function cursor(value, options = {}) {
  return state => {
    const { format, ...optionsWithoutFormat } = options;
    const [resolvedValue, resolvedOptions] = expandReferences(
      state,
      value,
      optionsWithoutFormat
    );

    const {
      defaultValue, // if there is no cursor on state, this will be used
      key, // the key to use on state
      // format // pulled out before reference resolution else or it'll be treated as a ref!
    } = resolvedOptions;

    if (key) {
      cursorKey = key;
    }

    if (!cursorStart) {
      cursorStart = new Date();
    }

    const cursor = resolvedValue ?? defaultValue;
    if (typeof cursor === 'string') {
      const date = parseDate(cursor, cursorStart);
      if (date instanceof Date && date.toString !== 'Invalid Date') {
        state[cursorKey] = format?.(date) ?? date.toISOString();

        const formatted = format
          ? state[cursorKey]
          : // If no custom formatter is provided,
            // Log the converted date in a very international, human-friendly format
            // See https://date-fns.org/v3.6.0/docs/format
            dateFns.format(date, 'HH:MM d MMM yyyy (OOO)');

        console.log(`Setting ${cursorKey} "${cursor}" to: ${formatted}`);
        return state;
      }
    }
    state[cursorKey] = format?.(cursor) ?? cursor;
    console.log(`Setting ${cursorKey} to:`, state[cursorKey]);

    return state;
  };
}

/**
 * Asserts the given expression or function resolves to `true`, or else throws an exception. Optionally accepts and error message.
 * @public
 * @function
 * @example
 * assert('a' === 'b', '"a" is not equal to "b"')
 * @param {any} expression  - The expression or function to be evaluated.
 * @param {string} errorMessage - The error message thrown in case of a failed state.
 * @returns {operation}
 */
export function assert(expression, errorMessage) {
  return state => {
    const [resolvedValue, resolvedErrorMessage] = expandReferences(
      state,
      expression,
      errorMessage
    );

    if (!resolvedValue) {
      throw new Error(
        resolvedErrorMessage ||
          `assertion statement failed with ${resolvedValue}`
      );
    }

    return state;
  };
}

/**
 * Outputs a message, like calling `console.log`. Use this at the top level of your job code, but not inside callbacks.
 * @public
 * @function
 * @example <caption>Log values from state</caption>
 * log('Patient List::', $.patients);
 * @example <caption>Use console.log inside a callback or fn block</caption>
 * fn((state) => {
 *   console.log(state.data);
 *   return state;
 * })
 * @param {any} args - A value or message to display in the logs
 * @returns {Operation}
 */
export function log(...args) {
  return state => {
    const [resolvedArgs] = expandReferences(state, args);
    console.log(...resolvedArgs);
    return state;
  };
}

/**
 * Outputs a message to the console with the debug log level. This is usually filtered out by default. Use this at the top level of your job code, but not inside callbacks.
 * @public
 * @function
 * @example <caption>Log values from state</caption>
 * debug('Patient List::', $.patients);
 * @example <caption>Use console.debug inside a callback or fn block</caption>
 * fn((state) => {
 *   console.debug(state.data);
 *   return state;
 * })

 * @param {any} args - A value or message to display in the logs
 * @returns {Operation}
 */
export function debug(...args) {
  return state => {
    const [resolvedArgs] = expandReferences(state, args);
    console.debug(...resolvedArgs);
    return state;
  };
}

/**
 * Run an operation and save the result to a custom key in state instead of overwriting state.data.
 * @public
 * @function
 * @example <caption>Fetch cce-data from collections and store them under state.cceData</caption>
 * as('cceData', collections.get('cce-data-dhis2', { key: `*:*:${$.syncedAt}*` }));
 * @param {string} key - The state key to assign the result of the operation to.
 * @param {function} operation -  An operation that returns a new state object with a `data` property
 * @returns {Operation}
 */
export function as(key, operation) {
  return async state => {
    const [resolvedKey] = expandReferences(state, key);
    const prevState = state.data;
    const result = await operation(state);
    const { data, ...rest } = result;

    state[resolvedKey] = data;
    state.data = prevState;
    return { ...state, ...rest };
  };
}
