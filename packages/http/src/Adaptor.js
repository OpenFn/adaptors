import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';

import {
  request as commonRequest,
  expandReferences,
} from '@openfn/language-common/util';
import cheerio from 'cheerio';
import cheerioTableparser from 'cheerio-tableparser';

import { addBasicAuth } from './Utils';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

function handleResponse(state, response) {
  return {
    ...composeNextState(state, response.body),
    response,
  };
}

function handleCallback(state, callback) {
  if (callback) return callback(state);
  return state;
}

function request(method, path, params, callback) {
  return state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    let body = resolvedParams?.body;
    let headers = resolvedParams?.headers;

    if (resolvedParams?.form) {
      let form = new FormData();
      Object.entries(resolvedParams?.form).forEach(element => {
        form.append(element[0], element[1]);
      });

      body = form;
    } else {
      body = body ? JSON.stringify(body) : null;
    }

    const baseUrl = state.configuration?.baseUrl;

    const auth = addBasicAuth(state.configuration, headers || {});

    const maxRedirections =
      resolvedParams?.maxRedirections ??
      (resolvedParams?.followAllRedirects === false ? 0 : 5);

    const options = {
      ...resolvedParams,
      ...auth,
      baseUrl,
      body,
      maxRedirections,
    };

    return commonRequest(method, resolvedPath, options)
      .then(response => handleResponse(state, response))
      .then(nextState => handleCallback(nextState, callback));
  };
}

/**
 * Make a GET request
 * @public
 * @example
 *  get('/myEndpoint', {
 *    query: {foo: 'bar', a: 1},
 *    headers: {'content-type': 'application/json'},
 *  })
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function get(path, params, callback) {
  return request('GET', path, params, callback);
}

/**
 * Make a POST request
 * @public
 * @example
 *  post('/myEndpoint', {
 *    body: {'foo': 'bar'},
 *    headers: {'content-type': 'application/json'},
 *  })
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Body, Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {operation}
 */

export function post(path, params, callback) {
  return request('POST', path, params, callback);
}

/**
 * Make a PUT request
 * @public
 * @example
 *  put('/myEndpoint', {
 *    body: {'foo': 'bar'},
 *    headers: {'content-type': 'application/json'},
 *  })
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Body, Query, Headers and Auth parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function put(path, params, callback) {
  return request('PUT', path, params, callback);
}

/**
 * Make a PATCH request
 * @public
 * @example
 *  patch('/myEndpoint', {
 *    body: {'foo': 'bar'},
 *    headers: {'content-type': 'application/json'},
 *  })
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Body, Query, Headers and Auth parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function patch(path, params, callback) {
  return request('PATCH', path, params, callback);
}

/**
 * Make a DELETE request
 * @public
 * @example
 *  del(`/myendpoint/${state => state.data.id}`, {
 *    headers: {'content-type': 'application/json'}
 *  })
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Body, Query, Headers and Auth parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function del(path, params, callback) {
  return request('DELETE', path, params, callback);
}

/**
 * Parse XML with the Cheerio parser
 * @public
 * @example
 *  parseXML(body, function($){
 *    return $("table[class=your_table]").parsetable(true, true, true);
 *  })
 * @function
 * @param {String} body - data string to be parsed
 * @param {function} script - script for extracting data
 * @returns {Operation}
 */
export function parseXML(body, script) {
  return state => {
    const $ = cheerio.load(body);
    cheerioTableparser($);

    if (script) {
      const result = script($);
      try {
        const r = JSON.parse(result);
        return composeNextState(state, r);
      } catch (e) {
        return composeNextState(state, { body: result });
      }
    } else {
      return composeNextState(state, { body: body });
    }
  };
}

export {
  alterState,
  arrayToString,
  combine,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  chunk,
  humanProper,
  lastReferenceValue,
  merge,
  scrubEmojis,
  sourceValue,
  splitKeys,
  toArray,
  parseCsv,
} from '@openfn/language-common';
