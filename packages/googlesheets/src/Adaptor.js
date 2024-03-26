import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import {
  normalizeOauthConfig,
  expandReferences,
} from '@openfn/language-common/util';
import { google } from 'googleapis';

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

  // why not here?

  return state => {
    // Note: we no longer need `steps` anymore since `commonExecute`
    // takes each operation as an argument.
    return commonExecute(...operations)({
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
 * @returns {Operation}
 */
export function appendValues(params) {
  return state => {
    const { accessToken } = state.configuration;

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.credentials = { access_token: accessToken };

    const [resolvedParams] = expandReferences(state, params);
    const { spreadsheetId, range, values } = resolvedParams;

    let sheets = google.sheets('v4');

    return new Promise((resolve, reject) => {
      sheets.spreadsheets.values.append(
        {
          auth: oauth2Client,
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
            console.log('The API returned an error:');
            console.log(err);
            reject(err);
          } else {
            console.log('Success! Here is the response from Google:');
            console.log(response);
            resolve(state);
          }
        }
      );
    });
  };
}

/**
 * Batch Updates values in a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The range of values to update.
 * @param {object} valueInputOption Value update options.
 * @param {array} values A 2d array of values to update.
 * @return {obj} spreadsheet information
 */
export function batchUpdateValues(
  spreadsheetId,
  range,
  valueInputOption,
  values
) {
  return async state => {
    const { accessToken } = state.configuration;

    const [resolvedSheetId, resolvedRange, resolvedInputOpts, resolvedValues] =
      expandReferences(state, spreadsheetId, range, valueInputOption, values);

    const auth = new google.auth.OAuth2();
    auth.credentials = { access_token: accessToken };

    const service = google.sheets({ version: 'v4', auth });

    const data = [
      {
        range: resolvedRange,
        values: resolvedValues,
      },
    ];
    // Additional ranges to update ...
    const resource = {
      data,
      valueInputOption: resolvedInputOpts,
    };
    try {
      const result = await service.spreadsheets.values.batchUpdate({
        spreadsheetId: resolvedSheetId,
        resource,
      });
      console.log('%d cells updated.', result.data.totalUpdatedCells);
      return result;
    } catch (err) {
      // TODO (developer) - Handle exception
      throw err;
    }
  };
}

export {
  alterState,
  combine,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  fn,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
