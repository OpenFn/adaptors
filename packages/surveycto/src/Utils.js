import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

const addBasicAuth = (configuration = {}, headers) => {
  const { username, password } = configuration;
  if (username && password) {
    Object.assign(headers, makeBasicAuthHeader(username, password));
  }
};

const buildUrl = (configuration = {}, path) => {
  const { servername, apiVersion = 'v1' } = configuration;
  if (!servername) throw 'Please specify servername in your credentials';
  return `https://${servername}.surveycto.com/api/${apiVersion}${path}`;
};

export const makeSurveyCTODate = date =>
  Math.floor(new Date(date).getTime() / 1000);

export const prepareNextState = (state, response, callback) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export const requestHelper = (state, path, params, callback = s => s) => {
  let {
    body = {},
    headers = { 'content-type': 'application/json' },
    method = 'GET',
    query,
  } = params;

  addBasicAuth(state.configuration, headers);
  const url = buildUrl(state.configuration, path);

  const options = {
    body,
    headers,
    query,
  };

  return commonRequest(method, url, options)
    .then(response => {
      logResponse(response);
      return prepareNextState(state, response, callback);
    })
    .catch(err => {
      logResponse(err);
      throw err;
    });
};
