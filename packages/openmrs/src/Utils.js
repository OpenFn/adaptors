import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  expandReferences,
  logResponse,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

export function addBasicAuth(configuration = {}, headers) {
  const { username, password } = configuration;
  if (username && password) {
    Object.assign(headers, makeBasicAuthHeader(username, password));
  }
}

export function request(method, path, params, callback = s => s) {
  return state => {
    const [resolvedPath, resolvedParams = {}] = expandReferences(
      state,
      path,
      params
    );

    let { body, headers = {} } = resolvedParams;

    const baseUrl = state.configuration?.instanceUrl;

    addBasicAuth(state.configuration, headers);

    if (resolvedParams.agentOptions) {
      console.warn(
        'WARNING: The `agentOptions` option has been deprecated. Use `tls` instead'
      );
    }

    const options = {
      ...resolvedParams,
      headers,
      baseUrl,
      body,
    };
    return commonRequest(method, resolvedPath, options)
      .then(response => {
        logResponse(response);

        return {
          ...composeNextState(state, response.body),
          response,
        };
      })
      .then(callback)
      .catch(err => {
        logResponse(err);

        throw err;
      });
  };
}
