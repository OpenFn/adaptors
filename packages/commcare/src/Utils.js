import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response, callback) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export function request(state, method, path, data, params, header, authType) {
  const { hostUrl, username, password } = state.configuration;

  const headers = authType === 'basic'
  ? {
      ...makeBasicAuthHeader(username, password),
      'content-type': 'application/json'
    }
  : {
      ...header,

    };

  const options = {
    body: data,
    headers: headers,
    query: params,
    parseAs: 'json',
  };

  const url = `${hostUrl}${path}`;

  return commonRequest(method, url, options).then(response =>
    logResponse(response)
  );
}
