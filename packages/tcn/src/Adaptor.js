
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

function createStringPayloadForImportScheduleAPI(state, params) {
  return `login.username=${state.configuration.tcn.username}\n` +
    `login.password=${state.configuration.tcn.password}\n` +
    `file.1.description=${params.description}\n` +
    `file.1.country=${params.country}\n` +
    `file.1.import_template_number=${params.importTemplateNumber}\n` +
    `file.1.schedule_template_number=${params.scheduleTemplateNumber}\n` +
    `____DATA-START____\n` +
    params.csvData;
}

function createImportSchedulePayloadFormData(payloadFilePath) {
  const readStream = fs.createReadStream(payloadFilePath);

  const formData = new FormData();
  formData.append("file", readStream);
  return formData;
}

/**
 * Convert a JSON Array into a CSV String
 * @example
 *  convertToCSVString(state.response.body.rows)
 * @function
 * @param {array} arr - Array to be converted
 * @returns {String}
 */
export function convertToCSVString(arr, useHeader = false) {
  let array;
  if (useHeader) {
    array = [Object.keys(arr[0])].concat(arr);
  } else {
    array = arr;
  }

  return array.map(it => {
    return Object.values(it).toString();
  }).join('\n');
}

/**
 * Hit TCN's Import Schedule API with creating the needed payload first
 * @public
 * @example
 *  tcnImportScheduleAPI({
 *    payloadFilePath: "/mnt/d/tmp/contacts_CSV/TCN-ANC_Visit_Reminder.txt",
 *    description: "test ANC Visit Reminder",
 *    country: "Indonesia",
 *    importTemplateNumber: "1",
 *    scheduleTemplateNumber: "2",
 *    csvData: "081234567890,Someone\n081234567891,Sometwo",
 *  });
 * @function
 * @param {object} params - Payload file path, Description, Country, Import Template Number, Schedule Template Number, CSV data
 * @param {function} callback - (Optional) Callback function
 * @returns {operation}
 */
export function tcnImportScheduleAPI(params, callback) {
  return state => {

    fs.writeFileSync(params.payloadFilePath, createStringPayloadForImportScheduleAPI(state, params));

    const formData = createImportSchedulePayloadFormData(params.payloadFilePath);

    return post(
      `${state.configuration.tcn.baseUrl}/FtpReceptionServlet`,
      {
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      },
      callback
    )(state);
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
