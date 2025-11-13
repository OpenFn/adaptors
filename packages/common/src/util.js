import _ from 'lodash';
import { JSONPath } from 'jsonpath-plus';

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
      return state => state[data];
    case 'object':
      return data;
    case 'function':
      return data(state);
  }
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
