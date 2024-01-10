import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  expandReferences,
} from '@openfn/language-common/util';

export function addBasicAuth(configuration, headers) {
  const username = configuration?.username;
  const password = configuration?.password;
  if (username && password) {
    const base64Encode = btoa(`${username}:${password}`);
    headers['Authorization'] = `Basic ${base64Encode}`;

    return headers;
  }
  return null;
}

export function request(method, path, params, callback = s => s) {
  return state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    let body = resolvedParams?.body;
    let headers = resolvedParams?.headers ?? {};

    if (resolvedParams?.json) {
      console.warn(
        'DEPRECATION WARNING: Please migrate from `json` to `body`.'
      );
      body = resolvedParams.json;
    }

    if (resolvedParams?.form) {
      let form = new FormData();
      for (const [key, value] of Object.entries(resolvedParams.form)) {
        form.append(key, value);
      }
      body = form;
    }

    const baseUrl = state.configuration?.baseUrl;

    addBasicAuth(state.configuration, headers);

    const maxRedirections =
      resolvedParams?.maxRedirections ??
      (resolvedParams?.followAllRedirects === false ? 0 : 5);

    const tls = resolvedParams?.tls ?? resolvedParams?.agentOptions;

    if (resolvedParams?.agentOptions) {
      console.warn(
        'DEPRECATION WARNING: Please migrate https certificate options from `agentOptions` to `tls`.'
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
        const { method, url, body, code, duration } = response;
        console.log(method, url, '-', code, 'in', duration + 'ms');

        return {
          ...composeNextState(state, body),
          response,
        };
      })
      .then(callback);
  };
}
