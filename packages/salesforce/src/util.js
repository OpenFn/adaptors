import jsforce from 'jsforce';

function getConnection(state, options) {
  const { apiVersion } = state.configuration;

  const apiVersionRegex = /^\d{2}\.\d$/;

  if (apiVersion && apiVersionRegex.test(apiVersion)) {
    options.version = apiVersion;
  } else {
    options.version = '47.0';
  }
  console.log('Using Salesforce API version:', options.version);

  return new jsforce.Connection(options);
}

async function createBasicAuthConnection(state) {
  const { loginUrl, username, password, securityToken } = state.configuration;

  const connection = getConnection(state, { loginUrl });

  await connection
    .login(username, securityToken ? password + securityToken : password)
    .catch(e => {
      console.error(`Failed to connect to salesforce as ${username}`);
      throw e;
    });

  console.info(`Connected to salesforce as ${username}.`);

  return {
    ...state,
    connection,
  };
}

function createAccessTokenConnection(state) {
  const { instance_url, access_token } = state.configuration;

  const connection = getConnection(state, {
    instanceUrl: instance_url,
    accessToken: access_token,
  });

  console.log(`Connected with ${connection._sessionType} session type`);

  return {
    ...state,
    connection,
  };
}

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

/**
 * Creates a connection to Salesforce using Basic Auth or OAuth.
 * @function createConnection
 * @private
 * @param {State} state - Runtime state.
 * @returns {State}
 */
export function createConnection(state) {
  if (state.connection) {
    return state;
  }

  const { access_token } = state.configuration;

  return access_token
    ? createAccessTokenConnection(state)
    : createBasicAuthConnection(state);
}

/**
 * Removes state.connection from state.
 * @example
 * removeConnection(state)
 * @function
 * @private
 * @param {State} state
 * @returns {State}
 */
export function removeConnection(state) {
  delete state.connection;
  return state;
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
