import { composeNextState } from '@openfn/language-common';
import { request as commonRequest, makeBasicAuthHeader, } from '@openfn/language-common/util';
import nodepath from 'node:path';

/**
 * prepares the next state for OpenFn operations.
 * @param {object} state - Current state of the Operations.
 * @param {object} response - HTTP response object.
 * @returns {object} Next State
 */

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if(!state.references) {
    state.references = {};
  }
  return {
    ...commonNextState(state, body), 
    response: responseWithoutBody,
    };
};

/**
 * Low-level request helper used by the openfn Browserless adaptor.
 * PDF normalization is handled automatically based on response content-type.
 * @param {object} [configuration={}] - Adaptor configuration (baseUrl, token, etc.)
 * @param {string} method - HTTP method ('GET', 'POST', etc.)
 * @param {string} path - URL or relative path
 * @param {object} [options] - Request options (body, headers, query, parseAs, timeout)
 * @param {Promise<object>} Resolves to the raw HTTP response
 */

export const request = (configuration = {}, method, path, options) => {
  const {baseUrl = 'https://production-sfo.browserless.io', username, password, token } = configuration;

  const headers = makeBasicAuthHeader(username, password,);
  const error = {
    404: 'Page not found',
  };

  const opts = {
    parseAs: 'json',
    error,
    ...options,
    headers: {
      'content-type': 'application/json',
      ...headers,
      ...(options && options.headers ? options.headers : {}),
    },
  };

opts.query = {
  ...opts(opts.query || {}),
  ...(token ? { token } : {}),
};

const safePath = nodepath.join(path);

return commonRequest(method, safePath, opts).then(response => {
  try{
    const contentType = response?.headers?.['content-type'] || '';
    const isPDF = /application\/(pdf|octet-stream)/i.test(contentType);


if (isPDF) {
  const body = response.body;
  if (body){
    if (typeof  body === 'string'){
      const buf = Buffer.from(body, 'binary');
      response.body = { pdf: buf.toString('base64')};

    } else if (Buffer.isBuffer(body)){
      response.body = { pdf: body.toString('base64')};
    } else if (body instanceof ArrayBuffer){
      response.body = { pdf: Buffer.from(body).toString('base64') };

    } else if (ArrayBuffer.isView(body)) {
      response.body = { pdf: Buffer.from(body.buffer).toString('base64') };
    }
  }
}
} catch (err) {

}
return response;
});

};