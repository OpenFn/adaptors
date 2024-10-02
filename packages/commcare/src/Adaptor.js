import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { Blob } from 'node:buffer';
import js2xmlparser from 'js2xmlparser';
import xlsx from 'xlsx';

import * as util from './Utils';
/**
 * State object
 * @typedef {Object} CommcareHttpState
 * @property data - The response body (as JSON)
 * @property response - The HTTP response from the CommCare server (excluding the body)
 * @property references - An array of all previous data objects used in the Job
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for commcare.
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

/**
 * Make a GET request to any CommCare endpoint. The response body will be returned to `state.data` as JSON.
 * Paginated responses will be fully downloaded and returned as a single array, _unless_ an `offset` is passed.
 * @public
 * @function
 * @example <caption>Get a specific case by id</caption>
 * get("/case/12345")
 * @example <caption>Get exactly 20 cases</caption>
 * get("/case", { offset:0, limit: 20 })
 * @example <caption>Get forms by app id</caption>
 * get("/form", { app_id: "02bf50ab803a89ea4963799362874f0c" })
 * @example <caption>Get all cases, 50 at a time, and add them to state</caption>
 * get("/case", {}, (state) => {
 *    state.cases.push(...state.data) // adds 50 cases to the cases array
 *    return state;
 * })
 * @param {string} path - Path to resource
 * @param {Object} [params] - Input parameters for the request. These vary by endpoint,  see {@link https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143957366/Data+APIs CommCare docs}.
 * @param {function} [callback] - Optional callback function. Invoked once per page of data retrieved.
 * @state {CommcareHttpState}
 * @returns {Operation}
 */
export function get(path, params = {}, callback = s => s) {
  return async state => {
    const { domain } = state.configuration;
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    let offset, limit;

    let nextState = state;
    let result;

    // Automatically paginate if the user did not pass an offset
    let allowPagination = isNaN(resolvedParams.offset);

    try {
      let requestParams = {
        ...resolvedParams,
      };

      do {
        // Make the first request
        const response = await util.request(
          state.configuration,
          `/a/${domain}/api/v0.5/${resolvedPath}`,
          {
            method: 'GET',
            params: requestParams,
            contentType: 'application/json',
          }
        );

        nextState = util.prepareNextState(state, response, callback);
        // If the server tells us there's another page of data, setup
        // the next request to get it
        if (response?.body?.meta?.next) {
          if (!result) {
            result = [];
          }
          offset = response.body.meta.offset + response.body.meta.limit;
          limit = response.body.meta.limit;

          requestParams = {
            ...requestParams,
            offset,
            limit,
          };
          result.push(...nextState.data);
        } else {
          if (result) {
            result.push(...nextState.data);
          } else {
            result = nextState.data;
          }
          // Exit the loop when no more data is available
          break;
        }
      } while (allowPagination);

      return {
        ...nextState,
        data: result,
      };
    } catch (e) {
      if (e.statusCode === 404) {
        e.body = { error: `Resource ${path} not found` };
      }
      throw e;
    }
  };
}

/**
 * Make a POST request to any CommCare endpoint.
 * @example <caption>Post a user object to to the /user endpoint</caption>
 * post("/user", { "username":"test", "password":"somepassword" })
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} data - Object or JSON to use as the request body
 * @param {Object} [params] - Optional request params
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @state {CommcareHttpState}
 */
export function post(path, data, params = {}, callback = s => s) {
  return async state => {
    const { domain } = state.configuration;
    const [resolvedPath, resolvedData, resolvedParams] = expandReferences(
      state,
      path,
      data,
      params
    );

    try {
      const response = await util.request(
        state.configuration,
        `/a/${domain}/api/v0.5/${resolvedPath}`,
        {
          method: 'POST',
          data: resolvedData,
          params: resolvedParams,
          contentType: 'application/json',
        }
      );

      return util.prepareNextState(state, response, callback);
    } catch (e) {
      throw e.body.error ?? e;
    }
  };
}

