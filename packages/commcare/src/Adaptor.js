

import {
  execute as commonExecute,
  http,
  expandReferences,
} from '@openfn/language-common';
import pkg from '@openfn/language-http';
const { get, post } = pkg
import request from 'superagent';
import FormData from 'form-data';
import js2xmlparser from 'js2xmlparser';
import xlsx from 'xlsx';

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
    state.configuration.authType = 'basic';
    state.configuration.baseUrl = 'https://www.commcarehq.org/a/'.concat(
      state.configuration.applicationName
    );
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Performs a post request
 * @example
 *  clientPost(formData)
 * @function
 * @param {Object} formData - Form Data with auth params and body
 * @returns {State}
 */
function clientPost({ url, body, username, password }) {
  return new Promise((resolve, reject) => {
    request
      .post(url)
      .auth(username, password)
      .set('Content-Type', 'application/xml')
      .send(body)
      .end((error, res) => {
        if (!!error || !res.ok) {
          reject(error);
        }
        resolve(res);
      });
  });
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
 * @param {Object} params - Request params including case type and external id.
 * @returns {Operation}
 */
export function submitXls(formData, params) {
  return state => {
    const { applicationName, hostUrl, username, apiKey } = state.configuration;

    const json = expandReferences(formData)(state);
    const { case_type, search_field, create_new_cases } = params;

    const url = (hostUrl || 'https://www.commcarehq.org').concat(
      '/a/',
      applicationName,
      '/importer/excel/bulk_upload_api/'
    );

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(json);
    const ws_name = 'SheetJS';
    xlsx.utils.book_append_sheet(workbook, worksheet, ws_name);

    // Generate buffer
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xls' });
    // xlsx.writeFile(workbook, 'out.xls'); // If needing to write to filesystem

    const data = new FormData();

    data.append('file', buffer, { filename: 'output.xls' });
    // data.append('file', fs.createReadStream('./out.xls'));
    data.append('case_type', case_type);
    data.append('search_field', search_field);
    data.append('create_new_cases', create_new_cases);

    console.log('Posting to url: '.concat(url));
    return http
      .post({
        url,
        data,
        headers: {
          ...data.getHeaders(),
          Authorization: `ApiKey ${username}:${apiKey}`,
        },
      })(state)
      .then(response => {
        return { ...state, data: { body: response.data } };
      })
      .catch(err => {
        throw { ...err, config: {}, request: {} };
      });
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
  return state => {
    const jsonBody = expandReferences(formData)(state);
    const body = js2xmlparser('data', jsonBody);

    const {
      // this should be called project URL.
      // it is what lives after www.commcarehq.org/a/...
      applicationName,
      username,
      password,
      appId,
      hostUrl,
    } = state.configuration;

    const url = (hostUrl || 'https://www.commcarehq.org').concat(
      '/a/',
      applicationName,
      '/receiver/',
      appId,
      '/'
    );

    console.log('Posting to url: '.concat(url));
    console.log('Raw JSON body: '.concat(JSON.stringify(jsonBody)));
    console.log('X-form submission: '.concat(body));

    return clientPost({
      url,
      body,
      username,
      password,
    }).then(response => {
      console.log(`Server repsonded with a ${response.status}:`);
      console.log(response);
      return { ...state, references: [response, ...state.references] };
    });
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
 * @param {Object} params - Query params, incl: limit, offset, and custom report filters.
 * @param {String} postUrl - Url to which the response object will be posted.
 * @returns {Operation}
 */
export function fetchReportData(reportId, params, postUrl) {
  return http.get(`api/v0.5/configurablereportdata/${reportId}/`, {
    query: function (state) {
      console.log(
        'getting from url: '.concat(
          state.configuration.baseUrl,
          `/api/v0.5/configurablereportdata/${reportId}/`
        )
      );
      console.log('with params: '.concat(params));
      return params;
    },
    callback: function (state) {
      var reportData = state.response.body;
      return post(postUrl, {
        body: reportData,
      })(state).then(function (state) {
        delete state.response;
        console.log('fetchReportData succeeded.');
        console.log('Posted to: '.concat(postUrl));
        return state;
      });
    },
  });
}

export {
  fn,
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
