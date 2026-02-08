import * as util from './Utils.js';
import { expandReferences } from '@openfn/language-common/util';

/**
 * Make a Browserless-authenticated HTTP request operation.
 * @public
 * @function
 * @param {string} method - HTTP method (e.g. 'GET', 'POST').
 * @param {string} url - Path or URL to request (relative paths are joined to the configured `baseUrl`).
 * @param {object} options - Request options (body, headers, query, parseAs).
 * @state {HttpState}
 * @returns {Operation} an OpenFn operation returning a state with `data` and `response`.
 */
export function request(method, url, options) {
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
}