/**
 * Bulk upload data to CommCare. Accepts an array of objects, converts them into
 * an XLS representation, and uploads.
 * @public
 * @function
 * @example <caption>Upload a single row of data</caption>
 * submitXls(
 *    [
 *      {name: 'Mamadou', phone: '000000'},
 *    ],
 *    {
 *      case_type: 'student',
 *      search_field: 'external_id',
 *      create_new_cases: 'on',
 *    }
 * )
 * @param {array} data - Array of objects to upload
 * @param {Object} params - Input parameters, see {@link https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143946459/Bulk+Upload+Case+Data CommCare docs}.
 * @state data - the response from the CommCare Server
 * @returns {Operation}
 */
export function submitXls(data, params) {
  return async state => {
    const { domain } = state.configuration;

    const [json] = expandReferences(state, data);
    const { case_type, search_field, create_new_cases } = params;

    const path = `/a/${domain}/importer/excel/bulk_upload_api/`;

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(json);
    const ws_name = 'SheetJS';
    xlsx.utils.book_append_sheet(workbook, worksheet, ws_name);

    // Generate buffer
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xls' });
    // xlsx.writeFile(workbook, 'out.xls'); // If needing to write to filesystem

    const form = new FormData();

    form.append('file', new Blob([buffer]), 'output.xls');
    // data.append('file', fs.createReadStream('out.xls'));
    form.append('case_type', case_type);
    form.append('search_field', search_field);
    form.append('create_new_cases', create_new_cases);

    try {
      const response = await util.request(state.configuration, path, {
        method: 'POST',
        data: form,
      });

      return util.prepareNextState(state, response);
    } catch (e) {
      throw e.body ?? e;
    }
  };
}

/**
 * Submit forms to CommCare. Accepts an array of JSON
 * objects, converts them into XML, and submits to CommCare as an x-form.
 * @public
 * @function
 * @example <caption>Submit a form to CommCare</caption>
 *  submit(
 *    fields(
 *      field("@", (state) => ({
 *          "xmlns": `http://openrosa.org/formdesigner/${state.formId}`
 *      }),
 *      field("question1", (state) => state.data.answer1),
 *      field("question2", (state) => state.data.answer2),
 *    )
 *  )
 * @param {Object} data - The form as a JSON object
 * @state data - the response from the CommCare Server
 * @returns {Operation}
 */
export function submit(data) {
  return async state => {
    const [jsonBody] = expandReferences(state, data);
    const body = js2xmlparser('data', jsonBody);

    const { domain, appId } = state.configuration;

    const path = `/a/${domain}/receiver/${appId}/`;

    console.log('Raw JSON body: '.concat(JSON.stringify(jsonBody)));
    console.log('X-form submission: '.concat(body));

    const response = await util.request(state.configuration, path, {
      method: 'POST',
      data: body,
      contentType: 'text/xml',
      parseAs: 'text',
    });

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a GET request to CommCare's Reports API
 * and POST the response somewhere else.
 * @public
 * @example <caption>Fetch 10 records from a report and post them to example.com</caption>
 * fetchReportData(
 *   "9aab0eeb88555a7b4568676883e7379a",
 *   { limit: 10 },
 *   "https://www.example.com/api/"
 * )
 * @function
 * @param {String} reportId - API name of the report.
 * @param {Object} params - Input parameters for the request, see {@link https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143957341/Download+Report+Data Commcare docs}.
 * @param {String} postUrl - URL to which the response object will be posted.
 * @returns {Operation}
 */
export function fetchReportData(reportId, params, postUrl) {
  return async state => {
    const path = `/a/${state.configuration.domain}/api/v0.5/configurablereportdata/${reportId}/`;

    console.log('with params: '.concat(JSON.stringify(params)));

    const { body: reportData } = await util.request(state.configuration, path, {
      method: 'GET',
      contentType: 'application/json',
    });

    await util.request(state.configuration, postUrl, {
      method: 'POST',
      params,
      data: reportData,
      contentType: 'application/json',
    });

    console.log('fetchReportData succeeded.');
    console.log('Posted to: ', postUrl);
    return state;
  };
}

/**
 * Make a general HTTP request against the Commcare server.
 * @example <caption>Make a GET request to get cases</caption>
 * request("GET", "/a/asri/api/v0.5/case");
 * @function
 * @public
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource
 * @param {object} body - Object which will be attached to the body
 * @param {RequestOptions} options - Optional request params
 * @returns {Operation}
 * @state {CommcareHttpState}
 */
export function request(method, path, body, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedBody, resolvedOptions] =
      expandReferences(state, method, path, body, options);
      const response = await util.request(state.configuration, resolvedPath, {
        method: resolvedMethod,
        data: resolvedBody,
        params: resolvedOptions,
        contentType: 'application/json',
      });

      return util.prepareNextState(state, response);

  };
}

