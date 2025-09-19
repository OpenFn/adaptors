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
import xlsx from 'xlsx';

const addBasicAuth = (configuration = {}, headers) => {
  const { username, password } = configuration;
  if (username && password) {
    Object.assign(headers, makeBasicAuthHeader(username, password));
  }
};

export const convertJSONToCSV = rows => {
  const worksheet = xlsx.utils.json_to_sheet(rows);

  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');

  const csvBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'csv' });
  return csvBuffer;
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

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
  return nextState;
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

export const requestWithPagination = async (state, resource, options) => {
  const results = [];

  const userLimit = options?.limit ? Number(options?.limit) : undefined;
  
  let cursor = options?.cursor;
  
  const baseQuery = { ...options };
  delete baseQuery.limit;
  delete baseQuery.cursor;

  const pageSize = 20; // when no limit is given get 20 at a time
  const maxFetchSize = 1000; // server max is 1000 per request

  const desiredFetchTotal = userLimit ?? Infinity;

  if (Number.isFinite(desiredFetchTotal) && desiredFetchTotal <= 0) {
    return prepareNextState(state, {
      data: [],
      total: 0,
      nextCursor: cursor,
    });
  }

  do {
    const remaining = desiredFetchTotal - results.length;
    const perPage = Number.isFinite(desiredFetchTotal)
      ? Math.min(remaining, maxFetchSize)
      : pageSize;

    const response = await requestHelper(state, resource, {
      method: 'GET',
      query: {
        ...baseQuery,
        limit: perPage,
        ...(cursor ? { cursor } : {}),
      },
    });

    const body = response.body || {};
    const page = body.data ?? [];
    const next = body.nextCursor ?? null;

    results.push(...page);
    cursor = next;
  } while (cursor && results.length < desiredFetchTotal);

  const final = Number.isFinite(desiredFetchTotal)
    ? results.slice(0, desiredFetchTotal)
    : results;

  return composeNextState(state, {
    data: final,
    total: final.length,
    nextCursor: cursor,
  });
};

export const requestHelper = (state, path, params) => {
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

  return commonRequest(method, url, options).then(logResponse);
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
