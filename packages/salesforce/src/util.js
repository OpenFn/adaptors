import { throwError } from '@openfn/language-common/util';

let anyAscii = undefined;

// use a dynamic import because any-ascii is pure ESM and doesn't play well with CJS
// This promise MUST be resolved by execute before a connection is created
export const loadAnyAscii = state =>
  import('any-ascii').then(m => {
    anyAscii = m.default;
    return state;
  });

/**
 * Transliterates unicode characters to their best ASCII representation
 * @public
 * @example <caption>Transliterate `άνθρωποι` to `anthropoi`</caption>
 * fn((state) => {
 *   const s = util.toUTF8("άνθρωποι");
 *   console.log(s); // anthropoi
 *   return state;
 * });
 * @param {string} input - A string with unicode characters
 * @returns {string} - ASCII representation of input string
 */
export function toUTF8(input) {
  return anyAscii(input);
}

export function formatResults(input) {
  const output = {
    success: true,
    completed: [],
    errors: [],
  };

  if (!Array.isArray(input)) {
    return {
      success: input.success,
      errors: input.errors,
      completed: [input.id],
    };
  }

  input.forEach(record => {
    if (record.success) {
      output.completed.push(record.id);
    } else {
      output.success = false;
    }

    if (record.errors?.length) {
      record.errors.forEach(message => {
        output.errors.push({ id: record.id, message });
      });
    }
  });

  return output;
}

/**
 * Removes nesting from an array of objects.
 * - Each object in the array is flattened to have dot-separated keys.
 * - Throws an error if the input is not an array or if a nested object exceeds two levels deep.
 *
 * @param {Array<Object>} input - An array of objects to flatten.
 * @returns {Array<Object>} - An array of flattened objects.
 * @throws {Error} - Throws an error if the input is not an array of objects or if nesting exceeds two levels.
 */

export function removeNestings(input) {
  if (!Array.isArray(input)) {
    throwError('INVALID_INPUT_TYPE', {
      description: 'Input must be an array of objects.',
      fix: 'Ensure input is an array of objects.',
    });
  }

  return input.map(item => flattenNestedObject(item));
}

const flattenNestedObject = (obj, parentKey = '', currentDepth = 0) => {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      if (currentDepth < 1) {
        Object.assign(
          result,
          flattenNestedObject(value, newKey, currentDepth + 1)
        );
      } else {
        throwError('NESTED_OBJECT_EXCEEDS_DEPTH', {
          description: `Nested object with key ${newKey} exceeds the allowed depth`,
        });
      }
    } else {
      result[newKey] = value;
    }
  });
  return result;
};

/**
 * Asserts that no keys in the input object or array of objects contain dots ('.').
 * Throws an error if a key containing a dot is found.
 *
 * @param {Object|Array<Object>} input - The object or array of objects to validate.
 * @throws {Error} - Throws an error if a key containing a dot is found or if the input is invalid.
 */
export function assertNoNesting(input) {
  const hasDotInKeys = obj => {
    for (const key of Object.keys(obj)) {
      if (key.includes('.')) {
        const { first, last } = key.split('.');
        throwError('UNEXPECTED_KEY', {
          description: `Dot notation syntax (i.e., ${key}) is not supported in key names`,
          fix: `Relationships record should be nested in an object (e.g., { ${first}: { ${last}: value } })`,
        });
      }
    }
  };

  if (Array.isArray(input)) {
    input.forEach(item => hasDotInKeys(item));
  } else if (typeof input === 'object' && input !== null) {
    hasDotInKeys(input);
  } else {
    throwError('INVALID_INPUT_TYPE', {
      description: 'Input must be an object or an array of objects.',
      fix: 'Ensure the input is an object or an array of objects.',
    });
  }
}
