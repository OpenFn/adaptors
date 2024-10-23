import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  expandReferences,
  logResponse,
  encode,
  decode,
  uuid,
} from '@openfn/language-common/util';

import * as cheerio from 'cheerio';
import cheerioTableparser from 'cheerio-tableparser';

export function addAuth(configuration, headers) {
  if (headers.Authorization) {
    return;
  }

  const { username, password, access_token } = configuration ?? {};

  if (access_token) {
    Object.assign(headers, { Authorization: `Bearer ${access_token}` });
  } else if (username && password) {
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

const assertUrl = (pathOrUrl, baseUrl) => {
  if (!baseUrl && pathOrUrl && !/^https?:\/\//.test(pathOrUrl)) {
    const e = new Error('UNEXPECTED_RELATIVE_URL');
    e.code = 'UNEXPECTED_RELATIVE_URL';
    e.description = `You passed a relative URL but didn't set baseUrl`;
    e.url = pathOrUrl;
    e.fix = `Set the baseUrl on state.configuration or use an absolute URL, like https://example.com/api/${pathOrUrl}`;
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

    assertUrl(resolvedPath, baseUrl);

    if (baseUrl) {
      addAuth(state.configuration, headers);
    }

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

export function xmlParser(body, script, callback = s => s) {
  return state => {
    const [resolvedBody] = expandReferences(state, body);
    const $ = cheerio.load(resolvedBody);
    cheerioTableparser($);

    if (script) {
      const result = script($);
      try {
        const r = JSON.parse(result);
        return callback(composeNextState(state, r));
      } catch (e) {
        return callback(composeNextState(state, { body: result }));
      }
    } else {
      return callback(composeNextState(state, { body: resolvedBody }));
    }
  };
}

export {
  /**
   * Encodes a given string into Base64 format.
   * @function
   * @public
   * @param {string} data - The string to be encoded.
   * @returns {string} - The Base64 encoded string.
   * @example <caption>Encode a string</caption>
   * const encoded = Util.encode('Hello World');
   * console.log(encoded); // Output: SGVsbG8gV29ybGQ=
   */
  encode,
  /**
   * Decodes a Base64 encoded string back to its original format.
   * @function
   * @public
   * @param {string} base64Data - The Base64 encoded string.
   * @returns {string} - The decoded string.
   * @example <caption>Decode a Base64 string</caption>
   * const decoded = Util.decode('SGVsbG8gV29ybGQ=');
   * console.log(decoded); // Output: Hello World
   */
  decode,
  /**
   * Generates a UUID (Universally Unique Identifier).
   * @function
   * @public
   * @returns {string} - A newly generated UUID.
   * @example <caption>Generate a UUID</caption>
   * const id = Util.uuid();
   * console.log(id); // Output:'3f4e254e-8f6f-4f8b-9651-1c1c262cc83f'
   */
  uuid,
};
