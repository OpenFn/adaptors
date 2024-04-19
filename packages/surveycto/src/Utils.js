import { composeNextState, dateFns } from '@openfn/language-common';
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

const { isValid, parse, format } = dateFns;

const isNormalDate = dateString => {
  // Attempt to parse the date with the expected format
  const parsedDate = parse(dateString, 'MMM dd, yyyy h:mm:ss a', new Date(), {
    strict: false,
  });

  // Check if the parsed date is valid and matches the input date string
  return (
    isValid(parsedDate) &&
    format(parsedDate, 'MMM dd, yyyy h:mm:ss a') === dateString
  );
};

const dateToTimestamp = (date, timestamp) => {
  const parsedDate = new Date(date);
  // Determine the format based on the timestamp parameter
  const dateFormat = timestamp === 'seconds' ? 't' : 'T';

  return format(parsedDate, dateFormat);
};

export const formDate = (date, timestamp) =>
  isNormalDate(date) ? date : dateToTimestamp(date, timestamp);

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
    body,
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
    parseAs: 'json',
  };

  return commonRequest(method, url, options)
    .then(response => {
      logResponse(response);
      return prepareNextState(state, response, callback);
    })
    .then(callback)
    .catch(err => {
      logResponse(err);
      throw err;
    });
};
