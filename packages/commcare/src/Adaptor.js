import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { Blob } from 'node:buffer';
import js2xmlparser from 'js2xmlparser';
import xlsx from 'xlsx';

import { request, prepareNextState } from './Utils';

/**
 * Queries provided to the GET request
 * @typedef {Object} RequestQueries
 * @property {number} limit - The maximum number of records to return. Default: 20. Maximum: 5000.
 * @property {number} offset - The number of records to offset in the results. Default: 0
 * @property {string} xmlns - Optional form XML namespace. See the [Commcare Docs](https://dimagi.atlassian.net/wiki/spaces/commcarepublic/pages/2143979045/Finding+a+Form%27s+XMLNS)
 * @property {string} indexed_on_start - Optional date (and time). Will return only forms that have had data modified since the passed in date.
 * @property {string} indexed_on_end - Optional date (and time). Will return only forms that have had data modified before the passed in date.
 * @property {string} received_on_start - Optional date (and time). Will return only forms that were received after the passed in date.
 * @property {string} received_on_end - Optional date (and time). Will return only forms that were received before the passed in date.
 * @property {string} app_id - The returned records will be limited to the application defined
 * @property {string} case_id - A case UUID.  Will only return forms which updated that case.
 * @property {string} owner_id - Optional user of group UUID used when getting cases
 * @property {string} user_id - Optional UUID for all cases last modified by that user
 * @property {string} type - Optional case type to get all matching cases
 */

/**
 * Queries provided to the submitXls request
 * @typedef {Object} RequestOptions
 * @property {string} case_type - Optional case type
 * @property {string} search_field - Optional search field
 * @property {string} create_new_cases - Optional for allowing to create new cases. Default `:on`
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
 * Make a GET request to any commcare endpoint. The returned objects will be written to state.data.
 * Unless an `offset` is passed, `get()` will automatically pull down all pages of data if the response
 * is paginated.
 * A `response` key will be added to state with the HTTP response and a `meta` key
 * @public
 * @example <caption>Get a list of cases</caption>
 * get("case", { limit: 20 })
 * @example <caption>Get a specific case </caption>
 * get("case/12345")
 * @function
 * @param {string} path - Path to resource
 * @param {RequestQueries} params - Optional request params such as limit and offset.
 * @param {function} [callback] - Callback invoked once per page of data retrieved.
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
        const response = await request(
          state.configuration,
          `/a/${domain}/api/v0.5/${resolvedPath}`,
          {
            method: 'GET',
            params: requestParams,
            contentType: 'application/json',
          }
        );

        nextState = prepareNextState(state, response, callback);
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
 * Make a post request to commcare
 * @example
 * post( "user", { "username":"test", "password":"somepassword" })
 * @function
 * @public
 * @param {string} path - Path to resource
 * @param {object} data - Object or JSON which defines data that will be used to create a given instance of resource
 * @param {Object} params - Optional request params.
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
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
      const response = await request(
        state.configuration,
        `/a/${domain}/api/v0.5/${resolvedPath}`,
        {
          method: 'POST',
          data: resolvedData,
          params: resolvedParams,
          contentType: 'application/json',
        }
      );

      return prepareNextState(state, response, callback);
    } catch (e) {
      throw e.body.error ?? e;
    }
  };
}

/**
 * Convert form data to xls then submit.
 * @public
 * @example
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
 * @function
 * @param {Object} formData - Object including form data.
 * @param {RequestOptions} params - Request params including case type.
 * @returns {Operation}
 */
export function submitXls(formData, params) {
  return async state => {
    const { domain } = state.configuration;

    const [json] = expandReferences(state, formData);
    const { case_type, search_field, create_new_cases } = params;

    const path = `/a/${domain}/importer/excel/bulk_upload_api/`;

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(json);
    const ws_name = 'SheetJS';
    xlsx.utils.book_append_sheet(workbook, worksheet, ws_name);

    // Generate buffer
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xls' });
    // xlsx.writeFile(workbook, 'out.xls'); // If needing to write to filesystem

    const data = new FormData();

    data.append('file', new Blob([buffer]), 'output.xls');
    // data.append('file', fs.createReadStream('out.xls'));
    data.append('case_type', case_type);
    data.append('search_field', search_field);
    data.append('create_new_cases', create_new_cases);

    try {
      const response = await request(state.configuration, path, {
        method: 'POST',
        data,
      });

      return prepareNextState(state, response);
    } catch (e) {
      throw e.body ?? e;
    }
  };
}

/**
 * Submit form data
 * @public
 * @example
 *  submit(
 *    fields(
 *      field("@", function(state) {
 *        return {
 *          "xmlns": "http://openrosa.org/formdesigner/form-id-here"
 *        };
 *      }),
 *      field("question1", dataValue("answer1")),
 *      field("question2", "Some answer here.")
 *    )
 *  )
 * @function
 * @param {Object} formData - Object including form data.
 * @returns {Operation}
 */
export function submit(formData) {
  return async state => {
    const [jsonBody] = expandReferences(state, formData);
    const body = js2xmlparser('data', jsonBody);

    const { domain, appId } = state.configuration;

    const path = `/a/${domain}/receiver/${appId}/`;

    console.log('Raw JSON body: '.concat(JSON.stringify(jsonBody)));
    console.log('X-form submission: '.concat(body));

    const response = await request(state.configuration, path, {
      method: 'POST',
      data: body,
      contentType: 'text/xml',
      parseAs: 'text',
    });

    return prepareNextState(state, response);
  };
}

/**
 * Make a GET request to CommCare's Reports API
 * and POST the response to somewhere else.
 * @public
 * @example
 * fetchReportData(reportId, params, postUrl)
 * @function
 * @param {String} reportId - API name of the report.
 * @param {RequestQueries} params - Query params, incl: limit, offset, and any custom report filters.
 * @param {String} postUrl - Url to which the response object will be posted.
 * @returns {Operation}
 */
export function fetchReportData(reportId, params, postUrl) {
  return async state => {
    const path = `/a/${state.configuration.domain}/api/v0.5/configurablereportdata/${reportId}/`;

    console.log('with params: '.concat(JSON.stringify(params)));

    const { body: reportData } = await request(state.configuration, path, {
      method: 'GET',
      contentType: 'application/json',
    });

    await request(state.configuration, postUrl, {
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

export {
  fn,
  fnIf,
  alterState,
  arrayToString,
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
