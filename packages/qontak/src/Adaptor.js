
import {
  setAuth,
  setUrl,
  mapToAxiosConfig,
  tryJson,
  assembleError,
  FormData
} from './Utils';

import {
  execute as commonExecute,
  expandReferences,
  composeNextState,
  http,
} from '@openfn/language-common';

import nodeRequest from 'request';
import cheerio from 'cheerio';
import cheerioTableparser from 'cheerio-tableparser';
import fs from 'fs';
import parse from 'csv-parse';
import tough from 'tough-cookie';
import { RateLimiter } from 'limiter';

const { axios } = http;

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @function
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

axios.interceptors.request.use(config => {
  cookiejar?.getCookies(config.url, (err, cookies) => {
    config.headers.cookie = cookies?.join('; ');
  });
  return config;
});

function handleCookies(response) {
  const { config, data, headers } = response;
  if (config.keepCookie) {
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
    response.config.method.toUpperCase(),
    'request succeeded with',
    response.status,
    '✓'
  );

  const compatibleResp = {
    ...response,
    httpStatus: response.status,
    message: response.statusText,
    data: tryJson(response.data),
  };

  const respWithCookies = handleCookies(compatibleResp);

  return {
    ...composeNextState(state, respWithCookies.data),
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
 *    authentication: {username: 'user', password: 'pass'}
 *  })
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function get(path, params, callback) {
  return state => {
    const resolvedPath = expandReferences(path)(state);
    const resolvedParams = http.expandRequestReferences(params)(state);

    const url = setUrl(state.configuration, resolvedPath);

    const auth = setAuth(
      state.configuration,
      resolvedParams?.authentication ?? resolvedParams?.auth
    );

    const config = mapToAxiosConfig({ ...resolvedParams, url, auth });

    return http
      .get(config)(state)
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
    const resolvedPath = expandReferences(path)(state);
    const resolvedParams = http.expandRequestReferences(params)(state);

    const url = setUrl(state.configuration, resolvedPath);

    const auth = setAuth(
      state.configuration,
      resolvedParams?.authentication ?? resolvedParams?.auth
    );

    const config = mapToAxiosConfig({ ...resolvedParams, url, auth });

    return http
      .post(config)(state)
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
 *    authentication: {username: 'user', password: 'pass'}
 *  })
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - Body, Query, Headers and Auth parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function put(path, params, callback) {
  return state => {
    const resolvedPath = expandReferences(path)(state);
    const resolvedParams = http.expandRequestReferences(params)(state);

    const url = setUrl(state.configuration, resolvedPath);

    const auth = setAuth(
      state.configuration,
      resolvedParams?.authentication ?? resolvedParams?.auth
    );

    const config = mapToAxiosConfig({ ...resolvedParams, url, auth });

    return http
      .put(config)(state)
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
    const resolvedPath = expandReferences(path)(state);
    const resolvedParams = http.expandRequestReferences(params)(state);

    const url = setUrl(state.configuration, resolvedPath);

    const auth = setAuth(
      state.configuration,
      resolvedParams?.authentication ?? resolvedParams?.auth
    );

    const config = mapToAxiosConfig({ ...resolvedParams, url, auth });

    return http
      .patch(config)(state)
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
    const resolvedPath = expandReferences(path)(state);
    const resolvedParams = http.expandRequestReferences(params)(state);

    const url = setUrl(state.configuration, resolvedPath);

    const auth = setAuth(
      state.configuration,
      resolvedParams?.authentication ?? resolvedParams.auth
    );

    const config = mapToAxiosConfig({ ...resolvedParams, url, auth });

    return http
      .delete(config)(state)
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

/**
 * CSV-Parse for CSV conversion to JSON
 * @public
 * @example
 *  parseCSV("/home/user/someData.csv", {
 * 	  quoteChar: '"',
 * 	  header: false,
 * 	});
 * @function
 * @param {String} target - string or local file with CSV data
 * @param {Object} config - csv-parse config object
 * @returns {Operation}
 */
export function parseCSV(target, config) {
  return state => {
    return new Promise((resolve, reject) => {
      var csvData = [];

      try {
        fs.readFileSync(target);
        fs.createReadStream(target)
          .pipe(parse(config))
          .on('data', csvrow => {
            console.log(csvrow);
            csvData.push(csvrow);
          })
          .on('end', () => {
            console.log(csvData);
            resolve(composeNextState(state, csvData));
          });
      } catch (err) {
        var csvString;
        if (typeof target === 'string') {
          csvString = target;
        } else {
          csvString = expandReferences(target)(state);
        }
        csvData = parse(csvString, config, (err, output) => {
          console.log(output);
          resolve(composeNextState(state, output));
        });
      }
    });
  };
}

/**
 * Make a request using the 'request' node module. This module is deprecated.
 * @example
 *  request(params);
 * @function
 * @param {object} params - Query, Headers and Authentication parameters
 * @returns {Operation}
 */
export function request(params) {
  return state => {
    const resolvedParams = http.expandRequestReferences(params)(state);

    return new Promise((resolve, reject) => {
      nodeRequest(resolvedParams, (error, response, body) => {
        error = assembleError({ error, response, resolvedParams });
        error && reject(error);

        console.log(
          '✓ Request succeeded. (The response body available in state.)'
        );
        const resp = tryJson(body);
        resolve(resp);
      });
    });
  };
}

function convertToCSVString(arr) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array.map(it => {
    return Object.values(it).toString();
  }).join('\n');
}

// The call to your API

async function callTheAPI(theAPI, jobName, state, reqIndex, attempt = 0) {
  console.log('Request ', jobName, ' Start:', reqIndex, `attempt:${attempt}`, new Date().toISOString());

  try {
    const finalState = await theAPI(state);

    console.log('Request ', jobName, ' End:  ', reqIndex, `attempt:${attempt}`, finalState.response.status);

    return finalState;
  } catch (error) {
    if (error.response) {
      console.log('Request ', jobName, ' End:  ', reqIndex, `attempt:${attempt}`, error.response.status);

      if (error.response.status === 429 || error.response.status === 422) {
        return { ...state, response: error.response };
      }
    }

    throw error;
  }
}

// General Helpers

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function nextTick() {
  return sleep(0);
}

function getArrayOfLength(length) {
  return Array.from(Array(length).keys());
}

// Ratelimit helpers

class LimiterLibraryRateLimiter {
  constructor({ maxRequests, maxRequestWindowMS, limiter }) {
    this.maxRequests = maxRequests
    this.maxRequestWindowMS = maxRequestWindowMS
    this.limiter = limiter;
  }

  async acquireToken(fn) {
    if (this.limiter.tryRemoveTokens(1)) {
      await nextTick()
      return fn()
    } else {
      await sleep(this.maxRequestWindowMS)
      return this.acquireToken(fn)
    }
  }
}

function getMillisToSleep(retryHeaderString) {
  let millisToSleep = Math.round(parseFloat(retryHeaderString) * 1000);
  if (isNaN(millisToSleep)) {
    millisToSleep = Math.max(0, new Date(retryHeaderString) - new Date());
  }
  return millisToSleep;
}

async function fetchAndRetryIfNecessary(callAPI, state, index, attempt = 0) {
  const finalState = await callAPI(attempt);
  if (finalState.response.status === 429) {
    const retryAfter = finalState.response.headers[state.configuration.retryAfterHeader ? state.configuration.retryAfterHeader : "x-ratelimit-reset"]; // Qontak set this header
    const millisToSleep = getMillisToSleep(retryAfter) + (state.configuration.qontak.broadcastBulkAPI.extraWaitMS ? state.configuration.qontak.broadcastBulkAPI.extraWaitMS : 6000); // 6000ms is the sweet spot for Qontak
    console.log('❗ Retrying:  ', index, `attempt:${attempt + 1}`, 'at', retryAfter, 'sleep for', millisToSleep, 'ms');
    await sleep(millisToSleep);
    return fetchAndRetryIfNecessary(callAPI, state, index, attempt + 1);
  } else if (finalState.response.status === 422 &&
    attempt < 10 &&
    finalState.response.data &&
    finalState.response.data.error.messages[0].toLowerCase() === "please wait a moment to send a new broadcast message.") {

    const millisToSleep = 100;
    console.log('❗ Retrying weird 422:  ', index, `attempt:${attempt + 1}`, 'sleep for', millisToSleep, 'ms');
    await sleep(millisToSleep);
    return fetchAndRetryIfNecessary(callAPI, state, index, attempt + 1);
  }
  return finalState;
}

/**
 * Make a POST Broadcast Bulk request to Qontak
 * @public
 * @example
 *  fn(state => {
 *    const requestBody = {};
 *    const jobName = "A cool job";
 *    return qontakBroadcastBulk(state, requestBody, jobName);
 *  })
 * @function
 * @param {Object} state - The state
 * @param {Object} requestBody - Body parameter
 * @param {Object} jobName - The OpenFn Job name
 * @returns {Object}
 */
export async function qontakBroadcastBulk(state, requestBody, jobName) {
  // Give Qontak some time to process the contact list (because the API is
  // asynchronous and currently there is no "Create contact list synchronously")
  await sleep(state.configuration.qontak.contactListAPI.initialDelayMS);

  for (let i = 0; i < state.configuration.qontak.contactListAPI.maxRetries; i++) {
    try {
      // Try retrieve Contact List by ID until `progress` equalTo `success`
      const contactListFinalState = await get(`${state.configuration.qontak.baseUrl}/v1/contacts/contact_lists/${state.contactListId}`, {
        headers: {
          'Authorization': `${state.configuration.qontak.tokenType} ${state.configuration.qontak.accessToken}`
        }
      })(state);

      if (contactListFinalState.data.data.progress) {
        if ("success" === contactListFinalState.data.data.progress.toLowerCase()) {
          break;
        } else if ("processing" === contactListFinalState.data.data.progress.toLowerCase()) {
          await sleep(state.configuration.qontak.contactListAPI.delayMS);
          continue;
        }
      }

      throw new Error("Contact List upload has failed");

    } catch (error) {
      if (error.response) {
        console.error("error.response.data:", error.response.data);
      }

      throw error;
    }
  }

  // Broadcast Bulk with retries if 429
  const maxRequests = state.configuration.qontak.broadcastBulkAPI.maxRequests;
  const maxRequestWindowMS = state.configuration.qontak.broadcastBulkAPI.maxRequestsWindowMS;
  const limiter = new RateLimiter(maxRequests, maxRequestWindowMS, false);
  const tokenBucket = new LimiterLibraryRateLimiter({
    maxRequests,
    maxRequestWindowMS,
    limiter
  });

  const promises = getArrayOfLength(state.configuration.qontak.broadcastBulkAPI.numRequestsParallel).map(async (index) => (
    fetchAndRetryIfNecessary(async (attempt = 0) => (
      tokenBucket.acquireToken(() => callTheAPI(
        post(`${state.configuration.qontak.baseUrl}/v1/broadcasts/whatsapp`, {
          body: requestBody,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${state.configuration.qontak.tokenType} ${state.configuration.qontak.accessToken}`
          }
        }), jobName, state, index, attempt))
    ), state, 0, index)
  ));

  const finalStates = await Promise.all(promises);

  return finalStates[0];
}

/**
 * Make a POST Create Contact List request to Qontak
 * @public
 * @example
 *  fn(state => {
 *    const csvAbsoluteFileName = "/tmp/file.csv";
 *    const jobName = "A cool job";
 *    return qontakCreateContactList(state, csvAbsoluteFileName, jobName);
 *  })
 * @function
 * @param {Object} state - The state
 * @param {Object} csvAbsoluteFileName - The absolute path to the CSV file
 * @param {String} jobName - The OpenFn Job name
 * @returns {Object}
 */
export async function qontakCreateContactList(state, csvAbsoluteFileName, jobName) {
  const mothers = state.response.body.rows;

  state.campaignName = new Date().toISOString() + " Bunda App (" + jobName + ")";
  state.csvAbsoluteFileName = csvAbsoluteFileName;

  fs.writeFileSync(csvAbsoluteFileName, convertToCSVString(mothers));

  try {
    activateQontakAuthResponseInterceptor()(state);

    // Hit Qontak's API "Create contact list asynchronously"
    const maxRequests = state.configuration.qontak.contactListAPI.maxRequests;
    const maxRequestWindowMS = state.configuration.qontak.contactListAPI.maxRequestsWindowMS;
    const limiter = new RateLimiter(maxRequests, maxRequestWindowMS, false);
    const tokenBucket = new LimiterLibraryRateLimiter({
      maxRequests,
      maxRequestWindowMS,
      limiter
    });

    const createFormDataThenPost = (state2) => {
      const formData = createContactListFormData(state2);
      return post(`${state2.configuration.qontak.baseUrl}/v1/contacts/contact_lists/async`, {
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `${state2.configuration.qontak.tokenType} ${state2.configuration.qontak.accessToken}`
        },
      },
        state3 => {
          if (!state3.data.data.id) {
            throw new Error("Contact List ID not retrieved");
          }

          state3.contactListId = state3.data.data.id;
          return state3;
        }
      )(state2);
    }

    const promises = getArrayOfLength(state.configuration.qontak.contactListAPI.numRequestsParallel).map(async (index) => (
      fetchAndRetryIfNecessary(async (attempt = 0) => (
        tokenBucket.acquireToken(() =>
          callTheAPI(createFormDataThenPost, "Create Contact List", state, index, attempt)
        )
      ), state, 0, index)
    ));

    const finalStates = await Promise.all(promises);
    return finalStates[0];
  } catch (error) {
  }
}

function createContactListFormData(state) {
  const readStream = fs.createReadStream(state.csvAbsoluteFileName);

  const formData = new FormData();
  formData.append("source_type", "spreadsheet");
  formData.append("name", state.campaignName);
  formData.append("file", readStream);
  return formData;
}

/**
 * Activate the auth response interceptor for Qontak APIs
 * @public
 * @example
 *  activateQontakAuthResponseInterceptor();
 * @function
 * @returns {Operation}
 */
export function activateQontakAuthResponseInterceptor() {
  return state => qontakAuthAxiosResponseInterceptor(state);
}

function qontakAuthAxiosResponseInterceptor(state) {
  if (!state.qontakResponseInterceptor) {
    // Response interceptor for API calls
    state.qontakResponseInterceptor = axios.interceptors.response.use(
      response => response,
      error => qontakAPIErrorHandling(error, state)
    );
  }
  return state;
}

// Qontak APIs Error Handling
function qontakAPIErrorHandling(error, state) {
  const originalRequestConfig = error.config;

  if ("HPE_INVALID_HEADER_TOKEN" === error.code) {
    console.error("Qontak has non-compliant response header(s), please use `--insecure-http-parser` in `NODE_OPTIONS` environment variable.");
    return Promise.reject(error);
  } else if (error.response) {
    console.error("error.response.data:", error.response.data);

    if (error.response.status === 429 || error.response.status === 422) {
      throw error;
    }
    // Reject promise if usual error
    else if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    // Refresh token then retry request
    else if (error.response.status === 401 && !originalRequestConfig._retry) {
      originalRequestConfig._retry = true;
      return qontakRefreshTokenThenRetry(state, originalRequestConfig);
    }
  }

  return Promise.reject(error);
}

function qontakRefreshTokenThenRetry(state, originalRequestConfig) {
  return axios({
    method: "POST",
    url: `${state.configuration.qontak.baseUrlAuth}/oauth/token`,
    data: {
      "username": state.configuration.qontak.username,
      "password": state.configuration.qontak.password,
      "grant_type": state.configuration.qontak.grantType,
      "client_id": state.configuration.qontak.clientId,
      "client_secret": state.configuration.qontak.clientSecret
    },
    headers: {
      'Content-Type': "application/json",
    }
  })
    .then(response => handleResponse(state, response))
    .then(nextState => qontakSaveToken(nextState))
    .then(nextState => retryOriginalRequest(nextState, originalRequestConfig));
}

function qontakSaveToken(nextState) {
  nextState.configuration.qontak.accessToken = nextState.response.data.access_token;
  nextState.configuration.qontak.tokenType = nextState.response.data.token_type;
  nextState.configuration.qontak.expiresIn = nextState.response.data.expires_in;
  nextState.configuration.qontak.refreshToken = nextState.response.data.refresh_token;
  nextState.configuration.qontak.createdAt = nextState.response.data.created_at;
  axios.defaults.headers.common['Authorization'] = `${nextState.configuration.qontak.tokenType} ${nextState.configuration.qontak.accessToken}`;
  console.log("Access token refreshed.");
  return nextState;
}

function retryOriginalRequest(nextState, originalRequestConfig) {
  modifyOriginalRequestConfig(originalRequestConfig, nextState);

  return axios(originalRequestConfig);
}

function modifyOriginalRequestConfig(originalRequestConfig, nextState) {
  if (originalRequestConfig.data instanceof FormData) {
    const formData = createContactListFormData(nextState);
    originalRequestConfig.data = formData;

    originalRequestConfig.headers = {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      'Authorization': `${nextState.configuration.qontak.tokenType} ${nextState.configuration.qontak.accessToken}`
    }
  } else {
    originalRequestConfig.headers = {
      'Content-Type': originalRequestConfig.headers['Content-Type'],
      'Authorization': `${nextState.configuration.qontak.tokenType} ${nextState.configuration.qontak.accessToken}`
    }
  }
}

export { axios };

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
} from '@openfn/language-common';
