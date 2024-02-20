import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  expandReferences,
  logResponse,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

export const Log = {
  success: message => console.log(`✓ Success at ${new Date()}:\n∟ ${message}`),
  warn: message => console.log(`⚠ Warning at ${new Date()}:\n∟ ${message}`),
  error: message => console.log(`✗ Error at ${new Date()}:\n∟ ${message}`),
  info: message => console.log(`ℹ Info at ${new Date()}:\n∟ ${message}`),
};

export function handleError(error) {
  if (error.response) {
    const { method, path } = error.response.req;
    const { status } = error.response;
    if (Object.keys(error.response.body).length === 0) {
      throw new Error(
        `Server responded with:  \n${JSON.stringify(error.response, null, 2)}`
      );
    }

    const errorString = [
      `Request: ${method} ${path}`,
      `Got: ${status}`,
      'Body:',
      JSON.stringify(error.response.body, null, 2),
    ].join('\n');

    throw new Error(errorString);
  } else {
    throw error;
  }
}

export function handleResponse(response, state, callback) {
  const { body } = response;
  const nextState = composeNextState(state, { body });
  if (callback) return callback(nextState);
  return nextState;
}

const isArray = variable => !!variable && variable.constructor === Array;

export function nestArray(data, key) {
  return isArray(data) ? { [key]: data } : data;
}

export function addBasicAuth(configuration = {}, headers) {
  const { username, password } = configuration;
  if (username && password) {
    Object.assign(headers, makeBasicAuthHeader(username, password));
  }
}

function encodeFormBody(data) {
  const form = new FormData();
  for (const [key, value] of Object.entries(data)) {
    form.append(key, value);
  }
  return form;
}

export function request(method, path, params, callback = s => s) {
  return state => {
    const [resolvedPath, resolvedParams = {}] = expandReferences(
      state,
      path,
      params
    );

    let { body, headers = {} } = resolvedParams;

    if (resolvedParams.json) {
      console.warn(
        'WARNING: The `json` option has been deprecated. Use `body` instead'
      );
      body = resolvedParams.json;
    }

    if (resolvedParams.form) {
      body = encodeFormBody(resolvedParams.form);
    }

    const baseUrl = state.configuration?.baseUrl;

    addBasicAuth(state.configuration, headers);

    const maxRedirections =
      resolvedParams.maxRedirections ??
      (resolvedParams.followAllRedirects === false ? 0 : 5);

    const tls = resolvedParams.tls ?? resolvedParams.agentOptions;

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
      tls,
      maxRedirections,
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
