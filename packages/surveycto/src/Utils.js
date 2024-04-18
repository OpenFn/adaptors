import { composeNextState, dateFns } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

const { isValid, parse, format } = dateFns;

export const prepareNextState = (state, response, callback) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export function request(state, method, path, data, params) {
  const {
    instanceName,
    username,
    password,
    apiVersion = 'v1',
  } = state.configuration;
  const headers = makeBasicAuthHeader(username, password);

  console.log(params);
  const options = {
    body: data,

    headers: {
      ...headers,
      'content-type': 'application/json',
    },

    query: params,

    parseAs: 'json',
  };

  const url = `https://${instanceName}.surveycto.com/api/${apiVersion}${path}`;

  return commonRequest(method, url, options).then(response =>
    logResponse(response)
  );
}

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
