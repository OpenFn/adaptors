import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
// import FormData from 'form-data';
import js2xmlparser from 'js2xmlparser';
import xlsx from 'xlsx';
import { request, prepareNextState } from './Utils';

import { Blob } from 'node:buffer';

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
  return async state => {
    const { applicationName } = state.configuration;

    const [json] = expandReferences(state, formData);
    const { case_type, search_field, create_new_cases } = params;

    const path = `/a/${applicationName}/importer/excel/bulk_upload_api/`;

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(json);
    const ws_name = 'SheetJS';
    xlsx.utils.book_append_sheet(workbook, worksheet, ws_name);

    // Generate buffer
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xls' });
    // xlsx.writeFile(workbook, 'out.xls'); // If needing to write to filesystem

    const data = new FormData();

    data.append('file', new Blob(buffer), 'output.xls');
    // data.append('file', fs.createReadStream('./out.xls'));
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

    const {
      // this should be called project URL.
      // it is what lives after www.commcarehq.org/a/...
      applicationName,
      appId,
    } = state.configuration;

    const path = `/a/${applicationName}/receiver/${appId}/`;

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
 * @param {Object} params - Query params, incl: limit, offset, and custom report filters.
 * @param {String} postUrl - Url to which the response object will be posted.
 * @returns {Operation}
 */
export function fetchReportData(reportId, params, postUrl) {
  return async state => {
    const path = `/a/${state.configuration.applicationName}/api/v0.5/configurablereportdata/${reportId}/`;

    console.log('with params: '.concat(JSON.stringify(params)));

    const { body: reportData } = await request(state.configuration, path, {
      method: 'GET',
      authType: 'basic',
    });

    const result = await request(state.configuration, postUrl, {
      method: 'POST',
      params,
      data: reportData,
      contentType: 'application/json',
    });

    delete result.response;
    console.log('fetchReportData succeeded.');
    console.log('Posted to: '.concat(postUrl));
    return prepareNextState(state, {});
  };
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
