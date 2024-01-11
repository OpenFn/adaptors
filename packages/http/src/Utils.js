import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  expandReferences,
} from '@openfn/language-common/util';

export function addBasicAuth(configuration = {}, headers) {
  const { username, password } = configuration;
  if (username && password) {
    const base64Encode = btoa(`${username}:${password}`);
    headers['Authorization'] = `Basic ${base64Encode}`;
  }
}

function encodeFormBody(data) {
  const form = new FormData();
  for (const [key, value] of Object.entries(data)) {
    form.append(key, value);
  }
  return form;
}

export function generateResponseLog(response) {
  const { method, url, statusCode, duration } = response;
  return `${method} ${url} - ${statusCode} in ${duration}ms`;
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
        const log = generateResponseLog(response);
        console.log(log);

        return {
          ...composeNextState(state, response.body),
          response,
        };
      })
      .then(callback)
      .catch(err => {
        const log = generateResponseLog(err);
        console.log(log);

        throw err;
      });
  };
}
