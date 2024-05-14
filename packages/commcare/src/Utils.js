import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

/**
 * @private
 *  * @function
 * @param {string} path - Path to resource
 * @param {object} data - Object which defines data that will be used to create a given instance of resource
 * @param {string} contentType- Optional field for the header content-type
 * @param {string} parseAs- Optional for data response parse i.e json
 */
export const post = async ({
  path,
  data,
  contentType = 'application/json',
  parseAs = 'json',
}) => {
  return async state => {
    const response = await request({
      method: 'POST',
      path,
      data,
      contentType,
      parseAs,
    });
    return prepareNextState(state, response);
  };
};

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export function request({
  state,
  method,
  path,
  data,
  params = {},
  header = {},
  authType = 'basic',
  contentType = 'application/json',
  parseAs = 'json',
}) {
  const { hostUrl, username, password } = state.configuration;

  const headers =
    authType === 'basic'
      ? {
          ...makeBasicAuthHeader(username, password),
          'content-type': contentType,
        }
      : {
          ...header,
        };

  const options = {
    body: data,
    headers: headers,
    query: params,
    parseAs: parseAs,
  };

  const url = `${hostUrl}${path}`;

  return commonRequest(method, url, options).then(logResponse);
}
