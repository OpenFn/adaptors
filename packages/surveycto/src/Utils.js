import { Blob } from 'node:buffer';
import { composeNextState } from '@openfn/language-common';
import {
  assertRelativeUrl,
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';
import { formatInTimeZone } from 'date-fns-tz';
import nodepath from 'node:path';

const addBasicAuth = (configuration = {}, headers) => {
  const { username, password } = configuration;
  if (username && password) {
    Object.assign(headers, makeBasicAuthHeader(username, password));
  }
};

const buildUrl = (configuration = {}, path) => {
  const { servername, apiVersion = 'v1' } = configuration;
  if (!servername) {
    throw 'Error: specify servername in your credentials';
  }
  return (
    // Warning: nodepath will convert https:// into https:/
    'https://' +
    nodepath.join(`${servername}.surveycto.com/api`, apiVersion, path)
  );
};

export const prepareNextState = (state, response, callback) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

function encodeFormBody(data) {
  const form = new FormData();
  for (const [key, value] of Object.entries(data)) {
    form.append(
      key,
      new Blob([value.blob], { type: value.type }),
      value.filename
    );
  }

  return form;
}

export const requestHelper = (state, path, params, callback = s => s) => {
  assertRelativeUrl(path);

  let { body = {}, headers = {}, method = 'GET', query, contentType } = params;

  addBasicAuth(state.configuration, headers);
  const url = buildUrl(state.configuration, path);

  if (contentType === 'form') {
    body = encodeFormBody(body);
  } else if (
    contentType === 'json' &&
    Object.keys(headers).find(h => /content-type/.exec(h))
  ) {
    headers.contentType = 'application/json';
  }

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

export const dateRegex = /^(\w{3} \d{2}, \d{4} \d{2}:\d{2}(:\d{2})? (PM|AM))$/;

/**
 * This function will attempt to convert any date representation into
 * a surveyCTO `MMM dd, yyy h:mm:ss a` string.
 * Strings already in this format will be ignored, other strings will be parsed
 * by the Date constructor.
 * Number values should be epoch or unix timestamps and will be converted to strings
 * @param {*} date a date in a string, number or Date format
 */
export const convertDate = date => {
  // If it's already in the right format, return it
  if (typeof date === 'string' && dateRegex.test(date)) {
    return date;
  }

  // Otherwise parse the input into a new date object
  let dateObj = date;
  if (typeof date === 'string' || typeof date === 'number') {
    if (/^\d{10}$/.test(date)) {
      // If the incoming date is a unit timestamp, just return it
      dateObj = new Date(date * 1000);
    } else {
      dateObj = new Date(date);
    }
  }

  // And return in the correct formatting (utc time)
  const formatted = formatInTimeZone(
    dateObj.toISOString(),
    'UTC',
    'MMM dd, yyy h:mm:ss a'
  );

  console.log(`Converted timestamp "${date}" to "${formatted}" (UTC)`);

  return formatted;
};
