import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  expandReferences,
  logResponse,
} from '@openfn/language-common/util';

/**
 * Add authentication headers for OpenFn API
 * @private
 */
function addAuth(configuration, headers) {
  if (headers.Authorization) {
    return;
  }

  const { username, password, access_token, jwt } = configuration ?? {};
  const 

  if (access_token) {
    Object.assign(headers, { Authorization: `Bearer ${access_token}` });
  } else if (jwt) {
    Object.assign(headers, { Authorization: `Bearer ${jwt}` });
  } else if (username && password) {
    Object.assign(headers, makeBasicAuthHeader(username, password));
  }
}

/**
 * Authenticate with OpenFn API and get JWT token
 * @private
 */
export function authenticate(configuration) {
  const { host, username, password } = configuration;

  if (!host || !username || !password) {
    throw new Error('Missing required configuration: host, username, password');
  }

  return commonRequest('POST', `${host}/api/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      session: {
        email: username,
        password: password,
      },
    },
  }).then(response => {
    const { jwt } = response.body;
    if (!jwt) {
      throw new Error('Authentication failed: No JWT token received');
    }
    return { ...configuration, jwt };
  });
}

/**
 * Request helper function for OpenFn API
 * @function
 * @private
 */
export function request(method, path, params) {
  return state => {
    const [resolvedPath, resolvedParams = {}] = expandReferences(
      state,
      path,
      params
    );

    let { body, headers = {} } = resolvedParams;

    const { configuration } = state;
    const { host, jwt, access_token, username, password } = configuration;

    if (!host) {
      throw new Error('Missing required configuration: host');
    }

    // Check if we have any form of authentication
    if (!jwt && !access_token && (!username || !password)) {
      throw new Error(
        'Missing authentication. Please provide either access_token, jwt, or username/password.'
      );
    }

    // Add authentication header
    addAuth(configuration, headers);

    const options = {
      ...resolvedParams,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    };

    return commonRequest(method, `${host}/api/${resolvedPath}`, options)
      .then(response => {
        const { body, ...responseWithoutBody } = response;
        logResponse(response);

        return {
          ...composeNextState(state, body),
          response: responseWithoutBody,
        };
      })
      .catch(err => {
        logResponse(err);
        throw err;
      });
  };
}
