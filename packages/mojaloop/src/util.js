import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  expandReferences,
  logResponse,
} from '@openfn/language-common/util';

function addAuth(configuration, headers) {
  if (headers.Authorization) {
    return;
  }

  const { username, password, access_token, apiKey } = configuration ?? {};

  if (access_token) {
    Object.assign(headers, { Authorization: `Bearer ${access_token}` });
  } else if (apiKey) {
    Object.assign(headers, { 'X-API-Key': apiKey });
  } else if (username && password) {
    Object.assign(headers, makeBasicAuthHeader(username, password));
  }
}

const assertUrl = (pathOrUrl, baseUrl) => {
  if (!baseUrl && pathOrUrl && !/^https?:\/\//.test(pathOrUrl)) {
    const e = new Error('UNEXPECTED_RELATIVE_URL');
    e.code = 'UNEXPECTED_RELATIVE_URL';
    e.description = `You passed a relative URL but didn't set baseUrl`;
    e.url = pathOrUrl;
    e.fix = `Set the baseUrl on state.configuration or use an absolute URL, like https://mojaloop.example.com/api/${pathOrUrl}`;
    throw e;
  }
  if (!baseUrl && !pathOrUrl) {
    const e = new Error('NO_URL');
    e.code = 'NO_URL';
    e.description = `No URL provided`;
    e.fix = `Make sure to pass a URL string into the request. You may need to set a baseURL on state.configuration.`;
    throw e;
  }
};

export const CONTENT_TYPES = {
  json: 'application/json',
  xml: 'application/xml',
  string: 'text/plain',
};

/**
 * Request helper function
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

    let { body, contentType = 'json', headers = {}, parseAs } = resolvedParams;

    const contentTypeHeader = Object.keys(headers).find(
      key => key.toLowerCase() === 'content-type'
    );

    if (contentTypeHeader) {
      headers = { ...headers };
    } else {
      headers = {
        ...headers,
        'Content-Type': CONTENT_TYPES[contentType] || 'application/json',
      };
    }

    // Add Mojaloop-specific required headers if not present
    if (!headers['FSPIOP-Source']) {
      console.warn(
        'WARNING: FSPIOP-Source header not set. This may be required by Mojaloop APIs.'
      );
    }

    const baseUrl = state.configuration?.baseUrl;

    assertUrl(resolvedPath, baseUrl);

    if (baseUrl) {
      addAuth(state.configuration, headers);
    }

    const maxRedirections =
      resolvedParams.maxRedirections ??
      (resolvedParams.followAllRedirects === false ? 0 : 5);

    const options = {
      ...resolvedParams,
      headers,
      baseUrl,
      body,
      maxRedirections,
      parseAs,
    };

    return commonRequest(method, resolvedPath, options)
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
