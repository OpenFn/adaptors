import * as util from './Utils.js';
import { expandReferences } from '@openfn/language-common/util';

/**
 * Make a Browserless-authenticated HTTP request operation.
 * @public
 * @function
 * @param {string} method - HTTP method (e.g. 'GET', 'POST').
 * @param {string} url - Path or URL to request (relative paths are joined to the configured `baseUrl`).
 * @param {object} options - Request options (body, headers, query, parseAs, forcePdfBase64).
 * @param {boolean} [options.forcePdfBase64] - When true, instructs the adaptor to treat the
 * response as base64-encoded PDF content and normalize the returned `data` to
 * `{ pdf: '<base64>' }` (or attempt to decode it to JSON if it represents an
 * encoded JSON payload). Use this when calling `/pdf` endpoints that return
 * base64 payloads. Note: `parseAs` is the lower-level parsing hint passed to
 * the underlying request layer; `forcePdfBase64` is a higher-level normalization
 * convenience for PDF endpoints.
 * @state {HttpState}
 * @returns {Operation} an OpenFn operation returning a state with `data` and `response`.
 */
const req = function (method, url, options) {
  return async state => {
    const [resolvedMethod, resolvedUrl, resolvedOptions] = expandReferences(
      state,
      method,
      url,
      options
    );

    const response = await util.request(state.configuration, resolvedMethod, resolvedUrl, resolvedOptions);
    const { body, ...responseWithoutBody } = response;
    return {
      ...state,
      response: responseWithoutBody,
      data: body,
    };
  };
};
export { req as request };
