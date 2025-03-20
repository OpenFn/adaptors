import { Connection } from '@jsforce/jsforce-node';
import { throwError } from '@openfn/language-common/util';

const checkConnection = connection => {
  if (!connection) {
    throwError('No connection');
  }
  console.log('Using Salesforce API version:', connection.version);
  console.log(`Connected with ${connection._sessionType} session type`);
};

export const basicAuth = async configuration => {
  const {
    loginUrl,
    username,
    password,
    securityToken,
    apiVersion: version,
  } = configuration;

  const conn = new Connection({ loginUrl, version });
  console.info(`Connecting to salesforce as ${username}.`);

  await conn
    .login(username, securityToken ? password + securityToken : password)
    .catch(error => {
      throwError('FAILED_AUTH', {
        fix: 'Check your username, password, and security token',
        message: `Failed to connect to salesforce as ${username}`,
        error,
      });
    });
  checkConnection(conn);

  return conn;
};

export const tokenAuth = configuration => {
  const {
    instance_url: instanceUrl,
    access_token: accessToken,
    apiVersion: version,
  } = configuration;

  const conn = new Connection({ instanceUrl, accessToken, version });
  checkConnection(conn);
  return conn;
};

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

export async function pollJobResult(conn, job, pollInterval, pollTimeout) {
  let attempt = 0;

  const maxPollingAttempts = Math.floor(pollTimeout / pollInterval);

  while (attempt < maxPollingAttempts) {
    // Make an HTTP GET request to check the job status
    const jobInfo = await conn
      .request({
        method: 'GET',
        url: `/services/data/v${conn.version}/jobs/query/${job.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch(error => {
        console.log('Failed to fetch job information', error);
      });

    if (jobInfo && jobInfo.state === 'JobComplete') {
      const response = await conn.request({
        method: 'GET',
        url: `/services/data/v${conn.version}/jobs/query/${job.id}/results`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Job result retrieved', response.length);
      return response;
    } else {
      // Handle maxPollingAttempts
      if (attempt + 1 === maxPollingAttempts) {
        console.error(
          'Maximum polling attempt reached, Please increase pollInterval and pollTimeout'
        );
        throw new Error(`Polling time out. Job Id = ${job.id}`);
      }
      console.log(
        `Attempt ${attempt + 1} - Job ${jobInfo.id} is still in ${
          jobInfo.state
        }:`
      );
    }

    // Wait for the polling interval before the next attempt
    await new Promise(resolve => setTimeout(resolve, pollInterval));
    attempt++;
  }
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
