import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  assertRelativeUrl,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};
export const request = (configuration = {}, method, path, options) => {
  const { baseUrl = 'https://production-sfo.browserless.io', username, password, token } = configuration;
  const headers = makeBasicAuthHeader(username, password);
  const errors = {
    404: 'Page not found',
  };

  const opts = {
      parseAs: 'json',
    errors,
    baseUrl,
    ...options,
    headers: {
      'content-type': 'application/json',
      ...headers,
      ...(options && options.headers ? options.headers : {}),
    },
  };
  opts.query = {
    ...(opts.query || {}),
    ...(token ? { token } : {}),
  };

  const safePath = nodepath.join(path);
  const wantsPdfBase64 = options && options.forcePdfBase64;
  if (wantsPdfBase64) {
    opts.parseAs = 'base64';
  }

  return commonRequest(method, safePath, opts).then(response => {
    try {
      const contentType = response?.headers?.['content-type'] || '';
      const isPdfContent = /application\/(pdf|octet-stream)/i.test(contentType || '');
      if (wantsPdfBase64) {
        const body = response.body;
        if (body) {
          if (typeof body === 'string') {
            try {
              const decoded = Buffer.from(body, 'base64').toString('utf8');
              const parsed = JSON.parse(decoded);
              response.body = parsed;
            } catch (err) {
              response.body = { pdf: body };
            }
          } else if (Buffer.isBuffer(body)) {
            response.body = { pdf: body.toString('base64') };
          } else if (body instanceof ArrayBuffer) {
            response.body = { pdf: Buffer.from(body).toString('base64') };
          } else if (ArrayBuffer.isView(body)) {
            response.body = { pdf: Buffer.from(body.buffer).toString('base64') };
          }
        }
      } else if (isPdfContent) {
        const body = response.body;
        if (body) {
          if (typeof body === 'string') {
            const buf = Buffer.from(body, 'binary');
            response.body = { pdf: buf.toString('base64') };
          } else if (Buffer.isBuffer(body)) {
            response.body = { pdf: body.toString('base64') };
          } else if (body instanceof ArrayBuffer) {
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
