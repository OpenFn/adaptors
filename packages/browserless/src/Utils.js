import { composeNextState } from '@openfn/language-common';
import { request as commonRequest } from '@openfn/language-common/util';

/**
 * Prepares the next state for OpenFn operations.
 * @param {object} state - Current state of the operations.
 * @param {object} response - HTTP response object.
 * @returns {object} Next state
 */
export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) state.references = [];

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

/**
 * Low-level request helper used by the Browserless adaptor.
 * PDF normalization is handled automatically based on content-type or `forcePdfBase64`.
 * @param {object} configuration - Adaptor configuration (baseUrl, token)
 * @param {string} method - HTTP method ('GET', 'POST', etc.)
 * @param {string} path - URL or relative path
 * @param {object} options - Request options (body, headers, query, parseAs, forcePdfBase64)
 * @returns {Promise<object>} Resolves to raw HTTP response
 */
export const request = async (configuration = {}, method, path, options) => {
  const { baseUrl = 'https://production-sfo.browserless.io', token } = configuration;

  const opts = {
    parseAs: 'json',
    errors: { 404: 'Page not found' },
    ...options,
    headers: {
      'content-type': 'application/json',
      ...(options?.headers || {}),
    },
  };

  opts.query = {
    ...(opts.query || {}),
    ...(token ? { token } : {}),
  };

  const url = new URL(path, baseUrl).toString();

  if (opts.forcePdfBase64) opts.parseAs = 'buffer';

  let response;
  response = await commonRequest(method, url, opts);

  try {
    const contentType = response?.headers?.['content-type'] || '';
    const isPDF = /application\/(pdf|octet-stream)/i.test(contentType) || opts.forcePdfBase64;

    if (opts.parseAs === 'base64') {
      if (isPDF && response.body) {
        response.body = { pdf: response.body };
      } else if (response.body) {
        try {
          const decoded = Buffer.from(response.body, 'base64').toString('utf8');
          response.body = JSON.parse(decoded);
        } catch (err) {
        }
      }
    } else {
      if (isPDF && response.body) {
        let buf;
        if (typeof response.body === 'string') buf = Buffer.from(response.body, 'binary');
        else if (Buffer.isBuffer(response.body)) buf = response.body;
        else if (response.body instanceof ArrayBuffer) buf = Buffer.from(response.body);
        else if (ArrayBuffer.isView(response.body)) buf = Buffer.from(response.body.buffer);

        if (buf) response.body = { pdf: buf.toString('base64') };
      } else if (response.body && Buffer.isBuffer(response.body)) {
        if (/application\/json/i.test(contentType) || opts.parseAs === 'json') {
          try {
            response.body = JSON.parse(response.body.toString('utf8'));
          } catch (err) {
          }
        }
      }
    }
  } catch (err) {
  }

  return response;
};
