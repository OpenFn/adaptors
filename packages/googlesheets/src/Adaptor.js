import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import {
  normalizeOauthConfig,
  expandReferences,
} from '@openfn/language-common/util';

import { google } from 'googleapis';

let client = undefined;

function createConnection(state) {
  const { accessToken } = state.configuration;

  const auth = new google.auth.OAuth2();
  auth.credentials = { access_token: accessToken };

  client = google.sheets({ version: 'v4', auth });
  return state;
}

function removeConnection(state) {
  client = undefined;
  return state;
}

function logError(err) {
  const { code, errors, response } = err;
  if (code && errors && response) {
    console.error('The API returned an error:', errors);

    const { statusText, config } = response;
    const { url, method, body } = config;
    const message = `${method} ${url} - ${code}:${statusText} \nbody: ${body}`;

    console.log(message);
  }
}
/**
 * Execute a sequence of oper.
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

  // why not here?

  return state => {
    // Note: we no longer need `steps` anymore since `commonExecute`
    // takes each operation as an argument.
    return commonExecute(
      createConnection,
      ...operations,
      removeConnection
    )({
      ...initialState,
      ...state,
      configuration: normalizeOauthConfig(state.configuration),
    });
  };
}

/**
 * Add an array of rows to the spreadsheet.
 * https://developers.google.com/sheets/api/samples/writing#append_values
 * @public
 * @example
 * appendValues({
 *   spreadsheetId: '1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos',
 *   range: 'Sheet1!A1:E1',
 *   values: [
 *     ['From expression', '$15', '2', '3/15/2016'],
 *     ['Really now!', '$100', '1', '3/20/2016'],
 *   ],
 * })
 * @function
 * @param {Object} params - Data object to add to the spreadsheet.
 * @param {string} [params.spreadsheetId] The spreadsheet ID.
 * @param {string} [params.range] The range of values to update.
 * @param {array} [params.values] A 2d array of values to update.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function appendValues(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);
    const { spreadsheetId, range, values } = resolvedParams;

    if (!values || values.length === 0) {
      console.log('Warning: empty values array');
      return state;
    }

    return new Promise((resolve, reject) => {
      client.spreadsheets.values.append(
        {
          spreadsheetId,
          range,
          valueInputOption: 'USER_ENTERED',
          resource: {
            range,
            majorDimension: 'ROWS',
            values: values,
          },
        },
        function (err, response) {
          if (err) {
            logError(err);
            reject(err);
          } else {
            console.log('Success! Here is the response from Google:');
            console.log(response.data);
            resolve(
              callback({
                ...composeNextState(state, response.data),
                response,
              })
            );
          }
        }
      );
    });
  };
}

/**
 * Batch update values in a Spreadsheet.
 * @example
 * batchUpdateValues({
 *   spreadsheetId: '1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos',
 *   range: 'Sheet1!A1:E1',
 *   values: [
 *     ['From expression', '$15', '2', '3/15/2016'],
 *     ['Really now!', '$100', '1', '3/20/2016'],
 *   ],
 * })
 * @function
 * @public
 * @param {Object} params - Data object to add to the spreadsheet.
 * @param {string} [params.spreadsheetId] The spreadsheet ID.
 * @param {string} [params.range] The range of values to update.
 * @param {string} [params.valueInputOption] (Optional) Value update options. Defaults to 'USER_ENTERED'
 * @param {array} [params.values] A 2d array of values to update.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation} spreadsheet information
 */
export function batchUpdateValues(params, callback = s => s) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    const {
      spreadsheetId,
      range,
      valueInputOption = 'USER_ENTERED',
      values,
    } = resolvedParams;

    if (!values || values.length === 0) {
      console.log('Warning: empty values array');
      return state;
    }

    const resource = {
      data: [
        {
          range,
          values,
        },
      ],
      valueInputOption,
    };
    try {
      const response = await client.spreadsheets.values.batchUpdate({
        spreadsheetId,
        resource,
      });
      console.log('%d cells updated.', response.data.totalUpdatedCells);
      return callback({ ...composeNextState(state, response.data), response });
    } catch (err) {
      logError(err);
      throw err;
    }
  };
}

/**
 * Gets cell values from a Spreadsheet.
 * @public
 * @example
 * getValues('1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos','Sheet1!A1:E1')
 * @function
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The sheet range.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation} spreadsheet information
 */
export function getValues(spreadsheetId, range, callback = s => s) {
  return async state => {
    const [resolvedSheetId, resolvedRange] = expandReferences(
      state,
      spreadsheetId,
      range
    );

    try {
      const response = await client.spreadsheets.values.get({
        spreadsheetId: resolvedSheetId,
        range: resolvedRange,
      });
      const numRows = response?.data?.values.length ?? 0;
      console.log(`${numRows} rows retrieved.`);

      const nextState = { ...composeNextState(state, response.data), response };

      return callback(nextState);
    } catch (err) {
      logError(err);
      throw err;
    }
  };
}

export {
  alterState,
  combine,
  cursor,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
