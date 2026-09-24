import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * Make a generic authenticated GET request to any AirQo endpoint.
 *
 * @example <caption>Get raw data from any AirQo path</caption>
 * http.get('devices/measurements/sites/site123/recent');
 * @function
 * @public
 * @param {string} path 
 * @param {object} [options] - Additional options such as query parameters or headers.
 * @returns {Operation}
 */
export function get(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(state, path, options);

    util.assertNonEmptyString(resolvedPath, 'path');

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a generic authenticated POST request to any AirQo endpoint.
 *
 * @example <caption>Post a body to any AirQo path</caption>
 * http.post('devices/metadata/sites', { name: 'Kampala' });
 * @function
 * @public
 * @param {string} path - API path relative to the configured base URL.
 * @param {object} [body] - JSON request body.
 * @param {object} [options] - Additional request options.
 * @returns {Operation}
 */
export function post(path, body = {}, options = {}) {
  return async state => {
    const [resolvedPath, resolvedBody, resolvedOptions] = expandReferences(
      state,
      path,
      body,
      options
    );

    util.assertNonEmptyString(resolvedPath, 'path');

    const response = await util.request(state.configuration, 'POST', resolvedPath, {
      ...resolvedOptions,
      body: resolvedBody,
    });

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a generic authenticated request of any HTTP method to any AirQo endpoint.
 *
 * @example <caption>Make an arbitrary request</caption>
 * http.request('GET', 'devices/measurements/sites/site123/recent');
 * @function
 * @public
 * @param {string} method - HTTP method.
 * @param {string} path - API path relative to the configured base URL.
 * @param {object} [options] - Additional request options.
 * @returns {Operation}
 */
export function request(method, path, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions] = expandReferences(
      state,
      method,
      path,
      options
    );

    util.assertNonEmptyString(resolvedMethod, 'method');
    util.assertNonEmptyString(resolvedPath, 'path');

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}
