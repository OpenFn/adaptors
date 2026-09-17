/**
 * Generic HTTP operations for calling any AirQo endpoint.
 * Docs: https://docs.airqo.net/airqo-rest-api-documentation
 */
import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

const assertNonEmptyString = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
};

/**
 * Make a generic authenticated GET request to any AirQo endpoint.
 *
 * @example <caption>Get raw data from any AirQo path</caption>
 
 * @function
 * @public
 * @param {string} path 
 * @param {object} [options] -
 * @returns {Operation}
 * @state 
 */
export function get(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(state, path, options);

    assertNonEmptyString(resolvedPath, 'path');

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
 
 * @function
 * @public
 * @param {string} path 
 * @param {object} [body] 
 * @param {object} [options]
 * @returns {Operation}
 * @state 
 */
export function post(path, body = {}, options = {}) {
  return async state => {
    const [resolvedPath, resolvedBody, resolvedOptions] = expandReferences(
      state,
      path,
      body,
      options
    );

    assertNonEmptyString(resolvedPath, 'path');

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

 * @function
 * @public
 * @param {string} method 
 * @param {string} path 
 * @param {object} [options] 
 * @returns {Operation}
 * @state 
 */
export function request(method, path, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions] = expandReferences(
      state,
      method,
      path,
      options
    );

    assertNonEmptyString(resolvedMethod, 'method');
    assertNonEmptyString(resolvedPath, 'path');

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}
