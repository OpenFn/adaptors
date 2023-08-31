import { basicAuth, setAuth, setUrl, tryJson } from './Utils';

import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';

import { request, expandReferences } from '@openfn/language-common/util';
import cheerio from 'cheerio';
import cheerioTableparser from 'cheerio-tableparser';
import tough from 'tough-cookie';

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

var cookiejar = new tough.CookieJar();
var Cookie = tough.Cookie;

function handleCookies(response) {
  const { config, data, headers } = response;
  if (config?.keepCookie) {
    let cookies;
    let keepCookies = [];

    if (headers['set-cookie']) {
      if (headers['set-cookie'] instanceof Array) {
        cookies = headers['set-cookie']?.map(Cookie.parse);
      } else {
        cookies = [Cookie.parse(headers['set-cookie'])];
      }

      headers['set-cookie']?.forEach(c => {
        cookiejar.setCookie(Cookie.parse(c), config.url, (err, cookie) => {
          keepCookies?.push(cookie?.cookieString());
        });
      });
    }

    const extendableData = Array.isArray(data) ? { body: data } : data;

    return {
      ...response,
      data: {
        ...extendableData,
        __cookie: keepCookies?.length === 1 ? keepCookies[0] : keepCookies,
        __headers: response.headers,
      },
    };
  }

  return response;
}

function handleResponse(state, response) {
  console.log(
    // response.config.method.toUpperCase(), // TODO Should we return method
    'request succeeded with',
    response.code,
    '✓'
  );

  const compatibleResp = {
    ...response,
    // httpStatus: response.code, // TODO should we mantain this key?
    // message: response.statusText, // TODO should we return statusText
    body: tryJson(response.body),
  };

  const respWithCookies = handleCookies(compatibleResp);

  return {
    ...composeNextState(state, respWithCookies.body),
    response: respWithCookies,
  };
}

function handleCallback(state, callback) {
  if (callback) return callback(state);
  return state;
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
  return state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    const { baseUrl, username, password } = state.configuration;

    const url = setUrl(baseUrl, resolvedPath);

    const headers = resolvedParams?.headers ? resolvedParams.headers : {};
    const auth = basicAuth(username, password, headers);

    // Coerces options/paramaters for language-http into a set of configuration for the `request` function
    // config = buildConfig(state, params)
    // assert.equal(config, { headers: { 'content-type': 'application/json', "Authori" } }}})
    const config = { ...resolvedParams, ...auth };

    return request('GET', url, config)
      .then(response => handleResponse(state, response))
      .then(nextState => handleCallback(nextState, callback));
  };
}

/**
 * Make a POST request
 * @public
 * @example
 *  post('/myEndpoint', {
 *    body: {'foo': 'bar'},
 *    headers: {'content-type': 'application/json'},
 *    authentication: {username: 'user', password: 'pass'}
 *  })
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Body, Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {operation}
 */
export function post(path, params, callback) {
  return state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    const url = setUrl(state.configuration, resolvedPath);

    const auth = setAuth(
      state.configuration,
      resolvedParams?.authentication ?? resolvedParams?.auth
    );

    const config = mapToAxiosConfig({ ...resolvedParams, url, auth });

    return request(
      'POST',
      config
    )(state)
      .then(response => handleResponse(state, response))
      .then(nextState => handleCallback(nextState, callback));
  };
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
  return state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );
    const url = setUrl(state.configuration, resolvedPath);

    const auth = setAuth(
      state.configuration,
      resolvedParams?.authentication ?? resolvedParams?.auth
    );

    const config = { ...resolvedParams, auth };

    return request('PUT', url, config)
      .then(response => handleResponse(state, response))
      .then(nextState => handleCallback(nextState, callback));
  };
}

/**
 * Make a PATCH request
 * @public
 * @example
 *  patch('/myEndpoint', {
 *    body: {'foo': 'bar'},
 *    headers: {'content-type': 'application/json'},
 *    authentication: {username: 'user', password: 'pass'}
 *  })
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Body, Query, Headers and Auth parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function patch(path, params, callback) {
  return state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    const url = setUrl(state.configuration, resolvedPath);

    const auth = setAuth(
      state.configuration,
      resolvedParams?.authentication ?? resolvedParams?.auth
    );

    const config = mapToAxiosConfig({ ...resolvedParams, url, auth });

    return request(
      'patch',
      config
    )(state)
      .then(response => handleResponse(state, response))
      .then(nextState => handleCallback(nextState, callback));
  };
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
  return state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    const url = setUrl(state.configuration, resolvedPath);

    const auth = setAuth(
      state.configuration,
      resolvedParams?.authentication ?? resolvedParams.auth
    );

    const config = mapToAxiosConfig({ ...resolvedParams, url, auth });

    return request(
      'DELETE',
      config
    )(state)
      .then(response => handleResponse(state, response))
      .then(nextState => handleCallback(nextState, callback));
  };
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
export { request } from '@openfn/language-common/util';
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
  http,
  humanProper,
  lastReferenceValue,
  merge,
  scrubEmojis,
  sourceValue,
  splitKeys,
  toArray,
  parseCsv,
} from '@openfn/language-common';