/**
 * Bulk upload data to CommCare for case-data or lookup-table. Accepts an array of objects, converts them into
 * an XLS representation, and uploads.
 * @public
 * @function
 * @example <caption>Upload a single row of data for case-data</caption>
 * bulk(
 *    [
 *      {name: 'Mamadou', phone: '000000'},
 *    ],
 *    {
 *      case_type: 'student',
 *      search_field: 'external_id',
 *      create_new_cases: 'on',
 *    }
 * )
 * @example <caption>Upload a single row of data for a lookup-table</caption>
 * bulk(
 *     'lookup-table'
 *  {
 *    types: [{
 *
 *   'DELETE(Y/N)':'N',
 *   table_id: 'fruit',
 *   'is_global?':'yes',
 *   'field 1': 'type',
 *   'field 2': 'name',
 *      }],
 *      fruit: [{
 *       UID: '',
 *        'DELETE(Y/N)':'N',
 *       'field:type': 'citrus',
 *        'field:name': 'Orange',
 *     }],
 *   }
 * )
 * @param {string} type - case-data or lookup-table
 * @param {array} data - Array of objects to upload
 * @param {Object} params - Input parameters, see {@link https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143946459/Bulk+Upload+Case+Data CommCare docs} for case-data and {@link https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143946023/Bulk+upload+Lookup+Tables Commcare Docs} for lookup-table.
 * @state data - the response from the CommCare Server
 * @returns {Operation}
 */
export function bulk(type, data, params) {
  return async state => {
    const { domain } = state.configuration;

    const [json] = expandReferences(state, data);
    let path, file;

    const workbook = xlsx.utils.book_new();

    if (type.toLowerCase() === 'lookup-table') {
      path = `/a/${domain}/fixtures/fixapi/`;
      file = 'file-to-upload';
      // append types and lookup-table name xlsx
      Object.keys(json).forEach(sectionName => {
        const sectionData = data[sectionName];

        const newSheet = xlsx.utils.json_to_sheet(sectionData);
        xlsx.utils.book_append_sheet(workbook, newSheet, sectionName);
      });
    } else if (type.toLowerCase() === 'case-data') {
      path = `/a/${domain}/importer/excel/bulk_upload_api/`;
      file = 'file';
      const worksheet = xlsx.utils.json_to_sheet(json);
      const ws_name = 'SheetJS';
      xlsx.utils.book_append_sheet(workbook, worksheet, ws_name);
    } else {
      const e = new Error('Unrecognized type');
      e.description = `The type key was not recognized: ${type}`;
      e.fix = 'Set type to case-data or lookup-table';
      throw e;
    }

    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const form = new FormData();

    form.append(file, new Blob([buffer]), 'data.xlsx');

    for (const key in params) {
      form.append(key, params[key]);
    }

    const response = await util.request(state.configuration, path, {
      method: 'POST',
      data: form,
    });

    return util.prepareNextState(state, {
      ...response,
      body: {
        message: response.body.message.replace(/\n/g, ''),
        code: response.body.code,
      },
    });
  };
}
export {
  fn,
  fnIf,
  cursor,
  alterState,
  arrayToString,
  dateFns,
  combine,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
