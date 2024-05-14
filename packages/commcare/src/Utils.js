import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

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
