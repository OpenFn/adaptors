import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { resolve as resolveUrl } from 'url';
import js2xmlparser from 'js2xmlparser';
import request from 'request';
import xml2js from 'xml2js';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for magpi.
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
 * Make a POST request to fetch Magpi data and POST it somewhere else
 * @public
 * @example
 * fetchSurveyData({
 *  "surveyId": "37479",
 *  "afterDate": "2017-09-27",
 *  "postUrl": "https://www.openfn.org/inbox/your-inbox-url"
 * })
 * @function
 * @param {object} params - data to make the fetch
 * @returns {Operation}
 */
export function fetchSurveyData(params) {
  return state => {
    function assembleError({ response, error }) {
      if (response && [200, 201, 202].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    console.log(params.surveyId);
    const [resolvedParams] = expandReferences(state, params);
    const { surveyId, afterDate, beforeDate, postUrl } = resolvedParams;
    console.log(surveyId);

    const { accessToken, username } = state.configuration;

    const enddate = beforeDate;
    const startdate = state.lastSubmissionDate || afterDate;

    const url = 'https://www.magpi.com/api/surveydata/v3';

    const form = {
      username,
      accesstoken: accessToken,
      surveyid: surveyId,
      startdate,
      enddate: enddate,
    };

    console.log(`Fetching Survey ${form.surveyid} submissions from ${url}`);
    console.log(`Date filters: "${form.startdate}" to "${form.enddate}".`);

    return new Promise((resolve, reject) => {
      request(
        {
          method: 'POST',
          url: url,
          form: form,
        },
        (err, response, body) => {
          const error = assembleError({ error: err, response });
          if (error) {
            console.log('Failed to fetch submission data.');
            console.log('Response body: ' + response.body);
            reject(error);
          } else {
            const parser = new xml2js.Parser();
            const jsonBody = JSON.parse(parser.toJson(body));
            if (jsonBody.SurveyDataList.SurveyData) {
              console.log('Successfully fetched submission data.');

              // Coerce survey data into an array for iteration...
              if (jsonBody.SurveyDataList.SurveyData.length) {
                var submissions = jsonBody.SurveyDataList.SurveyData;
              } else {
                var submissions = [jsonBody.SurveyDataList.SurveyData];
              }

              console.log(
                `Converted ${submissions.length} submission(s) to JSON:`
              );
              // console.log(submissions);
              resolve(submissions);
            } else {
              console.log(
                'There is no survey data matching the current parameters.'
              );
              resolve([]);
            }
          }
        }
      );
    })
      .then(submissions => {
        submissions.forEach(item => {
          item.surveyId = surveyId;
          item.source = 'Magpi API';
          console.log(item);
          request.post(
            {
              url: postUrl,
              json: item,
            },
            (err, response, postResponseBody) => {
              const error = assembleError({ error: err, response });
              if (error) {
                console.error('POST failed.');
                throw error;
              } else {
                console.log('POST succeeded.');
              }
            }
          );
        });
        return submissions;
      })
      .then(submissions => {
        if (submissions.length) {
          // TODO: if Magpi API does not return in date order, find oldest...
          state.lastSubmissionDate = submissions[0].LastSubmissionDate;
          console.log(
            `Set \"lastSubmissionDate\" for next run to: ${submissions[0].LastSubmissionDate}`
          );
        }
        // Set the lastSubmissionDate for the next time the job runs.
        return state;
      });
  }; // done returning state.
} // done with exported function.

/**
 * Submit a record for a form/survey which already exists in a Magpi user account
 * @public
 * @example
 * submitRecord(jsonData)
 * @function
 * @param {object} jsonData - Payload data for the record
 * @returns {Operation}
 */
export function submitRecord(jsonData) {
  return state => {
    const [jsonBody] = expandReferences(state, jsonData);
    const body = js2xmlparser('form', jsonBody);

    const { username, password, apiUrl } = state.configuration;

    const url = resolveUrl(apiUrl + '/', 'mobileApi/uploadData');
    //const url = 'https://www.magpi.com/mobileApi/uploadData'

    console.log('Posting to url: '.concat(url));
    console.log('Raw JSON body: '.concat(JSON.stringify(jsonBody)));
    console.log('X-form submission: '.concat(body));

    // return post({ url, body })
    // .then((result) => {
    //   console.log("Success:", result);
    //   return { ...state, references: [ result, ...state.references ] }
    // })
  };
}

export {
  fn,
  fnIf,
  alterState,
  field,
  fields,
  sourceValue,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
