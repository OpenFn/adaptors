import curry from 'lodash/fp/curry.js';
import fromPairs from 'lodash/fp/fromPairs.js';

import { JSONPath } from 'jsonpath-plus';
import { parse } from 'csv-parse';
import { Readable } from 'node:stream';

import { request } from 'undici';
import { format } from 'date-fns';

import { expandReferences as newExpandReferences, parseDate } from './util';

export * as beta from './beta';
export * as http from './http.deprecated';
export * as dateFns from './dateFns';

const schemaCache = {};

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
 * @example
 * fn(state => {
 *   // do some things to state
 *   return state;
 * });
 * @function
 * @param {Function} func is the function
 * @returns {Operation}
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
 * @example
 * sourceValue('$.key')
 * @function
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
 * @returns {Operation}
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
 * @returns {Operation}
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
 * @returns {State}
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
 * Recursively resolves objects that have resolvable values (functions).
 * @public
 * @function
 * @param {object} value - data
 * @param {Function} [skipFilter] - a function which returns true if a value should be skipped
 * @returns {Operation}
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
 * @returns {Field}
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
    const [resolvedCsvData, resolvedParsingOptions] = newExpandReferences(
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

// /**
//  * Returns a unique array of objects by an attribute in those objects
//  * @public
//  * @example
//  * uniqBy([{a:1}, {b:2}, {a:1, b:2}], 'a')
//  * @function
//  * @param {Object} array - Array of objects to be deduplicated
//  * @param {Integer} uid - The attribute name on which to deduplicate
//  * @returns {Object}
//  */
// export function uniqBy(array, uid) {
//   return Array.from(new Set(array.map(a => a[uid]))).map(id => {
//     return array.find(a => a[uid] === id);
//   });
// }

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
      const [schemaOrUrl] = newExpandReferences(state, schema);

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
      const [d] = newExpandReferences(state, data);

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
 * See the usage guide at @{link https://docs.openfn.org/documentation/jobs/job-writing-guide#using-cursors}
 * @public
 * @example <caption>Use a cursor from state if present, or else use the default value</caption>
 * cursor($.cursor, { defaultValue: 'today' })
 * @example <caption>Use a pagination cursor</caption>
 * cursor(22)
 * @function
 * @param {any} value - the cursor value. Usually an ISO date, natural language date, or page number
 * @param {object} options - options to control the cursor.
 * @param {string} options.key - set the cursor key. Will persist through the whole run.
 * @param {any} options.defaultValue - the value to use if value is falsy
 * @returns {Operation}
 */
export function cursor(value, options = {}) {
  return (state) => {
    const [resolvedValue, resolvedOptions] = newExpandReferences(state, value, options);

    const {
      defaultValue, // if there is no cursor on state, this will be used
      key, // the key to use on state
    } = resolvedOptions;

    if (key) {
      cursorKey = key;
    }

    if (!cursorStart) {
      cursorStart = new Date();
    }

    const cursor = resolvedValue ?? defaultValue;
    if (typeof cursor === 'string') {
      const date = parseDate(cursor, cursorStart)
      if (date instanceof Date && date.toString !== "Invalid Date") {
        state[cursorKey] = date.toISOString();
        // Log the converted date in a very international, human-friendly format
        // See https://date-fns.org/v3.6.0/docs/format
        const formatted = format(date, 'HH:MM d MMM yyyy (OOO)')
        console.log(`Setting cursor "${cursor}" to: ${formatted}`);
        return state;
      }
    }
    state[cursorKey] = cursor;
    console.log('Setting cursor to:', cursor);

    return state;
  }
}