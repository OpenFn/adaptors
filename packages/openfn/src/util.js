import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
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

  const { access_token } = configuration ?? {};
  // Check if we have any form of authentication
  if (!access_token) {
    throw new Error('Missing authentication. Please provide access_token.');
  }

  Object.assign(headers, { Authorization: `Bearer ${access_token}` });
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
    const { baseUrl = 'https://app.openfn.org' } = configuration;

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

    return commonRequest(method, `${baseUrl}/api/${resolvedPath}`, options)
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
